'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from '@/components/ui/Icon';

/* Scroll back to the top.

   The threshold is a full viewport: below that the nav is still a short flick
   away and a floating control would be clutter.

   One rAF-throttled passive listener, like the nav's. `setShown` is called on
   every frame but passes the same boolean nearly every time, and React bails
   out of an identical state update — so this re-renders twice per page, at the
   two crossings, not once per frame.

   `scrollTo` is called without a `behavior`, which means "use the CSS value" —
   so it inherits `scroll-behavior: smooth` from `html`, and the
   `prefers-reduced-motion` block that resets that to `auto` turns this into an
   instant jump with no media query needed here. */
export function ToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setShown(window.scrollY > window.innerHeight);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      className="to-top"
      data-shown={shown}
      data-cursor="Top"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <ArrowUp size={20} />
    </button>
  );
}
