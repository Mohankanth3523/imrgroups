import { Link } from 'react-router-dom';
import { Button } from '../components/shared/Button';
import { pageMeta } from '../data/pages';
import { publishedProjects } from '../data/projects';
import { useSeo } from '../hooks/useSeo';

export default function NotFoundPage() {
  useSeo(pageMeta.notFound);

  return (
    <section className="bg-ivory">
      <div className="container-site grid grid-cols-1 gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-serif text-7xl text-sky-400 md:text-8xl" aria-hidden="true">
            404
          </p>
          <h1 className="heading-lg mt-4">We could not find that page.</h1>
          <p className="lede mt-4">
            The link may be old or mistyped. Try one of our projects, or go back to the home page.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/">Go to the home page</Button>
            <Button to="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </div>
        <nav aria-label="Projects" className="lg:col-span-5">
          <h2 className="text-sm font-semibold text-charcoal-muted">Our projects</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {publishedProjects.map((p) => (
              <li key={p.id}>
                <Link to={`/projects/${p.slug}`} className="block py-4 font-serif text-xl text-navy hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
