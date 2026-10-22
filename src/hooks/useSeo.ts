import { useEffect } from 'react';
import type { PageMeta } from '../data/pages';
import { SITE_URL } from '../lib/env';
import { buildSeoTags } from '../lib/seoTags';

function upsertMeta(key: 'name' | 'property', id: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${id}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, id);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps <head> in sync with the current page during client-side navigation.
 * Static per-route HTML with the same tags is generated at build time.
 */
export function useSeo(page: PageMeta, jsonLd?: Record<string, unknown>) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const siteUrl = SITE_URL || window.location.origin;
    const tags = buildSeoTags(page, siteUrl);
    document.title = tags.title;
    for (const m of tags.meta) upsertMeta(m.key, m.id, m.content);

    // Remove a stale robots tag when moving from a noindex page.
    if (!page.noindex) document.head.querySelector('meta[name="robots"]')?.remove();

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (tags.canonical) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = tags.canonical;
    }

    let script = document.getElementById('ld-json');
    if (jsonLdString) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'ld-json';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = jsonLdString;
    } else {
      script?.remove();
    }
  }, [page, jsonLdString]);
}
