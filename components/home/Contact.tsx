import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from '@/components/home/ContactForm';
import { profile } from '@/content/profile';
import { GitHub, LinkedIn, Mail } from '@/components/ui/Icon';

export function Contact() {
  const email = profile.links.find((l) => l.kind === 'email');
  const github = profile.links.find((l) => l.kind === 'github');
  const linkedin = profile.links.find((l) => l.kind === 'linkedin');

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      lede="I read everything that arrives here. If you are hiring for backend Java, full-stack or applied ML work, tell me a little about the role and I will reply."
      tinted
    >
      <div className="grid gap-x-16 gap-y-12 md:grid-cols-[1fr_18rem]">
        <Reveal>
          <ContactForm />
        </Reveal>

        {/* The form is a convenience, never the only route. Everything here
            works with JavaScript off. */}
        <Reveal delay={0.06}>
          <div className="border-t border-separator pt-6">
            <h3 className="t-eyebrow">Direct</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {email ? (
                <li>
                  <a href={email.href} className="t-callout inline-flex items-center gap-2.5">
                    <Mail size={18} className="shrink-0 text-label-tertiary" />
                    <span className="link">{email.label}</span>
                  </a>
                </li>
              ) : null}
              {linkedin ? (
                <li>
                  <a
                    href={linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-callout inline-flex items-center gap-2.5"
                  >
                    <LinkedIn size={18} className="shrink-0 text-label-tertiary" />
                    <span className="link">linkedin.com/in/piyushchugeja</span>
                  </a>
                </li>
              ) : null}
              {github ? (
                <li>
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-callout inline-flex items-center gap-2.5"
                  >
                    <GitHub size={18} className="shrink-0 text-label-tertiary" />
                    <span className="link">github.com/piyushchugeja</span>
                  </a>
                </li>
              ) : null}
            </ul>

            <p className="t-footnote mt-8 text-label-tertiary">Based in {profile.location}.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
