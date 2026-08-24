'use client';

import { useActionState } from 'react';
import { initialContactState, sendMessage } from '@/app/actions/contact';

const FIELD =
  'mt-2 w-full rounded-md border border-separator-strong bg-bg px-3.5 py-3 text-[17px] text-label placeholder:text-placeholder transition-colors duration-200 focus-visible:border-accent';

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialContactState);

  return (
    <form action={formAction} noValidate className="max-w-xl">
      <div>
        <label htmlFor="name" className="t-subhead font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={state.values?.name ?? ''}
          className={FIELD}
          aria-invalid={state.fieldErrors?.name ? true : undefined}
          aria-describedby={state.fieldErrors?.name ? 'name-error' : undefined}
        />
        {state.fieldErrors?.name ? (
          <p id="name-error" className="t-footnote mt-2 text-danger">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <label htmlFor="email" className="t-subhead font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email ?? ''}
          className={FIELD}
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
        />
        {state.fieldErrors?.email ? (
          <p id="email-error" className="t-footnote mt-2 text-danger">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="t-subhead font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={state.values?.message ?? ''}
          className={`${FIELD} resize-y`}
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={state.fieldErrors?.message ? 'message-error' : undefined}
        />
        {state.fieldErrors?.message ? (
          <p id="message-error" className="t-footnote mt-2 text-danger">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot. Off-screen rather than display:none so bots that check
          computed style still fill it, and hidden from assistive tech. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto size-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary mt-8" disabled={pending}>
        {pending ? 'Sending…' : 'Send message'}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`t-subhead mt-4 ${state.status === 'error' ? 'text-danger' : 'text-success'}`}
      >
        {state.status !== 'idle' && state.message ? state.message : ''}
      </p>
    </form>
  );
}
