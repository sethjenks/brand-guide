import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties, ReactNode } from "react";

export type ScaleStackStep = {
  id: string;
  /** Display width in px for this step. */
  width: number;
  /**
   * Optional per-step asset (e.g. size-specific PNGs).
   * Falls back to the stack-level `src` when omitted.
   */
  src?: string;
  alt?: string;
  /** Optional size caption under the specimen. */
  label?: string;
};

type ScaleStackProps = {
  steps: readonly ScaleStackStep[];
  /**
   * Shared asset scaled to each step width (SVG / single PNG).
   * Ignored for steps that set their own `src`.
   */
  src?: string;
  alt?: string;
  /**
   * Fallback when a step has no image — typically a text wordmark.
   * Rendered at a font size derived from the step width.
   */
  children?: ReactNode;
  "aria-label"?: string;
  className?: string;
};

/**
 * Left-aligned cascade of logo sizes — same asset scaled, or separate images per step.
 */
export function ScaleStack({
  steps,
  src,
  alt = "",
  children,
  "aria-label": ariaLabel = "Logo scaling",
  className,
}: ScaleStackProps) {
  if (steps.length === 0) return null;

  return (
    <VStack
      gap={5}
      hAlign="start"
      width="100%"
      aria-label={ariaLabel}
      className={["scale-stack", className].filter(Boolean).join(" ")}
    >
      {steps.map((step) => {
        const imageSrc = step.src ?? src;
        const style = {
          "--scale-stack-width": `${step.width}px`,
        } as CSSProperties;

        return (
          <VStack
            key={step.id}
            gap={1}
            hAlign="start"
            className="scale-stack-step"
            style={style}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={step.alt ?? alt}
                width={step.width}
                className="scale-stack-media"
              />
            ) : (
              <VStack
                gap={0}
                hAlign="start"
                className="scale-stack-fallback"
                aria-hidden={children == null}
              >
                {children}
              </VStack>
            )}
            {step.label ? (
              <Text type="supporting" color="secondary" display="block">
                {step.label}
              </Text>
            ) : null}
          </VStack>
        );
      })}
    </VStack>
  );
}
