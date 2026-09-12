import type { InstitutionGalleryCopy } from "@/components/shared/institution-gallery";
import type { InstitutionNoticesCopy } from "@/components/shared/institution-notices";
import type { SharedHeroSlide } from "@/components/shared/shared-hero";
import type { ContentLink, SectionCopy, Testimonial } from "@/lib/content";
import { entryOf, schoolGrades } from "@/lib/content";
import { pragatiRaiPortrait } from "@/lib/content/local/images";
import type { SchoolAdmissionCopy } from "./school-admission";
import type { SchoolBandsCopy } from "./school-bands";
import type { SchoolDayCopy } from "./school-day";

export type SchoolHeroCopy = {
  readonly eyebrow: string;
  readonly tagline: string;
  readonly heroLabel: string;
  readonly slides: readonly SharedHeroSlide[];
  readonly admissionCta: ContentLink;
};

const heroSlides: readonly SharedHeroSlide[] = [
  {
    src: "/nami/campus-service-camp.jpg",
    alt: "Pupils in red uniforms seated around a hilltop school ground in Sindhupalchowk, facing stacks of red relief bags laid out on benches at a NAMI service camp.",
    width: 1190,
    height: 793,
  },
  {
    src: "/nami/campus-science-lab.jpg",
    alt: "A NAMI chemistry laboratory, reagent bottles ranked on shelves above long benches fitted with sinks, burettes and retort stands.",
    width: 1280,
    height: 853,
  },
  {
    src: "/nami/campus-library.jpg",
    alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
    width: 1280,
    height: 853,
  },
  {
    src: "/nami/campus-basketball-award.jpg",
    alt: "Prize-giving for the NAMI SEE 3x3 Basketball Tournament on the college auditorium stage, both teams wearing medals and holding certificates behind the winners' trophy and the tournament cheques.",
    width: 1500,
    height: 1000,
  },
  {
    src: "/nami/campus-auditorium.jpg",
    alt: "Students and staff seated on sofas and stacking chairs in the NAMI auditorium, maroon acoustic panelling on the wall behind them.",
    width: 999,
    height: 666,
  },
];

const masthead: SchoolHeroCopy = {
  eyebrow: "Gokarneshwor-7, Kathmandu",
  tagline: `Nurturing Minds, Shaping Tomorrow Together! From Grades ${schoolGrades.first} through ${schoolGrades.last} and +2 in Science and Management.`,
  heroLabel: "NAMI International School",
  slides: heroSlides,
  admissionCta: {
    label: "Apply for admission",
    href: "/admissions",
    destination: "internal",
  },
};

