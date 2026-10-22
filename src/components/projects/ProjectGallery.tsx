import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectImage } from '../../types/project';
import { ProjectFigure } from '../shared/ProjectFigure';

/** Image grid with an accessible lightbox (Escape / arrow keys, focus return). */
export function ProjectGallery({ images, projectName }: { images: ProjectImage[]; projectName: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastIndex = useRef<number>(0);

  const close = useCallback(() => {
    setIndex(null);
    triggerRefs.current[lastIndex.current]?.focus();
  }, []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    lastIndex.current = index;
  }, [index]);

  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'Tab') {
        // Keep focus cycling among the dialog's controls.
        const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? []);
        if (!controls.length) return;
        const pos = controls.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        const next = (pos + (e.shiftKey ? -1 : 1) + controls.length) % controls.length;
        controls[next].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close, step]);

  const current = index !== null ? images[index] : undefined;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 ? 'col-span-2 row-span-2' : undefined}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded"
              aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
            >
              <ProjectFigure
                image={img}
                aspect={i === 0 ? 'aspect-[4/3]' : 'aspect-square'}
                imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${projectName} gallery`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <img
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="max-h-[80vh] w-auto rounded object-contain"
              />
              <figcaption className="mt-3 text-center text-sm text-white/75">
                {current.caption ?? current.alt}
                {current.illustrative && ' (illustration)'} · {(index ?? 0) + 1} / {images.length}
              </figcaption>
            </figure>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
