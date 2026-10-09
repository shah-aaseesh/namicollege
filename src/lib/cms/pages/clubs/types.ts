import type { CmsImage } from "../../types";

// One key per admin sub-menu in WordPress (Clubs → School Clubs, Clubs → A-Levels Clubs).
// Keys and field names must match wordpress/snippets/10-clubs.php.

export type CmsClub = {
  /** The club page's web address: /institutions/{school|a-levels}/clubs/{slug}. */
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly tagline: string;
  readonly metaDescription: string;
  readonly coverImage: CmsImage;
  readonly overview: readonly string[];
  readonly quoteText: string;
  readonly quoteAuthor: string;
  readonly objectives: readonly string[];
  readonly activities: readonly {
    readonly title: string;
    readonly description: string;
    readonly tag: string;
  }[];
  readonly skills: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly gallery: readonly {
    readonly image: CmsImage;
    readonly caption: string;
  }[];
  readonly meetingSchedule: string;
  readonly eligibility: string;
  readonly facultyMentor: string;
};

export type ClubsPageContent = {
  readonly school: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly CmsClub[];
  };
  /** The heading above the A-Levels club cards is edited under A-Levels → ECA & Clubs. */
  readonly aLevels: {
    readonly items: readonly CmsClub[];
  };
};
