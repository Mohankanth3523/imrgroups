# IMR GROUPS — website

Corporate website for IMR GROUPS, Hosur, Tamil Nadu. Built with React 18, TypeScript,
Vite, Tailwind CSS, Framer Motion, Lucide icons and React Router.

> **Before publishing, read [CONTENT-MAINTENANCE.md](CONTENT-MAINTENANCE.md)** — prices,
> approvals and availability are taken from marketing material and need confirming.

## Run it

Requires Node.js 18.18 or newer.

```bash
npm install
cp .env.example .env      # then set VITE_SITE_URL once the domain is known
npm run dev               # http://localhost:5173
npm run build             # type-checks, builds to dist/, writes per-page SEO HTML
npm run preview           # serve the production build locally
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, projects, why IMR GROUPS, buying journey, locations, contact CTA |
| `/about` | About Us |
| `/projects` | All projects, with working type and location filters |
| `/projects/:slug` | Project detail (generated from data) |
| `/why-imr-groups` | Service commitments, journey, pre-purchase checklist |
| `/contact` | Contact details and enquiry form. `?type=site-visit&project=<slug>` pre-fills it |
| anything else | 404 page |

## Project structure

```
src/
  config/       site.ts (phone, WhatsApp, tagline, optional email/address/socials), navigation.ts
  data/         projects.ts (the project catalogue), content.ts (copy), pages.ts (SEO metadata)
  types/        project.ts — the Project data model
  lib/          whatsapp.ts, leads.ts, validation.ts, projectFaqs.ts, seoTags.ts, env.ts
  hooks/        useSeo.ts, useScrolled.ts
  components/
    layout/     Header, Footer, MobileContactBar, Layout
    home/       Hero and homepage sections
    projects/   ProjectCard, ProjectGrid, ProjectFacts, ProjectGallery, FaqAccordion
    forms/      EnquiryForm
    shared/     Button, Logo, PageHero, ProjectFigure, SectionHeader
  pages/        one file per route
build/seo-plugin.ts   Vite plugin: per-route HTML head tags, 404.html, sitemap.xml, robots.txt
public/brand/         circular logo (imr-groups-logo.png/.webp), favicon set + web manifest,
                      social share image, and the supplied source logo (logo-original.png)
public/favicon.ico    16/32/48 px icon for browsers that request /favicon.ico
public/images/        hero/, projects/, about/ — licensed representative photos (see CONTENT-MAINTENANCE.md)
```

## Enquiries and WhatsApp

- `src/lib/whatsapp.ts` builds `wa.me` links with URL-encoded, project-specific messages.
  The number lives in `src/config/site.ts`.
- **No backend is configured.** The enquiry form validates the input, then opens WhatsApp
  with the enquiry pre-written; the visitor presses send. The page says exactly that and
  stores nothing in the browser.
- **To connect a CRM or form service**, set `VITE_LEAD_ENDPOINT` to an HTTPS URL. The form
  then `POST`s JSON and shows "Enquiry sent" only on a 2xx response; on failure it offers
  WhatsApp and phone instead. Payload:

  ```json
  {
    "name": "Ravi Kumar",
    "phone": "+91 98765 43210",
    "project": "Varam Classic Garden",
    "enquiryType": "site-visit",
    "preferredContact": "whatsapp",
    "visitDate": "2026-11-02",
    "message": "Looking for a 1,200 sq. ft. plot.",
    "consent": true,
    "source": "/projects/varam-classic-garden"
  }
  ```

  The endpoint must allow CORS from the site's domain and should rate-limit / add spam
  protection (e.g. a honeypot or Turnstile) on the server side.

## SEO

- Each route gets its own title, description, canonical URL and Open Graph/Twitter tags —
  in the browser via `useSeo`, and as static HTML at build time via `build/seo-plugin.ts`
  so link previews on WhatsApp/Facebook work without JavaScript.
- `sitemap.xml` and the `Sitemap:` line in `robots.txt` are generated only when
  `VITE_SITE_URL` is set.
- Structured data: an `Organization` with only confirmed facts (name, phone, area served,
  logo). Add an address in `src/config/site.ts` before switching to `LocalBusiness`.
- Social share image: `public/brand/og-image.png` (1364×768). Replace freely.

## Deploying

`npm run build` outputs a static site in `dist/`. Every route has its own `index.html`, so
any static host works (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, cPanel/Apache).

- Netlify / Cloudflare Pages: build command `npm run build`, publish directory `dist`.
  `404.html` is used for unknown URLs automatically.
- Vercel: framework preset "Vite", output `dist`.
- Apache/cPanel: upload the contents of `dist/`, and add `ErrorDocument 404 /404.html`.

Set `VITE_SITE_URL` (and optionally `VITE_LEAD_ENDPOINT`) as environment variables on the
host before building.

## Accessibility and performance notes

- Skip link, visible focus styles, labelled form fields with linked error messages,
  keyboard-operable menu (Escape closes, focus is kept inside), accordion and lightbox.
- Animations respect `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` + CSS).
- Images reserve their space (no layout shift); below-the-fold images are lazy-loaded.
- Secondary pages are code-split; React and Framer Motion are split into vendor chunks.
- The mobile contact bar is offset with matching body padding so it never covers content.
