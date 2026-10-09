import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Eyebrow, H4, H6, P } from "@/components/ui/typography";
import type { AboutAwards as AboutAwardsContent } from "@/lib/cms/pages/about";

export function AboutAwards({ awards }: { awards: AboutAwardsContent }) {
  const ordered = awards.items
    .filter((award) => award.title.trim() !== "")
    .sort((a, b) => b.year - a.year);
  const [latest, ...rest] = ordered;

  return (
    <section className="gutter-x section-y" id="awards">
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={awards.label || undefined}
          title={awards.title || undefined}
          description={awards.description || undefined}
        />

        {latest === undefined ? (
          awards.emptyState.trim() === "" ? null : (
            <P className="mt-12 lg:w-5/12">{awards.emptyState}</P>
          )
        ) : (
          <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-10">
            <Reveal className="lg:col-span-5" y={32}>
              <article className="field-brand flex h-full flex-col justify-between gap-10 rounded-3xl p-6 sm:p-10 xl:p-12">
                <p className="font-display text-6xl leading-none">
                  {latest.year}
                </p>
                <div className="border-t border-border pt-8">
                  <Eyebrow>{latest.awardingBody}</Eyebrow>
                  <H4 as="h3" className="mt-4">
                    {latest.title}
                  </H4>
                  {latest.citation.trim() === "" ? null : (
                    <P className="mt-5">{latest.citation}</P>
                  )}
                </div>
              </article>
            </Reveal>

            {rest.length === 0 ? null : (
              <Reveal
                className="mt-10 flex flex-col gap-8 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:gap-10"
                stagger={0.1}
              >
                {rest.map((award, index) => (
                  <RevealItem
                    className="flex items-baseline gap-5 border-t border-border pt-5 sm:gap-8"
                    // biome-ignore lint/suspicious/noArrayIndexKey: awards are an ordered CMS list
                    key={`${index}-${award.title}`}
                  >
                    <p className="shrink-0 font-display text-3xl leading-none text-ink-muted">
                      {award.year}
                    </p>
                    <div className="min-w-0">
                      <Eyebrow>{award.awardingBody}</Eyebrow>
                      <H6 as="h3" className="mt-2">
                        {award.title}
                      </H6>
                      {award.citation.trim() === "" ? null : (
                        <P className="mt-3 text-sm">{award.citation}</P>
                      )}
                    </div>
                  </RevealItem>
                ))}
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
