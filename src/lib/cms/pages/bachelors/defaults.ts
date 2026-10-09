// The Bachelors (NAMI Institute) page and its course pages exactly as they ship
// today. Used when WordPress is unavailable, as the type schema for CMS data,
// and exported into the WordPress snippet by `npm run cms:defaults`.

import {
  type BachelorsProgramme,
  bachelorsCopy,
} from "@/app/institutions/bachelors/_components/bachelors-copy";
import { MOU_PARTNERS } from "@/app/institutions/bachelors/_components/mou-partners";
import { leadership } from "@/lib/content/local/leadership";
import { testimonials } from "@/lib/content/local/testimonials";
import { paragraphsOf } from "@/lib/content/rich-text";
import { testimonialItemsFrom } from "../../testimonials";
import { cmsImage } from "../../types";
import type { BachelorsCmsCourse, BachelorsPageContent } from "./types";

const academicHead =
  leadership.academics.find(
    (item) => item.slug === bachelorsCopy.academicHead.slug,
  ) ?? null;

function image(src: string, alt: string, width: number, height: number) {
  return { src, alt, width, height };
}

/** The Key Facts the course page used to work out when none were listed. */
function keyFactsOf(
  course: BachelorsProgramme,
): BachelorsCmsCourse["keyFacts"] {
  if (course.keyFacts && course.keyFacts.length > 0) {
    return course.keyFacts.map((fact) => ({ ...fact }));
  }
  const credits = course.stages.reduce(
    (total, stage) =>
      total + stage.modules.reduce((sum, module) => sum + module.credits, 0),
    0,
  );
  return [
    { label: "Programme Name", value: course.fullTitle },
    { label: "Level", value: "Undergraduate Degree" },
    { label: "Duration", value: course.format ?? "3 years" },
    { label: "Location", value: "New Baneshwor, Kathmandu" },
    { label: "Awarding Institution", value: course.awardingBody },
    { label: "Mode", value: "Full Time" },
    ...(credits > 0
      ? [{ label: "Total Credits", value: String(credits) }]
      : []),
    ...(course.startingFrom === null
      ? []
      : [{ label: "First intake", value: course.startingFrom }]),
  ];
}

function courseOf(course: BachelorsProgramme): BachelorsCmsCourse {
  return {
    slug: course.key,
    qualification: course.qualification,
    title: course.title,
    fullTitle: course.fullTitle,
    shortDescription: course.shortDescription ?? "",
    image: cmsImage(course.image),
    awardingBody: course.awardingBody,
    startingFrom: course.startingFrom ?? "",
    format: course.format ?? "",
    metaDescription: course.metaDescription,
    keyFacts: keyFactsOf(course),
    whatYoullStudy: course.whatYoullStudy ?? "",
    summary: [...course.summary],
    entryLabel: course.entryLabel,
    entry: course.entry.map((item) => ({ ...item })),
    entryNotes: [...course.entryNotes],
    careersLabel: course.careersLabel,
    careerSummary: course.careerSummary ?? "",
    careerSectors: [...course.careerSectors],
    pendingNote: course.pendingNote ?? "",
    stagesNote: course.stagesNote ?? "",
    stages: course.stages.map((stage) => ({
      label: stage.label,
      note: stage.note ?? "",
      modules: stage.modules.map((module) => ({
        code: module.code,
        title: module.title,
        credits: module.credits,
        status: module.status ?? "",
        prerequisites: module.prerequisites ?? "",
        description: module.description ?? "",
      })),
    })),
  };
}

