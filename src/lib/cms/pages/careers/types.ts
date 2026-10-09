import type { CmsTestimonials } from "../../testimonials";
import type { CmsImage } from "../../types";

// The Careers page text (WordPress: Careers → Page: …) and the fields of each
// vacancy (WordPress: Careers → Add New). Keys must match
// wordpress/snippets/13-careers.php.

export type CareersPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly masthead: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly buttonLabel: string;
    readonly image: CmsImage;
  };
  readonly vacancies: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly emptyState: string;
  };
  readonly application: {
    readonly email: string;
    readonly checklistTitle: string;
    readonly checklist: readonly string[];
    readonly instructions: string;
  };
  readonly benefits: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly {
      readonly title: string;
      readonly description: string;
    }[];
  };
  readonly staff: CmsTestimonials & { readonly description: string };
  readonly firstJob: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly stories: readonly {
      readonly name: string;
      readonly company: string;
      readonly role: string;
      readonly degree: string;
      readonly graduatedYear: number;
      readonly supportType: string;
      readonly quote: string;
      readonly portrait: CmsImage;
    }[];
  };
  readonly placement: {
    readonly label: string;
    readonly title: string;
    readonly image: CmsImage;
  };
};

export type VacancyFields = {
  readonly department: string;
  /** "full-time" | "part-time" | "contract" | "internship" */
  readonly employmentType: string;
  readonly location: string;
  readonly summary: string;
  /** Closing date, YYYY-MM-DD, or "" for open until filled. */
  readonly closesAt: string;
  /** Shown instead of the general application checklist when not empty. */
  readonly requirements: readonly string[];
};
