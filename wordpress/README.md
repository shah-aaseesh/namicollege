# NAMI CMS — headless WordPress via Code Snippets

Website content is edited in WordPress and read by Next.js. There is no custom plugin:
every piece is a PHP snippet pasted into the **Code Snippets** plugin
("Run snippet everywhere"). The first `<?php` line of each file is not pasted.

## Status

| Snippet | Page | Status |
|---|---|---|
| `01-nami-cms-core.php` | Engine (menus, fields, save, REST, revalidate) | Done — v1.2.0: nested lists, `max_input_vars` guard, `date`/`file` fields, `menu_parent`, collections |
| `02-home-page.php` | `/` | Done |
| `03-about-page.php` | `/about` | Done |
| `04-faculty-page.php` | `/faculty` | Done |
| `05-school-page.php` | `/institutions/school` | Done |
| `06-a-levels-page.php` | `/institutions/a-levels` | Done |
| `07-bachelors-page.php` | `/institutions/bachelors` + every `[course]` page | Done |
| `08-ctevt-page.php` | `/institutions/ctevt` (also `/ctevt`) | Done |
| `09-site-settings.php` | Site-wide parts 1+2: names & motto, contacts, socials, websites, both campuses, footer, header menu + panel, Enroll banner, newsletter band, contact block labels, floating buttons | Done |
| `10-clubs.php` | School + A-Levels club cards and every club page | Done |
| `11-applications.php` | Admissions form → Applications inbox + emails (not page content) | Done |
| `12-notices.php` | Notices collection (add/edit/remove) + `/notices` page text | Done |
| `13-careers.php` | Vacancies collection + `/careers` page text | Done |
| `14-gallery.php` | Gallery moments collection + Add Many Photos + tabs/bubbles/heading | Done |
| `15-documents.php` | Documents collection (file uploads, auto file size) + page text | Done |
| `16-contact.php` | `/contact` page text + Messages inbox (the form now really sends) + email alerts | Done |
| `17-alumni.php` | Alumni stories collection + page text; "Share Your Story" submissions become draft stories | Done |
| `18-student-life.php` | `/student-life` heading + numbered sections (also feeds `content.getCampusLife()`) | Done |
| `19-editor-access.php` | Non-admins see only NAMI menus + Media + Profile; other screens redirect; Dashboard = "Edit the website" links | Done |
| — | `/privacy`, `/terms` | Not needed (owner's decision, 2026-10-09) |

## How it works

- **Core snippet** registers nothing on its own. Each page snippet adds itself via
  `add_filter( 'nami_cms_pages', … )` with `sections → fields` and a `defaults` JSON block.
- Core builds a sidebar menu per page (sub-menu per section) plus a "Website Content"
  admin-bar menu, stores each page in the option `nami_cms_page_{slug}`, serves
  `GET /?rest_route=/nami/v1/pages/{slug}`, and on save POSTs `{page}` to
  `{site}/api/revalidate` with header `x-nami-secret`.
- Field types: `text`, `textarea`, `number`, `toggle`, `select`, `url`, `video`,
  `link` (label + href), `image` (src/alt/width/height via Media Library), `lines`
  (one per line → string[]), `paragraphs` (blank-line separated → string[]),
  `repeater` (nestable; `item_label`, `title_field`, `fields`).
- **Next.js side** (`src/lib/cms/`): `client.ts` fetches (tag `cms:{slug}`, 5 min
  revalidate), `merge.ts` overlays CMS JSON onto bundled defaults with type checks,
  `pages/{slug}/{types,defaults,index}.ts` per page. If WordPress is down the site
  shows its bundled content.

## Adding the next page (recipe)

1. Read the page's `page.tsx` and every component/copy file it uses; list what is visible.
2. `src/lib/cms/pages/<slug>/types.ts` — one key per admin section, plain fields
   (`CmsImage`, `CmsLink`, `CmsTestimonials` from `src/lib/cms`).
3. `defaults.ts` — build the content **from the existing copy files** so nothing changes
   visually. If a default list is empty, export a `shape` with one sample item (see school).
4. `index.ts` — `getXPage = cache(() => mergeWithDefaults(defaults, await fetchCmsPage(slug)))`.
5. Change components to take props instead of hardcoded text/constants; use index-based
   keys for CMS lists; hide optional bits when empty. `generateMetadata` reads `seo`.
6. `wordpress/snippets/NN-<slug>-page.php` — copy an existing page snippet; field keys
   must match `types.ts`; leave the `<<<'NAMI_JSON'` block as `{}`.
7. Add the page to `scripts/sync-cms-defaults.ts`, run `npm run cms:defaults`.
8. Check: `npx tsc --noEmit -p .`, `npx biome check --write <changed paths>`, `npx next build`.
9. Don't import data from a `"use client"` file into `defaults.ts` — on the server it is a
   client reference, not data. Move the data into a plain `.ts` file first (see `mou-partners.ts`).

## Large sections

PHP drops form fields beyond `max_input_vars` (default 1000). Core puts a `nami_complete`
marker last in each form and refuses the save if it is missing. The biggest section today is
Bachelors → Degree Courses (~780 fields: 4 courses, 95 modules); if it grows past 1000, ask the
host to raise `max_input_vars` (e.g. 5000).

## Site Settings

`content.getInstitution()` (src/lib/content/index.ts) returns `getSiteInstitution()` from
`src/lib/cms/pages/site`: the bundled profile with the WordPress names, contacts and campuses
applied. Everything that shows contact details goes through it (header, footer,
`InstitutionContact`, floating socials, structured data), so a save revalidates `cms:site` and
updates every page. Mission, values etc. still come from the bundled profile. Campuses are
matched by slug (`gokarneshwor`, `new-baneshwor`); `InstitutionContact` picks them by slug.
Other shared pieces read `getSitePage()` directly: `SiteHeader` (menu + panel copy),
`InstitutionEnrollCta` (now a server component), `SiteNewsletterBand` (server wrapper around
the client `SiteCtaBand`), `InstitutionContact` labels and `FloatingSocials`. The menu uses
`siteShape` so sub-links can be added to items that had none. The newsletter form still
does nothing on submit (it never did).

## Clubs and the sitemap

`src/lib/cms/pages/clubs`: `getSchoolClubs()` / `getALevelsClubs()` return the WordPress clubs in the
`SchoolClub` shape the club components already used (slug cleaned, duplicates and clubs without a
cover photo dropped). Club routes use `dynamicParams = true`. `src/app/sitemap.ts` now adds club and
Bachelors course pages from the CMS lists after their parent page (they were hand-typed in
`siteRoutes`, which also listed a non-existent A-Levels "environment" club).

## Applications (admissions form)

The form (`src/components/shared/admissions-form.tsx`) POSTs to `/api/admissions`, which re-validates
with `admissionsSchema`, builds the PDF on the server (`src/lib/inquiry-pdf-server.ts` feeds the same
colours and logo the browser uses) and POSTs it to WordPress `/?rest_route=/nami/v1/applications`
signed with `CMS_REVALIDATE_SECRET` (`x-nami-secret`). Snippet 11 stores a private
`nami_application` post (answers, labelled blocks, base64 PDF in post meta, never in public uploads),
emails the institution's recipients (Applications → Email Settings) with the PDF attached, and
optionally confirms to the applicant. Spam: hidden `website` field + 5 per 10 minutes per IP
(in memory). Emails use `wp_mail`; hosts usually need an SMTP plugin. The admissions page heading
is still in code (`src/app/admissions/page.tsx`).

## Collections (items added one by one)

For lists that grow (notices, vacancies) a repeater would hit `max_input_vars`, so core registers a
non-public post type per collection (`nami_cms_collections` filter): one edit screen per item using the
same field types, list columns, `GET /?rest_route=/nami/v1/collections/{slug}` → `{ ready, items }`,
and a site refresh (tag `cms:{slug}`) on save/trash/delete. Next side: `fetchCmsCollection(slug, template)`
in `src/lib/cms/collections.ts`. `ready: false` collections (notices) keep showing the bundled items
next to WordPress ones until an editor clicks "Import" (items from the snippet's `<<<'NAMI_IMPORT'` block)
or "Start with only this list". Vacancies are `ready: true` because the bundled ones are invented.
`content.getUpdates()` / `content.getVacancies()` come from these collections, so the home page and
institution notice boards update too. Expired vacancies (closing date before today, Nepal time) are hidden.
Page text for a collection uses `menu_parent` so its sections sit under the collection's menu.

## Gallery

The data that used to live inside the client component is in `src/app/gallery/_components/gallery-data.ts`
(defaults and import source). `GalleryMoments` now takes `tabs`, `bubbles`, `moments` and `copy` as props from
`getGalleryData()`. A bubble keyed `others` shows the tab's moments that are in no other bubble (this
replaces two hand-written id lists). Each video card now plays its own `videoUrl` (the player was
hard-coded to `/videos/nami-video.mp4`). The Bubble dropdown in WordPress is built from the saved
bubbles. Bulk saves (import, Add Many Photos) set `$GLOBALS['nami_cms_quiet']` so the site is refreshed
once, not per item.

## Contact messages

The Contact form used to fake success (a 500 ms timeout, nothing sent). It now POSTs to `/api/contact`,
which re-validates with `contactSchema` (hidden `website` field + 5 per 10 minutes, shared helper
`src/lib/rate-limit.ts`) and forwards to WordPress `/?rest_route=/nami/v1/messages` signed with
`CMS_REVALIDATE_SECRET`. Snippet 16 stores a `nami_message` post and emails Contact → Email Settings
(default info@nami.edu.np) with Reply-To set to the sender.

## Alumni submissions

The "Share Your Story" form also faked success. It now POSTs to `/api/alumni` (rules in
`alumniStorySchema`, src/lib/schema.ts; photo ≤ 4 MB, JPG/PNG/WebP checked by file signature) which
forwards to `/?rest_route=/nami/v1/alumni-submissions`. Snippet 17 saves the photo in the Media Library,
creates a **draft** `nami_alumni` story pre-filled from the answers (headline → first highlight, experience →
story, advice → interview answer), keeps contact details in `_nami_submitter` ("Submitted by" box), and
emails the address in Alumni → Page: "Share Your Story" Banner. Drafts never reach the website until published.

## Bold text

Where a sentence has bold words in the middle, the field accepts `**double asterisks**`
and the component renders it with `withEmphasis()` from `src/lib/cms/emphasis.tsx` (plain text
only, no HTML). Used on CTEVT; say so in the field's help text.

## Bachelors notes

- Each course's **web address** (`slug`) is its URL. Course pages are listed at build time and
  `dynamicParams = true`, so a course added in WordPress gets a page without a rebuild.
- `src/components/layout/floating-institution-apply.tsx` still maps known course slugs to the
  floating "Apply for …" button; a new or renamed course falls back to "Apply for Degree".
- Still in code: awarding-university cards and partner logos (shared content), the
  floating apply button, and UI labels such as "Key Facts" and "Courses offered".

## Site configuration

- Next.js `.env.local`: `WORDPRESS_URL` (WordPress home URL) and `CMS_REVALIDATE_SECRET`.
- WordPress: **Settings → NAMI CMS** — website URL + the same secret ("Save & test connection").
- `next.config.ts` allows images/videos from `WORDPRESS_URL` (`/wp-content/uploads/**`).
