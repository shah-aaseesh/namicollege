// The About page exactly as it ships today. Used when WordPress is unavailable,
// as the type schema for CMS data, and exported into the WordPress snippet by
// `npm run cms:defaults` so the admin screens start pre-filled.

import { aboutCopy } from "@/lib/content/local/about-copy";
import { institution } from "@/lib/content/local/institution";
import { stakeholderTestimonials } from "@/lib/content/local/testimonials";
import { paragraphsOf, richText } from "@/lib/content/rich-text";
import { testimonialItemsFrom } from "../../testimonials";
import { cmsImage } from "../../types";
import type { AboutPageContent } from "./types";

const { sections } = aboutCopy;

// Partner logos are drawn inside a fixed box, so these sizes are nominal.
function logo(src: string, alt: string) {
  return { src, alt, width: 288, height: 96 };
}

function portrait(src: string, alt: string) {
  return { src, alt, width: 800, height: 1000 };
}

export const aboutDefaults: AboutPageContent = {
  seo: {
    title: aboutCopy.metaTitle,
    description: aboutCopy.metaDescription,
  },
  hero: {
    title: aboutCopy.title,
    standfirst: aboutCopy.standfirst,
    button: { label: "Meet the People Behind NAMI", href: "/faculty" },
    images: (aboutCopy.openingImages && aboutCopy.openingImages.length > 0
      ? aboutCopy.openingImages
      : aboutCopy.openingImage
        ? [aboutCopy.openingImage]
        : []
    ).map((item) => ({ image: cmsImage(item) })),
  },
  overview: {
    title: sections.chronology.eyebrow ?? "NAMI since 2012",
    paragraphs: paragraphsOf(institution.overview),
    image: cmsImage(aboutCopy.overviewImage),
  },
  leadership: {
    label: "Executive Leadership",
    title: "Messages from the Chairperson & Chief Executive Officer",
    messages: [
      {
        badge: "Message from the Chairperson",
        name: "Capt. Rameshwar Thapa",
        title: "Chairperson, NAMI Group of Companies",
        credentials: "Founder Chairman · Aviator & Strategic Entrepreneur",
        portrait: portrait(
          "/leadership/rameshwar-thapa.webp",
          "Capt. Rameshwar Thapa",
        ),
        quote:
          "Our founding conviction remains steadfast: to offer access to world-class education within Nepal and nurture leaders who transform communities locally and globally.",
        paragraphs: [
          "When we established Naaya Aayam Multi-Disciplinary Institute (NAMI) in 2012, our guiding principle was both ambitious and clear: to create an educational ecosystem that eliminates the necessity for talented Nepali youth to seek abroad what could be delivered with uncompromised excellence right here in Nepal.",
          "Over the past decade, NAMI has grown from a singular pioneering tertiary institute into a comprehensive educational group spanning NAMI International School, Cambridge GCE A-Levels, NEB +2, and multidisciplinary Bachelor's and Master's degree programmes in collaboration with world-renowned institutions like the University of Northampton, University of Hertfordshire, and Kathmandu University.",
          "Our institutions are built on strong governance, cutting-edge infrastructure, and holistic character formation symbolised by the five petals of our red lotus emblem — enlightenment, knowledge, purity of heart and mind, self-awareness, and wisdom. We do not simply impart academic curricula; we instill the discipline, empathy, and ethical leadership necessary for our graduates to excel in an interconnected global economy.",
          "As we look ahead, NAMI remains committed to sustainable innovation, state-of-the-art STEM and humanities research, and empowering generations of students to lead with conviction, purpose, and integrity.",
        ],
      },
      {
        badge: "Message from the Chief Executive Officer",
        name: "Mr. Pranil Pandey, FCCA",
        title: "Chief Executive Officer, NAMI Group of Companies",
        credentials: "FCCA (UK) · Master's in Management",
        portrait: portrait(
          "/leadership/pranil.jpeg",
          "Mr. Pranil Pandey, FCCA",
        ),
        quote:
          "At NAMI, we align world-class academic frameworks with experiential learning, cultivating future-ready professionals and compassionate global citizens.",
        paragraphs: [
          "Education in the 21st century demands more than conventional classroom instruction; it requires dynamic adaptability, analytical rigor, hands-on technological literacy, and deeply ingrained social responsibility. At NAMI, every academic programme is meticulously structured to meet these imperatives.",
          "Having been part of NAMI's journey since 2015, I take immense pride in our evolution into an institution recognized for academic excellence, innovative pedagogy, and strong industry-academia linkages. From our Primary and Middle School divisions to our Cambridge A-Levels, CTEVT skill-based vocational programmes, and international undergraduate degrees, we foster an environment where students actively discover their intellectual and creative potential.",
          "We continue to invest extensively in modern learning technologies, advanced science and computing laboratories, Pearson VUE testing facilities, and comprehensive career counseling. Our dedicated faculty members bring international best practices into every classroom, mentoring students to turn curiosity into meaningful scholarship.",
          "We warmly invite students and parents to experience the NAMI difference — where global opportunities and grounded values converge to build extraordinary futures.",
        ],
      },
    ],
  },
  history: {
    title: "NAMI History",
    intro:
      "Established in 2012, Naaya Aayam Multi-Disciplinary Institute (NAMI) was founded with a visionary commitment to deliver transformative, world-class education in Nepal. Over more than a decade of academic excellence and institutional growth, NAMI has evolved from pioneering UK-accredited international degree pathways to establishing premier Cambridge A-Levels, national school divisions (+2 NEB & Primary), vocational CTEVT courses, and strategic partnerships with Kathmandu University—shaping generations of leaders equipped to make a lasting global impact.",
    milestones: [
      {
        year: "2012",
        era: "The Foundation",
        title: "Establishment of NAMI & UK Degree Programmes",
        partner: "University of Northampton (UK)",
        logo: logo(
          "/logos/universities/northampton.png",
          "University of Northampton (UK)",
        ),
        description:
          "Established in Kathmandu in direct academic partnership with the University of Northampton, UK, offering accredited Bachelor's and Master's degrees.",
      },
      {
        year: "2013",
        era: "Campus Scaling",
        title: "NAMI College Incorporation & Expansion",
        partner: "NAMI College",
        logo: logo("/logos/brand/nami-college.png", "NAMI College"),
        description:
          "Formally incorporated with dedicated multi-storey academic wings, advanced science laboratories, and campus resource centers.",
      },
      {
        year: "2014",
        era: "Cambridge A-Levels",
        title: "Launch of Cambridge International GCE A-Levels",
        partner: "Cambridge Assessment International",
        logo: logo(
          "/logos/universities/cambridge.png",
          "Cambridge Assessment International",
        ),
        description:
          "Accredited to offer gold-standard Cambridge GCE A-Levels in Science and Non-Science streams with global university placement guidance.",
      },
      {
        year: "2019",
        era: "National Board",
        title: "Launch of NAMI International School & NEB +2",
        partner: "National Examinations Board (NEB)",
        logo: logo(
          "/logos/universities/neb.png",
          "National Examinations Board (NEB)",
        ),
        description:
          "Expanded into the national curriculum with NAMI International School, offering NEB-affiliated 10+2 Science and Management programmes.",
      },
      {
        year: "2024",
        era: "Comprehensive K-12",
        title: "Primary Wing Launch & CAIE Home Centre Status",
        partner: "NAMI International School",
        logo: logo(
          "/logos/brand/International School-ai.png",
          "NAMI International School",
        ),
        description:
          "Opened Primary School (Grades 1–7) and earned independent Cambridge International Home Examination Centre status in Nepal.",
      },
      {
        year: "2024",
        era: "Global Testing",
        title: "Pearson VUE-Authorized Test Center Collaboration",
        partner: "Pearson VUE",
        logo: logo("/sections/misc/pearson-vue.jpg", "Pearson VUE"),
        description:
          "Officially authorized as a Pearson VUE testing center, enabling on-campus computer-based international IT certifications, academic tests, and global licensure exams.",
      },
      {
        year: "2025–2026",
        era: "Future Frontiers",
        title: "Kathmandu University Partnership & CTEVT Programmes",
        partner: "Kathmandu University & CTEVT",
        logo: logo(
          "/logos/universities/Kathmandu_University_Logo.webp",
          "Kathmandu University & CTEVT",
        ),
        description:
          "MoU with Kathmandu University for BSc. Environmental Studies, University of Hertfordshire collaboration, and CTEVT vocational programmes.",
      },
    ],
  },
  emblem: {
    label: sections.emblem.heading,
    title: sections.emblem.eyebrow ?? "The Emblem",
    image: {
      src: "/sections/misc/lotus.png",
      alt: "NAMI Emblem - Red Lotus",
      width: 612,
      height: 408,
    },
    paragraphs: paragraphsOf(institution.emblemStory),
    valuesTitle: "The Five Petals & Core Values",
    values: institution.values.map((value) => ({
      name: value.name,
      meaning: value.meaning,
    })),
  },
  creed: {
    label: sections.creed.heading,
    title: sections.creed.eyebrow ?? "Mission & Vision",
    missionLabel: "Mission",
    mission: paragraphsOf(institution.mission),
    visionLabel: "Vision",
    vision: paragraphsOf(institution.vision),
  },
  mascot: {
    label: "The swan carries the same five values.",
    title: "The Mascot",
    paragraphs: paragraphsOf(
      richText(
        "NAMI's mascot is a graceful swan, representing the spirit and values of NAMI. With its snow-white feathers and elegant posture, the swan symbolizes purity, resilience, transformation, and excellence. Its warm and friendly expression reflects NAMI's welcoming community. Surrounded by a vibrant lotus flower inspired by the NAMI logo, the mascot embodies growth, knowledge, and nurturing. The lotus petals gently cradle the swan, symbolizing the supportive and interconnected nature of the NAMI family.",
        "With its wings slightly spread, the swan signifies NAMI students' readiness to soar toward new opportunities. The wings carry the same core values as the petals of the lotus above. The mascot was designed by a NAMI student, showcasing the creativity and spirit of the NAMI community.",
      ),
    ),
    image: {
      src: "/mascot/Mascot final.png",
      alt: "NAMI College Mascot - The Swan",
      width: 800,
      height: 800,
    },
  },
  awards: {
    label: sections.awards.heading,
    title: sections.awards.eyebrow ?? "Awards & Recognition",
    description: sections.awards.standfirst ?? "",
    emptyState: sections.awards.emptyState ?? "",
    items: aboutCopy.awards.map((award) => ({
      year: award.year,
      title: award.title,
      awardingBody: award.awardingBody,
      citation: award.citation ?? "",
    })),
  },
  testimonials: {
    label: sections.testimonials.heading,
    title: sections.testimonials.eyebrow ?? "Stakeholder Voice",
    emptyState: sections.testimonials.emptyState ?? "",
    items: testimonialItemsFrom(stakeholderTestimonials),
  },
};
