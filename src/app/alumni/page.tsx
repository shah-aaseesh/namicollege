import type { Metadata } from "next";

import { getAlumniData, getAlumniPage } from "@/lib/cms/pages/alumni";
import { createMetadata } from "@/lib/seo";
import { AlumniEmployers } from "./_components/alumni-employers";
import { AlumniMasthead } from "./_components/alumni-masthead";
import { AlumniMetrics } from "./_components/alumni-metrics";
import { AlumniNetworkCta } from "./_components/alumni-network-cta";
import { AlumniStories } from "./_components/alumni-stories";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAlumniPage();
  return createMetadata({
    path: "/alumni",
    title: seo.title,
    description: seo.description,
  });
}

export default async function AlumniPage() {
  const { page, tabs, stories, employers } = await getAlumniData();

  return (
    <>
      <AlumniMasthead
        copy={{
          eyebrow: page.masthead.label,
          heading: page.masthead.title,
          standfirst: page.masthead.description,
          cta: page.masthead.buttonLabel,
          image: page.masthead.image,
        }}
      />
      <AlumniStories
        copy={{
          eyebrow: page.stories.label,
          heading: page.stories.title,
          standfirst: page.stories.description,
        }}
        stories={stories}
        tabs={tabs}
      />
      <AlumniMetrics
        copy={{
          eyebrow: page.metrics.label,
          heading: page.metrics.title,
          standfirst: page.metrics.description,
          items: page.metrics.items.filter((item) => item.stat.trim() !== ""),
        }}
      />
      <AlumniEmployers
        employers={employers}
        section={{
          navLabel: "Employers",
          eyebrow: page.employers.label,
          heading: page.employers.title,
          standfirst: page.employers.description,
          cta: null,
          emptyState: null,
        }}
      />
      <AlumniNetworkCta
        copy={{
          eyebrow: page.connect.label,
          heading: page.connect.title,
          standfirst: page.connect.description,
          email: page.connect.email,
          buttonLabel: page.connect.buttonLabel,
        }}
      />
    </>
  );
}
