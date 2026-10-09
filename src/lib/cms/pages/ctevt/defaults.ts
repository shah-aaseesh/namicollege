// The CTEVT page exactly as it ships today. Used when WordPress is unavailable,
// as the type schema for CMS data, and exported into the WordPress snippet by
// `npm run cms:defaults`.

import type { CtevtPageContent } from "./types";

export const ctevtDefaults: CtevtPageContent = {
  seo: {
    title: "CTEVT Affiliation & Vocational Programmes | NAMI",
    description:
      "NAMI is a CTEVT-affiliated institution authorized to conduct approved short-term vocational training programs in the hospitality sector in Kathmandu, Nepal.",
  },
  hero: {
    label: "Vocational & Technical Education",
    title: "CTEVT Affiliation",
    subtitle: "Council for Technical Education and Vocational Training",
    intro:
      "**Naaya Aayam Multi-Disciplinary Institute Pvt. Ltd. (NAMI)** is a CTEVT-affiliated institution authorized to conduct approved short-term vocational training programs in the hospitality sector.",
    logo: {
      src: "/logos/brand/ctevt-logo-removebg-preview.png",
      alt: "CTEVT Logo",
      width: 474,
      height: 349,
    },
    logoCaption: "Government of Nepal",
    logoSubcaption: "Apex Body for Technical Training",
  },
  overview: {
    text: "The affiliation reflects NAMI's commitment to providing structured, practical and industry-oriented vocational education in accordance with the curriculum and requirements prescribed by the **Council for Technical Education and Vocational Training (CTEVT), Nepal**.",
  },
  programmes: {
    label: "Approved Courses",
    title: "CTEVT-Approved Training Programs",
    description:
      "NAMI is authorized to conduct 5 specialized short-term vocational training programs tailored for the growing hospitality and service industries.",
    programmeHeading: "Training Program",
    sectorHeading: "Sector & Specialization",
    durationHeading: "Duration",
    items: [
      {
        title: "General Cook Commis II",
        sector: "Culinary & Kitchen Operations",
        duration: "484 Hours",
      },
      {
        title: "Hotel Assistant",
        sector: "Hospitality Management",
        duration: "390 Hours",
      },
      {
        title: "Barista",
        sector: "Beverage & Coffee Art",
        duration: "390 Hours",
      },
      {
        title: "Bartender",
        sector: "Beverage Service & Mixology",
        duration: "390 Hours",
      },
      {
        title: "Room Attendant",
        sector: "Housekeeping Operations",
        duration: "390 Hours",
      },
    ],
  },
  about: {
    label: "National Apex Body",
    title: "About CTEVT",
    paragraphs: [
      "The **Council for Technical Education and Vocational Training (CTEVT)** is Nepal's national apex body for technical and vocational education and training. CTEVT is responsible for areas including curriculum development, quality control, skills standards, skills testing and the development of skilled human resources.",
      "Through its affiliation, NAMI conducts approved short-term training programs following the applicable CTEVT curriculum, standards and institutional requirements.",
    ],
    footerLeft: "Accreditation: National Standards",
    footerRight: "CTEVT Nepal",
  },
  approval: {
    label: "Verification & Review",
    title: "NAMI's CTEVT Approval",
    items: [
      {
        label: "Institution",
        value: "Naaya Aayam Multi-Disciplinary Institute Pvt. Ltd.",
      },
      { label: "Address", value: "Jorpati-07, Kathmandu, Nepal" },
      { label: "Type of Approval", value: "Short-Term Training Programs" },
      {
        label: "Approval Period",
        value: "Two years, as specified in the CTEVT approval letter",
      },
      {
        label: "Approving Authority",
        value:
          "Council for Technical Education and Vocational Training (CTEVT), Nepal",
      },
    ],
    note: "The approval was granted following the required institutional review and inspection process.",
    footerLeft: "Official Approval Record",
    badge: "Approved & Active",
  },
  standards: {
    label: "Quality Framework",
    title: "Training Standards",
    description:
      "NAMI's approved programs are conducted in strict accordance with the requirements specified by CTEVT:",
    items: [
      "Delivery of training according to the approved CTEVT curriculum",
      "Maintenance of required physical and educational facilities",
      "Practical and competency-oriented training",
      "Compliance with prescribed trainee admission procedures",
      "Training conducted at the approved institutional location",
      "Compliance with applicable assessment and skill-testing requirements",
      "Certification of eligible trainees in accordance with applicable CTEVT provisions",
      "Submission of required institutional and progress reports to CTEVT",
    ],
  },
  skills: {
    label: "Career Readiness",
    title: "Skills for the Hospitality Industry",
    paragraphs: [
      "NAMI's CTEVT-approved programs focus on developing practical skills relevant to hospitality and service-sector employment. The programs provide learners with structured training in areas including **culinary operations, hotel services, coffee preparation, beverage service and housekeeping**.",
      "Through practical learning and occupation-specific training, NAMI aims to equip learners with skills that can be applied in professional hospitality environments.",
    ],
    tags: [
      "Culinary Operations",
      "Hotel Services",
      "Coffee Preparation",
      "Beverage Service",
      "Housekeeping",
    ],
  },
  recognition: {
    label: "Institutional Certification",
    title: "Official Recognition",
    subtitle:
      "CTEVT Affiliated Institution — Approved Short-Term Training Programs",
    description:
      "NAMI's CTEVT affiliation and approved programs are documented through the official approval issued by the Council for Technical Education and Vocational Training.",
    facts: [
      { label: "Approved Programs", value: "5" },
      { label: "Training Duration", value: "390–484 Hours" },
      { label: "Approval", value: "CTEVT Short-Term Training Programs" },
    ],
    letterButton: {
      label: "View CTEVT Approval Letter",
      href: "/hero/ctevt/ctevt-hero.jpeg",
    },
    contactButton: { label: "Inquire About Admissions", href: "/contact" },
  },
  commitment: {
    label: "Our Commitment",
    title: "Learn. Practice. Build Skills.",
    description:
      "NAMI is committed to maintaining the standards and requirements associated with its CTEVT-approved programs and to providing learners with quality vocational education, practical training and industry-relevant skills.",
    button: { label: "Apply for Vocational Training", href: "/admissions" },
  },
};
