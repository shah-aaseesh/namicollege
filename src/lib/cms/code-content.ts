// Every CMS page's bundled defaults and every collection's bundled items, keyed
// the way WordPress knows them. WordPress reads this from /api/cms/content (so its
// screens show what the code holds today) and `npm run cms:defaults` writes it
// into the snippets as a fallback.

import { aLevelsDefaults } from "./pages/a-levels/defaults";
import { aboutDefaults } from "./pages/about/defaults";
import { alumniDefaults, alumniImports } from "./pages/alumni/defaults";
import { bachelorsDefaults } from "./pages/bachelors/defaults";
import { careersDefaults } from "./pages/careers/defaults";
import { clubsDefaults } from "./pages/clubs/defaults";
import { contactDefaults } from "./pages/contact/defaults";
import { ctevtDefaults } from "./pages/ctevt/defaults";
import { documentImports, documentsDefaults } from "./pages/documents/defaults";
import { facultyDefaults } from "./pages/faculty/defaults";
import { galleryDefaults, galleryImports } from "./pages/gallery/defaults";
import { homeDefaults } from "./pages/home/defaults";
import { noticeImports, noticesDefaults } from "./pages/notices/defaults";
import { schoolDefaults } from "./pages/school/defaults";
import { siteDefaults } from "./pages/site/defaults";
import { studentLifeDefaults } from "./pages/student-life/defaults";

export const CODE_PAGES = {
  home: homeDefaults,
  about: aboutDefaults,
  faculty: facultyDefaults,
  school: schoolDefaults,
  "a-levels": aLevelsDefaults,
  bachelors: bachelorsDefaults,
  ctevt: ctevtDefaults,
  site: siteDefaults,
  clubs: clubsDefaults,
  notices: noticesDefaults,
  careers: careersDefaults,
  gallery: galleryDefaults,
  documents: documentsDefaults,
  contact: contactDefaults,
  alumni: alumniDefaults,
  "student-life": studentLifeDefaults,
} as const satisfies Record<string, object>;

/** Vacancies have no bundled items; listed so its fingerprint is known too. */
export const CODE_COLLECTIONS = {
  "notice-items": noticeImports,
  vacancies: [],
  "gallery-items": galleryImports,
  documents: documentImports,
  "alumni-stories": alumniImports,
} as const satisfies Record<string, readonly object[]>;
