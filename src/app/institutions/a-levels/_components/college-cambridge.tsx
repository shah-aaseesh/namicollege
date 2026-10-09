import { SectionHeader } from "@/components/shared/section-header";
import { H4, H5, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  CollegeCambridgeHold,
  CollegeCambridgeStack,
} from "./college-cambridge-stack";

export type CambridgeProposition = {
  readonly title: string;
  readonly body: string;
};

export type CollegeCambridgeCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly propositions: readonly CambridgeProposition[];
};

const PROPOSITION_THEMES = [
  {
    numberColor: "text-[#BD1B21]",
    borderColor: "border-[#BD1B21]/30",
    badgeBg: "bg-[#BD1B21]/10 text-[#BD1B21]",
  },
  {
    numberColor: "text-[#BD1B21]",
    borderColor: "border-[#BD1B21]/30",
    badgeBg: "bg-[#BD1B21]/10 text-[#BD1B21]",
  },
  {
    numberColor: "text-[#BD1B21]",
    borderColor: "border-[#BD1B21]/30",
    badgeBg: "bg-[#BD1B21]/10 text-[#BD1B21]",
  },
  {
    numberColor: "text-[#BD1B21]",
    borderColor: "border-[#BD1B21]/30",
    badgeBg: "bg-[#BD1B21]/10 text-[#BD1B21]",
  },
] as const;

export function CollegeCambridge({
  badge = "Cambridge A-Levels",
  copy,
}: {
  readonly badge?: string;
  readonly copy: CollegeCambridgeCopy;
}) {
  return (
    <section
      className="bg-[#626951] text-white gutter-x section-y"
      id="cambridge"
    >
      <div className="mx-auto max-w-page lg:grid lg:grid-cols-12 lg:gap-x-10">
        <CollegeCambridgeHold className="lg:col-span-5">
          <SectionHeader
            description={copy.standfirst}
            descriptionClassName="text-white/85"
            eyebrow={copy.heading}
            eyebrowClassName="text-[#FFAD00] font-semibold"
            layout="stacked"
            title={copy.eyebrow ?? "Why Cambridge"}
            titleClassName="text-white"
            className="[&_[data-slot=eyebrow]+span]:bg-white/20"
          />
        </CollegeCambridgeHold>

        <CollegeCambridgeStack className="mt-12 flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:mt-0">
          {copy.propositions.map((proposition, index) => {
            const theme =
              PROPOSITION_THEMES[index % PROPOSITION_THEMES.length] ??
              PROPOSITION_THEMES[0];

            return (
              <li
                className={cn(
                  "relative rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-xl border-2 transition-shadow duration-200 hover:shadow-2xl",
                  theme.borderColor,
                )}
                data-pinned-panel=""
                // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
                key={`${index}-${proposition.title}`}
              >
                <div className="flex items-center justify-between">
                  <H4 as="p" className={cn("font-bold", theme.numberColor)}>
                    {String(index + 1).padStart(2, "0")}
                  </H4>
                  {badge.trim() === "" ? null : (
                    <span
                      className={cn(
                        "rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider",
                        theme.badgeBg,
                      )}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                <H5 as="h3" className="mt-5 text-neutral-900 font-semibold">
                  {proposition.title}
                </H5>
                <P className="mt-3 text-neutral-700 leading-relaxed">
                  {proposition.body}
                </P>
              </li>
            );
          })}
        </CollegeCambridgeStack>
      </div>
    </section>
  );
}
