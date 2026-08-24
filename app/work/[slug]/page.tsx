import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from '@/components/ui/Icon';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { Reveal } from '@/components/ui/Reveal';
import { Pipeline } from '@/components/work/Pipeline';
import { SpecGrid } from '@/components/work/SpecGrid';
import { ProjectNav } from '@/components/work/ProjectNav';
import { featuredProjects, getProject } from '@/lib/projects';
import { absolute } from '@/lib/site';
import { profile } from '@/content/profile';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

/* Only the featured slugs have pages; anything else is a 404 rather than an
   on-demand render of a project with no case-study content. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.metaDescription,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} — ${profile.name}`,
      description: project.metaDescription,
      url: absolute(`/work/${project.slug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — ${profile.name}`,
      description: project.metaDescription,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.featured) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.tagline,
    description: project.metaDescription,
    url: absolute(`/work/${project.slug}`),
    author: { '@type': 'Person', name: profile.name, url: absolute('/') },
    keywords: project.stack.join(', '),
    ...(project.links.length > 0 ? { sameAs: project.links.map((l) => l.href) } : {}),
  };

  return (
    <>
      <article>
        {/* Opening. The tagline does the work here, not a stock hero image. */}
        <header className="pb-14 pt-10 md:pb-20 md:pt-16">
          <div className="shell">
            <Link
              href="/#work"
              className="t-subhead inline-flex min-h-11 items-center gap-1.5 text-label-secondary transition-colors duration-200 hover:text-label"
            >
              <ArrowLeft size={16} />
              All work
            </Link>

            <p className="t-eyebrow mt-8">Case study</p>
            <h1 className="t-display mt-4">{project.title}</h1>
            <p className="t-title-3 mt-6 max-w-[34ch] font-normal text-label-secondary">
              {project.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              {project.links.length > 0 ? (
                <ul className="t-subhead flex flex-wrap items-center gap-x-5 gap-y-2">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <ExternalLink link={link} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </header>

        {/* The signature element, given the space it deserves. */}
        <section className="bg-bg-secondary py-16 md:py-24">
          <div className="shell">
            <Reveal>
              <h2 className="t-eyebrow">How it works</h2>
              <p className="t-body-lg mt-4 max-w-[60ch] text-label-secondary">{project.summary}</p>
              <div className="mt-12 md:mt-16">
                <Pipeline
                  stages={project.pipeline}
                  label={`${project.title}: input to output, stage by stage`}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {project.chapters.length > 0 ? (
          <div className="flex flex-col">
            {project.chapters.map((chapter) => (
              <section key={chapter.eyebrow} className="section border-t border-separator">
                <div className="shell">
                  <Reveal>
                    <div className="grid gap-x-16 gap-y-6 md:grid-cols-[14rem_1fr]">
                      <p className="t-eyebrow md:pt-2">{chapter.eyebrow}</p>
                      <div>
                        <h2 className="t-title-1 max-w-[26ch]">{chapter.headline}</h2>
                        <p className="t-body-lg mt-6 max-w-[62ch] text-label-secondary">
                          {chapter.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>
            ))}
          </div>
        ) : null}

        <section className="border-t border-separator bg-bg-secondary py-16 md:py-20">
          <div className="shell">
            <Reveal>
              <SpecGrid specs={project.specs} label="At a glance" />
              <p className="t-subhead mt-8 max-w-[62ch] text-label-secondary">
                <span className="text-label-tertiary">My part: </span>
                {project.contribution}
              </p>
            </Reveal>
          </div>
        </section>
      </article>

      <ProjectNav slug={project.slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
