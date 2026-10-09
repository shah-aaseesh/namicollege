"use client";

import type { Route } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Display, Eyebrow, H3, H5, P } from "@/components/ui/typography";
import { DownloadIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { OfficialDocument } from "./documents-data";

// Custom Document / PDF Icon
function FilePdfIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10 13a1 1 0 0 0-1-1H7.5v6H9a1 1 0 0 0 1-1v-4z" />
      <path d="M14 18v-6h2a1.5 1.5 0 0 1 0 3h-2" />
    </svg>
  );
}

// Custom Search Icon
function SearchIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export type DocumentsCopy = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly searchPlaceholder: string;
  readonly allLabel: string;
  readonly emptyTitle: string;
  readonly emptyText: string;
  readonly resetLabel: string;
  readonly bannerTitle: string;
  readonly bannerText: string;
  readonly bannerButton: { readonly label: string; readonly href: string };
};

const ALL = "all";

export function DocumentsLibrary({
  categories,
  copy,
  documents,
}: {
  readonly categories: readonly {
    readonly id: string;
    readonly label: string;
  }[];
  readonly copy: DocumentsCopy;
  readonly documents: readonly OfficialDocument[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);
  const tabs = [{ id: ALL, label: copy.allLabel }, ...categories];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesCategory =
        selectedCategory === ALL || doc.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.institution.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [documents, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Masthead Header */}
      <section className="gutter-x section-y-masthead border-b border-border/80 bg-surface-raised">
        <div className="mx-auto max-w-page">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <Eyebrow>{copy.label}</Eyebrow>
              <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {copy.title}
              </Display>
              {copy.description.trim() === "" ? null : (
                <P className="mt-3 max-w-2xl text-ink-muted text-base sm:text-lg">
                  {copy.description}
                </P>
              )}
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-80">
              <label htmlFor="search-documents" className="sr-only">
                Search documents
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink-muted pointer-events-none" />
                <input
                  id="search-documents"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={copy.searchPlaceholder}
                  className="w-full rounded-full border border-border bg-surface pl-10 pr-4 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted hover:text-ink cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border/60 pt-5">
            {tabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              const count =
                tab.id === ALL
                  ? documents.length
                  : documents.filter((d) => d.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  type="button"
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all cursor-pointer",
                    isActive
                      ? "bg-accent text-white shadow-xs"
                      : "bg-surface border border-border text-ink-muted hover:border-accent/50 hover:text-accent hover:bg-accent/5",
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-muted text-ink-muted",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Document Grid Content */}
      <section className="gutter-x section-y">
        <div className="mx-auto max-w-page">
          {filteredDocs.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto rounded-2xl border border-dashed border-border p-8 bg-surface-raised/50">
              <FilePdfIcon className="size-10 text-ink-muted/40 mx-auto mb-3" />
              <H5 className="text-ink font-semibold">{copy.emptyTitle}</H5>
              <P className="mt-1 text-xs sm:text-sm text-ink-muted">
                {copy.emptyText}
              </P>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(ALL);
                }}
                className="mt-4 rounded-full"
              >
                {copy.resetLabel}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredDocs.map((doc) => {
                const isPdf = doc.fileType === "PDF";

                return (
                  <article
                    key={doc.id}
                    className={cn(
                      "group flex flex-col justify-between rounded-2xl border bg-surface-raised p-6 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                      doc.isFeatured
                        ? "border-accent/50 ring-1 ring-accent/20"
                        : "border-border/80 hover:border-accent/40",
                    )}
                  >
                    <div>
                      {/* Top Header: Badge and Format Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-3 py-0.5 text-[11px] font-semibold text-accent uppercase tracking-wider">
                          {doc.institution}
                        </span>

                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-mono font-bold uppercase",
                            isPdf
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : "bg-blue-100 text-blue-700 border border-blue-200",
                          )}
                        >
                          {doc.fileType} • {doc.fileSize}
                        </span>
                      </div>

                      {/* Document Title */}
                      <H3 className="font-display text-lg sm:text-xl font-medium text-ink group-hover:text-accent transition-colors leading-snug">
                        {doc.title}
                      </H3>

                      {/* Description */}
                      <p className="mt-3 font-body text-xs sm:text-sm text-ink-muted leading-relaxed text-justify [text-align-last:left] [hyphens:auto]">
                        {doc.description}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-body text-ink-muted/80">
                        {doc.updatedDate}
                      </span>

                      <div className="flex items-center gap-2">
                        {isPdf && (
                          <Link
                            href={doc.fileSrc as Route}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-ink-muted hover:text-accent hover:border-accent/50 transition-colors shadow-2xs"
                          >
                            Preview
                          </Link>
                        )}

                        <a
                          href={doc.fileSrc}
                          download
                          className={cn(
                            buttonVariants({ size: "sm" }),
                            "rounded-full gap-1.5 text-xs font-semibold shadow-xs",
                          )}
                        >
                          <Icon icon={DownloadIcon} className="size-3.5" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Online Application Notice Banner */}
          {copy.bannerTitle.trim() === "" ? null : (
            <div className="mt-12 sm:mt-16 rounded-2xl border border-border bg-primary-100/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <H5 className="text-ink font-semibold">{copy.bannerTitle}</H5>
                <P className="mt-1 text-xs sm:text-sm text-ink-muted">
                  {copy.bannerText}
                </P>
              </div>
              <Link
                href={copy.bannerButton.href as Route}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full font-semibold shrink-0 shadow-md",
                )}
              >
                {copy.bannerButton.label}
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
