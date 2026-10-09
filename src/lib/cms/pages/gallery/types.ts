import type { CmsImage } from "../../types";

// The Gallery page settings (WordPress: Gallery → Page: …) and the fields of
// each moment (WordPress: Gallery → Add New / Add Many Photos). Keys must match
// wordpress/snippets/14-gallery.php.

export type GalleryBubble = {
  /** Moments are linked to a bubble by this key. "all" and "others" are special. */
  readonly key: string;
  readonly label: string;
  readonly shortLabel: string;
  /** A SubcategoryIconType, shown when there is no thumbnail. */
  readonly icon: string;
  readonly thumbnail: CmsImage;
  readonly logo: boolean;
};

export type GalleryPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly heading: {
    readonly label: string;
    readonly title: string;
    readonly moreLabel: string;
  };
  readonly tabs: {
    readonly allLabel: string;
    readonly allBadge: string;
    readonly allPhotoLabel: string;
    readonly primaryLabel: string;
    readonly primaryBadge: string;
    readonly primaryPhotoLabel: string;
    readonly plusTwoLabel: string;
    readonly plusTwoBadge: string;
    readonly plusTwoPhotoLabel: string;
    readonly aLevelsLabel: string;
    readonly aLevelsBadge: string;
    readonly aLevelsPhotoLabel: string;
    readonly bachelorsLabel: string;
    readonly bachelorsBadge: string;
    readonly bachelorsPhotoLabel: string;
  };
  readonly primary: { readonly bubbles: readonly GalleryBubble[] };
  readonly plusTwo: { readonly bubbles: readonly GalleryBubble[] };
  readonly aLevels: { readonly bubbles: readonly GalleryBubble[] };
  readonly bachelors: { readonly bubbles: readonly GalleryBubble[] };
};

export type GalleryMomentFields = {
  /** "image" | "video" | "quote" */
  readonly type: string;
  /** "all" | "primary" | "higher-secondary" | "a-levels" | "bachelors" */
  readonly institution: string;
  /** "academics" | "campus-life" | "events" | "sports" | "achievements" | "all" */
  readonly category: string;
  /** A bubble key of the moment's tab, or "". */
  readonly bubble: string;
  readonly image: CmsImage;
  readonly videoUrl: string;
  readonly quoteText: string;
  readonly quoteAuthor: string;
};
