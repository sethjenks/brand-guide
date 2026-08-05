import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AssetStage } from "@/components/AssetStage";
import { Clothesline } from "@/components/Clothesline";
import { ImageGrid, type ImageGridItem } from "@/components/ImageGrid";
import { sectionLeafStyle } from "@/lib/section-leaf";

type PhotographyCategorySectionProps = {
  id: string;
  title: string;
  /** Short rationale beside the category label. */
  context: string;
  /** Optional hero image inside the shared AssetStage. */
  heroSrc?: string;
  heroAlt?: string;
  /** Smaller gallery cells below the hero. Defaults to three placeholders. */
  gallery?: readonly ImageGridItem[];
  /** Placeholder gallery count when `gallery` is omitted. */
  galleryCount?: number;
  className?: string;
};

function placeholderGallery(
  categoryId: string,
  count: number,
): ImageGridItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${categoryId}-gallery-${index}`,
    background: "var(--color-background-muted)",
    tone: "light" as const,
  }));
}

/**
 * Photography category detail: clothesline, AssetStage hero, then image gallery.
 */
export function PhotographyCategorySection({
  id,
  title,
  context,
  heroSrc,
  heroAlt,
  gallery,
  galleryCount = 3,
  className,
}: PhotographyCategorySectionProps) {
  const galleryItems = gallery ?? placeholderGallery(id, galleryCount);

  return (
    <VStack
      as="section"
      id={id}
      gap={4}
      className={["photo-category-section", className]
        .filter(Boolean)
        .join(" ")}
      style={sectionLeafStyle}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="photo-category-clothesline"
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
          className="measure photo-category-context"
        >
          {context}
        </Text>
      </Clothesline>

      <AssetStage
        aria-label={heroAlt ?? `${title} hero`}
        minHeight={420}
        className="photo-category-hero"
      >
        {heroSrc ? (
          <img
            src={heroSrc}
            alt={heroAlt ?? title}
            className="photo-category-hero-media"
          />
        ) : null}
      </AssetStage>

      {galleryItems.length > 0 ? (
        <ImageGrid
          aria-label={`${title} gallery`}
          columns={galleryItems.length >= 3 ? 3 : 2}
          gap={3}
          ratio={4 / 3}
          items={galleryItems}
          cellBorder
          className="photo-category-gallery"
        />
      ) : null}
    </VStack>
  );
}
