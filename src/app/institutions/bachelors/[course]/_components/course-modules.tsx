"use client";

import { Fragment, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";
import type {
  BachelorsProgramme,
  ProgrammeModule,
  ProgrammeStage,
} from "../../_components/bachelors-copy";
import { courseDetailCopy } from "./course-detail-copy";

const headCell =
  "border-b border-border-strong py-3.5 pe-4 sm:pe-6 align-bottom font-body text-xs font-semibold tracking-wider text-ink-muted uppercase text-left last:pe-0";
const bodyCell =
  "border-b border-border/80 py-4 pe-4 sm:pe-6 align-middle text-left font-body text-sm last:pe-0";

function PlusMinusIcon({
  isOpen,
  className,
}: {
  readonly isOpen: boolean;
  readonly className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex size-8 sm:size-9 items-center justify-center rounded-full bg-accent text-white shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-primary-800",
        isOpen && "ring-2 ring-accent/40",
        className,
      )}
    >
      {/* Horizontal bar */}
      <span className="absolute h-0.5 w-3.5 sm:w-4 rounded-full bg-white transition-transform duration-300" />
      {/* Vertical bar (collapses when open to form minus) */}
      <span
        className={cn(
          "absolute h-3.5 sm:h-4 w-0.5 rounded-full bg-white transition-all duration-300",
          isOpen
            ? "scale-y-0 opacity-0 rotate-90"
            : "scale-y-100 opacity-100 rotate-0",
        )}
      />
    </span>
  );
}

