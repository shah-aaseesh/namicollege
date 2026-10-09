import type { Metadata } from "next";
import { Testimonials } from "@/components/shared/testimonials";
import { getAboutPage } from "@/lib/cms/pages/about";
import { testimonialsProps } from "@/lib/cms/testimonials";
import { createMetadata } from "@/lib/seo";
import { AboutAwards } from "./_components/about-awards";
import { AboutCreed } from "./_components/about-creed";
import { AboutEmblem } from "./_components/about-emblem";
import { AboutHero } from "./_components/about-hero";
import { AboutLeadershipMessages } from "./_components/about-leadership-messages";
import { AboutMascot } from "./_components/about-mascot";
import { AboutOverview } from "./_components/about-overview";
import { CompactTimeline } from "./_components/compact-timeline";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutPage();

  return createMetadata({
    path: "/about",
    title: seo.title,
    description: seo.description,
  });
}

export default async function AboutPage() {
  const page = await getAboutPage();
  const testimonials = testimonialsProps(page.testimonials, "about");

  return (
    <>
      <AboutHero hero={page.hero} />
      <AboutOverview overview={page.overview} />

      {/* Leadership Messages Section */}
      <AboutLeadershipMessages leadership={page.leadership} />

      {/* History & Timeline Section */}
      <section
        id="history"
        className="gutter-x bg-surface-raised/40 border-y border-border scroll-mt-24"
      >
        <div className="mx-auto max-w-page">
          <CompactTimeline history={page.history} />
        </div>
      </section>

      <AboutEmblem emblem={page.emblem} />
      <AboutCreed creed={page.creed} />
      <AboutMascot mascot={page.mascot} />
      <AboutAwards awards={page.awards} />
      <Testimonials
        id="stakeholders"
        items={testimonials.items}
        section={testimonials.section}
      />
    </>
  );
}
