import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P } from "@/components/ui/typography";
import type { AboutCreed as AboutCreedContent } from "@/lib/cms/pages/about";

function CreedCard({
  label,
  paragraphs,
}: {
  label: string;
  paragraphs: readonly string[];
}) {
  if (paragraphs.length === 0) return null;

  // Clean any wrapping or trailing/leading quotation marks so quotes aren't in the sentence
  const cleanParagraphs = paragraphs.map((paragraph) =>
    paragraph.trim().replace(/^["“]/, "").replace(/["”]$/, ""),
  );

  return (
    <div className="group relative overflow-hidden flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-border/80 bg-surface-raised p-6 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 hover:shadow-md hover:border-accent/40">
      <div className="relative z-10">
        <div>
          <Eyebrow
            as="h3"
            className="text-accent text-sm font-semibold tracking-wider uppercase"
          >
            {label}
          </Eyebrow>
        </div>
        <div className="mt-5 sm:mt-6 flex flex-col gap-4">
          {cleanParagraphs.map((paragraph) => (
            <P
              className="text-base sm:text-lg lg:text-xl leading-relaxed text-ink/90 font-normal text-justify [text-align-last:left]"
              key={paragraph}
            >
              {paragraph}
            </P>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutCreed({ creed }: { creed: AboutCreedContent }) {
  const missionParagraphs = creed.mission.filter((item) => item.trim() !== "");
  const visionParagraphs = creed.vision.filter((item) => item.trim() !== "");

  if (missionParagraphs.length === 0 && visionParagraphs.length === 0) {
    return null;
  }

  return (
    <section className="gutter-x section-y" id="creed">
      <div className="mx-auto max-w-page">
        {/* Section Heading */}
        <Reveal>
          <div className="flex items-center gap-5">
            <Eyebrow>{creed.label}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>

        <div className="mt-4 sm:mt-5">
          <Reveal>
            <SplitText
              as="h2"
              className="font-display text-3xl sm:text-4xl text-accent font-normal"
            >
              {creed.title}
            </SplitText>
          </Reveal>
        </div>

        {/* 2-Column Side-by-Side Cards: Left Mission & Right Vision */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <Reveal className="h-full" y={16}>
            <CreedCard
              label={creed.missionLabel}
              paragraphs={missionParagraphs}
            />
          </Reveal>

          <Reveal className="h-full" y={24}>
            <CreedCard
              label={creed.visionLabel}
              paragraphs={visionParagraphs}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
