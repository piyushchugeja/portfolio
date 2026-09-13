import type { MetadataRoute } from 'next';
import { featuredProjects } from '@/lib/projects';
import { absolute } from '@/lib/site';

/* Static export, so the timestamp is the build time — which is genuinely when
   the content last changed. */
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absolute('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
    ...featuredProjects.map((project) => ({
      url: absolute(`/work/${project.slug}`),
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
