import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { HeroBadge } from "@/components/shared/hero-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { Icon } from "@/components/ui/icon";
import { Eyebrow, Standfirst } from "@/components/ui/typography";
import type { HomeHero } from "@/lib/cms/pages/home";
import { type CmsLink, isExternalHref } from "@/lib/cms/types";
import { content } from "@/lib/content";
import { ArrowUpRightIcon, MortarboardIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { HeroBadgePin } from "./hero-badge-pin";
import { HeroHeadline } from "./hero-headline";

function HeroCta({
  link,
  variant,
}: {
  link: CmsLink;
  variant: "default" | "outline";
}) {
  if (link.label.trim() === "" || link.href.trim() === "") return null;

  const isExternal = isExternalHref(link.href);

  return (
    <Link
      className={cn(
        buttonVariants({ size: "lg", variant }),
        "w-full sm:w-auto justify-center text-center",
      )}
      href={link.href as Route}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
      {variant === "outline" ? <Icon icon={ArrowUpRightIcon} /> : null}
    </Link>
  );
}

export async function Hero({ hero }: { hero: HomeHero }) {
  const institution = await content.getInstitution();

  const socials = institution.contact.socialProfiles.filter(
    (profile) => profile.destination === "external",
  );
  const watch = socials.find((profile) => profile.platform === "youtube");

  const splitAt = hero.headline.indexOf(", ");
  const lead =
    splitAt === -1 ? hero.headline : hero.headline.slice(0, splitAt + 1);
  const tail = splitAt === -1 ? null : hero.headline.slice(splitAt + 2);

  const heroSlides = hero.slides.map((slide) => slide.image);

  return (
    <section
      className="relative isolate gutter-x pt-2.5 pb-8 sm:pt-3.5 sm:pb-10 lg:pt-4 lg:pb-12"
      id="hero"
    >
      <div className="relative mx-auto max-w-page">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Icon
            className="size-4.5 sm:size-5 text-accent shrink-0"
            icon={MortarboardIcon}
          />
          <Eyebrow className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase">
            {hero.eyebrow}
          </Eyebrow>
        </div>

        <div className="mt-3 sm:mt-4 lg:mt-6 lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12 items-start">
          <HeroHeadline
            className="lg:col-span-6 xl:col-span-6"
            lead={lead}
            tail={tail}
          />

          <div className="mt-4 flex flex-col items-start gap-4 sm:gap-5 lg:col-span-6 xl:col-span-6 lg:mt-0">
            <Standfirst className="text-sm sm:text-base leading-relaxed text-neutral-700">
              {hero.standfirst}
            </Standfirst>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <HeroCta link={hero.primaryCta} variant="default" />
              <HeroCta link={hero.secondaryCta} variant="outline" />
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 lg:mt-6 lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-10">
          <HeroBadgePin className="hidden lg:block lg:col-span-2">
            <div className="relative flex items-start justify-start lg:flex-col lg:items-start lg:justify-start">
              <HeroBadge
                entity={institution.entities.institute}
                motto={institution.motto}
                watch={watch ?? null}
              />
            </div>
          </HeroBadgePin>

          {heroSlides.length === 0 ? null : (
            <figure className="mt-2 lg:col-span-10 lg:col-start-3 lg:mt-0">
              <Carousel
                aria-label={hero.eyebrow}
                aria-roledescription="carousel"
                autoplay
                autoplayIntervalMs={5000}
                className="flex flex-col gap-3 sm:gap-4"
                opts={{ align: "start", duration: 20, loop: true }}
                pauseOnHover={false}
              >
                <CarouselContent
                  className="h-full"
                  viewportClassName="aspect-[16/10] rounded-2xl sm:aspect-[16/9] lg:aspect-[2.1/1] xl:aspect-[2.2/1] min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] max-h-[480px] xl:max-h-[540px]"
                >
                  {heroSlides.map((slide, position) => (
                    <CarouselItem
                      className="relative overflow-hidden"
                      // biome-ignore lint/suspicious/noArrayIndexKey: editors may reuse one image across slides
                      key={`${position}-${slide.src}`}
                    >
                      <Parallax className="absolute inset-0" speed={0.94}>
                        <Image
                          alt={slide.alt}
                          className="object-cover object-left-top"
                          fetchPriority={position === 0 ? "high" : "auto"}
                          fill
                          loading={position === 0 ? "eager" : "lazy"}
                          priority={position === 0}
                          sizes="(min-width: 1024px) 74vw, 92vw"
                          src={slide.src}
                        />
                      </Parallax>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselDots className="justify-end" dotLabel="Go to image" />
              </Carousel>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
