/**
 * Site-wide business configuration.
 *
 * Only confirmed facts belong here. Anything left `undefined` or empty is
 * simply not rendered, so it is safe to fill these in later.
 */

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'IMR GROUPS',
  /** Proposed tagline — edit freely. */
  tagline: 'Building Trust. Creating Tomorrow.',
  region: 'Hosur, Tamil Nadu',

  phone: {
    /** Used in tel: links (E.164). */
    e164: '+917200662328',
    /** How the number is shown on the page. */
    display: '+91 72006 62328',
  },
  /** WhatsApp number in international format without + or spaces. */
  whatsappNumber: '917200662328',

  /** Not yet supplied — add when confirmed (rendered only when set). */
  email: undefined as string | undefined,
  officeAddress: undefined as string | undefined,
  officeHours: undefined as string | undefined,
  /** e.g. [{ label: 'Instagram', href: 'https://instagram.com/...' }] */
  socialLinks: [] as SocialLink[],

  /**
   * Full circular logo (transparent outside the circle, so it works on light
   * and dark backgrounds). Source artwork: public/brand/logo-original.png.
   */
  logo: {
    src: '/brand/imr-groups-logo.png',
    webp: '/brand/imr-groups-logo.webp',
    webpSmall: '/brand/imr-groups-logo-256.webp',
    width: 512,
    height: 512,
    alt: 'IMR GROUPS logo',
  },
  ogImage: '/brand/og-image.png',
} as const;

/** Approximate centre of Hosur town, used only for the decorative coordinate label. */
export const HOSUR_COORDINATES = { lat: '12.74° N', lng: '77.83° E' } as const;
