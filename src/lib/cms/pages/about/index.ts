import { cache } from "react";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { aboutDefaults } from "./defaults";
import type { AboutPageContent } from "./types";

export type * from "./types";

export const getAboutPage = cache(async (): Promise<AboutPageContent> => {
  const merged = mergeWithDefaults(aboutDefaults, await fetchCmsPage("about"));
  return {
    ...merged,
    hero: {
      ...merged.hero,
      images: merged.hero.images.filter((item) => hasImage(item.image)),
    },
  };
});
