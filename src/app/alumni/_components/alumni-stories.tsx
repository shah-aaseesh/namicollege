"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { AlumniStory } from "./alumni-copy";

export function AlumniStories({
  copy,
  stories,
  tabs,
}: {
  readonly stories: readonly AlumniStory[];
  readonly tabs: readonly { readonly id: string; readonly label: string }[];
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
  };
}) {
  const [activeStory, setActiveStory] = useState<AlumniStory | null>(null);
  const [selectedWing, setSelectedWing] = useState<string>("all");

  const filteredStories =
    selectedWing === "all"
      ? stories
      : stories.filter((s) => s.institution === selectedWing);

  const wingFilters = tabs;

  return (
    <section
      className="gutter-x section-y border-t border-border bg-surface"
      id="alumni-stories"
    >
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <SectionHeader
          description={copy.standfirst}
          eyebrow={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 border border-primary-200/80 px-3 py-0.5 text-xs font-semibold tracking-wider text-primary-700 uppercase">
              <span className="size-1.5 rounded-full bg-primary-700" />
              {copy.eyebrow}
            </span>
          }
          layout="split"
          title={copy.heading}
        />

        {/* Wing Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {wingFilters.map((tab) => {
              const isActive = selectedWing === tab.id;
              const count =
                tab.id === "all"
                  ? stories.length
                  : stories.filter((s) => s.institution === tab.id).length;

              return (
                <button
                  className={cn(
                    "group flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer",
                    isActive
                      ? "bg-primary-700 text-white shadow-sm shadow-primary-700/25"
                      : "bg-surface-raised border border-border text-ink-muted hover:border-primary-400 hover:text-primary-700 hover:bg-primary-100/30",
                  )}
                  key={tab.id}
                  onClick={() => setSelectedWing(tab.id)}
                  type="button"
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-muted text-ink-muted group-hover:text-primary-700 group-hover:bg-primary-200/60",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Alumni Ledger */}
        {filteredStories.length === 0 ? (
          <div className="mt-8 py-16 px-6 text-center rounded-2xl border border-dashed border-border bg-surface-raised/40 max-w-xl mx-auto">
            <p className="font-display text-lg font-medium text-ink mb-2">
              Spotlights Coming Soon
            </p>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              Alumni spotlights for this program are currently being compiled.
              Are you an alumnus? Share your story with us.
            </p>
            <a
              href="#alumni-network"
              className="inline-flex items-center gap-2 rounded-full bg-primary-700 text-white px-5 py-2 text-xs font-semibold hover:bg-primary-800 transition-colors"
            >
              Submit Your Story
              <Icon icon={ArrowRight01Icon} className="size-3.5" />
            </a>
          </div>
        ) : (
          <div className="mt-6 divide-y divide-border border-y border-border">
            {filteredStories.map((story) => (
              <button
                className="group w-full py-6 sm:py-7 text-left transition-all duration-200 hover:bg-primary-100/25 cursor-pointer block focus-visible:outline-2 focus-visible:outline-primary-700 rounded-xl px-2 sm:px-4"
                key={story.id}
                onClick={() => setActiveStory(story)}
                type="button"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
                  {/* 1. Alumnus Profile & Identity (Cols 1-4) */}
                  <div className="lg:col-span-4 flex items-center gap-4">
                    <div className="relative size-14 sm:size-16 shrink-0 overflow-hidden rounded-full border-2 border-primary-200 group-hover:border-primary-700 group-hover:ring-2 group-hover:ring-primary-700/20 transition-all shadow-xs">
                      <Image
                        alt={story.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-108"
                        height={80}
                        src={story.avatar}
                        width={80}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg sm:text-xl font-medium text-ink group-hover:text-primary-700 transition-colors truncate">
                          {story.name}
                        </h3>
                        <span className="text-xs text-ink-muted shrink-0">
                          ({story.graduationYear.replace("Batch of ", "’")})
                        </span>
                      </div>

                      <p className="font-body text-xs sm:text-sm font-semibold text-ink/80 mt-0.5 truncate">
                        {story.currentRole}
                      </p>

                      <p className="font-body text-xs text-primary-700 font-medium truncate">
                        {story.company} •{" "}
                        <span className="text-ink-muted">{story.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* 2. Key Story Highlights (Cols 5-9) */}
                  <div className="lg:col-span-5 space-y-1.5">
                    <span className="inline-block rounded-full bg-primary-100/70 border border-primary-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-primary-700 mb-1">
                      {story.institutionLabel}
                    </span>
                    <p className="font-body text-xs sm:text-sm text-ink/85 leading-relaxed">
                      {story.summaryHighlights[0]}
                    </p>
                    <p className="font-body text-xs text-ink-muted leading-relaxed hidden sm:block">
                      {story.summaryHighlights[1]}
                    </p>
                  </div>

                  {/* 3. Action Button (Cols 10-12) */}
                  <div className="lg:col-span-3 flex lg:justify-end items-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary-200/80 bg-surface-raised px-4 py-2 text-xs font-semibold text-ink shadow-xs transition-all duration-200 group-hover:border-primary-700 group-hover:bg-primary-700 group-hover:text-white">
                      <span>Read Story</span>
                      <Icon
                        className="size-3 transition-transform group-hover:translate-x-0.5"
                        icon={ArrowRight01Icon}
                      />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Standard Story Modal Dialog */}
      <Dialog
        open={Boolean(activeStory)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveStory(null);
          }
        }}
      >
        {activeStory && (
          <DialogContent className="max-w-2xl sm:max-w-3xl max-h-[88vh] flex flex-col p-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-7 border-b border-border bg-surface-raised/50 shrink-0">
              <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-2xl border border-border/80 shadow-md">
                <Image
                  alt={activeStory.name}
                  className="size-full object-cover"
                  height={100}
                  src={activeStory.avatar}
                  width={100}
                />
              </div>

              <DialogHeader className="min-w-0 flex-1 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-full bg-primary-100 text-primary-700 px-2.5 py-0.5 text-xs font-semibold border border-primary-200/70">
                    {activeStory.institutionLabel}
                  </span>
                  <span className="inline-block rounded-full bg-surface text-ink-muted px-2.5 py-0.5 text-xs font-medium border border-border">
                    {activeStory.graduationYear}
                  </span>
                </div>

                <DialogTitle className="mt-1 text-xl sm:text-2xl font-display font-medium text-ink">
                  {activeStory.name}
                </DialogTitle>

                <p className="font-body text-xs sm:text-sm font-semibold text-primary-700 mt-0.5">
                  {activeStory.currentRole} at {activeStory.company}
                </p>

                <p className="font-body text-xs text-ink-muted">
                  Programme: {activeStory.programme} • {activeStory.location}
                </p>
              </DialogHeader>
            </div>

            {/* Modal Body: Scrollable Story Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* Highlight Quote */}
              <div className="rounded-xl bg-primary-100/30 p-4 sm:p-5 border-l-4 border-primary-700 italic text-sm sm:text-base text-ink font-display leading-relaxed">
                &ldquo;{activeStory.keyQuote}&rdquo;
              </div>

              {/* Story Narrative */}
              <div className="space-y-3">
                <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-ink border-b border-border pb-1.5">
                  The Journey & Educational Experience
                </h4>
                <div className="space-y-3 text-xs sm:text-sm text-ink/85 leading-relaxed font-body text-justify [text-align-last:left] [hyphens:auto]">
                  {activeStory.pdfData.storyParagraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>
                      {paragraph.split(/(\*\*.*?\*\*)/g).map((part) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong
                              key={part}
                              className="font-semibold text-ink"
                            >
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        return part;
                      })}
                    </p>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-3">
                <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-ink border-b border-border pb-1.5">
                  Career Trajectory & Milestones
                </h4>
                <div className="space-y-3">
                  {activeStory.pdfData.careerMilestones.map((milestone) => (
                    <div
                      className="flex items-start gap-3 sm:gap-4 text-xs sm:text-sm"
                      key={milestone.year + milestone.title}
                    >
                      <span className="font-mono font-bold text-primary-700 shrink-0 w-24 sm:w-28 text-xs pt-0.5">
                        {milestone.year}
                      </span>
                      <div className="flex-1 pb-2.5 border-b border-border/50 last:border-0 last:pb-0">
                        <p className="font-semibold text-ink">
                          {milestone.title} —{" "}
                          <span className="font-normal text-ink-muted">
                            {milestone.organization}
                          </span>
                        </p>
                        <p className="text-ink-muted text-xs mt-0.5 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graduate Reflections / Q&A */}
              <div className="space-y-3">
                <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-ink border-b border-border pb-1.5">
                  In Conversation with {activeStory.name}
                </h4>
                <div className="space-y-3">
                  {activeStory.pdfData.interviewQnA.map((item) => (
                    <div
                      className="space-y-1 text-xs sm:text-sm bg-surface-raised rounded-xl p-3.5 sm:p-4 border border-border"
                      key={item.question.slice(0, 30)}
                    >
                      <p className="font-semibold text-ink">
                        Q: {item.question}
                      </p>
                      <p className="text-ink/85 leading-relaxed italic text-xs sm:text-sm">
                        &ldquo;{item.answer}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-2">
                <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-ink border-b border-border pb-1.5">
                  Core Skills & Focus Areas
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeStory.pdfData.skillsAcquired.map((skill) => (
                    <span
                      className="rounded-full bg-surface-raised border border-border px-3 py-1 text-xs font-medium text-ink-muted"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
