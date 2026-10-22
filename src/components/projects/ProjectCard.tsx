import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, MessageCircle } from 'lucide-react';
import type { Project } from '../../types/project';
import { headlinePrice } from '../../lib/projectPrice';
import { projectWhatsappUrl } from '../../lib/whatsapp';
import { Button } from '../shared/Button';
import { ProjectFigure } from '../shared/ProjectFigure';
import { ProjectFacts } from './ProjectFacts';

interface ProjectCardProps {
  project: Project;
  headingLevel?: 'h2' | 'h3';
}

const MAX_AMENITIES = 3;

export function ProjectCard({ project, headingLevel = 'h3' }: ProjectCardProps) {
  const Heading = headingLevel;
  const href = `/projects/${project.slug}`;
  const price = headlinePrice(project);
  // Amenities where supplied; otherwise the stated location highlights.
  const amenities = project.amenities?.length ? project.amenities : project.locationHighlights ?? [];
  const chipsLabel = project.amenities?.length ? 'Amenities' : 'Location highlights';
  const extraAmenities = amenities.length - MAX_AMENITIES;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <Link to={href} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden">
        <ProjectFigure
          image={project.coverImage}
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          labelPosition="top-right"
        />
        <span className="pill absolute left-3 top-3 bg-white/95 text-navy shadow-sm">{project.category}</span>
        {price && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 via-navy-950/40 to-transparent px-4 pb-3 pt-12 sm:px-5">
            <span className="block text-[0.6875rem] font-semibold text-sky-200">{price.label}</span>
            <span className="block text-xl font-bold tracking-[-0.01em] text-white sm:text-[1.375rem]">{price.value}</span>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Heading className="font-serif text-[1.5rem] font-medium leading-tight sm:text-[1.625rem]">
          <Link to={href} className="hover:text-azure-700">
            {project.name}
          </Link>
        </Heading>

        <p className="mt-2 flex items-start gap-2 text-[0.9375rem] text-charcoal-muted">
          <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-azure" />
          <span>
            {project.location.short}
            {project.positioning && <span className="text-charcoal-soft"> · {project.positioning}</span>}
          </span>
        </p>

        <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-charcoal-muted">{project.shortDescription}</p>

        <ProjectFacts project={project} className="mt-4" />

        {amenities.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={chipsLabel}>
            {amenities.slice(0, MAX_AMENITIES).map((a) => (
              <li
                key={a}
                className="inline-flex items-center gap-1 rounded-full bg-ivory px-2.5 py-1 text-xs font-medium text-navy ring-1 ring-line"
              >
                <Check aria-hidden="true" className="h-3 w-3 text-leaf-600" />
                {a}
              </li>
            ))}
            {extraAmenities > 0 && (
              <li className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-charcoal-soft">
                +{extraAmenities} more
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex flex-col gap-2.5 pt-6 min-[400px]:flex-row">
          <Button to={href} className="flex-1" aria-label={`View details: ${project.name}`}>
            View Details
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button
            href={projectWhatsappUrl(project.name)}
            variant="whatsapp"
            className="flex-1"
            aria-label={`Enquire about ${project.name} on WhatsApp (opens in a new tab)`}
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4 text-leaf-500" />
            WhatsApp Enquiry
          </Button>
        </div>
      </div>
    </article>
  );
}
