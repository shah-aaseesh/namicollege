import { cache } from "react";
import { institution as bundled } from "@/lib/content/local/institution";
import type {
  Campus,
  EntityContactChannel,
  InstitutionProfile,
  SocialPlatform,
  SocialProfile,
} from "@/lib/content/types";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { type CmsLink, isExternalHref } from "../../types";
import { siteDefaults, siteShape } from "./defaults";
import type { SiteCampusContent, SitePageContent } from "./types";

export type * from "./types";

const SOCIAL_LABELS: Readonly<Record<SocialPlatform, string>> = {
  whatsapp: "WhatsApp",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
};

function isPlatform(value: string): value is SocialPlatform {
  return value in SOCIAL_LABELS;
}

function filled(items: readonly string[]): string[] {
  return items.map((item) => item.trim()).filter((item) => item !== "");
}

function links(items: readonly CmsLink[]): CmsLink[] {
  return items.filter(
    (link) => link.label.trim() !== "" && link.href.trim() !== "",
  );
}

function optional(value: string): string | undefined {
  return value.trim() === "" ? undefined : value.trim();
}

export const getSitePage = cache(async (): Promise<SitePageContent> => {
  const merged = mergeWithDefaults(
    siteDefaults,
    await fetchCmsPage("site"),
    siteShape,
  );
  return {
    ...merged,
    footer: {
      ...merged.footer,
      quickLinks: links(merged.footer.quickLinks),
      bottomLinks: links(merged.footer.bottomLinks),
    },
    menu: {
      ...merged.menu,
      items: merged.menu.items
        .filter((item) => item.label.trim() !== "" && item.href.trim() !== "")
        .map((item) => ({ ...item, children: links(item.children) })),
    },
    floating: {
      ...merged.floating,
      forms: links(merged.floating.forms),
      brochures: links(merged.floating.brochures),
    },
  };
});

function campusFrom(slug: string, edited: SiteCampusContent): Campus | null {
  const base = bundled.campuses.find((campus) => campus.slug === slug);
  if (base === undefined) return null;
  return {
    ...base,
    locality: edited.locality,
    city: edited.city,
    streetAddress: optional(edited.streetAddress) ?? null,
    hosts: filled(edited.hosts),
    mapUrl: optional(edited.mapUrl) ?? null,
    embedMapUrl: optional(edited.embedMapUrl) ?? null,
  };
}

function officeOf(
  phones: readonly string[],
  email: string,
  admissionsEmail: string,
  facebook: string,
): EntityContactChannel {
  return {
    phone: filled(phones).join(", "),
    email: email.trim(),
    admissionsEmail: optional(admissionsEmail),
    facebook: optional(facebook),
  };
}

/**
 * The institution profile every page reads (names, contact details, campuses),
 * with the "Site Settings" edits from WordPress applied. Content that is not
 * edited there (mission, values, …) still comes from the bundled profile.
 */
export const getSiteInstitution = cache(
  async (): Promise<InstitutionProfile> => {
    const { names, contact, offices, gokarneshwor, newBaneshwor } =
      await getSitePage();

    const socialProfiles: SocialProfile[] = contact.socials.flatMap((social) =>
      isPlatform(social.platform) && social.href.trim() !== ""
        ? [
            {
              platform: social.platform,
              label: SOCIAL_LABELS[social.platform],
              href: social.href.trim(),
              destination: "external" as const,
            },
          ]
        : [],
    );

    return {
      ...bundled,
      entities: {
        institute: {
          ...bundled.entities.institute,
          name: names.instituteName,
          shortName: names.instituteShortName,
          establishedYear: names.instituteYear || null,
        },
        college: {
          ...bundled.entities.college,
          name: names.collegeName,
          shortName: names.collegeShortName,
          establishedYear: names.collegeYear || null,
        },
        school: {
          ...bundled.entities.school,
          name: names.schoolName,
          shortName: names.schoolShortName,
          establishedYear: names.schoolYear || null,
        },
      },
      motto: names.motto,
      campuses: [
        campusFrom("gokarneshwor", gokarneshwor),
        campusFrom("new-baneshwor", newBaneshwor),
      ].filter((campus): campus is Campus => campus !== null),
      contact: {
        phones: filled(contact.phones),
        whatsapp: optional(contact.whatsapp),
        email: optional(contact.email) ?? null,
        websites: contact.websites
          .filter((site) => site.label.trim() !== "" && site.href.trim() !== "")
          .map((site) => ({
            label: site.label,
            href: site.href,
            destination: isExternalHref(site.href)
              ? ("external" as const)
              : ("internal" as const),
          })),
        socialProfiles,
        byEntity: {
          school: officeOf(
            offices.schoolPhones,
            offices.schoolEmail,
            offices.schoolAdmissionsEmail,
            offices.schoolFacebook,
          ),
          college: officeOf(
            offices.collegePhones,
            offices.collegeEmail,
            offices.collegeAdmissionsEmail,
            offices.collegeFacebook,
          ),
          institute: officeOf(
            offices.institutePhones,
            offices.instituteEmail,
            offices.instituteAdmissionsEmail,
            offices.instituteFacebook,
          ),
        },
      },
    };
  },
);
