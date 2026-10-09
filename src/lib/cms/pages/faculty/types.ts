import type { CmsImage } from "../../types";

// One key per admin sub-menu in WordPress (Faculty → Board of Directors, …).
// Keys and field names must match wordpress/snippets/04-faculty-page.php.

export type FacultyPerson = {
  readonly name: string;
  readonly title: string;
  readonly brief: string;
  readonly bio: string;
  readonly portrait: CmsImage;
};

export type FacultyGroupContent = {
  readonly title: string;
  readonly people: readonly FacultyPerson[];
};

export type FacultyPageContent = {
  readonly seo: {
    readonly title: string;
    readonly description: string;
  };
  readonly board: FacultyGroupContent;
  readonly management: FacultyGroupContent;
  readonly academics: FacultyGroupContent;
};
