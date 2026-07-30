import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AgentLabel } from "@/components/AgentLabel";
import { Clothesline } from "@/components/Clothesline";

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
};

/**
 * Language → Principles leaf: clothesline intro + numbered principle rows with Do/Don’t.
 */
export function PrinciplesSection({
  id = "language-principles",
  intro,
  items,
}: PrinciplesSectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className="block subsection audience-section principles-section"
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        title={
          <HStack gap={2} align="center" wrap="wrap">
            <Heading level={3} id={`${id}-title`} className="clothesline-title">
              Principles
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
        <VStack gap={10} role="list" aria-label="Language principles">
          {items.map((item, index) => (
            <Grid
              key={item.title}
              columns={3}
              gap={6}
              columnGap={6}
              align="start"
              className="principle-row"
              role="listitem"
            >
              <Text
                weight="bold"
                color="primary"
                display="block"
                className="principle-index clothesline-grid-item-title"
                aria-hidden="true"
              >
                {index + 1}.
              </Text>
              <GridSpan columns={2}>
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
                    <Grid
                      columns={2}
                      gap={6}
                      columnGap={8}
                      align="start"
                      className="principle-do-dont"
                    >
                      {item.do ? (
                        <VStack gap={2}>
                          <Text weight="bold" color="primary" display="block">
                            Do
                          </Text>
                          <Text
                            color="primary"
                            as="p"
                            display="block"
                            className="measure"
                          >
                            {item.do}
                          </Text>
                        </VStack>
                      ) : null}
                      {item.dont ? (
                        <VStack gap={2}>
                          <Text weight="bold" color="primary" display="block">
                            Don’t
                          </Text>
                          <Text
                            color="primary"
                            as="p"
                            display="block"
                            className="measure"
                          >
                            {item.dont}
                          </Text>
                        </VStack>
                      ) : null}
                    </Grid>
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
