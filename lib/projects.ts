import { projects } from '@/content/projects';
import type { Project } from '@/lib/schema';

/** Projects with a full case-study page, in display order. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

/** Everything else — rendered as compact cards, no dedicated page. */
export const archivedProjects: Project[] = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Previous/next within the featured set only, so navigation never lands on a
    slug that has no page. Doesn't wrap: with two case studies, wrapping would
    make prev and next the same link. Either side may be absent. */
export function projectNeighbours(slug: string): { prev?: Project; next?: Project } | null {
  const i = featuredProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return null;

  const prev = featuredProjects[i - 1];
  const next = featuredProjects[i + 1];
  if (!prev && !next) return null;

  return { ...(prev ? { prev } : {}), ...(next ? { next } : {}) };
}
