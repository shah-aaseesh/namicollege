// Builds the inquiry PDF on the server, identical to the one the applicant
// downloads in the browser (src/lib/inquiry-pdf.ts reads the same colours from
// the page's CSS and fetches the same logo).

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { rgb } from "pdf-lib";
import type { AdmissionsFormData } from "@/lib/schema";
import {
  buildInquiryPdf,
  type InquiryPdfAssets,
  logoFromSvg,
  type Palette,
} from "./inquiry-pdf";

// Keep in step with the tokens in src/app/globals.css.
const BRAND_COLOURS = {
  brand: "#bd1b21", // --color-primary-700
  ink: "#212529", // --color-neutral-900
  muted: "#6c757d", // --color-neutral-600
  rule: "#dee2e6", // --color-neutral-300
} as const;

const LOGO_FILE = join(
  process.cwd(),
  "public",
  "logos",
  "brand",
  "nami-color.svg",
);

function colour(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return rgb(
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  );
}

const palette: Palette = {
  brand: colour(BRAND_COLOURS.brand),
  ink: colour(BRAND_COLOURS.ink),
  muted: colour(BRAND_COLOURS.muted),
  rule: colour(BRAND_COLOURS.rule),
};

let assets: Promise<InquiryPdfAssets> | null = null;

function loadAssets(): Promise<InquiryPdfAssets> {
  assets ??= readFile(LOGO_FILE, "utf8")
    .then((svg) => ({ palette, logo: logoFromSvg(svg) }))
    // Without the logo file the PDF is still complete, just unbranded.
    .catch(() => ({ palette, logo: null }));
  return assets;
}

export async function buildInquiryPdfOnServer(
  data: AdmissionsFormData,
): Promise<Uint8Array> {
  return buildInquiryPdf(data, await loadAssets());
}
