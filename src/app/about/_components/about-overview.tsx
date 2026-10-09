import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { P } from "@/components/ui/typography";
import type { AboutOverview as AboutOverviewContent } from "@/lib/cms/pages/about";
import { hasImage } from "@/lib/cms/types";

export function AboutOverview({
  overview,
}: {
  overview: AboutOverviewContent;
}) {
  const paragraphs = overview.paragraphs.filter((item) => item.trim() !== "");
  const image = hasImage(overview.image) ? overview.image : null;

  return (
    <section
      className="gutter-x pt-3 sm:pt-5 lg:pt-6 pb-10 sm:pb-12 lg:pb-14"
      id="overview"
    >
      <div className="mx-auto max-w-page">
        {/* Section Heading */}
        {overview.title === "" ? null : (
          <div>
            <Reveal>
              <SplitText
                as="h2"
                className="font-display text-3xl sm:text-4xl text-accent font-normal"
              >
                {overview.title}
              </SplitText>
            </Reveal>
          </div>
        )}

        {/* 2-Column Content Grid: Left Narrative & Right Image */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12 items-stretch">
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            <Reveal className="flex flex-col gap-4 sm:gap-5" stagger={0.08}>
              {paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P className="text-base sm:text-lg leading-relaxed text-ink/90 font-normal text-justify [text-align-last:left] [hyphens:auto]">
                    {paragraph}
                  </P>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          {image === null ? null : (
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col">
              <Reveal className="h-full flex flex-col" y={16}>
                <figure className="relative h-full min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] w-full overflow-hidden rounded-2xl border border-border/80 bg-surface-raised shadow-sm">
                  <Image
                    alt={image.alt}
                    className="h-full w-full object-cover object-left-top origin-top-left transition-transform duration-700 hover:scale-105"
                    height={image.height || 1062}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 560px"
                    src={image.src}
                    width={image.width || 1600}
                  />
                </figure>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
