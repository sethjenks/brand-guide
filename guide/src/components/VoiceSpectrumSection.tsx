import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Clothesline } from "@/components/Clothesline";
import { VoiceSpectrumTable } from "@/components/VoiceSpectrumTable";
import type { VoiceSpectrumRow } from "@/lib/brand-types";

type VoiceSpectrumSectionProps = {
  id?: string;
  intro: string;
  rows: readonly VoiceSpectrumRow[];
};

/**
 * Language → Voice spectrum leaf: clothesline intro + tracks, then Notes clothesline.
 */
export function VoiceSpectrumSection({
  id = "language-spectrum",
  intro,
  rows,
}: VoiceSpectrumSectionProps) {
  if (!intro && rows.length === 0) return null;

  const notes = rows.filter((row) => row.notes);

  return (
    <VStack
      as="section"
      id={id}
      gap={8}
      className="block subsection clothesline-grid-section voice-spectrum-section"
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            Voice spectrum
          </Heading>
        }
      >
        <VStack gap={8}>
          {intro ? (
            <Text
              type="large"
              weight="semibold"
              color="primary"
              as="p"
              display="block"
              className="measure clothesline-grid-intro"
            >
              {intro}
            </Text>
          ) : null}

          <VoiceSpectrumTable rows={rows} />
        </VStack>
      </Clothesline>

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
    </VStack>
  );
}
