import { timingSafeEqual } from "node:crypto";

/** Compares the `x-nami-secret` header with CMS_REVALIDATE_SECRET in constant time. */
export function secretMatches(given: string | null, expected: string): boolean {
  if (given === null) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
