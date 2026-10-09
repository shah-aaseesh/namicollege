import type { CareerPlacementCopy } from "@/components/shared/career-placement";
import type { InstitutionAwardingCopy } from "@/components/shared/institution-awarding";
import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type { ContentImage, ContentLink, SectionCopy } from "@/lib/content";
import { richText } from "@/lib/content";

export type ModuleStatus = "Compulsory" | "Optional" | "Designated";

export type ProgrammeModule = {
  readonly code: string;
  readonly title: string;
  readonly credits: number;
  readonly status: ModuleStatus | null;
  readonly prerequisites: string | null;
  readonly description?: string;
};

export type ProgrammeStage = {
  readonly key: string;
  readonly label: string;
  readonly note: string | null;
  readonly modules: readonly ProgrammeModule[];
};

export type ProgrammeRequirement = {
  readonly label: string;
  readonly requirement: string;
};

export type KeyFact = {
  readonly label: string;
  readonly value: string;
};

export type BachelorsProgramme = {
  /** The course page's web address: /institutions/bachelors/{key}. */
  readonly key: string;
  readonly qualification: string;
  readonly title: string;
  readonly fullTitle: string;
  readonly metaDescription: string;
  readonly image: ContentImage;
  readonly awardingBody: string;
  readonly startingFrom: string | null;
  readonly format: string | null;
  readonly keyFacts?: readonly KeyFact[];
  readonly whatYoullStudy?: string;
  readonly summary: readonly string[];
  readonly shortDescription?: string;
  readonly entryLabel: string;
  readonly entry: readonly ProgrammeRequirement[];
  readonly entryNotes: readonly string[];
  readonly careersLabel: string;
  readonly careerSummary: string | null;
  readonly careerSectors: readonly string[];
  readonly pendingNote: string | null;
  readonly stagesNote: string | null;
  readonly stages: readonly ProgrammeStage[];
};

export type BachelorsProgrammesCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst?: string | null;
  readonly awardedLabel: string;
  readonly startingLabel: string;
  readonly pendingLabel: string;
  readonly items: readonly BachelorsProgramme[];
};

export type BachelorsMastheadCopy = {
  readonly heroLabel: string;
  readonly slides: readonly ContentImage[];
  readonly motto: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly cta: ContentLink;
};

const academicHeadPortrait: ContentImage = {
  src: "/leadership/nischal-khadka.webp",
  alt: "Studio portrait of Mr. Nischal Khadka, Academic Head at NAMI, arms folded in a dark navy suit and patterned blue tie against a mottled blue-grey backdrop.",
  width: 1507,
  height: 2000,
};

const _readingRoom: ContentImage = {
  src: "/sections/nami/level-bachelor-master.jpg",
  alt: "NAMI's library, metal shelving stacked with books and a newspaper rack standing behind the library help desk.",
  width: 1200,
  height: 900,
};

const degreeComputerScience: ContentImage = {
  src: "/sections/general/degree (1).jpg",
  alt: "NAMI BSc. (Hons) Computer Science lecture and interactive computing workshop.",
  width: 1500,
  height: 1000,
};

const degreeClimateAI: ContentImage = {
  src: "/sections/general/degree (2).jpg",
  alt: "NAMI ClimateAI Launchpad - Environmental Science and AI innovation initiative.",
  width: 1500,
  height: 1000,
};

const degreeBusinessAdmin: ContentImage = {
  src: "/sections/general/degree (3).jpg",
  alt: "NAMI Bachelor of Business Administration (BBA) auditorium seminar and conference.",
  width: 1500,
  height: 1000,
};

const degreeClimateAITeam: ContentImage = {
  src: "/gallery/Bachelors/Events/ClimateAI.jpeg",
  alt: "NAMI Environmental Studies and ClimateAI innovation cohort.",
  width: 1280,
  height: 853,
};

const _scienceLaboratory: ContentImage = {
  src: "/sections/nami/campus-science-lab.jpg",
  alt: "A NAMI chemistry laboratory, reagent bottles ranked on shelves above long benches fitted with sinks, burettes and retort stands.",
  width: 1280,
  height: 853,
};

const _readingHall: ContentImage = {
  src: "/sections/nami/campus-library.jpg",
  alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
  width: 1280,
  height: 853,
};

const _plantationProgramme: ContentImage = {
  src: "/sections/nami/event-plantation-2022.jpg",
  alt: "Staff and volunteers crouched on the grass settling a sapling into the ground, one of them wearing a Nepal Prakriti Pathshala shirt from Wildlife Conservation Nepal.",
  width: 800,
  height: 753,
};

const _auditoriumGathering: ContentImage = {
  src: "/sections/nami/campus-auditorium.jpg",
  alt: "Students and staff seated on sofas and stacking chairs in the NAMI auditorium, maroon acoustic panelling on the wall behind them.",
  width: 999,
  height: 666,
};

