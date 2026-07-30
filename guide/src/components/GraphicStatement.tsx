import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";

type GraphicStatementProps = {
  /** Hash target for guide nav (e.g. strategy-introduction). */
  id: string;
  /** Accessible name; defaults to Introduction. */
  label?: string;
  /** Large statement copy. */
  children: ReactNode;
  /** Optional meta below the statement (links, agent labels). */
  footer?: ReactNode;
};

/**
 * Full-bleed typographic statement used for chapter introductions
 * and other large graphic moments across the guide.
 */
export function GraphicStatement({
  id,
  label = "Introduction",
  children,
  footer,
}: GraphicStatementProps) {
  return (
    <Section
      variant="transparent"
      padding={8}
      maxWidth="none"
      className="graphic-statement"
      aria-label={label}
      id={id}
    >
      <VStack gap={4}>
        <Text
          type="display-2"
          weight="bold"
          color="primary"
          as="p"
          display="block"
          className="graphic-statement-text"
        >
          {children}
        </Text>
        {footer ? <VStack gap={0} className="measure">{footer}</VStack> : null}
      </VStack>
    </Section>
  );
}
