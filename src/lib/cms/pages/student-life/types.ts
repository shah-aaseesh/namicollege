import type { CmsImage } from "../../types";

// The Student Life page (WordPress: Student Life → …). Keys must match
// wordpress/snippets/18-student-life.php.

export type StudentLifePageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly masthead: {
    readonly title: string;
    readonly description: string;
  };
  readonly pillars: {
    readonly items: readonly {
      readonly title: string;
      readonly lead: string;
      readonly paragraphs: readonly string[];
      readonly highlights: readonly string[];
      readonly image: CmsImage;
    }[];
  };
};
