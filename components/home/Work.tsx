import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { Pipeline } from '@/components/work/Pipeline';
import { archivedProjects, featuredProjects } from '@/lib/projects';
import { ArrowRight } from '@/components/ui/Icon';

export function Work() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">Selected work</p>
          <h2 className="t-title-1 mt-3 max-w-[24ch]">
            Two systems that turn messy input into something usable
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
          {featuredProjects.map((project) => (
            <Reveal key={project.slug}>
              <article>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="t-title-2">{project.title}</h3>
                  {project.year ? (
                    <span className="t-footnote tnum text-label-tertiary">{project.year}</span>
                  ) : null}
                </div>

                <p className="t-body-lg mt-3 max-w-[46ch] text-label">{project.tagline}</p>

                <p className="t-body mt-5 max-w-[64ch] text-label-secondary">{project.summary}</p>

                <div className="mt-10 border-t border-separator pt-1">
                  <Pipeline
                    stages={project.pipeline}
                    label={`How ${project.title} works, stage by stage`}
                  />
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link href={`/work/${project.slug}`} className="btn btn-secondary">
                    Read the case study
                    <ArrowRight size={17} />
                  </Link>

                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {archivedProjects.length > 0 ? (
          <Reveal>
            <div className="mt-24 border-t border-separator pt-12 md:mt-32">
              <h3 className="t-eyebrow">Earlier projects</h3>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {archivedProjects.map((project) => (
                  <li key={project.slug} className="card flex flex-col p-6">
                    <h4 className="t-title-3">{project.title}</h4>
                    <p className="t-subhead mt-2 font-medium text-label">{project.tagline}</p>
                    <p className="t-subhead mt-4 flex-1 text-label-secondary">{project.summary}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {project.links.length > 0 ? (
                      <p className="t-subhead mt-5">
                        {project.links.map((link) => (
                          <ExternalLink key={link.href} link={link} />
                        ))}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
