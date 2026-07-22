import type { NavGroup } from "@/lib/brand-types";

/** Shell-owned nav — not brand-edited, so upstream can add sections without merge fights. */
export const GUIDE_NAV = [
  {
    id: "what-to-say",
    label: "What to say",
    items: [
      {
        id: "vision",
        label: "Vision",
        children: [
          { id: "vision-overview", label: "Overview" },
          { id: "vision-frame", label: "Problem frame" },
        ],
      },
      {
        id: "core-message",
        label: "Core Message",
        children: [
          { id: "core-mission", label: "Mission" },
          { id: "core-purpose", label: "Purpose" },
          { id: "core-position", label: "Position" },
          { id: "core-promise", label: "Promise" },
        ],
      },
      { id: "pillars", label: "Message Pillars" },
      { id: "archetype", label: "Archetype" },
      { id: "personality", label: "Personality" },
      { id: "guardrails", label: "Guardrails" },
      {
        id: "voice",
        label: "Voice & Tone",
        children: [
          { id: "voice-identity", label: "Identity" },
          { id: "voice-phrases", label: "Phrases" },
          { id: "voice-rules", label: "Tonal rules" },
          { id: "voice-context", label: "By context" },
        ],
      },
    ],
  },
  {
    id: "how-to-say-it",
    label: "How to say it",
    items: [
      {
        id: "colors",
        label: "Colors",
        children: [
          { id: "colors-brand", label: "Brand colors" },
          { id: "colors-secondary", label: "Secondary colors" },
          { id: "colors-interface", label: "Interface colors" },
        ],
      },
      {
        id: "typography",
        label: "Typography",
        children: [
          { id: "type-faces", label: "Typefaces" },
          { id: "type-scale", label: "Scale" },
        ],
      },
      {
        id: "wordmark",
        label: "Wordmark",
        children: [
          { id: "wordmark-usage", label: "Usage" },
          { id: "wordmark-donts", label: "Don’ts" },
        ],
      },
      {
        id: "imagery",
        label: "Imagery",
        children: [
          { id: "imagery-direction", label: "Direction" },
          { id: "imagery-avoid", label: "Avoid" },
        ],
      },
    ],
  },
  {
    id: "where-to-say-it",
    label: "Where to say it",
    items: [
      { id: "expression-web", label: "Web" },
      { id: "expression-social", label: "Social" },
      { id: "expression-print", label: "Print" },
    ],
  },
] as const satisfies readonly NavGroup[];

export function flattenNavSectionIds(groups: readonly NavGroup[]): string[] {
  const ids: string[] = [];
  for (const group of groups) {
    for (const item of group.items) {
      ids.push(item.id);
      if (item.children) {
        for (const child of item.children) {
          ids.push(child.id);
        }
      }
    }
  }
  return ids;
}
