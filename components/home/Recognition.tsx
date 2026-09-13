import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { awards, leadership } from '@/content/recognition';

export function Recognition() {
  return (
    <Section id="recognition" eyebrow="Recognition" title="Competitions and communities">
      <div className="grid gap-x-14 gap-y-14 md:grid-cols-2">
        <Reveal>
          <div>
            <h3 className="t-eyebrow">Awards</h3>
            <ul className="mt-6 flex flex-col">
              {awards.map((award) => (
                <li key={award.title} className="border-t border-separator py-4">
                  <p className="t-headline">{award.title}</p>
                  <p className="t-subhead mt-1 text-label-secondary">
                    {award.detail}
                    {award.year ? <span className="tnum"> · {award.year}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div>
            <h3 className="t-eyebrow">Leadership</h3>
            <ul className="mt-6 flex flex-col">
              {leadership.map((entry) => (
                <li key={entry.title} className="border-t border-separator py-5">
                  <p className="t-headline">{entry.title}</p>
                  <p className="t-subhead mt-1 text-label-tertiary">{entry.org}</p>
                  <p className="t-subhead mt-2 max-w-[52ch] text-label-secondary">{entry.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
