// The Documents page as it ships today, the empty document used to validate
// WordPress data, and the bundled documents offered for import (exported into
// the WordPress snippet by `npm run cms:defaults`).

import {
  DOCUMENT_CATEGORIES,
  DOCUMENTS,
} from "@/app/documents/_components/documents-data";
import type { DocumentFields, DocumentsPageContent } from "./types";

export const documentsDefaults: DocumentsPageContent = {
  seo: {
    title: "Documents & Publications",
    description:
      "Download official NAMI publications, the institutional book and printable admission application forms for NAMI International School, NAMI College and Naaya Aayam Multi-Disciplinary Institute.",
  },
  heading: {
    label: "Official Resources",
    title: "Documents & Publications",
    description:
      "Access and download official institutional publications, prospectus books, curriculum guidelines, and printable admission application forms across NAMI institutions.",
    searchPlaceholder: "Search documents or forms...",
  },
  categories: {
    allLabel: "All Documents",
    items: DOCUMENT_CATEGORIES.map((category) => ({
      key: category.id,
      label: category.label,
    })),
  },
  empty: {
    title: "No documents found",
    text: "No documents match your search criteria. Try a different search term or category.",
    resetLabel: "Reset Filters",
  },
  banner: {
    title: "Prefer applying completely online?",
    text: "You can fill out the dynamic digital inquiry and application form directly in your browser without printing.",
    button: { label: "Online Admissions Portal →", href: "/admissions" },
  },
};

export const documentTemplate: DocumentFields = {
  category: "",
  institution: "NAMI Group",
  description: "",
  file: "",
  fileSize: "",
  note: "",
  featured: false,
};

/** Import dates count back one day per document so WordPress keeps today's order. */
function importDate(index: number): string {
  const date = new Date(Date.UTC(2026, 8, 30));
  date.setUTCDate(date.getUTCDate() - index);
  return date.toISOString().slice(0, 10);
}

export const documentImports = DOCUMENTS.map((document, index) => {
  const fields: DocumentFields = {
    category: document.category,
    institution: document.institution,
    description: document.description,
    file: document.fileSrc,
    fileSize: document.fileSize,
    note: document.updatedDate,
    featured: document.isFeatured === true,
  };
  return { title: document.title, date: importDate(index), fields };
});
