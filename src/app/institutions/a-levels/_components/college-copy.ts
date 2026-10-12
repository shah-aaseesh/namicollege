import type { InstitutionAwardingCopy } from "@/components/shared/institution-awarding";
import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type { ContentImage, ContentLink, SectionCopy } from "@/lib/content";
import { richText } from "@/lib/content";
import type { CollegeCambridgeCopy } from "./college-cambridge";
import type { CollegeEntryCopy } from "./college-entry";
import type { CollegeSubjectsCopy } from "./college-subjects";

export type CollegeMastheadCopy = {
  readonly heroLabel: string;
  readonly slides: readonly ContentImage[];
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
  readonly establishedLabel: string;
  readonly statusLabel: string;
  readonly statusValue: string;
  readonly campusLabel: string;
};

const principalPortrait: ContentImage = {
  src: "/leadership/philip-badikar-hilario.webp",
  alt: "Studio portrait of Mr. Philip Badikar Hilario, A Level Principal at NAMI College, arms folded in a charcoal suit and black tie against a mottled blue-grey backdrop.",
  width: 1538,
  height: 2000,
};

const heroSlides: readonly ContentImage[] = [
  {
    src: "/hero/a levles hero section/NAMI_College_Last_Day_Celebration.webp",
    alt: "NAMI College GCE A Level students celebrating farewell and last day together on campus.",
    width: 2400,
    height: 1030,
  },
  {
    src: "/hero/a levles hero section/Group_Portrait_at_Sandy_Beach_Resort.webp",
    alt: "NAMI College A Level students and faculty gathered for an excursion group portrait at Sandy Beach Resort, Sukute.",
    width: 2400,
    height: 1030,
  },
  {
    src: "/hero/a levles hero section/Mountain_Valley_Adventure_Group_Photo.webp",
    alt: "NAMI College students enjoying an academic adventure trip in a scenic mountain valley.",
    width: 2400,
    height: 1030,
  },
  {
    src: "/hero/a levles hero section/Visionary_Basketball_Team_Runner-Up_Ceremony.webp",
    alt: "NAMI College basketball team receiving runner-up trophies and certificates at the 2nd NAMI SEE 3x3 Tournament.",
    width: 2400,
    height: 1030,
  },
];

const masthead: CollegeMastheadCopy = {
  heroLabel: "NAMI College",
  slides: heroSlides,
  heading: "NAMI College",
  standfirst:
    "An independent Cambridge Assessment International Education examination centre, and an accredited Cambridge International Home Centre in Nepal since June 2024.",
  cta: {
    label: "Apply to NAMI College",
    href: "https://college.nami.edu.np/",
    destination: "external",
  },
  establishedLabel: "Established",
  statusLabel: "Status",
  statusValue: "Independent CAIE examination centre",
  campusLabel: "Location",
};

const cambridge: CollegeCambridgeCopy = {
  eyebrow: "The Qualification",
  heading: "An international benchmark, taught in small classes.",
  standfirst:
    "The A Level is administered by Cambridge Assessment International Education, University of Cambridge, United Kingdom.",
  propositions: [
    {
      title: "Science and non-science streams",
      body: "Students take both science and non-science combinations, so management and humanities sit alongside the sciences.",
    },
    {
      title: "Project-based learning",
      body: "Learning runs through projects across subjects. Students explore, experiment, challenge ideas and take leadership roles, with the emphasis on creativity and critical thinking.",
    },
    {
      title: "Seasoned faculty, small classes",
      body: "NAMI teaches the programme with seasoned faculty, small class sizes and a friendly, caring approach. The college is fully co-educational.",
    },
    {
      title: "Recognised preparation",
      body: "Cambridge qualifications are an international benchmark, and a recognised preparation for university study and for employment.",
    },
  ],
};

const subjects: CollegeSubjectsCopy = {
  eyebrow: "Subjects",
  heading: "Two streams, and the subjects in each.",
  standfirst:
    "A wide range of subject combinations preparing students for university study in science, medicine, engineering, and business.",
  compulsoryLabel: "Compulsory",
  streams: [
    {
      key: "science",
      label: "Science",
      minimumNote:
        "English General Paper (AS) is compulsory, along with any 3 or more additional subjects of your choice to complete your A Levels.",
      listLabel:
        "A Level science subjects offered at NAMI College across Medicine & Biological Sciences and Engineering, Computer Science & Architecture.",
      groups: [
        {
          key: "s1",
          short: "Medicine",
          label: "Medicine & Biological Sciences",
        },
        {
          key: "s2",
          short: "Engineering",
          label: "Engineering, Computer Science & Architecture",
        },
      ],
      subjects: [
        {
          name: "English General Paper (AS)",
          compulsory: true,
          groups: ["s1", "s2"],
        },
        { name: "Physics", compulsory: false, groups: ["s1", "s2"] },
        { name: "Chemistry", compulsory: false, groups: ["s1", "s2"] },
        { name: "Biology", compulsory: false, groups: ["s1"] },
        { name: "Mathematics", compulsory: false, groups: ["s1", "s2"] },
        {
          name: "Further Mathematics",
          compulsory: false,
          groups: ["s1", "s2"],
        },
        { name: "Psychology", compulsory: false, groups: ["s1"] },
        { name: "Computer Science", compulsory: false, groups: ["s2"] },
      ],
    },
    {
      key: "non-science",
      label: "Non-Science",
      minimumNote:
        "English General Paper (AS) is compulsory, along with any 3 or more additional subjects of your choice to complete your A Levels.",
      listLabel:
        "A Level non-science subjects offered at NAMI College across Business, Economics & Finance and Humanities & Social Sciences.",
      groups: [
        {
          key: "ns1",
          short: "Business",
          label: "Business, Economics & Finance",
        },
        {
          key: "ns2",
          short: "Humanities",
          label: "Humanities & Social Sciences",
        },
      ],
      subjects: [
        {
          name: "English General Paper (AS)",
          compulsory: true,
          groups: ["ns1", "ns2"],
        },
        { name: "Business", compulsory: false, groups: ["ns1", "ns2"] },
        { name: "Economics", compulsory: false, groups: ["ns1"] },
        { name: "Accounting", compulsory: false, groups: ["ns1"] },
        { name: "Computer Science", compulsory: false, groups: ["ns1"] },
        { name: "Mathematics", compulsory: false, groups: ["ns1"] },
        { name: "Sociology", compulsory: false, groups: ["ns2"] },
        { name: "Psychology", compulsory: false, groups: ["ns2"] },
        { name: "Art and Design", compulsory: false, groups: ["ns2"] },
      ],
    },
  ],
  offeredLabel: (group) => `Offered in ${group}`,
  notOfferedLabel: (group) => `Not offered in ${group}`,
};

