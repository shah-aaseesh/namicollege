import type { Metadata, MetadataRoute } from "next";
import { institutionPath } from "@/lib/content/institutions";

const FALLBACK_SITE_ORIGIN = "https://nami.edu.np";

export const siteOrigin = (
  process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN
).replace(/\/+$/, "");

export const siteUrl = new URL(siteOrigin);

export const siteConfig = {
  name: "NAMI",
  legalName: "Naaya Aayam Multi-Disciplinary Institute",
  title: "NAMI — Transform Yourself to Lead the World",
  titleTemplate: "%s | NAMI",
  description:
    "NAMI, Kathmandu, Estd. 2012 — NAMI International School (10+2 NEB), NAMI College (Cambridge A Level), and Naaya Aayam Multi-Disciplinary Institute (degrees).",
  locale: "en_US",
  themeColor: "#bd1b21",
} as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

export type SiteRoute = {
  path: string;
  changeFrequency: NonNullable<SitemapEntry["changeFrequency"]>;
  priority: number;
};

// Club and course pages are added by src/app/sitemap.ts from the CMS lists.
export const siteRoutes: readonly SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/history", changeFrequency: "monthly", priority: 0.8 },
  {
    path: institutionPath("school"),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: institutionPath("college"),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: institutionPath("bachelors"),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  { path: "/admissions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/faculty", changeFrequency: "monthly", priority: 0.7 },
  { path: "/student-life", changeFrequency: "monthly", priority: 0.7 },
  { path: "/notices", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
  { path: "/alumni", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
];

export type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageMetadataInput = {
  path: string;
  title?: string;
  description?: string;
  image?: SocialImage;
};

export function absoluteUrl(path: string): string {
  const basePath = siteUrl.pathname.replace(/\/+$/, "");
  const suffix = path === "/" ? "" : path;
  return new URL(`${basePath}${suffix}` || "/", siteUrl).toString();
}

export function createMetadata({
  path,
  title,
  description = siteConfig.description,
  image,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = title ?? siteConfig.title;
  const images = image ? [image] : undefined;

  return {
    metadataBase: siteUrl,
    title: title ?? {
      default: siteConfig.title,
      template: siteConfig.titleTemplate,
    },
    description,
    applicationName: siteConfig.name,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: canonical,
      title: socialTitle,
      description,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
