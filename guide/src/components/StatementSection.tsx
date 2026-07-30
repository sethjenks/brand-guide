import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";

type StatementSectionProps = {
  id: string;
  title: string;
  intro: string;
  statement: string;
};

/**
 * Leaf section: clothesline + large statement (Positioning, Vision, Mission).
 */
export function StatementSection({
  id,
  title,
  intro,
  statement,
}: StatementSectionProps) {
  if (!intro && !statement) return null;

  return (
    <Clothesline
      as="section"
      id={id}
      className="block subsection statement-section"
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
            className="measure statement-intro"
          >
            {intro}
          </Text>
        ) : null}
        {statement ? (
          <Text
            type="display-2"
            weight="bold"
            color="primary"
            as="p"
            display="block"
            className="statement-display"
          >
            {statement}
          </Text>
        ) : null}
      </VStack>
    </Clothesline>
  );
}
