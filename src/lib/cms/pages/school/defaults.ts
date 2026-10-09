// The NAMI International School page exactly as it ships today. Used when
// WordPress is unavailable, as the type schema for CMS data, and exported into
// the WordPress snippet by `npm run cms:defaults`.

import type { SchoolBand } from "@/app/institutions/school/_components/school-bands";
import {
  parentTestimonials,
  plusTwoTestimonials,
  schoolCopy,
} from "@/app/institutions/school/_components/school-copy";
import { institution } from "@/lib/content/local/institution";
import { leadership } from "@/lib/content/local/leadership";
import { paragraphsOf } from "@/lib/content/rich-text";
import { schoolPrincipal } from "@/lib/content/school-principal";
import { testimonialItemsFrom } from "../../testimonials";
import { cmsImage } from "../../types";
import type { SchoolBandContent, SchoolPageContent } from "./types";

function band(source: SchoolBand): SchoolBandContent {
  return {
    tabLabel: source.label,
    body: source.body,
    notes: [...source.notes],
    streams: source.streams.map((stream) => ({
      name: stream.name,
      note: stream.note,
      photo: cmsImage(stream.photo),
      subjects: [...(stream.subjects ?? [])],
      subjectGroups: (stream.subjectGroups ?? []).map((group) => ({
        title: group.title,
        subjects: [...group.subjects],
      })),
    })),
  };
}

function logo(file: string, name: string) {
  return {
    src: `/logos/collaborators/${file}`,
    alt: `${name} logo`,
    width: 180,
    height: 64,
  };
}

const principal =
  leadership.academics.find((item) => item.slug === schoolPrincipal.slug) ??
  null;

