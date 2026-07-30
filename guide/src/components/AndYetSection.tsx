import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AgentLabel } from "@/components/AgentLabel";
import { Clothesline } from "@/components/Clothesline";
import type { AndYetPair } from "@/lib/brand-types";

type AndYetSectionProps = {
  id?: string;
  intro: string;
  pairs: readonly AndYetPair[];
};

/**
 * Language → And / Yet leaf: clothesline intro + lean | bridge + yet + phrase rows.
 */
export function AndYetSection({
  id = "language-and-yet",
  intro,
  pairs,
}: AndYetSectionProps) {
  if (!intro && pairs.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className="block subsection audience-section andyet-section"
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        title={
          <HStack gap={2} align="center" wrap="wrap">
            <Heading level={3} id={`${id}-title`} className="clothesline-title">
              And / Yet
            </Heading>
            <AgentLabel />
          </HStack>
        }
      >
        {intro ? (
          <Text
            type="large"
            weight="semibold"
            color="primary"
            as="p"
            display="block"
            className="measure clothesline-grid-intro"
          >
            {intro}
          </Text>
        ) : null}
      </Clothesline>

      {pairs.length > 0 ? (
        <VStack gap={8} role="list" aria-label="And / yet tonal pairs">
          {pairs.map((pair) => {
            const bridge = pair.bridge ?? "yet";
            const bridgeLabel = bridge === "and" ? "And" : "Yet";

            return (
              <Grid
                key={`${pair.lean}-${pair.yet}`}
                columns={3}
                gap={4}
                columnGap={6}
                align="start"
                className="andyet-row"
                role="listitem"
              >
                <Heading
                  level={4}
                  className="clothesline-grid-item-title andyet-lean"
                >
                  {pair.lean}
                </Heading>
                <GridSpan columns={2}>
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
                </GridSpan>
              </Grid>
            );
          })}
        </VStack>
      ) : null}
    </VStack>
  );
}
