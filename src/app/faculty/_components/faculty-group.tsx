import { H2 } from "@/components/ui/typography";
import type { FacultyPerson } from "@/lib/cms/pages/faculty";
import { cn } from "@/lib/utils";
import { FacultyCard } from "./faculty-card";
import { FacultyGroupTrack } from "./faculty-group-track";

export function FacultyGroup({
  id,
  isBoard = false,
  isFirstGroup = false,
  people,
  title,
}: {
  readonly id?: string;
  /** The board never scrolls sideways and splits 7 members into rows of 4 + 3. */
  readonly isBoard?: boolean;
  readonly isFirstGroup?: boolean;
  readonly people: readonly FacultyPerson[];
  readonly title: string;
}) {
  const leaders = people.filter((person) => person.name.trim() !== "");
  const isScrollable = leaders.length > 4 && !isBoard;
  const isSolo = leaders.length === 1;

  if (leaders.length === 0) return null;

  const heading = (
    <div className="border-b border-border/80 pb-3 mb-6 sm:mb-8">
      <H2
        className={cn(
          "font-display font-normal text-ink tracking-tight",
          isFirstGroup
            ? "text-2xl sm:text-3xl lg:text-4xl"
            : "text-xl sm:text-2xl lg:text-3xl",
        )}
      >
        {title}
      </H2>
    </div>
  );

  // 4 in a row (Row 1) and 3 in a row (Row 2) for Board of Directors
  if (isBoard && leaders.length === 7) {
    const row1 = leaders.slice(0, 4);
    const row2 = leaders.slice(4, 7);

    return (
      <section className="gutter-x scroll-mt-24" id={id}>
        <div className="mx-auto max-w-page">
          {heading}

          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Row 1: 4 Directors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
              {row1.map((leader, index) => (
                <FacultyCard
                  className="w-full"
                  index={index}
                  isFirstGroup={isFirstGroup}
                  // biome-ignore lint/suspicious/noArrayIndexKey: people are an ordered CMS list
                  key={`${index}-${leader.name}`}
                  leader={leader}
                />
              ))}
            </div>

            {/* Row 2: 3 Directors (Centered) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
              {row2.map((leader, index) => (
                <FacultyCard
                  className="w-full"
                  index={index + 4}
                  isFirstGroup={isFirstGroup}
                  // biome-ignore lint/suspicious/noArrayIndexKey: people are an ordered CMS list
                  key={`${index + 4}-${leader.name}`}
                  leader={leader}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const cards = leaders.map((leader, index) => (
    <FacultyCard
      className="w-full"
      index={index}
      isFirstGroup={isFirstGroup}
      isScrollable={isScrollable}
      isSolo={isSolo}
      // biome-ignore lint/suspicious/noArrayIndexKey: people are an ordered CMS list
      key={`${index}-${leader.name}`}
      leader={leader}
    />
  ));

  return (
    <section className="gutter-x scroll-mt-24" id={id}>
      {isScrollable ? (
        <FacultyGroupTrack heading={heading}>{cards}</FacultyGroupTrack>
      ) : (
        <div className="mx-auto max-w-page">
          {heading}

          <div
            className={cn(
              "grid gap-6 sm:gap-8",
              leaders.length === 1
                ? "max-w-md mx-auto grid-cols-1"
                : leaders.length === 2
                  ? "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
                  : leaders.length === 3
                    ? "max-w-5xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            )}
          >
            {cards}
          </div>
        </div>
      )}
    </section>
  );
}
