import { HStack } from "@astryxdesign/core/HStack";
import { Section } from "@astryxdesign/core/Section";
import type { ReactNode } from "react";

type AssetStageProps = {
  /** Centered stage content (wordmark, collage, clearspace diagram, etc.). */
  children: ReactNode;
  /** Accessible name for the stage region. */
  "aria-label"?: string;
  className?: string;
  /** Minimum height of the stage; numbers are px. */
  minHeight?: number;
};

/**
 * Full-width bordered stage for logo / visual assets below a clothesline.
 */
export function AssetStage({
  children,
  "aria-label": ariaLabel = "Asset",
  className,
  minHeight = 420,
}: AssetStageProps) {
  return (
    <Section
      variant="muted"
      padding={8}
      maxWidth="none"
      minHeight={minHeight}
      aria-label={ariaLabel}
      className={["asset-stage", className].filter(Boolean).join(" ")}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: 0,
      }}
    >
      <HStack
        hAlign="center"
        vAlign="center"
        width="100%"
        minHeight={minHeight - 64}
        className="asset-stage-inner"
      >
        {children}
      </HStack>
    </Section>
  );
}
