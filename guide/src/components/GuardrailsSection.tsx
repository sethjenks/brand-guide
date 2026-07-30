import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AgentLabel } from "@/components/AgentLabel";
import { Clothesline } from "@/components/Clothesline";

type GuardrailsSectionProps = {
  id?: string;
  intro: string;
  tone: string;
  cannotBe: readonly string[];
  litmus: string;
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
}: GuardrailsSectionProps) {
  const lead = intro || tone;
  if (!lead && !cannotBe.length && !litmus) return null;

  return (
    <Clothesline
      as="section"
      id={id}
      className="block subsection clothesline-grid-section"
      aria-labelledby={`${id}-title`}
      title={
        <HStack gap={2} align="center" wrap="wrap">
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            Guardrails
          </Heading>
          <AgentLabel />
        </HStack>
      }
    >
      <VStack gap={8}>
        {lead ? (
          <Text
            type="large"
            weight="semibold"
            color="primary"
            as="p"
            display="block"
            className="measure clothesline-grid-intro"
          >
            {lead}
          </Text>
        ) : null}

        {tone && intro ? (
          <Text color="primary" as="p" display="block" className="measure">
            {tone}
          </Text>
        ) : null}

        <Grid columns={2} gap={8} columnGap={8} align="start">
          {cannotBe.length > 0 ? (
            <VStack gap={2}>
              <Text weight="bold" color="primary" display="block">
                Cannot be
              </Text>
              <ul className="guardrails-list" aria-label="Cannot be">
                {cannotBe.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </VStack>
          ) : null}

          {litmus ? (
            <VStack gap={2}>
              <Text weight="bold" color="primary" display="block">
                Litmus
              </Text>
              <Text color="primary" as="p" display="block" className="measure">
                {litmus}
              </Text>
            </VStack>
          ) : null}
        </Grid>
      </VStack>
    </Clothesline>
  );
}
