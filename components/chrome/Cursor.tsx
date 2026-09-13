'use client';

import { useEffect, useRef, useState } from 'react';

/* ==========================================================================
   Labelling cursor.

   A ring that spring-follows the pointer and, over an interactive target,
   expands into a pill naming what a click will do. It replaces the native
   pointer, so the label is doing real work rather than decorating — the reason
   to accept a custom cursor at all is that it says something the arrow can't.

   Deliberate constraints, because hiding the system cursor is not free:

   - Fine pointers only. On touch and coarse pointers the component renders
     nothing and attaches no listeners.
   - `prefers-reduced-motion` disables it outright and leaves the native cursor
     alone. That is the closest available signal to "don't take my pointer
     away," and it's a setting people who rely on an enlarged or high-contrast
     system cursor commonly already have on.
   - Text-entry fields keep their native I-beam. The caret shape carries
     information about where text will land, so the ring hides there.
   - Keyboard users never see it: nothing renders until a real mouse moves.

   Labels are derived from the link's own behaviour, not hand-annotated, so the
   word can't drift out of sync with what the element does. `data-cursor` on an
   element overrides, and `data-cursor="none"` opts out.
   ========================================================================== */

type State = 'idle' | 'active' | 'text';

const TARGETS = '[data-cursor], a[href], button:not(:disabled), [role="button"], summary, label';
const TEXT_FIELDS = 'input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable]';

function labelFor(el: HTMLElement): string | null {
  const explicit = el.dataset.cursor;
  if (explicit) return explicit === 'none' ? null : explicit;

  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') ?? '';
    if (href.startsWith('mailto:')) return 'Email';
    if (href.startsWith('tel:')) return 'Call';
    /* Both of these genuinely open something outside the current page. */
    if (el.target === '_blank' || href.endsWith('.pdf')) return 'Open';
    if (href.includes('/work/')) return 'View';
  }
  return null;
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<State>('idle');
  const [label, setLabel] = useState<string | null>(null);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  /* The frame loop reads the hover state, but must not be a dependency of the
     effect — re-subscribing on every hover would reset the ring's position. */
  const stateRef = useRef<State>('idle');

  /* Gate on the pointer being fine and motion being welcome. Re-checked live so
     plugging in a mouse, or turning the setting off, takes effect immediately. */
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(fine.matches && !reduce.matches);

    sync();
    fine.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    let visible = false;
    let target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let frame = 0;

    const paint = () => {
      /* The dot is exact so precision is never lost; the ring lags, and lags
         less while labelled so the word doesn't trail behind the pointer. */
      const ease = stateRef.current === 'idle' ? 0.18 : 0.32;
      ring.x += (target.x - ring.x) * ease;
      ring.y += (target.y - ring.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }

      /* Idle down to nothing rather than holding a frame loop open forever. */
      if (Math.abs(target.x - ring.x) < 0.15 && Math.abs(target.y - ring.y) < 0.15) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(paint);
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      target = { x: event.clientX, y: event.clientY };

      if (!visible) {
        visible = true;
        /* Jump the ring to the pointer on first sight so it doesn't fly in
           from the corner. */
        ring.x = target.x;
        ring.y = target.y;
        root.classList.add('cursor-on');
      }
      kick();
    };

    /* One delegated listener rather than handlers per element. */
    const apply = (next: State, nextLabel: string | null) => {
      stateRef.current = next;
      setState(next);
      setLabel(nextLabel);
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const el = event.target instanceof Element ? event.target : null;
      if (!el) return;

      if (el.closest(TEXT_FIELDS)) {
        apply('text', null);
        return;
      }

      const hit = el.closest<HTMLElement>(TARGETS);
      if (!hit) {
        apply('idle', null);
        return;
      }
      apply('active', labelFor(hit));
    };

    const hide = () => {
      visible = false;
      root.classList.remove('cursor-on');
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);

    root.classList.add('cursor-custom');

    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      root.classList.remove('cursor-custom', 'cursor-on');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="cursor-layer"
      data-state={state}
      data-labelled={label ? 'true' : 'false'}
      aria-hidden="true"
    >
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-label">{label}</span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
