import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import { sectionLeafStyle } from "@/lib/section-leaf";

type CtaSectionProps = {
  id?: string;
  intro: string;
  doItems: readonly string[];
  dontItems: readonly string[];
};

function CtaColumn({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  if (items.length === 0) return null;

  return (
    <VStack gap={6} className="cta-column">
      <Text
        type="label"
        weight="semibold"
        color="primary"
        display="block"
        className="clothesline-title"
      >
        {label}
      </Text>
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
}: CtaSectionProps) {
  if (!intro && doItems.length === 0 && dontItems.length === 0) return null;

  return (
    <Clothesline
      as="section"
      id={id}
      className="clothesline-grid-section cta-section"
      style={sectionLeafStyle}
      aria-labelledby={`${id}-title`}
      title={
        <Heading level={3} id={`${id}-title`} className="clothesline-title">
          Calls to action
        </Heading>
      }
    >
      <VStack gap={8}>
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

        {doItems.length > 0 || dontItems.length > 0 ? (
          <Grid
            columns={2}
            gap={8}
            columnGap={8}
            align="start"
            className="cta-do-dont"
          >
            <CtaColumn label="Do" items={doItems} />
            <CtaColumn label="Don’t" items={dontItems} />
          </Grid>
        ) : null}
      </VStack>
    </Clothesline>
  );
}
