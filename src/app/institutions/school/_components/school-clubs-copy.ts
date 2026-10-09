import type { ContentImage } from "@/lib/content";

export type ClubActivity = {
  readonly title: string;
  readonly description: string;
  readonly tag: string;
};

export type ClubGalleryPhoto = {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly width: number;
  readonly height: number;
};

export type SchoolClub = {
  /** The club page's web address: /institutions/school/clubs/{slug}. */
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
  readonly keyActivities: readonly ClubActivity[];
  readonly skillsDeveloped: readonly {
    readonly title: string;
    readonly description: string;
  }[];
  readonly galleryImages?: readonly ClubGalleryPhoto[];
  readonly meetingSchedule: string;
  readonly eligibility: string;
  readonly facultyMentor: string;
};

export const SCHOOL_CLUBS: readonly SchoolClub[] = [
  {
    slug: "sports-club",
    title: "Sports Club",
    category: "Athletics & Physical Fitness",
    tagline:
      "Fostering athleticism, discipline, teamwork, and sportsmanship through competitive and recreational sports.",
    metaDescription:
      "NAMI International School Sports Club promotes fitness, inter-house leagues, basketball tournaments, and football championships for all student grades.",
    coverImage: {
      src: "/gallery/Sports Club/Annual Sports Meet/Basketball-upright.jpg",
      alt: "NAMI International School students engaged in competitive sports and basketball tournaments.",
      width: 2400,
      height: 3200,
    },
    overview: [
      "The NAMI Sports Club is dedicated to building strong physical health, stamina, and camaraderie among students. We believe sports teach values that extend far beyond the pitch — resilience under pressure, strategic thinking, mutual trust, and humble victory.",
      "With access to an NBA-standard basketball court, a mini-football field, table tennis arenas, and athletic running tracks, members participate in weekly training sessions, intra-school house leagues, and regional inter-school championships under the guidance of certified sports coaches.",
    ],
    quote: {
      text: "Sports do not merely build character — they reveal it on the court and shape lifelong leaders.",
      author: "Sports Club Coordinator",
    },
    objectives: [
      "Develop athletic prowess, cardiovascular fitness, and fundamental movement skills.",
      "Promote the values of sportsmanship, fairness, and perseverance.",
      "Provide regular opportunities for competitive and friendly sporting fixtures.",
      "Identify and nurture student athletic talent for national and regional tournaments.",
    ],
    keyActivities: [
      {
        title: "Annual Sports Meet & Athletic Championship",
        description:
          "The flagship school-wide athletic event featuring track & field races, relay sprints, long jump, and house championships.",
        tag: "Annual Flagship",
      },
      {
        title: "Inter-House Football & Futsal League",
        description:
          "Seasonal tournaments across junior and senior divisions on the school's mini-football ground.",
        tag: "Tournament",
      },
      {
        title: "SEE & +2 3x3 Basketball Cup",
        description:
          "High-energy 3x3 basketball invitational tournament hosting teams across Kathmandu valley.",
        tag: "Invitational",
      },
      {
        title: "Weekly Fitness & Conditioning Clinics",
        description:
          "Regular training sessions covering endurance building, agility drills, and yoga/stretching routines.",
        tag: "Weekly Routine",
      },
    ],
    skillsDeveloped: [
      {
        title: "Teamwork & Synergy",
        description:
          "Understanding individual roles within a team to achieve shared collective victory.",
      },
      {
        title: "Resilience & Mental Toughness",
        description:
          "Bouncing back from setbacks and maintaining composure during high-stakes moments.",
      },
      {
        title: "Tactical Acumen",
        description:
          "Quick decision-making, spatial awareness, and strategic planning in real time.",
      },
      {
        title: "Physical Wellness",
        description:
          "Establishing lifelong habits of cardiovascular fitness and bodily health.",
      },
    ],
    galleryImages: [
      {
        src: "/gallery/Sports Club/Annual Sports Meet/Basketball-upright.jpg",
        alt: "Inter-house basketball championship fixture",
        caption: "Inter-house basketball championship match",
        width: 2400,
        height: 3200,
      },
      {
        src: "/gallery/Sports Club/Intra Futsal/4fe72723-53bd-4408-a417-776bb9af9ce1.jfif",
        alt: "Intra-school futsal tournament on the green turf ground",
        caption: "Intra-school green turf futsal league",
        width: 1280,
        height: 960,
      },
      {
        src: "/gallery/Sports Club/Annual Sports Meet/Carrom.JPG",
        alt: "Indoor carrom championship round",
        caption: "Indoor precision carrom contest",
        width: 6000,
        height: 4000,
      },
      {
        src: "/gallery/Sports Club/Inter School Basketball/46dcb38e-ac84-4ac8-b0ea-a11f6cb8f43b.jfif",
        alt: "Valley-wide inter-school basketball playoffs",
        caption: "Inter-school basketball invitational cup",
        width: 1280,
        height: 960,
      },
    ],
    meetingSchedule: "Tuesdays & Thursdays (3:30 PM – 5:00 PM)",
    eligibility: "Open to students from Grade 1 to Grade 12 (+2)",
    facultyMentor: "Department of Physical Education & Sports",
  },
  {
    slug: "art-and-literature-club",
    title: "Art and Literature Club",
    category: "Creative Expression & Humanities",
    tagline:
      "Igniting imagination, storytelling, poetic expression, visual arts, and literary appreciation.",
    metaDescription:
      "Explore creative writing, fine arts, drama, poetry, and publishing with the NAMI International School Art and Literature Club.",
    coverImage: {
      src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
      alt: "Students showcasing artistic creativity and live painting during the school art competition.",
      width: 4000,
      height: 3000,
    },
    overview: [
      "The Art and Literature Club serves as the creative heartbeat of NAMI International School. It is an open studio and salon where young authors, poets, painters, illustrators, and theatrical performers converge to celebrate the beauty of human expression.",
      "From writing short fiction and reciting poetry to acrylic canvas painting, clay sculpting, and staging dramatic plays, students are encouraged to find their unique voice and express bold perspectives.",
    ],
    quote: {
      text: "Art gives form to our deepest feelings, and words give wings to our wildest imaginations.",
      author: "Literary Faculty Advisor",
    },
    objectives: [
      "Cultivate refined creative writing, storytelling, and poetic composition skills in English and Nepali.",
      "Foster artistic techniques in sketching, acrylic painting, sculpture, and mixed media.",
      "Encourage public speaking, theatrical performance, and debate among students.",
      "Publish the annual student-curated school literary magazine and art anthology.",
    ],
    keyActivities: [
      {
        title: "Annual School Art & Sculpture Exhibition",
        description:
          "A curated public gallery showcasing paintings, clay models, and craftwork created by students across all grades.",
        tag: "Exhibition",
      },
      {
        title: "Poetry Slam & Creative Writing Fest",
        description:
          "Spoken-word sessions and flash-fiction competitions celebrating diverse literary voices.",
        tag: "Festival",
      },
      {
        title: "Theatrical Drama & Monologue Showcase",
        description:
          "Full-stage plays and Shakespearean/Nepali drama staged inside the 250+ seat school auditorium.",
        tag: "Performance",
      },
      {
        title: "The Lotus Quill — School Magazine Publishing",
        description:
          "Student-led editorial board producing the school's periodic literary journal and gazette.",
        tag: "Publishing",
      },
    ],
    skillsDeveloped: [
      {
        title: "Creative Artistry",
        description:
          "Mastery of visual composition, color theory, brushwork, and conceptual crafting.",
      },
      {
        title: "Articulate Storytelling",
        description:
          "Expressing complex human emotions and structured narratives with eloquence.",
      },
      {
        title: "Critical Thinking",
        description:
          "Analyzing classic and contemporary literature to develop nuanced philosophical worldviews.",
      },
      {
        title: "Stage Presence",
        description:
          "Confidence in public speaking, declamation, and theatrical expression.",
      },
    ],
    galleryImages: [
      {
        src: "/gallery/Art and literature/Art Competition/20251224_101654.jpg",
        alt: "Pupils immersed in live watercolor and sketching contest",
        caption: "Live sketching & acrylic painting competition",
        width: 4000,
        height: 3000,
      },
      {
        src: "/gallery/Art and literature/Art Competition/20251224_110720.jpg",
        alt: "Creative artwork and visual illustrations in classroom",
        caption: "Classroom mixed-media art studio",
        width: 4000,
        height: 2252,
      },
      {
        src: "/gallery/Art and literature/PPts/IMG-42c20df59da55331efb1eb2055eddc72-V.jpg",
        alt: "Digital storytelling and literature presentation slide deck",
        caption: "Digital storytelling & prose presentation",
        width: 1191,
        height: 717,
      },
      {
        src: "/gallery/Art and literature/PPts/IMG-b5bc243a81739f47f9b8eb0ea6f3de35-V.jpg",
        alt: "Poetic analysis and creative writing review",
        caption: "Poetry critique & literary analysis",
        width: 973,
        height: 709,
      },
    ],
    meetingSchedule: "Wednesdays & Fridays (3:30 PM – 4:45 PM)",
    eligibility: "Open to students from Grade 1 to Grade 12 (+2)",
    facultyMentor: "Department of Languages & Fine Arts",
  },
  {
    slug: "event-management-club",
    title: "Event Management Club",
    category: "Leadership & Stage Operations",
    tagline:
      "Orchestrating memorable school functions, cultural galas, assemblies, and stage productions.",
    metaDescription:
      "Learn public relations, stage lighting, sound engineering, logistics, and executive event coordination with NAMI Event Management Club.",
    coverImage: {
      src: "/gallery/Event Management/Award & Cultural/DSC08026.JPG",
      alt: "NAMI International School auditorium stage and cultural performance prepared for a grand student production.",
      width: 4734,
      height: 4000,
    },
    overview: [
      "The Event Management Club is the powerhouse behind every major event, assembly, cultural festival, and ceremony at NAMI International School. Students learn the intricate arts of event design, timeline planning, sound engineering, backstage coordination, and hospitality management.",
      "Members collaborate with faculty and student council to plan budgets, design invitations, manage stage lighting, anchor ceremonies, and ensure that every school celebration runs with seamless precision.",
    ],
    quote: {
      text: "Behind every great show is an invisible team whose precision and passion make magic look effortless.",
      author: "Event Club President",
    },
    objectives: [
      "Master end-to-end event planning, budgeting, hospitality, and scheduling.",
      "Operate professional audio-visual, acoustic, and lighting equipment in the auditorium.",
      "Develop executive leadership, crisis management, and diplomatic communication skills.",
      "Host memorable assemblies, guest lectures, cultural festivals, and graduation galas.",
    ],
    keyActivities: [
      {
        title: "Annual Day & Cultural Extravaganza",
        description:
          "End-to-end management of the school's signature annual showcase, coordinating 500+ performers and guests.",
        tag: "Mega Production",
      },
      {
        title: "Teachers' Day & Children's Day Galas",
        description:
          "Student-curated celebrations with stage surprises, awards, and entertainment programs.",
        tag: "Celebration",
      },
      {
        title: "Guest Speaker & Leadership Series",
        description:
          "Hosting diplomats, entrepreneurs, and thought leaders for auditorium panel discussions.",
        tag: "Symposium",
      },
      {
        title: "Backstage & AV Technical Workshops",
        description:
          "Hands-on training in stage acoustics, digital mixers, spotlighting, and broadcast live-streaming.",
        tag: "Technical Training",
      },
    ],
    skillsDeveloped: [
      {
        title: "Executive Leadership",
        description:
          "Leading cross-functional teams and assigning responsibilities under time constraints.",
      },
      {
        title: "Crisis Resolution",
        description:
          "Thinking on your feet to resolve unexpected technical or logistical issues calmly.",
      },
      {
        title: "Public Emceeing & PR",
        description:
          "Polished stage presence, professional announcing, and audience engagement.",
      },
      {
        title: "AV Production & Tech",
        description:
          "Operating modern digital soundboards, acoustic consoles, and multimedia projectors.",
      },
    ],
    galleryImages: [
      {
        src: "/gallery/Event Management/Award & Cultural/DSC08026.JPG",
        alt: "Cultural dance performance and stage lighting in auditorium",
        caption: "Auditorium stage lighting & cultural performance",
        width: 4734,
        height: 4000,
      },
      {
        src: "/gallery/Event Management/Award & Cultural/3.jpg",
        alt: "Annual awards ceremony and student honors",
        caption: "Annual awards & ceremony protocol",
        width: 2231,
        height: 2149,
      },
      {
        src: "/gallery/Event Management/Orientation Program/_GN_1060.jpg",
        alt: "Orientation assembly in the main auditorium",
        caption: "Auditorium orientation assembly",
        width: 6641,
        height: 4427,
      },
      {
        src: "/gallery/Event Management/Welcome Program/IMG_9595.JPG",
        alt: "Stage lighting and technical coordination",
        caption: "Stage lighting & audio-visual management",
        width: 5282,
        height: 3521,
      },
    ],
    meetingSchedule: "Mondays & Thursdays (3:30 PM – 5:00 PM)",
    eligibility: "Open to students from Grade 6 to Grade 12 (+2)",
    facultyMentor: "Student Affairs & Cultural Committee",
  },
  {
    slug: "social-service-club",
    title: "Social Service Club",
    category: "Community Outreach & Sustainability",
    tagline:
      "Cultivating empathy, humanitarian outreach, environmental stewardship, and civic responsibility.",
    metaDescription:
      "Engage in community service camps, environmental tree plantation, disaster relief drives, and social welfare with NAMI Social Service Club.",
    coverImage: {
      src: "/gallery/Social Service Club/Donation Camp/4-upright.jpg",
      alt: "NAMI International School students distributing relief materials during a community service outreach camp.",
      width: 1800,
      height: 2400,
    },
    overview: [
      "Rooted in the NAMI philosophy that education must contribute meaningfully to society, the Social Service Club instills deep civic consciousness and active compassion in every member. We believe that true education is measured by how effectively we uplift those around us.",
      "The club organizes community service camps in rural districts, environmental cleanups along local river corridors, textbook donation drives, and sustainability campaigns to protect Nepal's natural ecology.",
    ],
    quote: {
      text: "The smallest act of kindness is worth more than the grandest intention. We serve because we care.",
      author: "Service Learning Coordinator",
    },
    objectives: [
      "Instill empathy, social consciousness, and altruism as core personal virtues.",
      "Organize recurring relief drives, health awareness camps, and educational support programs.",
      "Champion environmental sustainability through tree plantations and zero-waste campus drives.",
      "Partner with verified non-profits and community organizations across Nepal.",
    ],
    keyActivities: [
      {
        title: "Rural Outreach & Relief Camp (Sindhupalchowk)",
        description:
          "Annual field expedition delivering educational supplies, warm winter clothes, and health aid to mountain community schools.",
        tag: "Outreach Camp",
      },
      {
        title: "World Environment Day Tree Plantation",
        description:
          "Afforestation drives planting indigenous saplings across Gokarneshwor and surrounding community forests.",
        tag: "Ecology",
      },
      {
        title: "Book & Warm Clothes Donation Drive",
        description:
          "Student-led collection and distribution campaigns assisting underprivileged children and elderly care homes.",
        tag: "Charity Drive",
      },
      {
        title: "Clean Campus & Zero-Waste Campaign",
        description:
          "Workshops on waste segregation, organic composting, and reducing single-use plastics.",
        tag: "Sustainability",
      },
    ],
    skillsDeveloped: [
      {
        title: "Empathetic Citizenship",
        description:
          "Gaining deep perspective on social disparities and active ways to contribute to national well-being.",
      },
      {
        title: "Community Mobilization",
        description:
          "Rallying peers, parents, and community stakeholders for impactful charitable causes.",
      },
      {
        title: "Environmental Stewardship",
        description:
          "Understanding ecological systems and practical carbon-reduction strategies.",
      },
      {
        title: "Ethical Leadership",
        description:
          "Leading initiatives with integrity, transparency, and genuine respect for diverse communities.",
      },
    ],
    galleryImages: [
      {
        src: "/gallery/Social Service Club/Donation Camp/4-upright.jpg",
        alt: "Student volunteers packaging community relief kits",
        caption: "Relief kit sorting & charity packaging",
        width: 1800,
        height: 2400,
      },
      {
        src: "/gallery/Social Service Club/Donation Camp/5.jpg",
        alt: "Distributing warm clothing to community families",
        caption: "Winter relief & clothing distribution",
        width: 960,
        height: 1280,
      },
      {
        src: "/gallery/Social Service Club/Blood Donation/Blood Donation..jpg",
        alt: "Campus blood donation camp banner",
        caption: "Campus voluntary blood donation drive",
        width: 986,
        height: 1339,
      },
      {
        src: "/gallery/Social Service Club/Blood Donation/IMG-c96541748440d49ea99a6c662ccc1edd-V.jpg",
        alt: "Youth volunteers supporting medical donors",
        caption: "Youth medical volunteer support",
        width: 913,
        height: 1438,
      },
    ],
    meetingSchedule: "Fridays (3:30 PM – 5:00 PM) + Weekend Field Trips",
    eligibility: "Open to students from Grade 1 to Grade 12 (+2)",
    facultyMentor: "Social Sciences & Community Outreach Cell",
  },
  {
    slug: "science-and-technology-club",
    title: "Science and Technology Club",
    category: "STEM, Robotics & Innovation",
    tagline:
      "Exploring scientific frontiers, robotics, software coding, and experimental discovery.",
    metaDescription:
      "Build robots, code software, conduct laboratory experiments, and innovate at the NAMI International School Science and Technology Club.",
    coverImage: {
      src: "/gallery/Science & Tech/bio Excursion/IMG-4c57ac4b6ca59fd28fd1d147218f6fe3-V.jpg",
      alt: "Students conducting biological field research and science experiments in the advanced NAMI science laboratory.",
      width: 1600,
      height: 900,
    },
    overview: [
      "The Science and Technology Club is a dynamic incubator for young inventors, coders, aspiring engineers, and curious researchers. From building autonomous micro-robots and writing Python algorithms to conducting chemical titration experiments, members explore how STEM transforms our world.",
      "Leveraging modern science laboratories, high-speed computer labs, and interactive hardware toolkits, students translate classroom theory into hands-on inventions that solve real-world challenges.",
    ],
    quote: {
      text: "Science is not just a subject — it is a way of questioning, experimenting, and innovating for the future.",
      author: "STEM Club Mentor",
    },
    objectives: [
      "Foster rigorous scientific methodology, inquiry-based thinking, and hypothesis testing.",
      "Teach practical software programming, web development, and robotics hardware interfacing.",
      "Conduct engaging laboratory experiments across Physics, Chemistry, and Biological sciences.",
      "Prepare student teams for national STEM fairs, hackathons, and science olympiads.",
    ],
    keyActivities: [
      {
        title: "Annual STEM & Science Innovation Fair",
        description:
          "Student teams present working prototypes, automated robots, and scientific research posters to expert judges.",
        tag: "Innovation Fair",
      },
      {
        title: "Robotics & Microcontroller Workshop",
        description:
          "Hands-on building of line-following bots, obstacle sensors, and automated smart-home circuits.",
        tag: "Robotics",
      },
      {
        title: "Coding Hackathon & App Challenge",
        description:
          "A 24-hour collaborative coding sprint designing software solutions for educational and everyday problems.",
        tag: "Hackathon",
      },
      {
        title: "Practical Laboratory Masterclasses",
        description:
          "Advanced titration, molecular biology extraction, and physics optics experiments beyond standard textbooks.",
        tag: "Lab Masterclass",
      },
    ],
    skillsDeveloped: [
      {
        title: "Algorithmic & Computational Thinking",
        description:
          "Decomposing complex problems into logical, code-driven step-by-step algorithms.",
      },
      {
        title: "Hardware Engineering",
        description:
          "Working with microcontrollers, breadboards, sensors, servos, and electronic circuits.",
      },
      {
        title: "Empirical Research",
        description:
          "Designing rigorous experiments, recording accurate data, and drawing evidence-backed conclusions.",
      },
      {
        title: "Innovation Mindset",
        description:
          "Transforming abstract theoretical concepts into functional physical and digital prototypes.",
      },
    ],
    galleryImages: [
      {
        src: "/gallery/Science & Tech/bio Excursion/IMG-4c57ac4b6ca59fd28fd1d147218f6fe3-V.jpg",
        alt: "Students exploring botanical species during outdoor field excursion",
        caption: "Outdoor biology field excursion & research",
        width: 1600,
        height: 900,
      },
      {
        src: "/gallery/Science & Tech/bio Excursion/IMG-f46f1eb2db148ca96464c442f1ba0e6c-V.jpg",
        alt: "Botanical taxonomy and field observation",
        caption: "Botanical taxonomy & nature study",
        width: 1600,
        height: 900,
      },
      {
        src: "/sections/nami/nami-school-science-lab.jpg",
        alt: "Junior science laboratory practical demonstration",
        caption: "Hands-on laboratory apparatus & experiments",
        width: 1000,
        height: 750,
      },
      {
        src: "/sections/nami/nami-school-computer-lab.jpg",
        alt: "Digital ICT and coding workstations",
        caption: "ICT coding & digital literacy workshops",
        width: 1000,
        height: 750,
      },
    ],
    meetingSchedule: "Tuesdays & Wednesdays (3:30 PM – 5:00 PM)",
    eligibility: "Open to students from Grade 3 to Grade 12 (+2)",
    facultyMentor: "Department of Science & Computer Studies",
  },
];

export function findSchoolClub(slug: string): SchoolClub | null {
  return SCHOOL_CLUBS.find((club) => club.slug === slug) ?? null;
}
