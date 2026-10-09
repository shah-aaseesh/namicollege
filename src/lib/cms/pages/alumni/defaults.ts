// The Alumni page as it ships today, the empty story used to validate
// WordPress data, and the bundled stories offered for import (exported into
// the WordPress snippet by `npm run cms:defaults`).

import {
  type AlumniStory,
  alumniCopy,
  alumniEmployers,
  alumniStories,
} from "@/app/alumni/_components/alumni-copy";
import { cmsImage, EMPTY_IMAGE } from "../../types";
import type { AlumniPageContent, AlumniStoryFields } from "./types";

function cardLabel(wing: AlumniStory["institution"], fallback: string) {
  return (
    alumniStories.find((story) => story.institution === wing)
      ?.institutionLabel ?? fallback
  );
}

export const alumniDefaults: AlumniPageContent = {
  seo: {
    title: alumniCopy.meta.title,
    description: alumniCopy.meta.description,
  },
  masthead: {
    label: alumniCopy.masthead.eyebrow,
    title: alumniCopy.masthead.heading,
    description: alumniCopy.masthead.standfirst,
    buttonLabel: alumniCopy.masthead.cta,
    image: cmsImage(alumniCopy.masthead.image),
  },
  stories: {
    label: alumniCopy.storiesSection.eyebrow,
    title: alumniCopy.storiesSection.heading,
    description: alumniCopy.storiesSection.standfirst,
  },
  wings: {
    allTab: "All Alumni",
    undergraduateTab: "Undergraduate Program",
    undergraduateCard: cardLabel("undergraduate", "Undergraduate Programme"),
    graduateTab: "Graduate Program",
    graduateCard: cardLabel("graduate", "Graduate Programme"),
    collegeTab: "A-Levels",
    collegeCard: cardLabel("college", "A-Levels"),
    plusTwoTab: "Secondary School",
    plusTwoCard: cardLabel("higher-secondary", "Secondary School (+2)"),
  },
  metrics: {
    label: alumniCopy.metrics.eyebrow,
    title: alumniCopy.metrics.heading,
    description: alumniCopy.metrics.standfirst,
    items: alumniCopy.metrics.items.map((item) => ({ ...item })),
  },
  employers: {
    label: alumniCopy.employers.eyebrow ?? "",
    title: alumniCopy.employers.heading,
    description: alumniCopy.employers.standfirst ?? "",
    items: alumniEmployers.map((employer) => ({
      name: employer.name,
      sector: employer.sector,
      logo: employer.logoSrc
        ? { src: employer.logoSrc, alt: employer.name, width: 0, height: 0 }
        : EMPTY_IMAGE,
    })),
  },
  connect: {
    label: alumniCopy.connect.eyebrow,
    title: alumniCopy.connect.heading,
    description: alumniCopy.connect.standfirst,
    buttonLabel: "Share Your Story",
    email: alumniCopy.connect.email,
  },
};

export const alumniStoryTemplate: AlumniStoryFields = {
  wing: "undergraduate",
  photo: EMPTY_IMAGE,
  programme: "",
  graduationYear: "",
  currentRole: "",
  company: "",
  location: "",
  highlights: [""],
  keyQuote: "",
  story: [""],
  milestones: [{ year: "", title: "", organization: "", description: "" }],
  interview: [{ question: "", answer: "" }],
  skills: [""],
};

/** Import dates count back one day per story so WordPress keeps today's order. */
function importDate(index: number): string {
  const date = new Date(Date.UTC(2026, 8, 30));
  date.setUTCDate(date.getUTCDate() - index);
  return date.toISOString().slice(0, 10);
}

export const alumniImports = alumniStories.map((story, index) => {
  const fields: AlumniStoryFields = {
    wing: story.institution,
    photo: { src: story.avatar, alt: story.name, width: 0, height: 0 },
    programme: story.programme,
    graduationYear: story.graduationYear,
    currentRole: story.currentRole,
    company: story.company,
    location: story.location,
    highlights: [...story.summaryHighlights],
    keyQuote: story.keyQuote,
    story: [...story.pdfData.storyParagraphs],
    milestones: story.pdfData.careerMilestones.map((item) => ({ ...item })),
    interview: story.pdfData.interviewQnA.map((item) => ({ ...item })),
    skills: [...story.pdfData.skillsAcquired],
  };
  return { title: story.name, date: importDate(index), fields };
});
