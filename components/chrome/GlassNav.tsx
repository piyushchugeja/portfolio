'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Close, Menu } from '@/components/ui/Icon';
import { ThemeToggle } from './ThemeToggle';

const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
] as const;

export function GlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Scroll edge effect. The bar is transparent at rest and only acquires blur
     and a hairline once content is passing beneath it. rAF-throttled, passive. */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Close the sheet when the viewport grows past the breakpoint. A matchMedia
     listener, not a width read at render time — the old site sampled
     document.documentElement.clientWidth and went stale on resize. */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 48rem)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* While the sheet is open: lock the page, focus into it, trap Tab, and let
     Escape dismiss it with focus returning to the trigger. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="glass" data-scrolled={scrolled || open}>
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-4">
          <Link
            href="/"
            className="t-headline rounded-sm tracking-[-0.01em] transition-opacity duration-200 hover:opacity-70"
          >
            Piyush Chugeja
          </Link>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="t-subhead inline-flex h-9 items-center rounded-pill px-3 text-label-secondary transition-colors duration-200 hover:bg-fill hover:text-label"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />

            <a
              href="/resume.pdf"
              className="btn btn-secondary hidden min-h-9 px-4 text-[15px] md:inline-flex"
            >
              Résumé
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-sheet"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-pill text-label transition-colors duration-200 hover:bg-fill md:hidden"
            >
              {open ? <Close size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Opaque, not glass: a full-height sheet over body copy has to be legible
          first. Glass stays on the bar itself. */}
      <div
        ref={panelRef}
        id="nav-sheet"
        hidden={!open}
        className="border-b border-separator bg-bg md:hidden"
      >
        <nav aria-label="Sections" className="shell py-3">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-separator last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="t-title-3 flex min-h-[52px] items-center rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href="/resume.pdf" className="btn btn-secondary mt-4 w-full">
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
