import type { ImageCredit, ProjectImage } from '../types/project';

/**
 * Photography used across the site.
 *
 * None of these are photographs of IMR GROUPS projects. They are licensed
 * stock photos (Unsplash License — free for commercial use, no attribution
 * required) chosen to show the kind of property, and the UI labels each one
 * "Representative image". Locations of the photos are not verified, so the
 * alt text and filenames do not claim Hosur.
 *
 * When IMR GROUPS supplies real project photography, replace the project
 * covers here (drop `representative`) — every page updates automatically.
 */

const unsplash = (handle: string, photoPath: string): ImageCredit => ({
  author: `@${handle} on Unsplash`,
  url: `https://unsplash.com/photos/${photoPath}`,
  licence: 'Unsplash License',
});

export const heroImage = {
  desktop: '/images/hero/landscaped-internal-road.webp',
  desktop1280: '/images/hero/landscaped-internal-road-1280.webp',
  /** Portrait crop for phones, centred on the road. */
  mobile: '/images/hero/landscaped-internal-road-mobile.webp',
  mobile600: '/images/hero/landscaped-internal-road-mobile-600.webp',
  width: 1920,
  height: 1080,
  alt: 'A curving residential road lined with trimmed hedges, a red laterite kerb and trees in warm afternoon light.',
  credit: unsplash('dilliwalarider', 'b5DPDfma-CU'),
} as const;

export const aboutImage: ProjectImage = {
  src: '/images/about/town-aerial-view.webp',
  srcSet: '/images/about/town-aerial-view-800.webp 800w, /images/about/town-aerial-view.webp 1200w',
  alt: 'Aerial view of a growing Indian town surrounded by green countryside and low hills.',
  width: 1200,
  height: 800,
  representative: true,
  credit: unsplash('zoshuacolah', 'ik4KB6weMxQ'),
  objectPosition: 'center 80%',
};

function cover(file: string, alt: string, credit: ImageCredit, objectPosition?: string): ProjectImage {
  return {
    src: `/images/projects/${file}.webp`,
    srcSet: `/images/projects/${file}-640.webp 640w, /images/projects/${file}.webp 1200w`,
    alt,
    width: 1200,
    height: 900,
    representative: true,
    credit,
    objectPosition,
  };
}

/** Representative cover photos, one per project (never shared between projects). */
export const projectCovers = {
  advika: cover(
    'advika-signature-grand',
    'Representative image: aerial view of a residential plot layout with marked plots and internal roads beside new houses.',
    unsplash('zoshuacolah', 'X5KDWlLxLiM'),
  ),
  varam: cover(
    'varam-classic-garden',
    'Representative image: independent houses beyond a wide landscaped lawn with trees.',
    unsplash('tanwar47', 'OchmmLeHkuA'),
    'center 60%',
  ),
  busStand: cover(
    'hosur-bus-stand-area-plots',
    'Representative image: aerial view of a built-up suburban residential neighbourhood.',
    unsplash('zoshuacolah', 'Od2cph89l0c'),
  ),
  avs: cover(
    'avs-royal-encasa',
    'Representative image: a contemporary two-storey Indian independent house with exposed brick and white walls.',
    unsplash('linsartistry', '2rQRfUWFlgc'),
    'center 60%',
  ),
};
