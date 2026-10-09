import type { CmsTestimonials } from "../../testimonials";
import type { CmsImage, CmsLink } from "../../types";

// One key per admin sub-menu in WordPress (About → Hero, About → History, …).
// Keys and field names must match wordpress/snippets/03-about-page.php.

export type AboutSeo = {
  readonly title: string;
  readonly description: string;
};

export type AboutHero = {
  readonly title: string;
  readonly standfirst: string;
  readonly button: CmsLink;
  readonly images: readonly { readonly image: CmsImage }[];
};

export type AboutOverview = {
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly image: CmsImage;
};

export type AboutLeaderMessage = {
  readonly badge: string;
  readonly name: string;
  readonly title: string;
  readonly credentials: string;
  readonly portrait: CmsImage;
  readonly quote: string;
  readonly paragraphs: readonly string[];
};

export type AboutLeadership = {
  readonly label: string;
  readonly title: string;
  readonly messages: readonly AboutLeaderMessage[];
};

export type AboutMilestone = {
  readonly year: string;
  readonly era: string;
  readonly title: string;
  readonly partner: string;
  readonly logo: CmsImage;
  readonly description: string;
};

export type AboutHistory = {
  readonly title: string;
  readonly intro: string;
  readonly milestones: readonly AboutMilestone[];
};

export type AboutEmblem = {
  readonly label: string;
  readonly title: string;
  readonly image: CmsImage;
  readonly paragraphs: readonly string[];
  readonly valuesTitle: string;
  readonly values: readonly {
    readonly name: string;
    readonly meaning: string;
  }[];
};

export type AboutCreed = {
  readonly label: string;
  readonly title: string;
  readonly missionLabel: string;
  readonly mission: readonly string[];
  readonly visionLabel: string;
  readonly vision: readonly string[];
};

export type AboutMascot = {
  readonly label: string;
  readonly title: string;
  readonly paragraphs: readonly string[];
  readonly image: CmsImage;
};

export type AboutAwards = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly emptyState: string;
  readonly items: readonly {
    readonly year: number;
    readonly title: string;
    readonly awardingBody: string;
    readonly citation: string;
  }[];
};

export type AboutPageContent = {
  readonly seo: AboutSeo;
  readonly hero: AboutHero;
  readonly overview: AboutOverview;
  readonly leadership: AboutLeadership;
  readonly history: AboutHistory;
  readonly emblem: AboutEmblem;
  readonly creed: AboutCreed;
  readonly mascot: AboutMascot;
  readonly awards: AboutAwards;
  readonly testimonials: CmsTestimonials;
};
