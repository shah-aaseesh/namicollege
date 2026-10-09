// The gallery as it shipped: institution tabs, the bubbles under each tab and
// every moment. Seeds the WordPress gallery (src/lib/cms/pages/gallery) and is
// shown when WordPress is unavailable.

export type GalleryInstitution =
  | "all"
  | "primary"
  | "higher-secondary"
  | "a-levels"
  | "bachelors";

export type SubcategoryIconType =
  | "grid"
  | "tech"
  | "sports"
  | "math"
  | "arts"
  | "culture"
  | "trips"
  | "science"
  | "social"
  | "events"
  | "business"
  | "convocation"
  | "music";

export type SubcategoryItem = {
  readonly id: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly iconType: SubcategoryIconType;
  readonly thumbnail?: string;
  /** Logos sit inside the circle; photos fill it. */
  readonly logo?: boolean;
};

export type GalleryCategory =
  | "all"
  | "academics"
  | "campus-life"
  | "events"
  | "sports"
  | "achievements";

export type InstitutionTab = {
  readonly id: GalleryInstitution;
  readonly label: string;
  readonly badgeLabel: string;
};

export const INSTITUTION_TABS: readonly InstitutionTab[] = [
  { id: "all", label: "All Institutions", badgeLabel: "All" },
  { id: "primary", label: "Primary (Grades I–VII)", badgeLabel: "Primary" },
  { id: "higher-secondary", label: "+2 Higher Secondary", badgeLabel: "+2" },
  { id: "a-levels", label: "A-Levels", badgeLabel: "A-Levels" },
  { id: "bachelors", label: "Bachelors & Masters", badgeLabel: "Degree" },
];

export const INSTITUTION_SUBCATEGORIES: Record<
  GalleryInstitution,
  readonly SubcategoryItem[]
