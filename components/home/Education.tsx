import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { education } from '@/content/education';

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I studied" tinted>
      <ol className="flex flex-col">
        {education.map((entry, index) => (
          <Reveal key={entry.institute} delay={index * 0.05}>
            <li className="grid items-baseline gap-x-10 gap-y-3 border-t border-separator py-9 md:grid-cols-[1fr_auto] md:py-11">
              <div>
                <h3 className="t-title-3">{entry.qualification}</h3>
                <p className="t-body mt-1.5 text-label-secondary">
                  {entry.institute}, {entry.location}
                </p>
                <p className="t-footnote tnum mt-1 text-label-tertiary">{entry.duration}</p>

                {entry.notes.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {entry.notes.map((note) => (
                      <li key={note} className="t-subhead max-w-[56ch] text-label-secondary">
                        {note}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {/* The number is the argument, so it gets the display size. */}
              <div className="md:text-right">
                <p className="t-title-1 tnum leading-none">{entry.result}</p>
                <p className="t-footnote mt-2 text-label-tertiary">{entry.resultLabel}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
