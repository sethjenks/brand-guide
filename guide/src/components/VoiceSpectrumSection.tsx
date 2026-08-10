import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { VoiceSpectrumTable } from "@/components/VoiceSpectrumTable";
import type { VoiceSpectrumRow } from "@/lib/brand-types";
import type { SectionStatus } from "@/lib/section-status-ui";
import "@/styles/flourish/voice-spectrum.css";

type VoiceSpectrumSectionProps = {
  id?: string;
  intro: string;
  rows: readonly VoiceSpectrumRow[];
  status?: SectionStatus;
};

/**
 * Language → Voice spectrum leaf: clothesline intro + tracks, then Notes clothesline.
 */
export function VoiceSpectrumSection({
  id = "language-spectrum",
  intro,
  rows,
  status,
}: VoiceSpectrumSectionProps) {
  if (!intro && rows.length === 0) return null;

  const notes = rows.filter((row) => row.notes);

  return (
    <ClotheslineLeaf
      id={id}
      title="Voice spectrum"
      intro={intro || undefined}
      status={status}
      className="clothesline-grid-section voice-spectrum-section"
      headerContent={<VoiceSpectrumTable rows={rows} />}
    >
      {notes.length > 0 ? (
        <Clothesline
          title={
            <Heading level={4} className="clothesline-title">
              Notes
            </Heading>
          }
          aria-label="Voice spectrum notes"
        >
          <VStack gap={6} role="list" className="voice-spectrum-notes">
            {notes.map((row) => (
              <VStack
                key={`note-${row.id}`}
                gap={1}
                className="voice-spectrum-note"
                role="listitem"
              >
                <Text weight="bold" color="primary" display="block">
                  {row.label}
                </Text>
                <Text
                  color="primary"
                  as="p"
                  display="block"
                  className="measure"
                >
                  {row.notes}
                </Text>
              </VStack>
            ))}
          </VStack>
        </Clothesline>
      ) : null}
    </ClotheslineLeaf>
  );
}
