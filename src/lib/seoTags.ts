import { site } from '../config/site';
import { leadership } from '../data/leadership';
import type { PageMeta } from '../data/pages';

/** A <meta> tag keyed by `name` or `property`. */
export interface MetaTag {
  key: 'name' | 'property';
  id: string;
  content: string;
}

export interface SeoTags {
  title: string;
  canonical?: string;
  meta: MetaTag[];
}

export function absoluteUrl(siteUrl: string, path: string): string | undefined {
  if (!siteUrl) return undefined;
  return siteUrl.replace(/\/+$/, '') + (path === '/' ? '/' : path);
}

/** Builds the tag set for a page. Pure — safe to use at build time in Node. */
export function buildSeoTags(page: PageMeta, siteUrl: string): SeoTags {
  const canonical = absoluteUrl(siteUrl, page.path);
  const imagePath = page.image ?? site.ogImage;
  const image = absoluteUrl(siteUrl, imagePath) ?? imagePath;

  const meta: MetaTag[] = [
    { key: 'name', id: 'description', content: page.description },
    { key: 'property', id: 'og:type', content: page.type ?? 'website' },
    { key: 'property', id: 'og:site_name', content: site.name },
    { key: 'property', id: 'og:locale', content: 'en_IN' },
    { key: 'property', id: 'og:title', content: page.title },
    { key: 'property', id: 'og:description', content: page.description },
    { key: 'property', id: 'og:image', content: image },
    { key: 'name', id: 'twitter:card', content: 'summary_large_image' },
    { key: 'name', id: 'twitter:title', content: page.title },
    { key: 'name', id: 'twitter:description', content: page.description },
    { key: 'name', id: 'twitter:image', content: image },
  ];
  if (canonical) meta.push({ key: 'property', id: 'og:url', content: canonical });
  if (page.noindex) meta.push({ key: 'name', id: 'robots', content: 'noindex' });

  return { title: page.title, canonical, meta };
}

/**
 * Organization structured data — only confirmed facts (name, phone, logo,
 * area served). Add address, sameAs etc. once confirmed in config/site.ts.
 */
export function organizationJsonLd(siteUrl: string): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    telephone: site.phone.e164,
    areaServed: { '@type': 'City', name: 'Hosur' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone.e164,
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'ta'],
    },
  };
  if (leadership.length) {
    data.employee = leadership.map((l) => ({ '@type': 'Person', name: l.plainName, jobTitle: l.jobTitle }));
  }
  const url = absoluteUrl(siteUrl, '/');
  if (url) {
    data.url = url;
    data.logo = absoluteUrl(siteUrl, site.logo.src);
  }
  if (site.email) data.email = site.email;
  if (site.socialLinks.length) data.sameAs = site.socialLinks.map((s) => s.href);
  return data;
}

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Serialises tags to HTML for static pages. */
export function seoTagsToHtml(tags: SeoTags, jsonLd?: Record<string, unknown>): string {
  const lines = [`<title>${escapeAttr(tags.title)}</title>`];
  for (const m of tags.meta) {
    lines.push(`<meta ${m.key}="${m.id}" content="${escapeAttr(m.content)}" />`);
  }
  if (tags.canonical) lines.push(`<link rel="canonical" href="${escapeAttr(tags.canonical)}" />`);
  if (jsonLd) {
    lines.push(
      `<script type="application/ld+json" id="ld-json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
    );
  }
  return lines.join('\n    ');
}
