import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties } from "react";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ClotheslineRow } from "@/components/ClotheslineRow";
import type { SectionStatus } from "@/lib/section-status-ui";
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
  /** Optional CSS font-family stack for this level. */
  fontFamily?: string;
  /** Optional CSS font-style for this level (e.g. italic). */
  fontStyle?: string;
};

type TypeHierarchySectionProps = {
  id: string;
  title?: string;
  context: string;
  levels: readonly TypeHierarchyLevel[];
  className?: string;
  status?: SectionStatus;
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
  status,
}: TypeHierarchySectionProps) {
  if (levels.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      status={status}
      className={["type-hierarchy-section", className]
        .filter(Boolean)
        .join(" ")}
    >
      <VStack gap={10} width="100%" className="type-hierarchy-stack">
        {levels.map((level) => {
          const specimenStyle = {
            "--type-hierarchy-size": level.fontSize,
            "--type-hierarchy-leading": level.lineHeight,
            ...(level.fontFamily
              ? { "--type-hierarchy-font": level.fontFamily }
              : undefined),
            ...(level.fontStyle
              ? { "--type-hierarchy-style": level.fontStyle }
              : undefined),
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
              <ClotheslineRow
                label={
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
                }
              >
                <Text
                  weight={level.weight}
                  color="primary"
                  display="block"
                  className={`type-hierarchy-sample type-weight-specimen-${level.weight}`}
                  style={specimenStyle}
                >
                  {level.sample}
                </Text>
              </ClotheslineRow>
            </VStack>
          );
        })}
      </VStack>
    </ClotheslineLeaf>
  );
}
