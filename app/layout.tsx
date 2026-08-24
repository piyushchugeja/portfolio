import type { Metadata, Viewport } from 'next';
import './globals.css';
import { GlassNav } from '@/components/chrome/GlassNav';
import { SkipLink } from '@/components/chrome/SkipLink';
import { Footer } from '@/components/chrome/Footer';
import { profile } from '@/content/profile';
import { roles } from '@/content/roles';
import { education } from '@/content/education';
import { skills } from '@/content/skills';
import { absolute, site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: profile.metaDescription,
  applicationName: site.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    siteName: site.name,
    title: site.title,
    description: profile.metaDescription,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: profile.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  /* No `keywords`: search engines have ignored the tag since ~2009. */
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  /* Matches --bg in each scheme so the browser chrome doesn't fight the page. */
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

/* Runs before first paint, so a stored preference never flashes the wrong
   appearance, and `.js` gates the scroll-reveal hidden state (see globals.css)
   so content is never invisible when JavaScript isn't available. Absent a
   stored choice we set no theme at all and let the CSS prefers-color-scheme
   block decide — that way the OS stays in charge. */
const BOOT_SCRIPT = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}}catch(e){}`;

function personJsonLd() {
  const current = roles[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: site.url,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.currentRole,
      description: profile.metaDescription,
      email: 'piyushchugeja@gmail.com',
      url: site.url,
      image: absolute('/opengraph-image'),
      address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
      ...(current
        ? { worksFor: { '@type': 'Organization', name: current.org } }
        : {}),
      alumniOf: education.map((entry) => ({
        '@type': 'EducationalOrganization',
        name: entry.institute,
      })),
      knowsAbout: skills.flatMap((group) => group.items),
      sameAs: [
        'https://github.com/piyushchugeja',
        'https://www.linkedin.com/in/piyushchugeja',
      ],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* The boot script sets `class="js"` and, when stored, `data-theme` before
       React sees the document, so the attributes legitimately differ from the
       server HTML. Next wants the explicit opt-in for smooth scrolling too. */
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <SkipLink />
        <GlassNav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
}
