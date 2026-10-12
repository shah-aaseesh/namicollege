import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ALevelsClub } from "@/app/institutions/a-levels/_components/a-levels-clubs-copy";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Eyebrow } from "@/components/ui/typography";
import { ArrowLeftIcon } from "@/lib/icons";

const COVER_SIZES = "(min-width: 1024px) 1200px, 100vw";

export function ClubMasthead({ club }: { readonly club: ALevelsClub }) {
  const hero = club.heroImage ?? club.coverImage;
  return (
    <section className="gutter-x pt-2.5 sm:pt-3.5 lg:pt-4 pb-10 sm:pb-14">
      <div className="mx-auto max-w-page">
        {/* Top Bar: Back Link + Quick Anchor Nav */}
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              className="group inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors hover:text-[#BD1B21]"
              href={"/institutions/a-levels#eca-clubs" as Route}
            >
              <Icon
                className="size-3.5 transition-transform group-hover:-translate-x-1"
                icon={ArrowLeftIcon}
              />
              <span>Back to A Levels ECA & Clubs</span>
            </Link>

            {/* Quick In-Page Anchor Links */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-ink-muted">
              <a
                className="rounded-full px-3 py-1 bg-surface-raised border border-border hover:border-[#BD1B21]/50 hover:text-[#BD1B21] transition-colors"
                href="#overview"
              >
                Overview
              </a>
              <a
                className="rounded-full px-3 py-1 bg-surface-raised border border-border hover:border-[#BD1B21]/50 hover:text-[#BD1B21] transition-colors"
                href="#activities"
              >
                Activities
              </a>
              <a
                className="rounded-full px-3 py-1 bg-surface-raised border border-border hover:border-[#BD1B21]/50 hover:text-[#BD1B21] transition-colors"
                href="#skills"
              >
                Skills & Outcomes
              </a>
              <a
                className="rounded-full px-3 py-1 bg-[#BD1B21] text-white hover:bg-[#9e1419] transition-colors shadow-xs"
                href="#join"
              >
                Join Club
              </a>
            </div>
          </div>
        </Reveal>

        {/* 1. TOP HERO BANNER: Cinema-Grade Image with Overlaid Metadata */}
        <Reveal y={16}>
          <div className="relative overflow-hidden rounded-3xl bg-neutral-950 shadow-2xl">
            {/* Background Image */}
            <div className="relative aspect-16/9 sm:aspect-21/9 min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] w-full">
              <Image
                alt={hero.alt}
                className="size-full object-cover opacity-85"
                fetchPriority="high"
                height={hero.height}
                loading="eager"
                sizes={COVER_SIZES}
                src={hero.src}
                width={hero.width}
              />
              {/* Dark Gradient Overlay for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
            </div>

            {/* Hero Overlaid Typography */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10 lg:p-12">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#BD1B21] px-3.5 py-1 text-xs font-semibold text-white shadow-md">
                  <span className="size-1.5 rounded-full bg-white animate-pulse" />
                  {club.category}
                </span>

                <h1 className="mt-4 font-display text-3xl sm:text-5xl lg:text-6xl font-semibold sm:font-medium text-white tracking-tight leading-tight">
                  {club.title}
                </h1>

                <p className="mt-3 font-body text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl">
                  {club.tagline}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. KEY INFO QUICK-FACTS GRID */}
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-xs hover:border-[#BD1B21]/30 transition-colors">
            <Eyebrow as="dt" className="text-[#BD1B21] font-semibold">
              Meeting Schedule
            </Eyebrow>
            <dd className="mt-1.5 font-display text-base sm:text-lg font-normal text-ink">
              {club.meetingSchedule}
            </dd>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-xs hover:border-[#BD1B21]/30 transition-colors">
            <Eyebrow as="dt" className="text-[#BD1B21] font-semibold">
              Eligibility
            </Eyebrow>
            <dd className="mt-1.5 font-display text-base sm:text-lg font-normal text-ink">
              {club.eligibility}
            </dd>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-xs hover:border-[#BD1B21]/30 transition-colors">
            <Eyebrow as="dt" className="text-[#BD1B21] font-semibold">
              Faculty Mentor
            </Eyebrow>
            <dd className="mt-1.5 font-display text-base sm:text-lg font-normal text-ink">
              {club.facultyMentor}
            </dd>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-xs hover:border-[#BD1B21]/30 transition-colors">
            <Eyebrow as="dt" className="text-[#BD1B21] font-semibold">
              Academic Body
            </Eyebrow>
            <dd className="mt-1.5 font-display text-base sm:text-lg font-normal text-ink">
              Cambridge A-Levels (AS & A2)
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