const heroSlides: readonly ContentImage[] = [
  {
    src: "/hero/careers/careers-hero.jpg",
    alt: "NAMI Higher Education student sports tournament and campus life.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/hero/about/about-hero.jpg",
    alt: "NAMI Higher Education faculty, students, and graduation ceremony.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/hero/a-levels/a-levels-hero.jpg",
    alt: "NAMI Higher Education campus facilities and learning environment.",
    width: 1280,
    height: 853,
  },
  {
    src: "/hero/bachelors/bachelors-hero.jpg",
    alt: "NAMI Higher Education academic campus and community.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/hero/school/school-hero.jpg",
    alt: "NAMI Higher Education practical laboratories and campus life.",
    width: 1500,
    height: 1000,
  },
];

const masthead: BachelorsMastheadCopy = {
  heroLabel: "NAMI at New Baneshwor",
  slides: heroSlides,
  motto: "Transform Yourself to Lead the World",
  heading: "NAAYA AAYAM MULTI-DISCIPLINARY INSTITUTE",
  standfirst:
    "British & KU degree programmes in Kathmandu, partnered with the University of Northampton (UK).",
  cta: {
    label: "Start an Application",
    href: "/admissions",
    destination: "internal",
  },
};

const awarding: InstitutionAwardingCopy = {
  eyebrow: "Awarding Universities",
  heading: "Partner Universities awarding our degrees.",
  standfirst:
    "Taught at NAMI in Kathmandu, awarded by our accredited university partners.",
  sinceLabel: "Since",
};

const undergraduateEntry: readonly ProgrammeRequirement[] = [
  {
    label: "+2 (NEB)",
    requirement: "Minimum of 55% (2.2 GPA) or equivalent.",
  },
  { label: "CBSE", requirement: "Minimum of 60%." },
  { label: "A Levels", requirement: "280 UCAS tariff points." },
  {
    label: "English",
    requirement:
      "Minimum of 60 marks in English at +2 or CBSE, or an IELTS score of 6 with no band less than 5.5.",
  },
];

const bbaEntry: readonly ProgrammeRequirement[] = [
  {
    label: "NEB +2",
    requirement: "55% / 2.2 GPA or equivalent",
  },
  { label: "CBSE", requirement: "60%" },
  { label: "A Levels", requirement: "280 UCAS tariff points" },
  {
    label: "English",
    requirement:
      "60 marks in English at +2/CBSE or IELTS 6.0, no band below 5.5",
  },
];

const undergraduateEntryNotes: readonly string[] = [
  "Students awaiting results, and students who have completed a foundation or bridge course (Level 3) from a recognised institution, are also encouraged to apply.",
  "All decisions regarding an offer letter are made by the University of Northampton, UK.",
];

const besEntry: readonly ProgrammeRequirement[] = [
  {
    label: "+2 / NEB (or Equivalent)",
    requirement:
      "Nepali or non-Nepali nationals with 10+2 or equivalent level education of at least 1.60 CGPA or 40% in aggregate.",
  },
  {
    label: "GCE A Level",
    requirement:
      "Passed in minimum three subjects in A Level and one General Paper in AS Level with minimum 40% PUM in aggregate.",
  },
];

const besEntryNotes: readonly string[] = [
  "Admission is open to interested students from all high school streams including Science, Arts, Law, Management, Computer, etc., with the minimum qualification.",
  "Nepali and non-Nepali nationals are eligible for admission.",
];

const northamptonAward = "The University of Northampton, UK";

