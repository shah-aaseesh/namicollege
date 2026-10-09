import type { CmsLink } from "../../types";

// The Documents page settings (WordPress: Documents → Page: …) and the fields of
// each document (WordPress: Documents → Add New). Keys must match
// wordpress/snippets/15-documents.php.

export type DocumentsPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly heading: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly searchPlaceholder: string;
  };
  readonly categories: {
    readonly allLabel: string;
    readonly items: readonly {
      /** Documents are filed under a category by this key. */
      readonly key: string;
      readonly label: string;
    }[];
  };
  readonly empty: {
    readonly title: string;
    readonly text: string;
    readonly resetLabel: string;
  };
  readonly banner: {
    readonly title: string;
    readonly text: string;
    readonly button: CmsLink;
  };
};

export type DocumentFields = {
  readonly category: string;
  /** "NAMI Group" | "School" | "College" | "Institute" */
  readonly institution: string;
  readonly description: string;
  /** The uploaded file (or any link to it). */
  readonly file: string;
  /** Filled in by WordPress from the upload when left empty, e.g. "3.03 MB". */
  readonly fileSize: string;
  /** Short note under the card, e.g. "Academic Intake 2026". */
  readonly note: string;
  readonly featured: boolean;
};
