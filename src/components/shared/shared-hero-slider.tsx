"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import type { ContentImage } from "@/lib/content";
import { cn } from "@/lib/utils";

export type SharedHeroSlide = ContentImage;

export function SharedHeroSlider({
  badge,
  children,
  className,
  label,
  slides,
}: {
  readonly badge?: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
  readonly label: string;
  readonly slides: readonly SharedHeroSlide[];
}) {
  const [_selectedIndex, setSelectedIndex] = useState(0);
  const hasMany = slides.length > 1;

  const handleSetApi = (api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    api.on("select", () => setSelectedIndex(api.selectedScrollSnap()));
  };

  return (
    <Carousel
      aria-label={label}
      aria-roledescription="carousel"
      autoplay={hasMany}
      autoplayIntervalMs={2500}
      className="relative w-full"
      opts={{ duration: 20, loop: true }}
      setApi={handleSetApi}
    >
      <div className={cn("relative isolate overflow-hidden", className)}>
        <CarouselContent
          className="size-full"
          viewportClassName="absolute inset-0 size-full overflow-hidden"
        >
          {slides.map((slide, index) => (
            <CarouselItem
              aria-label={`${index + 1} of ${slides.length}`}
              className="relative size-full basis-full"
              key={slide.src}
            >
              <Image
                alt={slide.alt}
                className={cn(
                  "size-full object-cover object-left-top origin-top-left",
                )}
                draggable={false}
                fetchPriority={index === 0 ? "high" : "auto"}
                height={slide.height}
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
                sizes="(max-width: 1440px) 100vw, 1440px"
                src={slide.src}
                width={slide.width}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {children}
      </div>

      {(badge || hasMany) && (
        <div className="mt-4 flex items-center justify-between gap-4 sm:mt-6">
          {badge && (
            <div className="flex shrink-0 items-center justify-start">
              {badge}
            </div>
          )}

          {hasMany && (
            <div className={cn("w-fit", !badge && "mx-auto")}>
              <CarouselDots dotLabel="Show slide" />
            </div>
          )}

          {badge && (
            <div
              aria-hidden="true"
              className="hidden sm:block sm:w-32 lg:w-36"
            />
          )}
        </div>
      )}
    </Carousel>
  );
}
