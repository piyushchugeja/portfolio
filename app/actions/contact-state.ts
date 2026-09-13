/* The form's state contract, deliberately kept out of contact.ts. A 'use server'
   module may export async functions and nothing else: Next treats every export
   as an action, so a plain object there throws "A 'use server' file can only
   export async functions" when the page compiles. The type alone would be fine
   (types are erased), but the initial value has to live in a normal module. */

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'message', string>>;
  /* React 19 resets an uncontrolled form once the action resolves, so a failed
     submission would otherwise wipe what the person typed. Echo it back. */
  values?: { name: string; email: string; message: string };
};

export const initialContactState: ContactState = { status: 'idle' };