const bands: SchoolBandsCopy = {
  eyebrow: "Academics",
  heading: "Grades I–VII & +2 Secondary School",
  standfirst:
    "A progressive education approach grounded in meaningful learning, student participation, inclusion, values, creativity, and personal growth.",
  primary: {
    label: schoolGrades.labelPlural,
    affiliationSlug: "neb-school",
    sinceLabel: "National Curriculum",
    enrolment: "Progressive Education from Grades I to VII",
    body: "NAMI International School offers education from Grades I to VII, following the Nepal Government's National Curriculum through a progressive approach to teaching and learning. Our Grades I to VII programme provides students with strong academic foundations while giving them opportunities to explore, create, collaborate, communicate, and apply what they learn.",
    notes: [
      "Curriculum across Languages, Mathematics, Science & Tech, Serophero, Samajik Shikshya, Mero Gokarneshwor, Positive Living, HPE & Creative Arts",
      "English is the primary language of instruction with a strong emphasis on Nepali, plus Mandarin Chinese and Sanskrit language learning",
      "Active learning through morning circles, exploration, research, projects, experiments, problem-solving, reflection, and real-world application",
      "Continuous assessment through classwork, assignments, projects, practical activities, and interactive engagement",
      "Learning collaborations with 3Di School (Design & Tech), Play Nepal (Movement & Wellness), UnMath (Joyful Math), Mero Coding (Coding & Computational Thinking), and Samatva Wellness",
      "Co-curricular activities in Art & Craft, Music, Dance, Public Speaking, Football, Basketball, Karate, Cricksal, Swimming, Table Tennis & Badminton",
      "Curriculum-related educational trips (2 per term in Kathmandu Valley) plus optional national and international experiential learning trips",
      "Strong parent partnership with parent representative roles, guest speaking, classroom support, and regular communication",
    ],
    streams: [
      {
        name: "Grades I - III",
        note: "Foundational academic programme developing early literacy, numeracy, positive living, local knowledge, and foreign languages.",
        subjects: [
          "English Language Arts",
          "Nepali Language Arts",
          "Mathematics",
          "Serophero",
          "Mero Gokarneshwor",
          "Positive Living",
          "Mandarin Chinese",
          "Sanskrit",
        ],
        photo: {
          src: "/nami/school/nami-school-library.jpg",
          alt: "Primary students exploring books and interactive materials in the school library.",
          width: 1000,
          height: 1333,
        },
      },
      {
        name: "Grades IV - VII",
        note: "Comprehensive progressive curriculum integrating core academics, scientific inquiry, social studies, creative arts, and continuous assessment.",
        subjects: [
          "English Language Arts",
          "Nepali Language Arts",
          "Mathematics",
          "Science and Technology",
          "Samajik Shikshya",
          "Mero Gokarneshwor",
          "Positive Living",
          "Health, Physical Education & Creative Arts",
          "Mandarin Chinese",
          "Sanskrit",
        ],
        photo: {
          src: "/nami/school/nami-school-digital-classroom.jpeg",
          alt: "Middle school students learning collaboratively in interactive digital classrooms.",
          width: 1125,
          height: 1066,
        },
      },
    ],
  },
  secondary: {
    label: "Grades XI and XII (+2)",
    affiliationSlug: "neb-plus-two",
    sinceLabel: "NEB +2 since",
    enrolment: "Management & Science Streams under NEB",
    body: "NAMI's Secondary School offers Grades XI and XII (+2) programmes in Management and Science under the National Examination Board (NEB). The programme combines academic learning with practical experiences, career guidance, internships, competitions, educational visits, and national and international exposure.",
    notes: [
      "In-house well-equipped Biology, Chemistry, and Physics laboratories with skilled laboratory technicians",
      "Career counselling and guidance helping students explore pathways and prepare for higher education",
      "Internship opportunities, hotel visits, biology excursions, industry visits, and educational tours",
      "Student clubs: Sports Club, Art and Literature Club, Event Management Club, Social Service Club, and Science & Technology Club",
      "Sports competitions in futsal, basketball, table tennis, chess, carrom, shot put, tug of war, and annual Sports Meet",
      "National and international exposure trips fostering independence, adaptability, and cultural understanding",
      "Modern facilities: Air-conditioned classrooms, 400-seat auditorium, computer labs, library, infirmary, and school canteen",
    ],
    streams: [
      {
        name: "Science Stream",
        note: "Offers Biology Group (A), Biology Group (B), and Physical Group (Computer Science) with well-equipped in-house laboratories and skilled technicians applying theory to practice.",
        subjects: [
          "Comp. English",
          "Comp. Nepali",
          "Physics",
          "Chemistry",
          "Mathematics",
          "Biology (Group A/B)",
          "Computer Science (Physical Group)",
          "Social Studies (Biology Group B)",
        ],
        photo: {
          src: "/nami/campus-science-lab.jpg",
          alt: "A NAMI chemistry laboratory, reagent bottles ranked on shelves above long benches fitted with sinks, burettes and retort stands.",
          width: 1280,
          height: 853,
        },
      },
      {
        name: "Management Stream",
        note: "Offers Business Studies, Computer Science, and Hotel Management groups providing a solid foundational understanding of management facts and principles.",
        subjects: [
          "Comp. English",
          "Comp. Nepali",
          "Accounting",
          "Economics",
          "Social Studies",
          "Mathematics (Optional CS)",
          "Business Studies",
          "Computer Science",
          "Hotel Management",
        ],
        photo: {
          src: "/nami/campus-library.jpg",
          alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
          width: 1280,
          height: 853,
        },
      },
    ],
  },
  photo: {
    src: "/nami/campus-library.jpg",
    alt: "A NAMI reading hall, long study desks ranked beneath ceiling fans with a projection screen at the far end and a silence notice on the wall.",
    width: 1280,
    height: 853,
  },
};

