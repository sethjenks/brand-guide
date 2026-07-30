import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import type { TypeWeightItem } from "@/components/TypeWeightsSection";

/** A–Z then 0–9 → 4×9 glyph grid. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

type TypeSpecimenSectionProps = {
  id: string;
  title?: string;
  context: string;
  /** Weight cuts to render as glyph grids (typically designated brand weights). */
  items: readonly TypeWeightItem[];
  className?: string;
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
}: TypeSpecimenSectionProps) {
  if (items.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className={["block subsection type-specimen-section", className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="type-specimen-clothesline"
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            {title}
          </Heading>
        }
      >
        <Text
          color="primary"
          as="p"
          display="block"
          className="measure type-specimen-context"
        >
          {context}
        </Text>
      </Clothesline>

      <VStack gap={8} width="100%" className="type-specimen-stack">
        {items.map((item) => (
          <VStack
            key={item.id}
            as="article"
            gap={0}
            width="100%"
            aria-label={item.label}
            className="type-specimen-row"
          >
            <Grid columns={3} gap={4} columnGap={6} align="start" width="100%">
              <Text
                weight="semibold"
                color="primary"
                display="block"
                className="clothesline-title type-specimen-label"
              >
                {item.label}
              </Text>

              <GridSpan columns={2}>
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
                          >
                            {glyph}
                          </Text>
                        </HStack>
                      </AspectRatio>
                    </HStack>
                  ))}
                </Grid>
              </GridSpan>
            </Grid>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}
