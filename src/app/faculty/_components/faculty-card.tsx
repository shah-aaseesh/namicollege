"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { P } from "@/components/ui/typography";
import type { FacultyPerson } from "@/lib/cms/pages/faculty";
import { hasImage } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

function BioContent({ text }: { readonly text: string }) {
  const blocks = text.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((block, bIdx) => {
        const lines = block
          .split(/\n/)
          .map((l) => l.trim())
          .filter(Boolean);

        const hasBullets = lines.some(
          (l) => l.startsWith("•") || l.startsWith("-"),
        );

        if (hasBullets) {
          const headings: string[] = [];
          const bullets: string[] = [];

          for (const line of lines) {
            if (line.startsWith("•") || line.startsWith("-")) {
              bullets.push(line.replace(/^[•-]\s*/, ""));
            } else {
              headings.push(line);
            }
          }

          return (
            <div className="space-y-2" key={bIdx}>
              {headings.map((h, hIdx) => (
                <p
                  className="font-semibold text-xs sm:text-sm text-ink font-body"
                  key={hIdx}
                >
                  {h}
                </p>
              ))}
              <ul className="space-y-2 pl-1">
                {bullets.map((bullet, idx) => (
                  <li
                    className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-ink/85 font-body text-justify [text-align-last:left]"
                    key={idx}
                  >
                    <span className="size-1.5 mt-2 shrink-0 rounded-full bg-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p
            className="text-xs sm:text-sm leading-relaxed text-ink/85 font-body text-justify [text-align-last:left]"
            key={bIdx}
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}

export function FacultyCard({
  leader,
  index,
  isFirstGroup = false,
  isScrollable = false,
  isSolo = false,
  className,
}: {
  readonly leader: FacultyPerson;
  readonly index: number;
  readonly isFirstGroup?: boolean;
  readonly isScrollable?: boolean;
  readonly isSolo?: boolean;
  readonly className?: string;
}) {
  const [open, setOpen] = useState(false);
  const portrait = hasImage(leader.portrait) ? leader.portrait : null;

  return (
    <>
      <div
        className={cn(
          "group flex flex-col snap-center shrink-0 h-full rounded-2xl overflow-hidden border border-border/75 bg-surface-raised shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-accent/40 transition-all duration-300",
          className
            ? className
            : cn(
                "w-[75vw] max-w-[280px] sm:w-[40vw] sm:max-w-[300px]",
                isScrollable
                  ? "lg:w-[calc((100%-6rem)/4)] lg:max-w-none"
                  : isSolo
                    ? "w-full max-w-[280px] sm:max-w-[320px] lg:max-w-sm"
                    : "w-full sm:w-[280px] lg:w-[300px] lg:max-w-[320px]",
              ),
        )}
      >
        <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100">
          {portrait ? (
            <Image
              alt={portrait.alt || leader.name}
              className="absolute inset-0 object-cover object-top transition-transform duration-700 group-hover:scale-105"
              fetchPriority={isFirstGroup && index === 0 ? "high" : "auto"}
              fill
              loading={isFirstGroup && index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 25vw"
              src={portrait.src}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-300">
              <svg className="size-16" fill="currentColor" viewBox="0 0 24 24">
                <title>Faculty portrait silhouette</title>
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-3.5 sm:p-4 flex flex-col flex-1">
          {/* Role / Title Slot - Single Line */}
          <div className="h-5 flex items-center">
            <p
              className="font-body text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-accent truncate w-full"
              title={leader.title}
            >
              {leader.title}
            </p>
          </div>

          {/* Name Slot */}
          <div className="mt-1 h-6 flex items-center">
            <h3 className="font-display text-base sm:text-[17px] font-medium text-ink line-clamp-1 group-hover:text-accent transition-colors">
              {leader.name}
            </h3>
          </div>

          {/* Bio Excerpt Slot - Justified with equal left & right gap */}
          <div className="mt-2 h-[4.25rem] overflow-hidden">
            <p className="text-xs sm:text-[12.5px] text-ink-muted leading-relaxed line-clamp-3 text-justify [text-align-last:left] break-words [hyphens:auto]">
              {leader.brief}
            </p>
          </div>

          {/* Bottom Action */}
          <div className="mt-auto pt-3.5 flex items-center justify-start">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer shadow-2xs group/btn"
            >
              <span>Read Full Bio</span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover/btn:translate-x-0.5"
              >
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Bio Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg sm:max-w-2xl max-h-[85vh] flex flex-col p-6 sm:p-8">
          <div className="flex items-start gap-4 sm:gap-5 pb-4 border-b border-border/70">
            {portrait && (
              <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-2xl border border-border/60 shadow-md">
                <Image
                  alt={portrait.alt || leader.name}
                  className="object-cover object-top"
                  fill
                  sizes="80px"
                  src={portrait.src}
                />
              </div>
            )}
            <DialogHeader className="min-w-0 flex-1 text-left">
              <p className="font-body text-xs font-bold uppercase tracking-wider text-accent">
                {leader.title}
              </p>
              <DialogTitle className="mt-1 text-xl sm:text-2xl font-display font-medium text-ink">
                {leader.name}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto pt-4 pr-1">
            <BioContent
              text={leader.bio.trim() === "" ? leader.brief : leader.bio}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