const day: SchoolDayCopy = {
  eyebrow: "Facilities & Student Experience",
  heading: "Campus & Learning Environment",
  standfirst:
    "NAMI International School provides facilities designed to support learning, creativity, technology, physical development, and student well-being.",
  campusLabel: "Facilities",
  campus: [
    {
      title: "School Library",
      body: "A well-resourced school library for study, research, and leisure reading, with dedicated classroom libraries in the primary grades.",
      photo: {
        src: "/nami/school/nami-school-library.jpg",
        alt: "A young pupil stretched out reading in a padded yellow hexagonal alcove built into the library wall, beside floor-to-ceiling shelves of picture books.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Science Laboratories",
      body: "In-house, well-equipped Biology, Chemistry, and Physics laboratories staffed with skilled technicians to apply scientific theories to practical experiments.",
      photo: {
        src: "/nami/school/nami-school-science-lab.jpg",
        alt: "Students in white lab coats and safety goggles running a titration into a conical flask at a laboratory bench, reagent bottles ranked on the shelves behind them.",
        width: 1000,
        height: 666,
      },
    },
    {
      title: "Computer Laboratories",
      body: "Modern computer laboratories in both junior and senior wings, each furnished with computer workstations on high-speed internet.",
      photo: {
        src: "/nami/school/nami-school-computer-lab.jpg",
        alt: "Students in navy blazers and ties working at desktop computers along a row of wooden benches in the computer laboratory.",
        width: 712,
        height: 666,
      },
    },
    {
      title: "Digital Classrooms & Interactive Boards",
      body: "Interactive smart boards in every classroom used as an everyday active teaching tool, with air-conditioned spaces for comfortable learning year-round.",
      photo: {
        src: "/nami/school/nami-school-digital-classroom.jpeg",
        alt: "A teacher mid-lesson at a wall-mounted interactive board, presenting a red quadrilateral she has drawn on its touchscreen.",
        width: 1125,
        height: 1066,
      },
    },
    {
      title: "400-Seat Auditorium",
      body: "A fully equipped auditorium with a 400-seat capacity and quality acoustic sound system for school assemblies, cultural fests, presentations, and events.",
      photo: {
        src: "/nami/school/nami-international-school-auditorium.jpg",
        alt: "Primary pupils seated in rows of stacking chairs in the school auditorium, watching the front of the hall beneath maroon acoustic panelling.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Sports Facilities & Courts",
      body: "Indoor spaces for table tennis and badminton, outdoor facilities for mini-football, basketball, and cricksal, plus swimming and futsal coaching.",
      photo: {
        src: "/nami/school/nami-minifootball.jpg",
        alt: "The school's mini football field, a white goal frame standing on a walled lawn edged by a rainbow-coloured railing and terracotta planters.",
        width: 993,
        height: 1051,
      },
    },
    {
      title: "Cafeteria & 3 Vegetarian Meals",
      body: "Three nutritious, hygienic vegetarian meals (breakfast, lunch, and snack) provided for primary students, with a dedicated canteen for Grades 11 and 12.",
      photo: {
        src: "/nami/school/nami-school-cafeteria.jpg",
        alt: "The school cafeteria, wooden tables and chairs ranked across a polished floor beside a glazed partition, with a stainless steel serving counter and a water dispenser against the orange wall.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Infirmary & Nursing Support",
      body: "A fully equipped school infirmary with qualified nursing staff on duty throughout school hours to ensure student health and well-being.",
      photo: {
        src: "/nami/school/nami-school-infirmity.jpg",
        alt: "The school infirmary, two single beds made up with pale blue linen and folded blankets beneath a wall fan and a curtained window.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "Counselling Services",
      body: "Dedicated psycho-social counselling and career guidance to ensure every child feels safe, respected, heard, and supported in their personal and academic growth.",
      photo: {
        src: "/nami/school/nami-school-cafeteria.jpg",
        alt: "Students and teachers collaborating in a welcoming campus environment.",
        width: 1000,
        height: 1333,
      },
    },
    {
      title: "School Transportation",
      body: "Safe and reliable bus service covering extensive pickup and drop-off routes across Kathmandu Valley.",
      photo: {
        src: "/nami/school/nami-school-bus.jpg",
        alt: "Two yellow NAMI International School minibuses parked in the school forecourt, children looking out from the windows.",
        width: 1000,
        height: 602,
      },
    },
  ],
};

const parents: SectionCopy = {
  navLabel: "Parents",
  eyebrow: "Parent voices",
  heading: "The school their children come home from.",
  cta: null,
  emptyState:
    "Parent accounts of the school appear here as families share them.",
};

export const parentTestimonials: readonly Testimonial[] = [
  {
    ...entryOf("parent-sarita-adhikari"),
    quote:
      "The jump into Grade 11 science worried us. Her teachers flagged where she was slipping before we had to ask, and the laboratories are properly staffed.",
    name: "Sarita Adhikari",
    programme: "Parent, Grade 11 Science",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-prakash-maharjan"),
    quote:
      "He started Grade 1 barely speaking to anyone. Six months on he tells us about his collaborative projects over dinner and loves his Mandarin classes.",
    name: "Prakash Maharjan",
    programme: "Parent of a Grade 1 student",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-bikash-shrestha"),
    quote:
      "My son went quiet for most of a term and I could not reach him. The school counsellor did, patiently, without ever making him feel like a problem.",
    name: "Bikash Shrestha",
    programme: "Parent of a Grade 6 student",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-rekha-tamang"),
    quote:
      "Admissions rang us the week we registered and walked us through every step. The Principal's orientation and the tour afterwards are what decided it.",
    name: "Rekha Tamang",
    programme: "Parent of a Grade 2 student",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-sunita-karki"),
    quote:
      "She comes home excited about creative arts, science experiments and her UnMath projects. Far more of her day is spent exploring and making things than rote learning.",
    name: "Sunita Karki",
    programme: "Parent of a Grade 4 student",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
  {
    ...entryOf("parent-deepak-bhattarai"),
    quote:
      "Both our children finished +2 here, Management and then Science. The career counselling and the internship placements are what set this school apart.",
    name: "Deepak Bhattarai",
    programme: "Parent, Grades 11 and 12",
    institution: "school",
    graduatedYear: null,
    portrait: pragatiRaiPortrait,
  },
];

const admission: SchoolAdmissionCopy = {
  eyebrow: "Admission",
  heading: "Seven steps, written for parents and guardians.",
  standfirst:
    "The step-by-step admissions procedure from registration to final enrolment.",
  stepLabel: "Step",
  steps: [
    {
      title: "Registration",
      body: "Register your child's name at reception or through our online portal.",
    },
    {
      title: "Orientation",
      body: "Attend the Principal's academic briefing and a guided school tour.",
    },
    {
      title: "Application",
      body: "Obtain the official application form from admissions or online.",
    },
    {
      title: "Application Submission",
      body: "Submit forms to schedule placement assessment and family interview.",
    },
    {
      title: "Notification",
      body: "Receive your child's admission decision by phone or email.",
    },
    {
      title: "Admission Confirmation",
      body: "Confirm your seat upon acceptance letter and deposit submission.",
    },
    {
      title: "Open House",
      body: "Attend the Open House to receive student handbooks and essentials.",
    },
  ],
};

const gallery: InstitutionGalleryCopy = {
  eyebrow: "The school, photographed",
  heading: "Ordinary days, as they actually look.",
  standfirst:
    "Assemblies, sports, classrooms and the weeks in between — the school's own record of what a child's day here looks like.",
  ctaLabel: "All school photographs",
};

const notices: InstitutionNoticesCopy = {
  eyebrow: "Notice board",
  heading: "What the school is announcing.",
  standfirst:
    "Admission windows, examination dates, holidays and the standing notices that parents need in front of them.",
  ctaLabel: "All school notices",
  emptyState:
    "There is no school notice standing right now. Everything the school publishes appears here and on the notice board.",
};

export const schoolFaqs = [
  {
    question: "What is the Philosophy of the school?",
    answer:
      "The school follows a progressive education approach, emphasizing holistic development for each individual.",
  },
  {
    question: "What will the role of parents at NAMI International School be?",
    answer:
      "Parents are encouraged to take on roles such as class representatives and guest speakers, and occasionally accompany students on trips and picnics.",
  },
  {
    question: "Which Curriculum do Grades I-VII follow?",
    answer:
      "NAMI International School has adopted the Nepal Government's curriculum to align with progressive education principles. The school implements this curriculum using the progressive pedagogical approach, emphasising creative thinking and inquiry-based learning.",
  },
  {
    question: "Does NAMI International School have a uniform?",
    answer:
      "We celebrate diversity and acknowledge each student's individuality, we therefore do not have a uniform, instead, we have a dress code in place to ensure a sense of decorum. However, the school does have a track suit and jersey for students that is optional to wear on regular days but is mandatory on days they have field trips.",
  },
  {
    question:
      "Why doesn't NAMI International School have assessments until grade V?",
    answer:
      "Our approach to education is centered on preparing children for life, not just examinations. We believe in empowering students to take ownership of their learning and construct knowledge actively. Continuous assessments in the form of assignments, projects, and interactive engagements are used to evaluate their understanding and application of concepts in real-life situations.",
  },
  {
    question: "Does NAMI International School provide meals to the students?",
    answer:
      "Yes, we provide 3 vegetarian meals (breakfast, lunch and snack). We have a canteen for Grade 11 and 12 students.",
  },
  {
    question: "Why is NAMI International School’s cafeteria vegetarian?",
    answer:
      "We prioritize healthy eating and avoid the challenges associated with managing a large-scale meat supply, which poses hygiene risks. Our commitment to the nutritional well-being of children is uncompromising.",
  },
  {
    question: "What are the sports facilities at NAMI International School?",
    answer:
      "We offer physical education classes, along with activities like table tennis, basketball, badminton, cricksal and football. Additionally, students get the opportunity to attend futsal and swimming lessons at a nearby public club.",
  },
  {
    question: "Does NAMI International School provide transportation?",
    answer: "We have transport facilities in various areas.",
  },
] as const;

export const schoolCopy = {
  meta: {
    title:
      "NAMI International School | Grades I–VII & +2 Science and Management",
    description: `NAMI International School offers progressive education for Grades I–VII under the Nepal Government's National Curriculum and NEB +2 in Science and Management at Gokarneshwor-7, Kathmandu.`,
  },
  levelSlug: "school",
  masthead,
  bands,
  day,
  parents,
  admission,
  gallery,
  notices,
  faqs: schoolFaqs,
} as const;
