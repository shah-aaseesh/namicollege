// The documents as they shipped. Seeds the WordPress document list
// (src/lib/cms/pages/documents) and is shown when WordPress is unavailable.

export type OfficialDocument = {
  readonly id: string;
  readonly title: string;
  /** A category key from the Documents page settings. */
  readonly category: string;
  readonly categoryLabel: string;
  readonly institution: "NAMI Group" | "School" | "College" | "Institute";
  readonly description: string;
  readonly fileSrc: string;
  readonly fileType: "PDF" | "DOCX";
  readonly fileSize: string;
  readonly updatedDate: string;
  readonly isFeatured?: boolean;
};

export const DOCUMENTS: readonly OfficialDocument[] = [
  {
    id: "nami-book",
    title: "NAMI Institutional Book & Profile",
    category: "publications",
    categoryLabel: "Official Publication",
    institution: "NAMI Group",
    description:
      "Comprehensive institutional profile of Naaya Aayam Multi-Disciplinary Institute, highlighting governance, academic credentials, UK degree partnerships, Cambridge affiliation, campus infrastructure, and founding philosophy.",
    fileSrc: "/documents/Nami book.pdf",
    fileType: "PDF",
    fileSize: "4.15 MB",
    updatedDate: "Official Edition",
    isFeatured: true,
  },
  {
    id: "application-bachelors",
    title: "Bachelors & Masters Degree Application Form",
    category: "admissions",
    categoryLabel: "Admissions Form",
    institution: "Institute",
    description:
      "Official admission application form for University of Northampton (UK) undergraduate and postgraduate programmes at NAMI (BSc. Computing, Software Engineering, Network Engineering, Environmental Science, BBA, MBA).",
    fileSrc: "/documents/Nami_applicationform_bachelors.pdf",
    fileType: "PDF",
    fileSize: "111 KB",
    updatedDate: "Academic Intake 2026",
    isFeatured: true,
  },
  {
    id: "application-a-levels",
    title: "Cambridge International A-Level Application Form",
    category: "admissions",
    categoryLabel: "Admissions Form",
    institution: "College",
    description:
      "Official admission form for Cambridge Assessment International Education (CAIE) AS and A Level programmes across Science, Business, and Humanities streams at NAMI College.",
    fileSrc: "/documents/NAMI_College_A_Level_Application_Form.pdf",
    fileType: "PDF",
    fileSize: "255 KB",
    updatedDate: "Academic Intake 2026",
    isFeatured: true,
  },
  {
    id: "application-school-plus-two",
    title: "NAMI International School (+2 Higher Secondary) Application Form",
    category: "admissions",
    categoryLabel: "Admissions Form",
    institution: "School",
    description:
      "Official enrollment form for National Examinations Board (NEB) Grade XI & XII (+2 Science & Management) at NAMI International School.",
    fileSrc: "/documents/Application_form_nami_international_school_plus_2.pdf",
    fileType: "PDF",
    fileSize: "3.03 MB",
    updatedDate: "Academic Intake 2026",
  },
  {
    id: "application-school-primary",
    title: "NAMI International School (Primary School) Admission Form",
    category: "admissions",
    categoryLabel: "Admissions Form",
    institution: "School",
    description:
      "Official enrollment and student record application form for primary learners (Grades I through VII) at NAMI International School.",
    fileSrc:
      "/documents/Nami International School (Primary) Admission form.pdf",
    fileType: "PDF",
    fileSize: "135 KB",
    updatedDate: "Academic Intake 2026",
  },
];

export const DOCUMENT_CATEGORIES: readonly { id: string; label: string }[] = [
  { id: "publications", label: "Publications & Books" },
  { id: "admissions", label: "Admission Forms" },
];
