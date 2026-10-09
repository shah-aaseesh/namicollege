import type { CmsImage, CmsLink } from "../../types";

// One key per admin sub-menu in WordPress (CTEVT → Hero, CTEVT → Programmes, …).
// Keys and field names must match wordpress/snippets/08-ctevt-page.php.
// Text fields marked "bold" accept **double asterisks** around words to bold them.

export type CtevtPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly hero: {
    readonly label: string;
    readonly title: string;
    readonly subtitle: string;
    /** bold */
    readonly intro: string;
    readonly logo: CmsImage;
    readonly logoCaption: string;
    readonly logoSubcaption: string;
  };
  readonly overview: {
    /** bold */
    readonly text: string;
  };
  readonly programmes: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly programmeHeading: string;
    readonly sectorHeading: string;
    readonly durationHeading: string;
    readonly items: readonly {
      readonly title: string;
      readonly sector: string;
      readonly duration: string;
    }[];
  };
  readonly about: {
    readonly label: string;
    readonly title: string;
    /** bold */
    readonly paragraphs: readonly string[];
    readonly footerLeft: string;
    readonly footerRight: string;
  };
  readonly approval: {
    readonly label: string;
    readonly title: string;
    readonly items: readonly {
      readonly label: string;
      readonly value: string;
    }[];
    readonly note: string;
    readonly footerLeft: string;
    readonly badge: string;
  };
  readonly standards: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly string[];
  };
  readonly skills: {
    readonly label: string;
    readonly title: string;
    /** bold */
    readonly paragraphs: readonly string[];
    readonly tags: readonly string[];
  };
  readonly recognition: {
    readonly label: string;
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly facts: readonly {
      readonly label: string;
      readonly value: string;
    }[];
    readonly letterButton: CmsLink;
    readonly contactButton: CmsLink;
  };
  readonly commitment: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly button: CmsLink;
  };
};
