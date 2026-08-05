import { Divider } from "@astryxdesign/core/Divider";
import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties, ElementType, ReactNode } from "react";

type ClotheslineProps = {
  /** Left-column title (string → bold Text; or pass a Heading). */
  title: ReactNode;
  /** Right-column content (intro, detail, stacked blocks). */
  children?: ReactNode;
  /** Optional trailing action (e.g. Download), right-aligned in the content row. */
  action?: ReactNode;
  id?: string;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

/**
 * Clothesline leaf: strong top rule, title left, content block on the right,
 * optional action trailing the content row.
 */
export function Clothesline({
  title,
  children,
  action,
  id,
  className,
  style,
  as = "div",
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
}: ClotheslineProps) {
  const titleNode =
    typeof title === "string" ? (
      <Text
        type="label"
        weight="semibold"
        color="primary"
        display="block"
        className="clothesline-title"
      >
        {title}
      </Text>
    ) : (
      title
    );

  const content =
    action != null ? (
      <HStack
        gap={4}
        vAlign="center"
        hAlign="between"
        width="100%"
        className="clothesline-content-row"
      >
        <StackItem size="fill">{children}</StackItem>
        <VStack gap={0} className="clothesline-action-slot">
          {action}
        </VStack>
      </HStack>
    ) : (
      children
    );

  return (
    <VStack
      as={as}
      id={id}
      gap={4}
      width="100%"
      className={["clothesline", className].filter(Boolean).join(" ")}
      style={style}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
    >
      <Divider variant="strong" />
      <Grid
        columns={3}
        gap={4}
        columnGap={6}
        align={action != null ? "center" : "start"}
      >
        <VStack gap={0} className="clothesline-title-slot">
          {titleNode}
        </VStack>
        <GridSpan columns={2}>{content}</GridSpan>
      </Grid>
    </VStack>
  );
}
