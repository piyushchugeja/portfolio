import { profile } from '@/content/profile';
import { GitHub, LinkedIn, Mail } from '@/components/ui/Icon';

const SOCIAL = { github: GitHub, linkedin: LinkedIn, email: Mail } as const;

/* Evaluated when the page is built, not written by hand. The old site's
   hardcoded "© 2023" going stale is exactly the failure this avoids. */
const updated = new Intl.DateTimeFormat('en-GB', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date());

const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric', timeZone: 'UTC' }).format(
  new Date(),
);

export function Footer() {
  const links = profile.links.filter(
    (l) => l.kind === 'email' || l.kind === 'github' || l.kind === 'linkedin',
  );

  return (
    <footer className="border-t border-separator py-10">
      <div className="shell">
        <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="t-footnote text-label-secondary">
              © {year} {profile.name}
            </p>
            <p className="t-footnote mt-1 text-label-tertiary">
              Updated <span className="tnum">{updated}</span>
            </p>
          </div>

          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const Glyph = SOCIAL[link.kind as keyof typeof SOCIAL];
              const isExternal = link.kind !== 'email';
              return (
                <li key={link.kind}>
                  <a
                    href={link.href}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={isExternal ? `${link.label} (opens in a new tab)` : link.label}
                    className="grid size-11 place-items-center rounded-pill text-label-secondary transition-colors duration-200 hover:bg-fill hover:text-label"
                  >
                    <Glyph size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
