// The School and A-Levels clubs exactly as they ship today. Used when
// WordPress is unavailable, as the type schema for CMS data, and exported into
// the WordPress snippet by `npm run cms:defaults`.

import { A_LEVELS_CLUBS } from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";
import {
  SCHOOL_CLUBS,
  type SchoolClub,
} from "@/app/institutions/school/_components/school-clubs-copy";
import { cmsImage } from "../../types";
import type { ClubsPageContent, CmsClub } from "./types";

function clubOf(club: SchoolClub): CmsClub {
  return {
    slug: club.slug,
    title: club.title,
    category: club.category,
    tagline: club.tagline,
    metaDescription: club.metaDescription,
    coverImage: cmsImage(club.coverImage),
    overview: [...club.overview],
    quoteText: club.quote.text,
    quoteAuthor: club.quote.author,
    objectives: [...club.objectives],
    activities: club.keyActivities.map((item) => ({ ...item })),
    skills: club.skillsDeveloped.map((item) => ({ ...item })),
    gallery: (club.galleryImages ?? []).map((photo) => ({
      image: cmsImage(photo),
      caption: photo.caption ?? "",
    })),
    meetingSchedule: club.meetingSchedule,
    eligibility: club.eligibility,
    facultyMentor: club.facultyMentor,
  };
}

export const clubsDefaults: ClubsPageContent = {
  school: {
    label: "Extracurricular & Co-Curricular",
    title: "ECA & Clubs",
    description:
      "Five vibrant student-led clubs nurturing physical vitality, creative expression, leadership, social empathy, and scientific inquiry.",
    items: SCHOOL_CLUBS.map(clubOf),
  },
  aLevels: {
    items: A_LEVELS_CLUBS.map(clubOf),
  },
};
