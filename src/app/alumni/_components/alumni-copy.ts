import type { CareersMastheadCopy } from "@/app/careers/_components/careers-masthead";
import type { SectionCopy } from "@/lib/content";

export type AlumniMetric = {
  readonly stat: string;
  readonly label: string;
  readonly detail: string;
};

export type AlumniEmployer = {
  readonly id: string;
  readonly name: string;
  readonly sector: string;
  readonly logoSrc?: string | null;
};

export const alumniEmployers: readonly AlumniEmployer[] = [
  {
    id: "leapfrog",
    name: "Leapfrog Technology",
    sector: "Software & AI Solutions",
    logoSrc: "/logos/careers/Leapfrog.png.webp",
  },
  {
    id: "khalti",
    name: "Khalti Digital Wallet",
    sector: "Fintech & Payments",
    logoSrc: "/logos/careers/640px-Khalti_Digital_Wallet_Logo.png.jpg.webp",
  },
  {
    id: "esewa",
    name: "eSewa",
    sector: "Digital Payments",
    logoSrc: "/logos/careers/esewa.png.webp",
  },
  {
    id: "fonepay",
    name: "Fonepay",
    sector: "Payment Network",
    logoSrc: "/logos/careers/fonepay-1.png.webp",
  },
  {
    id: "ime-pay",
    name: "IME Pay",
    sector: "Fintech & Digital Wallet",
    logoSrc: "/logos/careers/IME-Pay-Logo.png.webp",
  },
  {
    id: "cloud-factory",
    name: "CloudFactory",
    sector: "Data & AI Solutions",
    logoSrc: "/logos/careers/cloud-factory.png.webp",
  },
  {
    id: "pathao",
    name: "Pathao Nepal",
    sector: "Consumer Tech & Mobility",
    logoSrc:
      "/logos/careers/Pathao-Logo_Horizontal_with_TagLine-e1706002895600.png.webp",
  },
  {
    id: "genese",
    name: "Genese Solutions",
    sector: "Cloud & DevOps",
    logoSrc: "/logos/careers/genese.png.webp",
  },
  {
    id: "logpoint",
    name: "Logpoint",
    sector: "Cybersecurity & SIEM",
    logoSrc: "/logos/careers/logpoint.png.webp",
  },
  {
    id: "treeleaf",
    name: "Treeleaf Technologies",
    sector: "AI & Embedded Systems",
    logoSrc: "/logos/careers/Treeleaf-final.jpeg.webp",
  },
  {
    id: "yarsa-labs",
    name: "Yarsa Labs",
    sector: "Software Engineering",
    logoSrc: "/logos/careers/yarsa-labs-full.png.webp",
  },
  {
    id: "programiz",
    name: "Programiz",
    sector: "EdTech & Learning Platforms",
    logoSrc: "/logos/careers/programiz.png.webp",
  },
  {
    id: "ekbana",
    name: "Ekbana Solutions",
    sector: "Enterprise Software",
    logoSrc: "/logos/careers/ekbana.png.webp",
  },
  {
    id: "swift-technology",
    name: "Swift Technology",
    sector: "Financial Technology",
    logoSrc: "/logos/careers/SWIFT-LOGO-WEBSITE-1.png.webp",
  },
  {
    id: "dishhome",
    name: "DishHome",
    sector: "Broadcasting & Telecom",
    logoSrc: "/logos/careers/DishHome_Logo.svg_.png.webp",
  },
  {
    id: "karkhana",
    name: "Karkhana",
    sector: "Education & Innovation",
    logoSrc: "/logos/careers/karkhana.png.webp",
  },
  {
    id: "broadway",
    name: "Broadway Infosys",
    sector: "Professional IT Training",
    logoSrc: "/logos/careers/broadway.png.webp",
  },
  {
    id: "clockb",
    name: "Clock B Business Technology",
    sector: "Business Strategy & Tech",
    logoSrc: "/logos/careers/clockb.png.webp",
  },
  {
    id: "info-developers",
    name: "InfoDevelopers",
    sector: "Banking & Core Software",
    logoSrc: "/logos/careers/info-developers.png.webp",
  },
  {
    id: "adex-international",
    name: "Adex International",
    sector: "Technology Consulting",
    logoSrc: "/logos/careers/Purple-Adex-Logo-1_1680601855.png.webp",
  },
  {
    id: "dlytica",
    name: "Dlytica",
    sector: "Data Analytics & Cloud",
    logoSrc: "/logos/careers/Dlytica.png.webp",
  },
  {
    id: "intuji",
    name: "Intuji",
    sector: "Digital Transformation",
    logoSrc: "/logos/careers/intuji.png.webp",
  },
  {
    id: "logicabeans",
    name: "LogicaBeans",
    sector: "Enterprise Solutions",
    logoSrc: "/logos/careers/logicabeans-logo-software-company-2.png.webp",
  },
  {
    id: "lis-nepal",
    name: "LIS Nepal",
    sector: "Analytics & Retail Solutions",
    logoSrc: "/logos/careers/lis-logo.png.webp",
  },
  {
    id: "techkraft",
    name: "TechKraft",
    sector: "Product Development",
    logoSrc: "/logos/careers/techkraft.jpg.webp",
  },
  {
    id: "spiralogics",
    name: "Spiralogics",
    sector: "Custom Healthcare Tech",
    logoSrc: "/logos/careers/spiralogics.png.webp",
  },
  {
    id: "eminence-ways",
    name: "Eminence Ways",
    sector: "Information Security",
    logoSrc: "/logos/careers/eminence-ways.png.webp",
  },
  {
    id: "diyo-ai",
    name: "Diyo AI",
    sector: "Artificial Intelligence",
    logoSrc: "/logos/careers/Diyo-Ai.png.webp",
  },
  {
    id: "code-himalaya",
    name: "Code Himalaya",
    sector: "Mobile & Web Apps",
    logoSrc: "/logos/careers/Code-Himalaya-e1709001522785.png.webp",
  },
  {
    id: "quickfox",
    name: "Quickfox Consulting",
    sector: "Management Consulting",
    logoSrc: "/logos/careers/37.-Quickfox-Consulting-e1715081130304.png.webp",
  },
  {
    id: "wise-yak",
    name: "Wise Yak",
    sector: "HealthTech & AI",
    logoSrc: "/logos/careers/Wise-yak-logo.png.webp",
  },
  {
    id: "waft-tech",
    name: "Waft Technology",
    sector: "Cloud & Web Platforms",
    logoSrc: "/logos/careers/waft.png.webp",
  },
  {
    id: "tuna-tech",
    name: "Tuna Technology",
    sector: "Software Solutions",
    logoSrc: "/logos/careers/tuna.png.webp",
  },
  {
    id: "slash-plus",
    name: "Slash Plus",
    sector: "Product Design & Tech",
    logoSrc: "/logos/careers/Slashlogo-e1715081500251.png.webp",
  },
  {
    id: "prixa",
    name: "Prixa",
    sector: "Digital Health Solutions",
    logoSrc: "/logos/careers/prixa.png.webp",
  },
  {
    id: "palm-mind",
    name: "Palm Mind",
    sector: "Software & Technology",
    logoSrc: "/logos/careers/palm-mind.png.webp",
  },
  {
    id: "dynamic-technosoft",
    name: "Dynamic Technosoft",
    sector: "Enterprise ERP",
    logoSrc: "/logos/careers/dynamic_technosoft_logo.png.webp",
  },
  {
    id: "extensodata",
    name: "ExtensoData",
    sector: "Big Data & AI",
    logoSrc: "/logos/careers/extensodata_logo-1.jpg.webp",
  },
  {
    id: "codroidhub",
    name: "CodroidHub",
    sector: "Mobile Development",
    logoSrc: "/logos/careers/codroidhub_logo.jpeg.webp",
  },
  {
    id: "datahub",
    name: "DataHub",
    sector: "Cloud & Data Centers",
    logoSrc: "/logos/careers/datahub.png.webp",
  },
  {
    id: "aqore",
    name: "Aqore",
    sector: "Staffing Software",
    logoSrc: "/logos/careers/aqore-e1707312849329.jpg.webp",
  },
  {
    id: "grit",
    name: "Grit",
    sector: "Creative & Digital Agency",
    logoSrc: "/logos/careers/grit1.png.webp",
  },
  {
    id: "sunya-ek",
    name: "Sunya Ek",
    sector: "Software Innovations",
    logoSrc: "/logos/careers/sunya-ek.png.webp",
  },
  {
    id: "inspiring-lab",
    name: "Inspiring Lab",
    sector: "Research & Development",
    logoSrc: "/logos/careers/inspiring-lab.jpg.webp",
  },
  {
    id: "cypher",
    name: "Cypher",
    sector: "Security & Technology",
    logoSrc: "/logos/careers/cypher.jpg.webp",
  },
  {
    id: "agni-group",
    name: "Agni Group (Mahindra)",
    sector: "Automotive & Electric Mobility",
    logoSrc: null,
  },
];

