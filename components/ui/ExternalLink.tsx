import { ArrowUpRight } from '@/components/ui/Icon';
import type { Link as LinkModel } from '@/lib/schema';

/** Renders a content link with the right rel/target and an affordance that
    doesn't depend on colour alone. External links get the arrow glyph. */
export function ExternalLink({
  link,
  className = 'link',
  showIcon = true,
}: {
  link: LinkModel;
  className?: string;
  showIcon?: boolean;
}) {
  const external = link.external && link.href.startsWith('http');

  return (
    <a
      href={link.href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
      {external && showIcon ? (
        <ArrowUpRight size={14} className="ml-0.5 inline-block align-[-0.1em]" />
      ) : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
