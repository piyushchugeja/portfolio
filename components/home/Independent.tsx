import { Reveal } from '@/components/ui/Reveal';
import { independent } from '@/content/independent';

/* Deliberately not a Section: this is a single compact band, not a chapter.
   It shows initiative without letting a Java or ML screen mistake the
   freelance practice for the main event. */
export function Independent() {
  return (
    <section id="independent" className="py-14 md:py-20">
      <div className="shell">
        <Reveal>
          <div className="border-t border-separator pt-8">
            <div className="grid gap-x-12 gap-y-4 md:grid-cols-[16rem_1fr]">
              <h2 className="t-title-3">{independent.heading}</h2>
              <div>
                <p className="t-body max-w-[62ch] text-label-secondary">{independent.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {independent.areas.map((area) => (
                    <li key={area} className="chip">
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