export type AlumniStory = {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
  readonly programme: string;
  readonly graduationYear: string;
  readonly institution:
    | "undergraduate"
    | "graduate"
    | "college"
    | "higher-secondary";
  readonly institutionLabel: string;
  readonly currentRole: string;
  readonly company: string;
  readonly sector: string;
  readonly location: string;
  readonly summaryHighlights: readonly string[];
  readonly keyQuote: string;
  readonly pdfData: {
    readonly documentId: string;
    readonly title: string;
    readonly publishedDate: string;
    readonly headline: string;
    readonly storyParagraphs: readonly string[];
    readonly careerMilestones: readonly {
      readonly year: string;
      readonly title: string;
      readonly organization: string;
      readonly description: string;
    }[];
    readonly interviewQnA: readonly {
      readonly question: string;
      readonly answer: string;
    }[];
    readonly skillsAcquired: readonly string[];
  };
};

export const alumniStories: readonly AlumniStory[] = [
  {
    id: "reesav-rokka",
    name: "Reesav Rokka",
    avatar: "/alumni/eesav rokka.png",
    programme: "BSc. (Hons) Computing",
    graduationYear: "Alumnus",
    institution: "undergraduate",
    institutionLabel: "Undergraduate Programme",
    currentRole: "Senior IT Head",
    company: "Gokarneshwor Municipal Hospital",
    sector: "Healthcare Information Technology",
    location: "Kathmandu, Nepal",
    summaryHighlights: [
      "Senior IT Head managing hospital technology systems, digital workflows, and healthcare IT infrastructure.",
      "Introduced digital tools and systems that empower doctors, nurses, and staff to provide faster, better patient services.",
    ],
    keyQuote:
      "Presentations gave me confidence, group projects taught me collaboration, and practical assignments prepared me to solve real-world problems. What began with a desire to build an IT career became a role where technical skills improve hospital services and support the community.",
    pdfData: {
      documentId: "NAMI-ALM-IT-018",
      title: "Alumni Spotlight Case Study: Reesav Rokka",
      publishedDate: "Alumni Relations Publication",
      headline:
        "Turning an Interest in Technology into Meaningful Healthcare Impact",
      storyParagraphs: [
        "Reesav Rokka first learned about Naaya Aayam Multi-Disciplinary Institute (NAMI) through his friends and educational counselors. They spoke highly of its quality education, supportive environment, and practical approach to learning. At the time, Reesav wanted to build a career in Information Technology (IT), and he felt NAMI would give him the practical skills and foundation he needed rather than focusing only on textbook knowledge.",
        "During his time at NAMI, Reesav found the college welcoming and felt comfortable approaching teachers for guidance. His growth came not only from classroom lessons but also from projects, presentations, and group assignments. These experiences taught him problem-solving, communication, teamwork, leadership, and how to listen to others. He came to understand that technical knowledge alone was not enough for a successful career.",
        "After graduating, Reesav started working as an IT professional at Gokarneshwor Municipal Hospital. With experience and increasing responsibility, he became Senior IT Head. His role involves managing the hospital's technology systems, protecting information, managing software, supporting digital projects, and working with doctors, nurses, administrators, and other staff to solve practical problems through technology.",
        "He has also contributed to several improvements at the hospital, including introducing digital systems, strengthening its technology infrastructure, and developing tools that support healthcare professionals. What matters most to him is seeing how these technological improvements can help staff access information faster, work more accurately, and provide better services to patients.",
        "Looking back, Reesav sees a strong connection between his education and his career. Presentations gave me confidence, group projects taught me collaboration, and practical assignments prepared him to solve real-world problems. He believes students should use every classroom activity as preparation for their future, while also continuing to learn because technology constantly changes.",
        "His journey is ultimately about turning an interest in technology into meaningful work. What began with a desire to build an IT career became a role where his technical skills help improve hospital services and support the wider community.",
      ],
      careerMilestones: [
        {
          year: "Academic",
          title: "BSc. (Hons) Computing & Practical Foundation",
          organization: "NAMI / University of Northampton",
          description:
            "Completed hands-on software development, systems engineering, collaborative projects, and communication-focused presentations.",
        },
        {
          year: "Career Start",
          title: "IT Professional",
          organization: "Gokarneshwor Municipal Hospital",
          description:
            "Managed core hospital technology systems, ensured clinical data integrity, and supported digital tooling for healthcare workers.",
        },
        {
          year: "Present",
          title: "Senior IT Head",
          organization: "Gokarneshwor Municipal Hospital",
          description:
            "Directs institutional technology infrastructure, digital systems, cybersecurity, and practical software tools supporting medical staff and patients.",
        },
      ],
      interviewQnA: [
        {
          question:
            "How did your education at NAMI connect with your current healthcare leadership role?",
          answer:
            "Presentations gave me confidence, group projects taught me collaboration, and practical assignments prepared me to solve real-world problems. Working with doctors, nurses, and administrators requires strong communication alongside technical expertise.",
        },
        {
          question: "What is most rewarding about your current work?",
          answer:
            "Seeing how technological improvements help staff access information faster, work more accurately, and provide better services to patients. It is about turning an interest in technology into meaningful work that supports the wider community.",
        },
        {
          question: "What is your advice for current students?",
          answer:
            "Use every classroom activity as preparation for your future, while also continuing to learn because technology constantly changes.",
        },
      ],
      skillsAcquired: [
        "Healthcare IT Systems",
        "Infrastructure & Security",
        "Digital Transformation",
        "Team Leadership & Collaboration",
        "Problem-Solving & Communication",
      ],
    },
  },
  {
    id: "daniel-sapkota",
    name: "Daniel Sapkota",
    avatar: "/alumni/daniel sapkota.png",
    programme: "BSc. (Hons) Computing",
    graduationYear: "Alumnus",
    institution: "undergraduate",
    institutionLabel: "Undergraduate Programme",
    currentRole: "Co-founder",
    company: "Lightcone",
    sector: "Fintech & Venture Capital",
    location: "New York, USA",
    summaryHighlights: [
      "Co-founder of Lightcone, a New York fintech startup that has raised USD 4 million in venture capital from US and European investors.",
      "Awarded a full scholarship and stipend to pursue a PhD in Computer Science at the University of Nevada, Las Vegas (UNLV).",
    ],
    keyQuote:
      "Build something quickly, get users, learn from the process, iterate, innovate, and keep taking action.",
    pdfData: {
      documentId: "NAMI-ALM-FT-007",
      title: "Alumni Spotlight Case Study: Daniel Sapkota",
      publishedDate: "Alumni Relations Publication",
      headline:
        "From Kathmandu to New York: Founding a $4M Venture-Backed Fintech Startup",
      storyParagraphs: [
        "Daniel Sapkota is a Co-founder of Lightcone, a fintech startup based in New York, USA. His journey began at NAMI, where he developed an interest in technology and entrepreneurship.",
        "After graduating from NAMI, Daniel received a full scholarship and stipend to pursue a PhD in Computer Science at the University of Nevada, Las Vegas (UNLV). He later moved into the technology industry and co-founded Lightcone, a fintech startup that has raised USD 4 million in venture capital from investors in the United States and Europe.",
        "Daniel credits NAMI’s hands-on, industry-focused learning for helping him develop the confidence and initiative that have been important throughout his career. He particularly remembers how the curriculum encouraged him to act quickly and build things rather than only study theory. He also highlights the value of the US technology industry’s emphasis on agency.",
        "His advice to current students is straightforward: build something quickly, get users, learn from the process, iterate, innovate, and keep taking action.",
        "Daniel also remembers his teachers at NAMI fondly, especially Deepak Karna, whom he credits as his mentor. He describes himself as a student who was difficult to keep under control, but says he loved his teachers and values the mentorship he received.",
        "Overall, Daniel’s story shows a path from NAMI → PhD in Computer Science at UNLV → technology industry → fintech entrepreneurship in New York, eventually becoming a co-founder of a startup that attracted significant international venture investment.",
      ],
      careerMilestones: [
        {
          year: "Academic",
          title: "BSc. Computing & Entrepreneurship Foundation",
          organization: "NAMI / University of Northampton",
          description:
            "Cultivated engineering discipline and startup initiative under the close mentorship of Deepak Karna and faculty.",
        },
        {
          year: "PhD Fellowship",
          title: "PhD in Computer Science (Full Scholarship & Stipend)",
          organization: "University of Nevada, Las Vegas (UNLV)",
          description:
            "Awarded full scholarship and stipend for advanced computing doctoral studies and academic research in the United States.",
        },
        {
          year: "US Tech",
          title: "Technology Industry & High-Agency Execution",
          organization: "US Tech Ecosystem",
          description:
            "Transitioned into the US tech industry, embracing rapid prototyping, user feedback, and high personal agency.",
        },
        {
          year: "Present",
          title: "Co-founder",
          organization: "Lightcone (New York, USA)",
          description:
            "Co-founded fintech startup Lightcone, raising USD 4 Million in venture capital from prominent investors across the US and Europe.",
        },
      ],
      interviewQnA: [
        {
          question:
            "How did NAMI's learning approach influence your entrepreneurial path?",
          answer:
            "NAMI's hands-on, industry-focused learning helped me develop confidence and initiative. The curriculum encouraged me to act quickly and build things rather than only study theory, matching the emphasis on agency in the US tech ecosystem.",
        },
        {
          question: "What mentorship stood out during your time at NAMI?",
          answer:
            "I remember my teachers at NAMI fondly, especially Deepak Karna, whom I credit as my mentor. I was a student who was difficult to keep under control, but I loved my teachers and value the mentorship and encouragement I received.",
        },
        {
          question: "What is your key advice to current students?",
          answer:
            "Build something quickly, get users, learn from the process, iterate, innovate, and keep taking action.",
        },
      ],
      skillsAcquired: [
        "Fintech Innovation",
        "Venture Capital & Fundraising",
        "Computer Science Research",
        "Rapid Product Iteration",
        "High-Agency Leadership",
      ],
    },
  },
  {
    id: "abhishek-gautam",
    name: "Abhishek Gautam",
    avatar: "/alumni/abhishek sharma.png",
    programme: "BSc. (Hons) Computing",
    graduationYear: "Alumnus",
    institution: "undergraduate",
    institutionLabel: "Undergraduate Programme",
    currentRole: "Network Security Engineer & Lecturer",
    company: "DNS & KFA College",
    sector: "Cybersecurity & Higher Education",
    location: "Kathmandu, Nepal",
    summaryHighlights: [
      "Network Security Engineer at DNS designing, implementing, and managing network security solutions to keep client infrastructure secure and reliable.",
      "Part-time Lecturer at KFA College teaching Computer Networks, Data Communication, and Networking to BCS-IT students.",
    ],
    keyQuote:
      "Stay curious about emerging trends, seek guidance from seniors and industry professionals when choosing your specialization and keep an eye on global developments in IT.",
    pdfData: {
      documentId: "NAMI-ALM-SEC-015",
      title: "Alumni Spotlight Case Study: Abhishek Gautam",
      publishedDate: "August 2026 (Series 15)",
      headline: "Building a Secure Digital Future",
      storyParagraphs: [
        "Abhishek first heard about NAMI while preparing for the IOE entrance exam in Kathmandu — a teacher at his training institute recommended the college, and after comparing curricula with other universities, he was drawn to NAMI's practical, industry-oriented approach.",
        "As a student, he found NAMI supportive and engaging, with hands-on learning at the core of the experience. He credits the approachable faculty, collaborative culture, and project-based coursework for building both his technical skills and his confidence for the professional world.",
        "Today, he works as a Network Security Engineer at DNS, where he designs, implements, and manages network security solutions to keep client infrastructure secure and reliable. Alongside that, he's a part-time Lecturer at KFA College, teaching Computer Networks, Data Communication, and Networking to BCS-IT students — a dual role he says lets him apply industry expertise while mentoring the next generation of IT professionals.",
        "He finds the most rewarding part of his work to be solving complex technical challenges and knowing his efforts help protect critical systems while enabling businesses to operate securely. He encourages current NAMI students to stay curious about emerging trends and keep building practical skills.",
        "His fondest NAMI memories are the last-minute assignment sessions with friends, the shared excitement of meeting deadlines, and the lasting friendships from his college years. His journey stands as a testament to how practical education, perseverance, and continuous growth can build a successful, impactful career.",
      ],
      careerMilestones: [
        {
          year: "Academic",
          title: "BSc. Computing & Practical Foundation",
          organization: "NAMI / University of Northampton",
          description:
            "Built technical proficiency through hands-on lab learning, collaborative assignments, and industry-oriented coursework.",
        },
        {
          year: "Industry",
          title: "Network Security Engineer",
          organization: "DNS",
          description:
            "Designs, implements, and manages network security solutions to protect critical systems and maintain reliable client infrastructure.",
        },
        {
          year: "Academia",
          title: "Part-time Lecturer (BCS-IT)",
          organization: "KFA College",
          description:
            "Teaches Computer Networks, Data Communication, and Networking to BCS-IT students, mentoring emerging technology professionals.",
        },
      ],
      interviewQnA: [
        {
          question: "How did you first discover NAMI and what drew you to it?",
          answer:
            "While preparing for the IOE entrance exam in Kathmandu, a teacher at my training institute recommended NAMI. After comparing curricula with other universities, I was drawn to NAMI's practical, industry-oriented approach.",
        },
        {
          question:
            "What is most rewarding about your dual role in cybersecurity and academia?",
          answer:
            "Solving complex technical challenges and knowing my efforts help protect critical systems while enabling businesses to operate securely. Alongside that, teaching lets me apply real-world industry expertise while mentoring the next generation of IT professionals.",
        },
        {
          question: "What is your advice for current NAMI students?",
          answer:
            "Stay curious about emerging trends, seek guidance from seniors and industry professionals when choosing your specialization and keep an eye on global developments in IT.",
        },
      ],
      skillsAcquired: [
        "Network Security & Defense",
        "Data Communication & Routing",
        "Infrastructure Resilience",
        "Higher Education Mentorship",
        "Complex Problem Solving",
      ],
    },
  },
  {
    id: "denish-tuladhar",
    name: "Denish Tuladhar",
    avatar: "/alumni/Denish.png",
    programme: "Bachelor of Business Administration (BBA)",
    graduationYear: "Alumnus",
    institution: "undergraduate",
    institutionLabel: "Undergraduate Programme",
    currentRole: "Marketing Executive",
    company: "Agni Group (Mahindra BEV & SUV)",
    sector: "Automotive Marketing & Electric Mobility",
    location: "Kathmandu, Nepal",
    summaryHighlights: [
      "Marketing Executive at Agni Group leading marketing strategies, product launches, and digital campaigns for Mahindra's BEV and SUV portfolio in Nepal.",
      "Awarded the Best Emerging Performer Award within just three months of joining Agni Group.",
      "Previously spearheaded healthcare marketing, branding, strategic partnerships, and event management at KIST Teaching Hospital.",
    ],
    keyQuote:
      "Receiving the Best Emerging Performer Award within just three months of joining Agni Group has been one of my proudest achievements. Looking back, NAMI was more than just a place where I earned my degree—it was where I built the foundation for the career I have today.",
    pdfData: {
      documentId: "NAMI-ALM-MKT-021",
      title: "Alumni Spotlight Case Study: Denish Tuladhar",
      publishedDate: "Alumni Relations Publication",
      headline:
        "Driving the Future of Electric Mobility: From Healthcare Marketing to Automotive Strategy",
      storyParagraphs: [
        "Denish Tuladhar first heard about NAMI through a friend who spoke highly of its academic standards and its unique three-year Bachelor's degree programme. Motivated by NAMI's reputation for providing quality education within a shorter duration, it allowed him to balance both his studies and his professional ambitions in an environment that offered the flexibility and rigour he was looking for.",
        "His experience at NAMI was both enriching and transformative. The faculty members were approachable, knowledgeable, and always encouraged active participation. The learning environment emphasised teamwork, presentations, case studies, and real-world problem solving, which helped him build confidence, communication skills, and leadership abilities.",
        "The most valuable aspect of his education at NAMI was its emphasis on research-based assignments, practical learning, and professional development. The curriculum encouraged analytical thinking, project-based learning, and collaboration, preparing him to adapt quickly to workplace challenges throughout his career.",
        "After completing his studies, Denish began his career in healthcare marketing at KIST Teaching Hospital, where he worked on branding, digital marketing campaigns, strategic partnerships, and event management, giving him valuable exposure to integrated marketing and communication strategies.",
        "Currently, Denish is working at Agni Group as a Marketing Executive, specializing in Mahindra's BEV and SUV segment. In this role, he develops and executes marketing strategies including product launch planning, digital campaigns, event management, content creation, influencer collaborations, dealership marketing, and brand-building initiatives across Nepal.",
        "One of his proudest achievements has been receiving the Best Emerging Performer Award within just three months of joining Agni Group. He finds it immensely rewarding to contribute to Nepal's transition toward electric mobility and sustainable transportation.",
      ],
      careerMilestones: [
        {
          year: "Academic",
          title: "Bachelor of Business Administration & Foundation",
          organization: "NAMI / University of Northampton",
          description:
            "Completed research-based coursework, analytical case studies, team presentations, and business management projects.",
        },
        {
          year: "Healthcare",
          title: "Healthcare Marketing Specialist",
          organization: "KIST Teaching Hospital",
          description:
            "Managed branding, digital campaigns, strategic partnerships, and hospital-wide public relations and event execution.",
        },
        {
          year: "Automotive",
          title: "Marketing Executive (Mahindra BEV & SUV)",
          organization: "Agni Group",
          description:
            "Leads product launches, digital campaigns, dealership marketing, content creation, and electric mobility brand strategies across Nepal.",
        },
        {
          year: "Honors",
          title: "Best Emerging Performer Award",
          organization: "Agni Group",
          description:
            "Awarded top organizational honors within three months of joining for high-impact marketing execution and campaign leadership.",
        },
      ],
      interviewQnA: [
        {
          question:
            "How did you first hear about NAMI, and what motivated you to choose NAMI for your studies?",
          answer:
            "I first heard about NAMI through a friend who spoke highly of its academic standards and its unique three-year Bachelor's degree programme. What motivated me to choose NAMI was its reputation for providing quality education within a shorter duration. It allowed me to balance both my studies and my professional life, and NAMI offered the flexible environment I was looking for.",
        },
        {
          question:
            "How would you describe the overall learning environment and experience at NAMI during your time as a student?",
          answer:
            "My experience at NAMI was both enriching and transformative. The faculty members were approachable, knowledgeable and always encouraged active participation. The learning environment emphasised teamwork, presentations, case studies and real-world problem solving, which helped me build confidence, communication skills and leadership abilities. Beyond academics, NAMI encouraged students to think critically and develop practical skills that prepared us for the professional world.",
        },
        {
          question:
            "Which aspects of your education at NAMI have been most valuable in shaping your academic and professional journey?",
          answer:
            "The most valuable aspect of my education at NAMI was its emphasis on research-based assignments, practical learning and professional development. The curriculum encouraged analytical thinking, project-based learning and collaboration, preparing me to adapt quickly to workplace challenges. These experiences have helped me become more confident in problem-solving, strategic thinking and decision-making throughout my career.",
        },
        {
          question:
            "Could you share some key milestones or achievements in your career since graduating from NAMI?",
          answer:
            "After completing my studies, I began my career in healthcare marketing at KIST Teaching Hospital, where I worked on branding, digital marketing campaigns, strategic partnerships and event management. This role gave me valuable exposure to integrated marketing and communication strategies. Currently, I am working at Agni Group as a Marketing Executive, specializing in Mahindra's BEV and SUV segment. One of my proudest achievements has been receiving the Best Emerging Performer Award within just three months of joining Agni Group.",
        },
        {
          question:
            "What does your current role involve, and what do you find most rewarding about your work?",
          answer:
            "In my current role at Agni Group, I am responsible for developing and executing marketing strategies for Mahindra's BEV and SUV portfolio. My work includes product launch planning, digital campaigns, event management, content creation, influencer collaborations, dealership marketing and brand-building initiatives across Nepal. The most rewarding part of my work is contributing to Nepal's transition toward electric mobility. It is exciting to work with innovative vehicles and create marketing campaigns that influence customer perceptions while helping shape the future of sustainable transportation.",
        },
        {
          question:
            "What advice would you like to offer current NAMI students who aspire to build successful careers in their chosen fields?",
          answer:
            "Never limit your learning to the classroom. Take every opportunity to participate in internships, workshops, competitions and networking events. Build strong communication skills, stay curious and continuously learn new technologies and industry trends. Don't wait for the perfect opportunity—gain real experience, sharpen your skills and then pursue the path you're truly passionate about. Success comes from being adaptable, disciplined, humble and willing to step outside your comfort zone.",
        },
        {
          question:
            "Is there a particular memory or experience from your time at NAMI that remains especially meaningful to you?",
          answer:
            "One of my most memorable experiences at NAMI was spending late nights researching journals and preparing assignments with my classmates. Those moments taught me discipline, time management, teamwork and the ability to perform under pressure. The friendships I built, the guidance I received from the faculty and the confidence I developed during those years continue to influence both my personal and professional life.",
        },
      ],
      skillsAcquired: [
        "EV & Automotive Marketing Strategy",
        "Product Launch & Campaign Execution",
        "Digital Marketing & Influencer Relations",
        "Brand Strategy & Strategic Partnerships",
        "Dealership & Integrated Event Marketing",
        "Analytical & Research-Based Decision Making",
      ],
    },
  },
  {
    id: "avni-adhikari",
    name: "Avni Adhikari",
    avatar: "/testimonials/plus-two/Avni Adhikari.png",
    programme: "Secondary School (Science Stream)",
    graduationYear: "Class of 2026",
    institution: "higher-secondary",
    institutionLabel: "Secondary School (+2)",
    currentRole: "President, Arts & Literature Club",
    company: "NAMI International School",
    sector: "Science & Creative Arts",
    location: "Kathmandu, Nepal",
    summaryHighlights: [
      "Secondary School Science stream alumna (Class of 2026) with distinction across physics, chemistry, and biology labs.",
      "Former President of the Arts and Literature Club, leading student initiatives, literary activities, and cultural events.",
      "Demonstrated remarkable resilience, student leadership, and community spirit throughout her academic journey.",
    ],
    keyQuote:
      "NAMI will always be more than just the place where I completed my Plus Two. It is a chapter of my life filled with friendships, laughter, challenges, lessons, and so many memories that I will carry with me. And for all of it, I will always be grateful.",
    pdfData: {
      documentId: "NAMI-ALM-SCI-2026",
      title: "Alumni Spotlight: Avni Adhikari — My Journey at NAMI",
      publishedDate: "Alumni Relations Publication",
      headline:
        "A Chapter of Growth, Leadership & Resilience: Two Years in Science & Student Community",
      storyParagraphs: [
        "When I first walked through the doors of NAMI International School, I never imagined how meaningful the next two years would become. Like any new beginning, my first day came with a mix of excitement and nervousness. I was stepping into a new environment, meeting new people, and starting a new chapter of my life. I had no idea then that this place would give me so many memories to look back on.",
        "Looking back, my +2 experience was about much more than just academics. It was about the friendships I made, the people I met, the challenges I faced, and all the small moments that made everyday college life special.",
        "Some of my favorite memories were the days when we got to take a break from our usual routine. Our trip to Sukute Beach is definitely one of the memories I will always remember. Spending the day with my friends, laughing, having fun, and just enjoying being together made it such a special day.",
        "Our Holi celebrations were another unforgettable part of my NAMI experience. The colors, music, laughter, and all the chaos made those moments so much fun. These are the kinds of memories that I know I will miss the most.",
        "Another important part of my NAMI experience was being the President of the Arts and Literature Club. Taking on that responsibility gave me the chance to meet and work with people I probably wouldn't have gotten to know otherwise. From planning activities to being involved in different events, it pushed me to be more confident and responsible. Looking back, I'm really glad I got the opportunity to be a part of the club in that way.",
        "And then there were our lab classes. Physics, Chemistry, and Biology labs were a whole different experience from sitting in a classroom and taking notes. From trying to get experiments right, working with our friends, making mistakes, and sometimes having absolutely no idea what was going on, the labs gave us some of the funniest and most memorable moments.",
        "Of course, these two years were not always easy. We went through something much bigger than academics when the GEN-Z protests affected our NAMI community, and our college was completely burned down. Seeing a place that held so many memories for us being destroyed was heartbreaking. But what I remember even more is how quickly everyone came together and moved forward. NAMI continued despite everything, and it showed me that a college is not just a building. It is the people, the memories, and the spirit that make it special.",
        "I also want to take a moment to thank all our teachers. Thank you for teaching me, guiding me, and being there for me throughout these two years. Beyond the lessons and exams, you have taught me things that I will carry with me throughout my life.",
        "When I look back at my time at NAMI now, I realize how much I changed and grew during these two years. I learned to face challenges, value the people around me, step out of my comfort zone, and appreciate the little moments that make life special.",
        "NAMI will always be more than just the place where I completed my Plus Two. It is a chapter of my life filled with friendships, laughter, challenges, lessons, and so many memories that I will carry with me. And for all of it, I will always be grateful.",
      ],
      careerMilestones: [
        {
          year: "2024–2026",
          title: "Secondary School (+2 Science Stream)",
          organization: "NAMI International School",
          description:
            "Completed comprehensive physics, chemistry, and biology coursework alongside practical laboratory inquiry.",
        },
        {
          year: "Leadership",
          title: "President, Arts & Literature Club",
          organization: "NAMI International School",
          description:
            "Spearheaded creative initiatives, student literary publications, multidisciplinary workshops, and campus festivals.",
        },
        {
          year: "Community",
          title: "Student Solidarity & Campus Resilience",
          organization: "NAMI Community",
          description:
            "Fostered peer support, active participation, and community resilience during campus rebuilding.",
        },
        {
          year: "2026",
          title: "Science Stream Alumna (Class of 2026)",
          organization: "NAMI Alumni Network",
          description:
            "Graduated with honors, advancing into higher education with strong foundational competencies in science and leadership.",
        },
      ],
      interviewQnA: [
        {
          question: "How did your journey at NAMI begin?",
          answer:
            "When I first walked through the doors of NAMI International School, I never imagined how meaningful the next two years would become. My first day came with a mix of excitement and nervousness. I was stepping into a new environment, meeting new people, and starting a new chapter of my life that gave me so many memories to look back on.",
        },
        {
          question:
            "What made your +2 experience special beyond regular academics?",
          answer:
            "My +2 experience was about much more than just academics. It was about the friendships I made, the people I met, the challenges I faced, and all the small moments that made everyday college life special—from our memorable trip to Sukute Beach to our unforgettable Holi celebrations filled with colors, music, and laughter.",
        },
        {
          question:
            "What was your experience leading the Arts and Literature Club?",
          answer:
            "Being the President of the Arts and Literature Club gave me the chance to meet and work with people I probably wouldn't have gotten to know otherwise. From planning activities to being involved in different events, it pushed me to be more confident and responsible. I'm really glad I got the opportunity to be a part of the club in that way.",
        },
        {
          question: "How were your laboratory classes in the Science stream?",
          answer:
            "Physics, Chemistry, and Biology labs were a whole different experience from sitting in a classroom and taking notes. From trying to get experiments right, working with our friends, making mistakes, and sometimes having absolutely no idea what was going on, the labs gave us some of the funniest and most memorable moments.",
        },
        {
          question: "How did the community respond to unexpected challenges?",
          answer:
            "When unexpected events affected our community, seeing a place with so many memories damaged was heartbreaking. But what I remember even more is how quickly everyone came together and moved forward. It showed me that a college is not just a building. It is the people, the memories, and the spirit that make it special.",
        },
        {
          question:
            "What message would you like to share with your teachers and mentors?",
          answer:
            "Thank you for teaching me, guiding me, and being there for me throughout these two years. Beyond the lessons and exams, you have taught me things that I will carry with me throughout my life.",
        },
        {
          question: "How do you summarize your overall transformation at NAMI?",
          answer:
            "I learned to face challenges, value the people around me, step out of my comfort zone, and appreciate the little moments that make life special. NAMI will always be more than just where I completed Plus Two—it is a chapter filled with friendships, laughter, lessons, and memories for which I will always be grateful.",
        },
      ],
      skillsAcquired: [
        "Scientific Inquiry & Laboratory Research",
        "Student Leadership & Club Governance",
        "Arts & Literature Event Management",
        "Team Collaboration & Problem Solving",
        "Crisis Resilience & Community Solidarity",
        "Public Speaking & Expressive Communication",
      ],
    },
  },
  {
    id: "yunisha-basnet",
    name: "Yunisha Basnet",
    avatar: "/testimonials/plus-two/Yunisha Shrestha.jpeg",
    programme: "Secondary School (Management Stream)",
    graduationYear: "Class of 2026",
    institution: "higher-secondary",
    institutionLabel: "Secondary School (+2)",
    currentRole: "Management Graduate",
    company: "NAMI International School",
    sector: "Business & Management Studies",
    location: "Kathmandu, Nepal",
    summaryHighlights: [
      "Secondary School Management stream alumna (Class of 2026) recognised for active participation and academic dedication.",
      "Experienced comprehensive guidance and mentorship from friendly, understanding faculty members throughout her studies.",
      "Thrived in NAMI's peaceful, green campus environment, building lifelong friendships and collaborative learning habits.",
    ],
    keyQuote:
      "Overall, my time at NAMI was a beautiful combination of learning, growth, friendship, and unforgettable memories. I am truly grateful for the experiences, the teachers who guided me, and the wonderful people I met during my journey.",
    pdfData: {
      documentId: "NAMI-ALM-MGT-2026",
      title: "Alumni Spotlight: Yunisha Basnet — My Journey at NAMI",
      publishedDate: "Alumni Relations Publication",
      headline:
        "A Journey of Growth, Camaraderie & Holistic Learning in Management",
      storyParagraphs: [
        "My journey at NAMI has been a truly wonderful and memorable experience. From the very first day I joined NAMI until the end of my session, I genuinely enjoyed every moment. The faculty members were very supportive, friendly, and understanding. My teachers helped me a lot with my studies and were always there whenever I needed guidance or had difficulties understanding something. Their constant support and encouragement made my learning experience much easier and more enjoyable.",
        "Apart from academics, one of the best parts of my journey was the friends I made along the way. I met some really lovely people who made my time at NAMI even more special. We shared so many fun moments, helped each other, and created memories that I will always cherish.",
        "I was also really impressed by the facilities at NAMI. The campus environment was peaceful, beautiful, and surrounded by greenery, which made it a refreshing place to study and spend time with friends. Overall, my time at NAMI was a beautiful combination of learning, growth, friendship, and unforgettable memories. I am truly grateful for the experiences, the teachers who guided me, and the wonderful people I met during my journey.",
      ],
      careerMilestones: [
        {
          year: "2024–2026",
          title: "Secondary School (+2 Management Stream)",
          organization: "NAMI International School",
          description:
            "Completed core business, management, accounting, and economics coursework with active classroom participation.",
        },
        {
          year: "Academic",
          title: "Collaborative Learning & Mentorship",
          organization: "NAMI Faculty & Student Body",
          description:
            "Engaged in continuous academic mentorship, peer study circles, and experiential group assignments.",
        },
        {
          year: "2026",
          title: "Management Stream Alumna (Class of 2026)",
          organization: "NAMI Alumni Network",
          description:
            "Graduated successfully, equipped with strong foundational skills in commerce, management, and leadership for undergraduate studies.",
        },
      ],
      interviewQnA: [
        {
          question: "How would you describe your overall experience at NAMI?",
          answer:
            "My journey at NAMI has been a truly wonderful and memorable experience. From the very first day I joined NAMI until the end of my session, I genuinely enjoyed every moment. The faculty members were very supportive, friendly, and understanding, always helping me whenever I needed guidance.",
        },
        {
          question:
            "How did the faculty and teaching approach support your learning?",
          answer:
            "My teachers helped me a lot with my studies and were always there whenever I had difficulties understanding something. Their constant support and encouragement made my learning experience much easier and more enjoyable.",
        },
        {
          question:
            "What role did friendships and the campus environment play during your time at NAMI?",
          answer:
            "I met really lovely people who made my time at NAMI even more special—we shared so many fun moments, helped each other, and created memories that I will always cherish. The campus environment was peaceful, beautiful, and surrounded by greenery, which made it a refreshing place to study.",
        },
        {
          question: "What is your key takeaway looking back at your +2 years?",
          answer:
            "My time at NAMI was a beautiful combination of learning, growth, friendship, and unforgettable memories. I am truly grateful for the experiences, the teachers who guided me, and the wonderful people I met during my journey.",
        },
      ],
      skillsAcquired: [
        "Business & Management Foundations",
        "Financial Accounting & Analysis",
        "Collaborative Peer Teamwork",
        "Effective Communication & Presentation",
        "Critical Thinking & Problem Solving",
        "Self-Management & Leadership",
      ],
    },
  },
];

