import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, P } from "@/components/ui/typography";
import type { HomeAbout } from "@/lib/cms/pages/home";
import { isExternalHref } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

import { HomepageVideoPlayer } from "./homepage-video-player";

export function About({ about }: { about: HomeAbout }) {
  const paragraphs = about.paragraphs.filter((item) => item.trim() !== "");
  const showButton =
    about.button.label.trim() !== "" && about.button.href.trim() !== "";
  const isExternal = isExternalHref(about.button.href);

  return (
    <section
      className="gutter-x pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20"
      id="about"
    >
      <div className="mx-auto max-w-page">
        {/* Full-width Eyebrow Bar at top for clean horizontal alignment */}
        <Reveal>
          <div className="flex items-center gap-5">
            <Eyebrow>{about.label}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>

        {/* Section Heading */}
        <div className="mt-3 sm:mt-4">
          <Reveal>
            <SplitText
              as="h2"
              className="font-display text-[2.1rem] sm:text-4xl text-accent font-semibold sm:font-normal"
            >
              {about.title}
            </SplitText>
          </Reveal>
        </div>

        {/* 2-Column Content Grid: Left Video & Right Narrative+Button, equalized levels */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-12 items-stretch">
          {/* Left Column: Video aligned and equal level with right column */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal className="h-full flex flex-col" y={16}>
              <HomepageVideoPlayer
                poster={about.videoPoster.src || undefined}
                src={about.videoSrc || undefined}
                title={about.videoPoster.alt || about.label || "NAMI College"}
              />
            </Reveal>
          </div>

          {/* Right Column: Paragraphs & Button matching video height level */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <Reveal className="flex flex-col gap-4 sm:gap-5" stagger={0.08}>
              {paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P className="text-base sm:text-lg leading-relaxed text-ink/90 font-normal text-justify [text-align-last:left] [hyphens:auto]">
                    {paragraph}
                  </P>
                </RevealItem>
              ))}
            </Reveal>

            {showButton ? (
              <Reveal className="mt-6 sm:mt-8" y={10}>
                <Link
                  className={cn(
                    buttonVariants({ size: "lg", variant: "default" }),
                    "w-full sm:w-auto text-center justify-center",
                  )}
                  href={about.button.href as Route}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  {about.button.label}
                </Link>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
