"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H3, H4, P } from "@/components/ui/typography";
import type { AboutLeadership } from "@/lib/cms/pages/about";
import { hasImage } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

export function AboutLeadershipMessages({
  leadership,
}: {
  leadership: AboutLeadership;
}) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const messages = leadership.messages
    .filter((leader) => leader.name.trim() !== "")
    .map((leader, index) => ({
      ...leader,
      id: String(index),
      message: leader.paragraphs.filter((item) => item.trim() !== ""),
    }));

  if (messages.length === 0) return null;

  const toggleExpand = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <section className="gutter-x section-y" id="leadership-messages">
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-5">
              <Eyebrow className="text-accent">{leadership.label}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <div className="mt-4 sm:mt-5">
            <Reveal>
              <SplitText
                as="h2"
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight"
              >
                {leadership.title}
              </SplitText>
            </Reveal>
          </div>
        </div>

        {/* Leadership Message Cards */}
        <div className="mt-12 sm:mt-16 flex flex-col gap-12 lg:gap-16">
          {messages.map((leader, index) => {
            const isExpanded = expandedCard === leader.id;
            const isReversed = index % 2 !== 0;
            const visibleParagraphs = isExpanded
              ? leader.message
              : leader.message.slice(0, 2);

            return (
              <div
                key={leader.id}
                id={`message-${index + 1}`}
                className="group rounded-3xl border border-border/90 bg-surface-raised p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:shadow-md hover:border-accent/30"
              >
                <div
                  className={cn(
                    "flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12",
                    isReversed && "lg:flex-row-reverse",
                  )}
                >
                  {/* Portrait Column */}
                  <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-neutral-900/5 shadow-xs">
                      {hasImage(leader.portrait) ? (
                        <Image
                          src={leader.portrait.src}
                          alt={leader.portrait.alt || leader.name}
                          fill
                          unoptimized
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                          sizes="(max-width: 1023px) 100vw, 360px"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="mt-4 border-t border-border/80 pt-3">
                      <p className="font-display text-lg sm:text-xl font-bold text-ink">
                        {leader.name}
                      </p>
                      <p className="font-body text-xs sm:text-sm font-semibold text-accent">
                        {leader.title}
                      </p>
                      <p className="mt-0.5 font-body text-xs text-ink-muted">
                        {leader.credentials}
                      </p>
                    </div>
                  </div>

                  {/* Message Column */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20 mb-4">
                        <span>{leader.badge}</span>
                      </div>

                      {/* Featured Quote */}
                      {leader.quote.trim() === "" ? null : (
                        <blockquote className="relative pl-5 sm:pl-6 border-l-3 border-accent italic font-display text-base sm:text-lg lg:text-xl text-ink leading-relaxed mb-6">
                          &ldquo;{leader.quote}&rdquo;
                        </blockquote>
                      )}

                      {/* Message Paragraphs */}
                      <div className="space-y-4">
                        {visibleParagraphs.map((paragraph, pIndex) => (
                          <P
                            key={pIndex}
                            className="text-sm sm:text-base text-ink/85 leading-relaxed text-justify [text-align-last:left]"
                          >
                            {paragraph}
                          </P>
                        ))}
                      </div>
                    </div>

                    {/* Expand / Collapse Button */}
                    {leader.message.length > 2 && (
                      <div className="mt-6 pt-4 border-t border-border/60">
                        <button
                          type="button"
                          onClick={() => toggleExpand(leader.id)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-all duration-200 cursor-pointer shadow-xs"
                        >
                          <span>
                            {isExpanded ? "Read Less" : "Read Full Message"}
                          </span>
                          <svg
                            aria-hidden="true"
                            className={cn(
                              "size-3.5 transition-transform duration-200",
                              isExpanded && "rotate-180",
                            )}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
