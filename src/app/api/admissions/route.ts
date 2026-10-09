import { type NextRequest, NextResponse } from "next/server";
import { wordpressBase } from "@/lib/cms/client";
import { inquirySummary } from "@/lib/inquiry-pdf";
import { buildInquiryPdfOnServer } from "@/lib/inquiry-pdf-server";
import { clientIp, createRateLimit } from "@/lib/rate-limit";
import { admissionsSchema } from "@/lib/schema";

// Receives a submitted admissions form, checks it again, builds the same PDF
// the applicant downloads and hands both to the WordPress "NAMI Applications"
// snippet, which stores the application and emails the admissions office.

const MAX_BODY_BYTES = 200_000;

// Five applications per connection every ten minutes.
const tooMany = createRateLimit(5, 10 * 60 * 1000);

function fail(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: NextRequest) {
  const base = wordpressBase();
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (base === null || !secret) {
    return fail(
      503,
      "Online applications are not available right now. Please download your PDF and send it to the admissions office.",
    );
  }

  if (tooMany(clientIp(request.headers))) {
    return fail(
      429,
      "Too many applications were sent from this connection. Please wait a few minutes and try again.",
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail(413, "The application is too large to send.");
  }

  let body: { data?: unknown; website?: unknown };
  try {
    body = JSON.parse(raw) as typeof body;
  } catch {
    return fail(400, "The application could not be read. Please try again.");
  }

  // Hidden field that people never see; automated spam tends to fill it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, reference: null });
  }

  const parsed = admissionsSchema.safeParse(body.data);
  if (!parsed.success) {
    return fail(
      400,
      "Some answers still need attention. Check the form and submit again.",
    );
  }
  const data = parsed.data;
  const summary = inquirySummary(data);
  const pdf = await buildInquiryPdfOnServer(data);

  try {
    const response = await fetch(`${base}/?rest_route=/nami/v1/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-nami-secret": secret,
      },
      body: JSON.stringify({
        applicant: {
          name: `${data.firstName} ${data.surname}`.trim(),
          email: data.email,
          phone: data.telephone || data.guardians[0]?.contact || "",
        },
        program: data.program,
        proposedCourse: data.proposedCourse,
        institution: summary.institutionId,
        institutionName: summary.institutionName,
        courseLabel: summary.courseLabel,
        blocks: summary.blocks,
        data,
        pdf: Buffer.from(pdf).toString("base64"),
      }),
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });
    const result = (await response.json().catch(() => null)) as {
      reference?: unknown;
    } | null;
    if (!response.ok) {
      console.warn(`Application was not stored: HTTP ${response.status}`);
      return fail(
        502,
        "Your application could not be sent right now. Please download your PDF and try again later.",
      );
    }
    return NextResponse.json({
      ok: true,
      reference:
        typeof result?.reference === "string" ? result.reference : null,
    });
  } catch (error) {
    console.warn("Application could not reach WordPress", error);
    return fail(
      502,
      "Your application could not be sent right now. Please download your PDF and try again later.",
    );
  }
}
