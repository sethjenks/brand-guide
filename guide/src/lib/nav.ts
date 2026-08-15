import {
  EXTENDED_CHAPTER_IDS,
  type BrandSetupChapters,
  type ExtendedChapterId,
  type GuidePayload,
  type NavGroup,
  type NavItem,
} from "@/lib/brand-types";
import { applicationsNavFromExpressions } from "@/lib/application-channels";

export {
  CORE_CHAPTER_IDS,
  EXTENDED_CHAPTER_IDS,
} from "@/lib/brand-types";

/** Top-level product mode: Define (brand guide) vs Create (workspace). */
export type GuideMode = "define" | "create";

export type ChapterTocItem = {
  id: string;
  label: string;
};

export type ChapterTocEntry = {
  id: string;
  title: string;
  items: readonly ChapterTocItem[];
};

function chapterFromGroup(group: NavGroup): ChapterTocEntry {
  return {
    id: group.id,
    title: group.label,
    items: group.items.map((item: NavItem) => ({
      id: item.id,
      label: item.label,
    })),
  };
}

/** Shell-owned nav — not brand-edited, so upstream can add sections without merge fights. */
export const GUIDE_NAV = [
  {
    id: "strategy",
    label: "Strategy",
    items: [
      { id: "strategy-introduction", label: "Introduction" },
      { id: "strategy-audience", label: "Audience" },
      { id: "strategy-positioning", label: "Positioning" },
      { id: "strategy-vision", label: "Vision" },
      { id: "strategy-mission", label: "Mission" },
      { id: "strategy-values", label: "Values" },
      { id: "strategy-personality", label: "Personality" },
      { id: "strategy-archetype", label: "Archetype" },
      { id: "strategy-pillars", label: "Pillars" },
      { id: "strategy-guardrails", label: "Guardrails" },
    ],
  },
  {
    id: "language",
    label: "Language",
    items: [
      { id: "language-introduction", label: "Introduction" },
      { id: "language-principles", label: "Principles" },
      { id: "language-tagline", label: "Tagline" },
      { id: "language-story", label: "Story" },
      { id: "language-headlines", label: "Headlines" },
      { id: "language-cta", label: "Calls to action" },
      { id: "language-phrases", label: "Phrases" },
      { id: "language-we-say", label: "We say / never" },
      { id: "language-spectrum", label: "Voice spectrum" },
      { id: "language-and-yet", label: "And / Yet" },
      { id: "language-context", label: "By context" },
    ],
  },
  {
    id: "logo",
    label: "Logo",
    items: [
      { id: "logo-introduction", label: "Introduction" },
      { id: "logo-background", label: "Background" },
      { id: "logo-mark", label: "Logo" },
      { id: "logo-on-color", label: "On color" },
      { id: "logo-single-color", label: "Single color" },
      { id: "logo-scaling", label: "Scaling" },
      { id: "logo-clearspace", label: "Clearspace" },
      { id: "logo-supporting", label: "Supporting logo" },
      { id: "logo-use", label: "Logo use" },
      { id: "logo-donts", label: "Don’ts" },
    ],
  },
  {
    id: "typography",
    label: "Typography",
    items: [
      { id: "typography-introduction", label: "Introduction" },
      { id: "typography-background", label: "Background" },
      { id: "typography-display", label: "Display typeface" },
      { id: "typography-primary", label: "Primary typeface" },
      { id: "typography-mono", label: "Label typeface" },
      { id: "typography-weights", label: "Weights" },
      { id: "typography-specimen", label: "Specimen" },
      { id: "typography-setting", label: "Setting type" },
      { id: "typography-hierarchy", label: "Hierarchy" },
      { id: "typography-testing", label: "Testing type" },
      { id: "typography-principles", label: "Principles" },
      { id: "typography-donts", label: "Don’ts" },
    ],
  },
  {
    id: "color",
    label: "Color",
    items: [
      { id: "color-introduction", label: "Introduction" },
      { id: "color-primary", label: "Primary palette" },
      { id: "color-secondary", label: "Secondary palette" },
      { id: "color-interface", label: "Interface" },
      { id: "color-proportion", label: "Proportion" },
      { id: "color-combinations", label: "Combinations" },
      { id: "color-contrast", label: "Contrast" },
      { id: "color-donts", label: "Don’ts" },
    ],
  },
  {
    id: "photography",
    label: "Photography",
    items: [
      { id: "photography-introduction", label: "Introduction" },
      { id: "photography-categories", label: "Categories" },
      { id: "photography-category-subjects", label: "Subjects" },
      { id: "photography-category-settings", label: "Settings" },
      { id: "photography-category-product", label: "Product" },
      { id: "photography-category-moments", label: "Moments" },
      { id: "photography-principles", label: "Principles" },
      { id: "photography-donts", label: "Don’ts" },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      { id: "system-introduction", label: "Introduction" },
      { id: "system-grid", label: "Grid" },
      { id: "system-composition", label: "Composition" },
      { id: "system-supporting", label: "Supporting device" },
    ],
  },
  {
    id: "animation",
    label: "Animation",
    items: [
      { id: "animation-introduction", label: "Introduction" },
      { id: "animation-principles", label: "Principles" },
      { id: "animation-personality", label: "Personality" },
      { id: "animation-archetypes", label: "Archetypes" },
      { id: "animation-interactions", label: "Interactions" },
      { id: "animation-donts", label: "Don’ts" },
    ],
  },
  {
    id: "applications",
    label: "Applications",
    items: [
      { id: "applications-web", label: "Web" },
      { id: "applications-social", label: "Social" },
      { id: "applications-print", label: "Print" },
      { id: "applications-business-cards", label: "Business cards" },
      { id: "applications-merchandise", label: "Merchandise" },
      { id: "applications-packaging", label: "Packaging" },
      { id: "applications-signage", label: "Signage" },
      { id: "applications-presentation", label: "Presentation" },
      { id: "applications-ooh", label: "Out of home" },
      { id: "applications-digital-ads", label: "Digital ads" },
      { id: "applications-app", label: "App" },
      { id: "applications-email", label: "Email" },
    ],
  },
  {
    id: "utilities",
    label: "Utilities",
    items: [
      {
        id: "utilities-branding-questionnaire",
        label: "Branding Questionnaire",
      },
      { id: "utilities-brand-document", label: "Brand document" },
    ],
  },
] as const satisfies readonly NavGroup[];

