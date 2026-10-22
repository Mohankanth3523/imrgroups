import { site } from '../config/site';
import type { Project } from '../types/project';
import { publishedProjects } from './projects';

/**
 * Per-route SEO metadata. Shared by the runtime <head> manager (useSeo) and
 * the build step that writes static HTML for each route (build/seo-plugin.ts).
 */

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  /** Exclude from sitemap (e.g. 404). */
  noindex?: boolean;
}

const suffix = ` | ${site.name}`;

export const pageMeta = {
  home: {
    path: '/',
    title: `${site.name} | Residential Plots & Property in Hosur, Tamil Nadu`,
    description:
      'Explore residential plots and property opportunities in and around Hosur with IMR GROUPS. Request project details, talk to the sales team, or book a site visit.',
  },
  about: {
    path: '/about',
    title: `About Us${suffix}`,
    description:
      'IMR GROUPS, led by Managing Director Mr. Rajesh, helps buyers find residential plots and property in and around Hosur, Tamil Nadu, with clear project information and site visits.',
  },
  projects: {
    path: '/projects',
    title: `Our Projects — Plots & Homes in Hosur${suffix}`,
    description:
      'Browse IMR GROUPS projects in and around Hosur: Advika Signature Grand, Varam Classic Garden, Hosur Bus Stand Area Plots and AVS Royal Encasa.',
  },
  why: {
    path: '/why-imr-groups',
    title: `Why IMR GROUPS${suffix}`,
    description:
      'How IMR GROUPS works with property buyers in Hosur — clear project information, help choosing a plot, direct contact with the sales team and site visits.',
  },
  contact: {
    path: '/contact',
    title: `Contact & Site Visits${suffix}`,
    description:
      'Call or WhatsApp IMR GROUPS on +91 72006 62328, send a property enquiry, or request a site visit for a project in Hosur.',
  },
  notFound: {
    path: '/404',
    title: `Page not found${suffix}`,
    description: 'The page you were looking for could not be found.',
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

export function projectMeta(project: Project): PageMeta {
  const price = project.startingPrice
    ? `From ${project.startingPrice} ${project.priceUnit ?? ''}`.trim() + '. '
    : '';
  return {
    path: `/projects/${project.slug}`,
    title: `${project.name}, ${project.location.short}${suffix}`,
    description: `${project.shortDescription} ${price}Enquire or book a site visit with IMR GROUPS.`
      .replace(/\s+/g, ' ')
      .trim(),
    // Only real project photos are used for link previews.
    image: project.coverImage.illustrative || project.coverImage.representative ? undefined : project.coverImage.src,
    type: 'article',
  };
}

/** Every indexable route, used for the sitemap and static HTML generation. */
export function allPageMeta(): PageMeta[] {
  return [
    pageMeta.home,
    pageMeta.about,
    pageMeta.projects,
    pageMeta.why,
    pageMeta.contact,
    ...publishedProjects.map(projectMeta),
  ];
}
