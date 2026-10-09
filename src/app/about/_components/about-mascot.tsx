import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow, P } from "@/components/ui/typography";
import type { AboutMascot as AboutMascotContent } from "@/lib/cms/pages/about";
import { hasImage } from "@/lib/cms/types";

export function AboutMascot({ mascot }: { mascot: AboutMascotContent }) {
  const paragraphs = mascot.paragraphs.filter((item) => item.trim() !== "");
  const image = hasImage(mascot.image) ? mascot.image : null;

  if (paragraphs.length === 0) return null;

  return (
    <section className="gutter-x section-y" id="mascot">
      <div className="mx-auto max-w-page">
        <Reveal>
          <div className="flex items-center gap-5">
            <Eyebrow>{mascot.label}</Eyebrow>
            <span className="h-px flex-1 bg-border" />
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-16">
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              className="font-display text-3xl sm:text-4xl font-normal"
            >
              {mascot.title}
            </SplitText>

            <Reveal className="mt-6 flex flex-col gap-4 lg:mt-8" stagger={0.08}>
              {paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <P>{paragraph}</P>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          {image === null ? null : (
            <Reveal
              className="flex items-center justify-center lg:col-span-5"
              y={32}
            >
              <div className="relative flex w-full items-center justify-center py-6 lg:py-0">
                <div className="absolute -inset-8 -z-10 rounded-full bg-accent/5 blur-3xl" />
                <Image
                  alt={image.alt}
                  className="h-auto w-full max-w-sm object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105 lg:max-w-md"
                  height={image.height || 800}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 450px"
                  src={image.src}
                  width={image.width || 800}
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
