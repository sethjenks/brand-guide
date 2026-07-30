import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AssetStage } from "@/components/AssetStage";
import { Clothesline } from "@/components/Clothesline";

export type PhotographyCategoryNavItem = {
  id: string;
  label: string;
  /** Optional preview image for the tile stage. */
  src?: string;
  alt?: string;
};

type PhotographyCategoriesSectionProps = {
  id?: string;
  title?: string;
  context: string;
  items: readonly PhotographyCategoryNavItem[];
  className?: string;
};

/**
 * Photography → Categories leaf: clothesline intro + 2×2 jump grid.
 * Each tile anchors to a category detail section further down the chapter.
 */
export function PhotographyCategoriesSection({
  id = "photography-categories",
  title = "Categories",
  context,
  items,
  className,
}: PhotographyCategoriesSectionProps) {
  if (items.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={4}
      className={["block subsection photo-categories-section", className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="photo-categories-clothesline"
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
          className="measure photo-categories-context"
        >
          {context}
        </Text>
      </Clothesline>

      <Grid
        columns={2}
        gap={6}
        width="100%"
        aria-label="Photography categories"
        className="photo-categories-grid"
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="photo-category-tile"
          >
            <VStack gap={2} width="100%">
              <AssetStage
                aria-label={item.alt ?? item.label}
                minHeight={280}
                className="photo-category-tile-stage"
              >
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.alt ?? item.label}
                    className="photo-category-tile-media"
                  />
                ) : null}
              </AssetStage>
              <Text
                weight="semibold"
                color="primary"
                display="block"
                className="photo-category-tile-label"
              >
                {item.label}
              </Text>
            </VStack>
          </a>
        ))}
      </Grid>
    </VStack>
  );
}
