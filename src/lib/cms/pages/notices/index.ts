import { cache } from "react";
import { entryOf, isoDate } from "@/lib/content/identifiers";
import { updates as bundledUpdates } from "@/lib/content/local/updates";
import {
  PROVISIONAL_UPDATE_CATEGORIES,
  type Update,
  type UpdateCategory,
  type UpdateKind,
} from "@/lib/content/types";
import { fetchCmsPage } from "../../client";
import { type CmsCollectionItem, fetchCmsCollection } from "../../collections";
import { mergeWithDefaults } from "../../merge";
import { hasImage, isExternalHref } from "../../types";
import { noticesDefaults, noticeTemplate } from "./defaults";
import type { NoticeFields, NoticesPageContent } from "./types";

export type * from "./types";

/** WordPress collection slug (Notices → All Notices). */
export const NOTICE_COLLECTION = "notice-items";

const KINDS: readonly UpdateKind[] = [
  "notice",
  "event",
  "news",
  "press-release",
];
const INSTITUTIONS = ["school", "college", "institute"] as const;

export const getNoticesPage = cache(async (): Promise<NoticesPageContent> => {
  return mergeWithDefaults(noticesDefaults, await fetchCmsPage("notices"));
});

function dateOrNull(value: string) {
  try {
    return value.trim() === "" ? null : isoDate(value.trim());
  } catch {
    return null;
  }
}

function updateOf(item: CmsCollectionItem<NoticeFields>): Update | null {
  const { fields } = item;
  const publishedAt = dateOrNull(item.date);
  if (publishedAt === null) return null;

  const href = fields.buttonLink.trim();
  const label = fields.buttonLabel.trim();

  return {
    ...entryOf(`notice-${item.id}`),
    kind: KINDS.find((kind) => kind === fields.kind) ?? "notice",
    category:
      PROVISIONAL_UPDATE_CATEGORIES.find(
        (category): category is UpdateCategory => category === fields.category,
      ) ?? "general",
    institution:
      INSTITUTIONS.find((institution) => institution === fields.institution) ??
      null,
    title: item.title,
    excerpt: fields.excerpt,
    publishedAt,
    happensAt: dateOrNull(fields.happensAt),
    venue: fields.venue.trim() === "" ? null : fields.venue.trim(),
    link:
      href === "" || label === ""
        ? null
        : {
            label,
            href,
            destination: isExternalHref(href) ? "external" : "internal",
          },
    image: hasImage(fields.image) ? fields.image : null,
  };
}

/**
 * Every notice, newest first. Until an editor imports the bundled notices in
 * WordPress (or starts an empty list), new WordPress notices are shown
 * alongside the bundled ones; afterwards only the WordPress list is shown.
 */
export const getAllUpdates = cache(async (): Promise<readonly Update[]> => {
  const collection = await fetchCmsCollection(
    NOTICE_COLLECTION,
    noticeTemplate,
  );
  if (collection === null) return bundledUpdates;

  const fromCms = collection.items
    .map(updateOf)
    .filter((update): update is Update => update !== null);
  const all = collection.ready ? fromCms : [...fromCms, ...bundledUpdates];
  return [...all].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export async function getUpdates(limit?: number): Promise<readonly Update[]> {
  const all = await getAllUpdates();
  return limit === undefined ? all : all.slice(0, limit);
}
