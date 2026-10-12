import { entryOf } from "../identifiers";
import { richText } from "../rich-text";
import { schoolGrades } from "../school-grades";
import type { InstitutionProfile } from "../types";

export const institution: InstitutionProfile = {
  entities: {
    institute: {
      role: "institute",
      name: "Naaya Aayam Multi-Disciplinary Institute",
      shortName: "NAMI",
      establishedYear: 2012,
    },
    college: {
      role: "college",
      name: "NAMI College",
      shortName: "NAMI",
      establishedYear: 2013,
    },
    school: {
      // 2019: decided 2026-08-20 — the year NEB-affiliated +2 began. The
      // primary division's 2024 opening is a separate affiliation date.
      role: "school",
      name: "NAMI International School",
      shortName: "NAMI International School",
      establishedYear: 2019,
    },
  },
  motto: "Transform Yourself to Lead the World",
  overview: richText(
    "Naaya Aayam Multi-Disciplinary Institute (NAMI) is an educational entity with the aim of contributing meaningfully to Nepal's social and economic development through the delivery of quality education. Established in 2012, NAMI is dedicated to providing world-class education in Nepal.",
    "The institution places strong emphasis on holistic development, integrating rigorous academic learning with extracurricular activities, leadership development and community engagement. By fostering an inclusive and supportive learning environment, NAMI prepares students not only for academic success but also for meaningful contributions to society and the global workforce. Its dedicated faculty, modern facilities and collaborative partnerships further enhance the educational experience, making NAMI a preferred choice for students seeking quality education in Nepal.",
  ),
  mission: richText(
    "To empower individuals with fundamental academic knowledge, life skills and values that foster a genuine love for learning, and prepare them to impact their own lives and the lives of others positively.",
  ),
  vision: richText(
    "To offer access to world-class education within Nepal, fostering human capital development among the youth and empowering them to become responsible individuals contributing to society, both locally and globally.",
  ),
  emblemStory: richText(
    "The lotus flower symbolises rebirth. It blossoms in darkness, and in the NAMI logo it represents growth and transformation. Each of the lotus's five petals represents one of NAMI's core values.",
    'In Sanskrit, "Hridaya" means heart. The red lotus represents love, passion, kindness and compassion, and a fully blossomed red lotus reflects the warmth of the human spirit. As our graduates enter the real world, we aim for NAMIANS to embody the spirit reflected in our logo.',
  ),
  values: [
    {
      ...entryOf("enlightenment"),
      name: "Enlightenment",
      meaning: "Promotes complete and holistic development.",
    },
    {
      ...entryOf("knowledge"),
      name: "Knowledge",
      meaning:
        "The skills and awareness gained through experience, learning and engagement with the world.",
    },
    {
      ...entryOf("purity-of-heart-and-mind"),
      name: "Purity of Heart and Mind",
      meaning:
        "Encourages clarity of thought and promotes the ethics and values needed to build a compassionate society.",
    },
    {
      ...entryOf("self-awareness"),
      name: "Self-Awareness",
      meaning:
        "Enhances the ability to recognise and understand one's own ideas, feelings and behaviours.",
    },
    {
      ...entryOf("wisdom"),
      name: "Wisdom",
      meaning: "The ability to reason logically and to behave wisely.",
    },
  ],
  campuses: [
    {
      ...entryOf("gokarneshwor"),
      locality: "Gokarneshwor-7",
      city: "Kathmandu",
      hosts: [
        `School, ${schoolGrades.label}`,
        "+2 NEB, Science and Management",
        "Cambridge A Level",
      ],
      streetAddress: null,
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=NAMI+College%2C+Jorpati%2C+Gokarneshwor%2C+Kathmandu",
      embedMapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d882.9749868182432!2d85.38358969999999!3d27.720375300000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1bbf46821009%3A0xb8e1a147cb4dc56c!2sNaya%20Aayam%20Multi-Disciplinary%20Institute!5e0!3m2!1sen!2sin!4v1791065660030!5m2!1sen!2sin",
    },
    {
      ...entryOf("new-baneshwor"),
      locality: "New Baneshwor",
      city: "Kathmandu",
      hosts: ["Undergraduate programmes", "Postgraduate programmes"],
      streetAddress: "Shantinagar Marg, House No. 27",
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=NAMI+College%2C+New+Baneshwor%2C+Kathmandu",
      embedMapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28263.043992494844!2d85.30609671562503!3d27.690088099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cc4a60df7d%3A0xa3d62c8a38b7e837!2sNAMI%20COLLEGE%20bachelors%20block!5e0!3m2!1sen!2sin!4v1791065743872!5m2!1sen!2sin",
    },
  ],
  contact: {
    phones: [
      "+977-01-4917441/42/43/44",
      "+977-01-4913353",
      "+977-01-5920335/36",
    ],
    whatsapp: "namicollege",
    email: "info@nami.edu.np",
    websites: [
      {
        label: "school.nami.edu.np",
        href: "https://school.nami.edu.np",
        destination: "external",
      },
      {
        label: "college.nami.edu.np",
        href: "https://college.nami.edu.np/",
        destination: "external",
      },
    ],
    socialProfiles: [
      {
        platform: "whatsapp",
        label: "WhatsApp",
        href: "https://wa.me/namicollege?text=Hello%20NAMI%2C%20I%20would%20like%20to%20enquire%20about%20admissions%20and%20programmes.",
        destination: "external",
      },
      {
        platform: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/share/1CS5HvZ6xf/?mibextid=wwXIfr",
        destination: "external",
      },
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/nami.college",
        destination: "external",
      },
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/13186439/",
        destination: "external",
      },
      {
        platform: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/@naminepal",
        destination: "external",
      },
      {
        platform: "tiktok",
        label: "TikTok",
        href: "https://www.tiktok.com/@nami.college?_r=1&_t=ZS-99xxwcx4jFE",
        destination: "external",
      },
    ],
    byEntity: {
      institute: {
        phone: "+977-01-5920335/36",
        email: "info@nami.edu.np",
        admissionsEmail: "admissions@nami.edu.np",
        facebook: "https://www.facebook.com/share/1CS5HvZ6xf/?mibextid=wwXIfr",
      },
      college: {
        phone: "+977-01-4917441/42/43/44, +977-01-4913353",
        email: "info@nami.edu.np",
        admissionsEmail: "admissions@nami.edu.np",
        facebook: "https://www.facebook.com/share/1513mfhP69m/?mibextid=wwXIfr",
      },
      school: {
        phone: "+977-01-4917441/42/43/44, +977-01-4913353",
        email: "info@nami.edu.np",
        admissionsEmail: "admissions@nami.edu.np",
        facebook: "https://www.facebook.com/share/1DpZc6ubM8/?mibextid=wwXIfr",
      },
    },
  },
};
