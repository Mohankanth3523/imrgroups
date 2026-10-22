import { LEAD_ENDPOINT } from './env';
import { whatsappUrl } from './whatsapp';

/**
 * Enquiry submission.
 *
 * Default (no backend): the enquiry is turned into a WhatsApp message that
 * the visitor sends themselves. Nothing is stored in the browser.
 *
 * Optional backend: set VITE_LEAD_ENDPOINT to an HTTPS endpoint (your CRM,
 * a serverless function, or a form service) that accepts a JSON POST of
 * `EnquiryPayload` and responds with a 2xx status. See README.md.
 */

export type EnquiryType = 'details' | 'site-visit' | 'pricing' | 'other';
export type ContactMethod = 'whatsapp' | 'call';

export const enquiryTypeLabels: Record<EnquiryType, string> = {
  details: 'Project details',
  'site-visit': 'Site visit',
  pricing: 'Price & availability',
  other: 'Something else',
};

export const contactMethodLabels: Record<ContactMethod, string> = {
  whatsapp: 'WhatsApp',
  call: 'Phone call',
};

export interface EnquiryPayload {
  name: string;
  phone: string;
  project: string;
  enquiryType: EnquiryType;
  preferredContact: ContactMethod;
  visitDate?: string;
  message?: string;
  consent: true;
  /** Page the enquiry was sent from. */
  source: string;
}

export const hasLeadEndpoint = LEAD_ENDPOINT.length > 0;

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function enquiryToWhatsappText(p: EnquiryPayload): string {
  const lines = [
    'Hello IMR GROUPS, I would like to make an enquiry.',
    '',
    `Name: ${p.name}`,
    `Phone: ${p.phone}`,
    `Project: ${p.project}`,
    `Enquiry: ${enquiryTypeLabels[p.enquiryType]}`,
  ];
  if (p.visitDate) lines.push(`Preferred visit date: ${formatDate(p.visitDate)}`);
  lines.push(`Preferred contact: ${contactMethodLabels[p.preferredContact]}`);
  if (p.message) lines.push('', p.message);
  return lines.join('\n');
}

export function enquiryWhatsappUrl(p: EnquiryPayload): string {
  return whatsappUrl(enquiryToWhatsappText(p));
}

/** Sends to the configured endpoint. Resolves only on a 2xx response. */
export async function postEnquiry(p: EnquiryPayload, signal?: AbortSignal): Promise<void> {
  const res = await fetch(LEAD_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(p),
    signal,
  });
  if (!res.ok) throw new Error(`Enquiry endpoint responded with ${res.status}`);
}
