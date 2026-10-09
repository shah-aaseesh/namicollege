// The Faculty & Leadership page exactly as it ships today. Used when WordPress
// is unavailable, as the type schema for CMS data, and exported into the
// WordPress snippet by `npm run cms:defaults`.

import { leadership } from "@/lib/content/local/leadership";
import type { Leader } from "@/lib/content/types";
import { cmsImage } from "../../types";
import type { FacultyPageContent, FacultyPerson } from "./types";

function people(leaders: readonly Leader[]): FacultyPerson[] {
  return leaders.map((leader) => ({
    name: leader.name,
    title: leader.title,
    brief: leader.brief,
    bio: leader.bio ?? "",
    portrait: cmsImage(leader.portrait),
  }));
}

export const facultyDefaults: FacultyPageContent = {
  seo: {
    title: "Faculty & Leadership",
    description:
      "Meet the board of directors, academic heads, and management team who shape the future of NAMI.",
  },
  board: { title: "Board of Directors", people: people(leadership.board) },
  management: {
    title: "Management Team",
    people: people(leadership.management),
  },
  academics: { title: "Academic Heads", people: people(leadership.academics) },
};
