import type { Route } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { getSitePage } from "@/lib/cms/pages/site";
import { content } from "@/lib/content";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  DownloadIcon,
  WhatsappIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

export type FloatingSocialsProps = {
  className?: string;
};

function formatWhatsAppLink(target: string, message: string): string {
  if (target.startsWith("http://") || target.startsWith("https://")) {
    const url = new URL(target);
    if (!url.searchParams.has("text") && message) {
      url.searchParams.set("text", message);
    }
    return url.toString();
  }
  const clean = target.replace(/^@/, "").trim();
  const isNumeric = /^[\d\s+-]+$/.test(clean);
  const identifier = isNumeric ? clean.replace(/\D/g, "") : clean;
  return `https://wa.me/${identifier}?text=${encodeURIComponent(message)}`;
}

export async function FloatingSocials({ className }: FloatingSocialsProps) {
  const [institution, { floating }] = await Promise.all([
    content.getInstitution(),
    getSitePage(),
  ]);
  const { contact } = institution;

  const whatsappTarget = contact.whatsapp ?? "namicollege";
  const whatsappUrl = formatWhatsAppLink(
    whatsappTarget,
    floating.whatsappMessage,
  );

  // A PDF opens in a new tab and downloads; a page link opens normally.
  const itemsOf = (links: readonly { label: string; href: string }[]) =>
    links.map((link) => ({
      label: link.label,
      href: link.href as Route,
      isPdf: /.pdf($|[?#])/i.test(link.href),
    }));

  const DOWNLOAD_CATEGORIES = [
    {
      id: "applications",
      label: floating.formsLabel,
      items: itemsOf(floating.forms),
    },
    {
      id: "brochures",
      label: floating.brochuresLabel,
      items: itemsOf(floating.brochures),
    },
  ].filter((cat) => cat.items.length > 0);

  return (
    <aside
      aria-label="Floating quick actions"
      className={cn(
        "fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-l-xl border-y border-l border-primary-600/30 bg-primary-700 p-1 shadow-2xl xl:flex",
        className,
      )}
    >
      {/* 1. Download Action (2-level nested flyout) */}
      <div className="group/item relative">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg text-white transition-all duration-150 hover:bg-primary-800 hover:scale-105 focus-visible:bg-primary-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset cursor-pointer"
          aria-label={floating.downloadLabel}
        >
          <Icon className="size-5 text-white" icon={DownloadIcon} />
          <span className="sr-only">{floating.downloadLabel}</span>
        </button>

        {/* Level 1 Flyout: Categories (Application Forms, Brochures) */}
        <div className="invisible pointer-events-none absolute right-full top-1/2 z-50 mr-3 w-48 -translate-y-1/2 -translate-x-1.5 rounded-xl border border-neutral-200/90 bg-white p-1.5 text-neutral-900 opacity-0 shadow-xl backdrop-blur-md transition-all duration-150 ease-out after:absolute after:-right-3 after:top-0 after:h-full after:w-4 group-hover/item:visible group-hover/item:pointer-events-auto group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:pointer-events-auto group-focus-within/item:translate-x-0 group-focus-within/item:opacity-100">
          <div className="absolute -right-1 top-1/2 size-2.5 -translate-y-1/2 rotate-45 border-r border-t border-neutral-200/90 bg-white" />

          <div className="relative space-y-1">
            {DOWNLOAD_CATEGORIES.map((cat) => (
              <div key={cat.id} className="group/cat relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 transition-colors duration-150 group-hover/cat:bg-primary-700 group-hover/cat:text-white focus-visible:outline-none focus-visible:bg-primary-700 focus-visible:text-white cursor-pointer"
                >
                  <Icon
                    className="size-3.5 shrink-0 text-neutral-400 transition-colors group-hover/cat:text-white"
                    icon={ChevronLeftIcon}
                  />
                  <span>{cat.label}</span>
                </button>

                {/* Level 2 Sub-Flyout: 4 Subcategories */}
                <div className="invisible pointer-events-none absolute right-full -top-1.5 z-50 mr-2.5 w-48 -translate-x-1.5 rounded-xl border border-neutral-200/90 bg-white p-1.5 text-neutral-900 opacity-0 shadow-xl backdrop-blur-md transition-all duration-150 ease-out after:absolute after:-right-3 after:top-0 after:h-full after:w-4 group-hover/cat:visible group-hover/cat:pointer-events-auto group-hover/cat:translate-x-0 group-hover/cat:opacity-100 group-focus-within/cat:visible group-focus-within/cat:pointer-events-auto group-focus-within/cat:translate-x-0 group-focus-within/cat:opacity-100">
                  <div className="absolute -right-1 top-3.5 size-2.5 rotate-45 border-r border-t border-neutral-200/90 bg-white" />

                  <div className="relative space-y-1">
                    {cat.items.map((opt, optIndex) => (
                      <Link
                        // biome-ignore lint/suspicious/noArrayIndexKey: links are an ordered CMS list
                        key={optIndex}
                        href={opt.href}
                        target={opt.isPdf ? "_blank" : undefined}
                        rel={opt.isPdf ? "noopener noreferrer" : undefined}
                        download={opt.isPdf ? true : undefined}
                        className="group/opt flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-neutral-800 transition-colors duration-150 hover:bg-primary-700 hover:text-white focus-visible:outline-none focus-visible:bg-primary-700 focus-visible:text-white"
                      >
                        <span className="truncate">{opt.label}</span>
                        <Icon
                          className="size-3.5 shrink-0 text-neutral-400 transition-colors group-hover/opt:text-white"
                          icon={ArrowRightIcon}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct WhatsApp Action */}
      <div className="group/item relative">
        <Link
          href={whatsappUrl as Route}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-9 items-center justify-center rounded-lg transition-all duration-150 hover:bg-primary-800 hover:scale-105 focus-visible:bg-primary-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset cursor-pointer"
          aria-label={floating.whatsappLabel}
        >
          <Icon className="size-5.5" icon={WhatsappIcon} />
          <span className="sr-only">{floating.whatsappLabel}</span>
        </Link>

        {/* Tooltip */}
        <div className="invisible pointer-events-none absolute right-full top-1/2 z-50 mr-3 -translate-y-1/2 -translate-x-1.5 whitespace-nowrap rounded-lg border border-neutral-200/90 bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 opacity-0 shadow-lg transition-all duration-150 ease-out group-hover/item:visible group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:translate-x-0 group-focus-within/item:opacity-100">
          <div className="absolute -right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-neutral-200/90 bg-white" />
          <span>{floating.whatsappLabel}</span>
        </div>
      </div>
    </aside>
  );
}
