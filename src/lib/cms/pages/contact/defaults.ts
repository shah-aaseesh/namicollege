// The Contact page as it ships today. Used when WordPress is unavailable, as
// the type schema for CMS data, and exported into the WordPress snippet by
// `npm run cms:defaults`.

import { contactCopy } from "@/app/contact/_components/contact-copy";
import type { ContactPageContent } from "./types";

const { masthead, form, campuses } = contactCopy;

export const contactDefaults: ContactPageContent = {
  seo: {
    title: contactCopy.meta.title,
    description: contactCopy.meta.description,
  },
  masthead: {
    label: masthead.eyebrow,
    title: masthead.heading,
    description: masthead.standfirst,
    emailLabel: masthead.emailLabel,
    phoneLabel: masthead.phoneLabel,
    socialLabel: masthead.socialLabel,
  },
  form: {
    label: form.heading,
    title: form.eyebrow,
    // The old text promised an email draft and "nothing stored"; messages
    // are now delivered to the office, so the text says so.
    description:
      "Fill this in and your message goes straight to our office, and we will get back to you. You can also write to {email}.",
    nameLabel: form.labels.name,
    emailLabel: form.labels.email,
    phoneLabel: form.labels.phone,
    topicLabel: form.labels.topic,
    messageLabel: form.labels.message,
    topicPlaceholder: form.topicPlaceholder,
    topicGeneral: form.topicGeneral,
    topicOther: form.topicOther,
    submitLabel: form.submit,
    directPrompt: form.directPrompt,
    successTitle: "Thank you! Your message has been sent.",
    successText:
      "We have received your inquiry and our team will get back to you shortly.",
  },
  locations: {
    label: campuses.heading,
    title: campuses.eyebrow,
    description: campuses.standfirst,
    hostsLabel: campuses.hostsLabel,
    mapNote: "Map centred on the {area} area.",
  },
};
