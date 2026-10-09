"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { P } from "@/components/ui/typography";
import type { AboutHistory } from "@/lib/cms/pages/about";
import { hasImage } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

export function CompactTimeline({ history }: { history: AboutHistory }) {
  const milestones = history.milestones.filter(
    (item) => item.title.trim() !== "",
  );

  return (
    <div className="w-full py-8 sm:py-12 md:py-16">
      {/* Section Header */}
      <div className="text-left w-full mb-8 sm:mb-10 md:mb-12">
        <Reveal>
          <SplitText
            as="h2"
            className="font-display text-2xl sm:text-3xl md:text-4xl text-accent font-normal"
          >
            {history.title}
          </SplitText>
          <p className="mt-3 sm:mt-4 font-body text-sm sm:text-base text-neutral-700 leading-relaxed w-full text-justify [text-align-last:left]">
            {history.intro}
          </p>
        </Reveal>
      </div>

      {/* Timeline Spine */}
      <div className="relative w-full">
        {/* Continuous Central Vertical Line (Desktop md+) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent/30 via-accent to-accent/40 hidden md:block" />

        {/* Continuous Left Vertical Line (Mobile & Tablet < md) */}
        <div className="absolute top-0 bottom-0 left-3.5 sm:left-4 w-0.5 bg-gradient-to-b from-accent/30 via-accent to-accent/40 md:hidden" />

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: years repeat (two 2024 milestones)
                key={`${index}-${item.year}`}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-8",
                  isEven ? "md:flex-row-reverse" : "",
                )}
              >
                {/* Node Circle */}
                <div className="absolute left-3.5 sm:left-4 md:left-1/2 -translate-x-1/2 size-4 sm:size-5 rounded-full bg-surface border-2 sm:border-2.5 border-accent z-10 flex items-center justify-center shadow-xs">
                  <div className="size-1 sm:size-1.5 rounded-full bg-accent" />
                </div>

                {/* Milestone Card */}
                <div
                  className={cn(
                    "w-full md:w-[calc(50%-1.75rem)] pl-7 sm:pl-9 md:pl-0",
                    isEven ? "md:text-left" : "md:text-left",
                  )}
                >
                  <div className="rounded-2xl border border-border/80 bg-surface p-4 sm:p-5 md:p-6 shadow-xs hover:border-accent/40 hover:shadow-md transition-all duration-300 group">
                    {/* Top Row: Year + Era Pill + Partner Logo */}
                    <div className="flex items-center justify-between gap-2 sm:gap-3 pb-2.5 sm:pb-3 border-b border-border/60 mb-2.5 sm:mb-3">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="font-display text-base sm:text-lg md:text-xl font-black text-accent tracking-tight">
                          {item.year}
                        </span>
                        <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                          {item.era}
                        </span>
                      </div>

                      {hasImage(item.logo) ? (
                        <div className="relative h-8 sm:h-9 md:h-10 lg:h-12 w-20 sm:w-24 md:w-28 lg:w-36 shrink-0">
                          <Image
                            src={item.logo.src}
                            alt={item.logo.alt || item.partner}
                            fill
                            unoptimized
                            className="object-contain object-right"
                          />
                        </div>
                      ) : null}
                    </div>

                    {/* Milestone Title */}
                    <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>

                    {/* Summary Description */}
                    <P className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {item.description}
                    </P>
                  </div>
                </div>

                {/* Empty spacer for the opposite side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-1.75rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
