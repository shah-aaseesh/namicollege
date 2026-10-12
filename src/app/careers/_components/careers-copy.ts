import type { CareerPlacementCopy } from "@/components/shared/career-placement";
import type {
  ContentImage,
  EmploymentType,
  SectionCopy,
  Testimonial,
} from "@/lib/content";
import { entryOf } from "@/lib/content/identifiers";
import { pragatiRaiPortrait } from "@/lib/content/local/images";

export type BenefitItem = {
  readonly title: string;
  readonly desc: string;
};

export type FirstJobStory = {
  readonly id: string;
  readonly name: string;
  readonly company: string;
  readonly role: string;
  readonly degree: string;
  readonly graduatedYear: number;
  readonly supportType: string;
  readonly quote: string;
  readonly portrait?: ContentImage | null;
};

const vacanciesSection: SectionCopy = {
  navLabel: "Vacancies",
  eyebrow: "Open Positions",
  heading: "Career opportunities across our three academic institutions.",
  standfirst:
    "We invite dedicated educators, researchers, and academic professionals to join our faculty and operational teams in Kathmandu.",
  cta: null,
  emptyState:
    "There are no vacancies matching your selected filters at the moment. Explore other departments or write directly to careers@nami.edu.np.",
};

const partnersPanel: ContentImage = {
  src: "/sections/nami/event-climate-panel.jpg",
  alt: "Faculty and guest scholars during an academic panel symposium in the NAMI conference auditorium.",
  width: 800,
  height: 533,
};

const placement: CareerPlacementCopy = {
  eyebrow: "Industry & Academic Network",
  heading: "Organisations and research bodies that collaborate with NAMI.",
  image: partnersPanel,
  label: "NAMI industry and technology partner logos",
};

const staffTestimonialsSection: SectionCopy = {
  navLabel: "Staff Voices",
  eyebrow: "Faculty & Staff Voices",
  heading: "What our educators and team say about working at NAMI.",
  standfirst:
    "Hear from lecturers, coordinators, and academic leaders about the collaborative culture, research support, and teaching freedom across our three institutions.",
  cta: null,
  emptyState: null,
};

export const staffTestimonials: readonly Testimonial[] = [
  {
    ...entryOf("staff-ramesh-adhikari"),
    name: "Dr. Ramesh Adhikari",
    programme: "Senior Faculty & Research Lead, Computing",
    institution: "institute",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
    quote:
      "Teaching at NAMI gives you the institutional backing and academic freedom to actually innovate in the classroom. The collaborative faculty community and research support make it one of the most fulfilling places to teach in Kathmandu.",
  },
  {
    ...entryOf("staff-bikash-maharjan"),
    name: "Bikash Maharjan",
    programme: "Department Coordinator, NAMI International School",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
    quote:
      "What stands out about working at NAMI is the genuine respect for educators' time and ideas. The continuous professional development and supportive management create an environment where teachers can truly thrive.",
  },
  {
    ...entryOf("staff-sunita-gautam"),
    name: "Sunita Gautam",
    programme: "Senior Lecturer, Department of Business & Management",
    institution: "institute",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
    quote:
      "The cross-disciplinary culture here encourages faculty to mentor students beyond just textbooks. The modern facilities, structured academic calendar, and supportive colleagues make NAMI an exemplary workplace.",
  },
  {
    ...entryOf("staff-philip-hilario"),
    name: "Philip Badikar Hilario",
    programme: "A Level Principal, NAMI College",
    institution: "college",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
    quote:
      "At NAMI, educator development is treated with the same seriousness as student achievement. We collaborate directly with Cambridge International and University of Northampton mentors to keep our academic standard world-class.",
  },
];

