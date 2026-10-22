import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { mainNav, siteVisitPath } from '../../config/navigation';
import { site } from '../../config/site';
import { managingDirector } from '../../data/leadership';
import { publishedProjects } from '../../data/projects';
import { projectWhatsappUrl, telHref } from '../../lib/whatsapp';
import { Logo } from '../shared/Logo';

/** Footer link: padded vertically for a comfortable touch target. */
const linkClass = 'inline-block py-2 hover:text-white hover:underline';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-950 text-white/75">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-azure via-sky-400 to-leaf-500/80" />
      <div className="container-site grid grid-cols-1 gap-x-8 gap-y-12 py-14 sm:grid-cols-2 md:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo className="h-20 w-20 sm:h-24 sm:w-24" sizes="96px" />
          <p className="mt-6 font-serif text-xl text-white">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed">
            Residential plots and property opportunities in and around {site.region}.
          </p>
          {managingDirector && (
            <p className="mt-5 text-[0.9375rem] leading-relaxed">
              <span className="text-white">{managingDirector.name}</span>
              <br />
              <span className="text-white/60">{managingDirector.designation}</span>
            </p>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-3 space-y-0.5 text-[0.9375rem]">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={siteVisitPath()} className={linkClass}>
                Book a site visit
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Projects">
          <h2 className="text-sm font-semibold text-white">Projects</h2>
          <ul className="mt-3 space-y-0.5 text-[0.9375rem]">
            {publishedProjects.map((p) => (
              <li key={p.id}>
                <Link to={`/projects/${p.slug}`} className={linkClass}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-sm font-semibold text-white">Talk to us</h2>
          <ul className="mt-3 space-y-0.5 text-[0.9375rem]">
            <li>
              <a href={telHref} className="inline-flex min-h-[44px] items-center gap-2.5 text-white hover:underline">
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-300" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={projectWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2.5 text-white hover:underline"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-300" />
                WhatsApp {site.phone.display}
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all text-white`}>
                  {site.email}
                </a>
              </li>
            )}
            {site.officeAddress && <li className="py-1.5 leading-relaxed">{site.officeAddress}</li>}
            <li className="pt-1.5 text-white/60">Projects in and around {site.region}</li>
          </ul>
          {site.socialLinks.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-5 text-[0.9375rem]">
              {site.socialLinks.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} text-white`}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site py-6 text-[0.8125rem] leading-relaxed text-white/55">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="text-xs text-white/50">
              Website Powered by{' '}
              <a
                href="https://mkzora.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MKZORA — website development and digital services (opens in a new tab)"
                className="inline-block py-1 font-semibold tracking-[0.04em] text-sky-300 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                MKZORA
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
