import { cache } from "react";
import {
  type AlumniEmployer,
  type AlumniStory,
  alumniStories,
} from "@/app/alumni/_components/alumni-copy";
import { fetchCmsPage } from "../../client";
import { type CmsCollectionItem, fetchCmsCollection } from "../../collections";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { alumniDefaults, alumniStoryTemplate } from "./defaults";
import type { AlumniPageContent, AlumniStoryFields } from "./types";

export type * from "./types";

/** WordPress collection slug (Alumni → All Stories). */
export const ALUMNI_COLLECTION = "alumni-stories";

type Wing = AlumniStory["institution"];
const WINGS: readonly Wing[] = [
  "undergraduate",
  "graduate",
  "college",
  "higher-secondary",
];

export const getAlumniPage = cache(async (): Promise<AlumniPageContent> => {
  return mergeWithDefaults(alumniDefaults, await fetchCmsPage("alumni"));
});

function filled(items: readonly string[]): string[] {
  return items.filter((item) => item.trim() !== "");
}

function storyOf(
  item: CmsCollectionItem<AlumniStoryFields>,
  cardLabels: Readonly<Record<Wing, string>>,
): AlumniStory | null {
  const { fields } = item;
  if (!hasImage(fields.photo)) return null;
  const wing = WINGS.find((value) => value === fields.wing) ?? "undergraduate";
  return {
    id: `alumni-${item.id}`,
    name: item.title,
    avatar: fields.photo.src,
    programme: fields.programme,
    graduationYear: fields.graduationYear,
    institution: wing,
    institutionLabel: cardLabels[wing],
    currentRole: fields.currentRole,
    company: fields.company,
    sector: "",
    location: fields.location,
    summaryHighlights: filled(fields.highlights),
    keyQuote: fields.keyQuote,
    pdfData: {
      documentId: "",
      title: "",
      publishedDate: "",
      headline: "",
      storyParagraphs: filled(fields.story),
      careerMilestones: fields.milestones.filter(
        (milestone) => milestone.title.trim() !== "",
      ),
      interviewQnA: fields.interview.filter(
        (entry) => entry.question.trim() !== "" && entry.answer.trim() !== "",
      ),
      skillsAcquired: filled(fields.skills),
    },
  };
}

/**
 * Wing tabs, stories and employers for the Alumni page. Until an editor
 * imports the bundled stories in WordPress (or starts an empty list), new
 * published WordPress stories are shown before the bundled ones.
 */
export const getAlumniData = cache(async () => {
  const [page, collection] = await Promise.all([
    getAlumniPage(),
    fetchCmsCollection(ALUMNI_COLLECTION, alumniStoryTemplate),
  ]);
  const { wings } = page;
  const cardLabels: Record<Wing, string> = {
    undergraduate: wings.undergraduateCard,
    graduate: wings.graduateCard,
    college: wings.collegeCard,
    "higher-secondary": wings.plusTwoCard,
  };

  const bundled = alumniStories.map((story) => ({
    ...story,
    institutionLabel: cardLabels[story.institution],
  }));
  const fromCms =
    collection?.items
      .map((item) => storyOf(item, cardLabels))
      .filter((story) => story !== null) ?? [];
  const stories =
    collection === null
      ? bundled
      : collection.ready
        ? fromCms
        : [...fromCms, ...bundled];

  const employers: AlumniEmployer[] = page.employers.items
    .filter((employer) => employer.name.trim() !== "")
    .map((employer, index) => ({
      id: `employer-${index + 1}`,
      name: employer.name,
      sector: employer.sector,
      logoSrc: hasImage(employer.logo) ? employer.logo.src : null,
    }));

  return {
    page,
    tabs: [
      { id: "all", label: wings.allTab },
      { id: "undergraduate", label: wings.undergraduateTab },
      { id: "graduate", label: wings.graduateTab },
      { id: "college", label: wings.collegeTab },
      { id: "higher-secondary", label: wings.plusTwoTab },
    ] as const,
    stories,
    employers,
  };
});
