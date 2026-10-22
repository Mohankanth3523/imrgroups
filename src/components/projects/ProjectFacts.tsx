import type { ReactNode } from 'react';
import type { Project } from '../../types/project';
import { cn } from '../../lib/cn';

interface Fact {
  label: string;
  value: ReactNode;
}

function projectFacts(project: Project): Fact[] {
  const facts: Fact[] = [];
  if (project.startingPrice) {
    facts.push({
      label: 'Starting price',
      value: (
        <>
          {project.startingPrice}
          {project.priceUnit && <span className="font-normal text-charcoal-muted"> {project.priceUnit}</span>}
        </>
      ),
    });
  }
  for (const option of project.priceOptions ?? []) {
    facts.push({ label: option.label, value: option.value });
  }
  if (project.ratePerSqFt) facts.push({ label: 'Stated rate', value: project.ratePerSqFt });
  if (project.plotSizeRange) facts.push({ label: 'Plot sizes', value: project.plotSizeRange });
  if (project.approvalLabels?.length) {
    facts.push({
      label: 'Approvals (as stated)',
      value: (
        <span className="flex flex-wrap justify-end gap-1.5">
          {project.approvalLabels.map((a) => (
            <span
              key={a}
              className="rounded-full border border-azure-100 bg-azure-50 px-2 py-0.5 text-[0.8125rem] font-semibold text-azure-700"
            >
              {a}
            </span>
          ))}
        </span>
      ),
    });
  }
  if (project.availabilityLabel?.confirmed) {
    facts.push({ label: 'Availability', value: project.availabilityLabel.text });
  }
  return facts;
}

interface ProjectFactsProps {
  project: Project;
  className?: string;
  /** "card" is compact; "panel" is used in the project page sidebar. */
  variant?: 'card' | 'panel';
}

export function ProjectFacts({ project, className, variant = 'card' }: ProjectFactsProps) {
  const facts = projectFacts(project);
  if (!facts.length) return null;

  return (
    <dl className={cn('divide-y divide-line border-y border-line', className)}>
      {facts.map((f) => (
        <div
          key={f.label}
          className={cn(
            'flex items-baseline justify-between gap-4',
            variant === 'panel' ? 'py-3.5' : 'py-2.5',
          )}
        >
          <dt className="shrink-0 text-sm text-charcoal-soft">{f.label}</dt>
          <dd
            className={cn(
              'text-right font-semibold text-navy',
              variant === 'panel' ? 'text-base' : 'text-[0.9375rem]',
            )}
          >
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
