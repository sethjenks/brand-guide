import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties } from "react";
import { Clothesline } from "@/components/Clothesline";
import { sectionLeafStyle } from "@/lib/section-leaf";
import "@/styles/flourish/type-specimens.css";

export type TypeHierarchyLevel = {
  id: string;
  /** Role label (Headline, Subhead, Body). */
  role: string;
  /** Face + weight name (e.g. "Geist Semibold"). */
  face: string;
  /** Size / leading example (e.g. "44/48pt"). */
  size: string;
  /** Case guidance (e.g. "Sentence case"). */
  casing: string;
  /** Live sample copy. */
  sample: string;
  /** CSS font-size token or value for the specimen. */
  fontSize: string;
  /** CSS line-height token or value for the specimen. */
  lineHeight: string;
  /** Weight cut applied to the specimen. */
  weight: "normal" | "medium" | "semibold" | "bold";
};

type TypeHierarchySectionProps = {
  id: string;
  title?: string;
  context: string;
  levels: readonly TypeHierarchyLevel[];
  className?: string;
};

/**
 * Hierarchy leaf: clothesline (label + context) above role rows —
 * meta left (role / face / size / case), live sample right.
 */
export function TypeHierarchySection({
  id,
  title = "Hierarchy",
  context,
  levels,
  className,
}: TypeHierarchySectionProps) {
  if (levels.length === 0) return null;

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className={["type-hierarchy-section", className]
        .filter(Boolean)
        .join(" ")}
      style={sectionLeafStyle}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="type-hierarchy-clothesline"
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
          className="measure type-hierarchy-context"
        >
          {context}
        </Text>
      </Clothesline>

      <VStack gap={10} width="100%" className="type-hierarchy-stack">
        {levels.map((level) => {
          const specimenStyle = {
            "--type-hierarchy-size": level.fontSize,
            "--type-hierarchy-leading": level.lineHeight,
          } as CSSProperties;

          return (
            <VStack
              key={level.id}
              as="article"
              gap={0}
              width="100%"
              aria-label={level.role}
              className="type-hierarchy-row"
            >
              <Grid
                columns={3}
                gap={4}
                columnGap={6}
                align="start"
                width="100%"
              >
                <VStack gap={1} className="type-hierarchy-meta">
                  <Text
                    weight="semibold"
                    color="primary"
                    display="block"
                    className="clothesline-title"
                  >
                    {level.role}
                  </Text>
                  <Text type="supporting" color="secondary" display="block">
                    {level.face}
                  </Text>
                  <Text type="supporting" color="secondary" display="block">
                    {level.size}
                  </Text>
                  <Text type="supporting" color="secondary" display="block">
                    {level.casing}
                  </Text>
                </VStack>

                <GridSpan columns={2}>
                  <Text
                    weight={level.weight}
                    color="primary"
                    display="block"
                    className={`type-hierarchy-sample type-weight-specimen-${level.weight}`}
                    style={specimenStyle}
                  >
                    {level.sample}
                  </Text>
                </GridSpan>
              </Grid>
            </VStack>
          );
        })}
      </VStack>
    </VStack>
  );
}