export const schoolDefaults: SchoolPageContent = {
  seo: {
    title: schoolCopy.meta.title,
    description: schoolCopy.meta.description,
  },
  hero: {
    title: institution.entities.school.name,
    standfirst: schoolCopy.masthead.tagline,
    button: {
      label: schoolCopy.masthead.admissionCta.label,
      href: schoolCopy.masthead.admissionCta.href,
    },
    slides: schoolCopy.masthead.slides.map((slide) => ({
      image: cmsImage(slide),
    })),
  },
  why: {
    label: "NAMI International School",
    title: "Why Study at NAMI?",
    intro:
      "At NAMI International School, we believe education is about more than acquiring knowledge. It is about helping students understand the world, discover their strengths, build meaningful relationships, and grow into confident, responsible individuals. We create an environment where students are encouraged to ask questions, explore ideas, work with others, think critically, and connect what they learn with real-life experiences.",
    more: "Our educational approach is grounded in progressive education, with an emphasis on meaningful learning, student participation, inclusion, values, creativity, and personal growth. Through classroom learning, practical activities, creative pursuits, sports, community engagement, modern science and computer laboratories, and student well-being support, we help learners develop the confidence and competencies to succeed in higher education and life.",
  },
  principal: {
    label: schoolPrincipal.eyebrow,
    paragraphs: paragraphsOf(schoolPrincipal.message),
    name: principal?.name ?? "",
    title: principal?.title ?? "",
    portrait: cmsImage(schoolPrincipal.portrait ?? principal?.portrait),
  },
  approach: {
    title: "Our Educational Approach to Learning",
    description:
      "At NAMI International School, students are active participants in their learning. Teachers guide, support, and challenge students while creating opportunities to explore ideas, develop understanding, collaborate, and make meaningful connections.",
    items: [
      {
        title: "Learning Through Exploration",
        description:
          "Students learn by asking questions, investigating ideas, researching, experimenting, and discovering connections.",
      },
      {
        title: "Learning Through Collaboration",
        description:
          "Students work with peers, teachers, parents, and the wider community to develop communication, teamwork, and interpersonal skills.",
      },
      {
        title: "Learning Through Application",
        description:
          "Learning is connected to practical experiences and real-life situations so that students can understand how knowledge can be used beyond the classroom.",
      },
      {
        title: "Developing Critical Thinkers",
        description:
          "Students are encouraged to analyse, reason, question, solve problems, and make thoughtful decisions.",
      },
      {
        title: "Encouraging Creativity",
        description:
          "Students are given opportunities to express ideas, experiment, create, and explore different ways of approaching challenges.",
      },
      {
        title: "Building Confidence",
        description:
          "Students are encouraged to share their ideas, participate actively, learn from mistakes, and take increasing responsibility for their learning.",
      },
      {
        title: "Inclusion and Belonging",
        description:
          "We recognise that every student is different. We strive to create a caring environment where students with different interests, learning needs, backgrounds, and abilities feel valued and included.",
      },
      {
        title: "Intrinsic Motivation",
        description: "Nurturing internal motivation for learning.",
      },
    ],
    valuesLabel: "Guiding Principles",
    valuesTitle: "Our Values",
    valuesDescription:
      "Our school community is guided by core values that shape everyday learning, character formation, and meaningful relationships.",
    values: [
      {
        name: "Respect",
        meaning:
          "We respect ourselves, others, different perspectives, and our shared environment.",
      },
      {
        name: "Kindness",
        meaning:
          "We encourage students to treat others with care and consideration.",
      },
      {
        name: "Honesty",
        meaning:
          "We value integrity and encourage students to be truthful and responsible.",
      },
      {
        name: "Responsibility",
        meaning:
          "We help students understand that their choices and actions matter.",
      },
      {
        name: "Inclusion",
        meaning:
          "We celebrate differences and work to ensure that every student feels valued and included.",
      },
      {
        name: "Curiosity",
        meaning:
          "We encourage students to question, explore, and keep learning.",
      },
    ],
  },
  admission: {
    label: schoolCopy.admission.heading,
    title: schoolCopy.admission.eyebrow,
    description: schoolCopy.admission.standfirst,
    steps: schoolCopy.admission.steps.map((step) => ({
      title: step.title,
      body: step.body,
    })),
  },
  academics: {
    label: schoolCopy.bands.heading ?? "",
    title: schoolCopy.bands.eyebrow ?? "Academics",
    description: schoolCopy.bands.standfirst ?? "",
  },
  primaryBand: band(schoolCopy.bands.primary),
  plusTwoBand: band(schoolCopy.bands.secondary),
  collaborators: {
    label: "Partners in Learning",
    title: "Our Learning Collaborators",
    description:
      "We collaborate with premier specialized learning partners to complement classroom education and enrich student discovery.",
    items: [
      {
        name: "3Di School",
        tagline: "Design, Software & Emerging Tech",
        shortDescription:
          "Hands-on design and technology platform exploring creativity and software through practical projects.",
        description:
          "3Di School provides a hands-on design and technology platform where students explore creativity, software, and emerging technologies through practical projects.",
        logo: logo("3di.png", "3Di School"),
      },
      {
        name: "Play Nepal",
        tagline: "Movement, Focus & Physical Confidence",
        shortDescription:
          "Structured physical movement and team habits promoting active fitness and emotional well-being.",
        description:
          "Play Nepal helps students develop focus, physical confidence, teamwork, and active habits through joyful and structured movement. Their sessions also support students' emotional well-being and confidence.",
        logo: logo("play-nepal.png", "Play Nepal"),
      },
      {
        name: "UnMath",
        tagline: "Creative & Experiential Mathematics",
        shortDescription:
          "Joyful experiential math education connecting core concepts to creativity and real-world situations.",
        description:
          "The UnMath Programme helps students experience mathematics with greater joy and confidence by connecting mathematical concepts to creativity and real-life situations. It supports engaging and meaningful math learning.",
        logo: logo("unmath.png", "UnMath"),
      },
      {
        name: "Mero Coding",
        tagline: "Coding & Computational Thinking",
        shortDescription:
          "Foundational coding and problem-solving skills empowering students to build interactive tech projects.",
        description:
          "Mero Coding introduces students to the fundamentals of coding and computational thinking. It helps students develop problem-solving, logical thinking, and creativity through coding activities. Students learn to create simple projects while building confidence with technology.",
        logo: logo("mero-coding.png", "Mero Coding"),
      },
      {
        name: "Samatva Wellness",
        tagline: "Mindfulness & Holistic Well-Being",
        shortDescription:
          "Holistic wellness and mindfulness sessions nurturing mental and emotional balance.",
        description:
          "NAMI International School collaborates with Samatva Wellness to support student well-being through regular wellness classes and workshops.",
        logo: logo("samatva-wellness.png", "Samatva Wellness"),
      },
    ],
  },
  faq: {
    titleLead: "Answers to",
    titleAccent: "your most",
    titleTail: "common questions",
    description:
      "Everything you need to know about our progressive educational philosophy, curriculum, daily routines, healthy meals, and student well-being at NAMI International School.",
    highlights: [
      {
        title: "Stress-Free Foundation",
        body: "Continuous formative assessment without high-stakes exam pressure through Grade V.",
      },
      {
        title: "100% In-House Vegetarian Meals",
        body: "Nutritionally balanced, freshly prepared hot meals and wholesome snacks daily.",
      },
    ],
    helpTitle: "Still have questions?",
    helpText: "Our admissions team is here to help.",
    phoneLabel: "Call Admissions: +977-01-4917441/42/43/44",
    phoneNumber: "+977014917441",
    items: schoolCopy.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  },
  facilities: {
    label: schoolCopy.day.heading ?? "",
    title: schoolCopy.day.eyebrow ?? "A day at NAMI",
    description: schoolCopy.day.standfirst ?? "",
    items: schoolCopy.day.campus.map((item) => ({
      title: item.title,
      body: item.body,
      photo: cmsImage(item.photo),
    })),
  },
  parentVoices: {
    label: schoolCopy.parents.heading,
    title: schoolCopy.parents.eyebrow ?? "Parent & Student Voices",
    emptyState: schoolCopy.parents.emptyState ?? "",
    items: testimonialItemsFrom(parentTestimonials),
  },
  plusTwoVoices: {
    label: schoolCopy.plusTwoVoices.heading,
    title: schoolCopy.plusTwoVoices.eyebrow ?? "From Our +2 Graduates",
    emptyState: schoolCopy.plusTwoVoices.emptyState ?? "",
    items: testimonialItemsFrom(plusTwoTestimonials),
  },
  notices: {
    title: schoolCopy.notices.eyebrow,
    description: schoolCopy.notices.standfirst,
    buttonLabel: schoolCopy.notices.ctaLabel,
    emptyState: schoolCopy.notices.emptyState,
  },
};

const SAMPLE_GROUP = { title: "", subjects: [""] };

/** Defaults with a sample item in every list that starts empty (see merge.ts). */
export const schoolShape: SchoolPageContent = {
  ...schoolDefaults,
  primaryBand: withSampleLists(schoolDefaults.primaryBand),
  plusTwoBand: withSampleLists(schoolDefaults.plusTwoBand),
};

function withSampleLists(source: SchoolBandContent): SchoolBandContent {
  return {
    ...source,
    streams: source.streams.map((stream) => ({
      ...stream,
      subjects: stream.subjects.length > 0 ? stream.subjects : [""],
      subjectGroups:
        stream.subjectGroups.length > 0 ? stream.subjectGroups : [SAMPLE_GROUP],
    })),
  };
}