const awarding: InstitutionAwardingCopy = {
  eyebrow: "Awarding Body",
  heading: "The examination board behind the certificate.",
  standfirst:
    "A Level certificates are issued by Cambridge, not by NAMI. What the college holds is the affiliation to teach the programme and the accreditation to examine it at the college.",
  sinceLabel: "Affiliated since",
};

const gallery: InstitutionGalleryCopy = {
  eyebrow: "The College",
  heading: "Two years, photographed.",
  standfirst:
    "Trips, tournaments, service camps and the ordinary weeks between them — the college's own record of what an A Level here looks like.",
  ctaLabel: "All College Photographs",
};

const alumni: SectionCopy = {
  navLabel: "Alumni",
  eyebrow: "Alumni",
  heading: "What the programme is worth, from the people who finished it.",
  standfirst:
    "A Level alumni on the teaching, the workload and what the qualification carried them into.",
  cta: null,
  emptyState:
    "A Level alumni stories will appear here as graduates share them.",
};

const notices: InstitutionNoticesCopy = {
  eyebrow: "Notice Board",
  heading: "What the college is announcing.",
  standfirst:
    "Registration windows, examination dates and standing notices for A Level students and their families.",
  ctaLabel: "All College Notices",
  emptyState:
    "There is no college notice standing right now. Everything the college has published stays on the notice board.",
};

const entry: CollegeEntryCopy = {
  eyebrow: "Entry and Support",
  heading: "Who it is for, and how it is supported.",
  cta: {
    label: "Start an Application",
    href: "https://college.nami.edu.np/",
    destination: "external",
  },
  blocks: [
    {
      title: "Eligibility",
      body: "Students who have completed SEE, GCSE, CBSE or an equivalent qualification at the time of admission. What the programme asks for is the academic ability to meet its demands.",
    },
    {
      title: "Scholarships",
      body: "Scholarships are offered to highly meritorious students who are financially weak, and further scholarships are available to other deserving candidates.",
    },
  ],
};

export const collegeCopy = {
  meta: {
    title: "NAMI College",
    description:
      "NAMI College teaches the Cambridge International A Level at Gokarneshwor-7, Kathmandu — an independent CAIE examination centre and, since June 2024, an accredited Cambridge International Home Centre in Nepal.",
  },
  campusSlug: "gokarneshwor",
  levelSlug: "college",
  masthead,
  principal: {
    slug: "leader-philip-hilario",
    eyebrow: "From the Principal",
    portrait: principalPortrait,
    message: richText(
      "Dear Parents and Well-Wishers,",
      "We are delighted and proud to share an important milestone in the journey of our institution. Since June 2024, NAMI College has been officially accredited as a Cambridge International Home Centre in Nepal. This recognition from Cambridge International reflects our continued commitment to quality education, strong academic standards, and creating an environment where students can learn, grow, and achieve their full potential.",
      "This achievement is also being reflected in the performance of our students. We are especially proud that our students have begun to achieve Nepal Topper positions in various subjects under the Cambridge GCE A Level examinations. These results are a reflection of the students' hard work and dedication, as well as the continuous guidance and support of our teachers and the encouragement of their parents.",
      "At NAMI College, our aim goes beyond academic results. We focus on developing students’ critical thinking, confidence, creativity, analytical skills, and independent learning abilities, while preparing them for higher education and future opportunities in a changing global environment.",
      "We sincerely thank our parents, students, teachers, staff, and well-wishers for their continued trust, support, and contribution to our journey. These achievements are the result of a shared commitment and collective effort.",
      "As we move forward, we remain committed to providing our students with meaningful learning experiences and opportunities to achieve even greater success.",
      "Together, let us continue to inspire, support, and empower our students to reach their full potential.",
    ),
  },
  cambridge,
  subjects,
  awarding,
  gallery,
  alumni,
  entry,
  notices,
} as const;