export const bachelorsDefaults: BachelorsPageContent = {
  seo: {
    title: bachelorsCopy.meta.title,
    description: bachelorsCopy.meta.description,
  },
  hero: {
    label: bachelorsCopy.masthead.heroLabel,
    title: bachelorsCopy.masthead.heading,
    standfirst: bachelorsCopy.masthead.standfirst,
    button: {
      label: bachelorsCopy.masthead.cta.label,
      href: bachelorsCopy.masthead.cta.href,
    },
    slides: bachelorsCopy.masthead.slides.map((slide) => ({
      image: cmsImage(slide),
    })),
  },
  why: {
    label: "Undergraduate Studies",
    title: "Why Undergraduate at NAMI?",
    intro:
      "NAMI offers internationally oriented undergraduate education through its academic collaboration with the University of Northampton, UK. Students can pursue British degrees across disciplines including Computer Science, Software Engineering, Networking Engineering, Environmental Science and Business Administration, gaining an academic foundation designed to meet the expectations of the global job market.",
    more: "The undergraduate experience goes beyond academic study. NAMI's industry partnerships provide opportunities for internships, mentorship, job placements and collaborative research, helping students connect classroom learning with real-world requirements. Through its Innovation and Incubation Centre, students can also develop ideas, work with entrepreneurs and industry experts, build prototypes, explore business models and pursue their own ventures.",
  },
  academicHead: {
    label: bachelorsCopy.academicHead.eyebrow,
    paragraphs: paragraphsOf(bachelorsCopy.academicHead.message),
    name: academicHead?.name ?? "",
    title: academicHead?.title ?? "",
    portrait: cmsImage(
      bachelorsCopy.academicHead.portrait ?? academicHead?.portrait,
    ),
  },
  universities: {
    label: "Academic Affiliations & Degree Awarding",
    title: "Our University Partners",
    partners: [
      {
        name: "University of Northampton, UK",
        badge: "Official UK Degree Awarding Partner",
        status: "Direct Academic Partnership Since 2012",
        location: "Waterside Campus, University Drive, Northampton - NN1 5PH",
        logo: image(
          "/logos/universities/northampton.png",
          "University of Northampton, UK Crest",
          612,
          407,
        ),
        dark: true,
        overview: [
          "The University of Northampton is a leading British public university located on its purpose-built £330 million Waterside Campus in England. Globally recognized as the UK's first Ashoka U Changemaker Campus and commended for teaching excellence under the British Teaching Excellence Framework (TEF), the university champions social innovation, enterprise, and high graduate outcomes.",
          "Since 2012, NAMI has operated in direct academic partnership with the University of Northampton to deliver accredited undergraduate and postgraduate degrees in Kathmandu. Programmes follow identical curricula, assessment frameworks, and moderation from external UK examiners, granting graduates authentic British degrees recognized internationally.",
        ],
        note: "",
        metrics: [
          { value: "12+ Years", label: "Academic Partnership" },
          { value: "100% UK Awarded", label: "Direct Equivalence" },
          { value: "TEF Rated", label: "Teaching Excellence" },
        ],
        programmes: [
          { title: "BSc. (Hons) Computing", award: "UoN, UK" },
          { title: "BSc. (Hons) Software Engineering", award: "UoN, UK" },
          { title: "BSc. (Hons) Network Engineering", award: "UoN, UK" },
          { title: "BSc. (Hons) Environmental Science", award: "UoN, UK" },
          { title: "BBA (Hons) Business Administration", award: "UoN, UK" },
        ],
        leaderRole: "Message from the Vice-Chancellor",
        leaderName: "Professor Anne-Marie Kilday",
        leaderTitle: "Vice-Chancellor",
        leaderAffiliation: "University of Northampton, United Kingdom",
        leaderPhoto: image(
          "/sections/nami/anne-marie-kilday-outside-portrait-683x1024.jpg",
          "Professor Anne-Marie Kilday",
          683,
          1024,
        ),
        leaderQuote:
          "Our partnership with NAMI reflects our shared conviction in widening access to world-class British higher education, equipping students in Nepal with the innovation and global competencies to lead transformative careers.",
        leaderMessage: [
          "At the University of Northampton, we believe higher education has the transformative power to develop future leaders, ignite innovation, and deliver real social impact. Our long-standing collaboration with Naaya Aayam Multi-Disciplinary Institute (NAMI) in Kathmandu is a testament to this global mission.",
          "Through this partnership, students in Nepal engage in rigorous, career-focused degree programmes in Computing, Software Engineering, Network Engineering, Environmental Science, and Business Administration. These programmes are delivered under our exacting academic standards, incorporating experiential learning and technological literacy.",
          "We take immense pride in the achievements of NAMI graduates who continue to excel across international technology companies, research organizations, and entrepreneurial ventures. We look forward to deepening our academic collaboration and welcoming future cohorts into our global community.",
        ],
      },
      {
        name: "Kathmandu University (KU)",
        badge: "National University Collaboration",
        status: "Collaborative Academic Partnership from 2026",
        location: "Main Campus · Dhulikhel, Kavrepalanchok, Nepal",
        logo: image(
          "/logos/universities/Kathmandu_University_Logo.webp",
          "Kathmandu University (KU) Crest",
          1280,
          1280,
        ),
        dark: false,
        overview: [
          "Established in 1991, Kathmandu University is an autonomous, premier non-government public institution dedicated to academic excellence, scientific research, and professional training in Nepal. Ranked consistently among Nepal's top national universities, KU is celebrated for research integrity, dedicated faculty, and high pedagogical standards.",
          "NAMI has entered into a strategic collaboration with Kathmandu University to offer the Bachelor in Environmental Studies (BES) programme. Combining classroom rigour with field-based ecological assessments, GIS spatial modeling, and sustainability policy analysis, the programme prepares graduates to tackle critical Himalayan and global environmental challenges.",
        ],
        note: "Official Dean message and comprehensive KU academic details will be updated as finalized by Kathmandu University.",
        metrics: [
          { value: "Autonomous", label: "Premier National University" },
          { value: "Himalayan Fieldwork", label: "Applied Ecology Practicums" },
          { value: "Session 2026", label: "Commencing Intake" },
        ],
        programmes: [
          {
            title: "BSc. in Environmental Studies (BES)",
            award: "KU Collaboration",
          },
          {
            title: "Himalayan Ecology & Field Practicums",
            award: "KU Academic Track",
          },
          {
            title: "Climate Policy & Sustainability Governance",
            award: "Joint Initiatives",
          },
        ],
        leaderRole: "Message from the Dean / Academic Leadership",
        leaderName: "Office of the Dean, School of Science",
        leaderTitle: "Dean & Academic Leadership Council",
        leaderAffiliation: "Kathmandu University, Dhulikhel, Nepal",
        leaderPhoto: cmsImage(null),
        leaderQuote:
          "Collaborating with NAMI allows us to expand multidisciplinary environmental education, nurturing the next generation of environmental researchers, policy advocates, and sustainability leaders in Nepal.",
        leaderMessage: [
          "Kathmandu University has always led the nation in scientific innovation, environmental stewardship, and academic quality. As global environmental and climate realities evolve, the need for skilled, research-oriented environmental professionals has never been more urgent.",
          "Through our collaborative academic initiatives with NAMI, we bring KU's rich curriculum and pedagogical framework to motivated students in Kathmandu. The Bachelor in Environmental Studies programme is designed to bridge scientific fundamentals with practical fieldwork and community-based sustainability projects.",
          "We welcome aspiring environmental scientists and future changemakers to embark on this collaborative educational journey with Kathmandu University and NAMI.",
        ],
      },
    ],
  },
  courses: {
    label: bachelorsCopy.programmes.eyebrow,
    title: bachelorsCopy.programmes.heading,
    description: bachelorsCopy.programmes.standfirst ?? "",
    awardedLabel: bachelorsCopy.programmes.awardedLabel,
    startingLabel: bachelorsCopy.programmes.startingLabel,
    pendingLabel: bachelorsCopy.programmes.pendingLabel,
    items: bachelorsCopy.programmes.items.map(courseOf),
  },
  awarding: {
    label: bachelorsCopy.awarding.heading,
    title: bachelorsCopy.awarding.eyebrow,
    description: bachelorsCopy.awarding.standfirst,
    sinceLabel: bachelorsCopy.awarding.sinceLabel,
  },
  pearson: {
    label: "OFFICIAL TESTING CENTRE",
    title: "Pearson VUE-Authorized Test Center",
    description:
      "NAMI is an officially authorized Pearson VUE test center, empowering students and professionals across Nepal to take internationally recognized IT certifications, academic assessments, and global professional licensure examinations in a secure, state-of-the-art testing facility.",
    logo: image(
      "/sections/misc/pearson-vue.jpg",
      "Pearson VUE-Authorized Test Center Logo",
      367,
      220,
    ),
  },
  placement: {
    label: bachelorsCopy.partners.heading,
    title: bachelorsCopy.partners.eyebrow,
    image: cmsImage(bachelorsCopy.partners.image),
  },
  alumni: {
    label: bachelorsCopy.alumni.heading,
    title: bachelorsCopy.alumni.eyebrow ?? "Student Voices",
    description: bachelorsCopy.alumni.standfirst ?? "",
    emptyState: bachelorsCopy.alumni.emptyState ?? "",
    items: testimonialItemsFrom(
      testimonials.filter((item) => item.institution === "institute"),
    ),
  },
  mou: {
    label: "Strategic Alliances",
    title: "MoU Signed Partners",
    description:
      "Naaya Aayam Multi-Disciplinary Institute establishes institutional MoUs with leading enterprises across technology, hospitality, architecture, and innovation sectors to foster real-world industrial exposure, student internships, and dynamic career pathways.",
    badge: "Verified MoU Partner",
    partners: MOU_PARTNERS.map((partner) => ({
      organization: partner.organization,
      domain: partner.domain,
      logo: image(
        partner.logo,
        `${partner.organization} logo`,
        partner.width,
        partner.height,
      ),
    })),
  },
  notices: {
    title: bachelorsCopy.notices.eyebrow,
    description: bachelorsCopy.notices.standfirst,
    buttonLabel: bachelorsCopy.notices.ctaLabel,
    emptyState: bachelorsCopy.notices.emptyState,
  },
};
