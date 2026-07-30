import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";

type HeadlinesSectionProps = {
  id?: string;
  intro: string;
  items: readonly string[];
};

/**
 * Language → Headlines leaf: clothesline intro + full-width display headline stack.
 */
export function HeadlinesSection({
  id = "language-headlines",
  intro,
  items,
}: HeadlinesSectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className="block subsection statement-section headlines-section"
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            Headlines
          </Heading>
        }
      >
        {intro ? (
          <Text
            type="large"
            weight="semibold"
            color="primary"
            as="p"
            display="block"
            className="measure statement-intro"
          >
            {intro}
          </Text>
        ) : null}
      </Clothesline>

      {items.length > 0 ? (
        <VStack gap={8} role="list" aria-label="Headlines">
          {items.map((headline) => (
            <Text
              key={headline}
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
    </VStack>
  );
}
