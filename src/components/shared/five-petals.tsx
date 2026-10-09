import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, H6, P } from "@/components/ui/typography";

export type Petal = {
  id: string;
  name: string;
  meaning: string;
};

export function FivePetals({
  petals,
  title = "The Five Petals & Core Values",
}: {
  petals: readonly Petal[];
  title?: string;
}) {
  return (
    <div className="mx-auto max-w-page">
      <div className="mb-10 lg:mb-12">
        <Eyebrow>{title}</Eyebrow>
      </div>

      <Reveal
        stagger={0.1}
        className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5"
      >
        {petals.map((petal, i) => (
          <div
            className="border-t border-border pt-5"
            key={petal.id}
            data-reveal-item=""
          >
            <div className="mb-3 font-display text-sm tracking-wide text-accent/80">
              Petal {String(i + 1).padStart(2, "0")}
            </div>
            <H6 as="dt">{petal.name}</H6>
            <P as="dd" className="mt-3 text-ink-muted leading-relaxed">
              {petal.meaning}
            </P>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
