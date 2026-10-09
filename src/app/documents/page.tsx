import type { Metadata } from "next";
import { getDocumentsData, getDocumentsPage } from "@/lib/cms/pages/documents";
import { createMetadata } from "@/lib/seo";
import { DocumentsLibrary } from "./_components/documents-library";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getDocumentsPage();
  return createMetadata({
    path: "/documents",
    title: seo.title,
    description: seo.description,
  });
}

export default async function DocumentsPage() {
  const { page, categories, documents } = await getDocumentsData();

  return (
    <DocumentsLibrary
      categories={categories}
      copy={{
        label: page.heading.label,
        title: page.heading.title,
        description: page.heading.description,
        searchPlaceholder: page.heading.searchPlaceholder,
        allLabel: page.categories.allLabel,
        emptyTitle: page.empty.title,
        emptyText: page.empty.text,
        resetLabel: page.empty.resetLabel,
        bannerTitle: page.banner.title,
        bannerText: page.banner.text,
        bannerButton: page.banner.button,
      }}
      documents={documents}
    />
  );
}
