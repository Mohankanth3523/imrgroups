/** Public runtime configuration from Vite env variables (see .env.example). */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL ?? '').trim();
export const LEAD_ENDPOINT: string = (import.meta.env.VITE_LEAD_ENDPOINT ?? '').trim();
