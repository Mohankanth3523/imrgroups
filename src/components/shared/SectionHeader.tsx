import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionHeaderProps {
  title: string;
  intro?: ReactNode;
  /** Short section label shown above the title as a small blue pill. */
  eyebrow?: string;
  id?: string;
  /** Light text for dark sections. */
  inverse?: boolean;
  className?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, intro, eyebrow, id, inverse, className, action }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6', className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={cn('pill mb-3', inverse ? 'bg-white/10 text-sky-200' : 'bg-azure-50 text-azure-700')}>
            {eyebrow}
          </p>
        )}
        <h2 id={id} className={cn('heading-lg', inverse && 'text-white')}>
          {title}
        </h2>
        {intro && (
          <div
            className={cn(
              'mt-3 text-[1.0625rem] leading-relaxed sm:mt-4 sm:text-lg',
              inverse ? 'text-white/75' : 'text-charcoal-muted',
            )}
          >
            {intro}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
