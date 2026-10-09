// A small in-memory limiter for the public form routes. Best effort only:
// counts reset when the server restarts and are not shared between instances.

export function createRateLimit(maxPerWindow: number, windowMs: number) {
  const recent = new Map<string, number[]>();

  /** Records a request from `key` and says whether it is over the limit. */
  return function tooMany(key: string): boolean {
    const now = Date.now();
    const times = (recent.get(key) ?? []).filter(
      (time) => now - time < windowMs,
    );
    times.push(now);
    recent.set(key, times);
    if (recent.size > 5000) recent.clear();
    return times.length > maxPerWindow;
  };
}

/** The visitor's address as seen through the hosting proxy. */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
