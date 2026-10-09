import { cache } from "react";
import type {
  BachelorsProgramme,
  ModuleStatus,
} from "@/app/institutions/bachelors/_components/bachelors-copy";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { hasImage } from "../../types";
import { bachelorsDefaults } from "./defaults";
import type { BachelorsCmsCourse, BachelorsPageContent } from "./types";

export type * from "./types";

const STATUSES: readonly string[] = ["Compulsory", "Optional", "Designated"];

function textOrNull(value: string): string | null {
  return value.trim() === "" ? null : value;
}

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

/** Converts a CMS course into the shape the course components render. */
function programmeOf(
  course: BachelorsCmsCourse,
  slug: string,
): BachelorsProgramme {
  return {
    key: slug,
    qualification: course.qualification,
    title: course.title,
    fullTitle: course.fullTitle.trim() === "" ? course.title : course.fullTitle,
    metaDescription: course.metaDescription,
    image: course.image,
    awardingBody: course.awardingBody,
    startingFrom: textOrNull(course.startingFrom),
    format: textOrNull(course.format),
    keyFacts: course.keyFacts.filter(
      (fact) => fact.label.trim() !== "" && fact.value.trim() !== "",
    ),
    whatYoullStudy: textOrNull(course.whatYoullStudy) ?? undefined,
    summary: filled(course.summary),
    shortDescription: textOrNull(course.shortDescription) ?? undefined,
    entryLabel: course.entryLabel,
    entry: course.entry.filter((item) => item.label.trim() !== ""),
    entryNotes: filled(course.entryNotes),
    careersLabel: course.careersLabel,
    careerSummary: textOrNull(course.careerSummary),
    careerSectors: filled(course.careerSectors),
    pendingNote: textOrNull(course.pendingNote),
    stagesNote: textOrNull(course.stagesNote),
    stages: course.stages
      .filter((stage) => stage.label.trim() !== "")
      .map((stage, index) => ({
        key: `${slug}-stage-${index + 1}`,
        label: stage.label,
        note: textOrNull(stage.note),
        modules: stage.modules
          .filter((module) => module.title.trim() !== "")
          .map((module) => ({
            code: module.code,
            title: module.title,
            credits: module.credits,
            status: STATUSES.includes(module.status)
              ? (module.status as ModuleStatus)
              : null,
            prerequisites: textOrNull(module.prerequisites),
            description: textOrNull(module.description) ?? undefined,
          })),
      })),
  };
}

export const getBachelorsPage = cache(
  async (): Promise<BachelorsPageContent> => {
    const merged = mergeWithDefaults(
      bachelorsDefaults,
      await fetchCmsPage("bachelors"),
    );
    return {
      ...merged,
      hero: {
        ...merged.hero,
        slides: merged.hero.slides.filter((slide) => hasImage(slide.image)),
      },
    };
  },
);

/** The degree courses in display order; each has a page at /institutions/bachelors/{key}. */
export const getBachelorsProgrammes = cache(
  async (): Promise<readonly BachelorsProgramme[]> => {
    const { courses } = await getBachelorsPage();
    const seen = new Set<string>();
    const programmes: BachelorsProgramme[] = [];

    for (const course of courses.items) {
      if (course.title.trim() === "" || !hasImage(course.image)) continue;
      const slug = slugOf(course.slug) || slugOf(course.title);
      // Two courses can't share one web address; the first one keeps it.
      if (slug === "" || seen.has(slug)) continue;
      seen.add(slug);
      programmes.push(programmeOf(course, slug));
    }
    return programmes;
  },
);
