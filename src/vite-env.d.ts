/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site URL, e.g. https://www.example.in — used for canonical/OG URLs. */
  readonly VITE_SITE_URL?: string;
  /** Optional HTTPS endpoint that accepts enquiry JSON (CRM / form service). */
  readonly VITE_LEAD_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
