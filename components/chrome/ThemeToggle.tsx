'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from '@/components/ui/Icon';

type Theme = 'light' | 'dark';

/* The document already has the right theme before paint — see the inline script
   in app/layout.tsx. This component only mirrors and mutates it, so there's no
   flash and no hydration mismatch: it renders nothing until mounted. */

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const explicit = document.documentElement.dataset.theme;
    if (explicit === 'light' || explicit === 'dark') {
      setTheme(explicit);
      return;
    }
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setTheme(next);
  }

  // Reserve the space so the bar doesn't reflow when this mounts.
  if (theme === null) {
    return <div className="size-11 md:size-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance'}
      className="grid size-11 place-items-center rounded-pill text-label-secondary transition-colors duration-200 hover:bg-fill hover:text-label md:size-9"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
