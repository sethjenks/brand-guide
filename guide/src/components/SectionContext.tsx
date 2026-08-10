import { Text } from "@astryxdesign/core/Text";
import type { ReactNode } from "react";

type SectionContextProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Body context copy beside a clothesline title.
 */
export function SectionContext({ children, className }: SectionContextProps) {
  return (
    <Text
      color="primary"
      as="p"
      display="block"
      className={["measure", className].filter(Boolean).join(" ")}
    >
      {children}
    </Text>
  );
}