export const alumniCopy = {
  meta: {
    title: "Alumni Network & Career Spotlights | NAMI",
    description:
      "Explore the achievements of over 8,000 NAMI graduates leading innovation across computing, environmental science, business, and research worldwide.",
  },
  masthead: {
    eyebrow: "ALUMNI NETWORK",
    heading: "8,000+ Alumni",
    standfirst:
      "From Kathmandu to global institutions across 15+ countries, NAMI graduates are leading innovation in computing, sustainable development, business, and research.",
    cta: "Explore Alumni Spotlights",
    image: {
      src: "/alumni/alumni hero.jpeg",
      alt: "NAMI Class of 2025 graduates celebrate at convocation ceremony.",
      width: 654,
      height: 424,
    },
  } satisfies CareersMastheadCopy,
  metrics: {
    eyebrow: "COMMUNITY & SCALE",
    heading: "A Legacy of Excellence Since 2012",
    standfirst:
      "Our alumni form a connected global community of researchers, technology leaders, entrepreneurs, and scholars.",
    items: [
      {
        stat: "8,000+",
        label: "Total Alumni",
        detail: "Graduates from all academic programmes since 2012.",
      },
      {
        stat: "5,000+",
        label: "NEB 10+2 Alumni",
        detail:
          "Science and Management graduates progressing to leading institutions.",
      },
      {
        stat: "2,500+",
        label: "UG & PG Degree Holders",
        detail:
          "Holders of University of Northampton (UK) accredited bachelor's and master's degrees.",
      },
      {
        stat: "500+",
        label: "Cambridge A Level Scholars",
        detail:
          "Studying at world-leading universities in the UK, the US and Australia.",
      },
    ] as const satisfies readonly AlumniMetric[],
  },
  storiesSection: {
    eyebrow: "ALUMNI VOICES",
    heading: "Where NAMI Graduates Go",
    standfirst:
      "From healthcare technology leaders in Kathmandu and network security engineers to venture-backed fintech entrepreneurs in New York, explore the career journeys of our graduates.",
  },
  employers: {
    navLabel: "Employers",
    eyebrow: "CAREER NETWORK",
    heading: "Where Our Alumni Are",
    standfirst:
      "From global technology companies and leading commercial banks to international conservation bodies and research institutes, NAMI graduates are making an impact worldwide.",
    cta: null,
    emptyState: null,
  } satisfies SectionCopy,
  connect: {
    eyebrow: "STAY IN TOUCH",
    heading: "Are You a NAMI Graduate?",
    standfirst:
      "Reconnect with your batch, update your career milestones, submit an alumni spotlight, or join our student mentorship circle.",
    email: "alumni@nami.edu.np",
  },
} as const;
