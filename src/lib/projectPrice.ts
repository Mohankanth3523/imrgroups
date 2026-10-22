import type { Project } from '../types/project';

/**
 * The single price shown on a project's photo. Uses the stated fields as-is
 * and never merges them: starting price, else the first stated price option,
 * else the per-sq.-ft. rate.
 */
export function headlinePrice(project: Project): { label: string; value: string } | undefined {
  if (project.startingPrice) {
    return { label: 'Starting price', value: `${project.startingPrice}${project.priceUnit ? ` ${project.priceUnit}` : ''}` };
  }
  const first = project.priceOptions?.[0];
  if (first) return { label: first.label, value: first.value };
  if (project.ratePerSqFt) return { label: 'Stated rate', value: project.ratePerSqFt };
  return undefined;
}
