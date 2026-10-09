"use client";

import { SparklesIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { AlumniFormModal } from "./alumni-form";

export function AlumniNetworkCta({
  copy,
}: {
  readonly copy: {
    readonly eyebrow: string;
    readonly heading: string;
    readonly standfirst: string;
    readonly email: string;
    readonly buttonLabel: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="gutter-x section-y" id="connect">
        <div className="mx-auto max-w-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 sm:p-12 lg:p-16 shadow-xl shadow-primary-950/10 border border-primary-600/30">
            {/* Ambient lighting */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-black/25 blur-3xl" />

            <div className="relative">
              <SectionHeader
                action={
                  <button
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-primary-800 hover:bg-neutral-100 hover:text-primary-900 font-semibold shadow-lg shadow-black/15 transition-all duration-200 cursor-pointer active:scale-95 text-sm sm:text-base",
                    )}
                    onClick={() => setIsModalOpen(true)}
                    type="button"
                  >
                    <Icon
                      className="size-4.5 text-primary-700"
                      icon={SparklesIcon}
                    />
                    <span>{copy.buttonLabel}</span>
                  </button>
                }
                description={
                  <span className="text-white/85">{copy.standfirst}</span>
                }
                eyebrow={
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3 py-0.5 text-xs font-semibold tracking-wider text-white uppercase">
                    <span className="size-1.5 rounded-full bg-white animate-pulse" />
                    {copy.eyebrow ?? "Stay Connected"}
                  </span>
                }
                layout="action"
                title={<span className="text-white">{copy.heading}</span>}
              />
            </div>
          </div>
        </div>
      </section>

      <AlumniFormModal
        email={copy.email}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
