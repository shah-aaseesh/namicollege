"use client";

import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, P } from "@/components/ui/typography";
import type { ALevelsWhyContent } from "@/lib/cms/pages/a-levels";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function WhyALevelsSection({ why }: { why: ALevelsWhyContent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className="gutter-x section-y border-t border-border bg-surface"
      id="why-a-levels"
    >
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-16 items-center">
          {/* Left Column: Vertically Centered Title */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-5">
                <Eyebrow className="text-[#BD1B21]">{why.label}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>
              <SplitText as="h2" className="mt-4 text-ink">
                {why.title}
              </SplitText>
            </Reveal>
          </div>

          {/* Right Column: Paragraph 1 + Expandable Paragraph 2 */}
          <div className="lg:col-span-7">
            <Reveal stagger={0.08}>
              <RevealItem>
                <P className="text-base sm:text-lg font-body leading-relaxed text-ink text-justify [text-align-last:left] [hyphens:auto]">
                  {why.intro}
                </P>
              </RevealItem>

              {why.more.trim() === "" ? null : (
                <>
                  {/* Expandable Second Paragraph */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out overflow-hidden",
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-border"
                        : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <P className="text-base sm:text-lg font-body leading-relaxed text-ink-muted text-justify [text-align-last:left] [hyphens:auto]">
                        {why.more}
                      </P>
                    </div>
                  </div>

                  {/* Read More / Read Less Toggle */}
                  <RevealItem className="mt-4">
                    <button
                      aria-expanded={isExpanded}
                      className="group inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-accent transition-colors hover:text-primary-800 cursor-pointer"
                      onClick={() => setIsExpanded((prev) => !prev)}
                      type="button"
                    >
                      <span>{isExpanded ? "Read Less" : "Read More"}</span>
                      <Icon
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          isExpanded
                            ? "rotate-180"
                            : "group-hover:translate-y-0.5",
                        )}
                        icon={ChevronDownIcon}
                      />
                    </button>
                  </RevealItem>
                </>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