/**
 * Scaffold nav for Create mode. Replace when the first tools are named —
 * do not invent a fake tool IA here.
 */
export const CREATE_NAV = [
  {
    id: "studio",
    label: "Studio",
    items: [{ id: "studio-overview", label: "Overview" }],
  },
] as const satisfies readonly NavGroup[];

/** Shell-owned chapter openers — TOC entries derived from GUIDE_NAV. */
export const GUIDE_CHAPTERS: readonly ChapterTocEntry[] =
  GUIDE_NAV.map(chapterFromGroup);

export function isExtendedChapterId(id: string): id is ExtendedChapterId {
  return (EXTENDED_CHAPTER_IDS as readonly string[]).includes(id);
}

/** Extended chapters default to on when omitted from setup.chapters. */
export function isExtendedChapterEnabled(
  chapters: BrandSetupChapters | undefined,
  id: ExtendedChapterId,
): boolean {
  return chapters?.[id] !== "off";
}

/** Drop Extended chapters set to `off` in brand/setup.json. Core always remains. */
export function filterNavForSetup(
  nav: readonly NavGroup[],
  chapters: BrandSetupChapters | undefined,
): NavGroup[] {
  return nav.filter((group) => {
    if (!isExtendedChapterId(group.id)) return true;
    return isExtendedChapterEnabled(chapters, group.id);
  });
}

/** Face fields used to hide unauthored Typography leaves. */
export type TypeFacesForNav = {
  display?: string;
  mono?: string;
};

/**
 * Drop Display / Label typeface leaves when those Visual faces are empty.
 * Primary always remains.
 */
