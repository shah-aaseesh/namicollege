"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ContentImage } from "@/lib/content";

export type SchoolDayMoment = {
  readonly title: string;
  readonly body: string;
  readonly photo?: ContentImage;
};

export type SchoolDayCopy = {
  readonly eyebrow?: string | null;
  readonly heading?: string | null;
  readonly standfirst?: string | null;
  readonly campusLabel: string;
  readonly campus: readonly SchoolDayMoment[];
};

const PHOTO_SIZES =
  "(min-width: 1568px) 300px, (min-width: 1024px) 240px, (min-width: 640px) 200px, 160px";

export function SchoolDay({
  copy,
  id,
}: {
  readonly copy: SchoolDayCopy;
  readonly id?: string;
}) {
  return (
    <section className="bg-[#284540] text-white gutter-x section-y" id={id}>
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.heading}
          eyebrowClassName="text-[#F7CD00] font-semibold"
          title={copy.eyebrow ?? "A day at NAMI"}
          description={copy.standfirst}
          descriptionClassName="text-white/85"
          titleClassName="text-white"
          className="[&_[data-slot=eyebrow]+span]:bg-white/20"
        />

        <div className="mt-12 lg:mt-16">
          <ul className="grid border-t border-white/15 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-16">
            {copy.campus.map((entry, index) => (
              <li
                className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 border-b border-white/15 py-4 sm:py-6"
                // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
                key={`${index}-${entry.title}`}
              >
                {entry.photo && (
                  <div className="relative aspect-4/3 hidden sm:block sm:h-30 sm:w-40 lg:h-33 lg:w-44 shrink-0 overflow-hidden rounded-2xl shadow-md bg-black/20">
                    <Image
                      alt={entry.photo.alt}
                      className="h-full w-full object-cover object-left-top"
                      fill
                      sizes={PHOTO_SIZES}
                      src={entry.photo.src}
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <Accordion className="border-none w-full">
                    <AccordionItem value={`${index}`} className="border-none">
                      <AccordionTrigger className="p-0 text-start group hover:text-white transition-colors">
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold sm:font-normal text-white leading-snug group-hover:text-[#9CC21A]">
                          {entry.title}
                        </h3>
                      </AccordionTrigger>
                      <AccordionPanel className="p-0 pt-3 pe-0">
                        {entry.photo && (
                          <div className="mb-3 w-full overflow-hidden rounded-xl shadow-md bg-black/20 sm:hidden">
                            <Image
                              alt={entry.photo.alt}
                              className="aspect-[16/10] w-full rounded-xl object-cover object-left-top"
                              height={entry.photo.height}
                              sizes="(max-width: 640px) 100vw, 400px"
                              src={entry.photo.src}
                              width={entry.photo.width}
                            />
                          </div>
                        )}
                        <p className="font-body text-sm sm:text-base leading-relaxed text-white/80">
                          {entry.body}
                        </p>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
