import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";

export type ClotheslineGridItem = {
  title: string;
  body: string;
};

type ClotheslineGridProps = {
  id: string;
  title: string;
  intro: string;
  items: readonly ClotheslineGridItem[];
};

/**
 * Clothesline leaf with intro + 2-column belief/trait grid in the content column.
 * Shared by Strategy → Values and Strategy → Personality.
 */
export function ClotheslineGrid({
  id,
  title,
  intro,
  items,
}: ClotheslineGridProps) {
  if (!intro && items.length === 0) return null;

  return (
    <Clothesline
      as="section"
      id={id}
      className="block subsection clothesline-grid-section"
      aria-labelledby={`${id}-title`}
      title={
        <Heading level={3} id={`${id}-title`} className="clothesline-title">
          {title}
        </Heading>
      }
    >
      <VStack gap={8}>
        {intro ? (
          <Text
            type="large"
            weight="semibold"
            color="primary"
            as="p"
            display="block"
            className="measure clothesline-grid-intro"
          >
            {intro}
          </Text>
        ) : null}

        {items.length > 0 ? (
          <Grid
            columns={2}
            gap={8}
            columnGap={8}
            align="start"
            className="clothesline-grid"
            aria-label={`${title} items`}
          >
            {items.map((item) => (
              <VStack key={item.title} gap={2} className="clothesline-grid-item">
                <Heading level={4} className="clothesline-grid-item-title">
                  {item.title}
                </Heading>
                {item.body ? (
                  <Text
                    color="primary"
                    as="p"
                    display="block"
                    className="measure"
                  >
                    {item.body}
                  </Text>
                ) : null}
              </VStack>
            ))}
          </Grid>
        ) : null}
      </VStack>
    </Clothesline>
  );
}
