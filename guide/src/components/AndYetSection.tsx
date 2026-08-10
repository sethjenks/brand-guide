import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AgentLabel } from "@/components/AgentLabel";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ClotheslineRow } from "@/components/ClotheslineRow";
import type { AndYetPair } from "@/lib/brand-types";
import type { SectionStatus } from "@/lib/section-status-ui";

type AndYetSectionProps = {
  id?: string;
  intro: string;
  pairs: readonly AndYetPair[];
  status?: SectionStatus;
};

/**
 * Language → And / Yet leaf: clothesline intro + lean | bridge + yet + phrase rows.
 */
export function AndYetSection({
  id = "language-and-yet",
  intro,
  pairs,
  status,
}: AndYetSectionProps) {
  if (!intro && pairs.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="And / Yet"
      intro={intro || undefined}
      status={status}
      trailing={<AgentLabel />}
      className="audience-section andyet-section"
    >
      {pairs.length > 0 ? (
        <VStack gap={8} role="list" aria-label="And / yet tonal pairs">
          {pairs.map((pair) => {
            const bridge = pair.bridge ?? "yet";
            const bridgeLabel = bridge === "and" ? "And" : "Yet";

            return (
              <ClotheslineRow
                key={`${pair.lean}-${pair.yet}`}
                className="andyet-row"
                role="listitem"
                label={
                  <Heading
                    level={4}
                    className="clothesline-grid-item-title andyet-lean"
                  >
                    {pair.lean}
                  </Heading>
                }
              >
                <VStack gap={3} className="andyet-content">
                  <HStack gap={4} align="end" wrap="wrap">
                    <Text
                      type="label"
                      weight="semibold"
                      color="primary"
                      display="block"
                      className="clothesline-title"
                    >
                      {bridgeLabel}
                    </Text>
                    <Heading
                      level={4}
                      className="clothesline-grid-item-title andyet-yet"
                    >
                      {pair.yet}
                    </Heading>
                  </HStack>
                  {pair.phrase ? (
                    <Text
                      color="primary"
                      as="p"
                      display="block"
                      className="measure andyet-phrase"
                    >
                      {pair.phrase}
                    </Text>
                  ) : null}
                </VStack>
              </ClotheslineRow>
            );
          })}
        </VStack>
      ) : null}
    </ClotheslineLeaf>
  );
}
