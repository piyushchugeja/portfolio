import { z } from 'zod';
import { educationSchema } from '@/lib/schema';

export const education = z.array(educationSchema).parse([
  {
    institute: 'V.E.S. Institute of Technology',
    qualification: 'B.E. Computer Engineering, Honours in Blockchain',
    location: 'Mumbai',
    duration: '2022 – 2025',
    result: '10.00',
    resultLabel: 'CGPI',
    notes: ['Institute Rank 1 — highest marks in the final year and across the institute'],
  },
  {
    institute: 'V.E.S. Polytechnic',
    qualification: 'Diploma in Computer Engineering',
    location: 'Mumbai',
    duration: '2019 – 2022',
    result: '95.60%',
    resultLabel: 'Aggregate',
    notes: ['Institute Rank 2'],
  },
]);
