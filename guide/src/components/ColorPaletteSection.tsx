import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { Clothesline } from "@/components/Clothesline";

type ColorPaletteSectionProps = {
  id: string;
  title: string;
  /** Short rationale beside the label. */
  context?: string;
  /**
   * Palette body — typically `ColorTiles` for the swatch row.
   */
  children: ReactNode;
  className?: string;
};

/**
 * Color chapter leaf: clothesline (label + context) above color tiles.
 */
export function ColorPaletteSection({
  id,
  title,
  context,
  children,
  className,
}: ColorPaletteSectionProps) {
  return (
    <VStack
      as="section"
      id={id}
      gap={4}
      className={["block subsection color-palette-section", className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="color-palette-clothesline"
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            {title}
          </Heading>
        }
      >
        {context ? (
          <Text
            color="primary"
            as="p"
            display="block"
            className="measure color-palette-context"
          >
            {context}
          </Text>
        ) : null}
      </Clothesline>

      {children}
    </VStack>
  );
}