> = {
  all: [
    {
      id: "all",
      label: "All Moments",
      shortLabel: "All Highlights",
      iconType: "grid",
      thumbnail: "/sections/nami/gallery-hero.jpg",
    },
    {
      id: "academics",
      label: "Academics & Labs",
      shortLabel: "Academics",
      iconType: "math",
      thumbnail: "/gallery/Bachelors/Academic/ai.jpeg",
    },
    {
      id: "clubs",
      label: "Clubs & Activities",
      shortLabel: "Clubs",
      iconType: "social",
      thumbnail: "/gallery/A-levels/Events/farewell.jpeg",
    },
    {
      id: "events",
      label: "Events & Festivals",
      shortLabel: "Events",
      iconType: "events",
      thumbnail: "/gallery/Higher Secondary/Events/HOLI.jpeg",
    },
    {
      id: "sports",
      label: "Sports & Athletics",
      shortLabel: "Sports",
      iconType: "sports",
      thumbnail: "/gallery/A-levels/Sports/xyz.jpeg",
    },
    {
      id: "achievements",
      label: "Convocations & Wins",
      shortLabel: "Honors",
      iconType: "convocation",
      thumbnail: "/gallery/Bachelors/Events/graduation.jpeg",
    },
  ],
  primary: [
    {
      id: "all",
      label: "All Primary Activities",
      shortLabel: "All Primary",
      iconType: "grid",
      thumbnail: "/sections/nami/level-school.jpg",
    },
    {
      id: "tech-3di",
      label: "3Di School New Zealand",
      shortLabel: "3Di School",
      iconType: "tech",
      thumbnail: "/logos/collaborators/3di.png",
    },
    {
      id: "sports-playnepal",
      label: "Play Nepal Sports",
      shortLabel: "Play Nepal",
      iconType: "sports",
      thumbnail: "/logos/collaborators/play-nepal.png",
    },
    {
      id: "academics-math",
      label: "UnMath Programme",
      shortLabel: "UnMath",
      iconType: "math",
      thumbnail: "/logos/collaborators/unmath.png",
    },
    {
      id: "mero-coding",
      label: "Mero Coding Hub",
      shortLabel: "Mero Coding",
      iconType: "tech",
      thumbnail: "/logos/collaborators/mero-coding.png",
    },
    {
      id: "samatva-wellness",
      label: "Samatva Wellness & Vaav",
      shortLabel: "Samatva",
      iconType: "culture",
      thumbnail: "/logos/collaborators/samatva-wellness.png",
    },
    {
      id: "others",
      label: "Other School Activities",
      shortLabel: "Others",
      iconType: "arts",
      thumbnail: "/gallery/Primary School/School Life/CLAYMATION.jpg",
    },
  ],
  "higher-secondary": [
    {
      id: "all",
      label: "All (+2) Activities",
      shortLabel: "All (+2)",
      iconType: "grid",
      thumbnail: "/sections/nami/level-plus-two.jpg",
    },
    {
      id: "sports-club",
      label: "Sports Club",
      shortLabel: "Sports Club",
      iconType: "sports",
      thumbnail:
        "/gallery/Higher Secondary/Sports/Basketball Tournament—2082.jpeg",
    },
    {
      id: "science-tech",
      label: "Science & Tech Club",
      shortLabel: "Science & Tech",
      iconType: "science",
      thumbnail: "/gallery/Higher Secondary/Academic/KIST FAIR- 2081.jpeg",
    },
    {
      id: "social-service",
      label: "Social Service Club",
      shortLabel: "Social Service",
      iconType: "social",
      thumbnail: "/gallery/Higher Secondary/Events/Social Service Club.jpeg",
    },
    {
      id: "event-management",
      label: "Event Management Club",
      shortLabel: "Events Club",
      iconType: "events",
      thumbnail: "/gallery/Higher Secondary/Events/HOLI.jpeg",
    },
    {
      id: "art-literature",
      label: "Art & Literature Club",
      shortLabel: "Art & Lit",
      iconType: "arts",
      thumbnail:
        "/gallery/Higher Secondary/Events/intra-school art competition .jpeg",
    },
    {
      id: "academic-tours",
      label: "Academics & Tours",
      shortLabel: "Study Tours",
      iconType: "math",
      thumbnail: "/gallery/Higher Secondary/School Life/Educational Tour.jpeg",
    },
  ],
  "a-levels": [
    {
      id: "all",
      label: "All A-Levels Activities",
      shortLabel: "All A-Levels",
      iconType: "grid",
      thumbnail: "/sections/nami/level-a-level.jpg",
    },
    {
      id: "sports",
      label: "Sports Club",
      shortLabel: "Sports Club",
      iconType: "sports",
      thumbnail: "/gallery/A-levels/Sports/karate.jpeg",
    },
    {
      id: "social-services",
      label: "Social Services Club",
      shortLabel: "Social Services",
      iconType: "social",
      thumbnail: "/sections/nami/hero-mustang.jpg",
    },
    {
      id: "arts-crafts",
      label: "Arts & Crafts Club",
      shortLabel: "Arts & Crafts",
      iconType: "arts",
      thumbnail: "/gallery/A-levels/Events/xyz.jpeg",
    },
    {
      id: "academics",
      label: "Cambridge Academics",
      shortLabel: "Academics",
      iconType: "math",
      thumbnail: "/gallery/A-levels/Academic/xyz1.jpeg",
    },
    {
      id: "student-life",
      label: "Student Life & Fests",
      shortLabel: "Student Life",
      iconType: "events",
      thumbnail: "/gallery/A-levels/Events/farewell.jpeg",
    },
  ],
  bachelors: [
    {
      id: "all",
      label: "All Degree Activities",
      shortLabel: "All Degree",
      iconType: "grid",
      thumbnail: "/sections/nami/level-bachelor-master.jpg",
    },
    {
      id: "websurfer",
      label: "WebSurfer Nepal",
      shortLabel: "WebSurfer",
      iconType: "tech",
      thumbnail:
        "/logos/mou/websurfer-logo-brighter1920x658-removebg-preview.png",
    },
    {
      id: "startup-discovery",
      label: "Startup Discovery Asia",
      shortLabel: "Startup Asia",
      iconType: "business",
      thumbnail: "/logos/mou/Startup_Discovery-removebg-preview.png",
    },
    {
      id: "machan",
      label: "Machan Wildlife Resort",
      shortLabel: "Machan Resort",
      iconType: "science",
      thumbnail: "/logos/mou/machian-removebg-preview.png",
    },
    {
      id: "suraj-interior",
      label: "Suraj Interior & Design",
      shortLabel: "Suraj Interior",
      iconType: "arts",
      thumbnail: "/logos/mou/Suraj-removebg-preview.png",
    },
    {
      id: "cross-web",
      label: "Cross Web IT Solutions",
      shortLabel: "Cross Web",
      iconType: "tech",
      thumbnail: "/logos/mou/Cross_web-removebg-preview.png",
    },
    {
      id: "others",
      label: "Other Degree Activities",
      shortLabel: "Others",
      iconType: "convocation",
      thumbnail: "/gallery/Bachelors/Events/graduation.jpeg",
    },
  ],
};

