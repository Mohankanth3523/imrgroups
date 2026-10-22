import { FileCheck2 } from 'lucide-react';
import { Approach, FinalCta, WhyChoose } from '../components/home/Sections';
import { Breadcrumbs } from '../components/shared/PageHero';
import { pageMeta } from '../data/pages';
import { useSeo } from '../hooks/useSeo';

const checklist = [
  'Title deed and ownership documents for the plot',
  'Approved layout and the approval reference numbers',
  'Encumbrance certificate',
  'Plot number, dimensions and boundaries on site',
  'Road access and what the price includes',
  'Payment schedule and registration costs',
];

export default function WhyPage() {
  useSeo(pageMeta.why);

  return (
    <>
      <div className="bg-navy-950">
        <div className="container-site pt-8 [&_a]:text-white/70 [&_a:hover]:text-white [&_li]:text-white/60 [&_span]:text-white/80">
          <Breadcrumbs crumbs={[{ label: 'Home', to: '/' }, { label: 'Why IMR Groups' }]} />
        </div>
      </div>
      <WhyChoose headingLevel="h1" />
      <Approach />

      <section aria-labelledby="checklist-heading" className="section">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="checklist-heading" className="heading-lg">
              Before you buy, check these
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-muted">
              A general checklist for buying land in Tamil Nadu. We recommend reviewing documents with an
              independent legal adviser. This is guidance, not legal advice.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-7">
            {checklist.map((c) => (
              <li key={c} className="flex items-start gap-3 border-b border-line py-4">
                <FileCheck2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" strokeWidth={1.75} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
