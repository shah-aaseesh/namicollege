import { cache } from "react";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { homeDefaults } from "./defaults";
import type { HomePageContent } from "./types";

export type * from "./types";

export const getHomePage = cache(async (): Promise<HomePageContent> => {
  const merged = mergeWithDefaults(homeDefaults, await fetchCmsPage("home"));
  return {
    ...merged,
    hero: {
      ...merged.hero,
      slides: merged.hero.slides.filter((slide) => hasImage(slide.image)),
    },
    accreditation: {
      ...merged.accreditation,
      logos: merged.accreditation.logos.filter((item) => hasImage(item.logo)),
    },
  };
});
