import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";

type LabeledFieldGap = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;

type LabeledFieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
  /** Label text style; defaults to bold primary. */
  labelType?: "bold" | "label";
  gap?: LabeledFieldGap;
};

/**
 * Bold (or label) heading above a body stack — shared by Audience, Guardrails, Do/Don’t.
 */
export function LabeledField({
  label,
  children,
  className,
  labelType = "bold",
  gap = 2,
}: LabeledFieldProps) {
  return (
    <VStack gap={gap} className={className}>
      {labelType === "label" ? (
        <Text
          type="label"
          weight="semibold"
          color="primary"
          display="block"
          className="clothesline-title"
        >
          {label}
        </Text>
      ) : (
        <Text weight="bold" color="primary" display="block">
          {label}
        </Text>
      )}
      {children}
    </VStack>
  );
}
