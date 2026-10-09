import type { Metadata } from "next";

import { P } from "@/components/ui/typography";
import { getNoticesPage } from "@/lib/cms/pages/notices";
import { content } from "@/lib/content";
import {
  INSTITUTION_PARAM,
  parseInstitutionFilter,
} from "@/lib/institution-filter";
import { createMetadata } from "@/lib/seo";
import { NoticesMasthead } from "./_components/notices-masthead";
import { UpdatesArchive } from "./_components/updates-archive";
import {
  parseUpdateCategoryFilter,
  parseUpdateKindFilter,
  UPDATE_CATEGORY_PARAM,
  UPDATE_KIND_PARAM,
} from "./_components/updates-filter";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getNoticesPage();
  return createMetadata({
    path: "/notices",
    title: seo.title,
    description: seo.description,
  });
}

export default async function NoticesPage({ searchParams }: PageProps) {
  const [items, institution, query, page] = await Promise.all([
    content.getUpdates(),
    content.getInstitution(),
    searchParams,
    getNoticesPage(),
  ]);

  return (
    <>
      <NoticesMasthead copy={page.masthead} />
      {items.length === 0 ? (
        <section className="gutter-x section-y border-t border-border">
          <div className="mx-auto max-w-page">
            <P className="max-w-xl">{page.empty.text}</P>
          </div>
        </section>
      ) : (
        <UpdatesArchive
          entities={institution.entities}
          initialCategory={parseUpdateCategoryFilter(
            query[UPDATE_CATEGORY_PARAM],
          )}
          initialInstitution={parseInstitutionFilter(query[INSTITUTION_PARAM])}
          initialKind={parseUpdateKindFilter(query[UPDATE_KIND_PARAM])}
          items={items}
          today={new Date().toISOString().slice(0, 10)}
        />
      )}
    </>
  );
}
