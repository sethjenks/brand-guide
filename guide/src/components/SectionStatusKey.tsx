import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { SectionStatusShape } from "@/components/SectionStatusShape";
import type { SectionStatus } from "@/lib/section-status-ui";

const KEY_ROWS: readonly {
  status: SectionStatus;
  label: string;
  detail: string;
}[] = [
  {
    status: "empty",
    label: "Needs attention",
    detail:
      "Empty circle — missing copy, stubs still waiting on brand.md, unmatched channels, or Sample Brand residue.",
  },
  {
    status: "partial",
    label: "Partial",
    detail:
      "Half-filled circle — some content is in place, but the section is not finished.",
  },
  {
    status: "assets",
    label: "Needs assets",
    detail:
      "Triangle — copy may exist, but specimens or media are still placeholders.",
  },
];

/**
 * Legend body for status shapes (embed in Note / hero copy).
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
      {KEY_ROWS.map((row) => (
        <div key={row.status} className="status-key-row" role="listitem">
          <SectionStatusShape status={row.status} size="md" />
          <VStack gap={0} align="start">
            <Text weight="semibold" color="primary" display="block">
              {row.label}
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
      ))}
    </VStack>
  );
}
