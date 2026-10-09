// Reads a page's content from the WordPress "NAMI CMS" REST endpoint.
// Returns null whenever WordPress is not configured or unreachable, so callers
// fall back to the content bundled with the site.

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

export async function fetchCmsPage(page: string): Promise<unknown> {
  const base = wordpressBase();
  if (base === null) return null;

  // ?rest_route= works whether or not WordPress has pretty permalinks enabled.
  const url = `${base}/?rest_route=/nami/v1/pages/${encodeURIComponent(page)}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS, tags: [cmsTag(page)] },
    });
    if (!res.ok) {
      console.warn(`CMS page "${page}" returned HTTP ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.warn(`CMS page "${page}" could not be fetched`, error);
    return null;
  }
}
