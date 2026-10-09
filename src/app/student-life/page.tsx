import type { Metadata } from "next";

import { getStudentLifePage } from "@/lib/cms/pages/student-life";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { CollegeLifeList } from "./_components/college-life-list";
import { StudentLifeMasthead } from "./_components/student-life-masthead";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getStudentLifePage();
  return createMetadata({
    path: "/student-life",
    title: seo.title,
    description: seo.description,
  });
}

export default async function StudentLifePage() {
  const [page, pillars] = await Promise.all([
    getStudentLifePage(),
    content.getCampusLife(),
  ]);

  return (
    <>
      <StudentLifeMasthead
        copy={{ title: page.masthead.title, lead: page.masthead.description }}
      />
      <CollegeLifeList pillars={pillars} />
    </>
  );
}
