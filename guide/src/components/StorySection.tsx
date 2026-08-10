import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ClotheslineRow } from "@/components/ClotheslineRow";
import type { SectionStatus } from "@/lib/section-status-ui";

type StoryLength = {
  label: string;
  body: string;
};

type StorySectionProps = {
  id?: string;
  intro: string;
  long: string;
  medium: string;
  short: string;
  status?: SectionStatus;
};

/**
 * Language → Story leaf: clothesline intro + Long / Medium / Short clothesline rows.
 */
export function StorySection({
  id = "language-story",
  intro,
  long,
  medium,
  short,
  status,
}: StorySectionProps) {
  const lengths: StoryLength[] = [
    { label: "Long", body: long },
    { label: "Medium", body: medium },
    { label: "Short", body: short },
  ].filter((row) => row.body);

  if (!intro && lengths.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Story"
      intro={intro || undefined}
      status={status}
      className="audience-section story-section"
    >
      {lengths.length > 0 ? (
        <VStack gap={8} role="list" aria-label="Story lengths">
          {lengths.map((row) => (
            <ClotheslineRow
              key={row.label}
              className="story-row"
              role="listitem"
              label={
                <Text
                  type="label"
                  weight="semibold"
                  color="primary"
                  display="block"
                  className="clothesline-title"
                >
                  {row.label}
                </Text>
              }
            >
              <Text
                color="primary"
                as="p"
                display="block"
                className="measure story-body"
              >
                {row.body}
              </Text>
            </ClotheslineRow>
          ))}
        </VStack>
      ) : null}
    </ClotheslineLeaf>
  );
}
