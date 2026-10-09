import { Marquee } from "@/components/motion/marquee";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import type { HomeMarquee } from "@/lib/cms/pages/home";
import { AsteriskIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type MarqueeItem = HomeMarquee["items"][number];

function bodyStep(): string {
  return "text-xl sm:text-2xl";
}

function MarqueeRow({
  glyphClassName,
  items,
  step,
}: {
  glyphClassName: string;
  items: readonly string[];
  step: (item: string) => string;
}) {
  return (
    <ul className="flex items-center whitespace-nowrap">
      {items.map((item) => (
        <li className="flex items-center gap-8 pe-8" key={item}>
          <span className={cn("font-display tracking-normal", step(item))}>
            {item}
          </span>
          <Icon
            className={cn("text-white/60", glyphClassName)}
            icon={AsteriskIcon}
          />
        </li>
      ))}
    </ul>
  );
}

function AcademicMarqueeRow({
  glyphClassName,
  items,
}: {
  glyphClassName: string;
  items: readonly MarqueeItem[];
}) {
  return (
    <ul className="flex items-center whitespace-nowrap">
      {items.map((item, index) => (
        <li
          className="flex items-center gap-6 sm:gap-8 pe-6 sm:pe-8"
          // biome-ignore lint/suspicious/noArrayIndexKey: item text repeats across levels (e.g. "Science")
          key={`${index}-${item.text}`}
        >
          <span
            className={cn(
              "font-display tracking-normal text-2xl sm:text-3xl",
              item.isLevel
                ? "text-accent font-semibold"
                : "text-white font-normal",
            )}
          >
            {item.text}
          </span>
          <Icon
            className={cn("text-accent", glyphClassName)}
            icon={AsteriskIcon}
          />
        </li>
      ))}
    </ul>
  );
}

export function ProgrammeMarquee({ marquee }: { marquee: HomeMarquee }) {
  const items = marquee.items.filter((item) => item.text.trim() !== "");
  const bodies = [
    ...new Set(marquee.awardingBodies.filter((body) => body.trim() !== "")),
  ];

  if (items.length === 0 && bodies.length === 0) return null;

  return (
    <section className="gutter-x py-0 overflow-x-clip" id="programmes">
      <Reveal className="bleed-x" stagger={0.12}>
        {items.length === 0 ? null : (
          <RevealItem className="field-ink py-4">
            <Marquee label="Programmes" speed={70}>
              <AcademicMarqueeRow glyphClassName="size-5" items={items} />
            </Marquee>
          </RevealItem>
        )}

        {bodies.length === 0 ? null : (
          <RevealItem className="field-brand py-5">
            <Marquee copies={3} label="Awarding bodies" speed={50}>
              <MarqueeRow
                glyphClassName="size-4"
                items={bodies}
                step={bodyStep}
              />
            </Marquee>
          </RevealItem>
        )}
      </Reveal>
    </section>
  );
}
