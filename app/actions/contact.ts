'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(1, 'Add your name.').max(120, 'That name is too long.'),
  email: z.string().trim().email('That email address does not look right.').max(200),
  message: z
    .string()
    .trim()
    .min(10, 'A sentence or two, so I know what this is about.')
    .max(4000, 'That is longer than I can read in an email — please trim it.'),
  /* Honeypot. Real people never see this field, so anything in it is a bot. */
  website: z.string().max(0),
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'message', string>>;
  /* React 19 resets an uncontrolled form once the action resolves, so a failed
     submission would otherwise wipe what the person typed. Echo it back. */
  values?: { name: string; email: string; message: string };
};

export const initialContactState: ContactState = { status: 'idle' };

/* Best-effort throttle. Serverless instances don't share memory, so this stops
   a burst from one client rather than a distributed flood — the honeypot and
   Resend's own limits cover the rest. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
    website: String(formData.get('website') ?? ''),
  };

  const parsed = schema.safeParse(raw);
  const values = { name: raw.name, email: raw.email, message: raw.message };

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;

    // A filled honeypot is a bot: accept silently rather than explain the trap.
    if (flat.website) return { status: 'success' };

    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      values,
      fieldErrors: {
        ...(flat.name?.[0] ? { name: flat.name[0] } : {}),
        ...(flat.email?.[0] ? { email: flat.email[0] } : {}),
        ...(flat.message?.[0] ? { message: flat.message[0] } : {}),
      },
    };
  }

  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (rateLimited(ip)) {
    return {
      status: 'error',
      message: 'That is a few messages in quick succession — try again in a minute.',
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error('[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is unset.');
    return {
      status: 'error',
      message: 'The form is not wired up right now. Email me directly and it will reach me.',
      values,
    };
  }

  const { name, email, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error('[contact] Resend rejected the message:', error);
      return {
        status: 'error',
        message: 'That did not send. Email me directly and it will reach me.',
        values,
      };
    }

    return { status: 'success', message: 'Thanks — that reached me. I will reply soon.' };
  } catch (cause) {
    console.error('[contact] Unexpected failure:', cause);
    return {
      status: 'error',
      message: 'Something broke on my end. Email me directly and it will reach me.',
      values,
    };
  }
}
