import type { ContentImage } from "@/lib/content";

export type ALevelsClubActivity = {
  readonly title: string;
  readonly description: string;
  readonly tag: string;
};

export type ALevelsClubGalleryPhoto = {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly width: number;
  readonly height: number;
};

export type ALevelsClub = {
  /** The club page's web address: /institutions/a-levels/clubs/{slug}. */
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly tagline: string;
  readonly metaDescription: string;
  readonly coverImage: ContentImage;
  readonly overview: readonly string[];
  readonly quote: {
    readonly text: string;
    readonly author: string;
  };
  readonly objectives: readonly string[];
  readonly keyActivities: readonly ALevelsClubActivity[];
  readonly skillsDeveloped: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly galleryImages?: readonly ALevelsClubGalleryPhoto[];
  readonly meetingSchedule: string;
  readonly eligibility: string;
  readonly facultyMentor: string;
};

export const A_LEVELS_CLUBS: readonly ALevelsClub[] = [
  {
    slug: "social-services",
    title: "Social Services",
    category: "Community Outreach & Humanitarian Aid",
    tagline:
      "Driving impactful social initiatives, community outreach camps, disaster relief drives, and social welfare projects.",
    metaDescription:
      "NAMI College A-Levels Social Services Club engages students in community relief camps, blood donation drives, and public welfare campaigns.",
    coverImage: {
      src: "/sections/nami/campus-service-camp.jpg",
      alt: "NAMI College A-Levels students organizing community service materials during an outreach camp.",
      width: 1190,
      height: 793,
    },
    overview: [
      "The Social Services Club at NAMI College embodies the belief that academic brilliance must be matched with social empathy and active civic leadership. The club offers Cambridge A-Level students a structured platform to understand social realities and organize tangible relief for underserved communities across Nepal.",
      "From running annual educational and winter-relief camps in remote hill districts to hosting blood donation drives and partnering with local grassroots shelters, members develop profound empathy, logistical acumen, and ethical leadership.",
    ],
    quote: {
      text: "True leadership begins when we dedicate our knowledge and resources to uplifting the community around us.",
      author: "Social Services Faculty Mentor",
    },
    objectives: [
      "Instill active humanitarian empathy, altruism, and civic responsibility among A-Level students.",
      "Organize annual rural community outreach expeditions delivering education and health aid.",
      "Coordinate quarterly campus blood donation drives and emergency relief campaigns.",
      "Partner with verified non-profits and community organizations across Nepal.",
    ],
    keyActivities: [
      {
        title: "Sindhupalchowk Rural Outreach Camp",
        description:
          "Annual expedition delivering school supplies, winter clothing, and hygiene essentials to rural community schools.",
        tag: "Annual Expedition",
      },
      {
        title: "Campus Blood Donation & Health Drive",
        description:
          "Quarterly blood collection camps organized in partnership with the Nepal Red Cross Society.",
        tag: "Health & Welfare",
      },
      {
        title: "Book & Warm Clothes Collection Drive",
        description:
          "Student-led mobilization drives collecting and distributing study materials to underprivileged youth.",
        tag: "Community Drive",
      },
      {
        title: "Community Tutoring & Literacy Program",
        description:
          "Weekly volunteer tutoring sessions conducted by A-Level students for local municipal school children.",
        tag: "Weekly Volunteering",
      },
    ],
    skillsDeveloped: [
      {
        title: "Empathetic Leadership",
        description:
          "Leading high-impact initiatives with compassion, integrity, and cultural humility.",
      },
      {
        title: "Project Management",
        description:
          "Managing logistical planning, supply chain coordination, and field budgeting.",
      },
      {
        title: "Community Engagement",
        description:
          "Communicating effectively with municipal leaders, non-profit stakeholders, and local families.",
      },
      {
        title: "Crisis Response",
        description:
          "Mobilizing rapid volunteer relief and aid campaigns during national contingencies.",
      },
    ],
    galleryImages: [
      {
        src: "/gallery/Social Service Club/Donation Camp/4-upright.jpg",
        alt: "Community relief supplies and charity package packing",
        caption: "Relief supplies packaging & distribution",
        width: 1800,
        height: 2400,
      },
      {
        src: "/gallery/Social Service Club/Donation Camp/5.jpg",
        alt: "Distributing warm clothing to families",
        caption: "Winter relief & community donation drive",
        width: 960,
        height: 1280,
      },
      {
        src: "/gallery/Social Service Club/Blood Donation/Blood Donation..jpg",
        alt: "Campus blood donation campaign",
        caption: "Quarterly campus blood donation drive",
        width: 986,
        height: 1339,
      },
      {
        src: "/sections/nami/campus-service-camp.jpg",
        alt: "A-Levels student volunteers on rural outreach expedition",
        caption: "Sindhupalchowk rural outreach expedition",
        width: 1190,
        height: 793,
      },
    ],
    meetingSchedule: "Fridays (3:30 PM – 5:00 PM) + Weekend Field Drives",
    eligibility: "Open to all Cambridge A-Level students (AS and A2)",
    facultyMentor: "Department of Social Sciences & Student Affairs",
  },
  {
    slug: "sports",
    title: "Sports",
    category: "Athletics & Competitive Tournaments",
    tagline:
      "Fostering athletic excellence, tactical discipline, stamina, and team spirit through competitive and recreational sports.",
    metaDescription:
      "NAMI College A-Levels Sports Club offers competitive training, 3x3 basketball tournaments, futsal championships, and athletics.",
    coverImage: {
      src: "/sections/nami/campus-basketball-award.jpg",
      alt: "NAMI College A-Levels basketball championship awards ceremony in the campus auditorium.",
      width: 1500,
      height: 1000,
    },
    overview: [
      "The Sports Club at NAMI College is dedicated to cultivating physical fitness, mental toughness, and athletic sportsmanship among A-Level students. Balancing rigorous Cambridge academics with energetic physical play, the club provides an outlet for students to excel on courts, fields, and tracks.",
      "With access to an NBA-standard basketball court, mini-football turf, table tennis facilities, and athletic running tracks, members participate in structured coaching clinics, intra-college house leagues, and prominent valley-wide inter-college tournaments.",
    ],
    quote: {
      text: "Sports instill a winning mindset — discipline in practice, humility in victory, and resilience in defeat.",
      author: "College Athletic Director",
    },
    objectives: [
      "Develop cardiovascular fitness, athletic skill, and bodily wellness alongside academic study.",
      "Promote team camaraderie, mutual accountability, and healthy competitive sportsmanship.",
      "Host signature inter-college invitationals in basketball, futsal, and table tennis.",
      "Prepare student-athletes for national and regional Cambridge sports meets.",
    ],
    keyActivities: [
      {
        title: "NAMI SEE & +2 3x3 Basketball Cup",
        description:
          "Flagship valley-wide 3x3 basketball invitational tournament hosted on the college outdoor court.",
        tag: "Flagship Invitational",
      },
      {
        title: "Inter-House Futsal & Football League",
        description:
          "Seasonal intra-college league running across AS and A2 cohorts on the mini-football turf.",
        tag: "League Tournament",
      },
      {
        title: "Annual Sports Day & Track Meet",
        description:
          "Comprehensive athletic championship featuring sprints, relays, shot put, long jump, and tug-of-war.",
        tag: "Annual Championship",
      },
      {
        title: "Table Tennis & Badminton Open",
        description:
          "Singles and doubles knockout tournament held in the indoor recreation complex.",
        tag: "Indoor Sports",
      },
    ],
    skillsDeveloped: [
      {
        title: "Strategic Teamwork",
        description:
          "Executing tactical game plans and supporting teammates under competitive pressure.",
      },
      {
        title: "Physical Conditioning",
        description:
          "Building endurance, muscular strength, agility, and overall personal wellness.",
      },
      {
        title: "Resilience & Focus",
        description:
          "Maintaining mental composure, concentration, and determination during high-stakes games.",
      },
      {
        title: "Sportsmanship",
        description:
          "Treating opponents, referees, and teammates with unwavering respect and fairness.",
      },
    ],
    galleryImages: [
      {
        src: "/gallery/Sports Club/Annual Sports Meet/Basketball-upright.jpg",
        alt: "Basketball championship match in progress",
        caption: "NAMI SEE & +2 3x3 Basketball Cup",
        width: 2400,
        height: 3200,
      },
      {
        src: "/gallery/Sports Club/Intra Futsal/4fe72723-53bd-4408-a417-776bb9af9ce1.jfif",
        alt: "Intra-college futsal league action on turf",
        caption: "Inter-house futsal league on campus turf",
        width: 1280,
        height: 960,
      },
      {
        src: "/gallery/Sports Club/Annual Sports Meet/Table Tennis.jpg",
        alt: "Table tennis singles knockout match",
        caption: "Table tennis & indoor racket tournament",
        width: 891,
        height: 660,
      },
      {
        src: "/gallery/Sports Club/Inter School Basketball/46dcb38e-ac84-4ac8-b0ea-a11f6cb8f43b.jfif",
        alt: "Inter-college basketball match action",
        caption: "Valley-wide inter-college tournament finals",
        width: 1280,
        height: 960,
      },
    ],
    meetingSchedule: "Tuesdays & Thursdays (3:45 PM – 5:15 PM)",
    eligibility: "Open to all Cambridge A-Level students (AS and A2)",
    facultyMentor: "Department of Physical Education & Sports",
  },
  {
    slug: "arts-and-crafts",
    title: "Arts and crafts",
    category: "Visual Arts, Craftsmanship & Design",
    tagline:
      "Cultivating artistic expression, canvas painting, sculpture, stage installations, and visual craftsmanship.",
    metaDescription:
      "NAMI College A-Levels Arts and Crafts Club provides studio spaces for painting, sketching, sculpting, and art exhibitions.",
    coverImage: {
      src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
      alt: "NAMI College A-Levels arts and craftsmanship exhibition and creative design installations.",
      width: 4000,
      height: 3000,
    },
    overview: [
      "The Arts and Crafts Club at NAMI College provides a vibrant open studio for young artists, sculptors, graphic illustrators, and craftspeople. It celebrates aesthetic creativity as a vital counterpoint to academic rigor, encouraging students to experiment with diverse mediums and techniques.",
      "Members collaborate on fine art exhibitions, theatrical stage set designs, festive campus installations, pottery and clay sculpting, and visual branding for major college festivals.",
    ],
    quote: {
      text: "Art is the voice of imagination. Craft is the disciplined hand that brings vision into tangible reality.",
      author: "Visual Arts Instructor",
    },
    objectives: [
      "Develop refined artistic techniques in sketching, oil/acrylic painting, and mixed-media sculpture.",
      "Host annual campus art exhibitions showcasing student portfolios and conceptual projects.",
      "Design creative stage backdrops, props, and festive installations for college celebrations.",
      "Foster a supportive, collaborative studio space for personal artistic development.",
    ],
    keyActivities: [
      {
        title: "Annual College Art & Design Showcase",
        description:
          "A curated campus gallery featuring student paintings, sculptures, and photographic installations.",
        tag: "Exhibition",
      },
      {
        title: "Festive Stage & Auditorium Installations",
        description:
          "Designing large-scale thematic backdrops and decorative artwork for college galas.",
        tag: "Stage Design",
      },
      {
        title: "Pottery & Clay Modelling Workshops",
        description:
          "Hands-on studio sessions exploring traditional pottery wheels and ceramic sculpting.",
        tag: "Craft Workshop",
      },
      {
        title: "Live Sketching & Plein Air Art Camps",
        description:
          "Outdoor sketching expeditions capturing historical architecture and natural landscapes.",
        tag: "Outdoor Studio",
      },
    ],
    skillsDeveloped: [
      {
        title: "Visual Artistry",
        description:
          "Mastery of color theory, spatial composition, perspective, and various paint media.",
      },
      {
        title: "Craftsmanship & Fabrication",
        description:
          "Working with clay, wood, papier-mâché, textiles, and architectural model materials.",
      },
      {
        title: "Creative Conceptualization",
        description:
          "Transforming abstract themes and personal reflections into compelling visual artworks.",
      },
      {
        title: "Exhibition Curation",
        description:
          "Mounting, lighting, and curating public gallery exhibitions with professional polish.",
      },
    ],
    galleryImages: [
      {
        src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
        alt: "Fine art canvas painting and sketching competition",
        caption: "Live studio painting & fine art showcase",
        width: 4000,
        height: 3000,
      },
      {
        src: "/gallery/Art and literature/Art Competition/20251224_110720.jpg",
        alt: "Creative mixed media and color sketches",
        caption: "Visual arts & mixed-media illustrations",
        width: 4000,
        height: 2252,
      },
      {
        src: "/mascot/event-mascot.jpg",
        alt: "Festive stage installation and mascot design",
        caption: "Stage mascot & decorative installations",
        width: 1000,
        height: 750,
      },
      {
        src: "/nami/campus-reading-hall.jpg",
        alt: "College gallery and art exhibition",
        caption: "Annual campus art & craft gallery",
        width: 1200,
        height: 800,
      },
    ],
    meetingSchedule: "Mondays & Thursdays (3:30 PM – 4:45 PM)",
    eligibility: "Open to all Cambridge A-Level students (AS and A2)",
    facultyMentor: "Department of Fine Arts & Design",
  },
];

export function findALevelsClub(slug: string): ALevelsClub | null {
  return A_LEVELS_CLUBS.find((club) => club.slug === slug) ?? null;
}