const programmes: BachelorsProgrammesCopy = {
  eyebrow: "Academics",
  heading: "Degree Programmes",
  standfirst: null,
  awardedLabel: "Awarded by",
  startingLabel: "Begins",
  pendingLabel: "Programme detail",
  items: [
    {
      key: "computer-science",
      qualification: "BSc. (Hons)",
      title: "Computer Science",
      fullTitle: "BSc. (Hons) Computer Science",
      metaDescription:
        "BSc. (Hons) Computer Science at NAMI, Kathmandu — a three-year degree awarded by the University of Northampton, UK, with majors in Computing, Software Engineering and Computer Networks Engineering.",
      image: degreeComputerScience,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Three-year degree",
      keyFacts: [
        { label: "Programme Name", value: "BSc. (Hons) Computer Science" },
        { label: "Level", value: "Undergraduate Degree" },
        { label: "Duration", value: "3 years" },
        { label: "Intake", value: "September / January" },
        { label: "Location", value: "New Baneshwor, Kathmandu" },
        { label: "Awarding Institution", value: "University of Northampton" },
        { label: "Mode", value: "Full Time" },
        { label: "Total Credits", value: "360" },
      ],
      whatYoullStudy:
        "Our BSc. Computer Science degree gives you the opportunity to explore different ideas and develop innovative solutions to current issues in the computing industry. This three-year Computer Science university degree will give you an insight into the computing industry, investigating the wide-reaching influences that computers and computing technology have on the world. Studying this course will also contribute towards helping you find your ideal path for a career in Computing.",
      shortDescription:
        "Three-year honours degree with majors in Software Engineering, Computing Systems, and Networks.",
      summary: [
        "This course is designed to give the students the opportunity to explore different ideas, developing innovative solutions of improvements to current issues in the computing industry. This program covers the fundamental principles that are key to computing technology and its various uses.",
        "Throughout this degree, students will cover software engineering methods, database implementation and system design, with multiple users and multiple platforms in mind. It also includes background theory, practical implications of knowledge-based systems, neural networks and evolutionary algorithms on the development of artificial intelligence systems.",
      ],
      entryLabel: "Entry Requirements:",
      entry: undergraduateEntry,
      entryNotes: undergraduateEntryNotes,
      careersLabel: "Career prospect",
      careerSummary:
        "Graduates join organisational projects directly, without intensive further training, and the research skills built through the dissertation open a second route into research or independent consultancy. Computing is used in every discipline, so the long-term scope of the degree reaches wherever computing reaches.",
      careerSectors: [
        "Software industries",
        "Internet service providers",
        "Banks",
        "Airlines",
        "Hydropower",
        "Automobile industries",
        "Educational institutions",
        "Research and consultancy",
      ],
      pendingNote: null,
      stagesNote:
        "During the first year all computing students share the same modules. In years two and three they have the flexibility to focus on a specialism from a range of topics.",
      stages: [
        {
          key: "cs-year-1",
          label: "Year I",
          note: "Students must take all modules.",
          modules: [
            {
              code: "CSY1062",
              title: "Computer Communications",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "This module develops students' understanding of the principles of communication networks and how to classify the various network devices in the appropriate layer of the protocol stack. Students will learn how to manage IP addresses in a small network and will develop confidence in using network simulation software.",
            },
            {
              code: "CSY1061",
              title: "Computer Systems",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "This module provides knowledge of the hardware and software components that make up a computer system and overview the important concepts in preparation for future study of computer science.",
            },
            {
              code: "CSY1063",
              title: "Web Development",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "This purpose of this module is to give students an understanding of client side web technologies. This module provides students with: the essential knowledge and practical skills to design, develop and implement a Web site to contemporary web standard",
            },
            {
              code: "CSY1064",
              title: "Software Engineering Fundamentals",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "The purpose of this module is to develop student’s experience with the multiple stages of software engineering life-cycles from initial need and requirements identification through to the design and implementation of code in order to develop confidence in the use of terminology and techniques for each of the stages.",
            },
            {
              code: "CSY1020",
              title: "Problem Solving & Programming",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "This purpose of this module is to: introduce students to the skills, principles and concepts necessary to solve problems in computing; to develop essential skills to enable the solution of these problems with the construction of appropriate algorithms and a computer program; introduce principles underlying the design of a high level programming language (HLPL); gain experience and confidence in the use of a HLPL to implement algorithms; implement HLPL programs using an appropriate programming language e.g. Java; introduce an object-oriented language initially as a non-object language.",
            },
            {
              code: "CSY1060",
              title: "Mathematics for Computer Science",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "This module introduces a set of mathematical topics, which include binary number system, logic circuits, linear systems, graph theory, probability and statistics, that are widely studied by those learning computing sciences. The module equips students with fundamental mathematical skills which underpin a range of computing disciplines.",
            },
          ],
        },
        {
          key: "cs-year-2",
          label: "Year II",
          note: "Students must take all compulsory modules.",
          modules: [
            {
              code: "CSY2092",
              title: "Operating Systems",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY1061",
              description:
                "The purpose of this module is designed to give an understanding of the theory, application, structure and design principles of operating systems. This module requires a significant practical element delivered as formal laboratory sessions.",
            },
            {
              code: "CSY2087",
              title: "Data Structures and Algorithms",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "This module provides students with a conceptual understanding of common data structures and algorithms used in Computer Science and Software Engineering. It enables students to implement and evaluate a selection of algorithms and abstract data types, including linked lists, stacks, queues, graphs and binary trees using an object-oriented language.",
            },
            {
              code: "CSY2088",
              title: "Group Project",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY1062 or CSY1063 or CSY1064 or CSY1060",
              description:
                "The module is designed to develop higher-order intellectual skills (problem-solving) and appropriate personal qualities including team working. Each group will develop and document effective, robust and high-quality computing systems to a professional standard in response to a supplied specification of requirements.",
            },
            {
              code: "CSY2089",
              title: "Web Programming",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY1063 and CSY1020",
              description:
                "This purpose of this module is to give students an understanding of the concepts and technologies of web based server side technologies; teach students to use up-to-date programming techniques to design and develop coherent server side software for websites with a focus on security, functionality and usability.",
            },
            {
              code: "CSY2080",
              title: "Relational Databases",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "The purpose of this module is to understand and apply the principles of database integrity to implement and utilise efficient databases. RD is a practical module that employs data modelling and SQL techniques to design, define and manipulate data.",
            },
            {
              code: "CSY2094",
              title: "Software Systems Design & Development",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY1020 and CSY1062 or CSY1063 or CSY1064",
              description:
                "This purpose of this module is to extend and apply system design and development to large scale systems; explore building GUIs so that the idea of specifying general software components and implementing re-usable classes will become familiar; provide tools and skills which the student will require when encountering design projects.",
            },
          ],
        },
        {
          key: "cs-year-3",
          label: "Year III",
          note: "Students must take all compulsory modules.",
          modules: [
            {
              code: "CSY4022",
              title: "Computing Dissertation",
              credits: 40,
              status: "Compulsory",
              prerequisites:
                "Students undertaking this module should have successfully completed all level 4 and at least 100 credits at level 5.",
              description:
                "This project module provides the opportunity for the student to undertake independent research, development, and self-management of a Computing related project leading to completing a dissertation. An essential outcome for this module is that the student’s project deliverable includes the design and development of a system, or a software application, or a novel functional approach that relates to the main areas of student study, and that can be used, applied or demonstrated in some way. Students on the BSc. Business Computing may engage on a research centered project resulting in a report of analysis of an appropriate topic.",
            },
            {
              code: "CSY3058",
              title: "Media Technology",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY2089 or CSY2094",
              description:
                "Media Technology is an important aspect to Computer Science. This module will introduce a range of technologies relevant to modern multimedia systems. This includes computer graphics, digital image processing, online video streaming, immersive media, and other advanced applications. Student will develop audio-visual systems in a third generation computer language.",
            },
            {
              code: "CSY3062",
              title: "Cyber Security and Applied Cryptography",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "This module provides students with the necessary practical skills and theoretical understanding of the technologies used to secure communications and protect the privacy of users within an online environment. Concepts introduced, and skills learnt, provide the necessary technical underpinning to enable the student to address the issues of effective Security.",
            },
            {
              code: "CSY3059",
              title: "Modern Databases",
              credits: 20,
              status: "Compulsory",
              prerequisites: "CSY2093 or CSY2080",
              description:
                "The purpose of this module is to study advanced/latest database topics. The module focuses primarily on NoSQL databases (e.g., graph and document databases), from designing and creating to querying the databases.",
            },
            {
              code: "CSY3060",
              title: "Advanced AI and Applications",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
              description:
                "The purpose of this module is to teach students the fundamental theory and practical applications of: knowledge-based systems, artificial neural networks, and deep neural network. The underpinning concepts will be introduced, followed by examples of how intelligent systems are used in engineering, software, or computer science in general. Students will explore core AI techniques including supervised and unsupervised learning, with selected advanced topics introduced to extend their understanding of modern intelligent systems. The course combines conceptual learning with practical implementation, encouraging individual exploration through technical analysis and applied project work.",
            },
          ],
        },
      ],
    },
    {
      key: "environmental-science",
      qualification: "BSc. (Hons)",
      title: "Environmental Science",
      fullTitle: "BSc. (Hons) Environmental Science",
      metaDescription:
        "BSc. (Hons) Environmental Science at NAMI, Kathmandu — a three-year degree awarded by the University of Northampton, UK, combining ecology and physical science with field and laboratory work.",
      image: degreeClimateAI,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "Three-year degree",
      shortDescription:
        "Three-year honours degree combining ecology, physical science, and practical field and lab research.",
      summary: [
        "A three-year degree combining ecology and physical science to evaluate environmental issues and propose appropriate solutions, and to recognise their relevance to society at national and global levels.",
        "Students undertake a wide variety of activities and encounter new challenges that support the theoretical learning. Accuracy, critical evaluation, the ability to research solutions and apply them in new ways, and the ability to communicate findings to a variety of audiences are all vital skills for an environmental scientist.",
        "Students examine research design and methodology across field and laboratory work — data collection, qualitative analysis and statistical tools — with field and lab activities running through the course so scientific concepts are developed in practice.",
      ],
      entryLabel: "Entry Requirements:",
      entry: undergraduateEntry,
      entryNotes: undergraduateEntryNotes,
      careersLabel: "Career prospect",
      careerSummary:
        "Graduates move into organisational projects directly, without intensive further training, across monitoring, conservation and consultancy work. The same research training supports a career as a researcher or independent consultant, and the sector runs from national monitoring and EIA work to the international agencies operating in Nepal.",
      careerSectors: [
        "Environmental monitoring",
        "Conservation and wildlife",
        "Natural resource management",
        "Climate change and CDM projects",
        "IEE and EIA consultancy",
        "Environmental inspection (MOEST)",
        "International agencies (UNEP, UNDP, FAO, WWF, WHO, UNICEF, World Bank, ADB)",
      ],
      pendingNote: null,
      stagesNote: null,
      stages: [
        {
          key: "env-year-1",
          label: "Year I",
          note: "Students must take all compulsory modules for their pathway.",
          modules: [
            {
              code: "ENV1002",
              title: "Introduction to Ecology",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV1110",
              title: "Global Environmental Issues",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "GEO1108",
              title: "Geohazards",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV1128",
              title: "Lab and Field Skills",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV1126",
              title: "Life on Earth",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV1127",
              title: "Environmental Pollution",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "env-year-2",
          label: "Year II",
          note: "Students must take all compulsory modules for their pathway.",
          modules: [
            {
              code: "GEO2038",
              title: "Research Methods",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2125",
              title: "International Environmental Policy & Control",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2140",
              title: "Terrestrial and Freshwater Ecosystems",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2103",
              title: "Biogeography",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2124",
              title: "Field Work Module",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV2142",
              title: "Impacts of Pollution",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "env-year-3",
          label: "Year III",
          note: "Students must take all compulsory modules.",
          modules: [
            {
              code: "ENV4101",
              title: "Research Project and Dissertation",
              credits: 40,
              status: "Compulsory",
              prerequisites: "GEO2038 or equivalent",
            },
            {
              code: "ENV3013",
              title: "Sustainable Development: Land Use and Planning",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV3143",
              title: "Sustainable Resources Management",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENV3144",
              title: "Pollution Monitoring and Control",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "GEO3124",
              title: "Water Resource Management",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
      ],
    },
    {
      key: "environmental-studies",
      qualification: "BES",
      title: "Environmental Studies",
      fullTitle: "Bachelors in Environmental Studies",
      metaDescription:
        "Bachelors in Environmental Studies (BES) at NAMI, Kathmandu — a four-year undergraduate programme awarded by Kathmandu University, focusing on the social, economic, and ecological dimensions of environmental issues.",
      image: degreeClimateAITeam,
      awardingBody: "Kathmandu University",
      startingFrom: null,
      format: "4 years | 8 semesters",
      shortDescription:
        "Four-year bachelor's degree focusing on the social, economic, and ecological dimensions of environmental issues.",
      summary: [
        "The Bachelors in Environmental Studies (BES) at NAMI, awarded by Kathmandu University, is a four-year undergraduate programme designed with focus on the social, economic, and ecological dimensions of environmental issues. Through an interdisciplinary curriculum bridging ecological science, socio-economic dynamics, and governance, students gain a holistic understanding of how living and non-living systems interact and develop sustainable solutions.",
        'Understanding Our Environment: Environment is not only the "surrounding" — it is the sum total of all the living and non-living entities affecting each other including humans. Environment is the ultimate resource for all living beings, but with human need and greed, the status of the environment is undergoing degradation, requiring multi-disciplinary intervention.',
        "A Multi-Disciplinary Curriculum: The environment has become the focus of many disciplines and discourses, encompassing biology, physics, chemistry, geography, sociology, economics, management, laws, governance and policies, ethics, and philosophy. Because environmental issues are now part of every career path and employment, holistic multi-disciplinary knowledge is essential.",
        "Practical & Field-Based Learning: At NAMI, environmental education is deeply immersive. Students participate in comprehensive field trips, in-house laboratory projects, GIS and remote sensing analysis, Environmental Impact Assessments (IEE/EIA), community-based learning, and internships at leading NGOs, INGOs, and research organisations.",
        "Course Highlights & Specialisations: BES is an eight-semester (four-year) programme. Featured courses include Green Entrepreneurship, Conservation and Protected Areas, Environmental Pollution, Indigenous Traditional Knowledge (ITK) and Practices, Environmental Arts and Design, Nature-Based Solutions and Innovation, Environmental Tourism, and Final Year Projects.",
      ],
      entryLabel: "Entry Requirements:",
      entry: besEntry,
      entryNotes: besEntryNotes,
      careersLabel: "Where Can BES Take You?",
      careerSummary:
        "Environmental issues are now part of every career path and employment. The Bachelors in Environmental Studies equips graduates with holistic, multi-disciplinary expertise to pursue diverse career paths across public, private, research, and non-governmental organisations.",
      careerSectors: [
        "Environmental Inspector",
        "Environmentalist",
        "Environmental Resource Manager",
        "Ecologist",
        "Conservationist",
        "Monitoring and Evaluation Expert (M&E)",
        "Gender Equity and Social Inclusion (GESI) Expert",
        "Sustainable and Climate Finance Expert",
        "IEE / EIA Expert",
        "Environmental Educator",
        "Environmental Analyst",
        "Environmental Researcher",
        "Environmental Consultant",
        "Environmental Reporter",
      ],
      pendingNote: null,
      stagesNote: null,
      stages: [
        {
          key: "bes-stage-1",
          label:
            "Year 1 — Build Your Foundation in Environmental Science & Systems",
          note: "Focus: Understand ecological systems and scientific fundamentals. Modules span Semester I & Semester II (32 credits total), covering introductory environmental studies, development practices, ecosystems of the world and Nepal, chemistry, biodiversity, economics, Nepali/English communication, and in-house projects.",
          modules: [
            {
              code: "BEST 101",
              title: "Introduction to Environmental Studies",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 102",
              title: "Developmental Practices and Environment",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 103",
              title: "Ecosystem of the World and Nepal",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "NEPL 151",
              title: "Communication Skills (Nepali)",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 111",
              title: "Introduction to Economics",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 142",
              title: "Environmental In-house Project",
              credits: 1,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 104",
              title: "Environmental Chemistry and the Major Material Cycle",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 105",
              title: "Biodiversity and the Living World",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 106",
              title: "Culture and Environment",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENG 152",
              title: "Communication Skills (English)",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 128",
              title: "Statistics I",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 141",
              title: "Field Trip",
              credits: 1,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "bes-stage-2",
          label:
            "Year 2 — Environmental Dynamics & Natural Resource Management",
          note: "Focus: Deepen scientific analysis and resource governance. Modules span Semester I & Semester II (34 credits total), covering climate dynamics, environmental physics, natural resource management, environmental statistics, sustainable development principles, pollution theory, geology, occupational health, and energy.",
          modules: [
            {
              code: "BEST 201",
              title: "Climate and its Dynamics",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 202",
              title: "Environmental Physics",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 203",
              title: "Natural Resource Management",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 251",
              title: "Environmental Statistics",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CDEV 214",
              title: "Sustainable Development: Principles & Practice",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "SOCL 206",
              title: "Gender, Ethnicity and Social Inclusion",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 204",
              title: "Environmental Pollution Theory & Practical",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 205",
              title: "Environmental Geology",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 231",
              title: "Environmental and Occupational Health",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 251",
              title: "Energy and Environments",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CDEV 220",
              title: "Working with Organisations",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 241",
              title: "Field Trip",
              credits: 1,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "bes-stage-3",
          label: "Year 3 — Conservation, Policy & Community Development",
          note: "Focus: Bridge conservation, social systems, and legal frameworks. Modules span Semester I & Semester II (34 credits total), covering protected areas, indigenous knowledge, pollution control, research methods, disaster management, migration & mobility, environmental arts & design, food security, environmental sociology, conflict resolution, and environmental laws.",
          modules: [
            {
              code: "BEST 301",
              title: "Conservation and Protected Area",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 302",
              title: "Indigenous Knowledge and Environment",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 303",
              title: "Pollution Control and Management",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "DEVS 305",
              title: "Research Methods",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "DEVS 311",
              title: "Disaster Management",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CDEV 311",
              title: "Migration, Mobility and Community Development",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 352",
              title: "Environmental Arts, Designs and Engineering",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 304",
              title: "Land & Food Security",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 345",
              title: "Environmental Sociology",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "DEVS 302",
              title: "Society and Conflict Resolution",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 351",
              title: "Environmental Conventions, Policies and Laws",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 341",
              title: "Field Trip",
              credits: 1,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "bes-stage-4",
          label: "Year 4 — Applied Assessment, Policy & Capstone Project",
          note: "Focus: Apply professional assessment and research. Modules span Semester I & Semester II (27 credits total), covering urban planning, GIS and remote sensing, EIA/SIA, environmental economics, watershed management, media & environment, institutional internships, and an independent final year project.",
          modules: [
            {
              code: "DEVS 401",
              title: "Urban Planning and Development",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ENVT 402",
              title: "Geographic Information System and Remote Sensing",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "CDEV 401",
              title: "Environmental and Social Impact Assessment",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BECO 413",
              title: "Environmental Economics",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 443",
              title: "Integrated Watershed Management",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 442",
              title: "Mass Media and Environmental Issues",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 442",
              title: "Internship at NGOs/INGOs/Research Organizations",
              credits: 3,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BEST 499",
              title: "Final Year Project",
              credits: 6,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
      ],
    },
    {
      key: "business-administration",
      qualification: "Bachelor",
      title: "Business Administration",
      fullTitle: "Bachelor of Business Administration",
      metaDescription:
        "Bachelor of Business Administration (BBA) at NAMI, Kathmandu — a three-year undergraduate programme awarded by the University of Northampton, UK, preparing students for careers in business, management, finance, marketing and entrepreneurship.",
      image: degreeBusinessAdmin,
      awardingBody: northamptonAward,
      startingFrom: null,
      format: "3 years | 360 credits",
      shortDescription:
        "Build the knowledge, skills and confidence to succeed in the world of business.",
      summary: [
        "The BBA at NAMI, awarded by the University of Northampton, UK, is a three-year undergraduate programme designed to prepare students for careers in business, management, finance, marketing, entrepreneurship and a wide range of professional sectors. Through a combination of academic learning, real-world case studies, business projects, presentations, teamwork, industry engagement and practical activities, students develop the knowledge and professional skills needed to navigate today's dynamic business environment.",
        "Why Study BBA at NAMI? Earn a UK University Award from the University of Northampton, giving you an internationally oriented business education. Develop practical business knowledge through case studies, business simulations, projects, presentations, discussions and problem-solving activities. Cultivate entrepreneurial thinking, gain a global business perspective across interconnected markets, and build practical expertise in finance, accounting, and data-informed decision-making.",
        "Learning Beyond the Classroom: At NAMI, business education goes far beyond textbooks and lectures. Students apply their learning through business simulations, case-study competitions, entrepreneurship activities, student-led projects, pitching sessions, industry and guest-speaker sessions, seminars, workshops, business and management events, student clubs and societies, and leadership initiatives.",
        "Skills You Will Develop: Throughout the programme, students build business and management expertise (strategic thinking, business decision-making, financial awareness, marketing knowledge, project management), professional excellence (communication, presentation, teamwork, leadership, negotiation), and future-focused capabilities (critical thinking, problem-solving, creativity, entrepreneurship, digital and analytical skills, and research skills).",
        "Is BBA Right for You? The BBA is ideal for students who are interested in business and management, want to understand how organisations work, are interested in entrepreneurship or starting their own venture, enjoy collaborating in teams, want to develop leadership acumen, or seek a broad business degree before specialising.",
      ],
      entryLabel: "Entry Requirements:",
      entry: bbaEntry,
      entryNotes: undergraduateEntryNotes,
      careersLabel: "Where Can a BBA Take You?",
      careerSummary:
        "A BBA can provide a foundation for careers across a wide range of business functions and sectors. Graduates are prepared for roles such as Business Executive, Marketing Executive, HR Executive, Banking Professional, Business Development Executive, Project Coordinator, Operations Executive, Entrepreneur, Sales Executive, and Management Trainee.",
      careerSectors: [
        "Business Management",
        "Banking and Financial Services",
        "Marketing and Digital Marketing",
        "Human Resource Management",
        "Sales and Business Development",
        "Operations Management",
        "Project Management",
        "Entrepreneurship",
        "Consulting",
        "Customer Relationship Management",
        "Hospitality and Service Management",
        "Business Analysis",
        "Administration and Management",
      ],
      pendingNote: null,
      stagesNote: null,
      stages: [
        {
          key: "bba-stage-1",
          label: "Year 1 — Build Your Business Foundation",
          note: "Focus: Understand business. Develop a broad understanding of how businesses operate across marketing, accounting and finance, business environment, business in society, entrepreneurship, and people management.",
          modules: [
            {
              code: "MKT1001",
              title: "Foundation of Marketing",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ACC1003",
              title: "Introductory Finance and Accounting",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS1001",
              title: "Business Environment",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS1009",
              title: "Business in Society",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "MKT1003",
              title: "Enterprise and Opportunity",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "HRM1004",
              title: "Managing People",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "bba-stage-2",
          label: "Year 2 — Develop Management Expertise",
          note: "Focus: Manage and analyse business. Build deeper knowledge and develop practical management capabilities across strategic business analysis, human resources, operations, financial decision-making, project management, and brand management.",
          modules: [
            {
              code: "BUS2002",
              title: "Strategic Business Analysis",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "HRM2003",
              title: "Managing Human Resources",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BSO2003",
              title: "Operations Management 1",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "ACC2004",
              title: "Managing Finance & Financial Decisions",
              credits: 20,
              status: "Compulsory",
              prerequisites: "ACC1003",
            },
            {
              code: "BSO2016",
              title: "Project Management: Planning and Control",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "MKT2006",
              title: "Brand Management",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
          ],
        },
        {
          key: "bba-stage-3",
          label: "Year 3 — Think Strategically and Professionally",
          note: "Focus: Lead, innovate and create solutions. Apply your knowledge to contemporary business challenges through innovation and entrepreneurship, strategic management, corporate social responsibility, global business, and an independent business dissertation (BUS4001).",
          modules: [
            {
              code: "MKT3026",
              title: "Opportunity, Innovation and Entrepreneurship",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS3002",
              title: "Debates in Strategic Management",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS3001",
              title: "Social Responsibility of Business",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS3003",
              title: "Global Business Development",
              credits: 20,
              status: "Compulsory",
              prerequisites: "None",
            },
            {
              code: "BUS4001",
              title: "Business Dissertation",
              credits: 40,
              status: "Designated",
              prerequisites: "None",
            },
          ],
        },
      ],
    },
  ],
};

const placementPanel: ContentImage = {
  src: "/hero/student-life/student-life-hero.jpg",
  alt: "Industry partner panel discussion and career placement session at NAMI.",
  width: 1280,
  height: 853,
};

const partners: CareerPlacementCopy = {
  eyebrow: "Career Placement",
  heading: "Industry partners and career placements.",
  image: placementPanel,
  label: "NAMI industry and technology partner logos",
};

const alumni: SectionCopy = {
  navLabel: "Voices",
  eyebrow: "Student Voices",
  heading: "In their own words, on what the degree is actually worth.",
  standfirst:
    "Hear directly from our students on the British system of learning, practical innovation, and personal growth at NAMI.",
  cta: null,
  emptyState: "Student stories will appear here as they are shared.",
};

const gallery: InstitutionGalleryCopy = {
  eyebrow: "The College",
  heading: "Degree years, photographed.",
  standfirst:
    "Convocations, panels, field days and the ordinary weeks between them — the institute’s own record of what a degree here looks like.",
  ctaLabel: "All Institute Photographs",
};

const notices: InstitutionNoticesCopy = {
  eyebrow: "Notice Board",
  heading: "What the institute is announcing.",
  standfirst:
    "Registration windows, submission deadlines and standing notices for undergraduate and postgraduate students.",
  ctaLabel: "All Institute Notices",
  emptyState:
    "There is no institute notice standing right now. Everything the institute has published stays on the notice board.",
};

export const bachelorsCopy = {
  meta: {
    title: "Naaya Aayam Multi-Disciplinary Institute",
    description:
      "Naaya Aayam Multi-Disciplinary Institute teaches partner-university degrees at New Baneshwor, Kathmandu — BSc. (Hons) Computer Science, BSc. (Hons) Environmental Science, and Bachelor in Business Administration awarded by the University of Northampton, UK, and BSc. Environmental Studies awarded by Kathmandu University.",
  },
  levelSlug: "bachelors",
  masthead,
  awarding,
  academicHead: {
    slug: "leader-nischal-khadka",
    eyebrow: "From the Academic Head",
    portrait: academicHeadPortrait,
    message: richText(
      "On behalf of the entire NAMI family, it is my great pleasure to warmly welcome all our new and returning students as you begin or continue academic journey with NAMI across our undergraduate and postgraduate programmes.",
      "As you begin or continue your journey at NAMI, we are pleased to welcome you to a community where learning goes beyond the classroom. We want your time at NAMI to be an opportunity to gain knowledge, discover your strengths, explore new ideas and build the confidence to pursue your ambitions. At NAMI, we are committed to creating an environment that encourages students to learn, explore, innovate and achieve their full potential.",
      "Our students are at the heart of everything we do. You will be joining a community of talented, enthusiastic and ambitious individuals who bring diverse perspectives, experiences and ideas to our learning environment. I encourage you to engage with your peers, collaborate with others and make the most of every opportunity to learn and grow together.",
      "At NAMI, education extends beyond the classroom. Alongside your academic studies, you will have opportunities to participate in student clubs and societies, projects, events, leadership activities, industry engagement and a wide range of co-curricular and extracurricular initiatives. These experiences complement your academic learning and help you develop the knowledge, skills, confidence and professional attributes needed to thrive in an ever-changing world.",
      "I encourage you to make the most of your time at NAMI by taking opportunities available to you, both within and beyond the classroom. Stay curious, ask questions, share your ideas, take on new challenges and play an active role in the NAMI community. Each experience will contribute to your personal and academic growth, helping you develop confidence, strengthen your communication and teamwork. It will build the leadership, creativity, critical thinking and problem-solving skills that will serve you well in the future.",
      "Our faculty and staff are committed to supporting you throughout your journey. We are here to provide academic guidance, mentorship and opportunities for personal and professional development. Your success matters to us and we encourage you to seek guidance and support whenever you need it.",
      "I hope your time at NAMI will be rewarding, inspiring and transformative. Embrace every opportunity, learn from every experience and contribute positively to our community. Your time at NAMI is not simply about earning a qualification; it is about developing the knowledge, confidence, values and capabilities to make a meaningful contribution to society and the world of work.",
      "Once again, I warmly welcome you to NAMI. We are pleased to have you as part of our academic community and I look forward to seeing you grow with confidence, pursue your aspirations and make the most of the opportunities ahead.",
      "Warmest wishes for a successful, fulfilling and inspiring academic journey.",
    ),
  },
  programmes,
  partners,
  alumni,
  gallery,
  notices,
} as const;
