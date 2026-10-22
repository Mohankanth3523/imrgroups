import { Link } from 'react-router-dom';
import { FinalCta } from '../components/home/Sections';
import { Button } from '../components/shared/Button';
import { LeaderProfile } from '../components/shared/LeaderProfile';
import { Logo } from '../components/shared/Logo';
import { PageHero } from '../components/shared/PageHero';
import { ProjectFigure } from '../components/shared/ProjectFigure';
import { site } from '../config/site';
import { companyProfile } from '../data/content';
import { leadership } from '../data/leadership';
import { aboutImage } from '../data/siteImages';
import { pageMeta } from '../data/pages';
import { publishedProjects } from '../data/projects';
import { useSeo } from '../hooks/useSeo';

const principles = [
  {
    title: 'Information first',
    body: 'Every enquiry starts with the facts we have on record — location, sizes, stated prices and approvals — so you know what to ask about.',
  },
  {
    title: 'Visits before decisions',
    body: 'Land is best judged in person. We encourage every buyer to see the site, the access road and the neighbourhood before committing.',
  },
  {
    title: 'Straight answers',
    body: 'If we do not have a detail yet, we say so and find out, rather than guessing.',
  },
  {
    title: 'Your pace',
    body: 'Take the time you need to review documents and talk it over with your family and advisers.',
  },
];

export default function AboutPage() {
  useSeo(pageMeta.about);

  return (
    <>
      <PageHero
        title={`About ${site.name}`}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        intro={`${site.name} is a real estate business based in Hosur, Tamil Nadu, offering residential plots and homes in and around the town.`}
      />

      <section aria-labelledby="focus-heading" className="section">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="focus-heading" className="heading-lg">
              What we do
            </h2>
            <Logo className="mt-8 h-28 w-28 sm:h-36 sm:w-36 lg:h-40 lg:w-40" sizes="160px" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-charcoal-muted lg:col-span-7">
            {companyProfile.story ? (
              <p>{companyProfile.story}</p>
            ) : (
              <>
                <p>
                  We bring residential plots and property opportunities in the Hosur area to buyers looking to
                  build a home or invest in land. Our current projects range from plots near the Hosur Bus Stand to
                  developments along the Mathigiri–Kelamangalam road and near Kelamangalam.
                </p>
                <p>
                  Our job is to help you understand each option clearly, show you the land in person, and answer
                  your questions directly — so that the decision you make is an informed one.
                </p>
              </>
            )}
            {companyProfile.foundedYear && <p>Established in {companyProfile.foundedYear}.</p>}
          </div>
        </div>
        <div className="container-site mt-14 md:mt-16">
          <ProjectFigure
            image={aboutImage}
            aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/8]"
            className="rounded-md"
            sizes="(min-width: 1216px) 1216px, 100vw"
          />
        </div>
      </section>

      {leadership.length > 0 && (
        <section id="leadership" aria-labelledby="leadership-heading" className="section bg-ivory">
          <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 id="leadership-heading" className="heading-lg">
                Meet our leadership
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-charcoal-muted">
                {site.name} is led by its Managing Director, {leadership[0].name}.
              </p>
            </div>
            <ul className="space-y-14 lg:col-span-8">
              {leadership.map((leader) => (
                <li key={leader.id}>
                  <LeaderProfile leader={leader} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="principles-heading" className="section">
        <div className="container-site">
          <h2 id="principles-heading" className="heading-lg max-w-2xl">
            How we work with buyers
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className="rounded-lg border border-line bg-white p-6 shadow-card">
                <span aria-hidden="true" className="mb-5 block h-1 w-10 rounded-full bg-azure" />
                <h3 className="font-serif text-2xl">{p.title}</h3>
                <p className="mt-3 max-w-prose leading-relaxed text-charcoal-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="current-heading" className="section bg-ivory">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="current-heading" className="heading-lg">
              Current projects
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-muted">
              Each project page lists what we have on record and lets you book a visit.
            </p>
            <Button to="/projects" variant="secondary" className="mt-8">
              Compare all projects
            </Button>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {publishedProjects.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-serif text-xl text-navy group-hover:underline group-hover:decoration-sky-400 group-hover:underline-offset-4">
                    {p.name}
                  </span>
                  <span className="text-[0.9375rem] text-charcoal-muted">
                    {p.category}, {p.location.short}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(companyProfile.registeredOffice || companyProfile.registrations.length > 0) && (
        <section aria-labelledby="company-heading" className="section">
          <div className="container-site">
            <h2 id="company-heading" className="heading-md">
              Company details
            </h2>
            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {companyProfile.registeredOffice && (
                <div>
                  <dt className="text-sm text-charcoal-soft">Registered office</dt>
                  <dd className="mt-1 text-charcoal">{companyProfile.registeredOffice}</dd>
                </div>
              )}
              {companyProfile.registrations.map((r) => (
                <div key={r.label}>
                  <dt className="text-sm text-charcoal-soft">{r.label}</dt>
                  <dd className="mt-1 text-charcoal">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
