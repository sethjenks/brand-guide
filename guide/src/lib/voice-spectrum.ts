/** Shell-owned Brand Voice spectrum scales (5 steps each). */

export type VoiceSpectrumDimensionId =
  | "volume"
  | "energy"
  | "sociability"
  | "attitude";

export type VoiceSpectrumDimensionDef = {
  id: VoiceSpectrumDimensionId;
  label: string;
  steps: readonly [string, string, string, string, string];
};

export const VOICE_SPECTRUM_DIMENSIONS: readonly VoiceSpectrumDimensionDef[] = [
  {
    id: "volume",
    label: "Volume",
    steps: [
      "Whispers",
      "Inside voices",
      "Hanging out",
      "At the game",
      "Explosive",
    ],
  },
  {
    id: "energy",
    label: "Energy",
    steps: [
      "Monk-like",
      "Relaxed",
      "Going for a stroll",
      "Pumped",
      "Crazed",
    ],
  },
  {
    id: "sociability",
    label: "Sociability",
    steps: [
      "Lives alone",
      "Just in the family",
      "Friends & family",
      "Neighborhood",
      "Everyone's invited",
    ],
  },
  {
    id: "attitude",
    label: "Attitude",
    steps: [
      "Completely PC",
      "Traditional",
      "Opinionated when needed",
      "No filter",
      "Polarizing",
    ],
  },
] as const;

export function findSpectrumStepIndex(
  steps: readonly string[],
  label: string,
): number {
  const key = label.trim().toLowerCase();
  return steps.findIndex((s) => s.toLowerCase() === key);
}
