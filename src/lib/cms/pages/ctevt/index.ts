import { cache } from "react";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { ctevtDefaults } from "./defaults";
import type { CtevtPageContent } from "./types";

export type * from "./types";

function filled(items: readonly string[]): string[] {
  return items.filter((item) => item.trim() !== "");
}

export const getCtevtPage = cache(async (): Promise<CtevtPageContent> => {
  const merged = mergeWithDefaults(ctevtDefaults, await fetchCmsPage("ctevt"));
  return {
    ...merged,
    programmes: {
      ...merged.programmes,
      items: merged.programmes.items.filter((item) => item.title.trim() !== ""),
    },
    about: { ...merged.about, paragraphs: filled(merged.about.paragraphs) },
    approval: {
      ...merged.approval,
      items: merged.approval.items.filter((item) => item.label.trim() !== ""),
    },
    standards: { ...merged.standards, items: filled(merged.standards.items) },
    skills: {
      ...merged.skills,
      paragraphs: filled(merged.skills.paragraphs),
      tags: filled(merged.skills.tags),
    },
    recognition: {
      ...merged.recognition,
      facts: merged.recognition.facts.filter(
        (fact) => fact.label.trim() !== "" && fact.value.trim() !== "",
      ),
    },
  };
});
