import type { Metadata } from "next";
import { SiteNewsletterBand } from "@/components/layout/site-newsletter-band";
import { InstitutionContact } from "@/components/shared/institution-contact";
import { InstitutionEnrollCta } from "@/components/shared/institution-enroll-cta";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import { getALevelsPage } from "@/lib/cms/pages/a-levels";
import { getALevelsClubs } from "@/lib/cms/pages/clubs";
import { testimonialsProps } from "@/lib/cms/testimonials";
import { hasImage, isExternalHref } from "@/lib/cms/types";
import { content, richText } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { createMetadata } from "@/lib/seo";
import { ALevelsClubsSection } from "./_components/a-levels-clubs-section";
import { CollegeCambridge } from "./_components/college-cambridge";
import { CollegeEntry } from "./_components/college-entry";
import { CollegeMilestones } from "./_components/college-milestones";
import { CollegeSubjects } from "./_components/college-subjects";
import { WhyALevelsSection } from "./_components/why-a-levels-section";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getALevelsPage();

  return createMetadata({
    path: institutionPath("college"),
    title: seo.title,
    description: seo.description,
  });
}

function linkOf(link: { label: string; href: string }) {
  return {
    label: link.label,
    href: link.href,
    destination: isExternalHref(link.href)
      ? ("external" as const)
      : ("internal" as const),
  };
}

export default async function CollegePage() {
  const [page, institution, clubs] = await Promise.all([
    getALevelsPage(),
    content.getInstitution(),
    getALevelsClubs(),
  ]);
  const { hero, principal } = page;

  const socials = institution.contact.socialProfiles.filter(
    (profile) => profile.destination === "external",
  );
  const watch = socials.find((profile) => profile.platform === "youtube");

  const principalParagraphs = principal.paragraphs.filter(
    (item) => item.trim() !== "",
  );
  const alumni = testimonialsProps(page.alumni, "a-levels-alumni");

  return (
    <>
      <SharedHero
        entity={institution.entities.college}
        heading={hero.title || undefined}
        heroLabel={hero.title || institution.entities.college.name}
        motto={institution.motto}
        primaryCta={linkOf(hero.button)}
        slides={hero.slides.map((slide) => slide.image)}
        standfirst={hero.standfirst}
        watch={watch ?? null}
      />

      <WhyALevelsSection why={page.why} />

      {principalParagraphs.length === 0 ? null : (
        <PrincipalMessage
          eyebrow={principal.label}
          id="principal"
          message={richText(...principalParagraphs)}
          person={{
            name: principal.name,
            portrait: hasImage(principal.portrait) ? principal.portrait : null,
            title: principal.title,
          }}
        />
      )}

      <CollegeCambridge
        badge={page.cambridge.badge}
        copy={{
          eyebrow: page.cambridge.title,
          heading: page.cambridge.label,
          standfirst: page.cambridge.description,
          propositions: page.cambridge.cards.filter(
            (card) => card.title.trim() !== "",
          ),
        }}
      />
      <CollegeSubjects copy={page.subjects} />

      <CollegeMilestones
        copy={{
          eyebrow: page.milestones.title,
          heading: page.milestones.label,
          milestones: page.milestones.items
            .filter((item) => item.title.trim() !== "")
            .map((item) => ({
              year: item.year,
              title: item.title,
              body: item.body,
              logo: hasImage(item.logo) ? item.logo : undefined,
            })),
        }}
      />

      <ALevelsClubsSection clubs={clubs} copy={page.clubs} />

      <Testimonials id="alumni" items={alumni.items} section={alumni.section} />

      <CollegeEntry
        copy={{
          eyebrow: page.entry.label,
          heading: page.entry.title,
          cta: linkOf(page.entry.button),
          blocks: page.entry.blocks.filter(
            (block) => block.title.trim() !== "",
          ),
        }}
      />

      <InstitutionNotices
        copy={{
          eyebrow: page.notices.title,
          heading: "",
          standfirst: page.notices.description,
          ctaLabel: page.notices.buttonLabel,
          emptyState: page.notices.emptyState,
        }}
        id="notices"
        institution="college"
      />

      <InstitutionEnrollCta institution="college" />

      <SiteNewsletterBand standfirst={institution.entities.college.name} />

      <InstitutionContact id="contact" institution="college" />
    </>
  );
}
