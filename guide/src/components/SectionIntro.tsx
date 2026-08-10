import { Text } from "@astryxdesign/core/Text";
import type { ReactNode } from "react";

type SectionIntroProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Large semibold intro copy for clothesline content columns.
 */
export function SectionIntro({ children, className }: SectionIntroProps) {
  return (
    <Text
      type="large"
      weight="semibold"
      color="primary"
      as="p"
      display="block"
      className={["measure", className].filter(Boolean).join(" ")}
    >
      {children}
    </Text>
  );
}
