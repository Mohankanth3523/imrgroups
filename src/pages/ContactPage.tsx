import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { PageHero } from '../components/shared/PageHero';
import { site } from '../config/site';
import { pageMeta } from '../data/pages';
import { getProjectBySlug } from '../data/projects';
import { useSeo } from '../hooks/useSeo';
import { enquiryTypeLabels, type EnquiryType } from '../lib/leads';
import { projectWhatsappUrl, telHref } from '../lib/whatsapp';

function isEnquiryType(v: string | null): v is EnquiryType {
  return v !== null && v in enquiryTypeLabels;
}

export default function ContactPage() {
  useSeo(pageMeta.contact);
  const [params] = useSearchParams();
  const typeParam = params.get('type');
  const type: EnquiryType = isEnquiryType(typeParam) ? typeParam : 'details';
  const project = getProjectBySlug(params.get('project') ?? undefined);

  return (
    <>
      <PageHero
        title={type === 'site-visit' ? 'Book a site visit' : 'Talk to IMR GROUPS'}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        intro={
          type === 'site-visit'
            ? 'Tell us which project you would like to see and when suits you. Our team will confirm the visit and share directions.'
            : 'Call, message us on WhatsApp, or send an enquiry below. We will get back to you with project details and visit options.'
        }
      />

      <section className="section pt-12 md:pt-16">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="space-y-8 lg:col-span-4" aria-label="Contact details">
            <ContactMethod
              icon={<Phone aria-hidden="true" className="h-5 w-5 text-sky-600" />}
              title="Call the sales team"
              action={
                <a href={telHref} className="inline-block py-1.5 font-serif text-2xl text-navy hover:underline">
                  {site.phone.display}
                </a>
              }
            />
            <ContactMethod
              icon={<MessageCircle aria-hidden="true" className="h-5 w-5 text-leaf-500" />}
              title="Message on WhatsApp"
              action={
                <a
                  href={projectWhatsappUrl(project?.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 font-serif text-2xl text-navy hover:underline"
                >
                  Start a chat
                </a>
              }
              note={`Same number: ${site.phone.display}`}
            />
            <ContactMethod
              icon={<MapPin aria-hidden="true" className="h-5 w-5 text-sky-600" />}
              title="Where we work"
              action={<p className="text-lg text-charcoal">{site.officeAddress ?? `Projects in and around ${site.region}`}</p>}
              note={site.officeAddress ? undefined : 'Site locations are shared when you book a visit.'}
            />
            {site.officeHours && (
              <p className="text-[0.9375rem] text-charcoal-muted">Hours: {site.officeHours}</p>
            )}
          </aside>

          <div id="enquiry-form" className="scroll-mt-24 lg:col-span-8">
            <div className="rounded-lg border border-line bg-white p-5 shadow-card sm:p-9">
              <h2 className="heading-md">Send an enquiry</h2>
              <p className="mt-2 text-charcoal-muted">Fields marked optional can be left blank.</p>
              <EnquiryForm
                key={`${type}-${project?.slug ?? ''}`}
                className="mt-8"
                defaultProject={project?.slug}
                defaultType={type}
                source="/contact"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactMethod(props: { icon: ReactNode; title: string; action: ReactNode; note?: string }) {
  return (
    <div className="border-t border-line pt-6">
      <p className="flex items-center gap-2.5 text-sm font-semibold text-charcoal-muted">
        {props.icon}
        {props.title}
      </p>
      <div className="mt-3">{props.action}</div>
      {props.note && <p className="mt-1.5 text-sm text-charcoal-soft">{props.note}</p>}
    </div>
  );
}
