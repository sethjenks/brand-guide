import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import { sectionLeafStyle } from "@/lib/section-leaf";
import "@/styles/flourish/type-specimens.css";

export type TypeWeightItem = {
  id: string;
  /** Left-column label (e.g. "Geist Semibold"). */
  label: string;
  /** CSS font-weight token value applied to the specimen. */
  weight: "normal" | "medium" | "semibold" | "bold";
  /** Optional specimen text; defaults to `label`. */
  sample?: string;
};

type TypeWeightsSectionProps = {
  id: string;
  title?: string;
  context: string;
  items: readonly TypeWeightItem[];
  className?: string;
};

/**
 * Weights leaf: clothesline (label + context) above rows of
 * designated face weights — meta left, large live specimen right.
 */
export function TypeWeightsSection({
  id,
  title = "Weights",
  context,
  items,
  className,
}: TypeWeightsSectionProps) {
  if (items.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className={["type-weights-section", className]
        .filter(Boolean)
        .join(" ")}
      style={sectionLeafStyle}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="type-weights-clothesline"
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
          className="measure type-weights-context"
        >
          {context}
        </Text>
      </Clothesline>

      <VStack gap={8} width="100%" className="type-weights-stack">
        {items.map((item) => {
          const sample = item.sample ?? item.label;

          return (
            <VStack
              key={item.id}
              as="article"
              gap={0}
              width="100%"
              aria-label={item.label}
              className="type-weight-row"
            >
              <Grid
                columns={3}
                gap={4}
                columnGap={6}
                align="start"
                width="100%"
              >
                <Text
                  weight="semibold"
                  color="primary"
                  display="block"
                  className="clothesline-title type-weight-label"
                >
                  {item.label}
                </Text>

                <GridSpan columns={2}>
                  <Text
                    weight={item.weight}
                    color="primary"
                    display="block"
                    className={`type-weight-specimen type-weight-specimen-${item.weight}`}
                    aria-label={`${item.label} specimen`}
                  >
                    {sample}
                  </Text>
                </GridSpan>
              </Grid>
            </VStack>
          );
        })}
      </VStack>
    </VStack>
  );
}
