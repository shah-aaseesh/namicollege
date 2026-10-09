import { cache } from "react";
import {
  GALLERY_MOMENTS,
  type GalleryCategory,
  type GalleryInstitution,
  type GalleryMoment,
  type InstitutionTab,
  type SubcategoryIconType,
  type SubcategoryItem,
} from "@/app/gallery/_components/gallery-data";
import { fetchCmsPage } from "../../client";
import { type CmsCollectionItem, fetchCmsCollection } from "../../collections";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { galleryDefaults, galleryMomentTemplate } from "./defaults";
import type {
  GalleryBubble,
  GalleryMomentFields,
  GalleryPageContent,
} from "./types";

export type * from "./types";

/** WordPress collection slug (Gallery → All Moments). */
export const GALLERY_COLLECTION = "gallery-items";

const INSTITUTIONS: readonly GalleryInstitution[] = [
  "all",
  "primary",
  "higher-secondary",
  "a-levels",
  "bachelors",
];
const CATEGORIES: readonly GalleryCategory[] = [
  "all",
  "academics",
  "campus-life",
  "events",
  "sports",
  "achievements",
];
const ICONS: readonly SubcategoryIconType[] = [
  "grid",
  "tech",
  "sports",
  "math",
  "arts",
  "culture",
  "trips",
  "science",
  "social",
  "events",
  "business",
  "convocation",
  "music",
];

export const getGalleryPage = cache(async (): Promise<GalleryPageContent> => {
  return mergeWithDefaults(galleryDefaults, await fetchCmsPage("gallery"));
});

function bubblesOf(list: readonly GalleryBubble[]): SubcategoryItem[] {
  return list
    .filter((bubble) => bubble.key.trim() !== "" && bubble.label.trim() !== "")
    .map((bubble) => ({
      id: bubble.key.trim(),
      label: bubble.label,
      shortLabel: bubble.shortLabel.trim() || bubble.label,
      iconType: ICONS.find((icon) => icon === bubble.icon) ?? "grid",
      ...(hasImage(bubble.thumbnail)
        ? { thumbnail: bubble.thumbnail.src }
        : {}),
      logo: bubble.logo,
    }));
}

function momentOf(
  item: CmsCollectionItem<GalleryMomentFields>,
  photoLabels: Readonly<Record<GalleryInstitution, string>>,
): GalleryMoment | null {
  const { fields } = item;
  const type =
    fields.type === "video" || fields.type === "quote" ? fields.type : "image";
  const institution =
    INSTITUTIONS.find((value) => value === fields.institution) ?? "all";

  if (type === "quote" && fields.quoteText.trim() === "") return null;
  if (type !== "quote" && !hasImage(fields.image)) return null;
  if (type === "video" && fields.videoUrl.trim() === "") return null;

  return {
    id: `gallery-${item.id}`,
    title: item.title,
    category: CATEGORIES.find((value) => value === fields.category) ?? "all",
    institution,
    institutionLabel: photoLabels[institution],
    ...(fields.bubble.trim() === ""
      ? {}
      : { subcategory: fields.bubble.trim() }),
    type,
    ...(type === "quote"
      ? { quote: { text: fields.quoteText, author: fields.quoteAuthor } }
      : { src: fields.image.src, alt: fields.image.alt || item.title }),
    ...(type === "video" ? { videoUrl: fields.videoUrl.trim() } : {}),
  };
}

export type GalleryData = {
  readonly tabs: readonly InstitutionTab[];
  readonly bubbles: Readonly<
    Partial<Record<GalleryInstitution, readonly SubcategoryItem[]>>
  >;
  readonly moments: readonly GalleryMoment[];
};

/**
 * Tabs, bubbles and moments for the Gallery page. Until an editor imports the
 * bundled moments in WordPress (or starts an empty list), new WordPress
 * moments are shown before the bundled ones.
 */
export const getGalleryData = cache(async (): Promise<GalleryData> => {
  const [page, collection] = await Promise.all([
    getGalleryPage(),
    fetchCmsCollection(GALLERY_COLLECTION, galleryMomentTemplate),
  ]);
  const { tabs } = page;

  const photoLabels: Record<GalleryInstitution, string> = {
    all: tabs.allPhotoLabel,
    primary: tabs.primaryPhotoLabel,
    "higher-secondary": tabs.plusTwoPhotoLabel,
    "a-levels": tabs.aLevelsPhotoLabel,
    bachelors: tabs.bachelorsPhotoLabel,
  };

  const bundled = GALLERY_MOMENTS.map((moment) => ({
    ...moment,
    institutionLabel: photoLabels[moment.institution],
  }));
  const fromCms =
    collection?.items
      .map((item) => momentOf(item, photoLabels))
      .filter((moment) => moment !== null) ?? [];
  const moments =
    collection === null
      ? bundled
      : collection.ready
        ? fromCms
        : [...fromCms, ...bundled];

  return {
    tabs: [
      { id: "all", label: tabs.allLabel, badgeLabel: tabs.allBadge },
      {
        id: "primary",
        label: tabs.primaryLabel,
        badgeLabel: tabs.primaryBadge,
      },
      {
        id: "higher-secondary",
        label: tabs.plusTwoLabel,
        badgeLabel: tabs.plusTwoBadge,
      },
      {
        id: "a-levels",
        label: tabs.aLevelsLabel,
        badgeLabel: tabs.aLevelsBadge,
      },
      {
        id: "bachelors",
        label: tabs.bachelorsLabel,
        badgeLabel: tabs.bachelorsBadge,
      },
    ],
    bubbles: {
      primary: bubblesOf(page.primary.bubbles),
      "higher-secondary": bubblesOf(page.plusTwo.bubbles),
      "a-levels": bubblesOf(page.aLevels.bubbles),
      bachelors: bubblesOf(page.bachelors.bubbles),
    },
    moments,
  };
});
