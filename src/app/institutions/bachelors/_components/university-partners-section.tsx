"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, H3 } from "@/components/ui/typography";
import type {
  BachelorsPageContent,
  BachelorsUniversityPartner,
} from "@/lib/cms/pages/bachelors";
import { hasImage } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

function UniversityCard({
  partner,
  index,
  defaultExpanded = false,
}: {
  partner: BachelorsUniversityPartner;
  index: number;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  // The dark style was designed for the University of Northampton card.
  const isUoN = partner.dark;
  const overview = partner.overview.filter((para) => para.trim() !== "");
  const leaderMessage = partner.leaderMessage.filter(
    (para) => para.trim() !== "",
  );
  const metrics = partner.metrics.filter((m) => m.value.trim() !== "");
  const programmes = partner.programmes.filter(
    (prog) => prog.title.trim() !== "",
  );

  return (
    <article
      id={`partner-${index + 1}`}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300",
        isUoN
          ? "bg-[#1B1D22] text-white shadow-2xl border border-zinc-800"
          : "bg-surface text-ink border border-border/80 shadow-xs hover:border-accent/40 hover:shadow-md",
      )}
    >
      {/* Ambient background glow for UoN Waterside brand card */}
      {isUoN && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#E0006C]/10 blur-3xl"
        />
      )}

      {/* Top Header Row: Identity, Metadata & University Logo */}
      <div
        className={cn(
          "relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b",
          isUoN ? "border-zinc-800" : "border-border/70",
        )}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xs",
                isUoN
                  ? "bg-[#E0006C]/15 text-[#FF2A85] border border-[#E0006C]/30"
                  : "bg-accent/10 text-accent border border-accent/20",
              )}
            >
              {partner.badge}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                isUoN ? "text-zinc-300" : "text-ink-muted",
              )}
            >
              • {partner.status}
            </span>
          </div>

          <H3
            className={cn(
              "mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight",
              isUoN ? "!text-white" : "text-ink",
            )}
          >
            {partner.name}
          </H3>

          <p
            className={cn(
              "mt-1 text-xs sm:text-sm font-medium",
              isUoN ? "text-zinc-300" : "text-ink-muted",
            )}
          >
            {partner.location}
          </p>
        </div>

        {/* Logo Container */}
        {hasImage(partner.logo) ? (
          <div
            className={cn(
              "relative h-16 sm:h-20 w-48 sm:w-64 shrink-0 flex items-center justify-center p-2.5 sm:p-3 rounded-2xl transition-transform duration-200 group-hover:scale-[1.02]",
              isUoN
                ? "bg-white shadow-md border border-zinc-200"
                : "bg-surface-raised/60 border border-border/80 shadow-xs",
            )}
          >
            <div className="relative w-full h-full">
              <Image
                src={partner.logo.src}
                alt={partner.logo.alt || `${partner.name} Crest`}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Collapsed State Preview */}
      {!isExpanded && (
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <p
              className={cn(
                "text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left] line-clamp-2 sm:line-clamp-3 font-normal",
                isUoN ? "!text-zinc-200" : "text-ink/80",
              )}
            >
              {overview[0]}
            </p>

            <div
              className={cn(
                "mt-2 flex items-center gap-2 text-xs font-semibold",
                isUoN ? "text-[#FF2A85]" : "text-accent",
              )}
            >
              <span className="shrink-0">{partner.leaderRole}:</span>
              <span
                className={cn(
                  "italic font-normal line-clamp-1",
                  isUoN ? "text-zinc-300" : "text-ink-muted",
                )}
              >
                &ldquo;{partner.leaderQuote}&rdquo;
              </span>
            </div>
          </div>

          <div className="shrink-0 self-start md:self-center">
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs",
                isUoN
                  ? "bg-[#E0006C] text-white hover:bg-[#C2005D] hover:shadow-lg hover:shadow-pink-500/20"
                  : "bg-accent text-white hover:bg-accent/90",
              )}
            >
              <span>Explore Profile &amp; Message</span>
              <svg
                aria-hidden="true"
                className="size-3.5"
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
        </div>
      )}

      {/* Expanded State: 2-Row Clean Layout */}
      {isExpanded && (
        <div className="mt-8 animate-in fade-in-50 duration-300 space-y-8">
          {/* Row 1: Academic Standing & Affiliated Degree Programmes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Academic Standing Overview */}
            <div className="lg:col-span-5">
              <h4
                className={cn(
                  "font-display text-base sm:text-lg font-bold mb-3.5",
                  isUoN ? "!text-white" : "text-ink",
                )}
              >
                Academic Standing &amp; Educational Model
              </h4>

              <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left]">
                {overview.map((para, paraIndex) => (
                  <p
                    // biome-ignore lint/suspicious/noArrayIndexKey: items are an ordered CMS list
                    key={paraIndex}
                    className={cn(
                      "leading-relaxed font-normal",
                      isUoN ? "!text-zinc-200" : "text-ink/80",
                    )}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {partner.note.trim() !== "" && (
                <div
                  className={cn(
                    "mt-4 p-3 rounded-xl border text-xs leading-relaxed",
                    isUoN
                      ? "bg-zinc-800/80 border-zinc-700/80 text-zinc-300"
                      : "bg-accent/5 border-accent/20 text-ink-muted",
                  )}
                >
                  <span
                    className={cn(
                      "font-semibold",
                      isUoN ? "text-[#FF2A85]" : "text-accent",
                    )}
                  >
                    Note:{" "}
                  </span>
                  {partner.note}
                </div>
              )}
            </div>

            {/* Right: Metrics Strip & Multi-Column Programmes */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              {/* Metrics Strip */}
              <div>
                <p
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider mb-2.5",
                    isUoN ? "text-[#FF2A85]" : "text-accent",
                  )}
                >
                  Key Partnership Metrics:
                </p>
                <div
                  className={cn(
                    "grid grid-cols-3 gap-3 p-4 rounded-2xl border",
                    isUoN
                      ? "bg-zinc-800/80 border-zinc-700/80"
                      : "bg-surface-raised/40 border-border/70",
                  )}
                >
                  {metrics.map((m, metricIndex) => (
                    <div
                      className="text-center"
                      // biome-ignore lint/suspicious/noArrayIndexKey: items are an ordered CMS list
                      key={metricIndex}
                    >
                      <p
                        className={cn(
                          "font-display text-sm sm:text-base font-bold",
                          isUoN ? "!text-white" : "text-ink",
                        )}
                      >
                        {m.value}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] sm:text-[11px] mt-0.5 leading-tight",
                          isUoN ? "text-zinc-300" : "text-ink-muted",
                        )}
                      >
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affiliated Programmes - Multi Column Grid */}
              <div
                className={cn(
                  "mt-6 pt-5 border-t",
                  isUoN ? "border-zinc-800" : "border-border/70",
                )}
              >
                <p
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider mb-3",
                    isUoN ? "text-[#FF2A85]" : "text-accent",
                  )}
                >
                  Affiliated Degree Programmes:
                </p>

                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2.5">
                  {programmes.map((prog, progIndex) => (
                    <Link
                      // biome-ignore lint/suspicious/noArrayIndexKey: items are an ordered CMS list
                      key={progIndex}
                      href={"#programmes" as Route}
                      className={cn(
                        "group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border text-xs transition-all duration-200 cursor-pointer",
                        isUoN
                          ? "bg-zinc-800/90 border-zinc-700/80 text-white shadow-xs hover:border-[#E0006C]/70 hover:bg-zinc-700/90 hover:scale-[1.01]"
                          : "border-border/80 bg-surface-raised/80 hover:bg-surface hover:border-accent/50 text-ink hover:text-accent shadow-2xs",
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span
                          className={cn(
                            "size-2 rounded-full shrink-0 transition-transform group-hover:scale-125",
                            isUoN ? "bg-[#E0006C]" : "bg-accent",
                          )}
                        />
                        <span
                          className={cn(
                            "font-display font-bold leading-tight line-clamp-1",
                            isUoN
                              ? "text-zinc-100"
                              : "text-ink group-hover:text-accent",
                          )}
                        >
                          {prog.title}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "text-[11px] font-semibold shrink-0 whitespace-nowrap",
                          isUoN
                            ? "text-[#FF2A85]"
                            : "text-ink-muted group-hover:text-accent",
                        )}
                      >
                        ({prog.award})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Full-Width Leadership Showcase */}
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border shadow-2xs",
              isUoN
                ? "bg-zinc-800/70 backdrop-blur-xs border-zinc-700/80 text-white"
                : "bg-surface-raised/50 border-border/90 text-ink",
            )}
          >
            {/* Background Quote Mark */}
            <svg
              aria-hidden="true"
              className={cn(
                "pointer-events-none select-none absolute right-4 top-4 size-28 sm:size-36",
                isUoN ? "text-[#E0006C]/10" : "text-accent/8",
              )}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Big VC Portrait & Credentials */}
              {hasImage(partner.leaderPhoto) ? (
                <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center sm:items-start">
                  <div className="relative aspect-[3/4] w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] rounded-2xl overflow-hidden border-2 border-[#E0006C]/50 shadow-2xl bg-zinc-900">
                    <Image
                      src={partner.leaderPhoto.src}
                      alt={partner.leaderPhoto.alt || partner.leaderName}
                      fill
                      className="object-cover object-[center_55%]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
                      priority
                    />
                  </div>
                  <div className="mt-4 text-center sm:text-left px-1">
                    <p
                      className={cn(
                        "font-display font-bold text-lg sm:text-xl leading-tight",
                        isUoN ? "!text-white" : "text-ink",
                      )}
                    >
                      {partner.leaderName}
                    </p>
                    <p
                      className={cn(
                        "font-body text-xs sm:text-sm font-semibold mt-1",
                        isUoN ? "text-[#FF2A85]" : "text-accent",
                      )}
                    >
                      {partner.leaderTitle}
                    </p>
                    <p
                      className={cn(
                        "font-body text-xs mt-0.5",
                        isUoN ? "text-zinc-300" : "text-ink-muted",
                      )}
                    >
                      {partner.leaderAffiliation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center">
                  <div
                    className={cn(
                      "p-5 rounded-2xl border",
                      isUoN
                        ? "bg-zinc-800 border-zinc-700"
                        : "bg-surface border-border/80",
                    )}
                  >
                    <p
                      className={cn(
                        "font-display font-bold text-base",
                        isUoN ? "!text-white" : "text-ink",
                      )}
                    >
                      {partner.leaderName}
                    </p>
                    <p
                      className={cn(
                        "font-body text-xs font-semibold mt-1",
                        isUoN ? "text-[#FF2A85]" : "text-accent",
                      )}
                    >
                      {partner.leaderTitle}
                    </p>
                    <p
                      className={cn(
                        "font-body text-xs mt-0.5",
                        isUoN ? "text-zinc-300" : "text-ink-muted",
                      )}
                    >
                      {partner.leaderAffiliation}
                    </p>
                  </div>
                </div>
              )}

              {/* Right Column: Role Chip, Featured Quote & Full Address */}
              <div className="md:col-span-7 lg:col-span-8">
                {/* Role Chip */}
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4",
                    isUoN
                      ? "bg-[#E0006C]/15 text-[#FF2A85] border-[#E0006C]/30"
                      : "bg-accent/10 text-accent border-accent/20",
                  )}
                >
                  <span>{partner.leaderRole}</span>
                </div>

                {/* Featured Quote */}
                <blockquote
                  className={cn(
                    "relative pl-4 border-l-3 italic font-display text-base sm:text-lg leading-relaxed mb-6",
                    isUoN
                      ? "border-[#E0006C] text-zinc-100"
                      : "border-accent text-ink",
                  )}
                >
                  &ldquo;{partner.leaderQuote}&rdquo;
                </blockquote>

                {/* Message Paragraphs */}
                <div
                  className={cn(
                    "space-y-4 text-xs sm:text-sm leading-relaxed text-justify [text-align-last:left]",
                    isUoN ? "!text-zinc-200" : "text-ink/80",
                  )}
                >
                  {leaderMessage.map((msg, msgIndex) => (
                    <p
                      className="leading-relaxed font-normal"
                      // biome-ignore lint/suspicious/noArrayIndexKey: items are an ordered CMS list
                      key={msgIndex}
                    >
                      {msg}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Collapse Footer Action */}
          <div
            className={cn(
              "mt-8 pt-5 border-t flex justify-end",
              isUoN ? "border-zinc-800" : "border-border/60",
            )}
          >
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border shadow-xs",
                isUoN
                  ? "bg-zinc-800 text-[#FF2A85] hover:bg-[#E0006C] hover:text-white border-zinc-700"
                  : "bg-accent/10 hover:bg-accent hover:text-white text-accent border-accent/20",
              )}
            >
              <span>Collapse Details</span>
              <svg
                aria-hidden="true"
                className="size-3.5 rotate-180"
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
        </div>
      )}
    </article>
  );
}

export function UniversityPartnersSection({
  copy,
}: {
  readonly copy: BachelorsPageContent["universities"];
}) {
  const partners = copy.partners.filter(
    (partner) => partner.name.trim() !== "",
  );

  if (partners.length === 0) return null;

  return (
    <section
      className="gutter-x section-y bg-surface-raised/20 border-y border-border"
      id="university-partners"
    >
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <Reveal>
            <div className="flex items-center gap-5">
              <Eyebrow className="text-accent">{copy.label}</Eyebrow>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <div className="mt-4 sm:mt-5">
            <Reveal>
              <SplitText
                as="h2"
                className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight"
              >
                {copy.title}
              </SplitText>
            </Reveal>
          </div>
        </div>

        {/* Both Cards Expandable / Collapsible */}
        <div className="space-y-8 sm:space-y-12">
          {partners.map((partner, index) => (
            <UniversityCard
              defaultExpanded={index === 0}
              index={index}
              // biome-ignore lint/suspicious/noArrayIndexKey: items are an ordered CMS list
              key={index}
              partner={partner}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
