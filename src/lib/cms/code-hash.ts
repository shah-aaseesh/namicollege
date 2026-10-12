import { createHash } from "node:crypto";

// A short fingerprint of content bundled in code. The website sends it to
// WordPress with every read (header `x-nami-code`); when it differs from what
// WordPress last fetched from /api/cms/content, WordPress fetches again.

const hashes = new WeakMap<object, string>();

export function codeHash(content: object): string {
  let hash = hashes.get(content);
  if (hash === undefined) {
    hash = createHash("sha256")
      .update(JSON.stringify(content))
      .digest("hex")
      .slice(0, 16);
    hashes.set(content, hash);
  }
  return hash;
}
