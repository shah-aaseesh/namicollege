import type { HomeCopy } from "../types";
import {
  homeHeroSlide1,
  homeHeroSlide2,
  homeHeroSlide3,
  homeHeroSlide4,
  homeHeroSlide5,
  homeHeroSlide6,
  homeHeroSlide7,
} from "./images";

export const homeCopy: HomeCopy = {
  hero: {
    eyebrow: "Naaya Aayam Multi-Disciplinary Institute",
    headline: "Transform Yourself to Lead the World",
    standfirst:
      "At NAMI, we provide a comprehensive academic pathway from Grade 1 to Master's degrees, empowering learners through world-class education, holistic development and leadership to transform themselves and lead the world.",
    primaryCta: {
      label: "Start an Application",
      href: "/admissions",
      destination: "internal",
    },
    secondaryCta: {
      label: "Our Story",
      href: "/about",
      destination: "internal",
    },
    images: [
      homeHeroSlide1,
      homeHeroSlide2,
      homeHeroSlide3,
      homeHeroSlide4,
      homeHeroSlide5,
      homeHeroSlide6,
      homeHeroSlide7,
    ],
  },
  sections: {
    about: {
      navLabel: "About NAMI",
      eyebrow: "NAMI since 2012",
      heading:
        "A Nepali entity committed to delivering education of global standards.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    levels: {
      navLabel: "Institutions",
      eyebrow: "NAMI Entities",
      heading: "One Name, Independently Accredited Educational Institutions",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    programmes: {
      navLabel: "Programmes",
      eyebrow: "What You Can Study",
      heading:
        "British degrees, Cambridge A Levels, NEB — taught in Kathmandu.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    affiliations: {
      navLabel: "Accreditation",
      eyebrow: null,
      heading: "Accredited for Excellence",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    partners: {
      navLabel: "Industry Partners",
      eyebrow: "Industry",
      heading: "The people our students work with before they graduate.",
      standfirst:
        "Internships, mentorship, placements and collaborative research across banking, technology, media and hospitality.",
      cta: null,
      emptyState: null,
    },
    campusLife: {
      navLabel: "College Life",
      eyebrow: "Beyond the Timetable",
      heading: "Where ideas get built.",
      standfirst: null,
      cta: null,
      emptyState: null,
    },
    stats: {
      navLabel: "NAMI in Numbers",
      eyebrow: "Our Milestones",
      heading: "NAMI, by the Numbers",
      standfirst:
        "Over a decade of academic excellence, shaped across four learning tiers and a thriving community of thousands.",
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
    updates: {
      navLabel: "Notices",
      eyebrow: "Notices",
      heading: "",
      standfirst: null,
      cta: {
        label: "View All Notices",
        href: "/notices",
        destination: "internal",
      },
      emptyState: "No current notices.",
    },
    admission: {
      navLabel: "Admissions",
      eyebrow: "Admissions",
      heading: "Start where you are.",
      standfirst: "Every level has its own entry route. Pick yours.",
      cta: null,
      emptyState: null,
    },
  },
};
