import { profileSchema } from '@/lib/schema';

export const profile = profileSchema.parse({
  name: 'Piyush Chugeja',
  headline: 'Software engineer at Barclays',
  intro:
    'I build and modernise enterprise systems at Barclays — Java services behind Angular and React front ends, and long-lived codebases that need to keep running while they move onto current versions. Outside work I build AI systems, most recently fine-tuning open-weight LLMs to make sense of multilingual meeting transcripts.',
  location: 'Mumbai, India',
  currentRole: 'BA4 Software Developer',
  currentOrg: 'Barclays',
  facts: [
    { label: 'Based', value: 'Mumbai, India' },
    { label: 'Degree', value: 'B.E. Computer Engineering, CGPI 10.00' },
    { label: 'Standing', value: 'Institute Rank 1, class of 2025' },
    { label: 'Working on', value: 'Enterprise Java, full-stack, applied ML' },
  ],
  links: [
    {
      label: 'piyushchugeja@gmail.com',
      href: 'mailto:piyushchugeja@gmail.com',
      kind: 'email',
      external: false,
    },
    { label: 'GitHub', href: 'https://github.com/piyushchugeja', kind: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/piyushchugeja', kind: 'linkedin' },
    { label: 'Résumé', href: '/resume.pdf', kind: 'resume', external: false },
  ],
  metaDescription:
    'Software engineer at Barclays building enterprise Java and Angular systems, and AI systems that read multilingual transcripts. CGPI 10.00, Institute Rank 1.',
});
