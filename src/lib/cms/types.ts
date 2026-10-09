// Shapes shared by every CMS-managed page. They mirror the field types the
// WordPress "NAMI CMS Core" snippet stores (wordpress/snippets/01-nami-cms-core.php).

export type CmsImage = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type CmsLink = {
  readonly label: string;
  readonly href: string;
};

export const EMPTY_IMAGE: CmsImage = { src: "", alt: "", width: 0, height: 0 };

/** Copies a bundled image into the plain shape the CMS stores. */
export function cmsImage(
  value:
    | {
        readonly src: string;
        readonly alt: string;
        readonly width: number;
        readonly height: number;
      }
    | null
    | undefined,
): CmsImage {
  if (!value) return EMPTY_IMAGE;
  return {
    src: value.src,
    alt: value.alt,
    width: value.width,
    height: value.height,
  };
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function hasImage(
  image: CmsImage | null | undefined,
): image is CmsImage {
  return image !== null && image !== undefined && image.src.trim() !== "";
}
