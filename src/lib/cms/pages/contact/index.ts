import { cache } from "react";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { contactDefaults } from "./defaults";
import type { ContactPageContent } from "./types";

export type * from "./types";

export const getContactPage = cache(async (): Promise<ContactPageContent> => {
  return mergeWithDefaults(contactDefaults, await fetchCmsPage("contact"));
});
