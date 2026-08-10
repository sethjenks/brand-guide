import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AgentLabel } from "@/components/AgentLabel";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ClotheslineRow } from "@/components/ClotheslineRow";
import { DoDontColumns } from "@/components/DoDontColumns";
import { LabeledField } from "@/components/LabeledField";
import type { SectionStatus } from "@/lib/section-status-ui";

export type PrincipleItem = {
  title: string;
  body: string;
  do: string;
  dont: string;
};

type PrinciplesSectionProps = {
  id?: string;
  intro: string;
  items: readonly PrincipleItem[];
  status?: SectionStatus;
};

/**
 * Language → Principles leaf: clothesline intro + numbered principle rows with Do/Don’t.
 */
export function PrinciplesSection({
  id = "language-principles",
  intro,
  items,
  status,
}: PrinciplesSectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Principles"
      intro={intro || undefined}
      status={status}
      trailing={<AgentLabel />}
      className="audience-section principles-section"
    >
      {items.length > 0 ? (
        <VStack gap={10} role="list" aria-label="Language principles">
          {items.map((item, index) => (
            <ClotheslineRow
              key={item.title}
              gap={6}
              className="principle-row"
              role="listitem"
              label={
                <Text
                  weight="bold"
                  color="primary"
                  display="block"
                  className="principle-index clothesline-grid-item-title"
                  aria-hidden="true"
                >
                  {index + 1}.
                </Text>
              }
            >
              <VStack gap={4} className="principle-content">
                <Heading
                  level={4}
                  className="clothesline-grid-item-title principle-title"
                >
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
                {item.do || item.dont ? (
                  <DoDontColumns
                    className="principle-do-dont"
                    do={
                      item.do ? (
                        <LabeledField label="Do">
                          <Text
                            color="primary"
                            as="p"
                            display="block"
                            className="measure"
                          >
                            {item.do}
                          </Text>
                        </LabeledField>
                      ) : undefined
                    }
                    dont={
                      item.dont ? (
                        <LabeledField label="Don’t">
                          <Text
                            color="primary"
                            as="p"
                            display="block"
                            className="measure"
                          >
                            {item.dont}
                          </Text>
                        </LabeledField>
                      ) : undefined
                    }
                  />
                ) : null}
              </VStack>
            </ClotheslineRow>
          ))}
        </VStack>
      ) : null}
    </ClotheslineLeaf>
  );
}
