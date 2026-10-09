import { type NextRequest, NextResponse } from "next/server";
import { wordpressBase } from "@/lib/cms/client";
import { clientIp, createRateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/schema";

// Receives a message from the Contact page form, checks it again and hands it
// to the WordPress "NAMI Contact" snippet, which stores it under Contact →
// Messages and emails the office.

const MAX_BODY_BYTES = 20_000;

// Five messages per connection every ten minutes.
const tooMany = createRateLimit(5, 10 * 60 * 1000);

function fail(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: NextRequest) {
  const base = wordpressBase();
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (base === null || !secret) {
    return fail(503, "Messages cannot be sent from this page right now.");
  }

  if (tooMany(clientIp(request.headers))) {
    return fail(
      429,
      "Too many messages were sent from this connection. Please wait a few minutes and try again.",
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail(413, "The message is too long to send.");
  }

  let body: { data?: unknown; website?: unknown };
  try {
    body = JSON.parse(raw) as typeof body;
  } catch {
    return fail(400, "The message could not be read. Please try again.");
  }

  // Hidden field that people never see; automated spam tends to fill it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body.data);
  if (!parsed.success) {
    return fail(
      400,
      "Some answers still need attention. Check the form and send again.",
    );
  }

  try {
    const response = await fetch(`${base}/?rest_route=/nami/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-nami-secret": secret,
      },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn(`Contact message was not stored: HTTP ${response.status}`);
      return fail(502, "Your message could not be sent right now.");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.warn("Contact message could not reach WordPress", error);
    return fail(502, "Your message could not be sent right now.");
  }
}
