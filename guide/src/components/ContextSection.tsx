import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AgentLabel } from "@/components/AgentLabel";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ClotheslineRow } from "@/components/ClotheslineRow";
import type { SectionStatus } from "@/lib/section-status-ui";

export type ContextItem = {
  context: string;
  guidance: string;
  example: string;
};

type ContextSectionProps = {
  id?: string;
  intro: string;
  items: readonly ContextItem[];
  status?: SectionStatus;
};

/**
 * Language → By context leaf: clothesline intro + context | guidance + example rows.
 */
export function ContextSection({
  id = "language-context",
  intro,
  items,
  status,
}: ContextSectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="By context"
      intro={intro || undefined}
      status={status}
      trailing={<AgentLabel />}
      className="audience-section context-section"
    >
      {items.length > 0 ? (
        <VStack gap={8} role="list" aria-label="Tone by context">
          {items.map((item) => (
            <ClotheslineRow
              key={item.context}
              className="context-row"
              role="listitem"
              label={
                <Text
                  type="label"
                  weight="semibold"
                  color="primary"
                  display="block"
                  className="clothesline-title"
                >
                  {item.context}
                </Text>
              }
            >
              <VStack gap={2} className="context-content">
                {item.guidance ? (
                  <Text
                    color="primary"
                    as="p"
                    display="block"
                    className="measure"
                  >
                    {item.guidance}
                  </Text>
                ) : null}
                {item.example ? (
                  <Text
                    color="secondary"
                    as="p"
                    display="block"
                    className="measure context-example"
                  >
                    “{item.example}”
                  </Text>
                ) : null}
              </VStack>
            </ClotheslineRow>
          ))}
        </VStack>
      ) : null}
    </ClotheslineLeaf>
  );
}
