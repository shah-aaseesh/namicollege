// Reads a page's content from the WordPress "NAMI CMS" REST endpoint.
// Returns null whenever WordPress is not configured or unreachable, so callers
// fall back to the content bundled with the site.

import { codeHash } from "./code-hash";
import { resolveEdit } from "./resolve";

const REVALIDATE_SECONDS = 300;

export function cmsTag(page: string): string {
  return `cms:${page}`;
}

// The WordPress home URL, e.g. https://cms.example.com or https://example.com/wp
export function wordpressBase(): string | null {
  const raw = process.env.WORDPRESS_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    console.warn(`WORDPRESS_URL is not a valid URL: "${raw}"`);
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Core 1.3+ answers `format=2` with only the sections editors saved, each with
 * the code content it was based on; the newer of edit and code wins per field.
 * Older cores send finished values, which are returned unchanged.
 */
function resolvePage(code: object, body: unknown): unknown {
  if (!isRecord(body) || body.format !== 2) return body;
  const codeRecord = code as Record<string, unknown>;
  const sections = isRecord(body.sections) ? body.sections : {};
  const resolved: Record<string, unknown> = {};
  for (const [id, entry] of Object.entries(sections)) {
    if (!isRecord(entry) || !isRecord(entry.saved)) continue;
    const base = isRecord(entry.base) ? entry.base : {};
    const current = isRecord(codeRecord[id]) ? codeRecord[id] : {};
    const section: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(entry.saved)) {
      section[key] = resolveEdit(base[key], value, current[key]);
    }
    resolved[id] = section;
  }
  return resolved;
}

/** `code` is the page's bundled defaults (also served at /api/cms/content). */
export async function fetchCmsPage(
  page: string,
  code: object,
): Promise<unknown> {
  const base = wordpressBase();
  if (base === null) return null;

  // ?rest_route= works whether or not WordPress has pretty permalinks enabled.
  const url = `${base}/?rest_route=/nami/v1/pages/${encodeURIComponent(page)}&format=2`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json", "x-nami-code": codeHash(code) },
      next: { revalidate: REVALIDATE_SECONDS, tags: [cmsTag(page)] },
    });
    if (!res.ok) {
      console.warn(`CMS page "${page}" returned HTTP ${res.status}`);
      return null;
    }
    return resolvePage(code, await res.json());
  } catch (error) {
    console.warn(`CMS page "${page}" could not be fetched`, error);
    return null;
  }
}
