// Copies each CMS page's bundled defaults (src/lib/cms/pages/*/defaults.ts)
// into its WordPress snippet, so the admin screens start pre-filled with the
// content the site ships today. Run with: npm run cms:defaults
//
// A snippet holds one JSON block per marker: <<<'NAMI_JSON' (page defaults)
// and, for collections, <<<'NAMI_IMPORT' (items offered for one-click import).

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { aLevelsDefaults } from "../src/lib/cms/pages/a-levels/defaults";
import { aboutDefaults } from "../src/lib/cms/pages/about/defaults";
import {
  alumniDefaults,
  alumniImports,
} from "../src/lib/cms/pages/alumni/defaults";
import { bachelorsDefaults } from "../src/lib/cms/pages/bachelors/defaults";
import { careersDefaults } from "../src/lib/cms/pages/careers/defaults";
import { clubsDefaults } from "../src/lib/cms/pages/clubs/defaults";
import { contactDefaults } from "../src/lib/cms/pages/contact/defaults";
import { ctevtDefaults } from "../src/lib/cms/pages/ctevt/defaults";
import {
  documentImports,
  documentsDefaults,
} from "../src/lib/cms/pages/documents/defaults";
import { facultyDefaults } from "../src/lib/cms/pages/faculty/defaults";
import {
  galleryDefaults,
  galleryImports,
} from "../src/lib/cms/pages/gallery/defaults";
import { homeDefaults } from "../src/lib/cms/pages/home/defaults";
import {
  noticeImports,
  noticesDefaults,
} from "../src/lib/cms/pages/notices/defaults";
import { schoolDefaults } from "../src/lib/cms/pages/school/defaults";
import { siteDefaults } from "../src/lib/cms/pages/site/defaults";
import { studentLifeDefaults } from "../src/lib/cms/pages/student-life/defaults";

// Run from the project root (npm scripts always are).
const SNIPPETS = join(process.cwd(), "wordpress", "snippets");

const PAGES: readonly {
  file: string;
  blocks: Readonly<Record<string, unknown>>;
}[] = [
  { file: "02-home-page.php", blocks: { NAMI_JSON: homeDefaults } },
  { file: "03-about-page.php", blocks: { NAMI_JSON: aboutDefaults } },
  { file: "04-faculty-page.php", blocks: { NAMI_JSON: facultyDefaults } },
  { file: "05-school-page.php", blocks: { NAMI_JSON: schoolDefaults } },
  { file: "06-a-levels-page.php", blocks: { NAMI_JSON: aLevelsDefaults } },
  { file: "07-bachelors-page.php", blocks: { NAMI_JSON: bachelorsDefaults } },
  { file: "08-ctevt-page.php", blocks: { NAMI_JSON: ctevtDefaults } },
  { file: "09-site-settings.php", blocks: { NAMI_JSON: siteDefaults } },
  { file: "10-clubs.php", blocks: { NAMI_JSON: clubsDefaults } },
  {
    file: "12-notices.php",
    blocks: { NAMI_JSON: noticesDefaults, NAMI_IMPORT: noticeImports },
  },
  { file: "13-careers.php", blocks: { NAMI_JSON: careersDefaults } },
  {
    file: "14-gallery.php",
    blocks: { NAMI_JSON: galleryDefaults, NAMI_IMPORT: galleryImports },
  },
  {
    file: "15-documents.php",
    blocks: { NAMI_JSON: documentsDefaults, NAMI_IMPORT: documentImports },
  },
  { file: "16-contact.php", blocks: { NAMI_JSON: contactDefaults } },
  {
    file: "17-alumni.php",
    blocks: { NAMI_JSON: alumniDefaults, NAMI_IMPORT: alumniImports },
  },
  { file: "18-student-life.php", blocks: { NAMI_JSON: studentLifeDefaults } },
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
