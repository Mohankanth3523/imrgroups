import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  title: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-charcoal-soft">
        {crumbs.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />}
            {c.to ? (
              <Link to={c.to} className="-my-2.5 inline-block py-2.5 hover:text-navy hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-charcoal-muted">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ title, intro, crumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ivory">
      <PlanLines />
      <div className="container-site relative pb-14 pt-10 md:pb-20 md:pt-14">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        <h1 className="heading-xl mt-6 max-w-3xl">{title}</h1>
        {intro && <div className="lede mt-5">{intro}</div>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Faint survey-grid texture used behind page headers. */
function PlanLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 text-navy/[0.07] md:block"
      preserveAspectRatio="xMaxYMid slice"
      viewBox="0 0 600 400"
      fill="none"
    >
      <defs>
        <pattern id="plan-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <linearGradient id="plan-fade" x1="0" x2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="plan-mask">
          <rect width="600" height="400" fill="url(#plan-fade)" />
        </mask>
      </defs>
      <g mask="url(#plan-mask)">
        <rect width="600" height="400" fill="url(#plan-grid)" />
        <path d="M120 400C220 300 300 260 600 230" stroke="#4AA9D8" strokeOpacity="0.5" strokeWidth="18" />
      </g>
    </svg>
  );
}
