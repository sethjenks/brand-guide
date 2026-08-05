"use client";

import { VStack } from "@astryxdesign/core/VStack";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import type { ReactNode } from "react";

type GuideHeroProps = {
  /** Starter setup hero: content at top, no tall min-height. */
  setup?: boolean;
  children: ReactNode;
};

/**
 * Brand / setup hero shell. Layout via VStack props; typography classes stay on children.
 */
export function GuideHero({ setup = false, children }: GuideHeroProps) {
  const isNarrow = useMediaQuery("(max-width: 720px)");

  return (
    <VStack
      as="header"
      id="top"
      gap={0}
      width="100%"
      justify={setup ? "start" : "end"}
      minHeight={setup || isNarrow ? undefined : "min(70vh, 36rem)"}
      style={{
        position: "relative",
        paddingBlockStart: setup
          ? isNarrow
            ? "var(--space-4)"
            : "var(--space-5)"
          : isNarrow
            ? "var(--space-4)"
            : "var(--space-6)",
        paddingBlockEnd: "var(--space-5)",
        marginBottom: "var(--space-5)",
      }}
    >
      {children}
    </VStack>
  );
}
