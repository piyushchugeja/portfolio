import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  /** Optional standfirst under the heading. */
  lede?: string;
  children: ReactNode;
  /** Sections alternate surface so the page has rhythm without borders. */
  tinted?: boolean;
};

export function Section({ id, eyebrow, title, lede, children, tinted = false }: Props) {
  return (
    <section id={id} className={`section ${tinted ? 'bg-bg-secondary' : ''}`}>
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{eyebrow}</p>
          <h2 className="t-title-1 mt-3 max-w-[24ch]">{title}</h2>
          {lede ? <p className="t-body-lg mt-5 max-w-[58ch] text-label-secondary">{lede}</p> : null}
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
