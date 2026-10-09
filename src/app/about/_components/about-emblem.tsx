import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Tilt } from "@/components/motion/tilt";
import { FivePetals } from "@/components/shared/five-petals";
import { Eyebrow, P, Standfirst } from "@/components/ui/typography";
import type { AboutEmblem as AboutEmblemContent } from "@/lib/cms/pages/about";
import { hasImage } from "@/lib/cms/types";
import { AboutValuesDisclosure } from "./about-values-disclosure";

export function AboutEmblem({ emblem }: { emblem: AboutEmblemContent }) {
  const paragraphs = emblem.paragraphs.filter((item) => item.trim() !== "");
  const lead = paragraphs[0];
  const rest = paragraphs.slice(1);
  const petals = emblem.values
    .filter((value) => value.name.trim() !== "")
    .map((value, index) => ({ ...value, id: `petal-${index + 1}` }));

  return (
    <section
      className="field-ink gutter-x overflow-x-clip section-y"
      id="emblem"
    >
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <Reveal className="lg:col-span-5 lg:col-start-1" y={48}>
            <Tilt max={8} scale={1.04}>
              <div className="group relative flex items-center justify-center py-10 lg:py-0">
                <div className="absolute -inset-10 -z-10 rounded-full bg-accent/5 blur-3xl transition-opacity duration-700 group-hover:bg-accent/10" />
                {hasImage(emblem.image) ? (
                  <Image
                    alt={emblem.image.alt}
                    className="h-auto w-full max-w-sm object-contain mix-blend-multiply drop-shadow-2xl lg:max-w-md"
                    height={emblem.image.height || 408}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 450px"
                    src={emblem.image.src}
                    width={emblem.image.width || 612}
                  />
                ) : null}
              </div>
            </Tilt>
          </Reveal>

          <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <Reveal>
              <div className="flex items-center gap-5">
                <Eyebrow>{emblem.label}</Eyebrow>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <SplitText
              as="h2"
              className="mt-4 font-display text-3xl sm:text-4xl font-normal"
            >
              {emblem.title}
            </SplitText>

            <Reveal className="mt-8" stagger={0.12}>
              {lead === undefined ? null : (
                <RevealItem>
                  <Standfirst className="text-ink">{lead}</Standfirst>
                </RevealItem>
              )}
              {rest.length === 0 ? null : (
                <RevealItem className="mt-6 flex flex-col gap-4">
                  {rest.map((paragraph) => (
                    <P key={paragraph}>{paragraph}</P>
                  ))}
                </RevealItem>
              )}
            </Reveal>
          </div>
        </div>

        {petals.length > 0 ? (
          <div className="mt-6 lg:mt-8">
            <AboutValuesDisclosure>
              <FivePetals petals={petals} title={emblem.valuesTitle} />
            </AboutValuesDisclosure>
          </div>
        ) : null}
      </div>
    </section>
  );
}
