"use client";

import {
  ArrowUpRight01Icon,
  Calendar03Icon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Location01Icon,
  Mail01Icon,
  Mortarboard01Icon,
} from "@hugeicons/core-free-icons";
import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { H4, H5, P } from "@/components/ui/typography";
import type {
  CareersPageContent,
  VacancyWithRequirements,
} from "@/lib/cms/pages/careers";
import type { SectionCopy } from "@/lib/content";
import { cn } from "@/lib/utils";
import { employmentTypeLabel } from "./careers-copy";

const fullDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const TYPE_OPTIONS = [
  { value: "all", label: "All Employment Types" },
  { value: "full-time", label: "Full Time" },
  { value: "contract", label: "Contract" },
  { value: "part-time", label: "Part Time" },
  { value: "internship", label: "Internship" },
] as const;

function VacanciesHeader({
  copy,
}: {
  readonly copy: SectionCopy;
  readonly totalCount?: number;
}) {
  return (
    <SectionHeader
      description={copy.standfirst}
      eyebrow={copy.heading}
      layout="split"
      title={copy.eyebrow ?? "Current Openings"}
    />
  );
}

type Application = CareersPageContent["application"];

function VacancyCard({
  application,
  item,
}: {
  readonly application: Application;
  readonly item: VacancyWithRequirements;
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = application.email.trim();
  const checklist =
    item.requirements.length > 0 ? item.requirements : application.checklist;
  const [instructionsBefore, instructionsAfter = ""] =
    application.instructions.split("{email}");

  const mailtoHref = `mailto:${email}?subject=Application%20for%20${encodeURIComponent(
    item.title,
  )}%20-%20[Your%20Name]&body=Dear%20NAMI%20Recruitment%20Committee,%0D%0A%0D%0AI%20would%20like%20to%20apply%20for%20the%20${encodeURIComponent(
    item.title,
  )}%20position%20(${encodeURIComponent(
    item.department,
  )}).%0D%0A%0D%0APlease%20find%20my%20attached%20Curriculum%20Vitae,%20academic%20credentials,%20and%20statement%20of%20purpose.%0D%0A%0D%0AContact%20Number:%20%0D%0ACurrent%20Location:%20%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard fallback handled silently
    }
  };

  return (
    <li className="group rounded-2xl border border-border/80 bg-surface p-6 sm:p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
            <Icon icon={Mortarboard01Icon} className="size-3.5" />
            {item.department}
          </span>
          <span className="inline-flex items-center rounded-md border border-border bg-neutral-100 px-2.5 py-1 text-xs font-medium text-ink-muted">
            {employmentTypeLabel[item.employmentType]}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-ink-muted">
          <Icon icon={Calendar03Icon} className="size-3.5" />
          <span>
            {item.closesAt === null
              ? "Open until filled"
              : `Deadline: ${fullDate.format(new Date(item.closesAt))}`}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex-1">
          <H4 className="text-xl sm:text-2xl font-normal text-ink group-hover:text-accent transition-colors">
            {item.title}
          </H4>

          <div className="mt-2 flex items-center gap-2 text-xs text-ink-muted">
            <Icon icon={Location01Icon} className="size-3.5 text-accent" />
            <span>{item.location}</span>
            <span className="text-border">•</span>
            <span>Posted {fullDate.format(new Date(item.postedAt))}</span>
          </div>

          <P className="mt-4 text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl">
            {item.summary}
          </P>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-0 lg:shrink-0">
          <a
            href={mailtoHref}
            className={cn(buttonVariants({ size: "default" }), "gap-1.5")}
          >
            <span>Apply via Email</span>
            <Icon icon={ArrowUpRight01Icon} className="size-4" />
          </a>

          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span>{expanded ? "Less Details" : "Requirements"}</span>
            <Icon
              icon={expanded ? ChevronUpIcon : ChevronDownIcon}
              className="size-4"
            />
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-6 border-t border-border pt-6 text-sm text-ink-muted">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <H5 className="text-sm font-semibold text-ink uppercase tracking-wider">
                {application.checklistTitle}
              </H5>
              <ul className="mt-3 flex flex-col gap-2 text-xs sm:text-sm">
                {checklist.map((line, index) => (
                  <li
                    className="flex items-start gap-2"
                    // biome-ignore lint/suspicious/noArrayIndexKey: lines are an ordered CMS list
                    key={index}
                  >
                    <span className="text-accent">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <H5 className="text-sm font-semibold text-ink uppercase tracking-wider">
                Submission Instructions
              </H5>
              <P className="mt-3 text-xs sm:text-sm">
                {instructionsBefore}
                {application.instructions.includes("{email}") ? (
                  <span className="font-semibold text-ink">{email}</span>
                ) : null}
                {instructionsAfter}
              </P>
              <div className="mt-4 flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleCopyEmail}
                >
                  <Icon
                    icon={copied ? CheckIcon : Mail01Icon}
                    className="size-3"
                  />
                  <span>{copied ? "Email Copied!" : "Copy HR Email"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export function CareersVacancies({
  application,
  section,
  vacancies,
}: {
  readonly application: Application;
  readonly section: SectionCopy;
  readonly vacancies: readonly VacancyWithRequirements[];
}) {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const departments = useMemo(() => {
    const depts = new Set<string>();
    for (const v of vacancies) {
      depts.add(v.department);
    }
    return Array.from(depts);
  }, [vacancies]);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      const matchDept = selectedDept === "all" || v.department === selectedDept;
      const matchType =
        selectedType === "all" || v.employmentType === selectedType;
      const matchQuery =
        searchQuery.trim() === "" ||
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.department.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDept && matchType && matchQuery;
    });
  }, [vacancies, selectedDept, selectedType, searchQuery]);

  return (
    <section className="gutter-x section-y" id="vacancies">
      <div className="mx-auto max-w-page">
        <VacanciesHeader copy={section} totalCount={vacancies.length} />

        <div className="mt-10 flex flex-col gap-4 rounded-xl border border-border/80 bg-neutral-100/50 p-4 sm:p-6 lg:mt-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mr-1">
                Department:
              </span>
              <button
                type="button"
                onClick={() => setSelectedDept("all")}
                className={cn(
                  "min-h-9 rounded-lg px-3.5 py-2 text-xs font-medium transition-all",
                  selectedDept === "all"
                    ? "bg-accent text-white shadow-xs"
                    : "border border-border bg-surface text-ink-muted hover:bg-surface-raised",
                )}
              >
                All Departments
              </button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    "min-h-9 rounded-lg px-3.5 py-2 text-xs font-medium transition-all",
                    selectedDept === dept
                      ? "bg-accent text-white shadow-xs"
                      : "border border-border bg-surface text-ink-muted hover:bg-surface-raised",
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mr-1">
                Type:
              </span>
              <Select
                value={selectedType}
                onValueChange={(val: string | null) =>
                  setSelectedType(val ?? "all")
                }
              >
                <SelectTrigger
                  size="sm"
                  className="w-48 bg-surface border-border"
                  aria-label="Filter vacancies by employment type"
                >
                  <SelectValue>
                    {TYPE_OPTIONS.find((opt) => opt.value === selectedType)
                      ?.label ?? "All Employment Types"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, subject, or keywords..."
              aria-label="Search vacancies"
              className="w-full min-h-10 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-ink-muted hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {filteredVacancies.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
            <H5 className="text-lg font-medium text-ink">
              No Openings Match Your Filter
            </H5>
            <P className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              {section.emptyState}
            </P>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-6"
              onClick={() => {
                setSelectedDept("all");
                setSelectedType("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <ul className="mt-8 flex flex-col gap-6 lg:mt-10 lg:gap-8">
            {filteredVacancies.map((item) => (
              <VacancyCard
                application={application}
                item={item}
                key={item.id}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
