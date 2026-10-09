// The Home page exactly as it ships today. Used when WordPress is unavailable,
// as the type schema for CMS data, and exported into the WordPress snippet by
// `npm run cms:defaults` so the admin screens start pre-filled.

import { ceoMessage } from "@/lib/content/ceo-message";
import { institutionPathOfSlug } from "@/lib/content/institutions";
import {
  academicLevels,
  programmes,
  vocationalApproval,
} from "@/lib/content/local/academics";
import { affiliations } from "@/lib/content/local/affiliations";
import { campusLife } from "@/lib/content/local/college-life";
import { homeCopy } from "@/lib/content/local/home-copy";
import { institution } from "@/lib/content/local/institution";
import { leadership } from "@/lib/content/local/leadership";
import { stats } from "@/lib/content/local/stats";
import { stakeholderTestimonials } from "@/lib/content/local/testimonials";
import { paragraphsOf } from "@/lib/content/rich-text";
import { schoolGrades } from "@/lib/content/school-grades";
import { testimonialItemsFrom } from "../../testimonials";
import { cmsImage as image } from "../../types";
import type { HomeInstitutionCard, HomePageContent } from "./types";

function uniqueAffiliationLogos() {
  const seen = new Set<string>();
  return [...affiliations]
    .sort((a, b) => a.sinceYear - b.sinceYear)
    .flatMap((item) => {
      const src = typeof item.logo === "string" ? item.logo : item.logo?.src;
      const key = `${item.body}::${src}`;
      if (!src || seen.has(key)) return [];
      seen.add(key);
      return [
        {
          name: item.body,
          logo: { src, alt: item.body, width: 384, height: 192 },
        },
      ];
    });
}

const { sections } = homeCopy;

const ceoLeader =
  leadership.management.find((item) => item.slug === ceoMessage.slug) ??
  leadership.management[0];

const institutionCards: HomeInstitutionCard[] = [
  ...academicLevels.map((level) => {
    const entity = institution.entities[level.entity];
    return {
      name: entity.name,
      badge:
        entity.establishedYear === null
          ? ""
          : `Estd. ${entity.establishedYear}`,
      stage: level.stage,
      highlights: level.highlights.slice(0, 3),
      image: image(level.image),
      imageFit: "cover" as const,
      href: institutionPathOfSlug(level.slug) ?? "",
      footerLabel: "Explore Details",
    };
  }),
  {
    name: "Vocational & Technical Training",
    badge: `Approved ${vocationalApproval.approvedYear}`,
    stage: "CTEVT Approved Short-Term Vocational Programmes",
    highlights: [
      "Council for Technical Education & Vocational Training",
      "Skill-based practical & industry-aligned training",
      "Employment & entrepreneurship-oriented pathways",
    ],
    image: {
      src: "/logos/brand/ctevt-logo-removebg-preview.png",
      alt: "CTEVT — Council for Technical Education and Vocational Training",
      width: 180,
      height: 144,
    },
    imageFit: "contain",
    href: "/institutions/ctevt",
    footerLabel: "Vocational & Technical",
  },
];

export const homeDefaults: HomePageContent = {
  hero: {
    eyebrow: homeCopy.hero.eyebrow,
    headline: homeCopy.hero.headline,
    standfirst: homeCopy.hero.standfirst,
    primaryCta: {
      label: homeCopy.hero.primaryCta.label,
      href: homeCopy.hero.primaryCta.href,
    },
    secondaryCta: {
      label: homeCopy.hero.secondaryCta.label,
      href: homeCopy.hero.secondaryCta.href,
    },
    slides: homeCopy.hero.images.map((slide) => ({ image: image(slide) })),
  },
  marquee: {
    items: [
      { text: "10+2 (NEB)", isLevel: true },
      { text: "Science", isLevel: false },
      { text: "Management", isLevel: false },
      { text: "Cambridge A-Level", isLevel: true },
      { text: "Science", isLevel: false },
      { text: "Non-Science", isLevel: false },
      { text: "Bachelor's Degrees", isLevel: true },
      { text: "BSc. (Hons) Computer Science", isLevel: false },
      { text: "BSc. (Hons) Software Engineering", isLevel: false },
      { text: "BSc. (Hons) Networking Engineering", isLevel: false },
      { text: "BSc. (Hons) Environmental Science", isLevel: false },
      { text: "BBA (Hons) Business Administration", isLevel: false },
      { text: "BSc. Environmental Studies", isLevel: false },
      { text: "Master's Degree", isLevel: true },
      { text: "MSc Computer Science", isLevel: false },
      { text: "School", isLevel: true },
      {
        text: `Grades ${schoolGrades.first} through ${schoolGrades.last}`,
        isLevel: false,
      },
    ],
    awardingBodies: [...new Set(programmes.map((item) => item.awardingBody))],
  },
  about: {
    label: sections.about.heading,
    title: sections.about.eyebrow ?? "About NAMI",
    paragraphs: paragraphsOf(institution.overview).slice(0, 2),
    videoSrc: "/videos/Final%20First%20Video.mp4",
    videoPoster: {
      src: "/videos/Homepage video thumbnails.png",
      alt: "NAMI College",
      width: 1280,
      height: 720,
    },
    button: { label: "Read the Full Story", href: "/about" },
  },
  institutions: {
    label: sections.levels.eyebrow ?? "NAMI Entities",
    title: sections.levels.heading,
    description: sections.levels.standfirst ?? "",
    cards: institutionCards,
  },
  accreditation: {
    label: sections.affiliations.heading,
    title: sections.affiliations.eyebrow ?? "",
    logos: uniqueAffiliationLogos(),
  },
  ceo: {
    label: ceoMessage.eyebrow,
    paragraphs: paragraphsOf(ceoMessage.message),
    name: ceoLeader?.name ?? "",
    title: ceoLeader?.title ?? "",
    portrait: image(ceoLeader?.portrait ?? ceoMessage.portrait),
  },
  stats: {
    label: sections.stats.eyebrow ?? "Our Milestones",
    title: sections.stats.heading || "NAMI by the Numbers",
    description: sections.stats.standfirst ?? "",
    items: stats
      .filter((stat) => stat.placement === "stats")
      .map((stat) => ({
        value: stat.value,
        suffix: stat.suffix ?? "",
        label: stat.label,
      })),
    poster: image(campusLife.find((pillar) => pillar.image !== null)?.image),
    youtubeId: "XW2vMPwdPg8",
  },
  testimonials: {
    label: sections.testimonials.heading,
    title: sections.testimonials.eyebrow ?? "Stakeholder Voice",
    emptyState: sections.testimonials.emptyState ?? "",
    items: testimonialItemsFrom(stakeholderTestimonials),
  },
  notices: {
    label: sections.updates.heading,
    title: sections.updates.eyebrow ?? "Notices",
    button: {
      label: sections.updates.cta?.label ?? "View All Notices",
      href: sections.updates.cta?.href ?? "/notices",
    },
    emptyState: sections.updates.emptyState ?? "",
  },
  popup: {
    enabled: true,
    image: {
      src: "/sections/misc/popup ad 2.jpeg",
      alt: "NAMI College - Admission Open",
      width: 1200,
      height: 1200,
    },
    href: "/admissions",
    title: "NAMI College Admission Open Announcement",
  },
};
