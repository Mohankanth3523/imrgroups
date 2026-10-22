import type { ProjectImage } from '../../types/project';
import { cn } from '../../lib/cn';

interface ProjectFigureProps {
  image: ProjectImage;
  className?: string;
  imgClassName?: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/3]". */
  aspect?: string;
  eager?: boolean;
  sizes?: string;
  /** Where the small "Representative image" note sits. */
  labelPosition?: 'bottom-right' | 'top-right';
}

/** Visible label for images that are not photographs of the actual project. */
function imageLabel(image: ProjectImage): string | null {
  if (image.illustrative) return 'Illustration, not a site photo';
  if (image.representative) return 'Representative image';
  return null;
}

/**
 * Image wrapper that reserves space (no layout shift) and clearly labels
 * representative or illustrative images so they are never mistaken for
 * photographs of the actual project.
 */
export function ProjectFigure({
  image,
  className,
  imgClassName,
  aspect = 'aspect-[4/3]',
  eager = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
  labelPosition = 'bottom-right',
}: ProjectFigureProps) {
  const label = imageLabel(image);
  return (
    <div className={cn('relative overflow-hidden bg-navy-900', aspect, className)}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.srcSet ? sizes : undefined}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        title={image.credit ? `Photo: ${image.credit.author}` : undefined}
        style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
        className={cn('absolute inset-0 h-full w-full object-cover', imgClassName)}
      />
      {label && (
        <span
          className={cn(
            'pointer-events-none absolute right-2.5 rounded-sm bg-navy-950/55 px-1.5 py-0.5 text-[0.625rem] font-medium text-white/85',
            labelPosition === 'top-right' ? 'top-2.5' : 'bottom-2.5',
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
