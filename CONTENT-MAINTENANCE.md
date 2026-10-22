# Content maintenance — verify before publishing

All project content lives in **`src/data/projects.ts`**. Pages are generated from it, so
editing that file is all you need to do to change a price, add an amenity or add a project.

Everything below was copied from IMR GROUPS marketing material (the *Project Details*
document and the website brief). None of it has been independently verified. Please have
the company confirm each item, then set `lastVerifiedAt: 'YYYY-MM-DD'` on the project —
the date is then shown on the project page.

## Must confirm before going live

| Project | Item | Current handling |
| --- | --- | --- |
| All | Prices (₹24 lakh, ₹18 lakh, ₹8,100/sq. ft., ₹39 lakh, ₹43 lakh, ₹4,499/sq. ft.) | Shown as "stated" with a note to confirm with sales |
| All | Approval labels (HNTDA, RERA, DTCP) | Shown as "Approvals (as stated)". Add approval / RERA numbers to `approvalReferences` when available |
| Advika Signature Grand | "1.5 lakh water storage" — unit not stated | Shown as supplied |
| Varam Classic Garden | Amenities (black-top roads, street lights, water facility, park, STP, children's play area, gated community) and the Anusonai reference | From the brief only — the Project Details document does not list them |
| Varam Classic Garden | Travel times (10 / 15 / 30 minutes) | Shown as approximate |
| Hosur Bus Stand Area Plots | Project name | Neutral working title — replace with the official name if there is one |
| Hosur Bus Stand Area Plots | "Only 7 plots available" | **Hidden.** Set `availabilityLabel.confirmed: true` to show it |
| Hosur Bus Stand Area Plots | "Tanishq Backside" appears next to this listing in the source | Not shown. Add to `location.landmarks` if it is the landmark |
| Hosur Bus Stand Area Plots | Plot sizes, approvals, amenities | None supplied, none shown |
| AVS Royal Encasa | How ₹39 lakh / ₹43 lakh relate to ₹4,499/sq. ft. and the 600–2,400 sq. ft. plots | Kept as separate fields with a "confirm what each price includes" note |
| AVS Royal Encasa | Approvals | None supplied, none shown |

## Real assets still needed

Drop files into `public/images/projects/<project-slug>/` and reference them in
`src/data/projects.ts`. Sections appear automatically once data exists.

- **Project photographs** → `coverImage` (set `illustrative: false`) and `gallery: [...]`
  (the Gallery section and lightbox appear when `gallery` has images).
- **Master plan / layout** → `masterPlanImage` (Master plan section appears).
- **Google Maps links** → `mapUrl` (adds a "Get directions" button). Only use the
  verified destination for each site.
- **Social profiles, email, office address, office hours** → `src/config/site.ts`.
- **Company story, founding year, registered office, registrations** →
  `companyProfile` in `src/data/content.ts` (shown on the About page when set).

Current photography (`public/images/hero/`, `public/images/projects/`,
`public/images/about/`) is licensed stock from Unsplash (Unsplash License: free for
commercial use, no attribution required). None of it shows an IMR GROUPS project, and
each image is labelled "Representative image" on the site. Their locations are not
verified, so do not caption them as Hosur. All photo settings live in
`src/data/siteImages.ts`.

| Used for | File | Source |
| --- | --- | --- |
| Home hero | `hero/landscaped-internal-road*.webp` | https://unsplash.com/photos/b5DPDfma-CU (@dilliwalarider) |
| Advika Signature Grand card | `projects/advika-signature-grand*.webp` | https://unsplash.com/photos/X5KDWlLxLiM (@zoshuacolah) |
| Varam Classic Garden card | `projects/varam-classic-garden*.webp` | https://unsplash.com/photos/OchmmLeHkuA (@tanwar47) |
| Hosur Bus Stand Area Plots card | `projects/hosur-bus-stand-area-plots*.webp` | https://unsplash.com/photos/Od2cph89l0c (@zoshuacolah) |
| AVS Royal Encasa card | `projects/avs-royal-encasa*.webp` | https://unsplash.com/photos/2rQRfUWFlgc (@linsartistry) |
| About Us, home closing banner | `about/town-aerial-view*.webp` | https://unsplash.com/photos/ik4KB6weMxQ (@zoshuacolah) |

When real project photos arrive, save them under `public/images/projects/` (a 1200 px
and a 640 px WebP), update the matching entry in `siteImages.ts`, and remove
`representative: true` so the label disappears. Never present stock or another
developer's photos as an IMR GROUPS project.

## Adding a new project

1. Copy an existing object in `src/data/projects.ts`.
2. Give it a unique `id` and `slug` (the slug becomes `/projects/<slug>`).
3. Fill in only the fields you have confirmed. Leave the rest out.
4. Set `publicationStatus: 'draft'` to hide it until ready.
5. Rebuild — the project card, detail page, footer link, enquiry dropdown, sitemap
   entry and page metadata are generated automatically.

## Leadership

`src/data/leadership.ts` holds the leadership team. Mr. Rajesh (Managing Director) is shown
with an initials monogram because no photograph was supplied.

- **Photo:** add an authentic photo to `public/images/leadership/` and set `photo` — the
  monogram is replaced automatically. Do not use generated or stock portraits.
- **Biography:** add `bio` paragraphs only once Mr. Rajesh has approved the wording.
  No biography, qualifications or quotes have been added.

## Editable copy

- Tagline ("Building Trust. Creating Tomorrow." — a proposal): `src/config/site.ts`
- Service commitments and the five-step buying journey: `src/data/content.ts`
- Page titles and meta descriptions: `src/data/pages.ts`
