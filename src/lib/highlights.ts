import { publishedProjects } from '../data/projects';

/**
 * Headline facts derived from the project catalogue, so they always match
 * the project data and never state anything the data does not.
 */
export interface Highlight {
  value: string;
  label: string;
  icon: 'projects' | 'price' | 'size' | 'approval';
}

function lowestLakhPrice(): string | undefined {
  const prices = publishedProjects
    .map((p) => (p.priceUnit === 'onwards' && p.startingPrice ? /₹\s*([\d.]+)\s*lakh/i.exec(p.startingPrice) : null))
    .filter((m): m is RegExpExecArray => Boolean(m))
    .map((m) => Number(m[1]));
  return prices.length ? `₹${Math.min(...prices)} lakh` : undefined;
}

export function catalogueHighlights(): Highlight[] {
  const out: Highlight[] = [
    {
      value: `${publishedProjects.length} ${publishedProjects.length === 1 ? 'project' : 'projects'}`,
      label: 'In and around Hosur',
      icon: 'projects',
    },
  ];

  const price = lowestLakhPrice();
  if (price) out.push({ value: `From ${price}`, label: 'Stated starting price', icon: 'price' });

  const sizes = Array.from(new Set(publishedProjects.map((p) => p.plotSizeRange).filter(Boolean)));
  if (sizes.length === 1) out.push({ value: sizes[0] as string, label: 'Plot sizes offered', icon: 'size' });

  const approvals = Array.from(new Set(publishedProjects.flatMap((p) => p.approvalLabels ?? []))).sort();
  if (approvals.length) out.push({ value: approvals.join(', '), label: 'Approvals, as stated per project', icon: 'approval' });

  return out;
}
