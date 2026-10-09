import { cache } from "react";
import { entryOf } from "@/lib/content/identifiers";
import { campusLife } from "@/lib/content/local/college-life";
import { richText } from "@/lib/content/rich-text";
import type { CampusLifePillar } from "@/lib/content/types";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { studentLifeDefaults } from "./defaults";
import type { StudentLifePageContent } from "./types";

export type * from "./types";

export const getStudentLifePage = cache(
  async (): Promise<StudentLifePageContent> => {
    return mergeWithDefaults(
      studentLifeDefaults,
      await fetchCmsPage("student-life"),
    );
  },
);

/**
 * The Student Life pillars. Edited pillars keep the anchor of the bundled
 * pillar in the same position (e.g. #incubation-centre), so old links work.
 */
export async function getCampusLife(): Promise<readonly CampusLifePillar[]> {
  const { pillars } = await getStudentLifePage();
  return pillars.items
    .filter((pillar) => pillar.title.trim() !== "")
    .map((pillar, index) => ({
      ...(campusLife[index] ?? entryOf(`pillar-${index + 1}`)),
      title: pillar.title,
      lead: pillar.lead,
      body: richText(...pillar.paragraphs.filter((p) => p.trim() !== "")),
      highlights: pillar.highlights.filter((h) => h.trim() !== ""),
      image: hasImage(pillar.image) ? pillar.image : null,
    }));
}
