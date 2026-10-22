/**
 * Project data model. Every field that is not guaranteed for every project is
 * optional, and UI sections render only when their data exists.
 */

export type ProjectCategory = 'Residential plots' | 'Homes & plots';

export type PublicationStatus = 'published' | 'draft';

export interface ImageCredit {
  author: string;
  url: string;
  licence: string;
}

export interface ProjectImage {
  /** Path under /public, e.g. "/images/projects/advika/entrance.jpg". */
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * true for drawn/illustrative artwork or stock imagery that is NOT an actual
   * photograph of this project. The UI labels these as illustrations.
   */
  illustrative?: boolean;
  /**
   * true for a licensed stock photograph used to show the kind of property,
   * not this project. The UI labels these "Representative image".
   */
  representative?: boolean;
  /** Smaller variants for responsive loading, e.g. "/a-640.webp 640w, /a.webp 1200w". */
  srcSet?: string;
  /** Source / licence information, shown in docs and as a tooltip. */
  credit?: ImageCredit;
  caption?: string;
  /** CSS object-position for cropping, e.g. "center 80%". */
  objectPosition?: string;
}

export interface PriceOption {
  /** e.g. "2BHK simplex" */
  label: string;
  /** Display text exactly as supplied, e.g. "₹39 lakh" */
  value: string;
}

/**
 * A statement that must be confirmed by the company before it is shown.
 * Set `confirmed: true` (and update `text`) to display it.
 */
export interface GatedStatement {
  text: string;
  confirmed: boolean;
}

export interface TravelTime {
  destination: string;
  /** Display text, e.g. "about 10 minutes" */
  duration: string;
}

export interface ProjectLocation {
  /** Short label for cards, e.g. "Mathigiri – Kelamangalam Road" */
  short: string;
  /** Full location line as supplied. */
  full: string;
  /** Broader area used by the location filter. */
  area: string;
  /** Supplied landmark references. */
  landmarks?: string[];
}

export interface Project {
  id: string;
  /** URL segment: /projects/:slug */
  slug: string;
  name: string;
  /** e.g. "by IMR GROUPS" line shown under the name. */
  brandLine?: string;
  category: ProjectCategory;
  /** Short positioning label as supplied, e.g. "On-road property". */
  positioning?: string;
  location: ProjectLocation;
  shortDescription: string;
  /** Longer overview paragraphs for the detail page. */
  overview: string[];

  /** Display text for the lowest stated price, e.g. "₹24 lakh". */
  startingPrice?: string;
  /** e.g. "onwards" or "per sq. ft." — shown next to startingPrice. */
  priceUnit?: string;
  /** Additional price points kept as separate, unmerged fields. */
  priceOptions?: PriceOption[];
  /** Stated rate per square foot, kept separate from other price fields. */
  ratePerSqFt?: string;
  /** Note shown beside prices (e.g. when the relation between prices needs confirmation). */
  pricingNote?: string;

  /** e.g. "600 – 2,400 sq. ft." */
  plotSizeRange?: string;
  /** Approval labels exactly as stated in supplied material. */
  approvalLabels?: string[];
  /** Registration / approval reference numbers, once supplied. */
  approvalReferences?: string[];
  amenities?: string[];
  /** Location / neighbourhood points as stated in supplied material. */
  locationHighlights?: string[];
  /** Approximate travel times — marketing claims, shown with an "approximate" note. */
  travelTimes?: TravelTime[];

  coverImage: ProjectImage;
  gallery?: ProjectImage[];
  masterPlanImage?: ProjectImage;
  /** Google Maps link — only add a verified destination. */
  mapUrl?: string;

  contactNumber: string;
  /** Inventory statement; hidden unless confirmed. */
  availabilityLabel?: GatedStatement;
  featured: boolean;
  publicationStatus: PublicationStatus;
  /** ISO date (YYYY-MM-DD) when the company last confirmed this listing. */
  lastVerifiedAt?: string;
  /**
   * Internal notes for whoever maintains content. Never rendered.
   */
  maintainerNotes?: string[];
}
