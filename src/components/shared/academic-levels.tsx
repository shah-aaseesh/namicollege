import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H5 } from "@/components/ui/typography";
import type {
  HomeInstitutionCard,
  HomeInstitutions,
} from "@/lib/cms/pages/home";
import { hasImage, isExternalHref } from "@/lib/cms/types";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const MEDIA_SIZES = "(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw";

function InstitutionCard({ card }: { readonly card: HomeInstitutionCard }) {
  const href = card.href.trim();
  const isExternal = isExternalHref(href);
  const isLogo = card.imageFit === "contain";
  const highlights = card.highlights.filter((item) => item.trim() !== "");

  return (
    <li
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-primary-900/15 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
      data-reveal-item=""
    >
      {hasImage(card.image) ? (
        <figure
          className={cn(
            "relative aspect-16/10 w-full shrink-0 overflow-hidden",
            isLogo
              ? "bg-neutral-50 flex items-center justify-center p-3 sm:p-4 border-b border-neutral-100 transition-colors group-hover:bg-neutral-100/60"
              : "bg-neutral-900/10",
          )}
        >
          <Image
            alt={card.image.alt}
            className={
              isLogo
                ? "h-28 sm:h-36 max-h-[82%] w-auto max-w-[85%] object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                : "size-full object-cover object-left-top origin-top-left transition-transform duration-500 ease-out group-hover:scale-105"
            }
            height={card.image.height || 667}
            sizes={MEDIA_SIZES}
            src={card.image.src}
            width={card.image.width || 1178}
          />
          {isLogo ? null : (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          )}

          {card.badge.trim() === "" ? null : (
            <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-950/75 px-3 py-1 font-body text-xs font-medium tracking-wide text-white shadow-sm backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-primary-400" />
                <span>{card.badge}</span>
              </span>
            </div>
          )}
        </figure>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <H5
          as="h3"
          className="font-display text-xl font-medium leading-tight text-primary-700 group-hover:text-primary-800 transition-colors"
        >
          {href === "" ? (
            card.name
          ) : (
            <Link
              className="after:absolute after:inset-0 focus-visible:outline-none"
              href={href as Route}
              rel={isExternal ? "noopener noreferrer" : undefined}
              target={isExternal ? "_blank" : undefined}
            >
              {card.name}
            </Link>
          )}
        </H5>

        {card.stage.trim() === "" ? null : (
          <p className="mt-2.5 font-body text-sm font-medium leading-snug text-neutral-800">
            {card.stage}
          </p>
        )}

        {highlights.length === 0 ? null : (
          <ul className="mt-4 mb-5 space-y-2 border-t border-neutral-100 pt-3.5 flex-1">
            {highlights.slice(0, 3).map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-body text-xs text-neutral-600 leading-snug"
              >
                <span className="mt-1 size-1.5 rounded-full bg-primary-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3.5">
          <span className="font-body text-xs font-semibold text-primary-800 transition-colors group-hover:text-primary-950">
            {card.footerLabel}
          </span>
          <span className="flex size-7 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-all duration-200 group-hover:bg-primary-700 group-hover:text-white">
            <Icon className="size-3.5" icon={ArrowRightIcon} />
          </span>
        </div>
      </div>
    </li>
  );
}

export function AcademicLevels({
  institutions,
}: {
  institutions: HomeInstitutions;
}) {
  const cards = institutions.cards.filter((card) => card.name.trim() !== "");

  return (
    <section className="field-brand gutter-x section-y" id="institutions">
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={institutions.label || undefined}
          title={institutions.title || undefined}
          description={institutions.description || undefined}
        />

        {cards.length === 0 ? null : (
          <Reveal
            className="mt-10 lg:mt-14"
            duration={0.55}
            stagger={0.05}
            y={10}
          >
            <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
              {cards.map((card, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: cards are an ordered CMS list
                <InstitutionCard card={card} key={`${index}-${card.name}`} />
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
