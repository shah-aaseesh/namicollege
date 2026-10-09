import type { CmsImage } from "../../types";

// The News & Notices page text (WordPress: Notices → Page: …) and the fields of
// each notice (WordPress: Notices → Add New). Keys must match
// wordpress/snippets/12-notices.php.

export type NoticesPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly masthead: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
  };
  readonly empty: {
    readonly text: string;
  };
};

export type NoticeFields = {
  /** "notice" | "event" | "news" | "press-release" */
  readonly kind: string;
  /** One of PROVISIONAL_UPDATE_CATEGORIES. */
  readonly category: string;
  /** "school" | "college" | "institute", or "" for all of NAMI. */
  readonly institution: string;
  readonly excerpt: string;
  /** Event date, YYYY-MM-DD, or "". */
  readonly happensAt: string;
  readonly venue: string;
  readonly buttonLabel: string;
  readonly buttonLink: string;
  readonly image: CmsImage;
};
