import type { Metadata } from "next";
import { Suspense } from "react";

import { getGalleryData, getGalleryPage } from "@/lib/cms/pages/gallery";
import { createMetadata } from "@/lib/seo";
import { GalleryMoments } from "./_components/gallery-moments";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getGalleryPage();
  return createMetadata({
    path: "/gallery",
    title: seo.title,
    description: seo.description,
  });
}

export default async function GalleryPage() {
  const [page, gallery] = await Promise.all([
    getGalleryPage(),
    getGalleryData(),
  ]);

  return (
    <Suspense fallback={null}>
      <GalleryMoments
        bubbles={gallery.bubbles}
        copy={page.heading}
        moments={gallery.moments}
        tabs={gallery.tabs}
      />
    </Suspense>
  );
}
