// The Student Life page as it ships today. Used when WordPress is unavailable,
// as the type schema for CMS data, and exported into the WordPress snippet by
// `npm run cms:defaults`.

import { studentLifeCopy } from "@/app/student-life/_components/student-life-copy";
import { campusLife } from "@/lib/content/local/college-life";
import { paragraphsOf } from "@/lib/content/rich-text";
import { cmsImage } from "../../types";
import type { StudentLifePageContent } from "./types";

export const studentLifeDefaults: StudentLifePageContent = {
  seo: {
    title: studentLifeCopy.meta.title,
    description: studentLifeCopy.meta.description,
  },
  masthead: {
    title: studentLifeCopy.masthead.title,
    description: studentLifeCopy.masthead.lead,
  },
  pillars: {
    items: campusLife.map((pillar) => ({
      title: pillar.title,
      lead: pillar.lead,
      paragraphs: [...paragraphsOf(pillar.body)],
      highlights: [...pillar.highlights],
      image: cmsImage(pillar.image),
    })),
  },
};
