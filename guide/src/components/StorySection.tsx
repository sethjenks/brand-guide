import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import { sectionLeafStyle } from "@/lib/section-leaf";

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
}: StorySectionProps) {
  const lengths: StoryLength[] = [
    { label: "Long", body: long },
    { label: "Medium", body: medium },
    { label: "Short", body: short },
  ].filter((row) => row.body);

  if (!intro && lengths.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className="audience-section story-section"
      style={sectionLeafStyle}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            Story
          </Heading>
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

      {lengths.length > 0 ? (
        <VStack gap={8} role="list" aria-label="Story lengths">
          {lengths.map((row) => (
            <Grid
              key={row.label}
              columns={3}
              gap={4}
              columnGap={6}
              align="start"
              className="story-row"
              role="listitem"
            >
              <Text
                type="label"
                weight="semibold"
                color="primary"
                display="block"
                className="clothesline-title"
              >
                {row.label}
              </Text>
              <GridSpan columns={2}>
                <Text
                  color="primary"
                  as="p"
                  display="block"
                  className="measure story-body"
                >
                  {row.body}
                </Text>
              </GridSpan>
            </Grid>
          ))}
        </VStack>
      ) : null}
    </VStack>
  );
}
