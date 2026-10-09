import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Standfirst } from "@/components/ui/typography";
import type { AboutHero as AboutHeroContent } from "@/lib/cms/pages/about";
import { isExternalHref } from "@/lib/cms/types";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function AboutHero({ hero }: { hero: AboutHeroContent }) {
  const images = hero.images.map((item) => item.image);
  const showButton =
    hero.button.label.trim() !== "" && hero.button.href.trim() !== "";
  const isExternal = isExternalHref(hero.button.href);

  return (
    <section
      className="gutter-x pt-2.5 pb-2 sm:pt-3.5 sm:pb-3 lg:pt-4 lg:pb-4"
      id="about"
    >
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12 items-start">
          <div className="lg:col-span-6 xl:col-span-6">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight leading-[1.1] text-balance text-ink">
              {hero.title}
            </h1>
          </div>

          <div className="mt-5 max-w-xl lg:col-span-6 xl:col-span-6 lg:mt-0 flex flex-col justify-start">
            {hero.standfirst === "" ? null : (
              <Standfirst className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                {hero.standfirst}
              </Standfirst>
            )}
            {showButton ? (
              <div className="mt-4 sm:mt-5">
                <Link
                  className={cn(
                    buttonVariants({ size: "lg", variant: "default" }),
                    "group gap-2 px-5 w-fit inline-flex items-center justify-start",
                  )}
                  href={hero.button.href as Route}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  <span>{hero.button.label}</span>
                  <Icon
                    className="size-4 transition-transform group-hover:translate-x-1"
                    icon={ArrowRightIcon}
                  />
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        {images.length === 0 ? null : images.length === 1 && images[0] ? (
          <Parallax
            className="mt-6 sm:mt-7 lg:mt-8 overflow-hidden rounded-2xl lg:rounded-3xl"
            speed={1.05}
          >
            <Image
              alt={images[0].alt}
              className="h-[38vh] sm:h-[44vh] lg:h-[48vh] xl:h-[54vh] max-h-[440px] lg:max-h-[520px] xl:max-h-[580px] w-full object-cover object-left-top"
              fetchPriority="high"
              height={images[0].height || 400}
              loading="eager"
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              src={images[0].src}
              width={images[0].width || 1200}
            />
          </Parallax>
        ) : (
          <div className="mt-6 sm:mt-7 lg:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
            {images.map((img, idx) => (
              <div
                className="group relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[16/11] xl:aspect-[4/3] w-full overflow-hidden rounded-2xl lg:rounded-3xl bg-neutral-100 border border-neutral-200/80 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                // biome-ignore lint/suspicious/noArrayIndexKey: images are an ordered CMS list
                key={`${idx}-${img.src}`}
              >
                <Image
                  alt={img.alt}
                  className="size-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-105"
                  fill
                  loading={idx === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 100vw"
                  src={img.src}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
