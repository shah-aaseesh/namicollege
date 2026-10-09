import type { Metadata } from "next";
import { SiteNewsletterBand } from "@/components/layout/site-newsletter-band";
import { InstitutionClubsSection } from "@/components/shared/institution-clubs-section";
import { InstitutionContact } from "@/components/shared/institution-contact";
import { InstitutionEnrollCta } from "@/components/shared/institution-enroll-cta";
import { InstitutionNotices } from "@/components/shared/institution-notices";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { SharedHero } from "@/components/shared/shared-hero";
import { getClubsPage, getSchoolClubs } from "@/lib/cms/pages/clubs";
import { getSchoolPage, type SchoolBandContent } from "@/lib/cms/pages/school";
import { testimonialsProps } from "@/lib/cms/testimonials";
import { hasImage, isExternalHref } from "@/lib/cms/types";
import { content, richText } from "@/lib/content";
import { institutionPath } from "@/lib/content/institutions";
import { createMetadata } from "@/lib/seo";
import { SchoolAdmission } from "./_components/school-admission";
import { SchoolApproachValuesSection } from "./_components/school-approach-values-section";
import { SchoolBandProvider } from "./_components/school-band-context";
import { SchoolBandTestimonials } from "./_components/school-band-testimonials";
import { type SchoolBand, SchoolBands } from "./_components/school-bands";
import { SchoolCollaboratorsSection } from "./_components/school-collaborators-section";
import { SchoolDay } from "./_components/school-day";
import { SchoolFaqSection } from "./_components/school-faq-section";
import { WhySchoolSection } from "./_components/why-school-section";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSchoolPage();

  return createMetadata({
    path: institutionPath("school"),
    title: seo.title,
    description: seo.description,
  });
}

function bandOf(band: SchoolBandContent): SchoolBand {
  return {
    label: band.tabLabel,
    affiliationSlug: "",
    sinceLabel: "",
    enrolment: null,
    body: band.body,
    notes: band.notes.filter((note) => note.trim() !== ""),
    streams: band.streams
      .filter((stream) => stream.name.trim() !== "")
      .map((stream) => ({
        name: stream.name,
        note: stream.note,
        photo: hasImage(stream.photo) ? stream.photo : undefined,
        subjects: stream.subjects.filter((subject) => subject.trim() !== ""),
        subjectGroups: stream.subjectGroups
          .filter((group) => group.title.trim() !== "")
          .map((group) => ({
            title: group.title,
            subjects: group.subjects.filter((subject) => subject.trim() !== ""),
          })),
      })),
  };
}

export default async function SchoolPage() {
  const [page, institution, clubsPage, clubs] = await Promise.all([
    getSchoolPage(),
    content.getInstitution(),
    getClubsPage(),
    getSchoolClubs(),
  ]);
  const { hero, principal } = page;

  const socials = institution.contact.socialProfiles.filter(
    (profile) => profile.destination === "external",
  );
  const watch = socials.find((profile) => profile.platform === "youtube");

  const principalParagraphs = principal.paragraphs.filter(
    (item) => item.trim() !== "",
  );
  const parents = testimonialsProps(page.parentVoices, "school-parents");
  const plusTwo = testimonialsProps(page.plusTwoVoices, "school-plus-two");

  return (
    <SchoolBandProvider>
      <SharedHero
        entity={institution.entities.school}
        heading={hero.title || undefined}
        heroLabel={hero.title || institution.entities.school.name}
        motto={institution.motto}
        primaryCta={{
          label: hero.button.label,
          href: hero.button.href,
          destination: isExternalHref(hero.button.href)
            ? "external"
            : "internal",
        }}
        slides={hero.slides.map((slide) => slide.image)}
        standfirst={hero.standfirst}
        watch={watch ?? null}
      />

      <WhySchoolSection why={page.why} />

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

      <SchoolApproachValuesSection approach={page.approach} />

      <SchoolAdmission
        copy={{
          eyebrow: page.admission.title,
          heading: page.admission.label,
          standfirst: page.admission.description,
          stepLabel: "Step",
          steps: page.admission.steps.filter(
            (step) => step.title.trim() !== "",
          ),
        }}
      />
      <SchoolBands
        copy={{
          eyebrow: page.academics.title,
          heading: page.academics.label || undefined,
          standfirst: page.academics.description || undefined,
          primary: bandOf(page.primaryBand),
          secondary: bandOf(page.plusTwoBand),
        }}
        id="academics"
        primaryExtra={
          <>
            <SchoolCollaboratorsSection collaborators={page.collaborators} />
            <SchoolFaqSection faq={page.faq} />
          </>
        }
        secondaryExtra={
          <InstitutionClubsSection
            clubs={clubs}
            copy={clubsPage.school}
            tone="brand"
          />
        }
      />

      <SchoolDay
        copy={{
          eyebrow: page.facilities.title,
          heading: page.facilities.label || null,
          standfirst: page.facilities.description || null,
          campusLabel: "",
          campus: page.facilities.items
            .filter((item) => item.title.trim() !== "")
            .map((item) => ({
              title: item.title,
              body: item.body,
              photo: hasImage(item.photo) ? item.photo : undefined,
            })),
        }}
        id="day"
      />

      <SchoolBandTestimonials
        parentItems={parents.items}
        parentSection={parents.section}
        plusTwoItems={plusTwo.items}
        plusTwoSection={plusTwo.section}
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
        institution="school"
      />

      <InstitutionEnrollCta institution="school" />

      <SiteNewsletterBand standfirst={institution.entities.school.name} />

      <InstitutionContact id="contact" institution="school" />
    </SchoolBandProvider>
  );
}
