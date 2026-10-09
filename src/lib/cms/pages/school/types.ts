import type { CmsTestimonials } from "../../testimonials";
import type { CmsImage, CmsLink } from "../../types";

// One key per admin sub-menu in WordPress (School → Hero, School → FAQs, …).
// Keys and field names must match wordpress/snippets/05-school-page.php.

export type SchoolHeroContent = {
  readonly title: string;
  readonly standfirst: string;
  readonly button: CmsLink;
  readonly slides: readonly { readonly image: CmsImage }[];
};

export type SchoolWhyContent = {
  readonly label: string;
  readonly title: string;
  readonly intro: string;
  readonly more: string;
};

export type SchoolPrincipalContent = {
  readonly label: string;
  readonly paragraphs: readonly string[];
  readonly name: string;
  readonly title: string;
  readonly portrait: CmsImage;
};

export type SchoolApproachContent = {
  readonly title: string;
  readonly description: string;
  readonly items: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly valuesLabel: string;
  readonly valuesTitle: string;
  readonly valuesDescription: string;
  readonly values: readonly {
    readonly name: string;
    readonly meaning: string;
  }[];
};

export type SchoolAdmissionContent = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly steps: readonly {
    readonly title: string;
    readonly body: string;
  }[];
};

export type SchoolAcademicsContent = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
};

export type SchoolStreamContent = {
  readonly name: string;
  readonly note: string;
  readonly photo: CmsImage;
  readonly subjects: readonly string[];
  readonly subjectGroups: readonly {
    readonly title: string;
    readonly subjects: readonly string[];
  }[];
};

export type SchoolBandContent = {
  readonly tabLabel: string;
  readonly body: string;
  readonly notes: readonly string[];
  readonly streams: readonly SchoolStreamContent[];
};

export type SchoolCollaboratorsContent = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly {
    readonly name: string;
    readonly tagline: string;
    readonly shortDescription: string;
    readonly description: string;
    readonly logo: CmsImage;
  }[];
};

export type SchoolFaqContent = {
  readonly titleLead: string;
  readonly titleAccent: string;
  readonly titleTail: string;
  readonly description: string;
  readonly highlights: readonly {
    readonly title: string;
    readonly body: string;
  }[];
  readonly helpTitle: string;
  readonly helpText: string;
  readonly phoneLabel: string;
  readonly phoneNumber: string;
  readonly items: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
};

export type SchoolFacilitiesContent = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly {
    readonly title: string;
    readonly body: string;
    readonly photo: CmsImage;
  }[];
};

export type SchoolNoticesContent = {
  readonly title: string;
  readonly description: string;
  readonly buttonLabel: string;
  readonly emptyState: string;
};

export type SchoolPageContent = {
  readonly seo: { readonly title: string; readonly description: string };
  readonly hero: SchoolHeroContent;
  readonly why: SchoolWhyContent;
  readonly principal: SchoolPrincipalContent;
  readonly approach: SchoolApproachContent;
  readonly admission: SchoolAdmissionContent;
  readonly academics: SchoolAcademicsContent;
  readonly primaryBand: SchoolBandContent;
  readonly plusTwoBand: SchoolBandContent;
  readonly collaborators: SchoolCollaboratorsContent;
  readonly faq: SchoolFaqContent;
  readonly facilities: SchoolFacilitiesContent;
  readonly parentVoices: CmsTestimonials;
  readonly plusTwoVoices: CmsTestimonials;
  readonly notices: SchoolNoticesContent;
};
