import type { CmsTestimonials } from "../../testimonials";
import type { CmsImage, CmsLink } from "../../types";

// One key per admin sub-menu in WordPress (Home → Hero, Home → About, …).
// Keys and field names must match wordpress/snippets/02-home-page.php.

export type HomeHero = {
  readonly eyebrow: string;
  readonly headline: string;
  readonly standfirst: string;
  readonly primaryCta: CmsLink;
  readonly secondaryCta: CmsLink;
  readonly slides: readonly { readonly image: CmsImage }[];
};

export type HomeMarquee = {
  readonly items: readonly {
    readonly text: string;
    readonly isLevel: boolean;
  }[];
  readonly awardingBodies: readonly string[];
};

export type HomeAbout = {
  readonly label: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly videoSrc: string;
  readonly videoPoster: CmsImage;
  readonly button: CmsLink;
};

export type HomeInstitutionCard = {
  readonly name: string;
  readonly badge: string;
  readonly stage: string;
  readonly highlights: readonly string[];
  readonly image: CmsImage;
  readonly imageFit: "cover" | "contain";
  readonly href: string;
  readonly footerLabel: string;
};

export type HomeInstitutions = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly cards: readonly HomeInstitutionCard[];
};

export type HomeAccreditation = {
  readonly label: string;
  readonly title: string;
  readonly logos: readonly {
    readonly name: string;
    readonly logo: CmsImage;
  }[];
};

export type HomeCeo = {
  readonly label: string;
  readonly paragraphs: readonly string[];
  readonly name: string;
  readonly title: string;
  readonly portrait: CmsImage;
};

export type HomeStats = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly {
    readonly value: number;
    readonly suffix: string;
    readonly label: string;
  }[];
  readonly poster: CmsImage;
  readonly youtubeId: string;
};

export type HomeTestimonials = CmsTestimonials;

export type HomeNotices = {
  readonly label: string;
  readonly title: string;
  readonly button: CmsLink;
  readonly emptyState: string;
};

export type HomePopup = {
  readonly enabled: boolean;
  readonly image: CmsImage;
  readonly href: string;
  readonly title: string;
};

export type HomePageContent = {
  readonly hero: HomeHero;
  readonly marquee: HomeMarquee;
  readonly about: HomeAbout;
  readonly institutions: HomeInstitutions;
  readonly accreditation: HomeAccreditation;
  readonly ceo: HomeCeo;
  readonly stats: HomeStats;
  readonly testimonials: HomeTestimonials;
  readonly notices: HomeNotices;
  readonly popup: HomePopup;
};
