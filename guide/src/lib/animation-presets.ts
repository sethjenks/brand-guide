/**
 * Shell-owned motion demo choreography. Brands author titles/bodies in
 * brand.md; unknown ids render copy without a demo.
 */

export const PERSONALITY_PRESET_IDS = [
  "drift",
  "punch",
  "elastic",
  "editorial",
] as const;

export type PersonalityPresetId = (typeof PERSONALITY_PRESET_IDS)[number];

export type PersonalityCurve = {
  duration: number;
  ease: [number, number, number, number];
};

export const PERSONALITY_CURVES: Record<PersonalityPresetId, PersonalityCurve> =
  {
    drift: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    punch: { duration: 0.32, ease: [0.7, 0, 0.15, 1] },
    elastic: { duration: 0.72, ease: [0.34, 1.56, 0.64, 1] },
    editorial: { duration: 1.15, ease: [0.4, 0, 0.2, 1] },
  };

export const ARCHETYPE_PRESET_IDS = [
  "enter",
  "move",
  "glide",
  "push",
  "pan",
] as const;

export type ArchetypePresetId = (typeof ARCHETYPE_PRESET_IDS)[number];

export type ArchetypePreset =
  | { kind: "enter"; y: number; duration: number }
  | { kind: "move"; x: number; duration: number }
  | { kind: "glide"; duration: number }
  | { kind: "push"; duration: number }
  | { kind: "pan"; x: number; duration: number };

export const ARCHETYPE_PRESETS: Record<ArchetypePresetId, ArchetypePreset> = {
  enter: { kind: "enter", y: 18, duration: 0.55 },
  move: { kind: "move", x: 70, duration: 0.6 },
  glide: { kind: "glide", duration: 2.4 },
  push: { kind: "push", duration: 0.5 },
  pan: { kind: "pan", x: -30, duration: 1.4 },
};

export const INTERACTION_PRESET_IDS = [
  "exchange",
  "carousel",
  "toggle",
  "reveal",
  "accordion",
  "tabs",
  "modal",
  "toast",
] as const;

export type InteractionPresetId = (typeof INTERACTION_PRESET_IDS)[number];

export function isPersonalityPresetId(id: string): id is PersonalityPresetId {
  return (PERSONALITY_PRESET_IDS as readonly string[]).includes(id);
}

export function isArchetypePresetId(id: string): id is ArchetypePresetId {
  return (ARCHETYPE_PRESET_IDS as readonly string[]).includes(id);
}

export function isInteractionPresetId(id: string): id is InteractionPresetId {
  return (INTERACTION_PRESET_IDS as readonly string[]).includes(id);
}

export function personalityCurve(id: string): PersonalityCurve | null {
  if (!isPersonalityPresetId(id)) return null;
  return PERSONALITY_CURVES[id];
}
