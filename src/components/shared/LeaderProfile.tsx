import type { Leader } from '../../data/leadership';
import { cn } from '../../lib/cn';

/** Authentic photo when supplied, otherwise a monogram — never a generated portrait. */
export function LeaderPortrait({ leader, className, compact = false }: { leader: Leader; className?: string; compact?: boolean }) {
  if (leader.photo) {
    return (
      <img
        src={leader.photo.src}
        alt={leader.photo.alt}
        width={leader.photo.width}
        height={leader.photo.height}
        loading="lazy"
        decoding="async"
        className={cn('object-cover', compact ? 'rounded-full' : 'rounded-md', className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${leader.name} — initials`}
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-navy text-white',
        compact ? 'rounded-full' : 'rounded-md',
        className,
      )}
    >
      {!compact && (
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-white/[0.06]" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" fill="none">
          {[110, 90, 70, 50].map((r) => (
            <circle key={r} cx="160" cy="40" r={r} stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>
      )}
      {!compact && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-sky-400" />}
      <span
        aria-hidden="true"
        className={cn('relative font-serif leading-none', compact ? 'text-xl' : 'text-[5.5rem] sm:text-[7rem]')}
      >
        {leader.initials}
      </span>
    </div>
  );
}

interface LeaderProfileProps {
  leader: Leader;
  headingLevel?: 'h2' | 'h3';
}

/** Full profile used on the About page. */
export function LeaderProfile({ leader, headingLevel = 'h3' }: LeaderProfileProps) {
  const Heading = headingLevel;
  return (
    <article className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-end sm:gap-10 lg:gap-14">
      <LeaderPortrait leader={leader} className="aspect-[4/5] w-full max-w-[12rem] sm:max-w-[15rem]" />
      <div className="sm:pb-2">
        <span aria-hidden="true" className="block h-px w-12 bg-sky-400" />
        <Heading className="mt-5 font-serif text-[2rem] font-medium leading-tight sm:text-[2.5rem]">{leader.name}</Heading>
        <p className="mt-2 text-base font-semibold text-sky-600 sm:text-lg">{leader.designation}</p>
        {leader.bio && leader.bio.length > 0 && (
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-charcoal-muted">
            {leader.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
