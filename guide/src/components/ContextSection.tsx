import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AgentLabel } from "@/components/AgentLabel";
import { Clothesline } from "@/components/Clothesline";

export type ContextItem = {
  context: string;
  guidance: string;
  example: string;
};

type ContextSectionProps = {
  id?: string;
  intro: string;
  items: readonly ContextItem[];
};

/**
 * Language → By context leaf: clothesline intro + context | guidance + example rows.
 */
export function ContextSection({
  id = "language-context",
  intro,
  items,
}: ContextSectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className="block subsection audience-section context-section"
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        title={
          <HStack gap={2} align="center" wrap="wrap">
            <Heading level={3} id={`${id}-title`} className="clothesline-title">
              By context
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

      {items.length > 0 ? (
        <VStack gap={8} role="list" aria-label="Tone by context">
          {items.map((item) => (
            <Grid
              key={item.context}
              columns={3}
              gap={4}
              columnGap={6}
              align="start"
              className="context-row"
              role="listitem"
            >
              <Text
                type="label"
                weight="semibold"
                color="primary"
                display="block"
                className="clothesline-title"
              >
                {item.context}
              </Text>
              <GridSpan columns={2}>
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
              </GridSpan>
            </Grid>
          ))}
        </VStack>
      ) : null}
    </VStack>
  );
}
