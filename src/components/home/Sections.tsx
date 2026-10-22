import {
  CalendarCheck,
  ClipboardList,
  Clock,
  Footprints,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteVisitPath } from '../../config/navigation';
import { site } from '../../config/site';
import { approachSteps, commitments, homeFaqs, type Commitment } from '../../data/content';
import { managingDirector } from '../../data/leadership';
import { featuredProjects, publishedProjects } from '../../data/projects';
import { aboutImage, projectCovers } from '../../data/siteImages';
import { projectWhatsappUrl, telHref, whatsappUrl } from '../../lib/whatsapp';
import { FaqAccordion } from '../projects/FaqAccordion';
import { ProjectGrid } from '../projects/ProjectGrid';
import { Button } from '../shared/Button';
import { LeaderPortrait } from '../shared/LeaderProfile';
import { SectionHeader } from '../shared/SectionHeader';

export function ProjectDiscovery() {
  return (
    <section aria-labelledby="projects-heading" className="section bg-ivory">
      <div className="container-site">
        <SectionHeader
          id="projects-heading"
          eyebrow="Featured properties"
          title="Plots and homes around Hosur"
          intro="Prices and approvals are as stated in IMR GROUPS project material. Confirm current details with our team."
          action={
            <Button to="/projects" variant="secondary">
              View all projects
            </Button>
          }
        />
        <div className="mt-10 md:mt-12">
          <ProjectGrid projects={featuredProjects} />
        </div>
      </div>
    </section>
  );
}

const commitmentIcons: Record<Commitment['icon'], LucideIcon> = {
  clipboard: ClipboardList,
  footprints: Footprints,
  ruler: Ruler,
  phone: Phone,
  map: MapIcon,
};

