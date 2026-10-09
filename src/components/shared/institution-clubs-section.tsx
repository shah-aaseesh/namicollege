"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { SchoolClub } from "@/app/institutions/school/_components/school-clubs-copy";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Icon } from "@/components/ui/icon";
import { H3, P } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type InstitutionClubsTone = "brand" | "surface";

const CARD_SIZES =
  "(min-width: 1280px) 350px, (min-width: 1024px) 340px, (min-width: 640px) 310px, 78vw";

export function InstitutionClubsSection({
  clubs,
  copy,
  tone = "surface",
  className,
}: {
  readonly clubs: readonly SchoolClub[];
  readonly copy: {
    readonly label: string;
    readonly title: string;
    readonly description: string;
  };
  readonly tone?: InstitutionClubsTone;
  readonly className?: string;
}) {
  const total = clubs.length;

  if (total === 0) return null;

  // Clone items if less than 8 for continuous infinite loop
  const displayClubs =
    total > 1 && total < 8
      ? [
          ...clubs.map((c) => ({ ...c, itemKey: `${c.slug}-1` })),
          ...clubs.map((c) => ({ ...c, itemKey: `${c.slug}-2` })),
        ]
      : clubs.map((c) => ({ ...c, itemKey: c.slug }));

  return (
    <section
      className={cn(
        "gutter-x section-y",
        tone === "brand" ? "bg-muted/40" : "bg-muted/30",
        className,
      )}
      id="eca-clubs"
    >
      <Carousel
        aria-label={copy.title || "ECA & Clubs"}
        aria-roledescription="carousel"
        autoplay={true}
        autoplayIntervalMs={2500}
        opts={{
          align: "start",
          duration: 35,
          loop: true,
          slidesToScroll: 1,
        }}
        pauseOnHover={false}
      >
        <div className="mx-auto max-w-page">
          <SectionHeader
            action={
              <CarouselControls className="ms-auto">
                <CarouselPrevious
                  aria-label="Previous club"
                  className="size-9 sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5"
                />
                <CarouselNext
                  aria-label="Next club"
                  className="size-9 sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5"
                />
              </CarouselControls>
            }
            description={copy.description || undefined}
            eyebrow={copy.label || undefined}
            layout="action"
            title={copy.title || undefined}
          />
        </div>

        <Reveal className="mx-auto mt-8 max-w-page sm:mt-10 lg:mt-12" y={24}>
          <CarouselContent className="-ms-4 sm:-ms-5 lg:-ms-6">
            {displayClubs.map((club) => {
              const clubHref =
                `/institutions/school/clubs/${club.slug}` as Route;

              return (
                <CarouselItem
                  className="basis-[78vw] ps-4 sm:basis-[310px] sm:ps-5 md:basis-[330px] lg:basis-[340px] lg:ps-6 xl:basis-[350px]"
                  key={club.itemKey}
                >
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
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Reveal>
      </Carousel>
    </section>
  );
}
