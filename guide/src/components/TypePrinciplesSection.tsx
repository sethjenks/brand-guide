import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { StruckStage } from "@/components/StruckStage";
import type { SectionStatus } from "@/lib/section-status-ui";
import "@/styles/flourish/type-principles.css";

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
  status?: SectionStatus;
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
      <StruckStage
        struck={Boolean(struck)}
        ratio={4 / 3}
        className={[
          "type-principle-stage",
          struck ? "type-principle-stage-dont" : "type-principle-stage-do",
        ].join(" ")}
      >
        <HStack
          hAlign="start"
          vAlign="center"
          width="100%"
          height="100%"
          className="type-principle-stage-inner"
        >
          {children}
        </HStack>
      </StruckStage>
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
  status,
}: TypePrinciplesSectionProps) {
  if (items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      status={status}
      className={["type-principles-section", className]
        .filter(Boolean)
        .join(" ")}
    >
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
            columns={{ minWidth: 220, max: 3 }}
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
    </ClotheslineLeaf>
  );
}