export function WhyChoose({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel;
  return (
    <section
      aria-labelledby="why-heading"
      className="section relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy to-azure-700 text-white"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] text-white/[0.06]"
        viewBox="0 0 200 200"
        fill="none"
      >
        {[90, 75, 60, 45, 30].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="0.6" />
        ))}
      </svg>
      <div className="container-site relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="pill bg-white/10 text-sky-200">Why {site.name}</p>
          <Heading id="why-heading" className="heading-lg mt-4 text-white">
            Why buyers talk to {site.name}
          </Heading>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Buying land is a big decision. These are the commitments we make to everyone who enquires with us.
          </p>
          {headingLevel === 'h2' && (
            <Button to="/why-imr-groups" variant="outline-light" className="mt-7">
              How we work
            </Button>
          )}
          {managingDirector && (
            <Link
              to="/about#leadership"
              className="group mt-8 flex max-w-xs items-center gap-4 rounded-lg border border-white/15 bg-white/5 p-4"
            >
              <LeaderPortrait
                leader={managingDirector}
                compact
                className="h-12 w-12 shrink-0 bg-white/10 ring-1 ring-sky-300/60"
              />
              <span className="min-w-0">
                <span className="block font-serif text-lg text-white group-hover:underline group-hover:decoration-sky-300 group-hover:underline-offset-4">
                  {managingDirector.name}
                </span>
                <span className="block text-sm text-white/70">{managingDirector.designation}</span>
              </span>
            </Link>
          )}
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
          {commitments.map((c) => {
            const Icon = commitmentIcons[c.icon];
            return (
              <li
                key={c.title}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5 transition-colors hover:bg-white/[0.1] sm:p-6 sm:last:odd:col-span-2"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-400/20 text-sky-200">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-sans text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{c.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function LocationFocus() {
  return (
    <section aria-labelledby="location-heading" className="section bg-white">
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeader
            id="location-heading"
            eyebrow="Location advantages"
            title="Focused on Hosur and its growing corridors"
            intro="From the bus stand area in town to the Mathigiri–Kelamangalam road and the Kelamangalam side."
          />
          <div className="relative mt-8 hidden overflow-hidden rounded-lg bg-navy-900 lg:block">
            <img
              src={projectCovers.varam.src}
              srcSet={projectCovers.varam.srcSet}
              sizes="480px"
              alt=""
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <span className="absolute bottom-3 right-3 rounded-sm bg-navy-950/60 px-2 py-0.5 text-[0.625rem] text-white/85">
              Representative image
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {publishedProjects.map((p) => (
              <li key={p.id} className="flex flex-col rounded-lg border border-line bg-ivory/60 p-5">
                <span className="pill self-start bg-azure-50 text-azure-700">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {p.location.area}
                </span>
                <h3 className="mt-3 font-serif text-xl leading-snug">
                  <Link to={`/projects/${p.slug}`} className="hover:text-azure-700">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-charcoal-muted">{p.location.full}</p>
                {p.travelTimes && (
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Approximate travel times">
                    {p.travelTimes.map((t) => (
                      <li
                        key={t.destination}
                        className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-charcoal-muted ring-1 ring-line"
                      >
                        <Clock aria-hidden="true" className="h-3 w-3 text-sky-600" />
                        {t.duration.replace('about ', '~')} to {t.destination}
                      </li>
                    ))}
                  </ul>
                )}
                {p.mapUrl && (
                  <a
                    href={p.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-3 inline-block py-1 text-sm font-semibold text-navy"
                  >
                    Get directions
                  </a>
                )}
              </li>
            ))}
          </ul>
          <Button
            href={whatsappUrl('Hello IMR GROUPS, please share the location pins for your current projects.')}
            variant="whatsapp"
            className="mt-6"
          >
            <MapPin aria-hidden="true" className="h-4 w-4 text-leaf-500" />
            Ask for location pins on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section aria-labelledby="approach-heading" className="section bg-ivory">
      <div className="container-site">
        <SectionHeader
          id="approach-heading"
          eyebrow="Site visits"
          title="How your site visit works"
          intro="A simple path, at your pace. There is no obligation at any step."
        />
        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 md:mt-12">
          {approachSteps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 rounded-lg border border-line bg-white p-5 lg:flex-col lg:gap-0">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azure font-sans text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(8,120,209,0.7)]">
                {i + 1}
              </span>
              <div className="lg:mt-5">
                <h3 className="font-sans text-[1.0625rem] font-semibold text-navy">{s.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-charcoal-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to={siteVisitPath()} variant="brand">
            <CalendarCheck aria-hidden="true" className="h-4 w-4" />
            Book a Site Visit
          </Button>
          <Button href={projectWhatsappUrl()} variant="whatsapp">
            <MessageCircle aria-hidden="true" className="h-4 w-4 text-leaf-500" />
            Ask a question on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomeFaq() {
  return (
    <section aria-labelledby="faq-heading" className="section bg-white">
      <div className="container-site grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeader
            id="faq-heading"
            eyebrow="Questions"
            title="Before you call"
            intro="Quick answers to what buyers usually ask first."
          />
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={homeFaqs(publishedProjects)} />
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="relative isolate overflow-hidden bg-navy-950 text-white">
      <img
        src={aboutImage.src}
        srcSet={aboutImage.srcSet}
        sizes="100vw"
        alt=""
        width={aboutImage.width}
        height={aboutImage.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_75%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-azure-700/70"
      />
      <div className="container-site grid grid-cols-1 gap-8 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="final-cta-heading" className="heading-lg max-w-[20ch] text-white">
            Your Next Property Decision Starts with a Conversation.
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-white/80">
            Talk to the {site.name} team about locations, plot sizes, prices and visiting a site.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:col-span-5">
          <Button href={telHref} variant="light" size="lg">
            <Phone aria-hidden="true" className="h-5 w-5 text-azure" />
            Call {site.name}
          </Button>
          <Button href={projectWhatsappUrl()} variant="outline-light" size="lg">
            <MessageCircle aria-hidden="true" className="h-5 w-5 text-leaf-500" />
            Enquire on WhatsApp
          </Button>
          <Button to={siteVisitPath()} variant="brand" size="lg">
            <CalendarCheck aria-hidden="true" className="h-5 w-5" />
            Book a Site Visit
          </Button>
        </div>
      </div>
    </section>
  );
}
