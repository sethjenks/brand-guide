import { Grid } from "@astryxdesign/core/Grid";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AssetStage } from "@/components/AssetStage";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import type { SectionStatus } from "@/lib/section-status-ui";

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
  status?: SectionStatus;
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
  status,
}: PhotographyCategoriesSectionProps) {
  if (items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      status={status}
      gap={4}
      className={["photo-categories-section", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Grid
        columns={{ minWidth: 280, max: 2 }}
        gap={6}
        width="100%"
        aria-label="Photography categories"
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
    </ClotheslineLeaf>
  );
}
