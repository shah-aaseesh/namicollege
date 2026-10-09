import type { Route } from "next";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H5, P } from "@/components/ui/typography";
import type { ContentLink } from "@/lib/content";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type CollegeEntryBlock = {
  readonly title: string;
  readonly body: string;
};

export type CollegeEntryCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly cta: ContentLink;
  readonly blocks: readonly CollegeEntryBlock[];
};

export function CollegeEntry({ copy }: { readonly copy: CollegeEntryCopy }) {
  const external = copy.cta.destination === "external";

  return (
    <section
      className="bg-[#E9EC6B]/[0.06] text-ink gutter-x section-y border-t border-border"
      id="entry"
    >
      <div className="mx-auto max-w-page">
        {/* Full-width Eyebrow Bar */}
        <Reveal className="flex items-center gap-5" stagger={0.08}>
          <Eyebrow className="text-[#BD1B21]">
            {copy.eyebrow ?? "Admissions & Entry"}
          </Eyebrow>
          <span className="h-px flex-1 bg-border" />
        </Reveal>

        <div className="mt-6 sm:mt-8 lg:mt-10 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-5" stagger={0.08}>
            <SplitText as="h2" className="mt-0 text-ink">
              {copy.heading}
            </SplitText>
            {copy.cta.label.trim() === "" ? null : (
              <RevealItem className="mt-8 lg:mt-10">
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full justify-center gap-2 px-6 sm:w-auto bg-[#BD1B21] text-white hover:bg-[#9e1419] font-semibold shadow-md",
                  )}
                  href={copy.cta.href as Route}
                  rel={external ? "noopener noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                >
                  <span>{copy.cta.label}</span>
                  <Icon className="size-4 text-white" icon={ArrowUpRightIcon} />
                </Link>
              </RevealItem>
            )}
          </Reveal>

          <Reveal
            className="mt-14 flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:mt-0"
            stagger={0.12}
          >
            {copy.blocks.map((block, index) => (
              <RevealItem
                className="border-t border-border pt-6"
                // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
                key={`${index}-${block.title}`}
              >
                <H5 as="h3" className="text-ink font-semibold">
                  {block.title}
                </H5>
                <P className="mt-3 text-ink-muted leading-relaxed">
                  {block.body}
                </P>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
