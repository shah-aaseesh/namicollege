import { cache } from "react";
import type { SchoolClub } from "@/app/institutions/school/_components/school-clubs-copy";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { clubsDefaults } from "./defaults";
import type { ClubsPageContent, CmsClub } from "./types";

export type * from "./types";

/** School and A-Levels clubs share one shape. */
export type Club = SchoolClub;

function filled(items: readonly string[]): string[] {
  return items.filter((item) => item.trim() !== "");
}

/** Web addresses are lowercase words joined by hyphens. */
function slugOf(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function clubOf(club: CmsClub, slug: string): Club {
  const gallery = club.gallery
    .filter((photo) => hasImage(photo.image))
    .map((photo) => ({
      ...photo.image,
      ...(photo.caption.trim() === "" ? {} : { caption: photo.caption }),
    }));

  return {
    slug,
    title: club.title,
    category: club.category,
    tagline: club.tagline,
    metaDescription: club.metaDescription,
    coverImage: club.coverImage,
    overview: filled(club.overview),
    quote: { text: club.quoteText, author: club.quoteAuthor },
    objectives: filled(club.objectives),
    keyActivities: club.activities.filter((item) => item.title.trim() !== ""),
    skillsDeveloped: club.skills.filter((item) => item.title.trim() !== ""),
    ...(gallery.length === 0 ? {} : { galleryImages: gallery }),
    meetingSchedule: club.meetingSchedule,
    eligibility: club.eligibility,
    facultyMentor: club.facultyMentor,
  };
}

/** Clubs without a name or cover photo are hidden; two can't share an address. */
function clubsOf(items: readonly CmsClub[]): Club[] {
  const seen = new Set<string>();
  const clubs: Club[] = [];
  for (const item of items) {
    if (item.title.trim() === "" || !hasImage(item.coverImage)) continue;
    const slug = slugOf(item.slug) || slugOf(item.title);
    if (slug === "" || seen.has(slug)) continue;
    seen.add(slug);
    clubs.push(clubOf(item, slug));
  }
  return clubs;
}

export const getClubsPage = cache(async (): Promise<ClubsPageContent> => {
  return mergeWithDefaults(clubsDefaults, await fetchCmsPage("clubs"));
});

export const getSchoolClubs = cache(async (): Promise<readonly Club[]> => {
  return clubsOf((await getClubsPage()).school.items);
});

export const getALevelsClubs = cache(async (): Promise<readonly Club[]> => {
  return clubsOf((await getClubsPage()).aLevels.items);
});
