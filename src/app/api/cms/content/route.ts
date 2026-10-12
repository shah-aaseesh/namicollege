import { type NextRequest, NextResponse } from "next/server";
import { CODE_COLLECTIONS, CODE_PAGES } from "@/lib/cms/code-content";
import { codeHash } from "@/lib/cms/code-hash";
import { secretMatches } from "@/lib/cms/secret";

// Read by the WordPress "NAMI CMS Core" snippet (1.3+): the content bundled in
// this deployment, so WordPress shows code changes without re-pasting snippets.
// `hashes` match the `x-nami-code` header the site sends with every CMS read.

function hashesOf(content: Readonly<Record<string, object>>) {
  const hashes: Record<string, string> = {};
  for (const [slug, value] of Object.entries(content)) {
    hashes[slug] = codeHash(value);
  }
  return hashes;
}

export function GET(request: NextRequest) {
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

  return NextResponse.json(
    {
      pages: CODE_PAGES,
      collections: CODE_COLLECTIONS,
      hashes: {
        pages: hashesOf(CODE_PAGES),
        collections: hashesOf(CODE_COLLECTIONS),
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
