// Copies each CMS page's bundled defaults (src/lib/cms/pages/*/defaults.ts)
// into its WordPress snippet, so the admin screens start pre-filled with the
// content the site ships today. Run with: npm run cms:defaults
//
// Core 1.3+ also fetches the same content from the live site (/api/cms/content),
// so these copies are only the fallback for when the site cannot be reached.
//
// A snippet holds one JSON block per marker: <<<'NAMI_JSON' (page defaults)
// and, for collections, <<<'NAMI_IMPORT' (items offered for one-click import).

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CODE_COLLECTIONS, CODE_PAGES } from "../src/lib/cms/code-content";

// Run from the project root (npm scripts always are).
const SNIPPETS = join(process.cwd(), "wordpress", "snippets");

const PAGES: readonly {
  file: string;
  blocks: Readonly<Record<string, unknown>>;
}[] = [
  { file: "02-home-page.php", blocks: { NAMI_JSON: CODE_PAGES.home } },
  { file: "03-about-page.php", blocks: { NAMI_JSON: CODE_PAGES.about } },
  { file: "04-faculty-page.php", blocks: { NAMI_JSON: CODE_PAGES.faculty } },
  { file: "05-school-page.php", blocks: { NAMI_JSON: CODE_PAGES.school } },
  {
    file: "06-a-levels-page.php",
    blocks: { NAMI_JSON: CODE_PAGES["a-levels"] },
  },
  {
    file: "07-bachelors-page.php",
    blocks: { NAMI_JSON: CODE_PAGES.bachelors },
  },
  { file: "08-ctevt-page.php", blocks: { NAMI_JSON: CODE_PAGES.ctevt } },
  { file: "09-site-settings.php", blocks: { NAMI_JSON: CODE_PAGES.site } },
  { file: "10-clubs.php", blocks: { NAMI_JSON: CODE_PAGES.clubs } },
  {
    file: "12-notices.php",
    blocks: {
      NAMI_JSON: CODE_PAGES.notices,
      NAMI_IMPORT: CODE_COLLECTIONS["notice-items"],
    },
  },
  { file: "13-careers.php", blocks: { NAMI_JSON: CODE_PAGES.careers } },
  {
    file: "14-gallery.php",
    blocks: {
      NAMI_JSON: CODE_PAGES.gallery,
      NAMI_IMPORT: CODE_COLLECTIONS["gallery-items"],
    },
  },
  {
    file: "15-documents.php",
    blocks: {
      NAMI_JSON: CODE_PAGES.documents,
      NAMI_IMPORT: CODE_COLLECTIONS.documents,
    },
  },
  { file: "16-contact.php", blocks: { NAMI_JSON: CODE_PAGES.contact } },
  {
    file: "17-alumni.php",
    blocks: {
      NAMI_JSON: CODE_PAGES.alumni,
      NAMI_IMPORT: CODE_COLLECTIONS["alumni-stories"],
    },
  },
  {
    file: "18-student-life.php",
    blocks: { NAMI_JSON: CODE_PAGES["student-life"] },
  },
];

for (const page of PAGES) {
  const path = join(SNIPPETS, page.file);
  let source = readFileSync(path, "utf8");
  for (const [marker, value] of Object.entries(page.blocks)) {
    const block = new RegExp(
      `(<<<'${marker}'\\r?\\n)[\\s\\S]*?(\\r?\\n${marker})`,
    );
    if (!block.test(source)) {
      throw new Error(`${page.file}: no <<<'${marker}' block found`);
    }
    const json = JSON.stringify(value, null, 2);
    if (new RegExp(`^${marker}`, "m").test(json)) {
      throw new Error(`${page.file}: content contains the ${marker} marker`);
    }
    source = source.replace(block, (_, open, close) => open + json + close);
  }
  writeFileSync(path, source);
  console.log(`Updated ${page.file}`);
}
