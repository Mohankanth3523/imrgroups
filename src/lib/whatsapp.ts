import { site } from '../config/site';

/** Builds a wa.me link with a properly URL-encoded message. */
export function whatsappUrl(message?: string, number: string = site.whatsappNumber): string {
  const digits = number.replace(/\D/g, '');
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function projectEnquiryMessage(projectName?: string): string {
  if (!projectName) {
    return 'Hello IMR GROUPS, I would like to know more about your projects. Please share the available property details and site visit information.';
  }
  return `Hello IMR GROUPS, I would like to know more about ${projectName}. Please share the available property details and site visit information.`;
}

export function siteVisitMessage(projectName?: string): string {
  return projectName
    ? `Hello IMR GROUPS, I would like to book a site visit for ${projectName}. Please let me know the available dates.`
    : 'Hello IMR GROUPS, I would like to book a site visit. Please let me know the available projects and dates.';
}

export function projectWhatsappUrl(projectName?: string): string {
  return whatsappUrl(projectEnquiryMessage(projectName));
}

export const telHref = `tel:${site.phone.e164}`;
