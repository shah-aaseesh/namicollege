// The News & Notices page as it ships today, the empty notice used to
// validate WordPress data, and the bundled notices offered for import
// (exported into the WordPress snippet by `npm run cms:defaults`).

import { noticesCopy } from "@/app/notices/_components/notices-copy";
import { updates } from "@/lib/content/local/updates";
import { cmsImage, EMPTY_IMAGE } from "../../types";
import type { NoticeFields, NoticesPageContent } from "./types";

export const noticesDefaults: NoticesPageContent = {
  seo: {
    title: noticesCopy.meta.title,
    description: noticesCopy.meta.description,
  },
  masthead: {
    label: noticesCopy.masthead.eyebrow,
    title: noticesCopy.masthead.heading,
    description: noticesCopy.masthead.standfirst,
  },
  empty: {
    text: noticesCopy.emptyArchive,
  },
};

export const noticeTemplate: NoticeFields = {
  kind: "notice",
  category: "general",
  institution: "",
  excerpt: "",
  happensAt: "",
  venue: "",
  buttonLabel: "",
  buttonLink: "",
  image: EMPTY_IMAGE,
};

/**
 * The notices bundled with the site, for the one-click import in WordPress.
 * Links to the old website ("legacy") were never shown, so they are left out.
 */
export const noticeImports = updates.map((update) => {
  const link =
    update.link !== null && update.link.destination !== "legacy"
      ? update.link
      : null;
  const fields: NoticeFields = {
    kind: update.kind,
    category: update.category,
    institution: update.institution ?? "",
    excerpt: update.excerpt,
    happensAt: update.happensAt ?? "",
    venue: update.venue ?? "",
    buttonLabel: link?.label ?? "",
    buttonLink: link?.href ?? "",
    image: cmsImage(update.image),
  };
  return { title: update.title, date: update.publishedAt, fields };
});
