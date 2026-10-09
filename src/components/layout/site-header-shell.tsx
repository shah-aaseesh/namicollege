"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

import { Icon } from "@/components/ui/icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { SiteHeaderWordmark } from "./site-header-wordmark";
import {
  type SiteMetaLink,
  SiteNavPanel,
  type SiteNavPanelCopy,
} from "./site-nav-panel";
import type { SiteNavItem } from "./site-nav-sections";

const HIDE_AFTER = 96;
const HIDE_DURATION = 0.2;
const SCROLLED_AT = 24;

export type SiteHeaderShellProps = {
  siteName: string;
  items: readonly SiteNavItem[];
  places: readonly string[];
  links: readonly SiteMetaLink[];
  panel: SiteNavPanelCopy;
};

function isItemActive(item: SiteNavItem, pathname: string): boolean {
  if (item.href === "/") {
    return pathname === "/";
  }
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
    return true;
  }
  if (item.children) {
    return item.children.some(
      (child) =>
        child.href === pathname ||
        (child.href !== "/" && pathname.startsWith(`${child.href}/`)),
    );
  }
  return false;
}

function getInstitutionalLogo(pathname: string, defaultName: string) {
  if (
    pathname === "/institutions/school" ||
    pathname.startsWith("/institutions/school/")
  ) {
    return {
      src: "/logos/brand/International School-ai.png",
      name: "NAMI International School",
    };
  }
  if (
    pathname === "/institutions/a-levels" ||
    pathname.startsWith("/institutions/a-levels/")
  ) {
    return {
      src: "/logos/brand/nami-college.png",
      name: "NAMI College",
    };
  }
  return {
    src: "/logos/brand/nami-color.svg",
    name: defaultName,
  };
}

