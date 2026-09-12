"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { H4, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export type SchoolCollaborator = {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly shortDescription: string;
  readonly description: string;
  readonly logo: string;
  readonly accent: string;
  readonly borderHover: string;
};

export const schoolCollaborators: readonly SchoolCollaborator[] = [
  {
    id: "3di",
    name: "3Di School",
    tagline: "Design, Software & Emerging Tech",
    shortDescription:
      "Hands-on design and technology platform exploring creativity and software through practical projects.",
    description:
      "3Di School provides a hands-on design and technology platform where students explore creativity, software, and emerging technologies through practical projects.",
    logo: "/collaborators/3di.png",
    accent: "bg-[#BD1B21]/10 text-[#BD1B21] border-[#BD1B21]/20",
    borderHover: "hover:border-[#BD1B21]/50",
  },
  {
    id: "play-nepal",
    name: "Play Nepal",
    tagline: "Movement, Focus & Physical Confidence",
    shortDescription:
      "Structured physical movement and team habits promoting active fitness and emotional well-being.",
    description:
      "Play Nepal helps students develop focus, physical confidence, teamwork, and active habits through joyful and structured movement. Their sessions also support students' emotional well-being and confidence.",
    logo: "/collaborators/play-nepal.png",
    accent: "bg-[#284540]/10 text-[#284540] border-[#284540]/20",
    borderHover: "hover:border-[#284540]/50",
  },
  {
    id: "unmath",
    name: "UnMath",
    tagline: "Creative & Experiential Mathematics",
    shortDescription:
      "Joyful experiential math education connecting core concepts to creativity and real-world situations.",
    description:
      "The UnMath Programme helps students experience mathematics with greater joy and confidence by connecting mathematical concepts to creativity and real-life situations. It supports engaging and meaningful math learning.",
    logo: "/collaborators/unmath.png",
    accent: "bg-[#F7CD00]/20 text-[#8F4800] border-[#F7CD00]/40",
    borderHover: "hover:border-[#F7CD00]/60",
  },
  {
    id: "mero-coding",
    name: "Mero Coding",
    tagline: "Coding & Computational Thinking",
    shortDescription:
      "Foundational coding and problem-solving skills empowering students to build interactive tech projects.",
    description:
      "Mero Coding introduces students to the fundamentals of coding and computational thinking. It helps students develop problem-solving, logical thinking, and creativity through coding activities. Students learn to create simple projects while building confidence with technology.",
    logo: "/collaborators/mero-coding.png",
    accent: "bg-[#0284C7]/10 text-[#0369A1] border-[#0284C7]/20",
    borderHover: "hover:border-[#0284C7]/50",
  },
  {
    id: "samatva-wellness",
    name: "Samatva Wellness",
    tagline: "Mindfulness & Holistic Well-Being",
    shortDescription:
      "Holistic wellness and mindfulness sessions nurturing mental and emotional balance.",
    description:
      "NAMI International School collaborates with Samatva Wellness to support student well-being through regular wellness classes and workshops.",
    logo: "/collaborators/samatva-wellness.png",
    accent: "bg-[#9CC21A]/15 text-[#284540] border-[#9CC21A]/30",
    borderHover: "hover:border-[#9CC21A]/60",
  },
] as const;

export function SchoolCollaboratorsSection({
  id = "collaborators",
}: {
  readonly id?: string;
}) {
  const [selectedCollab, setSelectedCollab] =
    useState<SchoolCollaborator | null>(null);

  return (
    <section
      className="gutter-x section-y border-t border-[#E8E2D2] bg-gradient-to-b from-[#FCFBF7] via-[#F7F3E8] to-[#FCFBF7] relative overflow-hidden"
      id={id}
    >
      {/* Subtle brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-[#F7CD00]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-[#BD1B21]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-page">
        <SectionHeader
          description="We collaborate with premier specialized learning partners to complement classroom education and enrich student discovery."
          eyebrow="Partners in Learning"
          layout="split"
          title="Our Learning Collaborators"
        />

        <Reveal
          className="mt-8 sm:mt-10 lg:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          stagger={0.06}
        >
          {schoolCollaborators.map((collab) => (
            <RevealItem key={collab.id}>
              <div
                className={cn(
                  "group flex h-full flex-col justify-between rounded-2xl border border-[#E5DECf] bg-white p-5 transition-all duration-300 shadow-2xs hover:shadow-xl hover:-translate-y-1",
                  collab.borderHover,
                )}
              >
                <div className="flex flex-col flex-1">
                  {/* Partner Logo - Clean Transparent Stage */}
                  <div className="relative flex h-24 w-full items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      alt={`${collab.name} logo`}
                      className="max-h-20 w-auto max-w-[190px] object-contain drop-shadow-2xs"
                      height={80}
                      loading="lazy"
                      src={collab.logo}
                      width={200}
                    />
                  </div>

                  {/* Partner Tag & Name */}
                  <div className="mt-3 flex flex-col flex-1">
                    <span
                      className={cn(
                        "self-start inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
                        collab.accent,
                      )}
                    >
                      Partner
                    </span>
                    <H4
                      as="h3"
                      className="mt-2.5 font-display text-base sm:text-lg font-semibold text-ink line-clamp-1"
                    >
                      {collab.name}
                    </H4>
                    <p className="mt-0.5 font-body text-[11px] font-semibold text-ink-muted uppercase tracking-wider line-clamp-1">
                      {collab.tagline}
                    </p>
                    <P className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink-muted line-clamp-2">
                      {collab.shortDescription}
                    </P>
                  </div>
                </div>

                {/* Read More Trigger Button */}
                <div className="mt-4 pt-3 border-t border-[#F0EBE0]">
                  <button
                    type="button"
                    onClick={() => setSelectedCollab(collab)}
                    className="group/btn inline-flex items-center gap-1.5 text-xs font-semibold text-[#BD1B21] transition-colors hover:text-[#93151A] cursor-pointer"
                  >
                    <span>Read more</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                    >
                      &rarr;
                    </span>
                  </button>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* Full Collaborator Details Modal */}
      <Dialog
        open={selectedCollab !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedCollab(null);
        }}
      >
        <DialogContent className="max-w-md sm:max-w-lg p-6 sm:p-7">
          {selectedCollab && (
            <div>
              {/* Modal Header with Logo & Partner Info */}
              <div className="flex items-center gap-4 pb-4 border-b border-[#EBE5D8]">
                <div className="relative flex h-20 w-32 shrink-0 items-center justify-center p-1">
                  <Image
                    alt={`${selectedCollab.name} logo`}
                    className="max-h-16 w-auto max-w-[130px] object-contain"
                    height={64}
                    src={selectedCollab.logo}
                    width={130}
                  />
                </div>
                <DialogHeader className="text-left min-w-0 flex-1">
                  <span
                    className={cn(
                      "self-start inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
                      selectedCollab.accent,
                    )}
                  >
                    Learning Partner
                  </span>
                  <DialogTitle className="mt-1 font-display text-xl font-semibold text-ink">
                    {selectedCollab.name}
                  </DialogTitle>
                  <DialogDescription className="font-body text-xs font-medium uppercase tracking-wider text-ink-muted">
                    {selectedCollab.tagline}
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Full Description */}
              <div className="mt-4 space-y-3">
                <P className="font-body text-sm leading-relaxed text-ink/85">
                  {selectedCollab.description}
                </P>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
