import { Display, Eyebrow, Standfirst } from "@/components/ui/typography";
import type { NoticesPageContent } from "@/lib/cms/pages/notices";

export function NoticesMasthead({
  copy,
}: {
  readonly copy: NoticesPageContent["masthead"];
}) {
  return (
    <section className="gutter-x section-y-masthead">
      <div className="mx-auto max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{copy.label}</Eyebrow>
            <Display className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {copy.title}
            </Display>
          </div>
          <div className="mt-5 max-w-xl text-neutral-700 lg:col-span-5 lg:mt-0">
            <Standfirst>{copy.description}</Standfirst>
          </div>
        </div>
      </div>
    </section>
  );
}
