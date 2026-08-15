import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties } from "react";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ClotheslineRow } from "@/components/ClotheslineRow";
import type { TypeWeightItem } from "@/components/TypeWeightsSection";
import type { SectionStatus } from "@/lib/section-status-ui";
import "@/styles/flourish/type-specimens.css";

/** A–Z then 0–9 → 4×9 glyph grid. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

type TypeSpecimenSectionProps = {
  id: string;
  title?: string;
  context: string;
  /** Weight cuts to render as glyph grids (typically designated brand weights). */
  items: readonly TypeWeightItem[];
  className?: string;
  status?: SectionStatus;
};

/**
 * Specimen leaf: clothesline (label + context) above per-weight
 * character grids — meta left, 9-column glyph matrix right.
 */
export function TypeSpecimenSection({
  id,
  title = "Specimen",
  context,
  items,
  className,
  status,
}: TypeSpecimenSectionProps) {
  if (items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      status={status}
      className={["type-specimen-section", className]
        .filter(Boolean)
        .join(" ")}
    >
      <VStack gap={8} width="100%" className="type-specimen-stack">
        {items.map((item) => {
          const glyphStyle =
            item.fontFamily || item.fontStyle
              ? ({
                  ...(item.fontFamily
                    ? { "--type-glyph-font": item.fontFamily }
                    : undefined),
                  ...(item.fontStyle
                    ? { "--type-glyph-style": item.fontStyle }
                    : undefined),
                } as CSSProperties)
              : undefined;

          return (
            <VStack
              key={item.id}
              as="article"
              gap={0}
              width="100%"
              aria-label={item.label}
              className="type-specimen-row"
            >
              <ClotheslineRow
                label={
                  <Text
                    weight="semibold"
                    color="primary"
                    display="block"
                    className="clothesline-title type-specimen-label"
                  >
                    {item.label}
                  </Text>
                }
              >
                <Grid
                  columns={9}
                  gap={0}
                  width="100%"
                  aria-label={`${item.label} character set`}
                  className="type-glyph-grid"
                >
                  {GLYPHS.map((glyph) => (
                    <HStack
                      key={`${item.id}-${glyph}`}
                      hAlign="center"
                      vAlign="center"
                      width="100%"
                      className={`type-glyph-cell type-weight-specimen-${item.weight}`}
                    >
                      <AspectRatio ratio={1} fit="center">
                        <HStack
                          hAlign="center"
                          vAlign="center"
                          width="100%"
                          height="100%"
                          className="type-glyph-inner"
                        >
                          <Text
                            weight={item.weight}
                            color="primary"
                            display="block"
                            className={`type-glyph type-weight-specimen-${item.weight}`}
                            style={glyphStyle}
                          >
                            {glyph}
                          </Text>
                        </HStack>
                      </AspectRatio>
                    </HStack>
                  ))}
                </Grid>
              </ClotheslineRow>
            </VStack>
          );
        })}
      </VStack>
    </ClotheslineLeaf>
  );
}
