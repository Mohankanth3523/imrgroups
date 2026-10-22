import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileContactBar } from './MobileContactBar';

/** Scrolls to the top on page change, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Pages load lazily, so retry for a short while until the target exists.
      let raf = 0;
      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ block: 'start' });
        } else if (tries++ < 60) {
          raf = requestAnimationFrame(attempt);
        } else {
          window.scrollTo(0, 0);
        }
      };
      raf = requestAnimationFrame(attempt);
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
