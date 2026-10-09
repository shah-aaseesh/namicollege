// Site-wide settings exactly as the site ships today. Used when WordPress is
// unavailable, as the type schema for CMS data, and exported into the
// WordPress snippet by `npm run cms:defaults`.

import { SITE_NAV_ITEMS } from "@/components/layout/site-nav-sections";
import type { Campus } from "@/lib/content";
import { institution } from "@/lib/content/local/institution";
import type { SiteCampusContent, SitePageContent } from "./types";

const { contact, entities } = institution;

function campusOf(slug: string): SiteCampusContent {
  const campus: Campus | undefined = institution.campuses.find(
    (item) => item.slug === slug,
  );
  return {
    locality: campus?.locality ?? "",
    city: campus?.city ?? "",
    streetAddress: campus?.streetAddress ?? "",
    hosts: [...(campus?.hosts ?? [])],
    mapUrl: campus?.mapUrl ?? "",
    embedMapUrl: campus?.embedMapUrl ?? "",
  };
}

function phonesOf(phone: string): string[] {
  return phone.split(", ");
}

export const siteDefaults: SitePageContent = {
  names: {
    instituteName: entities.institute.name,
    instituteShortName: entities.institute.shortName,
    instituteYear: entities.institute.establishedYear ?? 0,
    collegeName: entities.college.name,
    collegeShortName: entities.college.shortName,
    collegeYear: entities.college.establishedYear ?? 0,
    schoolName: entities.school.name,
    schoolShortName: entities.school.shortName,
    schoolYear: entities.school.establishedYear ?? 0,
    motto: institution.motto,
  },
  contact: {
    phones: [...contact.phones],
    email: contact.email ?? "",
    whatsapp: contact.whatsapp ?? "",
    websites: contact.websites.map((site) => ({
      label: site.label,
      href: site.href,
    })),
    socials: contact.socialProfiles.map((profile) => ({
      platform: profile.platform,
      href: profile.href,
    })),
  },
  offices: {
    schoolPhones: phonesOf(contact.byEntity.school.phone),
    schoolEmail: contact.byEntity.school.email,
    schoolAdmissionsEmail: contact.byEntity.school.admissionsEmail ?? "",
    schoolFacebook: contact.byEntity.school.facebook ?? "",
    collegePhones: phonesOf(contact.byEntity.college.phone),
    collegeEmail: contact.byEntity.college.email,
    collegeAdmissionsEmail: contact.byEntity.college.admissionsEmail ?? "",
    collegeFacebook: contact.byEntity.college.facebook ?? "",
    institutePhones: phonesOf(contact.byEntity.institute.phone),
    instituteEmail: contact.byEntity.institute.email,
    instituteAdmissionsEmail: contact.byEntity.institute.admissionsEmail ?? "",
    instituteFacebook: contact.byEntity.institute.facebook ?? "",
  },
  gokarneshwor: campusOf("gokarneshwor"),
  newBaneshwor: campusOf("new-baneshwor"),
  footer: {
    about:
      "Naaya Aayam Multi-Disciplinary Institute (NAMI) is an educational entity established in 2012, committed to advancing human capital through world-class education, global standards and holistic development while empowering individuals with the knowledge, skills and leadership capabilities to create meaningful impact locally and globally.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Admissions", href: "/admissions" },
      { label: "Documents & Downloads", href: "/documents" },
      { label: "Student Life", href: "/student-life" },
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Alumni", href: "/alumni" },
      { label: "Notices & Events", href: "/notices" },
    ],
    contactsTitle: "Institutions & Contacts",
    schoolTagline: "School & +2 NEB",
    collegeTagline: "Cambridge Assessment GCE A Levels",
    instituteTagline: "Undergraduate & Postgraduate Programmes",
    bottomLinks: [
      { label: "Official Documents", href: "/documents" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  menu: {
    items: SITE_NAV_ITEMS.map((item) => ({
      label: item.label,
      href: item.href,
      descriptor: item.descriptor ?? "",
      children: (item.children ?? []).map((child) => ({
        label: child.label,
        href: child.href,
      })),
    })),
    panelText:
      "NAMI provides world-class education with state-of-the-art facilities, empowering students to become future leaders and innovators.",
    panelImage: {
      src: "/sections/nami/campus-library.jpg",
      alt: "College Library",
      width: 1280,
      height: 853,
    },
    panelButton: { label: "Apply Now", href: "/admissions" },
  },
  enroll: {
    helpText: "Need help? Call Admissions at",
    schoolHeading: "Ready to Enroll?",
    schoolDescription:
      "We are here to guide you through every step of the admissions process. If you have any questions or need assistance, our admissions team is ready to help.",
    schoolApply: { label: "Apply Now", href: "/admissions" },
    schoolBrochure: { label: "Brochure", href: "/admissions" },
    collegeHeading: "Ready to Enroll?",
    collegeDescription:
      "We are here to guide you through every step of the Cambridge A-Level admissions process. If you have any questions, our admissions desk is here to support you.",
    collegeApply: { label: "Apply Now", href: "/admissions" },
    collegeBrochure: { label: "Prospectus", href: "/admissions" },
    instituteHeading: "Ready to Enroll?",
    instituteDescription:
      "We are here to guide you through every step of university admissions. If you have any questions about Northampton UK degree programmes, our advisors are ready to assist.",
    instituteApply: { label: "Apply Now", href: "/admissions" },
    instituteBrochure: { label: "Prospectus", href: "/admissions" },
  },
  newsletter: {
    heading: "Subscribe to our Newsletter",
    qr: {
      src: "/sections/misc/newsletter-qr.png",
      alt: "Scan to subscribe to NAMI Newsletter",
      width: 710,
      height: 710,
    },
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    buttonLabel: "Subscribe",
  },
  contactBlock: {
    label: "Get in Touch with NAMI",
    title: "Contact & Location",
    addressLabel: "Campus Address",
    phoneLabel: "Phone Numbers",
    emailLabel: "Email Inquiries",
    followLabel: "Follow",
  },
  floating: {
    downloadLabel: "Download Forms & Brochures",
    formsLabel: "Application Forms",
    forms: [
      {
        label: "Primary School",
        href: "/documents/Nami International School (Primary) Admission form.pdf",
      },
      {
        label: "+2 NEB",
        href: "/documents/Application_form_nami_international_school_plus_2.pdf",
      },
      {
        label: "A-Levels",
        href: "/documents/NAMI_College_A_Level_Application_Form.pdf",
      },
      {
        label: "Bachelors",
        href: "/documents/Nami_applicationform_bachelors.pdf",
      },
    ],
    brochuresLabel: "Brochures",
    brochures: [
      { label: "Primary School", href: "/institutions/school" },
      { label: "+2 NEB", href: "/institutions/school" },
      { label: "A-Levels", href: "/institutions/a-levels" },
      { label: "Bachelors", href: "/documents/Nami book.pdf" },
    ],
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage:
      "Hello NAMI, I would like to enquire about admissions, programmes, and campus visits.",
  },
};

/** Like the defaults, but every menu item has a sample sub-link, so sub-links
 * added in WordPress to an item that had none are still accepted. */
export const siteShape: SitePageContent = {
  ...siteDefaults,
  menu: {
    ...siteDefaults.menu,
    items: siteDefaults.menu.items.map((item) => ({
      ...item,
      children: [{ label: "", href: "" }],
    })),
  },
};
