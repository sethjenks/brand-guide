import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { SectionStatusShape } from "@/components/SectionStatusShape";
import type { SectionStatus } from "@/lib/section-status-ui";
import { sectionStatusBadgeLabel } from "@/lib/section-status-ui";

const KEY_ROWS: readonly {
  status: SectionStatus;
  detail: string;
}[] = [
  {
    status: "empty",
    detail: "Hollow ring — copy is missing for this leaf.",
  },
  {
    status: "stub",
    detail: "Filled square — structural placeholder still waiting on brand.md.",
  },
  {
    status: "sample",
    detail: "Hollow ring — Sample Brand / starter residue to replace.",
  },
  {
    status: "partial",
    detail:
      "Half-filled circle — some content is in place, but the section is not finished.",
  },
  {
    status: "assets",
    detail:
      "Triangle — copy may exist, but specimens or media are still placeholders.",
  },
];

/**
 * Legend body for status shapes (embed in Note / hero copy).
 * Labels match SectionStatusBadge.
 */
export function SectionStatusKey() {
  return (
    <VStack gap={3} width="100%" role="list" aria-label="Status icon key">
      <Text
        color="secondary"
        type="supporting"
        as="p"
        display="block"
        className="measure"
      >
        Marks in the sidebar and section titles show what still needs
        customization.
      </Text>
      {KEY_ROWS.map((row) => {
        const label = sectionStatusBadgeLabel(row.status);
        if (!label) return null;
        return (
          <div key={row.status} className="status-key-row" role="listitem">
            <SectionStatusShape status={row.status} size="md" />
            <VStack gap={0} align="start">
              <Text weight="semibold" color="primary" display="block">
                {label}
              </Text>
              <Text
                color="secondary"
                type="supporting"
                as="p"
                display="block"
                className="measure"
              >
                {row.detail}
              </Text>
            </VStack>
          </div>
        );
      })}
    </VStack>
  );
}
