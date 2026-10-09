import { cache } from "react";
import { entryOf, isoDate } from "@/lib/content/identifiers";
import { vacancies as bundledVacancies } from "@/lib/content/local/careers";
import type { EmploymentType, Vacancy } from "@/lib/content/types";
import { fetchCmsPage } from "../../client";
import { type CmsCollectionItem, fetchCmsCollection } from "../../collections";
import { mergeWithDefaults } from "../../merge";
import { careersDefaults, vacancyTemplate } from "./defaults";
import type { CareersPageContent, VacancyFields } from "./types";

export type * from "./types";

/** WordPress collection slug (Careers → All Vacancies). */
export const VACANCY_COLLECTION = "vacancies";

const EMPLOYMENT_TYPES: readonly EmploymentType[] = [
  "full-time",
  "part-time",
  "contract",
  "internship",
];

export const getCareersPage = cache(async (): Promise<CareersPageContent> => {
  const merged = mergeWithDefaults(
    careersDefaults,
    await fetchCmsPage("careers"),
  );
  return {
    ...merged,
    application: {
      ...merged.application,
      checklist: merged.application.checklist.filter((item) => item.trim()),
    },
  };
});

function dateOrNull(value: string) {
  try {
    return value.trim() === "" ? null : isoDate(value.trim());
  } catch {
    return null;
  }
}

export type VacancyWithRequirements = Vacancy & {
  readonly requirements: readonly string[];
};

function vacancyOf(
  item: CmsCollectionItem<VacancyFields>,
): VacancyWithRequirements | null {
  const { fields } = item;
  const postedAt = dateOrNull(item.date);
  if (postedAt === null) return null;
  return {
    ...entryOf(`vacancy-${item.id}`),
    title: item.title,
    department: fields.department.trim() || "NAMI",
    employmentType:
      EMPLOYMENT_TYPES.find((type) => type === fields.employmentType) ??
      "full-time",
    location: fields.location,
    summary: fields.summary,
    postedAt,
    closesAt: dateOrNull(fields.closesAt),
    requirements: fields.requirements.filter((line) => line.trim() !== ""),
  };
}

function today(): string {
  // Dates are entered in Nepal time.
  return new Date(Date.now() + (5 * 60 + 45) * 60_000)
    .toISOString()
    .slice(0, 10);
}

/**
 * Open vacancies, newest first. Once WordPress answers, only its vacancies are
 * shown (the bundled ones are invented examples). A vacancy disappears the day
 * after its closing date.
 */
export const getVacancyList = cache(
  async (): Promise<readonly VacancyWithRequirements[]> => {
    const collection = await fetchCmsCollection(
      VACANCY_COLLECTION,
      vacancyTemplate,
    );
    const all: readonly VacancyWithRequirements[] =
      collection === null
        ? bundledVacancies.map((vacancy) => ({ ...vacancy, requirements: [] }))
        : collection.items.map(vacancyOf).filter((vacancy) => vacancy !== null);
    const now = today();
    return all
      .filter((vacancy) => vacancy.closesAt === null || vacancy.closesAt >= now)
      .toSorted((a, b) => b.postedAt.localeCompare(a.postedAt));
  },
);

export async function getVacancies(): Promise<readonly Vacancy[]> {
  return getVacancyList();
}
