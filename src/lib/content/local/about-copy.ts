import { entryOf } from "../identifiers";
import type { AboutCopy, Award } from "../types";
import {
  aboutHeroCombined,
  auditoriumGathering,
  finalPhotoSeven,
  readingHall,
} from "./images";

const awards: readonly Award[] = [
  {
    ...entryOf("award-excellence-in-teaching"),
    title: "Excellence in Teaching and Learning",
    awardingBody: "National education awards panel",
    year: 2024,
    citation: null,
  },
  {
    ...entryOf("award-best-emerging-institution"),
    title: "Best Emerging Institution",
    awardingBody: "Regional schools association",
    year: 2022,
    citation: null,
  },
  {
    ...entryOf("award-outstanding-student-achievement"),
    title: "Outstanding Student Achievement",
    awardingBody: "Inter-college academic council",
    year: 2020,
    citation: null,
  },
  {
    ...entryOf("award-campus-sustainability"),
    title: "College Sustainability Commendation",
    awardingBody: "City sustainability forum",
    year: 2018,
    citation: null,
  },
];

export const aboutCopy: AboutCopy = {
  metaTitle: "About NAMI",
  metaDescription:
    "The institution behind NAMI in Kathmandu — its story and scale, mission and vision, the people who govern and teach it, and the five values carried in the petals of the red lotus.",
  title: "Institutions under NAMI",
  standfirst:
    "One entity, three institutions, and the five values carried in the petals of the red lotus.",
  openingImage: aboutHeroCombined,
  overviewImage: finalPhotoSeven,
  statsImage: readingHall,
  creedImage: auditoriumGathering,
  awards,
  sections: {
    chronology: {
      navLabel: "About NAMI",
      eyebrow: "NAMI since 2012",
      heading: "",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    emblem: {
      navLabel: "The Red Lotus",
      eyebrow: "The Emblem",
      heading: "The Red Lotus.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    creed: {
      navLabel: "Mission & Vision",
      eyebrow: "Mission & Vision",
      heading: "What NAMI stands for.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    recognition: {
      navLabel: "Accreditation",
      eyebrow: "Recognition",
      heading: "Who awards what NAMI teaches.",
      standfirst: "Each year below is the year that recognition began.",
      cta: null,
      emptyState: null,
    },
    awards: {
      navLabel: "Awards",
      eyebrow: "Awards & Honours",
      heading: "",
      standfirst:
        "Recognition received by the institution and its students, along with the organisations that conferred the awards.",
      cta: null,
      emptyState:
        "NAMI is compiling its awards record — this space is reserved for it.",
    },
    stats: {
      navLabel: "NAMI in Numbers",
      eyebrow: "Our Milestones",
      heading: "NAMI, by the Numbers",
      standfirst:
        "A decade of teaching across four academic levels, measured in the people it has graduated.",
      cta: null,
      emptyState: null,
    },
    testimonials: {
      navLabel: "Testimonials",
      eyebrow: "Stakeholder Voice",
      heading: "",
      standfirst: null,
      cta: null,
      emptyState:
        "Stakeholder stories are being collected — this space is reserved for them.",
    },
  },
};
