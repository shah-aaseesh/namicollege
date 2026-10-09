import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Icon } from "@/components/ui/icon";
import { H3, P } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";
import type { ALevelsClub } from "./a-levels-clubs-copy";

const CARD_SIZES =
  "(min-width: 1280px) 420px, (min-width: 1024px) 380px, (min-width: 768px) 360px, 100vw";

export function ALevelsClubsSection({
  clubs,
  copy,
}: {
  readonly clubs: readonly ALevelsClub[];
  readonly copy: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
  };
}) {
  const total = clubs.length;

  if (total === 0) return null;

  return (
    <section
      className="gutter-x section-y border-t border-border"
      id="eca-clubs"
    >
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={copy.description || undefined}
          eyebrow={copy.label || undefined}
          title={copy.title || undefined}
        />

        <Reveal className="mt-8 sm:mt-10 lg:mt-12" y={24}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 w-full">
            {clubs.map((club) => {
              const clubHref =
                `/institutions/a-levels/clubs/${club.slug}` as Route;

              return (
                <RevealItem key={club.slug}>
                  <Link
                    className="group flex h-full min-h-[420px] sm:min-h-[440px] flex-col overflow-hidden rounded-2xl border border-[#BD1B21]/80 bg-[#BD1B21] shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#BD1B21]/20"
                    href={clubHref}
                  >
                    {/* Card Cover Image */}
                    <div className="relative aspect-16/11 w-full overflow-hidden bg-neutral-900">
                      <Image
                        alt={club.coverImage.alt}
                        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        fill
                        loading="lazy"
                        sizes={CARD_SIZES}
                        src={club.coverImage.src}
                      />
                    </div>

                    {/* Card Content - Red bottom part */}
                    <div className="flex flex-1 flex-col justify-between bg-[#BD1B21] p-5 sm:p-6 text-white">
                      <div>
                        <H3
                          as="h3"
                          className="font-display text-lg font-normal text-white transition-opacity group-hover:opacity-95 sm:text-xl"
                        >
                          {club.title}
                        </H3>

                        <P className="mt-2 line-clamp-3 font-body text-xs text-white/85 leading-relaxed sm:text-sm">
                          {club.tagline}
                        </P>
                      </div>

                      {/* Action link */}
                      <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-3">
                        <span className="font-body text-xs font-semibold text-white/90 transition-colors group-hover:text-white">
                          Explore Club
                        </span>
                        <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#BD1B21] shadow-xs transition-all duration-200 group-hover:scale-110 group-hover:bg-white group-hover:translate-x-1">
                          <Icon className="size-3.5" icon={ArrowRightIcon} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
