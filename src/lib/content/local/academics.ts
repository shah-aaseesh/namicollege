import { entryOf, slug } from "../identifiers";
import { richText } from "../rich-text";
import { schoolGrades } from "../school-grades";
import type { AcademicLevel, Programme, VocationalApproval } from "../types";
import { AWARDING_BODIES } from "./awarding-bodies";
import { readingRoom, schoolTransport, studentsOnCampus } from "./images";

export const academicLevels: readonly AcademicLevel[] = [
  {
    ...entryOf("school"),
    entity: "school",
    stage: `From Grades ${schoolGrades.first} through ${schoolGrades.last} and +2 in Science and Management`,
    summary: richText(
      `NAMI International School offers progressive education for ${schoolGrades.labelPlural} within the framework of the Government of Nepal's National Curriculum, with Mandarin Chinese and Sanskrit language learning, hands-on exploration, creative arts, and continuous assessment.`,
      "The secondary division offers National Examination Board (NEB) affiliated +2 programmes in Science and Management, integrating rigorous academics with in-house laboratory experiments, internships, career counselling, educational tours, and national and international exposure.",
    ),
    highlights: [
      "National Curriculum, Government of Nepal (Grades I–VII)",
      "NEB +2 in Science and Management",
      "Mandarin Chinese and Sanskrit Language Learning",
      "Collaborations with 3Di School, Play Nepal, UnMath, Mero Coding & Samatva Wellness",
      "Internships, career guidance, and international exposure trips",
    ],
    campusSlug: slug("gokarneshwor"),
    image: schoolTransport,
  },
  {
    ...entryOf("college"),
    entity: "college",
    stage: "Cambridge A-Level, entry from SEE, GCSE, CBSE or equivalent",
    summary: richText(
      "NAMI offers the globally recognised Cambridge A-Level programme. The International A Level, regarded as the gold standard by Cambridge Assessment International Education, holds the same value as its UK equivalent for university admissions.",
      "Since 2024 the college has been recognised as an independent CAIE examination centre, and offers subject combinations that prepare students for university study in Science, Medicine, Engineering, Business, Humanities and Liberal Arts.",
    ),
    highlights: [
      "Independent CAIE examination centre since 2024",
      "Science and non-science subject combinations",
      "Entry from SEE, GCSE, CBSE or equivalent",
      "Routes into Science, Medicine, Engineering, Business, Humanities and Liberal Arts",
    ],
    campusSlug: slug("gokarneshwor"),
    image: studentsOnCampus,
  },
  {
    ...entryOf("bachelors"),
    entity: "institute",
    stage: "Bachelor's and Master's degrees",
    summary: richText(
      "NAMI has been in academic collaboration with The University of Northampton, UK since 2012, teaching British degrees in Kathmandu across computing, engineering, environmental science and business administration.",
      "A Bachelor's programme in Environmental Studies affiliated with Kathmandu University begins in August 2026, combining environmental science, sustainability, policy development and practical field-based learning.",
    ),
    highlights: [
      "British degrees taught in Kathmandu since 2012",
      "MSc Computer Science",
      "BSc Environmental Studies with Kathmandu University from August 2026",
      "AWS Academy curriculum and certifications",
    ],
    campusSlug: slug("new-baneshwor"),
    image: readingRoom,
  },
];

export const programmes: readonly Programme[] = [
  {
    ...entryOf("bsc-computer-science"),
    title: "Computer Science",
    shortTitle: "Computer Science",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-software-engineering"),
    title: "Software Engineering",
    shortTitle: "Software Engineering",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-networking-engineering"),
    title: "Networking Engineering",
    shortTitle: "Networking Engineering",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-environmental-science"),
    title: "Environmental Science",
    shortTitle: "Environmental Science",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-business-administration"),
    title: "Business Administration",
    shortTitle: "Business Administration",
    qualification: "BSc (Hons)",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("msc-computer-science"),
    title: "Computer Science",
    shortTitle: "Computer Science",
    qualification: "MSc",
    awardingBody: AWARDING_BODIES.northampton,
    levelSlug: slug("bachelors"),
    startingFrom: null,
  },
  {
    ...entryOf("bsc-environmental-studies"),
    title: "Environmental Studies",
    shortTitle: "Environmental Studies",
    qualification: "BSc",
    awardingBody: AWARDING_BODIES.kathmanduUniversity,
    levelSlug: slug("bachelors"),
    startingFrom: "August 2026",
  },
  {
    ...entryOf("a-level-programme"),
    title: "Science and non-science subject combinations",
    shortTitle: "Science & Non-Science",
    qualification: "Cambridge International A-Level",
    awardingBody: AWARDING_BODIES.cambridge,
    levelSlug: slug("college"),
    startingFrom: null,
  },
  {
    ...entryOf("neb-science"),
    title: "Science",
    shortTitle: "Science",
    qualification: "NEB 10+2",
    awardingBody: AWARDING_BODIES.neb,
    levelSlug: slug("school"),
    startingFrom: null,
  },
  {
    ...entryOf("neb-management"),
    title: "Management",
    shortTitle: "Management",
    qualification: "NEB 10+2",
    awardingBody: AWARDING_BODIES.neb,
    levelSlug: slug("school"),
    startingFrom: null,
  },
];

export const vocationalApproval: VocationalApproval = {
  council: "Council for Technical Education and Vocational Training ( CTEVT )",
  scope: "Short-term vocational training programmes approved for NAMI",
  approvedYear: 2026,
};
