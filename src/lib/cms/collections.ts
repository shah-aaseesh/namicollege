// Reads a "collection" (a list editors add items to one by one, e.g. notices)
// from the WordPress NAMI CMS core. Returns null whenever WordPress is not
// configured or unreachable, so callers fall back to their bundled items.

import { cmsTag, wordpressBase } from "./client";
import { mergeWithDefaults } from "./merge";

const REVALIDATE_SECONDS = 300;

export type CmsCollectionItem<Fields> = {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  /** The item's publish date, YYYY-MM-DD. */
  readonly date: string;
  readonly fields: Fields;
};

export type CmsCollection<Fields> = {
  /** False until an editor imports the bundled items or starts an empty list. */
  readonly ready: boolean;
  readonly items: readonly CmsCollectionItem<Fields>[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * `template` holds every field with its default; it validates each item's
 * fields the same way page content is validated.
 */
export async function fetchCmsCollection<Fields>(
  collection: string,
  template: Fields,
): Promise<CmsCollection<Fields> | null> {
  const base = wordpressBase();
  if (base === null) return null;

  const url = `${base}/?rest_route=/nami/v1/collections/${encodeURIComponent(collection)}`;
  let body: unknown;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS, tags: [cmsTag(collection)] },
    });
    if (!res.ok) {
      console.warn(
        `CMS collection "${collection}" returned HTTP ${res.status}`,
      );
      return null;
    }
    body = await res.json();
  } catch (error) {
    console.warn(`CMS collection "${collection}" could not be fetched`, error);
    return null;
  }

  if (!isRecord(body) || !Array.isArray(body.items)) return null;

  const items: CmsCollectionItem<Fields>[] = [];
  for (const raw of body.items) {
    if (!isRecord(raw)) continue;
    const id = typeof raw.id === "number" ? raw.id : Number(raw.id);
    const title = typeof raw.title === "string" ? raw.title.trim() : "";
    const date = typeof raw.date === "string" ? raw.date : "";
    if (
      !Number.isFinite(id) ||
      title === "" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
      continue;
    }
    items.push({
      id,
      slug: typeof raw.slug === "string" ? raw.slug : String(id),
      title,
      date,
      fields: mergeWithDefaults(template, raw.fields),
    });
  }

  return { ready: body.ready === true, items };
}
