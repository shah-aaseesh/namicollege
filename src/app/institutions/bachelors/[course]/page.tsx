import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstitutionEnrollCta } from "@/components/shared/institution-enroll-cta";
import {
  getBachelorsPage,
  getBachelorsProgrammes,
} from "@/lib/cms/pages/bachelors";
import { createMetadata } from "@/lib/seo";
import type { BachelorsProgramme } from "../_components/bachelors-copy";
import { CourseAbout } from "./_components/course-about";
import { CourseCareer } from "./_components/course-career";
import { CourseEligibility } from "./_components/course-eligibility";
import { CourseMasthead } from "./_components/course-masthead";
import { CourseModules } from "./_components/course-modules";
import { CoursePending } from "./_components/course-pending";

// Courses added in WordPress after the build still get a page.
export const dynamicParams = true;

async function findCourse(key: string): Promise<BachelorsProgramme | null> {
  const programmes = await getBachelorsProgrammes();
  return programmes.find((item) => item.key === key) ?? null;
}

function pathOf(key: string): string {
  return `/institutions/bachelors/${key}`;
}

export async function generateStaticParams(): Promise<{ course: string }[]> {
  const programmes = await getBachelorsProgrammes();
  return programmes.map((item) => ({ course: item.key }));
}

export async function generateMetadata(
  props: PageProps<"/institutions/bachelors/[course]">,
): Promise<Metadata> {
  const { course } = await props.params;
  const programme = await findCourse(course);

  if (programme === null) {
    return createMetadata({ path: "/institutions/bachelors" });
  }

  return createMetadata({
    path: pathOf(programme.key),
    title: programme.fullTitle,
    description: programme.metaDescription,
    image: {
      url: programme.image.src,
      width: programme.image.width,
      height: programme.image.height,
      alt: programme.image.alt,
    },
  });
}

export default async function CoursePage(
  props: PageProps<"/institutions/bachelors/[course]">,
) {
  const { course } = await props.params;
  const [programme, page] = await Promise.all([
    findCourse(course),
    getBachelorsPage(),
  ]);

  if (programme === null) notFound();

  return (
    <>
      <CourseMasthead course={programme} />
      <CourseAbout course={programme} />
      <CourseModules course={programme} />
      <CourseEligibility course={programme} />
      <CoursePending course={programme} heading={page.courses.pendingLabel} />
      <CourseCareer course={programme} />
      <InstitutionEnrollCta institution="institute" />
    </>
  );
}
