import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import type {
  ALevelsPageContent,
  ALevelsPathway,
  ALevelsStream,
} from "@/lib/cms/pages/a-levels";

// Source shape of the bundled copy (college-copy.ts). The CMS edits each
// pathway's subjects directly; see src/lib/cms/pages/a-levels/defaults.ts.
export type SubjectGroupKey = "s1" | "s2" | "ns1" | "ns2";

export type SubjectGroup = {
  readonly key: SubjectGroupKey;
  readonly short: string;
  readonly label: string;
};

export type CollegeSubject = {
  readonly name: string;
  readonly compulsory: boolean;
  readonly groups: readonly SubjectGroupKey[];
};

export type CollegeSubjectStream = {
  readonly key: string;
  readonly label: string;
  readonly minimumNote: string;
  readonly overlapNote?: string;
  readonly listLabel: string;
  readonly groups: readonly SubjectGroup[];
  readonly subjects: readonly CollegeSubject[];
};

export type CollegeSubjectsCopy = {
  readonly eyebrow: string;
  readonly heading: string;
  readonly standfirst: string;
  readonly compulsoryLabel: string;
  readonly streams: readonly CollegeSubjectStream[];
  readonly offeredLabel: (group: string) => string;
  readonly notOfferedLabel: (group: string) => string;
};

type SubjectsContent = ALevelsPageContent["subjects"];

function nonEmpty(items: readonly string[]): readonly string[] {
  return items.filter((item) => item.trim() !== "");
}

function PathwayCard({
  copy,
  pathway,
  stream,
}: {
  readonly copy: SubjectsContent;
  readonly pathway: ALevelsPathway;
  readonly stream: ALevelsStream;
}) {
  const compulsory = nonEmpty(pathway.compulsory);
  const electives = nonEmpty(pathway.electives);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-surface-raised p-6 sm:p-8 transition-colors duration-200 hover:border-neutral-400 shadow-2xs">
      <div>
        {/* Pathway Header */}
        <div className="border-b border-border/70 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {stream.label}
          </span>
          <h4 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
            {pathway.title}
          </h4>
        </div>

        {/* Subjects Roster */}
        <div className="mt-5 space-y-4">
          {/* Compulsory Subjects */}
          {compulsory.map((subject) => (
            <div
              className="flex items-center justify-between border-b border-border/50 py-2.5"
              key={subject}
            >
              <span className="font-display text-base sm:text-lg font-semibold text-ink">
                {subject}
              </span>
              {copy.compulsoryLabel.trim() === "" ? null : (
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent border border-accent/20">
                  {copy.compulsoryLabel}
                </span>
              )}
            </div>
          ))}

          {/* Elective Subjects */}
          {electives.length === 0 ? null : (
            <div className="pt-2">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {copy.electivesLabel}
              </span>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {electives.map((subject) => (
                  <li
                    key={subject}
                    className="flex items-center gap-2.5 font-display text-base font-normal text-ink"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-neutral-400" />
                    <span>{subject}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Requirement Footnote */}
      {stream.requirement.trim() === "" ? null : (
        <div className="mt-8 border-t border-border/60 pt-4">
          <p className="font-body text-xs text-ink-muted leading-relaxed">
            <strong className="font-medium text-ink">Requirement:</strong>{" "}
            {stream.requirement}
          </p>
        </div>
      )}
    </div>
  );
}

export function CollegeSubjects({ copy }: { readonly copy: SubjectsContent }) {
  const streams = copy.streams.filter((stream) => stream.label.trim() !== "");

  if (streams.length === 0) return null;

  return (
    <section className="gutter-x section-y" id="subjects">
      <div className="mx-auto max-w-page">
        <SectionHeader
          eyebrow={copy.label || undefined}
          title={copy.title || undefined}
          description={copy.description || undefined}
        />

        <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-16">
          {streams.map((stream, sIdx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
            <div key={`${sIdx}-${stream.label}`}>
              {/* Stream Title with Hairline */}
              <div className="mb-6 flex items-center gap-4 sm:mb-8">
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {stream.label}
                </h3>
                <span className="h-px flex-1 bg-border/80" />
              </div>

              {/* Pathway Cards */}
              <Reveal
                className="grid gap-6 sm:grid-cols-2 lg:gap-8"
                stagger={0.08}
                y={16}
              >
                {stream.pathways
                  .filter((pathway) => pathway.title.trim() !== "")
                  .map((pathway, pIdx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: ordered CMS list
                    <RevealItem key={`${pIdx}-${pathway.title}`}>
                      <PathwayCard
                        copy={copy}
                        pathway={pathway}
                        stream={stream}
                      />
                    </RevealItem>
                  ))}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
