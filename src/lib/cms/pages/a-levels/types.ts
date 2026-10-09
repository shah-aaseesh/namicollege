import type { CmsTestimonials } from "../../testimonials";
import type { CmsImage, CmsLink } from "../../types";

// One key per admin sub-menu in WordPress (A-Levels → Hero, A-Levels → Subjects, …).
// Keys and field names must match wordpress/snippets/06-a-levels-page.php.

export type ALevelsWhyContent = {
  readonly label: string;
  readonly title: string;
  readonly intro: string;
  readonly more: string;
};

export type ALevelsPathway = {
  readonly title: string;
  readonly compulsory: readonly string[];
  readonly electives: readonly string[];
};

export type ALevelsStream = {
  readonly label: string;
  readonly requirement: string;
  readonly pathways: readonly ALevelsPathway[];
};

export type ALevelsPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly hero: {
    readonly title: string;
    readonly standfirst: string;
    readonly button: CmsLink;
    readonly slides: readonly { readonly image: CmsImage }[];
  };
  readonly why: ALevelsWhyContent;
  readonly principal: {
    readonly label: string;
    readonly paragraphs: readonly string[];
    readonly name: string;
    readonly title: string;
    readonly portrait: CmsImage;
  };
  readonly cambridge: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly badge: string;
    readonly cards: readonly {
      readonly title: string;
      readonly body: string;
    }[];
  };
  readonly subjects: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly compulsoryLabel: string;
    readonly electivesLabel: string;
    readonly streams: readonly ALevelsStream[];
  };
  readonly milestones: {
    readonly label: string;
    readonly title: string;
    readonly items: readonly {
      readonly year: number;
      readonly title: string;
      readonly body: string;
      readonly logo: CmsImage;
    }[];
  };
  readonly clubs: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
  };
  readonly alumni: CmsTestimonials & { readonly description: string };
  readonly entry: {
    readonly label: string;
    readonly title: string;
    readonly button: CmsLink;
    readonly blocks: readonly {
      readonly title: string;
      readonly body: string;
    }[];
  };
  readonly notices: {
    readonly title: string;
    readonly description: string;
    readonly buttonLabel: string;
    readonly emptyState: string;
  };
};
