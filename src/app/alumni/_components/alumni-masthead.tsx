import Image from "next/image";
import Link from "next/link";
import type { CareersMastheadCopy } from "@/app/careers/_components/careers-masthead";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Standfirst } from "@/components/ui/typography";
import { ArrowRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function AlumniMasthead({
  copy,
}: {
  readonly copy: CareersMastheadCopy;
}) {
  return (
    <section
      className="gutter-x section-y-masthead relative overflow-hidden bg-gradient-to-b from-primary-100/35 via-surface/60 to-surface"
      id="alumni-hero"
    >
      <div className="mx-auto max-w-page relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 border border-primary-200/80 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary-700 uppercase mb-4 shadow-2xs">
              <span className="size-1.5 rounded-full bg-primary-700 animate-pulse" />
              <span>{copy.eyebrow}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-balance text-ink leading-[1.15]">
              {copy.heading}
            </h1>

            {copy.standfirst === "" ? null : (
              <Standfirst className="mt-5 max-w-xl text-neutral-700 leading-relaxed">
                {copy.standfirst}
              </Standfirst>
            )}

            <div className="mt-8 lg:mt-10">
              <Link
                href="#alumni-stories"
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "group gap-2 px-6 shadow-md shadow-primary-700/15 transition-all duration-300 hover:shadow-lg hover:shadow-primary-700/25",
                )}
              >
                <span>{copy.cta}</span>
                <Icon
                  className="size-4 transition-transform group-hover:translate-x-1"
                  icon={ArrowRightIcon}
                />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-2.5 rounded-[2rem] bg-gradient-to-tr from-primary-700/20 via-primary-500/10 to-transparent -z-10 blur-xs" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl border border-primary-200/60 shadow-lg shadow-primary-900/5">
                <Image
                  src={copy.image.src}
                  alt={copy.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="object-cover object-left-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
