// Testimonial carousels appear on several CMS pages with the same fields.

import {
  contentId,
  type SectionCopy,
  slug,
  type Testimonial,
} from "@/lib/content";
import type { Testimonial as LocalTestimonial } from "@/lib/content/types";
import { type CmsImage, cmsImage, hasImage } from "./types";

export type CmsTestimonials = {
  readonly label: string;
  readonly title: string;
  readonly emptyState: string;
  readonly items: readonly {
    readonly quote: string;
    readonly name: string;
    readonly role: string;
    readonly portrait: CmsImage;
  }[];
};

export function testimonialItemsFrom(
  items: readonly LocalTestimonial[],
): CmsTestimonials["items"] {
  return items.map((item) => ({
    quote: item.quote,
    name: item.name,
    role: item.programme ?? "",
    portrait: cmsImage(item.portrait),
  }));
}

/** Converts CMS testimonials into the props <Testimonials> expects. */
export function testimonialsProps(
  section: CmsTestimonials & { readonly description?: string },
  idPrefix: string,
): { items: readonly Testimonial[]; section: SectionCopy } {
  const items = section.items
    .filter((item) => item.quote.trim() !== "" && item.name.trim() !== "")
    .map((item, index) => ({
      id: contentId(`${idPrefix}-testimonial-${index + 1}`),
      slug: slug(`${idPrefix}-testimonial-${index + 1}`),
      quote: item.quote,
      name: item.name,
      programme: item.role.trim() === "" ? null : item.role,
      institution: null,
      graduatedYear: null,
      portrait: hasImage(item.portrait) ? item.portrait : null,
    }));

  return {
    items,
    // <Testimonials> shows `heading` in the small label bar and `eyebrow` as the title.
    section: {
      navLabel: "Testimonials",
      eyebrow: section.title,
      heading: section.label,
      standfirst: section.description?.trim() ? section.description : null,
      cta: null,
      emptyState: section.emptyState.trim() === "" ? null : section.emptyState,
    },
  };
}
