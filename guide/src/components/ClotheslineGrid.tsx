import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import type { SectionStatus } from "@/lib/section-status-ui";

export type ClotheslineGridItem = {
  title: string;
  body: string;
};

type ClotheslineGridProps = {
  id: string;
  title: string;
  intro: string;
  items: readonly ClotheslineGridItem[];
  status?: SectionStatus;
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
  status,
}: ClotheslineGridProps) {
  if (!intro && items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      intro={intro || undefined}
      status={status}
      className="clothesline-grid-section"
      headerContent={
        items.length > 0 ? (
          <Grid
            columns={2}
            gap={8}
            columnGap={8}
            align="start"
            className="clothesline-grid"
            aria-label={`${title} items`}
          >
            {items.map((item) => (
              <VStack
                key={item.title}
                gap={2}
                className="clothesline-grid-item"
              >
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
        ) : undefined
      }
    />
  );
}
