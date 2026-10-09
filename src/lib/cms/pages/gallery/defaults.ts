// The Gallery as it ships today: page settings, the empty moment used to
// validate WordPress data, and the bundled moments offered for import
// (exported into the WordPress snippet by `npm run cms:defaults`).

import { galleryCopy } from "@/app/gallery/_components/gallery-copy";
import {
  GALLERY_MOMENTS,
  type GalleryInstitution,
  INSTITUTION_SUBCATEGORIES,
  INSTITUTION_TABS,
} from "@/app/gallery/_components/gallery-data";
import { EMPTY_IMAGE } from "../../types";
import type {
  GalleryBubble,
  GalleryMomentFields,
  GalleryPageContent,
} from "./types";

function tab(id: GalleryInstitution) {
  const found = INSTITUTION_TABS.find((item) => item.id === id);
  return { label: found?.label ?? "", badge: found?.badgeLabel ?? "" };
}

/** The label each institution's moments carry in the full-screen view. */
function photoLabel(id: GalleryInstitution): string {
  return (
    GALLERY_MOMENTS.find((item) => item.institution === id)?.institutionLabel ??
    ""
  );
}

function bubblesOf(id: GalleryInstitution): GalleryBubble[] {
  return (INSTITUTION_SUBCATEGORIES[id] ?? []).map((sub) => {
    const src = sub.thumbnail ?? "";
    return {
      key: sub.id,
      label: sub.label,
      shortLabel: sub.shortLabel,
      icon: sub.iconType,
      // Bundled thumbnails have no stored size; the bubble crops them anyway.
      thumbnail:
        src === "" ? EMPTY_IMAGE : { src, alt: sub.label, width: 0, height: 0 },
      logo: src.includes("/collaborators/") || src.includes("/partners/"),
    };
  });
}

export const galleryDefaults: GalleryPageContent = {
  seo: {
    title: galleryCopy.meta.title,
    description: galleryCopy.meta.description,
  },
  heading: {
    label: "Explore Our Moments",
    title: "Our Gallery",
    moreLabel: "See More Moments",
  },
  tabs: {
    allLabel: tab("all").label,
    allBadge: tab("all").badge,
    allPhotoLabel: photoLabel("all"),
    primaryLabel: tab("primary").label,
    primaryBadge: tab("primary").badge,
    primaryPhotoLabel: photoLabel("primary"),
    plusTwoLabel: tab("higher-secondary").label,
    plusTwoBadge: tab("higher-secondary").badge,
    plusTwoPhotoLabel: photoLabel("higher-secondary"),
    aLevelsLabel: tab("a-levels").label,
    aLevelsBadge: tab("a-levels").badge,
    aLevelsPhotoLabel: photoLabel("a-levels"),
    bachelorsLabel: tab("bachelors").label,
    bachelorsBadge: tab("bachelors").badge,
    bachelorsPhotoLabel: photoLabel("bachelors"),
  },
  primary: { bubbles: bubblesOf("primary") },
  plusTwo: { bubbles: bubblesOf("higher-secondary") },
  aLevels: { bubbles: bubblesOf("a-levels") },
  bachelors: { bubbles: bubblesOf("bachelors") },
};

export const galleryMomentTemplate: GalleryMomentFields = {
  type: "image",
  institution: "all",
  category: "all",
  bubble: "",
  image: EMPTY_IMAGE,
  videoUrl: "",
  quoteText: "",
  quoteAuthor: "",
};

/** Import dates count back one day per moment so WordPress keeps today's order. */
function importDate(index: number): string {
  const date = new Date(Date.UTC(2026, 8, 30));
  date.setUTCDate(date.getUTCDate() - index);
  return date.toISOString().slice(0, 10);
}

export const galleryImports = GALLERY_MOMENTS.map((moment, index) => {
  const fields: GalleryMomentFields = {
    type: moment.type,
    institution: moment.institution,
    category: moment.category,
    bubble: moment.subcategory ?? "",
    image:
      moment.src === undefined
        ? EMPTY_IMAGE
        : {
            src: moment.src,
            alt: moment.alt ?? moment.title,
            width: 0,
            height: 0,
          },
    videoUrl: moment.videoUrl ?? "",
    quoteText: moment.quote?.text ?? "",
    quoteAuthor: moment.quote?.author ?? "",
  };
  return { title: moment.title, date: importDate(index), fields };
});
