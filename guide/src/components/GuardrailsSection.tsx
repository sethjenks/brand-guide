import { Text } from "@astryxdesign/core/Text";
import { AgentLabel } from "@/components/AgentLabel";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { DoDontColumns } from "@/components/DoDontColumns";
import { LabeledField } from "@/components/LabeledField";
import type { SectionStatus } from "@/lib/section-status-ui";

type GuardrailsSectionProps = {
  id?: string;
  intro: string;
  tone: string;
  cannotBe: readonly string[];
  litmus: string;
  status?: SectionStatus;
};

/**
 * Strategy → Guardrails leaf: clothesline + tone, cannot-be list, litmus.
 */
export function GuardrailsSection({
  id = "strategy-guardrails",
  intro,
  tone,
  cannotBe,
  litmus,
  status,
}: GuardrailsSectionProps) {
  const lead = intro || tone;
  if (!lead && !cannotBe.length && !litmus) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Guardrails"
      intro={lead || undefined}
      status={status}
      trailing={<AgentLabel />}
      className="clothesline-grid-section"
      headerContent={
        <>
          {tone && intro ? (
            <Text color="primary" as="p" display="block" className="measure">
              {tone}
            </Text>
          ) : null}

          <DoDontColumns
            gap={8}
            do={
              cannotBe.length > 0 ? (
                <LabeledField label="Cannot be">
                  <ul className="guardrails-list" aria-label="Cannot be">
                    {cannotBe.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </LabeledField>
              ) : undefined
            }
            dont={
              litmus ? (
                <LabeledField label="Litmus">
                  <Text
                    color="primary"
                    as="p"
                    display="block"
                    className="measure"
                  >
                    {litmus}
                  </Text>
                </LabeledField>
              ) : undefined
            }
          />
        </>
      }
    />
  );
}
