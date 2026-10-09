"use client";

import {
  Calendar03Icon,
  Call02Icon,
  Compass01Icon,
  File01Icon,
  Search01Icon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type SchoolAdmissionStep = {
  readonly title: string;
  readonly body: string;
};

export type SchoolAdmissionCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly stepLabel: string;
  readonly steps: readonly SchoolAdmissionStep[];
};

const STEP_ICONS = [
  Search01Icon,
  Compass01Icon,
  File01Icon,
  Calendar03Icon,
  Call02Icon,
  Tick02Icon,
  SparklesIcon,
];

const STEP_BADGE_CLASS = "bg-neutral-950 text-white";

const CARD_THEMES = [
  {
    bg: "bg-[#BD1B21]",
    border: "border-[#BD1B21]/40",
    dashed: "border-[#BD1B21]/50 group-hover:border-[#BD1B21]",
    shadow: "shadow-primary-950/15 group-hover:shadow-primary-950/25",
    hoverText: "group-hover:text-primary-100",
  },
  {
    bg: "bg-[#284540]",
    border: "border-[#284540]/40",
    dashed: "border-[#284540]/50 group-hover:border-[#284540]",
    shadow: "shadow-black/15 group-hover:shadow-black/25",
    hoverText: "group-hover:text-white",
  },
  {
    bg: "bg-[#F7CD00]",
    border: "border-[#F7CD00]/40",
    dashed: "border-[#F7CD00]/50 group-hover:border-[#F7CD00]",
    shadow: "shadow-amber-950/15 group-hover:shadow-amber-950/25",
    hoverText: "group-hover:text-neutral-900",
  },
  {
    bg: "bg-[#9CC21A]",
    border: "border-[#9CC21A]/40",
    dashed: "border-[#9CC21A]/50 group-hover:border-[#9CC21A]",
    shadow: "shadow-lime-950/15 group-hover:shadow-lime-950/25",
    hoverText: "group-hover:text-neutral-950",
  },
  {
    bg: "bg-[#33B8C7]",
    border: "border-[#33B8C7]/40",
    dashed: "border-[#33B8C7]/50 group-hover:border-[#33B8C7]",
    shadow: "shadow-cyan-950/15 group-hover:shadow-cyan-950/25",
    hoverText: "group-hover:text-cyan-100",
  },
  {
    bg: "bg-[#BF6BA6]",
    border: "border-[#BF6BA6]/40",
    dashed: "border-[#BF6BA6]/50 group-hover:border-[#BF6BA6]",
    shadow: "shadow-purple-950/15 group-hover:shadow-purple-950/25",
    hoverText: "group-hover:text-purple-100",
  },
  {
    bg: "bg-[#E85296]",
    border: "border-[#E85296]/40",
    dashed: "border-[#E85296]/50 group-hover:border-[#E85296]",
    shadow: "shadow-pink-950/15 group-hover:shadow-pink-950/25",
    hoverText: "group-hover:text-pink-100",
  },
] as const;

