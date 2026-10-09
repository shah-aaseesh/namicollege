import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { SchoolClub } from "@/app/institutions/school/_components/school-clubs-copy";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, H2, P } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";

export function ClubOtherRail({
  clubs,
  currentClub,
}: {
  readonly currentClub: SchoolClub;
  readonly clubs: readonly SchoolClub[];
}) {
  const otherClubs = clubs.filter((club) => club.slug !== currentClub.slug);

  return (
    <section className="gutter-x section-y bg-surface border-t border-border">
      <div className="mx-auto max-w-page">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>More Co-Curriculars</Eyebrow>
            <H2 className="mt-2">Explore Other School Clubs</H2>
          </div>
          <Link
            className="group inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-primary-700 hover:text-primary-900"
            href={"/institutions/school#eca-clubs" as Route}
          >
            <span>All ECA & Clubs</span>
            <Icon
              className="size-3.5 transition-transform group-hover:translate-x-1"
              icon={ArrowRightIcon}
            />
          </Link>
        </div>

        <Reveal
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
          y={20}
        >
          {otherClubs.map((club) => (
            <RevealItem className="h-full" key={club.slug}>
              <Link
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#BD1B21]/80 bg-[#BD1B21] shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                href={`/institutions/school/clubs/${club.slug}` as Route}
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                  <Image
                    alt={club.coverImage.alt}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    height={club.coverImage.height}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    src={club.coverImage.src}
                    width={club.coverImage.width}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 font-body text-[11px] font-semibold text-primary-900 backdrop-blur-xs">
                    {club.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between bg-[#BD1B21] p-5 text-white">
                  <div>
                    <h3 className="font-display text-base font-normal text-white transition-opacity group-hover:opacity-95">
                      {club.title}
                    </h3>
                    <P className="mt-2 line-clamp-2 font-body text-xs text-white/85">
                      {club.tagline}
                    </P>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 font-body text-xs font-semibold text-white/90 group-hover:text-white">
                    <span>View Details</span>
                    <Icon
                      className="size-3 transition-transform group-hover:translate-x-1"
                      icon={ArrowRightIcon}
                    />
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
