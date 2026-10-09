import type { Metadata } from "next";
import { SiteNewsletterBand } from "@/components/layout/site-newsletter-band";
import { CareerPlacement } from "@/components/shared/career-placement";
import { InstitutionAwarding } from "@/components/shared/institution-awarding";
import { InstitutionContact } from "@/components/shared/institution-contact";
import { InstitutionEnrollCta } from "@/components/shared/institution-enroll-cta";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import type { CareerPartner } from "@/components/shared/partner-carousel";
import { SharedHero } from "@/components/shared/shared-hero";
import { Testimonials } from "@/components/shared/testimonials";
import {
  getBachelorsPage,
  getBachelorsProgrammes,
} from "@/lib/cms/pages/bachelors";
import { testimonialsProps } from "@/lib/cms/testimonials";
import { hasImage, isExternalHref } from "@/lib/cms/types";
import { content, richText } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { createMetadata } from "@/lib/seo";
import { BachelorsAcademicHeadSection } from "./_components/bachelors-academic-head";
import { bachelorsCopy } from "./_components/bachelors-copy";
import { BachelorsCourseRail } from "./_components/bachelors-course-rail";
import { MouPartnersSection } from "./_components/mou-partners-section";
import { PearsonVueBanner } from "./_components/pearson-vue-banner";
import { UniversityPartnersSection } from "./_components/university-partners-section";
import { WhyUndergraduateSection } from "./_components/why-undergraduate-section";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getBachelorsPage();

  return createMetadata({
    path: institutionPath("bachelors"),
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

export default async function BachelorsPage() {
  const [page, programmes, institution, affiliations, partners] =
    await Promise.all([
      getBachelorsPage(),
      getBachelorsProgrammes(),
      content.getInstitution(),
      content.getAffiliations(),
      content.getPartners(),
    ]);
  const { hero, academicHead, courses } = page;

  const socials = institution.contact.socialProfiles.filter(
    (profile) => profile.destination === "external",
  );
  const watch = socials.find((profile) => profile.platform === "youtube");

  const networkPartners: readonly CareerPartner[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
  }));

  const headParagraphs = academicHead.paragraphs.filter(
    (item) => item.trim() !== "",
  );
  const alumni = testimonialsProps(page.alumni, "bachelors-alumni");

  return (
    <>
      <SharedHero
        entity={institution.entities.institute}
        heading={hero.title || undefined}
        heroLabel={hero.label || institution.entities.institute.name}
        motto={institution.motto}
        primaryCta={linkOf(hero.button)}
        slides={hero.slides.map((slide) => slide.image)}
        standfirst={hero.standfirst}
        watch={watch ?? null}
      />

      <WhyUndergraduateSection why={page.why} />

      {headParagraphs.length === 0 ? null : (
        <BachelorsAcademicHeadSection
          eyebrow={academicHead.label}
          id="academic-head"
          message={richText(...headParagraphs)}
          person={{
            name: academicHead.name,
            portrait: hasImage(academicHead.portrait)
              ? academicHead.portrait
              : null,
            title: academicHead.title,
          }}
        />
      )}

      {/* Dedicated University Partners & VC/Dean Messages */}
      <UniversityPartnersSection copy={page.universities} />

      <BachelorsCourseRail
        copy={{
          eyebrow: courses.label,
          heading: courses.title,
          standfirst:
            courses.description.trim() === "" ? null : courses.description,
          awardedLabel: courses.awardedLabel,
          startingLabel: courses.startingLabel,
          pendingLabel: courses.pendingLabel,
          items: programmes,
        }}
        id="programmes"
      />

      <InstitutionAwarding
        affiliations={affiliations}
        copy={{
          eyebrow: page.awarding.title,
          heading: page.awarding.label,
          standfirst: page.awarding.description,
          sinceLabel: page.awarding.sinceLabel,
        }}
        id="awarding"
        levelSlug={bachelorsCopy.levelSlug}
      />

      <PearsonVueBanner copy={page.pearson} />

      {hasImage(page.placement.image) ? (
        <CareerPlacement
          copy={{
            eyebrow: page.placement.title,
            heading: page.placement.label,
            image: page.placement.image,
            label: bachelorsCopy.partners.label,
          }}
          id="partners"
          partners={networkPartners}
          tone="surface"
        />
      ) : null}

      <Testimonials id="alumni" items={alumni.items} section={alumni.section} />

      <MouPartnersSection copy={page.mou} id="mou-partners" />

      <InstitutionNotices
        copy={{
          eyebrow: page.notices.title,
          heading: "",
          standfirst: page.notices.description,
          ctaLabel: page.notices.buttonLabel,
          emptyState: page.notices.emptyState,
        }}
        id="notices"
        institution="institute"
      />

      <InstitutionEnrollCta institution="institute" />

      <SiteNewsletterBand standfirst={institution.entities.institute.name} />

      <InstitutionContact id="contact" institution="institute" />
    </>
  );
}
