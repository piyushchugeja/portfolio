import { z } from 'zod';
import { projectSchema } from '@/lib/schema';

/* Only what can be substantiated. Where a fact isn't known, such as a paper
   URL or a live demo, the field is left out and the UI renders without it, rather than
   shipping a placeholder or an invented detail. */

export const projects = z.array(projectSchema).parse([
  {
    slug: 'careerlens',
    title: 'CareerLens',
    tagline: 'Career counselling meetings, turned into a summary and a to-do list',
    year: '2024–2025',
    featured: true,
    summary:
      'A bot joins the counselling call and what comes back is a speaker-labelled transcript. The model turns that into a fixed JSON payload (summary, action items, insights, who spoke) in whichever of English, Hindi or Marathi the session ran in. The model is the project’s own: three open-weight families were benchmarked on a hand-built dataset of counselling transcripts, and the best of them, Llama 3.1 8B, was fine-tuned with Unsloth and LoRA until it beat the others on quality and inference time at once.',
    contribution:
      'The capture and transcript side: bot join/leave controls, live transcript fetching and storage, plus the summarisation and follow-up-question calls layered on top of it. Final-year project, four of us and our guide; a teammate built the React shell.',
    stack: ['Python', 'Unsloth + PEFT', 'Llama 3.1 8B', 'Flask', 'FastAPI', 'React', 'DynamoDB'],
    pipeline: [
      { label: 'Meeting', detail: 'A bot joins the call as a participant' },
      { label: 'Transcript', detail: 'Speaker-labelled turns, with durations' },
      { label: 'Fine-tuned LLM', detail: 'Llama 3.1 8B, 4-bit, LoRA adapter' },
      { label: 'JSON payload', detail: 'Summary, action items, insights, speakers' },
      { label: 'Dashboard', detail: 'Review, talk-time split, ask follow-ups' },
    ],
    chapters: [
      {
        eyebrow: 'The problem',
        headline: 'The advice outlives the session; the record of it usually doesn’t',
        body: 'What makes a counselling session worth the hour is the conversation: what got covered, what the student is actually weighing up, what they agreed to do next. The write-up of it happens afterwards from memory, or it doesn’t happen. CareerLens produces that record from the session itself.',
      },
      {
        eyebrow: 'Capture',
        headline: 'A bot in the room, not a file upload',
        body: 'Rather than ask a counsellor to record and upload audio, a containerised bot joins the meeting and the backend drives it: join, leave, fetch the transcript as it arrives, store it. Consecutive turns from the same speaker are merged while the transcript is being formatted, which is where the dashboard’s talk-time split comes from, with no separate diarisation step to maintain.',
      },
      {
        eyebrow: 'The dataset',
        headline: 'References written in the shape the dashboard needed',
        body: 'Nothing public covers career counselling, so the reference set was built by hand: thirty-five transcripts in each of English, Hindi and Marathi, cleaned and annotated. The annotations aren’t prose. Each one is the JSON the interface expects, with the summary, the action items, the insights and the speakers already in their fields, so the model was trained to emit something renderable rather than something that then has to be salvaged by a parser.',
      },
      {
        eyebrow: 'The model',
        headline: 'Three families in, one model out',
        body: 'Llama 3, Mistral and DeepSeek were each run over the transcripts zero-shot, one-shot and three-shot to find the strongest candidate in every family, and those three were then fine-tuned with Unsloth’s 4-bit quantisation and LoRA on a Kaggle P100: batch size two with eight-step gradient accumulation, a 4096-token context, 8-bit AdamW. Llama 3.1 8B won on both counts that mattered: ROUGE-L 0.518 and BERTScore F1 0.938, at 12.3 seconds a transcript against DeepSeek’s 19.2. DeepSeek was dropped for the more interesting reason: it summarised the transcripts it had trained on well and unseen ones badly, and neither a shorter context nor more dropout moved it.',
      },
      {
        eyebrow: 'Deployment',
        headline: 'The model is real; the GPU to serve it wasn’t',
        body: 'The tuned adapter is merged back into the base model and served behind a FastAPI endpoint, and that is the version the numbers above describe. What a student project can’t do is keep an 8B model resident on a GPU a live demo can reach, so the deployed build sends the same prompt to a hosted Llama and expects the same JSON back. That’s a hosting constraint rather than a design decision, and it costs nothing structurally: the dashboard is written against the contract, so the endpoint can come back without anything above it changing.',
      },
    ],
    specs: [
      { label: 'Scope', value: 'Meeting bot, dataset, fine-tuned model, dashboard' },
      { label: 'Model', value: 'Llama 3.1 8B, 4-bit, LoRA adapter' },
      { label: 'Dataset', value: '105 transcripts, 35 per language' },
      { label: 'Result', value: 'ROUGE-L 0.518, BERTScore F1 0.938' },
    ],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/VESIT-CMPN-Projects/2024-25-BE03',
        kind: 'repo',
      },
      {
        label: 'Paper',
        href: 'https://github.com/VESIT-CMPN-Projects/2024-25-BE03/blob/main/Semester%208/Research%20papers/Unsloth%20PEFT%20based%20Multilingual%20Meeting%20Summarization%20with%20Open%20Source%20LLMs.pdf',
        kind: 'paper',
      },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=FS94BzPyTb0', kind: 'video' },
    ],
    metaDescription:
      'CareerLens summarises career counselling meetings in English, Hindi and Marathi with a Llama 3.1 8B model fine-tuned using Unsloth and LoRA.',
  },
  {
    slug: 'gesturely',
    title: 'Gesturely',
    tagline: 'Indian Sign Language read from video, then written out as a sentence',
    year: '2023–2024',
    featured: true,
    summary:
      'Gesturely turns Indian Sign Language into readable sentences. Each sign is captured as a short clip, reduced to a sequence of body-pose landmarks rather than pixels, and classified against a 40-word vocabulary. The recognised words then go to a language model with one instruction: make a grammatical sentence out of these and add nothing. The sentence can then be translated and spoken aloud.',
    contribution:
      'The gesture models and the path from a landmark sequence to a finished sentence. Three of us on the project at VESIT; the approach was published as a paper.',
    stack: ['Python', 'TensorFlow', 'MediaPipe', 'OpenCV', 'Gemini API', 'Streamlit'],
    pipeline: [
      { label: 'Sign video', detail: 'One sign per clip, from a webcam' },
      { label: 'Pose landmarks', detail: 'MediaPipe joint coordinates per frame' },
      { label: 'Sequence model', detail: 'Keras classifier over 40 word classes' },
      { label: 'Recognised words', detail: 'Collected in the order they were signed' },
      { label: 'Sentence', detail: 'Composed by an LLM; optional speech output' },
    ],
    chapters: [
      {
        eyebrow: 'The gap',
        headline: 'Recognising a sign is not the same as reading a sentence',
        body: 'Most sign-language demos stop at the label: identify the gesture, print its name. Four signs in, what you have is four words with no grammar between them. Closing that last gap, from a list of correct words to something a hearing reader would actually write, is the half of the problem this project spent its time on.',
      },
      {
        eyebrow: 'The input',
        headline: 'Joints, not pixels',
        body: 'Every frame goes through MediaPipe’s pose estimator first, so a sign arrives at the model as a short sequence of joint coordinates rather than a stack of images. The classifier is much smaller for it, and it can’t learn the signer’s shirt or the room behind them. Sequences are padded and truncated to a fixed 25 frames, so a quick sign and a slow one are the same shape, and the final word is the mode of the predictions across the clip rather than any single window’s guess.',
      },
      {
        eyebrow: 'Honest limits',
        headline: 'Forty words, not an open dictionary',
        body: 'The vocabulary is a fixed list checked into the repository: forty everyday signs: greetings, places around a college, common objects and states. That makes this a working demonstration rather than a general ISL translator. Adding a word means recording it and retraining, and the last round of exactly that is in the commit history.',
      },
      {
        eyebrow: 'The sentence',
        headline: 'Grammar handled by a model, not by rules',
        body: 'ISL word order is not English word order, so the recognised words need arranging before they read as a sentence. Rather than hand-write reordering rules, the word list goes to a prompted language model told to return one grammatical sentence and invent nothing. Because the handoff between the two halves is only ever a list of words, either side can be swapped without touching the other, and the repository ends up carrying two different sentence backends behind the same interface.',
      },
    ],
    specs: [
      { label: 'Scope', value: 'Team project at VESIT, published as a paper' },
      { label: 'Recognition', value: 'Pose-landmark sequences, 40 word classes' },
      { label: 'Input', value: 'Webcam video, one sign per clip' },
      { label: 'Output', value: 'A sentence, optionally translated and spoken' },
    ],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/VESIT-CMPN-Projects/2023-24-TE2',
        kind: 'repo',
      },
      { label: 'Paper', href: 'https://doi.org/10.52783/jisem.v10i10s.1421', kind: 'paper' },
    ],
    metaDescription:
      'Gesturely recognises 40 Indian Sign Language signs from pose-landmark sequences and has a language model write the recognised words as a sentence.',
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
