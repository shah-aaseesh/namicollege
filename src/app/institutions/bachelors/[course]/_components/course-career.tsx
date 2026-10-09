import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import type { BachelorsProgramme } from "../../_components/bachelors-copy";

export function CourseCareer({
  course,
}: {
  readonly course: BachelorsProgramme;
}) {
  if (course.careerSummary === null && course.careerSectors.length === 0) {
    return null;
  }

  return (
    <section className="gutter-x section-y bg-accent text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-white/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-black/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-page space-y-6">
        <div>
          <SplitText
            as="h2"
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-balance text-white"
          >
            {course.careersLabel}
          </SplitText>
        </div>

        <Reveal className="space-y-8 pt-1">
          {course.careerSummary === null ? null : (
            <p className="text-base sm:text-lg leading-relaxed text-white/95 font-body">
              {course.careerSummary}
            </p>
          )}

          {course.careerSectors.length === 0 ? null : (
            <div className="space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-white/80">
                Key Industry Sectors & Roles
              </span>
              <ul className="flex flex-wrap gap-2 sm:gap-2.5">
                {course.careerSectors.map((sector, index) => (
                  <li
                    className="rounded-full border border-white/30 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 font-body text-xs sm:text-sm font-medium text-white shadow-2xs transition-all duration-200 hover:bg-white hover:text-accent"
                    // biome-ignore lint/suspicious/noArrayIndexKey: sectors are an ordered CMS list
                    key={index}
                  >
                    {sector}
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
