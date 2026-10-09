import { format, isValid, parseISO } from "date-fns";
import {
  PDFDocument,
  type PDFFont,
  type PDFPage,
  type RGB,
  rgb,
  StandardFonts,
} from "pdf-lib";
import {
  findInquiryCourse,
  findInstitution,
  type InquiryCourse,
} from "@/lib/content/institutions";
import type { AdmissionsFormData } from "@/lib/schema";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LABEL_WIDTH = 150;
const VALUE_WIDTH = CONTENT_WIDTH - LABEL_WIDTH;
const LOGO_SIZE = 46;
const EMPTY = "—";

export type Row = { readonly label: string; readonly value: string };

export type Block =
  | {
      readonly kind: "fields";
      readonly heading: string;
      readonly rows: readonly Row[];
    }
  | {
      readonly kind: "groups";
      readonly heading: string;
      readonly entryLabel: string;
      readonly groups: readonly (readonly Row[])[];
    }
  | {
      readonly kind: "prose";
      readonly heading: string;
      readonly value: string;
    };

export type Palette = {
  readonly brand: RGB;
  readonly ink: RGB;
  readonly muted: RGB;
  readonly rule: RGB;
};

export type PdfLogo = {
  readonly paths: readonly string[];
  readonly scale: number;
};

/**
 * Colours and logo for the masthead. The browser reads them from the page;
 * the server (src/lib/inquiry-pdf-server.ts) passes them in so both produce
 * the same PDF.
 */
export type InquiryPdfAssets = {
  readonly palette: Palette;
  readonly logo: PdfLogo | null;
};

type Fonts = { readonly regular: PDFFont; readonly bold: PDFFont };

// pdf-lib's standard fonts are WinAnsi-only, so anything outside Latin-1 cannot be encoded
// and would throw mid-render; replaced rather than crashing until a Unicode font is chosen.
const WIN_ANSI_EXTRA = new Set([
  0x2013, 0x2014, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x20ac,
]);

function sanitize(value: string): string {
  let out = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const encodable =
      (code >= 0x20 && code <= 0x7e) ||
      (code >= 0xa0 && code <= 0xff) ||
      WIN_ANSI_EXTRA.has(code);
    out += encodable ? char : "?";
  }
  return out;
}

function hexToRgb(value: string, fallback: RGB): RGB {
  const hex = value.trim().replace("#", "");
  if (hex.length !== 6) return fallback;
  const int = Number.parseInt(hex, 16);
  if (Number.isNaN(int)) return fallback;
  return rgb(
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  );
}

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: RGB) =>
    hexToRgb(styles.getPropertyValue(name), fallback);
  const black = rgb(0, 0, 0);
  return {
    brand: token("--color-primary-700", black),
    ink: token("--color-neutral-900", black),
    muted: token("--color-neutral-600", black),
    rule: token("--color-neutral-300", black),
  };
}

function circleToPath(cx: number, cy: number, r: number): string {
  const k = r * 0.5522847498;
  return [
    `M ${cx - r} ${cy}`,
    `C ${cx - r} ${cy - k} ${cx - k} ${cy - r} ${cx} ${cy - r}`,
    `C ${cx + k} ${cy - r} ${cx + r} ${cy - k} ${cx + r} ${cy}`,
    `C ${cx + r} ${cy + k} ${cx + k} ${cy + r} ${cx} ${cy + r}`,
    `C ${cx - k} ${cy + r} ${cx - r} ${cy + k} ${cx - r} ${cy}`,
    "Z",
  ].join(" ");
}

function attrOf(tag: string, name: string): number {
  const match = new RegExp(`\\s${name}="([^"]*)"`).exec(tag);
  return Number.parseFloat(match?.[1] ?? "0") || 0;
}

