import type { CmsTestimonials } from "../../testimonials";
import type { CmsImage, CmsLink } from "../../types";

// One key per admin sub-menu in WordPress (Bachelors → Hero, Bachelors → Courses, …).
// Keys and field names must match wordpress/snippets/07-bachelors-page.php.

export type BachelorsCmsModule = {
  readonly code: string;
  readonly title: string;
  readonly credits: number;
  /** "Compulsory" | "Optional" | "Designated", or "" for none. */
  readonly status: string;
  readonly prerequisites: string;
  readonly description: string;
};

export type BachelorsCmsStage = {
  readonly label: string;
  readonly note: string;
  readonly modules: readonly BachelorsCmsModule[];
};

export type BachelorsCmsCourse = {
  /** The course's web address: /institutions/bachelors/{slug}. */
  readonly slug: string;
  readonly qualification: string;
  readonly title: string;
  readonly fullTitle: string;
  readonly shortDescription: string;
  readonly image: CmsImage;
  readonly awardingBody: string;
  readonly startingFrom: string;
  readonly format: string;
  readonly metaDescription: string;
  readonly keyFacts: readonly {
    readonly label: string;
    readonly value: string;
  }[];
  readonly whatYoullStudy: string;
  readonly summary: readonly string[];
  readonly entryLabel: string;
  readonly entry: readonly {
    readonly label: string;
    readonly requirement: string;
  }[];
  readonly entryNotes: readonly string[];
  readonly careersLabel: string;
  readonly careerSummary: string;
  readonly careerSectors: readonly string[];
  readonly pendingNote: string;
  readonly stagesNote: string;
  readonly stages: readonly BachelorsCmsStage[];
};

export type BachelorsUniversityPartner = {
  readonly name: string;
  readonly badge: string;
  readonly status: string;
  readonly location: string;
  readonly logo: CmsImage;
  readonly dark: boolean;
  readonly overview: readonly string[];
  readonly note: string;
  readonly metrics: readonly {
    readonly value: string;
    readonly label: string;
  }[];
  readonly programmes: readonly {
    readonly title: string;
    readonly award: string;
  }[];
  readonly leaderRole: string;
  readonly leaderName: string;
  readonly leaderTitle: string;
  readonly leaderAffiliation: string;
  readonly leaderPhoto: CmsImage;
  readonly leaderQuote: string;
  readonly leaderMessage: readonly string[];
};

export type BachelorsMouPartner = {
  readonly organization: string;
  readonly domain: string;
  readonly logo: CmsImage;
};

export type BachelorsPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly hero: {
    readonly label: string;
    readonly title: string;
    readonly standfirst: string;
    readonly button: CmsLink;
    readonly slides: readonly { readonly image: CmsImage }[];
  };
  readonly why: {
    readonly label: string;
    readonly title: string;
    readonly intro: string;
    readonly more: string;
  };
  readonly academicHead: {
    readonly label: string;
    readonly paragraphs: readonly string[];
    readonly name: string;
    readonly title: string;
    readonly portrait: CmsImage;
  };
  readonly universities: {
    readonly label: string;
    readonly title: string;
    readonly partners: readonly BachelorsUniversityPartner[];
  };
  readonly courses: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly awardedLabel: string;
    readonly startingLabel: string;
    readonly pendingLabel: string;
    readonly items: readonly BachelorsCmsCourse[];
  };
  readonly awarding: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly sinceLabel: string;
  };
  readonly pearson: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly logo: CmsImage;
  };
  readonly placement: {
    readonly label: string;
    readonly title: string;
    readonly image: CmsImage;
  };
  readonly alumni: CmsTestimonials & { readonly description: string };
  readonly mou: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly badge: string;
    readonly partners: readonly BachelorsMouPartner[];
  };
  readonly notices: {
    readonly title: string;
    readonly description: string;
    readonly buttonLabel: string;
    readonly emptyState: string;
  };
};
