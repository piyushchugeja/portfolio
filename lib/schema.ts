import { z } from 'zod';

/* Every content file parses itself against one of these at import time, so a
   typo or a missing field fails `next build` rather than rendering an empty
   section in production. */

const nonEmpty = z.string().trim().min(1);

export const linkSchema = z.object({
  label: nonEmpty,
  href: nonEmpty,
  kind: z.enum([
    'email',
    'github',
    'linkedin',
    'resume',
    'repo',
    'live',
    'paper',
    'writeup',
    'video',
  ]),
  /** External links get rel/target treatment; internal and mailto don't. */
  external: z.boolean().default(true),
});

export const profileSchema = z.object({
  name: nonEmpty,
  /** Rendered as the page's single <h1>. */
  headline: nonEmpty,
  /** Two sentences at most. Does the 30-second job. */
  intro: nonEmpty,
  location: nonEmpty,
  currentRole: nonEmpty,
  currentOrg: nonEmpty,
  /** Short factual rows under the hero. Numbers use tabular figures. */
  facts: z.array(z.object({ label: nonEmpty, value: nonEmpty })).min(2),
  links: z.array(linkSchema).min(1),
  /** Used for <meta name="description"> and the OG card. Under 160 chars. */
  metaDescription: nonEmpty.max(160),
});

export const roleSchema = z.object({
  org: nonEmpty,
  title: nonEmpty,
  location: nonEmpty,
  start: nonEmpty,
  end: nonEmpty,
  /** Machine-readable, for <time> and JSON-LD. */
  startISO: z.string().regex(/^\d{4}-\d{2}$/),
  endISO: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .nullable(),
  points: z.array(nonEmpty).min(1),
  stack: z.array(nonEmpty).default([]),
});

export const educationSchema = z.object({
  institute: nonEmpty,
  qualification: nonEmpty,
  location: nonEmpty,
  duration: nonEmpty,
  /** The headline number. Rendered large, in tabular figures. */
  result: nonEmpty,
  resultLabel: nonEmpty,
  notes: z.array(nonEmpty).default([]),
});

export const skillGroupSchema = z.object({
  label: nonEmpty,
  items: z.array(nonEmpty).min(1),
});

export const recognitionSchema = z.object({
  title: nonEmpty,
  detail: nonEmpty,
  /** The résumé doesn't date these, so it stays optional rather than guessed. */
  year: z
    .string()
    .regex(/^\d{4}(–\d{4})?$/)
    .optional(),
});

export const leadershipSchema = z.object({
  title: nonEmpty,
  org: nonEmpty,
  detail: nonEmpty,
});

/** A labelled stage in a project's data flow. This is the site's signature
    element: rendered from tokens in code, so it costs no image weight and
    stays legible at every size and in every colour scheme. */
export const pipelineStageSchema = z.object({
  label: nonEmpty,
  detail: z.string().trim().optional(),
});

export const chapterSchema = z.object({
  eyebrow: nonEmpty,
  headline: nonEmpty,
  body: nonEmpty,
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be lowercase kebab-case'),
  title: nonEmpty,
  /** One line, sentence case, no full stop. Sits directly under the title. */
  tagline: nonEmpty,
  /** Omitted where it can't be verified — an invented year is worse than none. */
  year: z
    .string()
    .regex(/^\d{4}(–\d{4})?$/)
    .optional(),
  /** `featured` projects get a full case-study page. Others are archive cards. */
  featured: z.boolean(),
  /** One paragraph. Used on the home page and as the case study's opening. */
  summary: nonEmpty,
  /** Honest scope. Nobody believes a solo four-person project. */
  contribution: nonEmpty,
  stack: z.array(nonEmpty).min(1),
  pipeline: z.array(pipelineStageSchema).default([]),
  chapters: z.array(chapterSchema).default([]),
  specs: z.array(z.object({ label: nonEmpty, value: nonEmpty })).default([]),
  links: z.array(linkSchema).default([]),
  metaDescription: nonEmpty.max(160),
});

export const independentSchema = z.object({
  heading: nonEmpty,
  body: nonEmpty,
  areas: z.array(nonEmpty).min(1),
});

export type Link = z.infer<typeof linkSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Role = z.infer<typeof roleSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Recognition = z.infer<typeof recognitionSchema>;
export type Leadership = z.infer<typeof leadershipSchema>;
export type PipelineStage = z.infer<typeof pipelineStageSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Independent = z.infer<typeof independentSchema>;
