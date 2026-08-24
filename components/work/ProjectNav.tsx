import Link from 'next/link';
import { ArrowLeft, ArrowRight } from '@/components/ui/Icon';
import { projectNeighbours } from '@/lib/projects';

/** Previous/next across the case studies. Either side may be absent — the set
    doesn't wrap, so the first study has no previous and the last has no next. */
export function ProjectNav({ slug }: { slug: string }) {
  const neighbours = projectNeighbours(slug);
  if (!neighbours) return null;

  const { prev, next } = neighbours;

  return (
    <nav aria-label="More case studies" className="border-t border-separator">
      <ul className="shell grid grid-cols-1 sm:grid-cols-2">
        {prev ? (
          <li className="border-b border-separator sm:border-b-0 sm:border-r sm:border-separator sm:pr-8">
            <Link href={`/work/${prev.slug}`} className="group flex flex-col gap-1.5 py-8 sm:py-10">
              <span className="t-footnote inline-flex items-center gap-1.5 text-label-tertiary">
                <ArrowLeft size={14} />
                Previous
              </span>
              <span className="t-title-3 group-hover:text-accent">{prev.title}</span>
              <span className="t-subhead text-label-secondary">{prev.tagline}</span>
            </Link>
          </li>
        ) : null}

        {next ? (
          <li className="sm:col-start-2 sm:pl-8">
            <Link
              href={`/work/${next.slug}`}
              className="group flex flex-col items-start gap-1.5 py-8 sm:items-end sm:py-10 sm:text-right"
            >
              <span className="t-footnote inline-flex items-center gap-1.5 text-label-tertiary">
                Next
                <ArrowRight size={14} />
              </span>
              <span className="t-title-3 group-hover:text-accent">{next.title}</span>
              <span className="t-subhead text-label-secondary">{next.tagline}</span>
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
