// The Careers page as it ships today and the empty vacancy used to validate
// WordPress data. Exported into the WordPress snippet by `npm run cms:defaults`.
// The bundled vacancies are invented examples, so they are not offered for import.

import {
  careersCopy,
  firstJobStories,
  staffTestimonials,
} from "@/app/careers/_components/careers-copy";
import { testimonialItemsFrom } from "../../testimonials";
import { cmsImage } from "../../types";
import type { CareersPageContent, VacancyFields } from "./types";

export const careersDefaults: CareersPageContent = {
  seo: {
    title: careersCopy.meta.title,
    description: careersCopy.meta.description,
  },
  masthead: {
    label: careersCopy.masthead.eyebrow,
    title: careersCopy.masthead.heading,
    description: careersCopy.masthead.standfirst,
    buttonLabel: careersCopy.masthead.cta,
    image: cmsImage(careersCopy.masthead.image),
  },
  vacancies: {
    label: careersCopy.vacancies.heading,
    title: careersCopy.vacancies.eyebrow ?? "Current Openings",
    description: careersCopy.vacancies.standfirst ?? "",
    emptyState: careersCopy.vacancies.emptyState ?? "",
  },
  application: {
    email: "careers@nami.edu.np",
    checklistTitle: "Application Checklist",
    checklist: [
      "Updated Curriculum Vitae (CV) & Recent Photograph",
      "Copies of Academic Degrees & Transcripts",
      "Cover Letter / Statement of Teaching Philosophy",
      "Two Professional / Academic References",
    ],
    instructions:
      "Send all application materials to {email} citing the position title in the subject line. Shortlisted candidates will be contacted within 5 working days.",
  },
  benefits: {
    label: careersCopy.benefits.heading,
    title: careersCopy.benefits.eyebrow,
    description: careersCopy.benefits.standfirst,
    items: careersCopy.benefits.items.map((item) => ({
      title: item.title,
      description: item.desc,
    })),
  },
  staff: {
    label: careersCopy.staffTestimonials.heading,
    title: careersCopy.staffTestimonials.eyebrow ?? "",
    description: careersCopy.staffTestimonials.standfirst ?? "",
    emptyState: careersCopy.staffTestimonials.emptyState ?? "",
    items: testimonialItemsFrom(staffTestimonials),
  },
  firstJob: {
    label: careersCopy.firstJob.eyebrow,
    title: careersCopy.firstJob.heading,
    description: careersCopy.firstJob.standfirst,
    stories: firstJobStories.map((story) => ({
      name: story.name,
      company: story.company,
      role: story.role,
      degree: story.degree,
      graduatedYear: story.graduatedYear,
      supportType: story.supportType,
      quote: story.quote,
      portrait: cmsImage(story.portrait),
    })),
  },
  placement: {
    label: careersCopy.placement.heading,
    title: careersCopy.placement.eyebrow,
    image: cmsImage(careersCopy.placement.image),
  },
};

export const vacancyTemplate: VacancyFields = {
  department: "",
  employmentType: "full-time",
  location: "",
  summary: "",
  closesAt: "",
  requirements: [""],
};
