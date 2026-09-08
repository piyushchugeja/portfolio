import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { skills } from '@/content/skills';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="What I work with"
      lede="Everything listed here has been used on work that shipped or was assessed. Nothing is here to pad the list."
    >
      <dl className="grid gap-x-12 gap-y-0 sm:grid-cols-2">
        {skills.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.04}>
            <div className="border-t border-separator py-6">
              <dt className="t-footnote text-label-tertiary">{group.label}</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
