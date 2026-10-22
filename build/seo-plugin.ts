import fs from 'node:fs';
import path from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { allPageMeta, pageMeta, type PageMeta } from '../src/data/pages';
import { buildSeoTags, organizationJsonLd, seoTagsToHtml } from '../src/lib/seoTags';

const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;

export interface SeoPagesOptions {
  /** Public origin, e.g. https://www.example.in (no trailing slash needed). */
  siteUrl: string;
}

/**
 * Writes a static HTML file per route with page-specific head tags so that
 * search engines and link previews (WhatsApp, Facebook) see the right title,
 * description and image without running JavaScript. Also writes 404.html,
 * sitemap.xml and robots.txt.
 */
export function generateSeoPages(outDir: string, siteUrl: string, log: (msg: string) => void = console.log) {
  const templatePath = path.join(outDir, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  if (!SEO_BLOCK.test(template)) {
    throw new Error('[seo-pages] Could not find the <!-- seo:start --> … <!-- seo:end --> block in index.html');
  }

  const render = (page: PageMeta, jsonLd?: Record<string, unknown>) =>
    template.replace(SEO_BLOCK, seoTagsToHtml(buildSeoTags(page, siteUrl), jsonLd));

  const pages = allPageMeta();
  for (const page of pages) {
    const html = render(page, page.path === '/' ? organizationJsonLd(siteUrl) : undefined);
    const file =
      page.path === '/' ? templatePath : path.join(outDir, page.path.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
  }
  fs.writeFileSync(path.join(outDir, '404.html'), render(pageMeta.notFound));

  const robots = ['User-agent: *', 'Allow: /'];
  if (siteUrl) {
    const base = siteUrl.replace(/\/+$/, '');
    const urls = pages
      .filter((p) => !p.noindex)
      .map((p) => `  <url><loc>${base}${p.path === '/' ? '/' : p.path}</loc></url>`)
      .join('\n');
    fs.writeFileSync(
      path.join(outDir, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
    robots.push('', `Sitemap: ${base}/sitemap.xml`);
  } else {
    log('[seo-pages] VITE_SITE_URL is not set — sitemap.xml skipped and canonical URLs omitted.');
  }
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robots.join('\n') + '\n');
  log(`[seo-pages] Wrote ${pages.length} route pages, 404.html and robots.txt.`);
}

export function seoPages(options: SeoPagesOptions): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'imr-seo-pages',
    apply: 'build',
    configResolved(resolved) {
      config = resolved;
    },
    closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      generateSeoPages(outDir, options.siteUrl, (msg) => config.logger.info(msg));
    },
  };
}