function DesktopNavDropdown({
  item,
  pathname,
}: {
  item: SiteNavItem;
  pathname: string;
}) {
  const container = useRef<HTMLLIElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const icon = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef<gsap.core.Timeline | null>(null);
  const active = isItemActive(item, pathname);

  useGSAP(
    () => {
      if (!dropdown.current || !icon.current) return;

      // Set initial state
      gsap.set(dropdown.current, { autoAlpha: 0, y: -10, display: "none" });

      // Create a timeline that can be played forward/backward
      const tl = gsap
        .timeline({ paused: true })
        .to(
          dropdown.current,
          {
            autoAlpha: 1,
            y: 0,
            display: "block",
            duration: 0.2,
            ease: "power2.out",
          },
          0,
        )
        .to(
          icon.current,
          {
            rotation: 180,
            duration: 0.2,
            ease: "power2.out",
          },
          0,
        );

      hoverAnim.current = tl;

      return () => {
        tl.kill();
        hoverAnim.current = null;
      };
    },
    { scope: container },
  );

  useEffect(() => {
    if (hoverAnim.current) {
      if (hovered) hoverAnim.current.play();
      else hoverAnim.current.reverse();
    }
  }, [hovered]);

  return (
    <li
      ref={container}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={item.href as Route}
        className={cn(
          "inline-flex items-center gap-1 font-body text-xs xl:text-sm font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap",
          active
            ? "bg-white text-accent font-bold shadow-xs"
            : hovered
              ? "text-white bg-white/20 shadow-2xs"
              : "text-white/90 hover:text-white hover:bg-white/15",
        )}
      >
        <span>{item.label}</span>
        <Icon
          ref={icon}
          icon={ChevronDownIcon}
          className={cn(
            "size-3.5 shrink-0 transition-colors",
            active ? "text-accent" : "text-white/80",
          )}
        />
      </Link>

      <div
        ref={dropdown}
        className="absolute top-full left-0 pt-2.5 w-max max-w-xs invisible z-50"
      >
        <div className="bg-surface-raised/95 backdrop-blur-md shadow-2xl rounded-2xl p-1.5 flex flex-col gap-1 border border-border/80 min-w-[210px]">
          {item.children?.map((child) => {
            const isChildActive =
              pathname === child.href ||
              (child.href !== "/" && pathname.startsWith(`${child.href}/`));

            return (
              <Link
                key={child.label}
                href={child.href as Route}
                className={cn(
                  "font-body text-xs xl:text-sm font-medium py-2 px-3.5 rounded-xl transition-colors block",
                  isChildActive
                    ? "bg-accent/12 text-accent font-semibold"
                    : "text-ink/90 hover:text-accent hover:bg-accent/10 focus:bg-accent/10 focus:text-accent",
                )}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </li>
  );
}

export function SiteHeaderShell({
  items,
  places,
  links,
  panel,
  siteName,
}: SiteHeaderShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const showAnim = useRef<gsap.core.Tween | null>(null);
  const openRef = useRef(open);
  const labelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    openRef.current = open;
    if (open) showAnim.current?.progress(1);
  }, [open]);

  useGSAP(
    () => {
      const barEl = bar.current;
      if (barEl === null) return;

      const tween = gsap
        .from(barEl, {
          yPercent: -100,
          paused: true,
          duration: HIDE_DURATION,
        })
        .progress(1);
      showAnim.current = tween;

      let trigger: ScrollTrigger | undefined;

      const frame = requestAnimationFrame(() => {
        trigger = ScrollTrigger.create({
          start: "top top",
          end: "max",
          onUpdate: (self) => {
            if (openRef.current) {
              tween.progress(1);
              return;
            }
            if (self.direction === -1 || self.scroll() < HIDE_AFTER) {
              tween.play();
            } else {
              tween.reverse();
            }
          },
        });
      });

      return () => {
        cancelAnimationFrame(frame);
        trigger?.kill();
        showAnim.current = null;
      };
    },
    { scope: root },
  );

  const institutionalLogo = getInstitutionalLogo(pathname, siteName);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col"
      ref={root}
    >
      {open ? null : (
        <Link
          className={cn(
            buttonVariants({ size: "sm" }),
            "pointer-events-none fixed top-4 left-4 z-10 opacity-0 transition-opacity focus:pointer-events-auto focus:opacity-100",
          )}
          href={"#main" as Route}
        >
          Skip to content
        </Link>
      )}

      <div
        className={cn(
          "pointer-events-auto border-b transition-colors gutter-x bg-surface-raised",
          scrolled ? "border-border" : "border-transparent",
        )}
        ref={bar}
      >
        <div
          className={cn(
            "mx-auto flex max-w-page items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-18 lg:h-20" : "h-22 sm:h-24 lg:h-28",
          )}
        >
          <Link href="/" className="flex items-center h-full shrink-0">
            <SiteHeaderWordmark
              name={institutionalLogo.name}
              scrolled={scrolled}
              src={institutionalLogo.src}
            />
          </Link>

          <nav
            aria-label="Sections"
            className="hidden flex-1 justify-end lg:flex"
          >
            <div className="flex items-center bg-accent text-white rounded-full px-2 py-1.5 shadow-md border border-accent/20">
              <ul className="flex items-center gap-0.5 xl:gap-1">
                {items.map((item) => {
                  const active = isItemActive(item, pathname);

                  if (item.children) {
                    return (
                      <DesktopNavDropdown
                        key={item.label}
                        item={item}
                        pathname={pathname}
                      />
                    );
                  }

                  return (
                    <li key={item.label}>
                      <Link
                        className={cn(
                          "inline-flex items-center font-body text-xs xl:text-sm font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap",
                          active
                            ? "bg-white text-accent font-bold shadow-xs"
                            : "text-white/90 hover:text-white hover:bg-white/15",
                        )}
                        href={item.href as Route}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="flex items-center gap-x-3 xl:gap-x-5 shrink-0 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    size="icon"
                    variant="default"
                    aria-label="Menu"
                    className="min-h-11 min-w-11"
                  >
                    <Icon icon={MenuIcon} className="size-5" />
                  </Button>
                }
              />
              <SheetContent
                className="w-full sm:max-w-md lg:max-w-sm flex flex-col overflow-y-auto p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                side="right"
                hideClose
              >
                <SheetClose className="absolute top-0 left-0 bg-accent text-white p-3 hover:bg-accent/90 transition-colors cursor-pointer z-10 flex items-center justify-center">
                  <Icon icon={CloseIcon} className="size-6" />
                  <span className="sr-only">Close</span>
                </SheetClose>
                <div className="px-6 pb-6 pt-16 lg:py-10 h-full w-full flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SiteNavPanel
                    items={items}
                    labelId={labelId}
                    places={places}
                    links={links}
                    panel={panel}
                    siteName={institutionalLogo.name}
                    logoSrc={institutionalLogo.src}
                    onNavigate={() => setOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
