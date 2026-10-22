import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { mainNav, siteVisitPath } from '../../config/navigation';
import { site } from '../../config/site';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../lib/cn';
import { projectWhatsappUrl, telHref } from '../../lib/whatsapp';
import { Button } from '../shared/Button';
import { Logo } from '../shared/Logo';

export function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  // Lock page scroll, close on Escape, keep focus inside the open menu.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.dataset.menuOpen = 'true';

    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === 'Tab') {
        const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      delete document.body.dataset.menuOpen;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-white/95 backdrop-blur transition-[box-shadow,border-color] duration-300 supports-[backdrop-filter]:bg-white/85',
        scrolled || open ? 'border-b border-line shadow-[0_6px_20px_-14px_rgba(18,50,74,0.35)]' : 'border-b border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only left-4 top-3 z-50 rounded bg-navy px-4 py-2 text-white focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>
      <div
        className="container-site flex h-[var(--header-h)] items-center justify-between gap-4 lg:gap-6">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3" aria-label="IMR GROUPS — home">
          <Logo eager className="h-10 w-10 sm:h-11 sm:w-11 lg:h-14 lg:w-14" sizes="(min-width: 1024px) 56px, 44px" />
          <span className="whitespace-nowrap font-serif text-[1.0625rem] font-semibold leading-none tracking-[0.01em] text-navy sm:text-xl lg:hidden xl:inline">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative whitespace-nowrap rounded px-2.5 py-2 text-[0.9375rem] font-medium transition-colors hover:text-navy xl:px-3',
                      'after:absolute after:inset-x-2.5 after:-bottom-0.5 xl:after:inset-x-3 after:h-0.5 after:origin-left after:rounded-full after:bg-azure after:transition-transform',
                      isActive ? 'text-navy after:scale-x-100' : 'text-charcoal-muted after:scale-x-0',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 whitespace-nowrap rounded px-3 py-2 text-sm font-semibold text-navy hover:bg-ivory md:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone aria-hidden="true" className="h-4 w-4 text-sky-600" />
            {site.phone.display}
          </a>
          <Button to={siteVisitPath()} variant="brand" size="sm" className="hidden whitespace-nowrap sm:inline-flex">
            Book a Site Visit
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy hover:bg-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site py-6">
              <ul className="divide-y divide-line">
                {mainNav.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.2 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between py-4 font-serif text-2xl',
                          isActive ? 'text-navy' : 'text-charcoal',
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isActive && <span className="h-2 w-2 rounded-full bg-sky-400" aria-hidden="true" />}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-1 gap-3">
                <Button to={siteVisitPath()} variant="brand" size="lg">
                  Book a Site Visit
                </Button>
                <Button href={telHref} variant="secondary" size="lg">
                  <Phone aria-hidden="true" className="h-5 w-5" /> Call {site.phone.display}
                </Button>
                <Button href={projectWhatsappUrl()} variant="whatsapp" size="lg">
                  <MessageCircle aria-hidden="true" className="h-5 w-5 text-leaf-500" /> Chat on WhatsApp
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
