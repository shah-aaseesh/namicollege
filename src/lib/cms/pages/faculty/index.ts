import { cache } from "react";
import { fetchCmsPage } from "../../client";
import { mergeWithDefaults } from "../../merge";
import { facultyDefaults } from "./defaults";
import type { FacultyPageContent } from "./types";

export type * from "./types";

export const getFacultyPage = cache(
  async (): Promise<FacultyPageContent> =>
    mergeWithDefaults(facultyDefaults, await fetchCmsPage("faculty")),
);
