import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { roles } from '@/content/roles';

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked" tinted>
      <ol className="flex flex-col">
        {roles.map((role, index) => (
          <Reveal key={`${role.org}-${role.startISO}`} delay={index * 0.05}>
            <li className="grid gap-x-10 gap-y-4 border-t border-separator py-9 md:grid-cols-[13rem_1fr] md:py-11">
              <div>
                <p className="t-headline">{role.org}</p>
                <p className="t-footnote tnum mt-1 text-label-secondary">
                  <time dateTime={role.startISO}>{role.start}</time>
                  {' – '}
                  {role.endISO ? <time dateTime={role.endISO}>{role.end}</time> : role.end}
                </p>
                <p className="t-footnote mt-0.5 text-label-tertiary">{role.location}</p>
              </div>

              <div>
                <h3 className="t-title-3">{role.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="t-body relative max-w-[68ch] pl-5 text-label-secondary before:absolute before:left-0 before:top-[0.62em] before:size-[5px] before:rounded-full before:bg-label-tertiary"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                {role.stack.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
