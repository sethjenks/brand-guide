import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { Clothesline } from "@/components/Clothesline";

export type TypePrincipleItem = {
  id: string;
  /** Short guidance beside the pair. */
  description: string;
  /** Correct specimen content. */
  doExample: ReactNode;
  /** Incorrect specimen content. */
  dontExample: ReactNode;
  doCaption?: string;
  dontCaption?: string;
};

type TypePrinciplesSectionProps = {
  id: string;
  title?: string;
  context: string;
  items: readonly TypePrincipleItem[];
  className?: string;
};

function PrincipleStage({
  label,
  struck,
  children,
}: {
  label: string;
  struck?: boolean;
  children: ReactNode;
}) {
  return (
    <VStack gap={2} width="100%" className="type-principle-pair">
      <HStack
        hAlign="center"
        vAlign="center"
        width="100%"
        className={[
          "type-principle-stage",
          struck ? "type-principle-stage-dont" : "type-principle-stage-do",
        ].join(" ")}
      >
        <AspectRatio ratio={4 / 3} fit="center">
          <HStack
            hAlign="start"
            vAlign="center"
            width="100%"
            height="100%"
            className="type-principle-stage-inner"
          >
            {children}
          </HStack>
        </AspectRatio>
        {struck ? (
          <VStack gap={0} className="dont-grid-strike" aria-hidden="true" />
        ) : null}
      </HStack>
      <Text
        weight="semibold"
        color="primary"
        display="block"
        className="type-principle-caption"
      >
        {label}
      </Text>
    </VStack>
  );
}

/**
 * Typography Principles leaf: clothesline + rows of description /
 * Always-do specimen / Don’t specimen (with strike).
 */
export function TypePrinciplesSection({
  id,
  title = "Principles",
  context,
  items,
  className,
}: TypePrinciplesSectionProps) {
  if (items.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className={["block subsection type-principles-section", className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="type-principles-clothesline"
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            {title}
          </Heading>
        }
      >
        <Text
          color="primary"
          as="p"
          display="block"
          className="measure type-principles-context"
        >
          {context}
        </Text>
      </Clothesline>

      <VStack
        gap={8}
        width="100%"
        role="list"
        aria-label="Typesetting principles"
        className="type-principles-stack"
      >
        {items.map((item) => (
          <Grid
            key={item.id}
            columns={3}
            gap={4}
            columnGap={6}
            align="start"
            width="100%"
            role="listitem"
            className="type-principle-row"
          >
            <Text
              color="primary"
              as="p"
              display="block"
              className="type-principle-description"
            >
              {item.description}
            </Text>

            <PrincipleStage label={item.doCaption ?? "Always do this"}>
              {item.doExample}
            </PrincipleStage>

            <PrincipleStage
              label={item.dontCaption ?? "Don’t do this"}
              struck
            >
              {item.dontExample}
            </PrincipleStage>
          </Grid>
        ))}
      </VStack>
    </VStack>
  );
}
