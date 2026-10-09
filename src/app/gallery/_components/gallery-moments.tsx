"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  PlayIcon,
  QuoteIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

import type {
  GalleryInstitution,
  GalleryMoment,
  InstitutionTab,
  SubcategoryIconType,
  SubcategoryItem,
} from "./gallery-data";

function BubbleIcon({ iconType }: { readonly iconType: SubcategoryIconType }) {
  switch (iconType) {
    case "grid":
      return (
        <svg
          className="size-6 sm:size-7 text-[#BD1B21]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect height="7" rx="1.5" width="7" x="3" y="3" />
          <rect height="7" rx="1.5" width="7" x="14" y="3" />
          <rect height="7" rx="1.5" width="7" x="14" y="14" />
          <rect height="7" rx="1.5" width="7" x="3" y="14" />
        </svg>
      );
    case "tech":
      return (
        <svg
          className="size-6 sm:size-7 text-sky-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect height="14" rx="2" width="20" x="2" y="3" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
          <path d="M7 8l3 3-3 3M13 14h4" />
        </svg>
      );
    case "sports":
      return (
        <svg
          className="size-6 sm:size-7 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2.5 12h19M12 2.5a14 14 0 0 1 0 19M12 2.5a14 14 0 0 0 0 19" />
        </svg>
      );
    case "math":
      return (
        <svg
          className="size-6 sm:size-7 text-amber-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M9 7h6M12 10v6M9 13h6" />
        </svg>
      );
    case "arts":
      return (
        <svg
          className="size-6 sm:size-7 text-rose-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="13.5" cy="6.5" fill="currentColor" r=".5" />
          <circle cx="17.5" cy="10.5" fill="currentColor" r=".5" />
          <circle cx="8.5" cy="7.5" fill="currentColor" r=".5" />
          <circle cx="6.5" cy="12.5" fill="currentColor" r=".5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    case "culture":
      return (
        <svg
          className="size-6 sm:size-7 text-purple-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
        </svg>
      );
    case "trips":
      return (
        <svg
          className="size-6 sm:size-7 text-teal-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "science":
      return (
        <svg
          className="size-6 sm:size-7 text-cyan-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M10 2v7.31L4.62 18.27A2 2 0 0 0 6.34 21h11.32a2 2 0 0 0 1.72-2.73L14 9.31V2" />
          <line x1="8.5" x2="15.5" y1="2" y2="2" />
          <line x1="7" x2="17" y1="14" y2="14" />
        </svg>
      );
    case "social":
      return (
        <svg
          className="size-6 sm:size-7 text-pink-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
    case "events":
      return (
        <svg
          className="size-6 sm:size-7 text-indigo-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      );
    case "business":
      return (
        <svg
          className="size-6 sm:size-7 text-blue-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect height="14" rx="2" ry="2" width="20" x="2" y="7" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "convocation":
      return (
        <svg
          className="size-6 sm:size-7 text-yellow-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "music":
      return (
        <svg
          className="size-6 sm:size-7 text-violet-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
  }
}

const INITIAL_MOMENTS_COUNT = 9;
const LOAD_MORE_STEP = 6;

export type GalleryMomentsCopy = {
  readonly label: string;
  readonly title: string;
  readonly moreLabel: string;
};

/** Bubble ids that every tab understands: "all" resets, "others" collects the rest. */
const ALL_BUBBLE = "all";
const OTHERS_BUBBLE = "others";

function isLogo(sub: SubcategoryItem): boolean {
  if (sub.logo !== undefined) return sub.logo;
  const src = sub.thumbnail ?? "";
  return src.includes("/collaborators/") || src.includes("/partners/");
}

export function GalleryMoments({
  bubbles,
  copy,
  moments,
  tabs,
}: {
  readonly bubbles: Readonly<
    Partial<Record<GalleryInstitution, readonly SubcategoryItem[]>>
  >;
  readonly copy: GalleryMomentsCopy;
  readonly moments: readonly GalleryMoment[];
  readonly tabs: readonly InstitutionTab[];
}) {
  const [mounted, setMounted] = useState(false);
  const [activeInstitution, setActiveInstitution] =
    useState<GalleryInstitution>("all");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(
    INITIAL_MOMENTS_COUNT,
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset visible items count & active subcategory when institution changes
  const handleInstitutionChange = (inst: GalleryInstitution) => {
    setActiveInstitution(inst);
    setActiveSubcategory("all");
    setVisibleCount(INITIAL_MOMENTS_COUNT);
  };

  const handleSubcategoryChange = (subId: string) => {
    setActiveSubcategory(subId);
    setVisibleCount(INITIAL_MOMENTS_COUNT);
  };

  const currentSubcategories = bubbles[activeInstitution] ?? [];

  // The bubbles of this tab other than "all" and "others".
  const namedBubbles = currentSubcategories
    .map((sub) => sub.id)
    .filter((id) => id !== ALL_BUBBLE && id !== OTHERS_BUBBLE);

  const filteredMoments = moments.filter((item) => {
    // 1. Institution check
    if (activeInstitution !== "all") {
      if (
        item.institution !== "all" &&
        item.institution !== activeInstitution
      ) {
        return false;
      }
    }

    // 2. Subcategory / Club check
    if (activeSubcategory !== "all") {
      if (item.type === "quote") return false;
      // "Others" shows this tab's moments that belong to none of its bubbles.
      if (activeSubcategory === OTHERS_BUBBLE) {
        return !namedBubbles.includes(item.subcategory ?? "");
      }
      if (activeInstitution === "all") {
        if (
          item.category !== activeSubcategory &&
          item.subcategory !== activeSubcategory
        ) {
          return false;
        }
      } else {
        if (
          item.subcategory !== activeSubcategory &&
          item.category !== activeSubcategory
        ) {
          return false;
        }
      }
    }

    return true;
  });

  const displayedMoments = filteredMoments.slice(0, visibleCount);

  const imageMoments = filteredMoments.filter(
    (item) => item.type === "image" || item.type === "video",
  );

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : imageMoments.length - 1,
    );
  }, [lightboxIndex, imageMoments.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null && prev < imageMoments.length - 1 ? prev + 1 : 0,
    );
  }, [lightboxIndex, imageMoments.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
      if (isVideoModalOpen && e.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    },
    [lightboxIndex, isVideoModalOpen, handlePrev, handleNext],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal or lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null || isVideoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, isVideoModalOpen]);

  const currentImage =
    lightboxIndex !== null ? imageMoments[lightboxIndex] : null;

  return (
    <section
      className="gutter-x section-y-masthead pb-16 sm:pb-24"
      id="our-gallery"
    >
      <div className="mx-auto max-w-page">
        {/* 1. Section Heading */}
        <div className="text-center">
          <p className="font-body text-xs sm:text-sm font-bold uppercase tracking-widest text-[#BD1B21]">
            {copy.label}
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink">
            {copy.title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#BD1B21]" />
        </div>

        {/* 2. Filter Navigation */}
        <div className="mt-8 sm:mt-10 space-y-6">
          {/* Institution Selector (Single Row Segmented Bar) */}
          <div className="flex flex-col items-center">
            <div className="inline-flex flex-wrap md:flex-nowrap items-center justify-center p-1.5 rounded-2xl md:rounded-full bg-surface-raised border border-border shadow-xs gap-1.5">
              {tabs.map((inst) => {
                const isActive = activeInstitution === inst.id;
                return (
                  <button
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl md:rounded-full px-3.5 sm:px-5 py-2 font-body text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap",
                      isActive
                        ? "bg-[#BD1B21] text-white shadow-md shadow-[#BD1B21]/30 scale-[1.02]"
                        : "text-ink-muted hover:text-ink hover:bg-neutral-100/80",
                    )}
                    key={inst.id}
                    onClick={() => handleInstitutionChange(inst.id)}
                    type="button"
                  >
                    <span>{inst.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instagram/Stories-Style Circular Highlights Rail (Shown only when a specific institution is selected) */}
          {activeInstitution !== "all" && currentSubcategories.length > 0 && (
            <div className="relative mx-auto w-full max-w-6xl py-1 animate-in fade-in duration-300">
              {/* Horizontal Story Highlights Rail */}
              <div className="flex items-start justify-start md:justify-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto pt-5 pb-4 px-4 no-scrollbar scroll-smooth">
                {currentSubcategories.map((sub) => {
                  const isActive = activeSubcategory === sub.id;

                  return (
                    <button
                      aria-pressed={isActive}
                      className={cn(
                        "group flex flex-col items-center justify-start shrink-0 cursor-pointer transition-all duration-300 focus:outline-hidden",
                        "w-22 sm:w-26 md:w-30",
                      )}
                      key={sub.id}
                      onClick={() => handleSubcategoryChange(sub.id)}
                      type="button"
                    >
                      {/* Story Circle Avatar Disc */}
                      <div
                        className={cn(
                          "relative my-1 flex size-20 sm:size-24 md:size-28 items-center justify-center rounded-full transition-all duration-300",
                          isActive
                            ? "p-[3.5px] bg-[#BD1B21] shadow-xl shadow-[#BD1B21]/30 scale-106 -translate-y-1"
                            : "p-[3px] bg-neutral-200 hover:bg-[#BD1B21]/50 group-hover:scale-105 group-hover:shadow-md",
                        )}
                      >
                        {/* Inner White Gap Ring */}
                        <div className="relative size-full rounded-full bg-white p-[2.5px] overflow-hidden">
                          {/* Photo Thumbnail or Collaborator Logo */}
                          {sub.thumbnail ? (
                            <div className="relative size-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                              <Image
                                alt={sub.label}
                                className={cn(
                                  "size-full rounded-full transition-transform duration-500 group-hover:scale-110",
                                  isLogo(sub)
                                    ? "object-contain p-1.5 sm:p-2 bg-white"
                                    : "object-cover",
                                )}
                                fill
                                loading="lazy"
                                quality={95}
                                sizes="(max-width: 640px) 96px, (max-width: 1024px) 120px, 140px"
                                src={sub.thumbnail}
                              />
                            </div>
                          ) : (
                            <div className="flex size-full items-center justify-center rounded-full bg-neutral-50">
                              <BubbleIcon iconType={sub.iconType} />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Text Label Below Circle */}
                      <span
                        className={cn(
                          "mt-2.5 text-center font-body text-xs sm:text-sm transition-colors line-clamp-2 leading-tight max-w-[92px] sm:max-w-[115px]",
                          isActive
                            ? "text-[#BD1B21] font-bold drop-shadow-xs"
                            : "text-ink-muted group-hover:text-ink font-semibold",
                        )}
                      >
                        {sub.shortLabel}
                      </span>

                      {/* Active Indicator Dot */}
                      {isActive && (
                        <span className="mt-1 size-1.5 rounded-full bg-[#BD1B21] shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. Empty State if no moments match combined filters */}
        {filteredMoments.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center bg-surface/50">
            <h3 className="font-display text-lg font-semibold text-ink">
              No moments found
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              Try selecting "All" in the focus ribbon to explore all moments for
              this institution.
            </p>
            <button
              className="mt-5 rounded-full bg-[#BD1B21] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#a0161b] transition-colors cursor-pointer"
              onClick={() => {
                setActiveInstitution("all");
                setActiveSubcategory("all");
              }}
              type="button"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* 4. Moments Bento Grid */
          <>
            <Reveal
              className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
              key={`${activeInstitution}-${activeSubcategory}-${visibleCount}`}
              stagger={0.04}
              y={16}
            >
              {displayedMoments.map((item) => {
                // A. Special Quote Card (Row 3, Col 2)
                if (item.type === "quote" && item.quote) {
                  return (
                    <RevealItem className="h-full" key={item.id}>
                      <div className="relative flex aspect-4/3 h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#8B1519] p-6 sm:p-8 text-white shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-[#8B1519]/20">
                        {/* Lotus Watermark in Bottom Right Corner */}
                        <div className="pointer-events-none absolute -bottom-6 -right-6 size-44 opacity-15">
                          <Image
                            alt=""
                            className="size-full object-contain"
                            height={180}
                            src="/sections/misc/lotus.png"
                            width={180}
                          />
                        </div>

                        {/* Quotation Icon */}
                        <div className="relative z-10">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-xs">
                            <Icon
                              className="size-5 text-white"
                              icon={QuoteIcon}
                            />
                          </div>
                        </div>

                        {/* Quote Text & Author */}
                        <div className="relative z-10 space-y-3">
                          <p className="font-display text-lg sm:text-xl font-medium leading-snug text-white">
                            {item.quote.text}
                          </p>
                          <p className="font-body text-xs sm:text-sm font-semibold tracking-wide text-white/80">
                            — {item.quote.author}
                          </p>
                        </div>
                      </div>
                    </RevealItem>
                  );
                }

                // B. Video Card with Circular Play Button (Row 4, Col 2)
                if (item.type === "video") {
                  return (
                    <RevealItem className="h-full" key={item.id}>
                      <button
                        aria-label={item.title}
                        className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-900 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                        onClick={() => {
                          setActiveVideo(item.videoUrl ?? null);
                          setIsVideoModalOpen(true);
                        }}
                        type="button"
                      >
                        {item.src && (
                          <Image
                            alt={item.alt ?? item.title}
                            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            fill
                            loading="lazy"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            src={item.src}
                          />
                        )}

                        {/* Dark Scrim Overlay */}
                        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20" />

                        {/* Centered Circular Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex size-14 sm:size-16 items-center justify-center rounded-full border-2 border-white/90 bg-black/40 text-white backdrop-blur-xs shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[#BD1B21] group-hover:border-[#BD1B21]">
                            <Icon
                              className="size-6 text-white translate-x-0.5"
                              icon={PlayIcon}
                            />
                          </div>
                        </div>
                      </button>
                    </RevealItem>
                  );
                }

                // C. Standard Image Card
                const currentImageIndex = imageMoments.findIndex(
                  (m) => m.id === item.id,
                );

                return (
                  <RevealItem className="h-full" key={item.id}>
                    <button
                      aria-label={item.title}
                      className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-900 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-[#BD1B21]/50 cursor-pointer"
                      onClick={() =>
                        setLightboxIndex(
                          currentImageIndex >= 0 ? currentImageIndex : null,
                        )
                      }
                      type="button"
                    >
                      {item.src && (
                        <Image
                          alt={item.alt ?? item.title}
                          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          fill
                          loading="lazy"
                          quality={90}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          src={item.src}
                        />
                      )}

                      {/* Subtle Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Expand icon on hover */}
                      <div className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 shadow-md">
                        <svg
                          className="size-4.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  </RevealItem>
                );
              })}
            </Reveal>

            {/* 5. See More Moments Action */}
            {visibleCount < filteredMoments.length && (
              <div className="mt-10 sm:mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((prev) => prev + LOAD_MORE_STEP)
                  }
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#BD1B21] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#BD1B21]/20 transition-all duration-200 hover:bg-[#a0161b] hover:shadow-lg hover:shadow-[#BD1B21]/30 hover:scale-[1.02] cursor-pointer active:scale-95"
                >
                  <span>{copy.moreLabel}</span>
                  <Icon
                    className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                    icon={ChevronDownIcon}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 5. Fluid Unboxed Fullscreen Image Expansion (No restrictive box / card) */}
      {mounted &&
        lightboxIndex !== null &&
        currentImage &&
        createPortal(
          <div
            aria-label="Expanded Image View"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200 select-none cursor-zoom-out"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
          >
            {/* Top Floating Control Bar */}
            <div
              className="flex items-center justify-between w-full max-w-7xl mx-auto text-white z-20 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="rounded-full bg-[#BD1B21] px-3 py-1 font-body text-xs font-semibold text-white tracking-wide shadow-sm">
                  {currentImage.institutionLabel}
                </span>
                <span className="hidden sm:inline-block text-xs text-white/80 font-medium truncate max-w-md drop-shadow-sm">
                  {currentImage.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Counter */}
                <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 font-mono text-xs text-white/90 border border-white/15 shadow-sm">
                  {lightboxIndex + 1} / {imageMoments.length}
                </span>

                {/* Close Button */}
                <button
                  aria-label="Close fullscreen view"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-105 border border-white/15 cursor-pointer shadow-lg"
                  onClick={() => setLightboxIndex(null)}
                  type="button"
                >
                  <Icon className="size-5" icon={CloseIcon} />
                </button>
              </div>
            </div>

            {/* Main Center Stage: Natural Unconstrained Image with Floating Prev/Next Controls */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-7xl mx-auto my-auto py-2 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {imageMoments.length > 1 && (
                <button
                  aria-label="Previous Image"
                  className="absolute left-1 sm:left-4 z-30 flex size-11 sm:size-12 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-110 hover:border-[#BD1B21] cursor-pointer shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  type="button"
                >
                  <Icon className="size-6" icon={ChevronLeftIcon} />
                </button>
              )}

              {/* Pure Expanded Image (Unboxed & Naturally Proportioned) */}
              <div className="relative flex items-center justify-center max-h-[86vh] sm:max-h-[90vh] max-w-full">
                {currentImage.src && (
                  <img
                    alt={currentImage.alt ?? currentImage.title}
                    className="max-h-[84vh] sm:max-h-[88vh] max-w-[94vw] lg:max-w-[90vw] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 transition-all pointer-events-auto"
                    src={currentImage.src}
                  />
                )}
              </div>

              {/* Next Button */}
              {imageMoments.length > 1 && (
                <button
                  aria-label="Next Image"
                  className="absolute right-1 sm:right-4 z-30 flex size-11 sm:size-12 items-center justify-center rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-110 hover:border-[#BD1B21] cursor-pointer shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  type="button"
                >
                  <Icon className="size-6" icon={ChevronRightIcon} />
                </button>
              )}
            </div>
          </div>,
          document.body,
        )}

      {/* 6. Fluid Unboxed Video Modal Dialog Portal */}
      {mounted &&
        isVideoModalOpen &&
        createPortal(
          <div
            aria-label="Video Player"
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200 select-none cursor-zoom-out"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
          >
            {/* Top Close Bar */}
            <div
              className="flex items-center justify-between w-full max-w-5xl mx-auto text-white z-20 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="rounded-full bg-[#BD1B21] px-3 py-1 font-body text-xs font-semibold text-white tracking-wide shadow-sm">
                Campus Video
              </span>
              <button
                aria-label="Close Video"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-150 hover:bg-[#BD1B21] hover:scale-105 border border-white/15 cursor-pointer shadow-lg"
                onClick={() => setIsVideoModalOpen(false)}
                type="button"
              >
                <Icon className="size-5" icon={CloseIcon} />
              </button>
            </div>

            {/* Video Stage */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-5xl mx-auto my-auto py-3 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black animate-in zoom-in-95 duration-200">
                <video
                  autoPlay
                  className="size-full object-cover"
                  controls
                  playsInline
                  src={activeVideo ?? undefined}
                />
              </div>
            </div>

            {/* Bottom spacer */}
            <div className="h-6" />
          </div>,
          document.body,
        )}
    </section>
  );
}
