// Overlays untrusted CMS JSON onto a page's bundled defaults. The defaults act
// as the schema: a CMS value is used only when its type matches the default's,
// so a missing or malformed field can never break a page.
//
// List items are validated against the first default item. When a default list
// is empty (so there is no item to copy the shape from), pass `shape`: a copy of
// the defaults whose lists hold one sample item each.

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeValue(
  fallback: unknown,
  incoming: unknown,
  shape: unknown,
): unknown {
  if (incoming === undefined || incoming === null) return fallback;

  if (typeof fallback === "string") {
    return typeof incoming === "string" ? incoming : fallback;
  }

  if (typeof fallback === "number") {
    const value =
      typeof incoming === "string" && incoming.trim() !== ""
        ? Number(incoming)
        : incoming;
    return typeof value === "number" && Number.isFinite(value)
      ? value
      : fallback;
  }

  if (typeof fallback === "boolean") {
    if (typeof incoming === "boolean") return incoming;
    if (incoming === 1 || incoming === "1") return true;
    if (incoming === 0 || incoming === "0" || incoming === "") return false;
    return fallback;
  }

  if (Array.isArray(fallback)) {
    if (!Array.isArray(incoming)) return fallback;
    const template =
      (Array.isArray(shape) ? shape[0] : undefined) ?? fallback[0];
    // Without any sample item there is nothing to validate against.
    if (template === undefined) return fallback;
    return incoming.map((item, index) =>
      mergeValue(fallback[index] ?? template, item, template),
    );
  }

  if (isRecord(fallback)) {
    if (!isRecord(incoming)) return fallback;
    const shapeRecord = isRecord(shape) ? shape : fallback;
    const merged: Record<string, unknown> = {};
    for (const key of Object.keys(fallback)) {
      merged[key] = mergeValue(
        fallback[key],
        incoming[key],
        shapeRecord[key] ?? fallback[key],
      );
    }
    return merged;
  }

  return fallback;
}

export function mergeWithDefaults<T>(
  defaults: T,
  incoming: unknown,
  shape: T = defaults,
): T {
  return mergeValue(defaults, incoming, shape) as T;
}
