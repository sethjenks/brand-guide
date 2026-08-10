import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import type { SectionStatus } from "@/lib/section-status-ui";

type HeadlinesSectionProps = {
  id?: string;
  intro: string;
  items: readonly string[];
  status?: SectionStatus;
};

/**
 * Language → Headlines leaf: clothesline intro + full-width display headline stack.
 */
export function HeadlinesSection({
  id = "language-headlines",
  intro,
  items,
  status,
}: HeadlinesSectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Headlines"
      intro={intro || undefined}
      status={status}
      className="statement-section headlines-section"
    >
      {items.length > 0 ? (
        <VStack gap={8} role="list" aria-label="Headlines">
          {items.map((headline, index) => (
            <Text
              key={`${id}-headline-${index}`}
              type="display-2"
              weight="bold"
              color="primary"
              as="p"
              display="block"
              className="headline-line"
              role="listitem"
            >
              {headline}
            </Text>
          ))}
        </VStack>
      ) : null}
    </ClotheslineLeaf>
  );
}
