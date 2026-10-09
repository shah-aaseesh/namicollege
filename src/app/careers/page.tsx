import type { Metadata } from "next";

import { CareerPlacement } from "@/components/shared/career-placement";
import type { CareerPartner } from "@/components/shared/partner-carousel";
import { Testimonials } from "@/components/shared/testimonials";
import { getCareersPage, getVacancyList } from "@/lib/cms/pages/careers";
import { testimonialsProps } from "@/lib/cms/testimonials";
import { hasImage } from "@/lib/cms/types";
import { content } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { CareersBenefits } from "./_components/careers-benefits";
import { careersCopy } from "./_components/careers-copy";
import { CareersFirstJob } from "./_components/careers-first-job";
import { CareersMasthead } from "./_components/careers-masthead";
import { CareersVacancies } from "./_components/careers-vacancies";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCareersPage();
  return createMetadata({
    path: "/careers",
    title: seo.title,
    description: seo.description,
  });
}

export default async function CareersPage() {
  const [page, vacancies, partners] = await Promise.all([
    getCareersPage(),
    getVacancyList(),
    content.getPartners(),
  ]);

  const networkPartners: readonly CareerPartner[] = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
  }));
  const staff = testimonialsProps(page.staff, "careers-staff");

  return (
    <>
      <CareersMasthead
        copy={{
          eyebrow: page.masthead.label,
          heading: page.masthead.title,
          standfirst: page.masthead.description,
          cta: page.masthead.buttonLabel,
          image: page.masthead.image,
        }}
      />
      <CareersVacancies
        application={page.application}
        section={{
          navLabel: "Vacancies",
          eyebrow: page.vacancies.title,
          heading: page.vacancies.label,
          standfirst: page.vacancies.description,
          cta: null,
          emptyState: page.vacancies.emptyState,
        }}
        vacancies={vacancies}
      />
      <CareersBenefits
        copy={{
          eyebrow: page.benefits.title,
          heading: page.benefits.label,
          standfirst: page.benefits.description,
          items: page.benefits.items
            .filter((item) => item.title.trim() !== "")
            .map((item) => ({ title: item.title, desc: item.description })),
        }}
      />
      <Testimonials
        id="staff-stories"
        items={staff.items}
        section={staff.section}
      />
      <CareersFirstJob
        copy={{
          eyebrow: page.firstJob.label,
          heading: page.firstJob.title,
          standfirst: page.firstJob.description,
        }}
        stories={page.firstJob.stories
          .filter((story) => story.name.trim() !== "")
          .map((story, index) => ({
            id: `first-job-${index + 1}`,
            name: story.name,
            company: story.company,
            role: story.role,
            degree: story.degree,
            graduatedYear: story.graduatedYear,
            supportType: story.supportType,
            quote: story.quote,
            portrait: hasImage(story.portrait) ? story.portrait : null,
          }))}
      />
      {hasImage(page.placement.image) ? (
        <CareerPlacement
          copy={{
            eyebrow: page.placement.title,
            heading: page.placement.label,
            image: page.placement.image,
            label: careersCopy.placement.label,
          }}
          id="career-placement"
          partners={networkPartners}
        />
      ) : null}
    </>
  );
}
