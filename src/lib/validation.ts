import type { ContactMethod, EnquiryType } from './leads';

export interface EnquiryFormValues {
  name: string;
  phone: string;
  project: string;
  enquiryType: EnquiryType;
  preferredContact: ContactMethod;
  visitDate: string;
  message: string;
  consent: boolean;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryFormValues, string>>;

export const MESSAGE_MAX = 500;

/** Local date as YYYY-MM-DD (for <input type="date" min>). */
export function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Strips spaces, dashes and brackets, and a leading +91 / 91 / 0. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/[\s\-().]/g, '');
  return digits.replace(/^(\+91|91(?=\d{10}$)|0(?=\d{10}$))/, '');
}

export function formatPhoneForMessage(raw: string): string {
  const n = normalisePhone(raw);
  return /^\d{10}$/.test(n) ? `+91 ${n.slice(0, 5)} ${n.slice(5)}` : raw.trim();
}

export function validateEnquiry(v: EnquiryFormValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = v.name.trim();

  if (!name) errors.name = 'Enter your name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 80) errors.name = 'Name must be 80 characters or fewer.';
  else if (!/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(name)) errors.name = 'Use letters, spaces, dots or hyphens only.';

  const phone = normalisePhone(v.phone);
  if (!v.phone.trim()) errors.phone = 'Enter your mobile number.';
  else if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = 'Enter a valid 10-digit Indian mobile number, e.g. 98765 43210.';

  if (!v.project) errors.project = 'Choose a project, or “Not sure yet”.';

  if (v.visitDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.visitDate)) errors.visitDate = 'Choose a valid date.';
    else if (v.visitDate < todayIso()) errors.visitDate = 'Choose today or a future date.';
  }

  if (v.message.length > MESSAGE_MAX) errors.message = `Keep the message under ${MESSAGE_MAX} characters.`;

  if (!v.consent) errors.consent = 'Please agree to be contacted so we can reply to your enquiry.';

  return errors;
}
