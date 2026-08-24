import type { Project } from '@/lib/schema';

/** The precise-numbers slab under a case study. Deliberately unadorned:
    label above value, hairline separators, tabular figures. */
export function SpecGrid({ specs, label }: { specs: Project['specs']; label: string }) {
  if (specs.length === 0) return null;

  return (
    <div>
      <h2 className="t-eyebrow">{label}</h2>
      <dl className="mt-8 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
        {specs.map((spec) => (
          <div key={spec.label} className="border-t border-separator py-5">
            <dt className="t-footnote text-label-tertiary">{spec.label}</dt>
            <dd className="t-callout tnum mt-1.5 font-medium">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
