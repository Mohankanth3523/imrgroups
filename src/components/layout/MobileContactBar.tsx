import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { siteVisitPath } from '../../config/navigation';
import { getProjectBySlug } from '../../data/projects';
import { cn } from '../../lib/cn';
import { projectWhatsappUrl, telHref } from '../../lib/whatsapp';

const TYPING_SELECTOR = 'input:not([type=checkbox]):not([type=radio]), textarea, select';

/**
 * Hide the bar while the visitor is typing in a form (the on-screen keyboard
 * is open), while the mobile menu is open, or while a dialog is showing.
 */
function useShouldHide(): boolean {
  const [typing, setTyping] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => setTyping(e.target instanceof Element && e.target.matches(TYPING_SELECTOR));
    const onFocusOut = () => setTyping(false);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    const check = () =>
      setOverlay(document.body.dataset.menuOpen === 'true' || Boolean(document.querySelector('[role="dialog"][aria-modal="true"]')));
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-menu-open'], childList: true, subtree: true });
    check();

    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      observer.disconnect();
    };
  }, []);

  return typing || overlay;
}

/**
 * Compact fixed contact bar for phones. The body has matching bottom padding
 * (see index.css) so it never covers page content.
 */
export function MobileContactBar() {
  const { pathname } = useLocation();
  const project = getProjectBySlug(/^\/projects\/([^/]+)/.exec(pathname)?.[1]);
  const hidden = useShouldHide();

  const item =
    'flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg text-[0.8125rem] font-semibold leading-none transition-colors';

  return (
    <nav
      aria-label="Quick contact"
      aria-hidden={hidden || undefined}
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgba(18,50,74,0.35)] backdrop-blur transition-transform duration-200 md:hidden',
        hidden && 'pointer-events-none translate-y-full',
      )}
    >
      <div className="flex h-[var(--mobile-bar-h)] items-center gap-1.5 px-2">
        <a href={telHref} className={cn(item, 'text-navy hover:bg-ivory')} tabIndex={hidden ? -1 : undefined}>
          <Phone aria-hidden="true" className="h-[18px] w-[18px] text-azure" />
          Call
        </a>
        <a
          href={projectWhatsappUrl(project?.name)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(item, 'text-navy hover:bg-leaf-50')}
          tabIndex={hidden ? -1 : undefined}
        >
          <MessageCircle aria-hidden="true" className="h-[18px] w-[18px] text-leaf-500" />
          WhatsApp
        </a>
        <Link
          to={siteVisitPath(project?.slug)}
          className={cn(item, 'bg-navy text-white hover:bg-navy-700')}
          tabIndex={hidden ? -1 : undefined}
        >
          <CalendarCheck aria-hidden="true" className="h-[18px] w-[18px]" />
          Site Visit
        </Link>
      </div>
    </nav>
  );
}
