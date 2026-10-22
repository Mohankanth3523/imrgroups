export interface NavItem {
  label: string;
  to: string;
}

export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Projects', to: '/projects' },
  { label: 'Why IMR Groups', to: '/why-imr-groups' },
  { label: 'Contact', to: '/contact' },
];

/** Contact page pre-set to a site visit request (optionally for a project). */
export function siteVisitPath(projectSlug?: string): string {
  const params = new URLSearchParams({ type: 'site-visit' });
  if (projectSlug) params.set('project', projectSlug);
  return `/contact?${params.toString()}#enquiry-form`;
}
