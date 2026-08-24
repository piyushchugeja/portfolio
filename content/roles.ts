import { z } from 'zod';
import { roleSchema } from '@/lib/schema';

/* Kept deliberately free of anything internal: no host names, no service or
   container names, no business function. Framework and JDK versions are public
   knowledge and say nothing about the systems they run in. */

export const roles = z.array(roleSchema).parse([
  {
    org: 'Barclays',
    title: 'BA4 Software Developer',
    location: 'Pune, India',
    start: 'Jul 2025',
    end: 'Present',
    startISO: '2025-07',
    endISO: null,
    points: [
      'Build and maintain enterprise applications end to end — Angular and React front ends, Java services behind them, and the SQL Server schemas underneath.',
      'Modernise long-lived Java codebases: moving Spring 4 and JDK 8 services onto current Spring Boot and JDK 21, without interrupting the teams that depend on them.',
      'Deploy and operate services on Kubernetes, and work on the build and release path that gets them there.',
    ],
    stack: ['Java', 'Spring Boot', 'Angular', 'React', 'SQL Server', 'Kubernetes'],
  },
  {
    org: 'Barclays',
    title: 'Technology Summer Intern',
    location: 'Pune, India',
    start: 'Jun 2024',
    end: 'Jul 2024',
    startISO: '2024-06',
    endISO: '2024-07',
    points: [
      'Worked with the Markets Pre-Trade technology team on internal applications.',
      'Migrated legacy functionality onto a more maintainable architecture.',
    ],
    stack: ['Java', 'SQL'],
  },
  {
    org: 'Securetain',
    title: 'Full Stack Development Intern',
    location: 'Remote',
    start: 'Jul 2021',
    end: 'Sep 2021',
    startISO: '2021-07',
    endISO: '2021-09',
    points: [
      'Developed and restructured production websites, improving performance and maintainability across several live platforms.',
      "Built parts of e-InnoTech's website and its LMS platform.",
    ],
    stack: ['PHP', 'JavaScript', 'MySQL'],
  },
]);
