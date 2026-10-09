import Image from "next/image";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import type { HomeAccreditation } from "@/lib/cms/pages/home";

type Logo = HomeAccreditation["logos"][number];

function AffiliationMark({ item }: { item: Logo }) {
  return (
    <div className="relative h-12 w-24 shrink-0 sm:h-18 sm:w-36 lg:h-24 lg:w-48">
      <Image
        alt={item.logo.alt || item.name}
        className="object-contain"
        fill
        sizes="(min-width: 1024px) 192px, (min-width: 640px) 144px, 96px"
        src={item.logo.src}
      />
    </div>
  );
}

function AffiliationRow({ items }: { items: readonly Logo[] }) {
  return (
    <div className="flex items-center gap-5 pe-5 sm:gap-10 sm:pe-10 lg:gap-14 lg:pe-14">
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: logos are an ordered CMS list
        <AffiliationMark item={item} key={`${index}-${item.logo.src}`} />
      ))}
    </div>
  );
}

export function Affiliations({
  accreditation,
}: {
  accreditation: HomeAccreditation;
}) {
  const { logos } = accreditation;

  return (
    <section className="gutter-x section-y-compact" id="affiliations">
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={accreditation.label || undefined}
          title={accreditation.title || undefined}
        />

        {logos.length === 0 ? null : (
          <Reveal className="mt-6 sm:mt-8" y={16}>
            <Marquee
              copies={3}
              label={accreditation.title || accreditation.label}
              speed={45}
            >
              <AffiliationRow items={logos} />
            </Marquee>
          </Reveal>
        )}
      </div>
    </section>
  );
}