function ModuleRow({
  module,
  panelId,
  isOpen,
  onToggle,
  showStatus,
  showPrerequisites,
  columnCount,
}: {
  readonly module: ProgrammeModule;
  readonly panelId: string;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly showStatus: boolean;
  readonly showPrerequisites: boolean;
  readonly columnCount: number;
}) {
  const description =
    module.description ??
    "This module focuses on developing core domain principles, analytical frameworks, and practical problem-solving methodologies designed to build practical and theoretical mastery.";

  return (
    <Fragment>
      <tr
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "group transition-colors cursor-pointer select-none focus-visible:outline-hidden focus-visible:bg-accent/[0.06]",
          isOpen ? "bg-accent/[0.05]" : "hover:bg-muted/30",
        )}
      >
        <th
          className={`${bodyCell} font-body font-semibold whitespace-nowrap text-ink`}
          scope="row"
        >
          <span className="inline-flex items-center gap-1.5">
            <span
              className={cn(
                "size-1.5 rounded-full transition-colors",
                isOpen ? "bg-accent" : "bg-border-strong group-hover:bg-accent",
              )}
            />
            {module.code}
          </span>
        </th>
        <td className={`${bodyCell} font-normal text-ink`}>
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "font-medium transition-colors",
                isOpen && "text-accent font-semibold",
              )}
            >
              {module.title}
            </span>
            <span className="text-[11px] font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">
              {isOpen ? "Close details" : "View details"}
            </span>
          </div>
        </td>
        <td className={`${bodyCell} tabular-nums text-ink-muted`}>
          {module.credits}
        </td>
        {showStatus ? (
          <td className={`${bodyCell} whitespace-nowrap text-ink-muted`}>
            {module.status}
          </td>
        ) : null}
        {showPrerequisites ? (
          <td className={`${bodyCell} text-ink-muted`}>
            {module.prerequisites}
          </td>
        ) : null}
        <td className={`${bodyCell} text-right pe-3 sm:pe-4 w-12`}>
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex size-6 sm:size-7 items-center justify-center rounded-full font-bold text-sm leading-none transition-all duration-200 shadow-2xs",
              isOpen
                ? "bg-accent text-white scale-105 ring-2 ring-accent/30"
                : "bg-accent/15 text-accent group-hover:bg-accent group-hover:text-white group-hover:scale-105",
            )}
          >
            {isOpen ? "−" : "+"}
          </span>
        </td>
      </tr>

      {isOpen ? (
        <tr className="bg-accent/[0.03] border-b border-border/80">
          <td colSpan={columnCount} className="p-3 sm:p-5">
            <div
              id={panelId}
              className="space-y-3 rounded-xl border border-accent/25 bg-surface p-4 sm:p-5 shadow-2xs animate-in fade-in-50 duration-200"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {module.code}
                  </span>
                  <h4 className="font-display text-base sm:text-lg font-bold text-accent">
                    {module.title}
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                  <span className="rounded-md bg-accent/10 px-2.5 py-1 text-accent font-semibold">
                    {module.credits} Credits
                  </span>
                  {module.status ? (
                    <span className="rounded-md bg-muted px-2.5 py-1 text-ink">
                      {module.status}
                    </span>
                  ) : null}
                  {module.prerequisites && module.prerequisites !== "None" ? (
                    <span className="rounded-md bg-muted px-2.5 py-1 text-ink-muted">
                      Pre-req: {module.prerequisites}
                    </span>
                  ) : null}
                </div>
              </div>
              <p className="font-body text-sm sm:text-base text-ink-muted leading-relaxed">
                {description}
              </p>
            </div>
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}

function StageAccordionItem({
  courseTitle,
  stage,
  isOpen,
  onToggle,
}: {
  readonly courseTitle: string;
  readonly stage: ProgrammeStage;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}) {
  // Rows are tracked by position: two modules can share a code.
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set(),
  );

  const columns = courseDetailCopy.moduleColumns;
  const showStatus = stage.modules.some((module) => module.status !== null);
  const showPrerequisites = stage.modules.some(
    (module) => module.prerequisites !== null,
  );

  let columnCount = 4; // Code, Title, Credits, Plus/Minus
  if (showStatus) columnCount += 1;
  if (showPrerequisites) columnCount += 1;

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="group rounded-2xl border border-border/80 bg-surface shadow-2xs overflow-hidden transition-all duration-200 hover:border-accent/30">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`stage-panel-${stage.key}`}
        id={`stage-header-${stage.key}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-muted/10 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/40 select-none"
      >
        <div className="flex items-center gap-3">
          <span className="size-2.5 rounded-full bg-accent shrink-0" />
          <h3 className="font-display text-lg sm:text-xl font-semibold text-ink">
            {stage.label}
          </h3>
          <span className="hidden sm:inline-flex items-center rounded-full bg-muted/60 px-2.5 py-0.5 font-body text-xs font-medium text-ink-muted">
            {stage.modules.length}{" "}
            {stage.modules.length === 1 ? "module" : "modules"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-ink-muted">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent hidden xs:inline-block">
            {isOpen ? "Collapse" : "Expand"}
          </span>
          <PlusMinusIcon isOpen={isOpen} />
        </div>
      </button>

      <div
        id={`stage-panel-${stage.key}`}
        role="region"
        aria-labelledby={`stage-header-${stage.key}`}
        className={cn(
          "grid transition-all duration-300 ease-in-out overflow-hidden",
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none",
        )}
      >
        <div className="overflow-hidden">
          <div className="p-5 sm:p-6 pt-0 space-y-4 border-t border-border/40">
            <div className="flex items-center justify-between pt-2">
              <span className="font-body text-xs text-ink-muted italic">
                Click on any module or the + button to view its description and
                syllabus details.
              </span>
            </div>

            <div
              aria-label={`${stage.label} modules`}
              className="overflow-x-auto rounded-xl border border-border/80 bg-surface-raised/30 p-3 sm:p-5 shadow-2xs mt-2"
              // biome-ignore lint/a11y/noNoninteractiveTabindex: a horizontally scrolling container must be reachable by keyboard alone (WCAG 2.1.1, axe scrollable-region-focusable) and the table holds no focusable child of its own.
              tabIndex={0}
            >
              <table className="w-full min-w-xl table-fixed border-collapse text-left font-body text-sm">
                <caption className="sr-only">
                  {`${courseTitle} — ${stage.label} modules`}
                </caption>

                <colgroup>
                  <col
                    className={
                      showStatus && showPrerequisites
                        ? "w-[16%] sm:w-[15%]"
                        : "w-[18%] sm:w-[16%]"
                    }
                  />
                  <col
                    className={
                      showStatus && showPrerequisites
                        ? "w-[34%] sm:w-[38%]"
                        : "w-[42%] sm:w-[48%]"
                    }
                  />
                  <col className="w-[14%] sm:w-[12%]" />
                  {showStatus ? <col className="w-[16%] sm:w-[15%]" /> : null}
                  {showPrerequisites ? (
                    <col className="w-[16%] sm:w-[15%]" />
                  ) : null}
                  <col className="w-[8%] sm:w-[6%]" />
                </colgroup>

                <thead>
                  <tr>
                    <th className={headCell} scope="col">
                      {columns.code}
                    </th>
                    <th className={headCell} scope="col">
                      {columns.title}
                    </th>
                    <th className={headCell} scope="col">
                      {columns.credits}
                    </th>
                    {showStatus ? (
                      <th className={headCell} scope="col">
                        {columns.status}
                      </th>
                    ) : null}
                    {showPrerequisites ? (
                      <th className={headCell} scope="col">
                        {columns.prerequisites}
                      </th>
                    ) : null}
                    <th className={headCell} scope="col">
                      <span className="sr-only">Toggle details</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {stage.modules.map((module, index) => (
                    <ModuleRow
                      columnCount={columnCount}
                      isOpen={expandedModules.has(index)}
                      // biome-ignore lint/suspicious/noArrayIndexKey: module codes can repeat
                      key={index}
                      module={module}
                      onToggle={() => toggleModule(index)}
                      panelId={`${stage.key}-module-${index + 1}`}
                      showPrerequisites={showPrerequisites}
                      showStatus={showStatus}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {stage.note === null ? null : (
              <p className="font-body text-xs sm:text-sm text-pretty text-ink-muted pl-1 pt-1">
                {stage.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseModules({
  course,
}: {
  readonly course: BachelorsProgramme;
}) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => {
    const firstKey = course.stages[0]?.key;
    return new Set(firstKey ? [firstKey] : []);
  });

  if (course.stages.length === 0) return null;

  const allExpanded = course.stages.every((stage) =>
    expandedKeys.has(stage.key),
  );

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedKeys(new Set());
    } else {
      setExpandedKeys(new Set(course.stages.map((stage) => stage.key)));
    }
  };

  const toggleStage = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <section className="gutter-x section-y border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-page space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <SplitText
              as="h2"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink"
            >
              {courseDetailCopy.modulesHeading}
            </SplitText>
            {course.stagesNote === null ? null : (
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-3xl">
                {course.stagesNote}
              </p>
            )}
          </div>

          {course.stages.length > 1 ? (
            <button
              type="button"
              onClick={toggleAll}
              className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-body text-xs font-bold uppercase tracking-wider text-accent transition-all hover:bg-accent hover:text-white cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <span className="inline-flex size-4 items-center justify-center rounded-full bg-accent text-white text-[11px] font-bold leading-none">
                {allExpanded ? "−" : "+"}
              </span>
              <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
            </button>
          ) : null}
        </div>

        <Reveal className="space-y-4 sm:space-y-5">
          {course.stages.map((stage) => (
            <StageAccordionItem
              courseTitle={course.fullTitle}
              isOpen={expandedKeys.has(stage.key)}
              key={stage.key}
              onToggle={() => toggleStage(stage.key)}
              stage={stage}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