export type CategoryFilterTab = {
  readonly id: GalleryCategory;
  readonly label: string;
  readonly iconType:
    | "grid"
    | "mortarboard"
    | "users"
    | "calendar"
    | "sports"
    | "trophy";
};

export const CATEGORY_TABS: readonly CategoryFilterTab[] = [
  { id: "all", label: "All Moments", iconType: "grid" },
  { id: "academics", label: "Academics", iconType: "mortarboard" },
  { id: "campus-life", label: "Campus Life", iconType: "users" },
  { id: "events", label: "Events", iconType: "calendar" },
  { id: "sports", label: "Sports", iconType: "sports" },
  { id: "achievements", label: "Achievements", iconType: "trophy" },
];

export type GalleryMoment = {
  readonly id: string;
  readonly title: string;
  readonly category: GalleryCategory;
  readonly institution: GalleryInstitution;
  readonly institutionLabel: string;
  readonly subcategory?: string;
  readonly type: "image" | "quote" | "video";
  readonly src?: string;
  readonly alt?: string;
  readonly videoUrl?: string;
  readonly quote?: {
    readonly text: string;
    readonly author: string;
  };
};

export const GALLERY_MOMENTS: readonly GalleryMoment[] = [
  // --- ROW 1 ---
  {
    id: "moment-1",
    title: "WebSurfer Industry AI & Computing Lab",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "websurfer",
    type: "image",
    src: "/gallery/Bachelors/Academic/ai.jpeg",
    alt: "University students in interactive AI workshop and computing lab",
  },
  {
    id: "moment-2",
    title: "A-Levels Campus Life & Student Celebrations",
    category: "campus-life",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "student-life",
    type: "image",
    src: "/gallery/A-levels/Events/xyz1.jpeg",
    alt: "A-Levels students on campus during annual events",
  },
  {
    id: "moment-3",
    title: "Higher Secondary Holi Fest & Campus Celebrations",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "event-management",
    type: "image",
    src: "/gallery/Higher Secondary/Events/HOLI.jpeg",
    alt: "+2 cohort celebrating Spring Holi with vibrant organic colors on campus",
  },

  // --- ROW 2 ---
  {
    id: "moment-4",
    title: "Primary Interactive Smart Classroom",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "tech-3di",
    type: "image",
    src: "/sections/nami/level-school.jpg",
    alt: "Primary school faculty teaching in interactive modern classroom",
  },
  {
    id: "moment-5",
    title: "A-Levels Inter-House Basketball League",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz.jpeg",
    alt: "A-Levels students playing basketball in sports fixture",
  },
  {
    id: "moment-6",
    title: "Cross Web Data Innovation & Computing Laboratory",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "cross-web",
    type: "image",
    src: "/gallery/Bachelors/Academic/ai1.jpeg",
    alt: "Students coding and working in university computing laboratory",
  },

  // --- ROW 3 ---
  {
    id: "moment-7",
    title: "A-Levels Cultural Fest & Stage Performances",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "arts-crafts",
    type: "image",
    src: "/gallery/A-levels/Events/xyz.jpeg",
    alt: "Students performing cultural and musical items on stage",
  },
  {
    id: "moment-8",
    title: "Inspirational Quote Card",
    category: "all",
    institution: "all",
    institutionLabel: "NAMI",
    type: "quote",
    quote: {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
  },
  {
    id: "moment-9",
    title: "Primary Junior Explorers Walk",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/sections/nami/event-plantation-2022.jpg",
    alt: "Students walking through university campus garden with books",
  },

  // --- ROW 4 ---
  {
    id: "moment-10",
    title: "University Convocation & Degree Award Ceremony",
    category: "achievements",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/Events/graduation.jpeg",
    alt: "Graduating class in formal convocation caps and gowns",
  },
  {
    id: "moment-11",
    title: "Annual Music Fest Live Performance",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "video",
    src: "/sections/nami/event-elite-2023.jpg",
    videoUrl: "/videos/nami-video.mp4",
    alt: "Student musician playing acoustic guitar and singing on stage",
  },
  {
    id: "moment-12",
    title: "A-Levels Graduating Class Farewell Gala",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "student-life",
    type: "image",
    src: "/gallery/A-levels/Events/farewell.jpeg",
    alt: "A-Levels farewell celebration and gathering",
  },

  // ==========================================
  // --- BACHELORS / MASTERS GALLERY MOMENTS ---
  // ==========================================
  {
    id: "bachelors-academic-ai3",
    title: "WebSurfer Telecom & High-Performance Computing Seminar",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "websurfer",
    type: "image",
    src: "/gallery/Bachelors/Academic/ai3.jpeg",
    alt: "Students attending advanced machine learning and computing lecture",
  },
  {
    id: "bachelors-academic-internship",
    title: "Startup Discovery Asia Corporate Internship Induction",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "startup-discovery",
    type: "image",
    src: "/gallery/Bachelors/Academic/internship.jpeg",
    alt: "Bachelors students during corporate internship onboarding",
  },
  {
    id: "bachelors-event-climate-ai",
    title: "Machan Eco-Tourism & Climate AI Symposium",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "machan",
    type: "image",
    src: "/gallery/Bachelors/Events/ClimateAI.jpeg",
    alt: "University symposium focusing on climate change and artificial intelligence",
  },
  {
    id: "bachelors-event-climate-ai-panel",
    title: "Machan Wildlife Resort Sustainability Panel",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "machan",
    type: "image",
    src: "/gallery/Bachelors/Events/ClimateAI1.jpeg",
    alt: "Panel session with experts and students discussing climate solutions",
  },
  {
    id: "bachelors-event-pitchday",
    title: "Startup Discovery Asia Venture Pitch Day",
    category: "achievements",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "startup-discovery",
    type: "image",
    src: "/gallery/Bachelors/Events/pitchday.jpeg",
    alt: "Undergraduate student entrepreneurs pitching business ideas",
  },
  {
    id: "bachelors-event-pitchday-presentation",
    title: "Cross Web Office Automation & Software Showcase",
    category: "events",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "cross-web",
    type: "image",
    src: "/gallery/Bachelors/Events/pitchday1.jpeg",
    alt: "Students presenting technical project before panel of judges",
  },
  {
    id: "bachelors-event-suraj-interior",
    title: "Suraj Interior Architecture & Space Design Study",
    category: "academics",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "suraj-interior",
    type: "image",
    src: "/gallery/Bachelors/College Life/tour.jpeg",
    alt: "University design and engineering students during spatial architecture study",
  },
  {
    id: "bachelors-event-graduation-gala",
    title: "Graduating Batch Convocation Celebration",
    category: "achievements",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/Events/graduation1.jpeg",
    alt: "Graduates celebrating convocation milestone",
  },
  {
    id: "bachelors-sports-esport",
    title: "Inter-University Esports League & Gaming Arena",
    category: "sports",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/Sports/esport.jpeg",
    alt: "Bachelors students competing in university esports tournament",
  },
  {
    id: "bachelors-sports-esport-finals",
    title: "Campus Esports Championship Grand Finals",
    category: "sports",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/Sports/esport1.jpeg",
    alt: "Finals stage match of inter-college gaming cup",
  },
  {
    id: "bachelors-college-life-tour",
    title: "University Educational Excursion & Field Study",
    category: "campus-life",
    institution: "bachelors",
    institutionLabel: "Bachelors / Masters",
    subcategory: "others",
    type: "image",
    src: "/gallery/Bachelors/College Life/tour.jpeg",
    alt: "Bachelors students group photograph during national field excursion",
  },

  // ==========================================
  // --- A-LEVELS GALLERY MOMENTS ---
  // ==========================================
  {
    id: "a-level-academic-1",
    title: "Cambridge A-Levels Classroom & Academic Seminars",
    category: "academics",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "academics",
    type: "image",
    src: "/gallery/A-levels/Academic/xyz.jpeg",
    alt: "A-Levels students engaged in academic seminar",
  },
  {
    id: "a-level-academic-2",
    title: "A-Levels Science Laboratory & Research Practicals",
    category: "academics",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "academics",
    type: "image",
    src: "/gallery/A-levels/Academic/xyz1.jpeg",
    alt: "A-Levels science practicals and laboratory session",
  },
  {
    id: "a-level-academic-3",
    title: "Cambridge Interactive Learning Sessions",
    category: "academics",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "academics",
    type: "image",
    src: "/gallery/A-levels/Academic/xyz2.jpeg",
    alt: "Interactive study and group discussions",
  },
  {
    id: "a-level-sports-karate",
    title: "A-Levels Martial Arts & Karate Demonstration",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/karate.jpeg",
    alt: "Students demonstrating martial arts in the dojo",
  },
  {
    id: "a-level-sports-gala",
    title: "A-Levels Sports Gala & Track Competitions",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz1.jpeg",
    alt: "Track and field sports meet in progress",
  },
  {
    id: "a-level-sports-futsal",
    title: "A-Levels Futsal Championship Tournament",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz2.jpeg",
    alt: "Futsal match action on campus turf",
  },
  {
    id: "a-level-sports-indoor",
    title: "Indoor Games, Badminton & Table Tennis",
    category: "sports",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz3.jpeg",
    alt: "Indoor sports and recreational games",
  },
  {
    id: "a-level-sports-awards",
    title: "Annual Sports Award & Medal Distribution",
    category: "achievements",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "sports",
    type: "image",
    src: "/gallery/A-levels/Sports/xyz4.jpeg",
    alt: "Students receiving awards and medals",
  },
  {
    id: "a-level-events-farewell-2",
    title: "Farewell Felicitations & Batch Celebration",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "student-life",
    type: "image",
    src: "/gallery/A-levels/Events/farewell1.jpeg",
    alt: "Students celebrating with teachers and classmates",
  },
  {
    id: "a-level-events-freshers",
    title: "A-Levels Orientation & Welcome Reception",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "student-life",
    type: "image",
    src: "/gallery/A-levels/Events/xyz2.jpeg",
    alt: "New batch welcome ceremonies and campus orientation",
  },
  {
    id: "a-level-social-services-camp",
    title: "Mustang Academic & Community Service Trip",
    category: "events",
    institution: "a-levels",
    institutionLabel: "A-Levels",
    subcategory: "social-services",
    type: "image",
    src: "/sections/nami/hero-mustang.jpg",
    alt: "A-Levels students on community and ecological trip in Mustang",
  },

  // ==========================================
  // --- HIGHER SECONDARY (+2) GALLERY MOMENTS ---
  // ==========================================
  {
    id: "moment-higher-sec-hotel-management",
    title: "Hotel Management Culinary & Table Service Practicals",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "academic-tours",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/HotelManagementHandsOnlearning.jpeg",
    alt: "+2 Hotel Management students demonstrating culinary and guest service skills",
  },
  {
    id: "moment-higher-sec-hotel-management-2",
    title: "Hospitality Industry Simulation Laboratory",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "academic-tours",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/HotelManagementHandsOnlearning1.jpeg",
    alt: "Hospitality students preparing dining presentation",
  },
  {
    id: "moment-higher-sec-kist-fair",
    title: "KIST Science & Technology Innovation Fair 2081",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "science-tech",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/KIST FAIR- 2081.jpeg",
    alt: "+2 Science students showcasing science and engineering models at KIST Fair",
  },
  {
    id: "moment-higher-sec-kist-fair-2",
    title: "Robotics & Hardware Prototype Demonstration",
    category: "academics",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "science-tech",
    type: "image",
    src: "/gallery/Higher Secondary/Academic/KIST FAIR1- 2081.jpeg",
    alt: "Students presenting engineering projects to visitors",
  },
  {
    id: "moment-higher-sec-event-plastic",
    title: "Zero Plastic 2040 Campus Sustainability Pledge",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "event-management",
    type: "image",
    src: "/gallery/Higher Secondary/Events/Zero Plastic 2040.jpg",
    alt: "+2 students and teachers taking the Zero Plastic 2040 pledge on campus",
  },
  {
    id: "moment-higher-sec-art-competition",
    title: "Intra-School Visual Arts & Creative Painting Contest",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "art-literature",
    type: "image",
    src: "/gallery/Higher Secondary/Events/intra-school art competition .jpeg",
    alt: "+2 students creating paintings and sketches during art competition",
  },
  {
    id: "moment-higher-sec-art-competition-2",
    title: "Fine Arts Exhibition & Gallery Presentation",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "art-literature",
    type: "image",
    src: "/gallery/Higher Secondary/Events/intra-school art competition 1.jpeg",
    alt: "Creative art showcase displayed along the campus corridor",
  },
  {
    id: "moment-higher-sec-social-service",
    title: "Youth Social Service Club Community Drive",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "social-service",
    type: "image",
    src: "/gallery/Higher Secondary/Events/Social Service Club.jpeg",
    alt: "+2 Social Service Club students leading community awareness drive",
  },
  {
    id: "moment-higher-sec-social-service-2",
    title: "Campus Blood Donation & Health Campaign",
    category: "events",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "social-service",
    type: "image",
    src: "/gallery/Higher Secondary/Events/Social Service Club1.jpeg",
    alt: "Students organizing health camp and blood donation registration",
  },
  {
    id: "moment-higher-sec-sports-1",
    title: "Basketball Tournament 2082 Championship Victory",
    category: "sports",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "sports-club",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/Basketball Tournament—2082.jpeg",
    alt: "Higher Secondary basketball team lifting championship trophy",
  },
  {
    id: "moment-higher-sec-sports-2",
    title: "Inter-College Basketball Championship Match",
    category: "sports",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "sports-club",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/Basketball Tournament—20821.jpeg",
    alt: "+2 basketball match in progress with roaring crowds",
  },
  {
    id: "moment-higher-sec-futsal",
    title: "Annual +2 Futsal Championship League",
    category: "sports",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "sports-club",
    type: "image",
    src: "/gallery/Higher Secondary/Sports/futsal.jpeg",
    alt: "Action photograph from the +2 futsal tournament finals",
  },
  {
    id: "moment-higher-sec-tour",
    title: "Higher Secondary Educational & Cultural Excursion",
    category: "campus-life",
    institution: "higher-secondary",
    institutionLabel: "Higher Secondary (+2)",
    subcategory: "academic-tours",
    type: "image",
    src: "/gallery/Higher Secondary/School Life/Educational Tour.jpeg",
    alt: "Group photograph of students during educational tour",
  },

  // ==========================================
  // --- PRIMARY SCHOOL GALLERY MOMENTS ---
  // ==========================================
  {
    id: "moment-primary-1",
    title: "Math Olympiad & Mental Math Champions",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "academics-math",
    type: "image",
    src: "/gallery/Primary School/Academic/Math Olympiad 2026.jpg",
    alt: "Primary pupils celebrating Math Olympiad achievements",
  },
  {
    id: "moment-primary-2",
    title: "Basantapur Heritage & History Excursion",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/Academic/Basantapur Square academicvisit.jpg",
    alt: "Primary school students visiting Basantapur Durbar Square",
  },
  {
    id: "moment-primary-3",
    title: "Interactive Human Number Line Activity",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "academics-math",
    type: "image",
    src: "/gallery/Primary School/Academic/Human Number Line Activity.jpg",
    alt: "Pupils learning mathematics on the courtyard number line",
  },
  {
    id: "moment-primary-4",
    title: "World Day for Cultural Diversity Celebrations",
    category: "events",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/Cultural/World Day for Cultural Diversity 2026.jpg",
    alt: "Primary school cultural diversity day performances and traditional attire",
  },
  {
    id: "moment-primary-5",
    title: "National Literacy & Book Reading Week",
    category: "events",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/Events/Literacy week.jpg",
    alt: "Students engaging in library storytelling and reading activities",
  },
  {
    id: "moment-primary-6",
    title: "Claymation & Creative Art Workshop",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/School Life/CLAYMATION.jpg",
    alt: "Primary pupils crafting stop-motion clay characters",
  },
  {
    id: "moment-primary-7",
    title: "Field Trip to the National Museum of Nepal",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "others",
    type: "image",
    src: "/gallery/Primary School/School Life/field trip to the National Museum of Nepal.jpg",
    alt: "Primary children discovering historic artifacts at the national museum",
  },
  {
    id: "moment-primary-8",
    title: "Play Nepal Inter-School Obstacle Course Challenge",
    category: "sports",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "sports-playnepal",
    type: "image",
    src: "/gallery/Primary School/Sports/Play Nepal IOCC 2026 Obstacle Challenge.jpg",
    alt: "Primary pupils navigating athletic obstacle course challenges",
  },
  {
    id: "moment-primary-9",
    title: "International Open Friendship Taekwondo Championship",
    category: "sports",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "sports-playnepal",
    type: "image",
    src: "/gallery/Primary School/Sports/25th Anniversary of IOFTC & 15th International Open Friendship Taekwondo Championship 2025.jpeg",
    alt: "Primary martial arts pupils with championship medals and certificates",
  },
  {
    id: "moment-primary-10",
    title: "3Di School Innovation & Science Exploration",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "tech-3di",
    type: "image",
    src: "/gallery/Primary School/Academic/identifying living and non-living things.jpg",
    alt: "Primary students working with 3Di science models and specimens",
  },
  {
    id: "moment-primary-11",
    title: "Zero Waste & Ecological Stewardship Workshop",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "tech-3di",
    type: "image",
    src: "/gallery/Primary School/School Life/Zero Waste Workshop.jpg",
    alt: "Primary pupils learning zero-waste recycling and sustainability practices",
  },
  {
    id: "moment-primary-12",
    title: "Mero Coding Robotics & Project Model Making",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "mero-coding",
    type: "image",
    src: "/gallery/Primary School/School Life/project model-making.jpg",
    alt: "Primary pupils building project models and exploring coding logic",
  },
  {
    id: "moment-primary-13",
    title: "Mero Coding Digital Logic & Career Horizons",
    category: "academics",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "mero-coding",
    type: "image",
    src: "/gallery/Primary School/Academic/career path.jpg",
    alt: "Primary students attending computational thinking and tech workshop",
  },
  {
    id: "moment-primary-14",
    title: "Samatva Wellness Yoga & Mindfulness Practice",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "samatva-wellness",
    type: "image",
    src: "/gallery/Primary School/School Life/yoga.jpg",
    alt: "Primary children practicing mindful movement and yoga on campus",
  },
  {
    id: "moment-primary-15",
    title: "Samatva Oral Health & Hygiene Awareness Camp",
    category: "campus-life",
    institution: "primary",
    institutionLabel: "Primary",
    subcategory: "samatva-wellness",
    type: "image",
    src: "/gallery/Primary School/School Life/Oral Health Camp and Oral Hygiene Awareness Session.jpg",
    alt: "Primary pupils in health and hygiene education workshop",
  },
];
