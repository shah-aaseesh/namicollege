// The NAMI College (A-Levels) page exactly as it ships today. Used when
// WordPress is unavailable, as the type schema for CMS data, and exported into
// the WordPress snippet by `npm run cms:defaults`.

import { collegeCopy } from "@/app/institutions/a-levels/_components/college-copy";
import { collegeMilestonesCopy } from "@/app/institutions/a-levels/_components/college-milestones-copy";
import { institution } from "@/lib/content/local/institution";
import { leadership } from "@/lib/content/local/leadership";
import { testimonials } from "@/lib/content/local/testimonials";
import { paragraphsOf } from "@/lib/content/rich-text";
import { testimonialItemsFrom } from "../../testimonials";
import { cmsImage } from "../../types";
import type { ALevelsPageContent } from "./types";

const principal =
  leadership.academics.find(
    (item) => item.slug === collegeCopy.principal.slug,
  ) ?? null;

export const aLevelsDefaults: ALevelsPageContent = {
  seo: {
    title: collegeCopy.meta.title,
    description: collegeCopy.meta.description,
  },
  hero: {
    title: collegeCopy.masthead.heading || institution.entities.college.name,
    standfirst: collegeCopy.masthead.standfirst,
    button: {
      label: collegeCopy.masthead.cta.label,
      href: collegeCopy.masthead.cta.href,
    },
    slides: collegeCopy.masthead.slides.map((slide) => ({
      image: cmsImage(slide),
    })),
  },
  why: {
    label: "Cambridge A Levels",
    title: "Why A Levels at NAMI?",
    intro:
      "NAMI College offers the internationally recognised Cambridge A Level programme, providing students with a rigorous academic pathway that is valued for university admissions both in Nepal and internationally. The programme emphasises academic excellence, critical thinking and independent learning, helping students develop the ability to analyse, question and learn beyond the classroom.",
    more: "With a wide range of subjects and flexible subject combinations, students can build an academic pathway suited to their future ambitions, whether in Science, Medicine, Engineering, Business, Humanities or Liberal Arts. As an independent Cambridge Assessment International Education examination centre since 2024, NAMI provides students with an internationally oriented academic environment supported by experienced academic leadership and student-focused learning.",
  },
  principal: {
    label: collegeCopy.principal.eyebrow,
    paragraphs: paragraphsOf(collegeCopy.principal.message),
    name: principal?.name ?? "",
    title: principal?.title ?? "",
    portrait: cmsImage(collegeCopy.principal.portrait),
  },
  cambridge: {
    label: collegeCopy.cambridge.heading,
    title: collegeCopy.cambridge.eyebrow,
    description: collegeCopy.cambridge.standfirst,
    badge: "Cambridge A-Levels",
    cards: collegeCopy.cambridge.propositions.map((item) => ({
      title: item.title,
      body: item.body,
    })),
  },
  subjects: {
    label: collegeCopy.subjects.heading,
    title: collegeCopy.subjects.eyebrow,
    description: collegeCopy.subjects.standfirst,
    compulsoryLabel: collegeCopy.subjects.compulsoryLabel,
    electivesLabel: "Electives",
    streams: collegeCopy.subjects.streams.map((stream) => ({
      label: stream.label,
      requirement: stream.minimumNote,
      pathways: stream.groups.map((group) => {
        const inGroup = stream.subjects.filter((subject) =>
          subject.groups.includes(group.key),
        );
        return {
          title: group.label,
          compulsory: inGroup.filter((s) => s.compulsory).map((s) => s.name),
          electives: inGroup.filter((s) => !s.compulsory).map((s) => s.name),
        };
      }),
    })),
  },
  milestones: {
    label: collegeMilestonesCopy.heading,
    title: collegeMilestonesCopy.eyebrow,
    items: collegeMilestonesCopy.milestones.map((item) => ({
      year: item.year,
      title: item.title,
      body: item.body,
      logo: item.logo
        ? {
            src: typeof item.logo === "string" ? item.logo : item.logo.src,
            alt: "Cambridge Assessment International Education",
            width: 352,
            height: 112,
          }
        : cmsImage(null),
    })),
  },
  clubs: {
    label: "Extracurricular & Co-Curricular",
    title: "ECA & Clubs",
    description:
      "Student-led clubs fostering community engagement, competitive sports, and artistic creativity.",
  },
  alumni: {
    label: collegeCopy.alumni.heading,
    title: collegeCopy.alumni.eyebrow ?? "Alumni",
    description: collegeCopy.alumni.standfirst ?? "",
    emptyState: collegeCopy.alumni.emptyState ?? "",
    items: testimonialItemsFrom(
      testimonials.filter((item) => item.institution === "college"),
    ),
  },
  entry: {
    label: collegeCopy.entry.eyebrow,
    title: collegeCopy.entry.heading,
    button: {
      label: collegeCopy.entry.cta.label,
      href: collegeCopy.entry.cta.href,
    },
    blocks: collegeCopy.entry.blocks.map((block) => ({
      title: block.title,
      body: block.body,
    })),
  },
  notices: {
    title: collegeCopy.notices.eyebrow,
    description: collegeCopy.notices.standfirst,
    buttonLabel: collegeCopy.notices.ctaLabel,
    emptyState: collegeCopy.notices.emptyState,
  },
};
