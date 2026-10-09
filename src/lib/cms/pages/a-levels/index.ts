import { cache } from "react";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { aLevelsDefaults } from "./defaults";
import type { ALevelsPageContent } from "./types";

export type * from "./types";

export const getALevelsPage = cache(async (): Promise<ALevelsPageContent> => {
  const merged = mergeWithDefaults(
    aLevelsDefaults,
    await fetchCmsPage("a-levels"),
  );
  return {
    ...merged,
    hero: {
      ...merged.hero,
      slides: merged.hero.slides.filter((slide) => hasImage(slide.image)),
    },
  };
});
