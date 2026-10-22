import { motion, type Variants } from 'framer-motion';
import { Building2, IndianRupee, MapPin, Ruler, ShieldCheck, type LucideIcon } from 'lucide-react';
import { siteVisitPath } from '../../config/navigation';
import { site } from '../../config/site';
import { heroImage } from '../../data/siteImages';
import { catalogueHighlights, type Highlight } from '../../lib/highlights';
import { Button } from '../shared/Button';

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/**
 * Image-led hero. The photo fills the whole hero on every screen size and the
 * text sits on a navy gradient, so image and copy read as one composition.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <picture>
        <source
          media="(min-width: 640px)"
          type="image/webp"
          srcSet={`${heroImage.desktop1280} 1280w, ${heroImage.desktop} 1920w`}
          sizes="100vw"
        />
        <img
          src={heroImage.mobile}
          srcSet={`${heroImage.mobile600} 600w, ${heroImage.mobile} 900w`}
          sizes="100vw"
          alt={heroImage.alt}
          width={900}
          height={1200}
          loading="eager"
          decoding="async"
          {...{ fetchpriority: 'high' }}
          title={`Photo: ${heroImage.credit.author}`}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[56%_50%] sm:object-[60%_62%] lg:object-[62%_60%]"
        />
      </picture>

      {/* Navy gradient for text contrast: rises from the bottom on phones, sweeps from the left on desktop. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 from-15% via-navy-950/70 via-50% to-navy-950/5 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-navy-950/90 from-10% via-navy-950/55 via-45% to-transparent to-75% lg:block"
      />

      <div className="container-site flex min-h-[min(40rem,calc(100svh_-_var(--header-h)_-_var(--mobile-bar-h)))] flex-col justify-end pb-10 pt-40 sm:min-h-[34rem] sm:pb-14 md:min-h-[38rem] lg:min-h-[min(44rem,calc(100svh_-_var(--header-h)))] lg:justify-center lg:pb-28 lg:pt-20">
        <motion.div className="max-w-[40rem]" variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="pill border border-white/25 bg-white/10 text-white backdrop-blur-sm"
          >
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-sky-300" />
            {site.region}
          </motion.p>

          <motion.h1 variants={item} className="heading-xl mt-4 max-w-[17ch] text-white sm:mt-5">
            Find the Right Place to Build Your Future.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/85 sm:mt-5 sm:text-lg"
          >
            Explore residential plots and property opportunities in and around Hosur with {site.name}.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8">
            <Button to="/projects" variant="brand" size="lg" className="min-[420px]:flex-1 sm:flex-none">
              Explore Projects
            </Button>
            <Button to={siteVisitPath()} variant="outline-light" size="lg" className="min-[420px]:flex-1 sm:flex-none">
              Book a Site Visit
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <span className="pointer-events-none absolute bottom-2 right-3 text-[0.625rem] font-medium tracking-wide text-white/55 lg:bottom-3 lg:right-4">
        Representative image
      </span>
    </section>
  );
}

const highlightIcons: Record<Highlight['icon'], LucideIcon> = {
  projects: Building2,
  price: IndianRupee,
  size: Ruler,
  approval: ShieldCheck,
};

/** Key facts from the project catalogue, overlapping the hero on desktop. */
export function HeroHighlights() {
  const items = catalogueHighlights();
  return (
    <section
      aria-label="Key facts"
      className="relative z-10 bg-ivory pt-6 lg:-mt-16 lg:bg-[linear-gradient(to_bottom,transparent_4rem,#F1F8FD_4rem)] lg:pt-0"
    >
      <div className="container-site">
        <ul className="relative grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line shadow-card lg:grid-cols-4">
          {items.map((h) => {
            const Icon = highlightIcons[h.icon];
            return (
              <li key={h.label} className="flex flex-col gap-2 bg-white p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-6 lg:flex-col lg:items-start lg:gap-3 xl:flex-row xl:items-center xl:gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azure-50 text-azure sm:h-12 sm:w-12">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-bold leading-tight tracking-[-0.01em] text-navy min-[400px]:text-base sm:text-xl">
                    {h.value}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-charcoal-muted sm:text-sm">
                    {h.label}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
