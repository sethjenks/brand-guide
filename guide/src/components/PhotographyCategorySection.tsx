import { VStack } from "@astryxdesign/core/VStack";
import { AssetStage } from "@/components/AssetStage";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ImageGrid, type ImageGridItem } from "@/components/ImageGrid";
import type { SectionStatus } from "@/lib/section-status-ui";

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
  status?: SectionStatus;
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
  status,
}: PhotographyCategorySectionProps) {
  const galleryItems = gallery ?? placeholderGallery(id, galleryCount);

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      status={status}
      gap={4}
      className={["photo-category-section", className]
        .filter(Boolean)
        .join(" ")}
    >
      <VStack gap={4} width="100%">
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
    </ClotheslineLeaf>
  );
}
