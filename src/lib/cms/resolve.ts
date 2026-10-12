// "Newest change wins" between WordPress edits and the content bundled in code.
//
// WordPress stores each edit together with its `base`: the code's content at the
// moment the editor saved. Comparing three versions tells who changed what:
//   - the edit still equals its base  → WordPress never changed it: use the code
//   - the code still equals that base → the code never changed it: use the edit
//   - both changed                    → the code changed after the edit (the base
//     was the code at edit time), so the code is newer, field by field.
// The same rules run in WordPress (nami_cms_resolve in 01-nami-cms-core.php) so
// its screens show what the website shows.

type Tree = Record<string, unknown> | readonly unknown[];

function isTree(value: unknown): value is Tree {
  return typeof value === "object" && value !== null;
}

/** Matches PHP's view of a scalar after a JSON round trip. */
function scalarKey(value: unknown): string {
  if (value === null || value === undefined || value === false) return "";
  if (value === true) return "1";
  return String(value);
}

/** Deep equality that treats lists and objects alike, as PHP arrays do. */
export function sameContent(a: unknown, b: unknown): boolean {
  if (isTree(a) || isTree(b)) {
    if (!isTree(a) || !isTree(b)) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    const recordB = b as Record<string, unknown>;
    return keysA.every(
      (key) =>
        Object.hasOwn(recordB, key) &&
        sameContent((a as Record<string, unknown>)[key], recordB[key]),
    );
  }
  return scalarKey(a) === scalarKey(b);
}

export function resolveEdit(
  base: unknown,
  edited: unknown,
  code: unknown,
): unknown {
  if (code === undefined || code === null) return edited;
  if (edited === undefined || edited === null || sameContent(edited, base)) {
    return code;
  }
  if (sameContent(code, base)) return edited;

  if (Array.isArray(edited) && Array.isArray(code) && Array.isArray(base)) {
    // Item by item only while all three lists line up; otherwise the newer list wins.
    if (edited.length !== base.length || code.length !== base.length) {
      return code;
    }
    return code.map((item, index) =>
      resolveEdit(base[index], edited[index], item),
    );
  }

  if (
    isTree(edited) &&
    isTree(code) &&
    !Array.isArray(edited) &&
    !Array.isArray(code)
  ) {
    const baseRecord =
      isTree(base) && !Array.isArray(base)
        ? (base as Record<string, unknown>)
        : {};
    const editedRecord = edited as Record<string, unknown>;
    const codeRecord = code as Record<string, unknown>;
    const merged: Record<string, unknown> = {};
    for (const key of new Set([
      ...Object.keys(editedRecord),
      ...Object.keys(codeRecord),
    ])) {
      merged[key] = resolveEdit(
        baseRecord[key],
        editedRecord[key],
        codeRecord[key],
      );
    }
    return merged;
  }

  return code;
}