/** Turns the logo SVG's paths, rects and circles into PDF paths. */
export function logoFromSvg(svg: string): PdfLogo | null {
  const root = /<svg\b[^>]*>/.exec(svg)?.[0] ?? "";
  const viewBox = (/\sviewBox="([^"]*)"/.exec(root)?.[1] ?? "")
    .split(/[\s,]+/)
    .map(Number);
  const boxWidth = viewBox[2];
  if (!boxWidth) return null;

  const paths: string[] = [];
  for (const [tag, name] of svg.matchAll(/<(path|rect|circle)\b[^>]*>/g)) {
    if (name === "path") {
      const d = /\sd="([^"]*)"/.exec(tag)?.[1];
      if (d) paths.push(d);
      continue;
    }
    if (name === "rect") {
      const x = attrOf(tag, "x");
      const y = attrOf(tag, "y");
      paths.push(
        `M ${x} ${y} H ${x + attrOf(tag, "width")} V ${y + attrOf(tag, "height")} H ${x} Z`,
      );
      continue;
    }
    paths.push(
      circleToPath(attrOf(tag, "cx"), attrOf(tag, "cy"), attrOf(tag, "r")),
    );
  }
  return paths.length > 0 ? { paths, scale: LOGO_SIZE / boxWidth } : null;
}

async function loadLogo(): Promise<PdfLogo | null> {
  try {
    const response = await fetch("/logos/brand/nami-color.svg");
    if (!response.ok) return null;
    return logoFromSvg(await response.text());
  } catch {
    return null;
  }
}

function wrapText(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = word;
      while (font.widthOfTextAtSize(line, size) > maxWidth && line.length > 1) {
        let cut = line.length - 1;
        while (
          cut > 1 &&
          font.widthOfTextAtSize(line.slice(0, cut), size) > maxWidth
        ) {
          cut -= 1;
        }
        lines.push(line.slice(0, cut));
        line = line.slice(cut);
      }
    }
    lines.push(line);
  }
  return lines;
}

function formatDate(value: string | null): string {
  if (!value) return EMPTY;
  const parsed = parseISO(value);
  return isValid(parsed) ? format(parsed, "d MMMM yyyy") : EMPTY;
}

function text(value: string): string {
  const trimmed = value.trim();
  return trimmed ? sanitize(trimmed) : EMPTY;
}

function isBlankRowSet(rows: readonly Row[]): boolean {
  return rows.every((row) => row.value === EMPTY);
}

function buildBlocks(
  data: AdmissionsFormData,
  course: InquiryCourse,
): readonly Block[] {
  const isSchoolPrimary = course.id === "school-primary";
  const courseRows: Row[] = [
    { label: "Course applied for", value: sanitize(course.label) },
  ];
  if (data.proposedCourse.trim()) {
    courseRows.push({
      label: isSchoolPrimary ? "Grade applied for" : "Proposed course",
      value: text(data.proposedCourse),
    });
  }

  const blocks: Block[] = [
    {
      kind: "fields",
      heading: "Course Details",
      rows: courseRows,
    },
    {
      kind: "fields",
      heading: "Student Details",
      rows: [
        { label: "First name", value: text(data.firstName) },
        { label: "Surname", value: text(data.surname) },
        { label: "Gender", value: text(data.gender) },
        { label: "Date of birth", value: formatDate(data.dob) },
        ...(isSchoolPrimary
          ? [{ label: "Age", value: text(data.age) }]
          : [
              { label: "Telephone number", value: text(data.telephone) },
              { label: "Email address", value: text(data.email) },
            ]),
        { label: "Nationality", value: text(data.nationality) },
        {
          label: "Special needs or medical conditions",
          value: data.specialNeeds ? "Yes" : "No",
        },
      ],
    },
  ];

  const guardianGroups = data.guardians
    .map((guardian) => {
      const fullName = [guardian.firstName, guardian.lastName]
        .map((s) => s.trim())
        .filter(Boolean)
        .join(" ");
      const relationshipLabel =
        guardian.relationship === "Others" && guardian.otherRelationship.trim()
          ? `Others (${guardian.otherRelationship.trim()})`
          : guardian.relationship;

      return [
        { label: "Guardian's name", value: text(fullName) },
        {
          label: "Relationship to student",
          value: text(relationshipLabel),
        },
        { label: "Contact number", value: text(guardian.contact) },
        { label: "Email address", value: text(guardian.email) },
      ];
    })
    .filter((rows) => !isBlankRowSet(rows));

  if (guardianGroups.length === 1 && guardianGroups[0]) {
    blocks.push({
      kind: "fields",
      heading: "Guardian Details",
      rows: guardianGroups[0],
    });
  } else if (guardianGroups.length > 1) {
    blocks.push({
      kind: "groups",
      heading: "Guardian Details",
      entryLabel: "Guardian",
      groups: guardianGroups,
    });
  }

  if (course.asksEducationHistory) {
    blocks.push({
      kind: "groups",
      heading: course.historyHeading,
      entryLabel: "Institution",
      groups: data.qualifications
        .map((entry) => [
          { label: "Previous institution", value: text(entry.place) },
          { label: "Awards / grades", value: text(entry.awards) },
          { label: "Graduation year", value: text(entry.graduationYear) },
        ])
        .filter((rows) => !isBlankRowSet(rows)),
    });
  }

  if (course.asksPendingQualifications) {
    blocks.push({
      kind: "prose",
      heading: "Qualifications Pending",
      value: text(data.pendingQualifications),
    });
  }

  if (course.asksEmploymentHistory) {
    blocks.push({
      kind: "groups",
      heading: "Employment History",
      entryLabel: "Employer",
      groups: data.employment
        .map((entry) => [
          { label: "Employer name & address", value: text(entry.employer) },
          { label: "Dates (from - to)", value: text(entry.dates) },
          { label: "Position held", value: text(entry.position) },
          { label: "Description of duties", value: text(entry.duties) },
        ])
        .filter((rows) => !isBlankRowSet(rows)),
    });
  }

  blocks.push(
    {
      kind: "prose",
      heading: "Personal Statement",
      value: text(data.personalStatement),
    },
    {
      kind: "fields",
      heading: "Additional Information",
      rows: [
        {
          label: "How did you hear of NAMI?",
          value:
            data.howDidYouHear.length > 0
              ? sanitize(data.howDidYouHear.join(", "))
              : EMPTY,
        },
      ],
    },
    {
      kind: "fields",
      heading: "Declaration",
      rows: [
        { label: "Student signature", value: text(data.signature) },
        { label: "Date", value: formatDate(data.signatureDate) },
      ],
    },
  );

  return blocks;
}

