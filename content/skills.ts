import { z } from 'zod';
import { skillGroupSchema } from '@/lib/schema';

/* Grouped for the three kinds of role this site is aimed at: Java backend,
   full-stack, and applied ML. Nothing here is listed unless it has been used
   on real work — the old site's Canva and VS Code entries are gone, and the
   freelance CMS stack lives in its own section rather than diluting this one. */

export const skills = z.array(skillGroupSchema).parse([
  { label: 'Languages', items: ['Java', 'Python', 'JavaScript', 'SQL'] },
  { label: 'Backend', items: ['Spring Boot', 'REST APIs', 'Java EE'] },
  { label: 'Frontend', items: ['Angular', 'React', 'HTML', 'CSS'] },
  { label: 'Databases', items: ['SQL Server', 'MySQL'] },
  { label: 'Platform', items: ['Kubernetes', 'Docker', 'Git'] },
  { label: 'AI / ML', items: ['LLM fine-tuning (PEFT)', 'Agentic AI', 'TensorFlow', 'OpenCV'] },
  { label: 'Concepts', items: ['Data structures', 'Object-oriented programming'] },
]);
