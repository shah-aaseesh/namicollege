// Site-wide settings: one key per admin sub-menu in WordPress
// (Site Settings → Names & Motto, Site Settings → Contact, …).
// Keys and field names must match wordpress/snippets/09-site-settings.php.

import type { CmsImage, CmsLink } from "../../types";

export type SiteCampusContent = {
  readonly locality: string;
  readonly city: string;
  readonly streetAddress: string;
  readonly hosts: readonly string[];
  readonly mapUrl: string;
  readonly embedMapUrl: string;
};

export type SitePageContent = {
  readonly names: {
    readonly instituteName: string;
    readonly instituteShortName: string;
    readonly instituteYear: number;
    readonly collegeName: string;
    readonly collegeShortName: string;
    readonly collegeYear: number;
    readonly schoolName: string;
    readonly schoolShortName: string;
    readonly schoolYear: number;
    readonly motto: string;
  };
  readonly contact: {
    readonly phones: readonly string[];
    readonly email: string;
    readonly whatsapp: string;
    readonly websites: readonly {
      readonly label: string;
      readonly href: string;
    }[];
    readonly socials: readonly {
      /** "facebook" | "instagram" | "linkedin" | "youtube" | "tiktok" | "whatsapp" */
      readonly platform: string;
      readonly href: string;
    }[];
  };
  readonly offices: {
    readonly schoolPhones: readonly string[];
    readonly schoolEmail: string;
    readonly schoolAdmissionsEmail: string;
    readonly schoolFacebook: string;
    readonly collegePhones: readonly string[];
    readonly collegeEmail: string;
    readonly collegeAdmissionsEmail: string;
    readonly collegeFacebook: string;
    readonly institutePhones: readonly string[];
    readonly instituteEmail: string;
    readonly instituteAdmissionsEmail: string;
    readonly instituteFacebook: string;
  };
  /** School, +2 and A Levels campus. */
  readonly gokarneshwor: SiteCampusContent;
  /** Bachelors campus. */
  readonly newBaneshwor: SiteCampusContent;
  readonly footer: {
    readonly about: string;
    readonly quickLinksTitle: string;
    readonly quickLinks: readonly {
      readonly label: string;
      readonly href: string;
    }[];
    readonly contactsTitle: string;
    readonly schoolTagline: string;
    readonly collegeTagline: string;
    readonly instituteTagline: string;
    readonly bottomLinks: readonly {
      readonly label: string;
      readonly href: string;
    }[];
  };
  readonly menu: {
    readonly items: readonly {
      readonly label: string;
      readonly href: string;
      readonly descriptor: string;
      readonly children: readonly CmsLink[];
    }[];
    readonly panelText: string;
    readonly panelImage: CmsImage;
    readonly panelButton: CmsLink;
  };
  readonly enroll: {
    readonly helpText: string;
    readonly schoolHeading: string;
    readonly schoolDescription: string;
    readonly schoolApply: CmsLink;
    readonly schoolBrochure: CmsLink;
    readonly collegeHeading: string;
    readonly collegeDescription: string;
    readonly collegeApply: CmsLink;
    readonly collegeBrochure: CmsLink;
    readonly instituteHeading: string;
    readonly instituteDescription: string;
    readonly instituteApply: CmsLink;
    readonly instituteBrochure: CmsLink;
  };
  readonly newsletter: {
    readonly heading: string;
    readonly qr: CmsImage;
    readonly namePlaceholder: string;
    readonly emailPlaceholder: string;
    readonly buttonLabel: string;
  };
  readonly contactBlock: {
    readonly label: string;
    readonly title: string;
    readonly addressLabel: string;
    readonly phoneLabel: string;
    readonly emailLabel: string;
    readonly followLabel: string;
  };
  readonly floating: {
    readonly downloadLabel: string;
    readonly formsLabel: string;
    readonly forms: readonly CmsLink[];
    readonly brochuresLabel: string;
    readonly brochures: readonly CmsLink[];
    readonly whatsappLabel: string;
    readonly whatsappMessage: string;
  };
};
