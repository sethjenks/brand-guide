import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { HStack } from "@astryxdesign/core/HStack";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties, ReactNode } from "react";
import "@/styles/flourish/dont-grid-strike.css";

type StruckStageProps = {
  children: ReactNode;
  /** When true, overlays the shared don’t-strike. Defaults to true. */
  struck?: boolean;
  ratio?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Bordered specimen stage with optional `.dont-grid-strike` overlay.
 */
export function StruckStage({
  children,
  struck = true,
  ratio = 4 / 3,
  className,
  style,
}: StruckStageProps) {
  return (
    <HStack
      hAlign="center"
      vAlign="center"
      width="100%"
      className={className}
      style={{
        border: "1px solid var(--color-border)",
        ...style,
      }}
    >
      <AspectRatio ratio={ratio} fit="center">
        {children}
      </AspectRatio>
      {struck ? (
        <VStack gap={0} className="dont-grid-strike" aria-hidden="true" />
      ) : null}
    </HStack>
  );
}
