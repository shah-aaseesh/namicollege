import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { cmsTag } from "@/lib/cms/client";

// Called by the WordPress "NAMI CMS Core" snippet after an editor saves a page.

const PAGE_PATTERN = /^[a-z0-9-]{1,64}$/;

function secretMatches(given: string | null, expected: string): boolean {
  if (given === null) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const expected = process.env.CMS_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { message: "CMS_REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }

  if (!secretMatches(request.headers.get("x-nami-secret"), expected)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let page: unknown;
  try {
    page = ((await request.json()) as { page?: unknown })?.page;
  } catch {
    page = undefined;
  }

  if (typeof page !== "string" || !PAGE_PATTERN.test(page)) {
    return NextResponse.json({ message: "Invalid page" }, { status: 400 });
  }

  // Expire immediately so the editor sees the change on the next reload.
  revalidateTag(cmsTag(page), { expire: 0 });

  return NextResponse.json({ revalidated: true, page, now: Date.now() });
}
