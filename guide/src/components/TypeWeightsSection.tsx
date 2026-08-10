import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { ClotheslineRow } from "@/components/ClotheslineRow";
import type { SectionStatus } from "@/lib/section-status-ui";
import "@/styles/flourish/type-specimens.css";

export type TypeWeightItem = {
  id: string;
  /** Left-column label (e.g. "Geist Semibold"). */
  label: string;
  /** CSS font-weight token value applied to the specimen. */
  weight: "normal" | "medium" | "semibold" | "bold";
  /** Optional specimen text; defaults to `label`. */
  sample?: string;
};

type TypeWeightsSectionProps = {
  id: string;
  title?: string;
  context: string;
  items: readonly TypeWeightItem[];
  className?: string;
  status?: SectionStatus;
};

/**
 * Weights leaf: clothesline (label + context) above rows of
 * designated face weights — meta left, large live specimen right.
 */
export function TypeWeightsSection({
  id,
  title = "Weights",
  context,
  items,
  className,
  status,
}: TypeWeightsSectionProps) {
  if (items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      status={status}
      className={["type-weights-section", className].filter(Boolean).join(" ")}
    >
      <VStack gap={8} width="100%" className="type-weights-stack">
        {items.map((item) => {
          const sample = item.sample ?? item.label;

          return (
            <VStack
              key={item.id}
              as="article"
              gap={0}
              width="100%"
              aria-label={item.label}
              className="type-weight-row"
            >
              <ClotheslineRow
                label={
                  <Text
                    weight="semibold"
                    color="primary"
                    display="block"
                    className="clothesline-title type-weight-label"
                  >
                    {item.label}
                  </Text>
                }
              >
                <Text
                  weight={item.weight}
                  color="primary"
                  display="block"
                  className={`type-weight-specimen type-weight-specimen-${item.weight}`}
                  aria-label={`${item.label} specimen`}
                >
                  {sample}
                </Text>
              </ClotheslineRow>
            </VStack>
          );
        })}
      </VStack>
    </ClotheslineLeaf>
  );
}
