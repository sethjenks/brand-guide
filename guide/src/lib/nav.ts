import type { NavGroup, NavItem } from "@/lib/brand-types";

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
      { id: "typography-primary", label: "Primary typeface" },
      { id: "typography-supporting", label: "Supporting typeface" },
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
    ],
  },
] as const satisfies readonly NavGroup[];

/** Shell-owned chapter openers — TOC entries derived from GUIDE_NAV. */
export const GUIDE_CHAPTERS: readonly ChapterTocEntry[] =
  GUIDE_NAV.map(chapterFromGroup);

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
