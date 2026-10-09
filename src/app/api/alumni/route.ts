import { type NextRequest, NextResponse } from "next/server";
import { wordpressBase } from "@/lib/cms/client";
import { clientIp, createRateLimit } from "@/lib/rate-limit";
import { alumniStorySchema } from "@/lib/schema";

// Receives a graduate's "Share your story" submission from the Alumni page,
// checks it again and hands it to the WordPress "NAMI Alumni" snippet, which
// saves it as a draft story (Alumni → All Stories) and emails the alumni office.

const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
// Base64 is a third larger than the file, plus the answers.
const MAX_BODY_BYTES = Math.ceil(MAX_PHOTO_BYTES * 1.4) + 50_000;

// Three stories per connection every ten minutes.
const tooMany = createRateLimit(3, 10 * 60 * 1000);

const IMAGE_SIGNATURES: Readonly<Record<string, (bytes: Buffer) => boolean>> = {
  "image/jpeg": (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  "image/png": (b) =>
    b
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  "image/webp": (b) =>
    b.subarray(0, 4).toString("latin1") === "RIFF" &&
    b.subarray(8, 12).toString("latin1") === "WEBP",
};

function fail(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: NextRequest) {
  const base = wordpressBase();
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (base === null || !secret) {
    return fail(503, "Stories cannot be sent from this page right now.");
  }

  if (tooMany(clientIp(request.headers))) {
    return fail(
      429,
      "Too many stories were sent from this connection. Please wait a few minutes and try again.",
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail(413, "The photo is too large. Please choose one under 4 MB.");
  }

  let body: { data?: unknown; photo?: unknown; website?: unknown };
  try {
    body = JSON.parse(raw) as typeof body;
  } catch {
    return fail(400, "Your story could not be read. Please try again.");
  }

  // Hidden field that people never see; automated spam tends to fill it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = alumniStorySchema.safeParse({
    ...(typeof body.data === "object" && body.data !== null ? body.data : {}),
    photo: undefined,
  });
  if (!parsed.success) {
    return fail(
      400,
      "Some answers still need attention. Check the form and send again.",
    );
  }

  let photo: { name: string; type: string; data: string } | null = null;
  if (body.photo !== null && body.photo !== undefined) {
    const candidate = body.photo as {
      name?: unknown;
      type?: unknown;
      data?: unknown;
    };
    const type = typeof candidate.type === "string" ? candidate.type : "";
    const data = typeof candidate.data === "string" ? candidate.data : "";
    const bytes = Buffer.from(data, "base64");
    const matches = IMAGE_SIGNATURES[type];
    if (
      !matches ||
      bytes.length === 0 ||
      bytes.length > MAX_PHOTO_BYTES ||
      !matches(bytes)
    ) {
      return fail(
        400,
        "The photo must be a JPG, PNG or WebP image under 4 MB.",
      );
    }
    photo = {
      name:
        typeof candidate.name === "string"
          ? candidate.name.slice(0, 120)
          : "photo",
      type,
      data,
    };
  }

  const { photo: _photo, consent: _consent, ...answers } = parsed.data;

  try {
    const response = await fetch(
      `${base}/?rest_route=/nami/v1/alumni-submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-nami-secret": secret,
        },
        body: JSON.stringify({ ...answers, photo }),
        signal: AbortSignal.timeout(30_000),
        cache: "no-store",
      },
    );
    if (!response.ok) {
      console.warn(`Alumni story was not stored: HTTP ${response.status}`);
      return fail(502, "Your story could not be sent right now.");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.warn("Alumni story could not reach WordPress", error);
    return fail(502, "Your story could not be sent right now.");
  }
}
