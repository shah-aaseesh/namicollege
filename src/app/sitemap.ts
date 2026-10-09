import type { MetadataRoute } from "next";
import { getBachelorsProgrammes } from "@/lib/cms/pages/bachelors";
import { getALevelsClubs, getSchoolClubs } from "@/lib/cms/pages/clubs";
import { institutionPath } from "@/lib/content/institutions";
import { absoluteUrl, type SiteRoute, siteRoutes } from "@/lib/seo";

function childRoute(path: string): SiteRoute {
  return { path, changeFrequency: "monthly", priority: 0.8 };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [schoolClubs, aLevelsClubs, programmes] = await Promise.all([
    getSchoolClubs(),
    getALevelsClubs(),
    getBachelorsProgrammes(),
  ]);

  // Pages whose list is edited in WordPress follow their parent page.
  const children: Record<string, readonly SiteRoute[]> = {
    [institutionPath("school")]: schoolClubs.map((club) =>
      childRoute(`/institutions/school/clubs/${club.slug}`),
    ),
    [institutionPath("college")]: aLevelsClubs.map((club) =>
      childRoute(`/institutions/a-levels/clubs/${club.slug}`),
    ),
    [institutionPath("bachelors")]: programmes.map((programme) =>
      childRoute(`/institutions/bachelors/${programme.key}`),
    ),
  };

  return siteRoutes
    .flatMap((route) => [route, ...(children[route.path] ?? [])])
    .map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency,
      priority,
    }));
}
