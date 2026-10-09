import { getVacancies } from "@/lib/cms/pages/careers";
import { getUpdates } from "@/lib/cms/pages/notices";
import { getSiteInstitution } from "@/lib/cms/pages/site";
import { getCampusLife } from "@/lib/cms/pages/student-life";
import { localContentProvider } from "./local/provider";
import type { ContentProvider } from "./provider";

export {
  type ContentEntry,
  type ContentId,
  contentId,
  entryOf,
  type IsoDate,
  isoDate,
  type Slug,
  slug,
} from "./identifiers";
export {
  type ContentProvider,
  ContentSourceUnavailableError,
} from "./provider";
export {
  paragraphsOf,
  type RichText,
  richText,
  richTextFromHtml,
} from "./rich-text";
export { schoolGrades } from "./school-grades";
export type * from "./types";
export { GALLERY_CATEGORIES, PROVISIONAL_UPDATE_CATEGORIES } from "./types";

// Edited in WordPress: names, contact details and campuses (Site Settings),
// notices (Notices), vacancies (Careers) and the Student Life pillars.
// Everything else is bundled.
export const content: ContentProvider = {
  ...localContentProvider,
  getInstitution: getSiteInstitution,
  getUpdates,
  getVacancies,
  getCampusLife,
};