class Layout {
  private page: PDFPage;
  private y = PAGE_HEIGHT - MARGIN;

  constructor(
    private readonly doc: PDFDocument,
    private readonly fonts: Fonts,
    private readonly palette: Palette,
  ) {
    this.page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  }

  get currentPage(): PDFPage {
    return this.page;
  }

  get cursor(): number {
    return this.y;
  }

  move(amount: number) {
    this.y -= amount;
  }

  reserve(height: number) {
    if (this.y - height >= MARGIN + 24) return;
    this.page = this.doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    this.y = PAGE_HEIGHT - MARGIN;
  }

  line(color: RGB) {
    this.page.drawRectangle({
      x: MARGIN,
      y: this.y,
      width: CONTENT_WIDTH,
      height: 0.75,
      color,
    });
  }

  write(
    value: string,
    options: { x: number; size: number; color: RGB; bold?: boolean },
  ) {
    this.page.drawText(value, {
      x: options.x,
      y: this.y,
      size: options.size,
      font: options.bold ? this.fonts.bold : this.fonts.regular,
      color: options.color,
    });
  }

  paginate() {
    const pages = this.doc.getPages();
    pages.forEach((page, index) => {
      const label = `Page ${index + 1} of ${pages.length}`;
      page.drawText(label, {
        x: PAGE_WIDTH - MARGIN - this.fonts.regular.widthOfTextAtSize(label, 8),
        y: MARGIN - 12,
        size: 8,
        font: this.fonts.regular,
        color: this.palette.muted,
      });
    });
  }
}

function drawHeading(layout: Layout, heading: string, palette: Palette) {
  layout.reserve(46);
  layout.move(26);
  layout.write(heading.toUpperCase(), {
    x: MARGIN,
    size: 9,
    color: palette.brand,
    bold: true,
  });
  layout.move(6);
  layout.line(palette.rule);
  layout.move(14);
}

function drawRow(
  layout: Layout,
  row: Row,
  palette: Palette,
  fonts: Fonts,
  indent = 0,
) {
  const valueX = MARGIN + indent + LABEL_WIDTH;
  const lines = wrapText(row.value, fonts.regular, 10, VALUE_WIDTH - indent);
  layout.reserve(lines.length * 13 + 4);
  layout.write(row.label, {
    x: MARGIN + indent,
    size: 9,
    color: palette.muted,
  });
  for (const [index, line] of lines.entries()) {
    if (index > 0) layout.move(13);
    layout.write(line, { x: valueX, size: 10, color: palette.ink });
  }
  layout.move(17);
}

