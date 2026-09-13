import { Fragment, type CSSProperties } from 'react';
import { profile } from '@/content/profile';
import { Lattice } from '@/components/ui/Lattice';
import { ArrowRight, Document, GitHub, LinkedIn, Mail } from '@/components/ui/Icon';

const SOCIAL = {
  github: GitHub,
  linkedin: LinkedIn,
  email: Mail,
  resume: Document,
} as const;

/* The load sequence, in reading order. Kept short and front-loaded: the h1 is
   the LCP element, so it starts almost immediately and everything else falls in
   behind it. */
const delay = (ms: number) => ({ '--lift-delay': `${ms}ms` }) as CSSProperties;

export function Hero() {
  const email = profile.links.find((l) => l.kind === 'email');
  const social = profile.links.filter((l) => l.kind === 'github' || l.kind === 'linkedin');
  const words = profile.name.split(' ');

  return (
    <section className="pb-16 pt-14 md:pb-24 md:pt-24">
      <div className="shell">
        {/* The lattice gets its own column rather than sitting behind the copy.
            A soft mask over the text was tried first and can't work: the pulses
            peak near full alpha, and feathering them leaves exactly enough
            colour under the intro to drop it to 1.5:1. Separating them in the
            layout makes the contrast question disappear instead of managing it,
            and the graph reads as a diagram beside the text rather than as
            texture behind it. Below lg there's no spare column, so the canvas
            is hidden and — being unmeasurable and never on screen — costs
            nothing but the element itself. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="t-eyebrow lift">{profile.headline}</p>

            {/* The page's only h1. Split per word so each rises out of its own
            baseline — and so a wrap on a narrow screen still reveals cleanly.
            The space sits outside the mask: `overflow: hidden` would trim a
            trailing one and close the gap between the words. */}
            <h1 className="t-display mt-4">
              {words.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 ? ' ' : null}
                  <span className="mask" style={delay(60 + i * 80)}>
                    <span className="mask-inner">{word}</span>
                  </span>
                </Fragment>
              ))}
            </h1>

            <p className="t-body-lg lift mt-7 max-w-[62ch] text-label-secondary" style={delay(240)}>
              {profile.intro}
            </p>

            <div className="lift mt-9 flex flex-wrap items-center gap-3" style={delay(320)}>
              {/* No data-cursor: the button already says what it does, and having
              the ring repeat it would be the same word twice. The icon-only
              links below are the opposite case — there the cursor is the only
              place the destination gets named. */}
              <a href="#contact" className="btn btn-primary">
                Get in touch
                <ArrowRight size={17} />
              </a>
              <a href="/resume.pdf" className="btn btn-secondary">
                <Document size={17} />
                Résumé
              </a>

              <div className="flex items-center gap-1 sm:ml-2">
                {social.map((link) => {
                  const Glyph = SOCIAL[link.kind as keyof typeof SOCIAL];
                  return (
                    <a
                      key={link.kind}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.label} (opens in a new tab)`}
                      data-cursor={link.label}
                      className="grid size-11 place-items-center rounded-pill text-label-secondary transition-colors duration-200 hover:bg-fill hover:text-label"
                    >
                      <Glyph size={19} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* A spec row rather than a paragraph of adjectives: the facts, aligned,
            in tabular figures, with the numbers doing the persuading. */}
            <dl
              className="lift mt-14 grid max-w-3xl grid-cols-1 gap-0 sm:grid-cols-2"
              style={delay(400)}
            >
              {profile.facts.map((fact) => (
                <div key={fact.label} className="border-t border-separator py-4 sm:pr-8">
                  <dt className="t-footnote text-label-tertiary">{fact.label}</dt>
                  <dd className="t-callout tnum mt-1 font-medium text-label">{fact.value}</dd>
                </div>
              ))}
            </dl>

            {email ? (
              <p className="t-subhead lift mt-8 text-label-secondary" style={delay(460)}>
                Open to backend Java, full-stack and applied ML roles.{' '}
                <a href={email.href} className="link">
                  {email.label}
                </a>
              </p>
            ) : null}
          </div>

          <div className="relative hidden lg:block">
            <Lattice />
          </div>
        </div>
      </div>
    </section>
  );
}
