import { AcademicLevels } from "@/components/shared/academic-levels";
import { Affiliations } from "@/components/shared/affiliations";
import { PrincipalMessage } from "@/components/shared/principal-message";
import { Testimonials } from "@/components/shared/testimonials";
import { getHomePage } from "@/lib/cms/pages/home";
import { testimonialsProps } from "@/lib/cms/testimonials";
import { hasImage } from "@/lib/cms/types";
import { richText } from "@/lib/content";
import { About } from "./_components/about";
import { Hero } from "./_components/hero";
import { HomePopup } from "./_components/home-popup";
import { ProgrammeMarquee } from "./_components/programme-marquee";
import { Stats } from "./_components/stats";
import { Updates } from "./_components/updates";

export default async function Home() {
  const page = await getHomePage();
  const { ceo, popup } = page;

  const testimonials = testimonialsProps(page.testimonials, "home");
  const ceoParagraphs = ceo.paragraphs.filter((item) => item.trim() !== "");

  return (
    <>
      <Hero hero={page.hero} />
      <ProgrammeMarquee marquee={page.marquee} />
      <About about={page.about} />
      <AcademicLevels institutions={page.institutions} />
      <Affiliations accreditation={page.accreditation} />
      {ceoParagraphs.length === 0 ? null : (
        <PrincipalMessage
          eyebrow={ceo.label}
          id="ceo-message"
          message={richText(...ceoParagraphs)}
          person={{
            name: ceo.name,
            portrait: hasImage(ceo.portrait) ? ceo.portrait : null,
            title: ceo.title,
          }}
        />
      )}
      <Stats stats={page.stats} />
      <Testimonials
        id="stakeholders"
        items={testimonials.items}
        section={testimonials.section}
      />
      <Updates notices={page.notices} />
      {popup.enabled && hasImage(popup.image) ? (
        <HomePopup popup={popup} />
      ) : null}
    </>
  );
}
