import type { Project } from '../types/project';
import { projectCovers } from './siteImages';

/**
 * IMR GROUPS project catalogue.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * CONTENT MAINTENANCE — read CONTENT-MAINTENANCE.md before publishing.
 *  • Prices, approvals, amenities and availability below are copied from
 *    IMR GROUPS marketing material ("Project Details" document and brief).
 *    They have NOT been independently verified. Set `lastVerifiedAt` once the
 *    company confirms each listing.
 *  • `availabilityLabel` is hidden until `confirmed: true`.
 *  • Cover images are licensed stock photos labelled "Representative image"
 *    (see src/data/siteImages.ts). Replace them with real project photographs
 *    when supplied.
 *  • Add `gallery`, `masterPlanImage` and `mapUrl` only with real assets
 *    and verified links — the matching page sections appear automatically.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * To add a project: copy one object, give it a unique `id` and `slug`, and
 * fill in only the fields you have confirmed information for.
 */

const SALES_NUMBER = '+917200662328';

export const projects: Project[] = [
  {
    id: 'advika-signature-grand',
    slug: 'advika-signature-grand',
    name: 'Advika Signature Grand',
    brandLine: 'by IMR GROUPS',
    category: 'Residential plots',
    positioning: 'On-road property',
    location: {
      short: 'Mathigiri – Kelamangalam Road',
      full: 'Mathigiri to Kelamangalam Road, opposite FIEM Industries Ltd.',
      area: 'Kelamangalam Road',
      landmarks: ['Opposite FIEM Industries Ltd.'],
    },
    shortDescription:
      'On-road residential plots on the Mathigiri to Kelamangalam Road, opposite FIEM Industries Ltd.',
    overview: [
      'Advika Signature Grand by IMR GROUPS is an on-road residential plot development on the Mathigiri to Kelamangalam Road, opposite FIEM Industries Ltd.',
      'Plots are offered from 600 to 2,400 sq. ft. Talk to the sales team for plot-wise pricing, current availability and to arrange a visit to the site.',
    ],
    startingPrice: '₹24 lakh',
    priceUnit: 'onwards',
    plotSizeRange: '600 – 2,400 sq. ft.',
    approvalLabels: ['HNTDA', 'RERA'],
    amenities: [
      '30-foot cement road',
      '1.5 lakh water storage',
      'Street lights',
      "Children's park",
      '24/7 CCTV and security',
    ],
    coverImage: projectCovers.advika,
    contactNumber: SALES_NUMBER,
    featured: true,
    publicationStatus: 'published',
    maintainerNotes: [
      'Approval and amenity wording kept as supplied ("HNTDA and RERA approved plots"). Add approval reference numbers to approvalReferences once provided.',
      'Water storage capacity unit is not stated in the source ("1.5 lakh water storage").',
    ],
  },
  {
    id: 'varam-classic-garden',
    slug: 'varam-classic-garden',
    name: 'Varam Classic Garden',
    brandLine: 'by IMR GROUPS',
    category: 'Residential plots',
    location: {
      short: 'Near Kelamangalam, Hosur',
      full: 'Near Kelamangalam and Hosur',
      area: 'Kelamangalam',
      landmarks: ['Tata Electronics', 'Anusonai'],
    },
    shortDescription:
      'A residential plot development in a well-connected location near Kelamangalam and Hosur.',
    overview: [
      'Varam Classic Garden by IMR GROUPS is a residential plot development near Kelamangalam and Hosur, in the area around Tata Electronics and Anusonai.',
      'Message the sales team for the location pin, plot details and to schedule a site visit.',
    ],
    startingPrice: '₹18 lakh',
    priceUnit: 'onwards',
    approvalLabels: ['DTCP', 'HNTDA', 'RERA'],
    amenities: [
      'Black-top roads',
      'Street lights',
      'Water facility',
      'Park',
      'STP facility',
      "Children's play area",
      'Gated community',
    ],
    travelTimes: [
      { destination: 'Tata Electronics', duration: 'about 10 minutes' },
      { destination: 'Kelamangalam', duration: 'about 15 minutes' },
      { destination: 'Hosur', duration: 'about 30 minutes' },
    ],
    coverImage: projectCovers.varam,
    contactNumber: SALES_NUMBER,
    featured: true,
    publicationStatus: 'published',
    maintainerNotes: [
      'Amenities and the Anusonai reference come from the website brief; the "Project Details" document lists only travel times, price and approvals for this project. Confirm before publishing.',
      'Travel times are marketing estimates and are shown as approximate.',
      'Add mapUrl only when the verified Google Maps destination is supplied.',
    ],
  },
  {
    id: 'hosur-bus-stand-area-plots',
    slug: 'hosur-bus-stand-area-plots',
    name: 'Hosur Bus Stand Area Plots',
    category: 'Residential plots',
    positioning: 'Walking distance from Hosur Bus Stand',
    location: {
      short: 'Near Hosur Bus Stand',
      full: 'Hosur Bus Stand area, Hosur — exact location shared on request',
      area: 'Hosur town',
    },
    shortDescription:
      'Plots in the Hosur Bus Stand area, within walking distance of the bus stand.',
    overview: [
      'A limited set of plots in the Hosur Bus Stand area, within walking distance of the bus stand.',
      'Contact the sales team for the exact location, plot sizes, documentation and current availability before arranging a site visit.',
    ],
    ratePerSqFt: '₹8,100 per sq. ft.',
    pricingNote:
      'Rate as stated in recent IMR GROUPS marketing material. Pricing is time-sensitive — please confirm the current rate with the sales team.',
    locationHighlights: [
      'Walking distance from Hosur Bus Stand',
      'Easy access to transport',
      'Schools and daily essentials nearby',
      'Suited to residential use or investment',
      'A fast-developing area',
    ],
    coverImage: projectCovers.busStand,
    contactNumber: SALES_NUMBER,
    availabilityLabel: { text: 'Only 7 plots available', confirmed: false },
    featured: true,
    publicationStatus: 'published',
    maintainerNotes: [
      'Neutral working title — replace with the official project name if there is one.',
      'Inventory claim "Only 7 plots available" is hidden until confirmed.',
      'Source material mentions "Tanishq Backside" next to this listing. Confirm whether it is the location landmark before adding it to location.landmarks.',
      'No plot sizes, approvals or amenities were supplied — do not add without confirmation.',
    ],
  },
  {
    id: 'avs-royal-encasa',
    slug: 'avs-royal-encasa',
    name: 'AVS Royal Encasa',
    brandLine: 'by IMR GROUPS',
    category: 'Homes & plots',
    positioning: 'On-road property near Hosur',
    location: {
      short: 'Near Hosur',
      full: 'On-road property near Hosur',
      area: 'Near Hosur',
    },
    shortDescription:
      'An on-road property near Hosur with 2BHK simplex and duplex homes, and plots from 600 to 2,400 sq. ft.',
    overview: [
      'AVS Royal Encasa by IMR GROUPS is an on-road property near Hosur offering 2BHK simplex and 2BHK duplex homes, along with plots from 600 to 2,400 sq. ft.',
      'Ask the sales team what each price includes, the exact location, and when you can visit.',
    ],
    priceOptions: [
      { label: '2BHK simplex', value: '₹39 lakh' },
      { label: '2BHK duplex', value: '₹43 lakh' },
    ],
    ratePerSqFt: '₹4,499 per sq. ft.',
    pricingNote:
      'Prices as stated in IMR GROUPS marketing material. Please confirm with the sales team what each price includes and how the per-sq.-ft. rate applies.',
    plotSizeRange: '600 – 2,400 sq. ft.',
    amenities: ['30-foot road', 'Clubhouse', 'STP', 'EB', 'Water storage'],
    coverImage: projectCovers.avs,
    contactNumber: SALES_NUMBER,
    featured: true,
    publicationStatus: 'published',
    maintainerNotes: [
      'The source does not say how the ₹39 lakh / ₹43 lakh home prices relate to the ₹4,499 per sq. ft. rate or the plot sizes. Fields are kept separate — confirm before publishing.',
      'No approvals were supplied for this project.',
    ],
  },
];

/** Projects visible on the website. */
export const publishedProjects = projects.filter((p) => p.publicationStatus === 'published');

export const featuredProjects = publishedProjects.filter((p) => p.featured);

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return publishedProjects.find((p) => p.slug === slug);
}

export const projectCategories = Array.from(new Set(publishedProjects.map((p) => p.category)));
export const projectAreas = Array.from(new Set(publishedProjects.map((p) => p.location.area)));