function DiamondStepCard({
  index,
  step,
}: {
  index: number;
  step: SchoolAdmissionStep;
}) {
  const isEven = index % 2 === 1; // 0, 2, 4, 6 (top 4) | 1, 3, 5 (bottom 3)
  const IconComponent = STEP_ICONS[index % STEP_ICONS.length] ?? SparklesIcon;
  const theme = CARD_THEMES[index % CARD_THEMES.length] ?? CARD_THEMES[0];

  return (
    <li
      className={cn(
        "group relative flex shrink-0 snap-center flex-col items-center justify-center transition-all duration-300",
        "w-[170px] h-[170px] sm:w-[185px] sm:h-[185px] lg:w-[145px] lg:h-[145px] xl:w-[172px] xl:h-[172px] 2xl:w-[190px] 2xl:h-[190px]",
        isEven ? "mt-10 sm:mt-12 lg:mt-11 xl:mt-14 2xl:mt-16" : "mt-0",
      )}
      data-reveal-item=""
    >
      {/* Outer Dashed Decorative Border */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-2.5 sm:inset-3 rotate-45 rounded-2xl sm:rounded-3xl border border-dashed transition-all duration-300 group-hover:scale-102",
          theme.dashed,
        )}
      />

      {/* Main Diamond Shape */}
      <div
        className={cn(
          "absolute inset-3 sm:inset-3.5 rotate-45 rounded-2xl sm:rounded-3xl border shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105",
          theme.bg,
          theme.border,
          theme.shadow,
        )}
      />

      {/* Top Apex: Circular Step Number Badge */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex size-6.5 sm:size-7 lg:size-6.5 xl:size-8 items-center justify-center rounded-full font-display text-[10px] sm:text-xs xl:text-xs font-bold shadow-md ring-3 ring-surface transition-transform duration-300 group-hover:scale-110",
          STEP_BADGE_CLASS,
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Bottom Apex: Step Icon Badge */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 flex size-6.5 sm:size-7 lg:size-6.5 xl:size-8 items-center justify-center rounded-full bg-neutral-950 text-white shadow-md ring-3 ring-surface transition-transform duration-300 group-hover:scale-110">
        <Icon
          className="size-3 sm:size-3.5 xl:size-4 text-white"
          icon={IconComponent}
        />
      </div>

      {/* Upright Center Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 sm:px-3 lg:px-2 xl:px-3 max-w-[125px] sm:max-w-[140px] lg:max-w-[115px] xl:max-w-[138px] 2xl:max-w-[155px]">
        <h4
          className={cn(
            "font-display text-[11px] sm:text-xs lg:text-[10.5px] xl:text-xs 2xl:text-sm font-bold text-white uppercase tracking-wider leading-tight transition-colors line-clamp-2",
            theme.hoverText,
          )}
        >
          {step.title}
        </h4>

        <p className="mt-1 text-[9.5px] sm:text-[10.5px] lg:text-[9.5px] xl:text-[11px] 2xl:text-xs font-normal leading-tight text-white/95 line-clamp-3">
          {step.body}
        </p>
      </div>
    </li>
  );
}

function MobileStepCard({
  index,
  step,
  isLast,
}: {
  index: number;
  step: SchoolAdmissionStep;
  isLast: boolean;
}) {
  const IconComponent = STEP_ICONS[index % STEP_ICONS.length] ?? SparklesIcon;
  const theme = CARD_THEMES[index % CARD_THEMES.length] ?? CARD_THEMES[0];

  return (
    <li className="relative flex items-start gap-4 pb-6 last:pb-0">
      {/* Vertical Connecting Line */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-5 top-11 bottom-0 w-0.5 -translate-x-1/2 bg-border/80"
        />
      )}

      {/* Step Icon & Number Badge */}
      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-surface-raised shadow-xs">
        <div
          className={cn(
            "flex size-7.5 items-center justify-center rounded-xl",
            theme.bg,
            "text-white shadow-2xs",
          )}
        >
          <Icon className="size-4 text-white" icon={IconComponent} />
        </div>
      </div>

      {/* Main Content Card taking full width */}
      <div className="flex-1 min-w-0 rounded-2xl border border-border bg-surface-raised p-4 sm:p-5 shadow-2xs transition-all hover:border-accent/40">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
            Step {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h4 className="mt-1 font-display text-base font-semibold text-ink leading-snug">
          {step.title}
        </h4>

        <p className="mt-1.5 font-body text-xs sm:text-sm leading-relaxed text-ink-muted text-justify [text-align-last:left] [hyphens:auto]">
          {step.body}
        </p>
      </div>
    </li>
  );
}

export function SchoolAdmission({
  copy,
  id = "admissions",
}: {
  readonly copy: SchoolAdmissionCopy;
  readonly id?: string;
}) {
  const total = copy.steps.length;

  if (total === 0) return null;

  return (
    <section
      className="bg-surface text-ink gutter-x section-y border-t border-border overflow-x-clip"
      id={id}
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading || undefined}
          title={copy.eyebrow ?? "Admission Process"}
          description={copy.standfirst}
        />

        {/* Desktop View: 7-Step Zig-Zag Diamond Flow (lg and above) */}
        <div className="hidden lg:block mt-8 sm:mt-10 lg:mt-12 w-full">
          <div className="overflow-visible flex justify-center w-full pt-4 pb-8">
            <ol className="flex items-start lg:-space-x-4 xl:-space-x-5 2xl:-space-x-6 w-full justify-center">
              {copy.steps.map((step, index) => (
                <DiamondStepCard
                  index={index}
                  // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
                  key={`${index}-${step.title}`}
                  step={step}
                />
              ))}
            </ol>
          </div>
        </div>

        {/* Mobile View: Vertical Step Timeline (below lg) */}
        <div className="block lg:hidden mt-8 sm:mt-10 w-full">
          <ol className="relative flex flex-col w-full">
            {copy.steps.map((step, index) => (
              <MobileStepCard
                index={index}
                isLast={index === copy.steps.length - 1}
                // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
                key={`${index}-${step.title}`}
                step={step}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
