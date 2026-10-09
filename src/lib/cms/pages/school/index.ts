import { cache } from "react";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { schoolDefaults, schoolShape } from "./defaults";
import type { SchoolPageContent } from "./types";

export type * from "./types";

export const getSchoolPage = cache(async (): Promise<SchoolPageContent> => {
  const merged = mergeWithDefaults(
    schoolDefaults,
    await fetchCmsPage("school"),
    schoolShape,
  );
  return {
    ...merged,
    hero: {
      ...merged.hero,
      slides: merged.hero.slides.filter((slide) => hasImage(slide.image)),
    },
  };
});
