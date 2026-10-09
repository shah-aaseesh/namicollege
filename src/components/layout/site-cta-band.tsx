"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H3, P } from "@/components/ui/typography";
import { ArrowUpRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Edited in WordPress (Site Settings → Newsletter); see SiteNewsletterBand. */
export type SiteCtaBandCopy = {
  readonly qr: { readonly src: string; readonly alt: string } | null;
  readonly namePlaceholder: string;
  readonly emailPlaceholder: string;
  readonly buttonLabel: string;
};

export type SiteCtaBandProps = {
  heading: string;
  standfirst: string;
  copy: SiteCtaBandCopy;
  onFooterSeam?: boolean;
  className?: string;
};

export function SiteCtaBand({
  heading,
  standfirst,
  copy,
  onFooterSeam = false,
  className,
}: SiteCtaBandProps) {
  const headingId = useId();
  const nameId = useId();
  const emailId = useId();

  const pathname = usePathname();
  const isInstitutionPage = pathname?.startsWith("/institutions");

  // Suppress footer-seam newsletter band on institution pages
  if (onFooterSeam && isInstitutionPage) {
    return null;
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "relative gutter-x",
        onFooterSeam ? "" : "section-y",
        className,
      )}
    >
      {onFooterSeam && (
        <div
          aria-hidden="true"
          className="field-brand absolute inset-x-0 top-1/2 bottom-0"
        />
      )}

      <Reveal className="relative mx-auto max-w-page">
        <div className="field-ink flex flex-col items-start justify-between gap-y-6 rounded-2xl px-6 py-7 sm:px-10 sm:py-8 lg:flex-row lg:items-center lg:gap-x-8 lg:px-12 lg:py-7 shadow-lg">
          <div className="flex items-center gap-4 sm:gap-6">
            {copy.qr === null ? null : (
              <div className="shrink-0 overflow-hidden rounded-xl bg-white p-2 sm:p-2.5 shadow-md">
                <Image
                  alt={copy.qr.alt}
                  className="size-20 sm:size-24 object-contain"
                  height={96}
                  priority
                  src={copy.qr.src}
                  unoptimized
                  width={96}
                />
              </div>
            )}
            <div className="max-w-sm sm:max-w-md">
              <H3 as="h2" id={headingId}>
                {heading}
              </H3>
              <P className="mt-1 text-xs sm:text-sm text-ink-muted">
                {standfirst}
              </P>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <Label className="sr-only" htmlFor={nameId}>
                  Full name
                </Label>
                <Input
                  autoComplete="name"
                  className="w-full min-w-0 border-input bg-transparent"
                  id={nameId}
                  name="name"
                  placeholder={copy.namePlaceholder}
                  type="text"
                />
              </div>

              <div className="min-w-0 flex-1">
                <Label className="sr-only" htmlFor={emailId}>
                  Email address
                </Label>
                <Input
                  autoComplete="email"
                  className="w-full min-w-0 border-input bg-transparent"
                  id={emailId}
                  name="email"
                  placeholder={copy.emailPlaceholder}
                  type="email"
                />
              </div>

              <Button
                size="lg"
                type="submit"
                className="shrink-0 bg-white text-primary-700 hover:bg-white/90"
              >
                <span>{copy.buttonLabel}</span>
                <Icon icon={ArrowUpRightIcon} />
              </Button>
            </div>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
