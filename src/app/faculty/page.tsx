import type { Metadata } from "next";

import { getFacultyPage } from "@/lib/cms/pages/faculty";
import { createMetadata } from "@/lib/seo";
import { FacultyGroup } from "./_components/faculty-group";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getFacultyPage();

  return createMetadata({
    path: "/faculty",
    title: seo.title,
    description: seo.description,
  });
}

export default async function FacultyPage() {
  const page = await getFacultyPage();

  return (
    <div className="min-h-screen bg-surface pt-8 sm:pt-10 lg:pt-12 pb-16 space-y-10 sm:space-y-12 lg:space-y-14">
      <FacultyGroup
        isBoard
        isFirstGroup
        people={page.board.people}
        title={page.board.title}
      />

      <FacultyGroup
        people={page.management.people}
        title={page.management.title}
      />

      <FacultyGroup
        people={page.academics.people}
        title={page.academics.title}
      />
    </div>
  );
}