export function filterNavForTypeFaces(
  nav: readonly NavGroup[],
  faces: TypeFacesForNav | undefined,
): NavGroup[] {
  const hideDisplay = !faces?.display?.trim();
  const hideMono = !faces?.mono?.trim();
  if (!hideDisplay && !hideMono) return [...nav];

  return nav.map((group) => {
    if (group.id !== "typography") return group;
    return {
      ...group,
      items: group.items.filter((item) => {
        if (item.id === "typography-display" && hideDisplay) return false;
        if (item.id === "typography-mono" && hideMono) return false;
        return true;
      }),
    };
  });
}

/**
 * Replace the Applications catalog with one leaf per authored expression row
 * (known ids + applications-<slug> for unknown channels).
 */
export function withApplicationsFromExpressions(
  nav: readonly NavGroup[],
  expressions: GuidePayload["expressions"] | undefined,
): NavGroup[] {
  const items = applicationsNavFromExpressions(expressions?.items ?? []);
  return nav.map((group) => {
    if (group.id !== "applications") return group;
    return { ...group, items };
  });
}

function nonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function nonEmptyList(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Drop leaves whose backing brand fields are empty.
 * Always-on cores: chapter intros, utilities, primary typeface, and leaves the
 * starter always fills. Prefer hiding over Sample stubs.
 */
export function filterNavForAuthoredLeaves(
  nav: readonly NavGroup[],
  brand: GuidePayload,
): NavGroup[] {
  const phrases = brand.voice?.phrases ?? [];
  const weSay = brand.voice?.weSay ?? [];
  const imagery = brand.visual?.imagery as
    | (GuidePayload["visual"]["imagery"] & {
        product?: string;
        moments?: string;
        avoid?: string | readonly string[];
      })
    | undefined;
  const colors = brand.visual?.colors as
    | (GuidePayload["visual"]["colors"] & {
        proportion?: string;
        donts?: readonly string[];
      })
    | undefined;
  const logo = brand.visual?.logo as
    | (GuidePayload["visual"]["logo"] & {
        clearspace?: string;
        supporting?: string;
      })
    | undefined;
  const system = (
    brand as GuidePayload & {
      system?: {
        intro?: string;
        grid?: string;
        composition?: string;
        supporting?: string;
        components?: readonly unknown[];
      };
    }
  ).system;

  const product = imagery?.product ?? "";
  const moments = imagery?.moments ?? "";
  const avoidList = Array.isArray(imagery?.avoid)
    ? imagery.avoid
    : nonEmptyString(imagery?.avoid)
      ? [String(imagery?.avoid)]
      : [];

  const proportion = colors?.proportion ?? "";
  const colorDonts = colors?.donts ?? [];
  const supportingLogo = logo?.supporting ?? "";

  return nav.map((group) => {
    if (group.id === "applications") {
      return group;
    }

    return {
      ...group,
      items: group.items.filter((item) => {
        switch (item.id) {
          case "language-phrases":
            return nonEmptyList(phrases);
          case "language-we-say":
            return nonEmptyList(weSay);
          case "logo-supporting":
            return nonEmptyString(supportingLogo);
          case "photography-category-product":
            return nonEmptyString(product);
          case "photography-category-moments":
            return nonEmptyString(moments);
          case "photography-donts":
            return nonEmptyList(avoidList);
          case "color-proportion":
            return nonEmptyString(proportion);
          case "color-donts":
            return nonEmptyList(colorDonts);
          case "color-secondary":
            return nonEmptyList(colors?.secondary);
          case "system-grid":
            return nonEmptyString(system?.grid);
          case "system-composition":
            return nonEmptyString(system?.composition);
          case "system-supporting":
            return nonEmptyString(system?.supporting);
          default:
            return true;
        }
      }),
    };
  });
}

export function flattenNavSectionIds(groups: readonly NavGroup[]): string[] {
  const ids: string[] = [];
  for (const group of groups) {
    ids.push(group.id);
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
