import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import type { BachelorsProgramme } from "../../_components/bachelors-copy";
import { courseDetailCopy } from "./course-detail-copy";

export function CourseEligibility({
  course,
}: {
  readonly course: BachelorsProgramme;
}) {
  if (course.entry.length === 0) return null;

  const columns = courseDetailCopy.entryColumns;

  return (
    <section className="gutter-x section-y border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-page space-y-5">
        <div>
          <SplitText
            as="h2"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink"
          >
            {course.entryLabel}
          </SplitText>
          <p className="mt-2 text-sm sm:text-base text-ink-muted leading-relaxed">
            All formal admissions decisions and offer letters are issued in
            direct alignment with the academic quality frameworks of{" "}
            {course.awardingBody}.
          </p>
        </div>

        <Reveal className="space-y-5">
          {/* Requirements Table */}
          <div
            aria-label={`${course.fullTitle} — ${course.entryLabel}`}
            className="overflow-x-auto rounded-2xl border border-border bg-surface-raised/40 shadow-2xs"
            tabIndex={0}
          >
            <table className="w-full min-w-[480px] border-collapse text-left font-body text-sm table-fixed">
              <caption className="sr-only">
                {`${course.fullTitle} — ${course.entryLabel}`}
              </caption>

              <colgroup>
                <col className="w-2/5 sm:w-1/3" />
                <col className="w-3/5 sm:w-2/3" />
              </colgroup>

              <thead>
                <tr className="border-b border-border bg-muted/60">
                  <th
                    className="py-3.5 px-4 sm:px-6 font-body text-xs font-semibold tracking-widest text-ink-muted uppercase"
                    scope="col"
                  >
                    {columns.qualification}
                  </th>
                  <th
                    className="py-3.5 px-4 sm:px-6 font-body text-xs font-semibold tracking-widest text-ink-muted uppercase"
                    scope="col"
                  >
                    {columns.requirement}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/60">
                {course.entry.map((item, index) => (
                  <tr
                    // biome-ignore lint/suspicious/noArrayIndexKey: requirements are an ordered CMS list
                    key={index}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <th
                      className="py-3.5 px-4 sm:px-6 font-medium text-ink align-top"
                      scope="row"
                    >
                      {item.label}
                    </th>
                    <td className="py-3.5 px-4 sm:px-6 text-ink-muted leading-relaxed align-top">
                      {item.requirement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Entry Notes */}
          {course.entryNotes.length > 0 && (
            <div className="rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5 space-y-2.5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Important Entry Notes
              </span>
              <ul className="space-y-2">
                {course.entryNotes.map((note, idx) => (
                  <li
                    className="font-body text-xs sm:text-sm text-ink-muted leading-relaxed flex items-start gap-2.5"
                    key={idx}
                  >
                    <span className="size-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
