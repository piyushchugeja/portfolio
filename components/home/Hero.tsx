import { profile } from '@/content/profile';
import { ArrowRight, Document, GitHub, LinkedIn, Mail } from '@/components/ui/Icon';

const SOCIAL = {
  github: GitHub,
  linkedin: LinkedIn,
  email: Mail,
  resume: Document,
} as const;

export function Hero() {
  const email = profile.links.find((l) => l.kind === 'email');
  const social = profile.links.filter((l) => l.kind === 'github' || l.kind === 'linkedin');

  return (
    <section className="pb-16 pt-14 md:pb-24 md:pt-24">
      <div className="shell">
        <p className="t-eyebrow">{profile.headline}</p>

        {/* The page's only h1. */}
        <h1 className="t-display mt-4">{profile.name}</h1>

        <p className="t-body-lg mt-7 max-w-[62ch] text-label-secondary">{profile.intro}</p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
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
        <dl className="mt-14 grid max-w-3xl grid-cols-1 gap-0 sm:grid-cols-2">
          {profile.facts.map((fact) => (
            <div
              key={fact.label}
              className="border-t border-separator py-4 sm:pr-8"
            >
              <dt className="t-footnote text-label-tertiary">{fact.label}</dt>
              <dd className="t-callout tnum mt-1 font-medium text-label">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {email ? (
          <p className="t-subhead mt-8 text-label-secondary">
            Open to backend Java, full-stack and applied ML roles.{' '}
            <a href={email.href} className="link">
              {email.label}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
