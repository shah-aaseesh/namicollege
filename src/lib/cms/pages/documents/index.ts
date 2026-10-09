import { cache } from "react";
import {
  DOCUMENTS,
  type OfficialDocument,
} from "@/app/documents/_components/documents-data";
import { fetchCmsPage } from "../../client";
import { type CmsCollectionItem, fetchCmsCollection } from "../../collections";
import { mergeWithDefaults } from "../../merge";
import { documentsDefaults, documentTemplate } from "./defaults";
import type { DocumentFields, DocumentsPageContent } from "./types";

export type * from "./types";

/** WordPress collection slug (Documents → All Documents). */
export const DOCUMENT_COLLECTION = "documents";

const INSTITUTIONS: readonly OfficialDocument["institution"][] = [
  "NAMI Group",
  "School",
  "College",
  "Institute",
];

export const getDocumentsPage = cache(
  async (): Promise<DocumentsPageContent> => {
    return mergeWithDefaults(
      documentsDefaults,
      await fetchCmsPage("documents"),
    );
  },
);

/** "PDF" for PDFs, otherwise the file's extension (DOCX, XLSX …). */
function fileTypeOf(href: string): OfficialDocument["fileType"] {
  const extension = /\.([a-z0-9]+)(?:[?#]|$)/i.exec(href)?.[1]?.toUpperCase();
  return extension === "PDF" || extension === undefined
    ? "PDF"
    : (extension as OfficialDocument["fileType"]);
}

function documentOf(
  item: CmsCollectionItem<DocumentFields>,
): OfficialDocument | null {
  const { fields } = item;
  const file = fields.file.trim();
  if (file === "") return null;
  return {
    id: `document-${item.id}`,
    title: item.title,
    category: fields.category,
    categoryLabel: "",
    institution:
      INSTITUTIONS.find((value) => value === fields.institution) ??
      "NAMI Group",
    description: fields.description,
    fileSrc: file,
    fileType: fileTypeOf(file),
    fileSize: fields.fileSize,
    updatedDate: fields.note,
    isFeatured: fields.featured,
  };
}

/**
 * Categories and documents for the Documents page. Until an editor imports the
 * bundled documents in WordPress (or starts an empty list), new WordPress
 * documents are shown before the bundled ones.
 */
export const getDocumentsData = cache(async () => {
  const [page, collection] = await Promise.all([
    getDocumentsPage(),
    fetchCmsCollection(DOCUMENT_COLLECTION, documentTemplate),
  ]);
  const fromCms =
    collection?.items.map(documentOf).filter((doc) => doc !== null) ?? [];
  const documents =
    collection === null
      ? DOCUMENTS
      : collection.ready
        ? fromCms
        : [...fromCms, ...DOCUMENTS];

  return {
    page,
    categories: page.categories.items
      .filter((item) => item.key.trim() !== "" && item.label.trim() !== "")
      .map((item) => ({ id: item.key.trim(), label: item.label })),
    documents,
  };
});
