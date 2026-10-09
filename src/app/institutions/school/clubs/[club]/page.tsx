import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSchoolClubs } from "@/lib/cms/pages/clubs";
import { createMetadata } from "@/lib/seo";
import { ClubActivities } from "./_components/club-activities";
import { ClubGallery } from "./_components/club-gallery";
import { ClubJoinCta } from "./_components/club-join-cta";
import { ClubMasthead } from "./_components/club-masthead";
import { ClubOtherRail } from "./_components/club-other-rail";
import { ClubOverview } from "./_components/club-overview";
import { ClubSkills } from "./_components/club-skills";

// Clubs added in WordPress after the build still get a page.
export const dynamicParams = true;

async function findClub(slug: string) {
  const clubs = await getSchoolClubs();
  return { clubs, club: clubs.find((item) => item.slug === slug) ?? null };
}

export async function generateStaticParams(): Promise<{ club: string }[]> {
  const clubs = await getSchoolClubs();
  return clubs.map((club) => ({ club: club.slug }));
}

type Props = {
  params: Promise<{ club: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { club: slug } = await params;
  const { club } = await findClub(slug);

  if (!club) {
    return createMetadata({ path: "/institutions/school" });
  }

  return createMetadata({
    path: `/institutions/school/clubs/${club.slug}`,
    title: `${club.title} | NAMI International School`,
    description: club.metaDescription,
    image: {
      url: club.coverImage.src,
      width: club.coverImage.width,
      height: club.coverImage.height,
      alt: club.coverImage.alt,
    },
  });
}

export default async function ClubDetailPage({ params }: Props) {
  const { club: slug } = await params;
  const { club, clubs } = await findClub(slug);

  if (!club) {
    notFound();
  }

  return (
    <>
      <ClubMasthead club={club} />
      <ClubOverview club={club} />
      <ClubActivities club={club} />
      <ClubGallery club={club} />
      <ClubSkills club={club} />
      <ClubJoinCta club={club} />
      <ClubOtherRail clubs={clubs} currentClub={club} />
    </>
  );
}
