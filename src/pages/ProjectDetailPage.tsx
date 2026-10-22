import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarCheck, Check, Clock, Info, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { FaqAccordion } from '../components/projects/FaqAccordion';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectFacts } from '../components/projects/ProjectFacts';
import { ProjectGallery } from '../components/projects/ProjectGallery';
import { Button } from '../components/shared/Button';
import { Breadcrumbs } from '../components/shared/PageHero';
import { site } from '../config/site';
import { projectMeta } from '../data/pages';
import { getProjectBySlug, publishedProjects } from '../data/projects';
import { useSeo } from '../hooks/useSeo';
import { projectFaqs } from '../lib/projectFaqs';
import { headlinePrice } from '../lib/projectPrice';
import { projectWhatsappUrl, siteVisitMessage, telHref, whatsappUrl } from '../lib/whatsapp';
import type { Project } from '../types/project';
import NotFoundPage from './NotFoundPage';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <NotFoundPage />;
  return <ProjectDetail key={project.id} project={project} />;
}

function formatVerified(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function ProjectDetail({ project }: { project: Project }) {
  const meta = useMemo(() => projectMeta(project), [project]);
  useSeo(meta);

  const faqs = projectFaqs(project);
  const others = publishedProjects.filter((p) => p.id !== project.id).slice(0, 2);
  const price = headlinePrice(project);
  const hasPricing = Boolean(project.startingPrice || project.priceOptions?.length || project.ratePerSqFt);

  return (
    <>
      {/* Header: image-led, with title and actions on a navy gradient */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <img
          src={project.coverImage.src}
          srcSet={project.coverImage.srcSet}
          sizes="100vw"
          alt={project.coverImage.alt}
          width={project.coverImage.width}
          height={project.coverImage.height}
          loading="eager"
          decoding="async"
          style={project.coverImage.objectPosition ? { objectPosition: project.coverImage.objectPosition } : undefined}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 from-10% via-navy-950/70 via-50% to-navy-950/20 lg:bg-gradient-to-r lg:from-navy-950/90 lg:via-navy-950/60 lg:to-navy-950/10"
        />
        <div className="container-site flex min-h-[30rem] flex-col justify-between gap-10 pb-10 pt-6 sm:min-h-[32rem] md:pb-14 lg:min-h-[36rem] lg:pt-8">
          <div className="[&_a]:text-white/80 [&_a:hover]:text-white [&_li]:text-white/70 [&_span]:text-white/90">
            <Breadcrumbs
              crumbs={[{ label: 'Home', to: '/' }, { label: 'Our Projects', to: '/projects' }, { label: project.name }]}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="flex flex-wrap items-center gap-2">
                <span className="pill bg-white/95 text-navy">{project.category}</span>
                {project.positioning && (
                  <span className="pill border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                    {project.positioning}
                  </span>
                )}
              </p>
              <h1 className="heading-xl mt-4 text-white">{project.name}</h1>
              {project.brandLine && <p className="mt-1.5 font-serif text-lg text-white/80 sm:text-xl">{project.brandLine}</p>}
              <p className="mt-4 flex items-start gap-2 text-base text-white/90 sm:text-lg">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-sky-300" />
                {project.location.full}
              </p>
              {price && (
                <p className="mt-5 inline-flex flex-col rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                  <span className="text-xs font-semibold text-sky-200">{price.label}</span>
                  <span className="text-2xl font-bold tracking-[-0.01em] text-white">{price.value}</span>
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 min-[420px]:flex-row lg:col-span-4 lg:flex-col">
              <Button href="#enquire" variant="brand" size="lg" className="min-[420px]:flex-1">
                <CalendarCheck aria-hidden="true" className="h-5 w-5" />
                Book a Site Visit
              </Button>
              <Button href={projectWhatsappUrl(project.name)} variant="outline-light" size="lg" className="min-[420px]:flex-1">
                <MessageCircle aria-hidden="true" className="h-5 w-5 text-leaf-500" />
                WhatsApp Enquiry
              </Button>
            </div>
          </div>
        </div>
        {(project.coverImage.representative || project.coverImage.illustrative) && (
          <span className="pointer-events-none absolute bottom-2 right-3 text-[0.625rem] font-medium text-white/55">
            {project.coverImage.illustrative ? 'Illustration' : 'Representative image'}
          </span>
        )}
      </section>

      {/* Body */}
      <div className="container-site grid grid-cols-1 gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-16 lg:col-span-7 xl:col-span-8">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="heading-md">
              Overview
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-charcoal-muted">
              {project.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </section>

          {project.amenities && project.amenities.length > 0 && (
            <section aria-labelledby="amenities-heading">
              <h2 id="amenities-heading" className="heading-md">
                Amenities
              </h2>
              <p className="mt-2 text-sm text-charcoal-soft">As listed in IMR GROUPS project material.</p>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex flex-col gap-3 rounded-lg border border-line bg-ivory/70 p-4 text-[0.9375rem] font-medium leading-snug text-navy"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-leaf-50 text-leaf-600 ring-1 ring-leaf/20">
                      <Check aria-hidden="true" className="h-4 w-4" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {
            <section aria-labelledby="location-heading" className="rounded-xl border border-line bg-ivory p-5 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-azure text-white">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 id="location-heading" className="heading-md">
                    Location
                  </h2>
                  <p className="mt-1.5 text-[1.0625rem] text-charcoal-muted">{project.location.full}</p>
                </div>
              </div>

              {project.location.landmarks && project.location.landmarks.length > 0 && (
                <p className="mt-3 text-[0.9375rem] text-charcoal-muted">
                  <span className="font-semibold text-navy">Nearby references: </span>
                  {project.location.landmarks.join(', ')}
                </p>
              )}

              {project.travelTimes && project.travelTimes.length > 0 && (
                <div className="mt-6">
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {project.travelTimes.map((t) => (
                      <li key={t.destination} className="rounded-lg border border-line bg-white p-4">
                        <Clock aria-hidden="true" className="h-4 w-4 text-azure" />
                        <p className="mt-3 font-semibold text-navy">{t.duration}</p>
                        <p className="text-sm text-charcoal-muted">to {t.destination}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-charcoal-soft">
                    Approximate travel times as stated in project material; actual times vary with route and traffic.
                  </p>
                </div>
              )}

              {project.locationHighlights && project.locationHighlights.length > 0 && (
                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {project.locationHighlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 ring-1 ring-line">
                      <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-leaf-600" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {project.mapUrl ? (
                  <Button href={project.mapUrl} variant="secondary">
                    <Navigation aria-hidden="true" className="h-4 w-4" />
                    Get directions
                  </Button>
                ) : (
                  <Button
                    href={whatsappUrl(`Hello IMR GROUPS, please share the location pin for ${project.name}.`)}
                    variant="whatsapp"
                  >
                    <Navigation aria-hidden="true" className="h-4 w-4 text-leaf-500" />
                    Ask for the location pin
                  </Button>
                )}
              </div>
            </section>
          }

          {project.gallery && project.gallery.length > 0 && (
            <section aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="heading-md">
                Gallery
              </h2>
              <div className="mt-6">
                <ProjectGallery images={project.gallery} projectName={project.name} />
              </div>
            </section>
          )}

          {project.masterPlanImage && (
            <section aria-labelledby="plan-heading">
              <h2 id="plan-heading" className="heading-md">
                Master plan
              </h2>
              <a
                href={project.masterPlanImage.src}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block overflow-hidden rounded border border-line"
              >
                <img
                  src={project.masterPlanImage.src}
                  alt={project.masterPlanImage.alt}
                  width={project.masterPlanImage.width}
                  height={project.masterPlanImage.height}
                  loading="lazy"
                  className="w-full"
                />
              </a>
              <p className="mt-2 text-sm text-charcoal-soft">Opens the full-size plan in a new tab.</p>
            </section>
          )}

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="heading-md">
              Questions buyers ask
            </h2>
            <div className="mt-6">
              <FaqAccordion items={faqs} />
            </div>
          </section>
        </div>

        {/* Key facts */}
        <aside aria-labelledby="facts-heading" className="order-first lg:order-none lg:col-span-5 xl:col-span-4">
          <div className="relative overflow-hidden rounded-lg border border-line bg-white p-6 shadow-card sm:p-7 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-navy via-azure to-sky-400" />
            <h2 id="facts-heading" className="font-serif text-2xl text-navy">
              Key facts
            </h2>
            <ProjectFacts project={project} variant="panel" className="mt-5" />

            {Boolean(project.pricingNote || hasPricing || project.approvalLabels?.length) && (
              <div className="mt-5 flex gap-2.5 rounded-lg bg-ivory p-4 text-[0.8125rem] leading-relaxed text-charcoal-muted">
                <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-azure" />
                <div className="space-y-2">
                  {project.pricingNote ? (
                    <p>{project.pricingNote}</p>
                  ) : (
                    hasPricing && <p>Prices as stated in IMR GROUPS project material and subject to change.</p>
                  )}
                  {project.approvalLabels && project.approvalLabels.length > 0 && (
                    <p>
                      Approvals are as stated by IMR GROUPS.
                      {project.approvalReferences?.length
                        ? ` References: ${project.approvalReferences.join(', ')}.`
                        : ' Ask for approval reference numbers and verify the documents before purchase.'}
                    </p>
                  )}
                </div>
              </div>
            )}

            {project.lastVerifiedAt && (
              <p className="mt-4 text-[0.8125rem] text-charcoal-soft">
                Details last confirmed on {formatVerified(project.lastVerifiedAt)}.
              </p>
            )}

            <div className="mt-6 grid grid-cols-1 gap-3">
              <Button href="#enquire" variant="brand">
                <CalendarCheck aria-hidden="true" className="h-4 w-4" />
                Book a Site Visit
              </Button>
              <Button href={whatsappUrl(siteVisitMessage(project.name))} variant="whatsapp">
                <MessageCircle aria-hidden="true" className="h-4 w-4 text-leaf-500" />
                Arrange a visit on WhatsApp
              </Button>
              <Button href={telHref} variant="secondary">
                <Phone aria-hidden="true" className="h-4 w-4" />
                Call {site.phone.display}
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Enquiry */}
      <section id="enquire" aria-labelledby="enquire-heading" className="bg-gradient-to-b from-ivory to-white">
        <div className="container-site grid grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="enquire-heading" className="heading-lg">
              Enquire about {project.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-muted">
              Ask for plot-wise prices and availability, or pick a date to visit the site.
            </p>
            <p className="mt-6 text-[0.9375rem] text-charcoal-muted">
              Prefer to talk?{' '}
              <a href={telHref} className="link-underline font-semibold text-navy">
                Call {site.phone.display}
              </a>
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-5 shadow-card sm:p-8 lg:col-span-8">
            <EnquiryForm defaultProject={project.slug} defaultType="site-visit" source={`/projects/${project.slug}`} />
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="more-heading" className="section">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more-heading" className="heading-lg">
                More from {site.name}
              </h2>
              <Link to="/projects" className="link-underline inline-block py-2 font-semibold text-navy">
                View all projects
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {others.map((p) => (
                <li key={p.id}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
