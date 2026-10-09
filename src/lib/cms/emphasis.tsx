import { Fragment, type ReactNode } from "react";

/**
 * Renders CMS text where editors wrap words in **double asterisks** to make
 * them bold. Everything else is plain text, so no HTML from the CMS is trusted.
 */
export function withEmphasis(
  text: string,
  strongClassName?: string,
): ReactNode {
  const parts = text.split("**");
  // An unmatched ** is shown as typed rather than bolding the rest of the text.
  if (parts.length % 2 === 0) return text;

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: parts of one fixed string
      <strong className={strongClassName} key={index}>
        {part}
      </strong>
    ) : (
      // biome-ignore lint/suspicious/noArrayIndexKey: parts of one fixed string
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
