import { entryOf, isoDate } from "../identifiers";
import type { Vacancy } from "../types";

// Invented postings, not real openings.
export const vacancies: readonly Vacancy[] = [
  {
    ...entryOf("lecturer-computer-science"),
    title: "Lecturer, Computer Science",
    department: "Naaya Aayam Multi-Disciplinary Institute",
    employmentType: "full-time",
    location: "New Baneshwor, Kathmandu",
    summary:
      "Teach undergraduate modules on the partner-university computing degrees, supervise final-year projects, and contribute to module assessment and moderation.",
    postedAt: isoDate("2026-08-01"),
    closesAt: isoDate("2026-09-15"),
  },
  {
    ...entryOf("admissions-counsellor"),
    title: "Admissions Counsellor",
    department: "Admissions",
    employmentType: "full-time",
    location: "New Baneshwor, Kathmandu",
    summary:
      "Guide prospective students and their families through entry requirements across the school, the college and the institute, and run counselling sessions through the admission cycle.",
    postedAt: isoDate("2026-08-05"),
    closesAt: null,
  },
  {
    ...entryOf("laboratory-technician"),
    title: "Laboratory Technician, Environmental Science",
    department: "Naaya Aayam Multi-Disciplinary Institute",
    employmentType: "contract",
    location: "New Baneshwor, Kathmandu",
    summary:
      "Prepare and maintain the environmental science laboratory, support practical sessions and fieldwork, and keep equipment, reagents and safety records in order.",
    postedAt: isoDate("2026-08-12"),
    closesAt: isoDate("2026-09-30"),
  },
];
