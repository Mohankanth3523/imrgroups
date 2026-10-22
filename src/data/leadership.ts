/**
 * Leadership team.
 *
 * Only confirmed details belong here. Optional fields render only when set:
 *  • `photo` — use an authentic photograph supplied by IMR GROUPS
 *    (e.g. /images/leadership/rajesh.jpg). Without it, an initials monogram
 *    is shown. Never use a generated or stock portrait.
 *  • `bio` — add paragraphs only after Mr. Rajesh has approved the wording.
 */

export interface LeaderPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Leader {
  id: string;
  /** Name as displayed, including honorific. */
  name: string;
  /** Name without honorific, for structured data. */
  plainName: string;
  /** Initials for the monogram placeholder. */
  initials: string;
  /** Job title on its own, e.g. "Managing Director". */
  jobTitle: string;
  /** Full line shown under the name. */
  designation: string;
  photo?: LeaderPhoto;
  bio?: string[];
}

export const leadership: Leader[] = [
  {
    id: 'rajesh',
    name: 'Mr. Rajesh',
    plainName: 'Rajesh',
    initials: 'R',
    jobTitle: 'Managing Director',
    designation: 'Managing Director, IMR GROUPS',
    // photo: { src: '/images/leadership/rajesh.jpg', alt: 'Mr. Rajesh, Managing Director of IMR GROUPS', width: 800, height: 1000 },
    // bio: ['Approved biography paragraph…'],
  },
];

export const managingDirector = leadership[0];
