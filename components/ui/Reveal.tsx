'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Seconds. Callers stagger lists with index * 0.06 or similar. */
  delay?: number;
  className?: string;
};

/* One reveal, used everywhere, and no animation library behind it: a single
   IntersectionObserver flips a data attribute and CSS does the rest. It only
   ever fires once — the old site re-animated every section on every pass.
   Reduced motion is handled in globals.css, so it holds even before hydration. */

export function Reveal({ children, delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => {
      node.dataset.shown = 'true';
    };

    if (typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    /* Anything already scrolled past at mount — a deep link, a restored scroll
       position, a back navigation — appears immediately. Nothing above the fold
       should be waiting on an observer callback to become visible. */
    if (node.getBoundingClientRect().top < 0) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          observer.disconnect();
        }
      },
      /* Bottom inset so a block reveals just after it enters, not the instant
         its first pixel appears. Threshold 0 keeps it reliable for blocks
         taller than the viewport. */
      { rootMargin: '0px 0px -80px 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
