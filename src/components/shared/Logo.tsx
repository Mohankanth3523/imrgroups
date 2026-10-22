import { site } from '../../config/site';
import { cn } from '../../lib/cn';

interface LogoProps {
  /**
   * Size classes for the square logo box, e.g. "h-11 w-11 sm:h-12 sm:w-12".
   * The image always keeps its aspect ratio (object-contain) and is never cropped.
   */
  className?: string;
  /** The largest rendered size in CSS px — picks the right file for the screen. */
  sizes?: string;
  eager?: boolean;
}

/**
 * The circular IMR GROUPS logo. The file is transparent outside its white
 * disc, so it sits cleanly on both the white header and the navy footer.
 */
export function Logo({ className = 'h-14 w-14', sizes = '56px', eager = false }: LogoProps) {
  return (
    <picture className={cn('inline-block shrink-0', className)}>
      <source
        type="image/webp"
        srcSet={`${site.logo.webpSmall} 256w, ${site.logo.webp} 512w`}
        sizes={sizes}
      />
      <img
        src={site.logo.src}
        alt={site.logo.alt}
        width={site.logo.width}
        height={site.logo.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block aspect-square h-full w-full object-contain"
      />
    </picture>
  );
}
