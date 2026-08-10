import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { DoDontColumns } from "@/components/DoDontColumns";
import { LabeledField } from "@/components/LabeledField";
import type { SectionStatus } from "@/lib/section-status-ui";

type CtaSectionProps = {
  id?: string;
  intro: string;
  doItems: readonly string[];
  dontItems: readonly string[];
  status?: SectionStatus;
};

function CtaExamples({
  items,
  label,
}: {
  items: readonly string[];
  label: string;
}) {
  return (
    <VStack gap={5} role="list" aria-label={label}>
      {items.map((item) => (
        <Text
          key={item}
          weight="bold"
          color="primary"
          as="p"
          display="block"
          className="clothesline-grid-item-title cta-example"
          role="listitem"
        >
          {item}
        </Text>
      ))}
    </VStack>
  );
}

/**
 * Language → Calls to action leaf: clothesline intro + Do / Don’t example columns.
 */
export function CtaSection({
  id = "language-cta",
  intro,
  doItems,
  dontItems,
  status,
}: CtaSectionProps) {
  if (!intro && doItems.length === 0 && dontItems.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Calls to action"
      intro={intro || undefined}
      status={status}
      className="clothesline-grid-section cta-section"
      headerContent={
        doItems.length > 0 || dontItems.length > 0 ? (
          <DoDontColumns
            gap={8}
            className="cta-do-dont"
            do={
              doItems.length > 0 ? (
                <LabeledField
                  label="Do"
                  labelType="label"
                  gap={6}
                  className="cta-column"
                >
                  <CtaExamples items={doItems} label="Do" />
                </LabeledField>
              ) : undefined
            }
            dont={
              dontItems.length > 0 ? (
                <LabeledField
                  label="Don’t"
                  labelType="label"
                  gap={6}
                  className="cta-column"
                >
                  <CtaExamples items={dontItems} label="Don’t" />
                </LabeledField>
              ) : undefined
            }
          />
        ) : undefined
      }
    />
  );
}
