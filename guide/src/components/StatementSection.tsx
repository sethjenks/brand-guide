import { Text } from "@astryxdesign/core/Text";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import type { SectionStatus } from "@/lib/section-status-ui";

type StatementSectionProps = {
  id: string;
  title: string;
  intro: string;
  statement: string;
  status?: SectionStatus;
};

/**
 * Leaf section: clothesline + large statement (Positioning, Vision, Mission).
 */
export function StatementSection({
  id,
  title,
  intro,
  statement,
  status,
}: StatementSectionProps) {
  if (!intro && !statement) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      intro={intro || undefined}
      status={status}
      className="statement-section"
      headerContent={
        statement ? (
          <Text
            type="display-2"
            weight="bold"
            color="primary"
            as="p"
            display="block"
            className="statement-display"
          >
            {statement}
          </Text>
        ) : undefined
      }
    />
  );
}