function drawProse(
  layout: Layout,
  value: string,
  palette: Palette,
  fonts: Fonts,
) {
  const lines = wrapText(value, fonts.regular, 10, CONTENT_WIDTH);
  for (const line of lines) {
    layout.reserve(14);
    layout.write(line, { x: MARGIN, size: 10, color: palette.ink });
    layout.move(14);
  }
}

function drawMasthead(
  layout: Layout,
  institutionName: string,
  palette: Palette,
  logo: PdfLogo | null,
) {
  const top = layout.cursor;
  let titleX = MARGIN;

  if (logo) {
    for (const path of logo.paths) {
      layout.currentPage.drawSvgPath(path, {
        x: MARGIN,
        y: top,
        scale: logo.scale,
        color: palette.brand,
      });
    }
    titleX = MARGIN + LOGO_SIZE + 14;
  }

  layout.move(18);
  layout.write(sanitize(institutionName), {
    x: titleX,
    size: 15,
    color: palette.brand,
    bold: true,
  });
  layout.move(16);
  layout.write("Inquiry Form", { x: titleX, size: 10, color: palette.ink });
  layout.move(13);
  layout.write(`Prepared ${format(new Date(), "d MMMM yyyy")}`, {
    x: titleX,
    size: 8,
    color: palette.muted,
  });
  layout.move(logo ? 20 : 14);
  layout.line(palette.rule);
}

/**
 * The labelled answers exactly as the PDF lays them out. The admissions inbox
 * in WordPress shows these so staff read the same wording as the PDF.
 */
export function inquirySummary(data: AdmissionsFormData): {
  readonly institutionId: string;
  readonly institutionName: string;
  readonly courseLabel: string;
  readonly blocks: readonly Block[];
} {
  const course = findInquiryCourse(data.program);
  if (!course) throw new Error("Choose a course before submitting the form.");
  return {
    institutionId: course.institutionId,
    institutionName:
      findInstitution(course.institutionId)?.title ?? course.label,
    courseLabel: course.label,
    blocks: buildBlocks(data, course),
  };
}

export async function buildInquiryPdf(
  data: AdmissionsFormData,
  assets?: InquiryPdfAssets,
): Promise<Uint8Array> {
  const course = findInquiryCourse(data.program);
  if (!course) throw new Error("Choose a course before downloading the form.");

  const institutionName =
    findInstitution(course.institutionId)?.title ?? course.label;
  const palette = assets?.palette ?? readPalette();
  const logo = assets === undefined ? await loadLogo() : assets.logo;
  const doc = await PDFDocument.create();
  const fonts: Fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  doc.setTitle(`${institutionName} Inquiry Form`);

  const layout = new Layout(doc, fonts, palette);
  drawMasthead(layout, institutionName, palette, logo);

  for (const block of buildBlocks(data, course)) {
    drawHeading(layout, block.heading, palette);

    if (block.kind === "fields") {
      for (const row of block.rows) drawRow(layout, row, palette, fonts);
      continue;
    }

    if (block.kind === "prose") {
      drawProse(layout, block.value, palette, fonts);
      continue;
    }

    if (block.groups.length === 0) {
      drawProse(layout, "No entries provided.", palette, fonts);
      continue;
    }

    for (const [index, rows] of block.groups.entries()) {
      layout.reserve(30);
      layout.write(`${block.entryLabel} ${index + 1}`, {
        x: MARGIN,
        size: 9,
        color: palette.ink,
        bold: true,
      });
      layout.move(16);
      for (const row of rows) drawRow(layout, row, palette, fonts, 12);
      layout.move(6);
    }
  }

  layout.paginate();
  return doc.save();
}

export async function downloadInquiryPdf(
  data: AdmissionsFormData,
): Promise<void> {
  const bytes = await buildInquiryPdf(data);
  const url = URL.createObjectURL(
    new Blob([bytes as BlobPart], { type: "application/pdf" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "nami-inquiry-form.pdf";
  anchor.click();
  URL.revokeObjectURL(url);
}
