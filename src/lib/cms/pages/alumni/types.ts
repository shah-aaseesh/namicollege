import type { CmsImage } from "../../types";

// The Alumni page settings (WordPress: Alumni → Page: …) and the fields of each
// alumni story (WordPress: Alumni → Add New, or a graduate's submission).
// Keys must match wordpress/snippets/17-alumni.php.

export type AlumniPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly masthead: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly buttonLabel: string;
    readonly image: CmsImage;
  };
  readonly stories: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
  };
  readonly wings: {
    readonly allTab: string;
    readonly undergraduateTab: string;
    readonly undergraduateCard: string;
    readonly graduateTab: string;
    readonly graduateCard: string;
    readonly collegeTab: string;
    readonly collegeCard: string;
    readonly plusTwoTab: string;
    readonly plusTwoCard: string;
  };
  readonly metrics: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly {
      readonly stat: string;
      readonly label: string;
      readonly detail: string;
    }[];
  };
  readonly employers: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly {
      readonly name: string;
      readonly sector: string;
      readonly logo: CmsImage;
    }[];
  };
  readonly connect: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly buttonLabel: string;
    readonly email: string;
  };
};

export type AlumniStoryFields = {
  /** "undergraduate" | "graduate" | "college" | "higher-secondary" */
  readonly wing: string;
  readonly photo: CmsImage;
  readonly programme: string;
  readonly graduationYear: string;
  readonly currentRole: string;
  readonly company: string;
  readonly location: string;
  readonly highlights: readonly string[];
  readonly keyQuote: string;
  readonly story: readonly string[];
  readonly milestones: readonly {
    readonly year: string;
    readonly title: string;
    readonly organization: string;
    readonly description: string;
  }[];
  readonly interview: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
  readonly skills: readonly string[];
};
