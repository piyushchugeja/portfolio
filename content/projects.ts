import { z } from 'zod';
import { projectSchema } from '@/lib/schema';

/* Only what can be substantiated. Where a fact isn't known — a paper URL, a
   live demo — the field is left out and the UI renders without it, rather than
   shipping a placeholder or an invented detail. */

export const projects = z.array(projectSchema).parse([
  {
    slug: 'careerlens',
    title: 'CareerLens',
    tagline: 'Turning career counselling sessions into advice somebody can act on',
    featured: true,
    summary:
      'CareerLens takes a career counselling session and produces the record of it: what was discussed, the insights buried in the conversation, and the things the person agreed to do next. Sessions are rarely in a single language, which is where general-purpose transcript models fall over, so the understanding step runs on open-weight LLMs fine-tuned with PEFT.',
    contribution:
      'Fine-tuned the models, built the extraction pipeline, and designed the dashboard the output lands in.',
    stack: ['Python', 'Open-weight LLMs', 'PEFT fine-tuning'],
    pipeline: [
      { label: 'Counselling session', detail: 'Recorded conversation, more than one language' },
      { label: 'Transcript', detail: 'Speech converted to text' },
      { label: 'Fine-tuned LLM', detail: 'Open-weight model adapted with PEFT' },
      { label: 'Structured output', detail: 'Summary, insights, action items' },
      { label: 'Dashboard', detail: 'Counsellor reviews and follows up' },
    ],
    chapters: [
      {
        eyebrow: 'The problem',
        headline: 'A counsellor should not be taking minutes',
        body: 'The valuable part of a counselling session is the conversation. The record of it — what was covered, what the person is genuinely weighing up, what they committed to — usually gets written afterwards from memory, or not at all. CareerLens produces that record from the session itself, so the hour can be spent listening.',
      },
      {
        eyebrow: 'Multilingual by default',
        headline: 'Sessions do not happen in one language',
        body: 'Real conversations move between languages, sometimes inside a single sentence. That is the case general-purpose transcript models handle worst, and it is exactly where the meaning sits: the hedges, the reservations, the half-committed answers. Making the extraction survive that was the substance of the project.',
      },
      {
        eyebrow: 'The approach',
        headline: 'Fine-tuned, not prompted',
        body: 'Prompting a hosted model would have been quicker to stand up, but it buys generic summarisation and sends every transcript to someone else’s server. Fine-tuning open-weight models with PEFT adapts them to the vocabulary of career counselling on modest hardware, keeps both weights and data local, and makes the output structured enough to build an interface on top of.',
      },
    ],
    specs: [
      { label: 'Scope', value: 'Model fine-tuning, extraction pipeline, dashboard' },
      { label: 'Method', value: 'PEFT fine-tuning of open-weight LLMs' },
      { label: 'Input', value: 'Multilingual session transcripts' },
      { label: 'Output', value: 'Summary, insights, action items' },
    ],
    links: [],
    metaDescription:
      'CareerLens extracts summaries, insights and action items from multilingual career counselling sessions using open-weight LLMs fine-tuned with PEFT.',
  },
  {
    slug: 'gesturely',
    title: 'Gesturely',
    tagline: 'Indian Sign Language, translated into sentences people actually write',
    year: '2024',
    featured: true,
    summary:
      'Gesturely reads Indian Sign Language from video and produces readable English. A deep learning model classifies each gesture into its gloss; a language model then rewrites the gloss sequence as a natural sentence. The second stage matters more than it sounds — ISL grammar is not English grammar, so a perfectly correct gloss sequence still reads as broken English until something reorders it.',
    contribution: 'Team project at VESIT. The approach and results were published as a paper.',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'LLM'],
    pipeline: [
      { label: 'Video frames', detail: 'Signer captured on camera' },
      { label: 'Gesture classifier', detail: 'Deep network maps each sign to its gloss' },
      { label: 'Gloss sequence', detail: 'Correct signs, ISL word order' },
      { label: 'Language model', detail: 'Rewrites glosses into English grammar' },
      { label: 'Readable sentence', detail: 'Output a hearing reader can follow' },
    ],
    chapters: [
      {
        eyebrow: 'The gap',
        headline: 'Recognising the signs is only half of it',
        body: 'Most sign language work stops at classification: identify the gesture, print its label. What that produces is a string of glosses in ISL word order, which reads to an English speaker like a telegram. The distance between correct and readable is where this project spent its effort.',
      },
      {
        eyebrow: 'Two models, two jobs',
        headline: 'Vision for the signs, a language model for the grammar',
        body: 'Splitting the problem meant each half could be judged on its own terms. Classification is a vision problem with a vision metric. Turning glosses into grammatical English is a generation problem — handing it to a language model proved both more accurate and far less brittle than the hand-written reordering rules the alternative would have needed.',
      },
      {
        eyebrow: 'Outcome',
        headline: 'Written up and published',
        body: 'The system and its results were published as a research paper. The two-stage design is the part worth reusing: because the interface between the halves is just a gloss sequence, either model can be replaced without retraining the other.',
      },
    ],
    specs: [
      { label: 'Scope', value: 'Team project at VESIT' },
      { label: 'Approach', value: 'Gesture classification, then LLM generation' },
      { label: 'Input', value: 'Video of a signer' },
      { label: 'Output', value: 'Grammatical English sentences' },
    ],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/VESIT-CMPN-Projects/2023-24-TE2',
        kind: 'repo',
      },
    ],
    metaDescription:
      'Gesturely translates Indian Sign Language video into grammatical English by pairing gesture classification with LLM-based language generation.',
  },
  {
    slug: 'carboneutral',
    title: 'CarboNeutral',
    tagline: 'Carbon footprint assessment for organisations',
    featured: false,
    summary:
      'A platform where an organisation can assess its own emissions and get sustainability recommendations scoped to what it actually does, rather than a generic checklist.',
    contribution: 'Hackathon project.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    links: [
      { label: 'Devfolio', href: 'https://devfolio.co/projects/carboneutral-068e', kind: 'live' },
    ],
    metaDescription:
      'CarboNeutral helps organisations assess their carbon emissions and receive sustainability recommendations scoped to their operations.',
  },
  {
    slug: 'attendance',
    title: 'Facial recognition attendance',
    tagline: 'Attendance taken from a camera feed instead of a roll call',
    featured: false,
    summary:
      'Identifies students from a camera feed and records attendance against them, replacing the roll call and the paperwork behind it.',
    contribution: 'Personal project.',
    stack: ['Python', 'OpenCV', 'PyQt5'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/piyushchugeja/face-recognition-based-attendance',
        kind: 'repo',
      },
    ],
    metaDescription:
      'An automated attendance system that identifies students from a camera feed using face recognition, built with Python, OpenCV and PyQt5.',
  },
]);
