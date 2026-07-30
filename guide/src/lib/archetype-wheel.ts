/** Classic brand-archetype wheel — shell-owned geometry and color. */

export type ArchetypeMotive =
  | "spirituality"
  | "legacy"
  | "connection"
  | "structure";

export type ArchetypeId =
  | "innocent"
  | "sage"
  | "explorer"
  | "rebel"
  | "magician"
  | "hero"
  | "lover"
  | "jester"
  | "citizen"
  | "caregiver"
  | "ruler"
  | "creator";

export type ArchetypeSegment = {
  id: ArchetypeId;
  label: string;
  driver: string;
  motive: ArchetypeMotive;
  /** Outer / middle / motive fills when emphasized (aligned to reference wheel). */
  colors: {
    outer: string;
    /** Driver ring — soft tint of the archetype (reference uses light gray). */
    middle: string;
    motive: string;
    /** Text on the colored outer ring when active. */
    label: "light" | "dark";
  };
};

export type MotiveMeta = {
  id: ArchetypeMotive;
  label: string;
  /** Compact label for the inner SVG ring. */
  shortLabel: string;
  /** Short center-ring phrase from the reference wheel. */
  blurb: string;
  /** Slice indices on the wheel (0–11, clockwise from 12 o’clock). */
  startIndex: number;
};

/**
 * Clockwise from 12 o’clock:
 * Explore Spirituality → Leave Legacy → Pursue Connection → Provide Structure.
 * Palette aligned to the brand archetype wheel reference.
 */
export const ARCHETYPE_SEGMENTS: readonly ArchetypeSegment[] = [
  {
    id: "innocent",
    label: "Innocent",
    driver: "Safety",
    motive: "spirituality",
    colors: {
      outer: "#6BC8CE",
      middle: "#D8F0F2",
      motive: "#2F9B7A",
      label: "dark",
    },
  },
  {
    id: "sage",
    label: "Sage",
    driver: "Understanding",
    motive: "spirituality",
    colors: {
      outer: "#2E9B5F",
      middle: "#C8EBD6",
      motive: "#2F9B7A",
      label: "light",
    },
  },
  {
    id: "explorer",
    label: "Explorer",
    driver: "Freedom",
    motive: "spirituality",
    colors: {
      outer: "#A8C93A",
      middle: "#E8F2C4",
      motive: "#2F9B7A",
      label: "dark",
    },
  },
  {
    id: "rebel",
    label: "Outlaw",
    driver: "Liberation",
    motive: "legacy",
    colors: {
      outer: "#F0C41A",
      middle: "#FBF0B8",
      motive: "#E89B1C",
      label: "dark",
    },
  },
  {
    id: "magician",
    label: "Magician",
    driver: "Power",
    motive: "legacy",
    colors: {
      outer: "#E8912A",
      middle: "#F8DDB8",
      motive: "#E89B1C",
      label: "light",
    },
  },
  {
    id: "hero",
    label: "Hero",
    driver: "Mastery",
    motive: "legacy",
    colors: {
      outer: "#D14E24",
      middle: "#F5CDB8",
      motive: "#E89B1C",
      label: "light",
    },
  },
  {
    id: "lover",
    label: "Lover",
    driver: "Intimacy",
    motive: "connection",
    colors: {
      outer: "#E31B23",
      middle: "#F8C4C6",
      motive: "#C43A6B",
      label: "light",
    },
  },
  {
    id: "jester",
    label: "Jester",
    driver: "Enjoyment",
    motive: "connection",
    colors: {
      outer: "#E01B6E",
      middle: "#F7C4DA",
      motive: "#C43A6B",
      label: "light",
    },
  },
  {
    id: "citizen",
    label: "Everyman",
    driver: "Belonging",
    motive: "connection",
    colors: {
      outer: "#8B3A7E",
      middle: "#E5C8E0",
      motive: "#C43A6B",
      label: "light",
    },
  },
  {
    id: "caregiver",
    label: "Caregiver",
    driver: "Service",
    motive: "structure",
    colors: {
      outer: "#1B2F6B",
      middle: "#C5CEE8",
      motive: "#2B6BA8",
      label: "light",
    },
  },
  {
    id: "ruler",
    label: "Ruler",
    driver: "Control",
    motive: "structure",
    colors: {
      outer: "#1E5BB8",
      middle: "#C5D8F2",
      motive: "#2B6BA8",
      label: "light",
    },
  },
  {
    id: "creator",
    label: "Creator",
    driver: "Innovation",
    motive: "structure",
    colors: {
      outer: "#4BB8E8",
      middle: "#CDEBFA",
      motive: "#2B6BA8",
      label: "dark",
    },
  },
] as const;

export const ARCHETYPE_MOTIVES: readonly MotiveMeta[] = [
  {
    id: "spirituality",
    label: "Explore Spirituality",
    shortLabel: "Spirituality",
    blurb: "Yearn for paradise",
    startIndex: 0,
  },
  {
    id: "legacy",
    label: "Leave Legacy",
    shortLabel: "Legacy",
    blurb: "Leave a mark on the world",
    startIndex: 3,
  },
  {
    id: "connection",
    label: "Pursue Connection",
    shortLabel: "Connection",
    blurb: "Connect to others",
    startIndex: 6,
  },
  {
    id: "structure",
    label: "Provide Structure",
    shortLabel: "Structure",
    blurb: "Provide structure to the world",
    startIndex: 9,
  },
] as const;

/** Neutral (undecided) fills — grayscale ink steps. */
export const ARCHETYPE_NEUTRAL = {
  outer: "color-mix(in srgb, var(--color-ink) 42%, var(--color-paper))",
  middle: "color-mix(in srgb, var(--color-ink) 18%, var(--color-paper))",
  motive: "color-mix(in srgb, var(--color-ink) 12%, var(--color-paper))",
  text: "var(--color-ink-muted)",
  textActive: "var(--color-paper)",
} as const;

/**
 * Map brand archetype names (and common aliases) onto wheel segment ids.
 * Unrecognized names leave the wheel fully neutral.
 */
const ARCHETYPE_ALIASES: Record<string, ArchetypeId> = {
  innocent: "innocent",
  sage: "sage",
  explorer: "explorer",
  hero: "hero",
  magician: "magician",
  rebel: "rebel",
  outlaw: "rebel",
  maverick: "rebel",
  revolutionary: "rebel",
  lover: "lover",
  jester: "jester",
  citizen: "citizen",
  everyman: "citizen",
  regular: "citizen",
  "regular guy": "citizen",
  "regular girl": "citizen",
  ruler: "ruler",
  caregiver: "caregiver",
  creator: "creator",
  // Starter Sample Brand custom name → closest classic
  editor: "sage",
};

export function resolveArchetypeIds(
  names: readonly string[] | string | null | undefined,
): ArchetypeId[] {
  const list = Array.isArray(names)
    ? names
    : names
      ? [names]
      : [];

  const resolved: ArchetypeId[] = [];
  for (const raw of list) {
    const key = raw
      .replace(/^the\s+/i, "")
      .split(/\s+[—–-]/)[0]
      .trim()
      .toLowerCase();
    const id = ARCHETYPE_ALIASES[key];
    if (id && !resolved.includes(id)) resolved.push(id);
  }
  return resolved;
}
