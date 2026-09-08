import { z } from 'zod';
import { leadershipSchema, recognitionSchema } from '@/lib/schema';

/* Listed in the résumé's own order, strongest first. Years are omitted
   throughout because the résumé doesn't record them; better absent than
   guessed. Add a `year` to any entry once it's confirmed. */

export const awards = z.array(recognitionSchema).parse([
  {
    title: 'Domain Winner: AI in FinTech',
    detail: 'Airavat 2.0 AI Hackathon',
  },
  {
    title: 'Track Winner: Universal Communications',
    detail: 'Quasar 3.0 National Hackathon',
  },
  {
    title: '1st place, Technical Paper Presentation',
    detail: 'V.E.S. Polytechnic',
  },
  {
    title: '2nd place, Pradarshini Project Exhibition',
    detail: 'VESIT',
  },
  {
    title: '2nd place, Sherlock-Watson Coding Competition',
    detail: 'CSI VESIT',
  },
  {
    title: '3rd place, Project Exhibition',
    detail: 'Vivek Technotronix',
  },
]);

export const leadership = z.array(leadershipSchema).parse([
  {
    title: 'Senior Technical Manager',
    org: 'Code Cell, VESIT',
    detail:
      'Mentored students and supported technical initiatives across the college developer community.',
  },
  {
    title: 'Web Development Lead',
    org: 'Google Developer Student Clubs, VESIT',
    detail:
      'Ran web development activities and AI workshops, helping students get to grips with modern tooling and frameworks.',
  },
]);
