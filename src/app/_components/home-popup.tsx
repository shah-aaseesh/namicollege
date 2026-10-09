"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import type { HomePopup as HomePopupContent } from "@/lib/cms/pages/home";
import { CloseIcon } from "@/lib/icons";

export function HomePopup({ popup }: { popup: HomePopupContent }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger on every website load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const picture = (
    <Image
      alt={popup.image.alt}
      className="h-auto w-full object-contain"
      height={popup.image.height || 1200}
      priority
      sizes="(max-width: 640px) 92vw, (max-width: 768px) 480px, 520px"
      src={popup.image.src}
      width={popup.image.width || 1200}
    />
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        hideClose
        className="max-w-[92vw] sm:max-w-[480px] md:max-w-[520px] p-0 border-none bg-transparent shadow-none"
      >
        <DialogTitle className="sr-only">{popup.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {popup.image.alt}
        </DialogDescription>

        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-neutral-950 shadow-2xl">
          {/* Close button */}
          <DialogClose
            aria-label="Close popup"
            className="absolute right-3 top-3 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer shadow-lg"
          >
            <Icon icon={CloseIcon} className="size-4 sm:size-5" />
          </DialogClose>

          {popup.href.trim() === "" ? (
            picture
          ) : (
            <Link
              className="block relative overflow-hidden"
              href={popup.href as Route}
              onClick={() => setIsOpen(false)}
            >
              {picture}
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
