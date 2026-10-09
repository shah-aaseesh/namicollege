"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { H4, P } from "@/components/ui/typography";
import type { ContentImage } from "@/lib/content";
import { CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useSchoolBand } from "./school-band-context";

export type SchoolSubjectGroup = {
  readonly title: string;
  readonly subjects: readonly string[];
};

export type SchoolStream = {
  readonly name: string;
  readonly note: string;
  readonly subjects?: readonly string[];
  readonly subjectGroups?: readonly SchoolSubjectGroup[];
  readonly photo?: ContentImage;
};

export type SchoolBand = {
  readonly label: string;
  readonly affiliationSlug: string;
  readonly sinceLabel: string;
  readonly enrolment: string | null;
  readonly body: string;
  readonly notes: readonly string[];
  readonly streams: readonly SchoolStream[];
};

export type SchoolBandsCopy = {
  readonly eyebrow?: string;
  readonly heading?: string;
  readonly standfirst?: string;
  readonly primary: SchoolBand;
  readonly secondary: SchoolBand;
  readonly photo?: ContentImage;
};

function BandContent({ band }: { readonly band: SchoolBand }) {
  return (
    <div>
      <P className="w-full max-w-none text-ink-muted leading-relaxed text-justify [text-align-last:left] [hyphens:auto]">
        {band.body}
      </P>

      {band.notes.length === 0 ? null : (
        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {band.notes.map((note, idx) => (
            <li
              className="flex items-start gap-3 font-body text-sm text-ink-muted"
              key={note}
            >
              <div
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full shadow-xs",
                  idx % 2 === 0
                    ? "bg-[#9CC21A]/20 text-[#284540]"
                    : "bg-[#F7CD00]/30 text-[#BD1B21]",
                )}
              >
                <Icon className="size-3" icon={CheckIcon} />
              </div>
              <span className="leading-snug">{note}</span>
            </li>
          ))}
        </ul>
      )}

      {band.streams.length === 0 ? null : (
        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2">
          {band.streams.map((stream, sIdx) => (
            <div
              className="rounded-2xl border border-[#E5DECf] bg-white p-6 lg:p-8 transition-all duration-300 shadow-2xs hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
              // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
              key={`${sIdx}-${stream.name}`}
            >
              <div>
                {stream.photo && (
                  <div className="relative mb-6 aspect-[16/11] w-full overflow-hidden rounded-xl bg-neutral-100">
                    <Image
                      alt={stream.photo.alt}
                      className="object-cover object-left-top"
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      src={stream.photo.src}
                    />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <H4
                    as="h3"
                    className="font-display text-lg sm:text-xl font-semibold text-ink"
                  >
                    {stream.name}
                  </H4>
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted text-justify [text-align-last:left] [hyphens:auto]">
                  {stream.note}
                </p>
              </div>

              {stream.subjectGroups && stream.subjectGroups.length > 0 ? (
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center px-0.5">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-ink/70">
                      Subject Combinations
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {stream.subjectGroups.map((group, gIdx) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
                        key={`${gIdx}-${group.title}`}
                        className="flex flex-col rounded-xl border border-[#E5DECf] bg-[#FAF7F0]/70 p-3 transition-all duration-200 hover:border-primary-400 hover:bg-white hover:shadow-sm"
                      >
                        {/* Track Header */}
                        <div className="mb-2.5 pb-2 border-b border-[#E5DECf]">
                          <span className="font-body text-[10px] font-bold uppercase tracking-widest text-primary-700">
                            Track {String.fromCharCode(65 + gIdx)}
                          </span>
                          <h4 className="font-display text-xs font-bold text-ink leading-snug mt-0.5 min-h-[34px] flex items-center">
                            {group.title}
                          </h4>
                        </div>

                        {/* Subjects */}
                        <ul className="space-y-1.5 flex-1">
                          {group.subjects.map((subject) => (
                            <li
                              key={subject}
                              className="flex items-start gap-1.5 text-xs text-ink/85 font-body leading-snug font-medium"
                            >
                              <span className="mt-1.5 size-1 rounded-full bg-primary-600 shrink-0" />
                              <span>{subject}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : stream.subjects && stream.subjects.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {stream.subjects.map((subject) => (
                    <span
                      className="rounded-full bg-surface px-3 py-1 font-body text-xs text-ink-muted ring-1 ring-border/80"
                      key={subject}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SchoolBands({
  copy,
  id,
  primaryExtra,
  secondaryExtra,
}: {
  readonly copy: SchoolBandsCopy;
  readonly id?: string;
  readonly primaryExtra?: ReactNode;
  readonly secondaryExtra?: ReactNode;
}) {
  const { activeBand, setActiveBand } = useSchoolBand();

  return (
    <div id={id}>
      <section className="gutter-x section-y border-t border-[#EAE3D4] bg-gradient-to-b from-[#FAF7F0] via-[#F4EFE5] to-[#FAF7F0] relative overflow-hidden">
        {/* Ambient background blur */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-0 size-[450px] rounded-full bg-[#BD1B21]/5 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 size-[450px] rounded-full bg-[#F7CD00]/8 blur-3xl"
        />

        <div className="relative mx-auto max-w-page">
          <SectionHeader
            description={copy.standfirst}
            eyebrow={copy.heading}
            layout="split"
            title={copy.eyebrow ?? "Academic Bands"}
          />

          <RevealItem className="mt-8 sm:mt-10 lg:mt-14">
            <Tabs
              value={activeBand}
              onValueChange={(val) => {
                if (val === "primary" || val === "secondary") {
                  setActiveBand(val);
                }
              }}
              className="w-full"
            >
              <TabsList className="mb-6 sm:mb-8 lg:mb-10 gap-6 sm:gap-10 lg:gap-12 border-b border-[#E0D8C8] pb-1">
                <TabsTab
                  value="primary"
                  className="py-3 sm:py-3.5 font-display text-base sm:text-xl lg:text-2xl font-medium text-ink-muted transition-all duration-200 hover:text-ink data-active:text-[#BD1B21] data-active:font-semibold"
                >
                  {copy.primary.label}
                </TabsTab>
                <TabsTab
                  value="secondary"
                  className="py-3 sm:py-3.5 font-display text-base sm:text-xl lg:text-2xl font-medium text-ink-muted transition-all duration-200 hover:text-ink data-active:text-[#BD1B21] data-active:font-semibold"
                >
                  {copy.secondary.label}
                </TabsTab>
              </TabsList>

              <TabsPanel value="primary">
                <BandContent band={copy.primary} />
              </TabsPanel>

              <TabsPanel value="secondary">
                <BandContent band={copy.secondary} />
              </TabsPanel>
            </Tabs>
          </RevealItem>
        </div>
      </section>

      {/* Full-width Extra Section (Collaborators for School / Clubs for +2) */}
      {activeBand === "primary" ? primaryExtra : secondaryExtra}
    </div>
  );
}