export const firstJobStories: readonly FirstJobStory[] = [
  {
    id: "smriti-shrestha",
    name: "Smriti Shrestha",
    company: "Leapfrog Technology",
    role: "Associate Software Engineer",
    degree: "BSc (Hons) Computing",
    graduatedYear: 2024,
    supportType: "Placement Cell & Mock Code Reviews",
    quote:
      "NAMI's placement cell connected me with industry mentors and mock technical interviews during my final semester. That direct guidance and practical project reviews helped me land my first software engineering job before convocation.",
    portrait: pragatiRaiPortrait,
  },
  {
    id: "prashant-kc",
    name: "Prashant KC",
    company: "Nabil Bank",
    role: "Management Trainee",
    degree: "BBA (Hons)",
    graduatedYear: 2023,
    supportType: "Campus Recruitment & Case Competitions",
    quote:
      "The corporate case competitions and presentation workshops at NAMI simulated real boardroom dynamics. When Nabil Bank conducted campus interviews, I felt thoroughly prepared to articulate my ideas and land the role.",
    portrait: pragatiRaiPortrait,
  },
  {
    id: "aayushma-basnet",
    name: "Aayushma Basnet",
    company: "WWF Nepal",
    role: "Junior Environmental Analyst",
    degree: "BSc (Hons) Environmental Science",
    graduatedYear: 2024,
    supportType: "Fieldwork Network & Research Mentorship",
    quote:
      "Field research modules and industry internships arranged by NAMI gave me verifiable practical experience on my resume. My professor guided my application and helped me secure my dream first job in wildlife conservation.",
    portrait: pragatiRaiPortrait,
  },
  {
    id: "ronak-bastola",
    name: "Ronak Bastola",
    company: "Cotiviti Nepal",
    role: "Software Quality Engineer",
    degree: "BSc (Hons) Computing (Software Eng.)",
    graduatedYear: 2024,
    supportType: "Industry Capstone & Career Placement",
    quote:
      "The University of Northampton curriculum combined with NAMI's coding labs gave me real-world software architecture experience. My mentor's industry referrals helped me land my first software engineering position straight out of college.",
    portrait: pragatiRaiPortrait,
  },
  {
    id: "nitesh-shrestha",
    name: "Nitesh Shrestha",
    company: "F1Soft International",
    role: "Associate DevOps & Cloud Engineer",
    degree: "BSc (Hons) Network Engineering",
    graduatedYear: 2023,
    supportType: "Lab Infrastructure & Industry Certifications",
    quote:
      "Hands-on server labs and networking modules at NAMI gave me practical troubleshooting skills before I even graduated. The career centre helped connect my capstone project directly to hiring managers at F1Soft.",
    portrait: pragatiRaiPortrait,
  },
  {
    id: "kritika-thapa",
    name: "Kritika Thapa",
    company: "Standard Chartered Bank Nepal",
    role: "Retail Banking Associate",
    degree: "BBA (Hons)",
    graduatedYear: 2024,
    supportType: "Corporate Internship & Alumni Network",
    quote:
      "NAMI's alumni network and career counselling office helped me secure my 6-month corporate internship, which converted into a permanent full-time offer upon graduation.",
    portrait: pragatiRaiPortrait,
  },
];

export const careersCopy = {
  meta: {
    title: "Careers & Faculty Openings",
    description:
      "Explore academic, research, and administrative career opportunities across NAMI International School, NAMI College, and Naaya Aayam Multi-Disciplinary Institute in Kathmandu.",
  },
  masthead: {
    eyebrow: "CAREERS",
    heading: "Careers at NAMI.",
    standfirst:
      "Join a community of educators, researchers and professionals committed to excellent teaching, impactful research and high-quality education in Kathmandu.",
    cta: "Explore open positions",
    image: {
      src: "/sections/nami/event-climate-panel.jpg",
      alt: "NAMI faculty and scholars during an academic symposium in the NAMI conference auditorium.",
      width: 800,
      height: 533,
    } as ContentImage,
  },
  benefits: {
    eyebrow: "Perks & Benefits",
    heading: "Comprehensive support for our faculty and staff.",
    standfirst:
      "We believe that high-quality education starts with taking care of our educators. We offer competitive remuneration and holistic staff support.",
    items: [
      {
        title: "Competitive Compensation",
        desc: "Above-market salary scales, structured annual increments, performance incentives, and statutory provident fund and gratuity benefits.",
      },
      {
        title: "Professional Development",
        desc: "Periodic teacher training workshops led directly by Cambridge International and University of Northampton faculty leads.",
      },
      {
        title: "Health & Accident Insurance",
        desc: "Comprehensive group health insurance and accident protection plans for all permanent faculty and operational staff.",
      },
      {
        title: "Tuition Concession for Children",
        desc: "Generous tuition fee waivers and scholarship support for dependent children attending NAMI International School or College.",
      },
      {
        title: "Transit & Cafeteria",
        desc: "Comfortable institutional transport routes covering Kathmandu, Lalitpur, and Bhaktapur, plus hygienic subsidized dining.",
      },
      {
        title: "Paid Sabbatical & Leave",
        desc: "Dedicated paid research leave, exam moderation leave, maternity/paternity support, and annual paid seasonal breaks.",
      },
    ] as readonly BenefitItem[],
  },
  vacancies: vacanciesSection,
  placement,
  staffTestimonials: staffTestimonialsSection,
  firstJob: {
    eyebrow: "First Job Stories",
    heading: "How NAMI helped me land my first job.",
    standfirst:
      "From campus recruitment drives and mock technical interviews to capstone mentorship and industry internships, our graduates share how NAMI prepared them for their breakthrough career roles.",
  },
  postedLabel: "Posted",
  closesLabel: "Deadline",
  locationLabel: "Location",
  departmentLabel: "Wing / Department",
} as const;

export const employmentTypeLabel: Readonly<Record<EmploymentType, string>> = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  contract: "Contract",
  internship: "Internship",
};
