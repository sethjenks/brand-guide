"use client";

import { VStack } from "@astryxdesign/core/VStack";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import type { CSSProperties, ReactNode } from "react";

type GuideColumnProps = {
  children: ReactNode;
};

/**
 * Main content column: brand padding + --guide-pad-inline for chapter-header bleed.
 * Responsive pads via useMediaQuery (replaces .guide media rules).
 */
export function GuideColumn({ children }: GuideColumnProps) {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 720px)");

  const padInline = isMobile ? "var(--space-4)" : "var(--space-6)";
  const padBlock =
    isMobile
      ? "var(--space-4)"
      : isTablet
        ? "var(--space-5)"
        : undefined;

  const style: CSSProperties = {
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box",
    // Chapter-header full-bleed reads this inherited custom property.
    ["--guide-pad-inline" as string]: padInline,
    paddingInline: padInline,
    ...(padBlock != null
      ? { paddingBlock: padBlock }
      : {
          paddingBlockStart: "var(--space-6)",
          paddingBlockEnd: "var(--space-7)",
        }),
  };

  return (
    <VStack width="100%" gap={0} style={style}>
      {children}
    </VStack>
  );
}
