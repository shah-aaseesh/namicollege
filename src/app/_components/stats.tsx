import { Counter } from "@/components/motion/counter";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import type { HomeStats } from "@/lib/cms/pages/home";
import { hasImage } from "@/lib/cms/types";
import { CollegeLifeBand } from "./college-life-band";

export function Stats({ stats }: { stats: HomeStats }) {
  const rows = stats.items.filter((item) => item.label.trim() !== "");
  const poster = hasImage(stats.poster) ? stats.poster : null;

  if (rows.length === 0) return null;

  return (
    <section className="field-brand gutter-x section-y-compact" id="stats">
      <div className="mx-auto max-w-page">
        <SectionHeader
          description={stats.description || undefined}
          eyebrow={stats.label || undefined}
          layout="stacked"
          title={stats.title || undefined}
        />

        <div
          className={
            poster === null
              ? "mt-6 sm:mt-8"
              : "mt-6 sm:mt-8 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10 lg:items-stretch"
          }
        >
          <div
            className={
              poster === null ? "" : "lg:col-span-7 flex flex-col justify-start"
            }
          >
            <Reveal
              className={
                poster === null
                  ? "grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3"
              }
              stagger={0.06}
            >
              {rows.map((stat, index) => (
                <RevealItem
                  // biome-ignore lint/suspicious/noArrayIndexKey: stats are an ordered CMS list
                  key={`${index}-${stat.label}`}
                  className="flex flex-col justify-between rounded-2xl bg-white/6 p-4 sm:p-5 lg:p-6 border border-white/12 backdrop-blur-xs transition-all hover:bg-white/10 hover:border-white/20 shadow-xs"
                >
                  <p className="font-display text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl">
                    <Counter suffix={stat.suffix} value={stat.value} />
                  </p>
                  <p className="mt-2.5 font-body text-xs sm:text-sm text-white/85 leading-snug">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </Reveal>
          </div>

          {poster === null ? null : (
            <div className="lg:col-span-5 flex items-center justify-center">
              <CollegeLifeBand poster={poster} youtubeId={stats.youtubeId} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
