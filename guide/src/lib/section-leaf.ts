import type { CSSProperties } from "react";

/**
 * Vertical rhythm for guide section leaves (former .block.subsection).
 * Uses brand --section-gap (beyond Astryx gap prop scale).
 */
export const sectionLeafStyle = {
  width: "100%",
  maxWidth: "none",
  marginTop: "var(--space-5)",
  marginBottom: "var(--section-gap)",
} as const satisfies CSSProperties;

/** Chapter body region (former .act). */
export const chapterSectionStyle = {
  position: "relative",
  paddingBlock: "var(--section-gap)",
} as const satisfies CSSProperties;
