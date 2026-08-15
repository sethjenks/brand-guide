/**
 * Per GUIDE_NAV leaf customization status.
 * Hybrid: auto from completeness + UI stubs/placeholders, then setup.sectionStatus overrides.
 */

import type { BrandCompleteness, FieldGapStatus } from "@/lib/brand-completeness";
import type {
  BrandGuideViewModel,
  BrandSetupSectionStatus,
  NavGroup,
  NavItem,
} from "@/lib/brand-types";
import { GUIDE_NAV } from "@/lib/nav";
import {
  type ChapterStatusAggregate,
  type ResolvedSectionStatus,
  type SectionStatus,
  worse,
} from "@/lib/section-status-ui";
import fs from "node:fs";
import path from "node:path";

export type {
  ChapterStatusAggregate,
  ResolvedSectionStatus,
  SectionStatus,
  SectionStatusMap,
} from "@/lib/section-status-ui";
export {
  sectionNeedsWork,
  sectionStatusBadgeLabel,
  sectionStatusNavLabel,
  worse,
} from "@/lib/section-status-ui";

/** Structural stubs in page.tsx (SectionStub). */
const UI_STUB_IDS = new Set([
  "logo-supporting",
  "typography-setting",
  "typography-testing",
  "color-proportion",
  "system-grid",
]);

/**
 * Leaves that still use placeholder specimens / empty stages in the shell
 * (copy may be present; visuals are not customized yet).
 */
const ASSET_PLACEHOLDER_IDS = new Set([
  "color-donts",
  "photography-donts",
  "photography-categories",
  "photography-category-subjects",
  "photography-category-settings",
  "photography-category-product",
  "photography-category-moments",
  "system-composition",
  "system-supporting",
  "logo-scaling",
  "logo-clearspace",
  "logo-donts",
  "logo-background",
  "logo-use",
]);

/**
 * Completeness field path → GUIDE_NAV leaf id(s).
 * First matching prefix wins when resolving a field.
 */
const FIELD_PATH_TO_LEAVES: readonly { prefix: string; leaves: readonly string[] }[] =
  [
    { prefix: "strategy.audience", leaves: ["strategy-audience"] },
    { prefix: "strategy.positioning", leaves: ["strategy-positioning"] },
    { prefix: "strategy.vision", leaves: ["strategy-vision"] },
    { prefix: "strategy.mission", leaves: ["strategy-mission"] },
    { prefix: "strategy.promise.mission", leaves: ["strategy-mission"] },
    { prefix: "strategy.promise.position", leaves: ["strategy-positioning"] },
    { prefix: "strategy.promise", leaves: ["strategy-introduction"] },
    { prefix: "strategy.pillars", leaves: ["strategy-pillars"] },
    { prefix: "strategy.archetype", leaves: ["strategy-archetype"] },
    { prefix: "strategy.personality", leaves: ["strategy-personality"] },
    { prefix: "strategy.guardrails", leaves: ["strategy-guardrails"] },
    { prefix: "strategy.values", leaves: ["strategy-values"] },
    { prefix: "strategy.overview", leaves: ["strategy-introduction"] },
    { prefix: "strategy.actLabel", leaves: ["strategy-introduction"] },
    { prefix: "name", leaves: ["strategy-introduction"] },
    { prefix: "tagline", leaves: ["language-tagline", "strategy-introduction"] },

    { prefix: "voice.principles", leaves: ["language-principles"] },
    { prefix: "voice.tagline", leaves: ["language-tagline"] },
    { prefix: "voice.story", leaves: ["language-story"] },
    { prefix: "voice.headlines", leaves: ["language-headlines"] },
    { prefix: "voice.cta", leaves: ["language-cta"] },
    { prefix: "voice.phrases", leaves: ["language-phrases"] },
    { prefix: "voice.weSay", leaves: ["language-we-say"] },
    { prefix: "voice.andYet", leaves: ["language-and-yet"] },
    { prefix: "voice.contexts", leaves: ["language-context"] },
    { prefix: "voice.spectrum", leaves: ["language-spectrum"] },
    {
      prefix: "voice.",
      leaves: ["language-introduction"],
    },

    {
      prefix: "visual.logo",
      leaves: ["logo-introduction", "logo-mark"],
    },
    {
      prefix: "visual.typography",
      leaves: [
        "typography-introduction",
        "typography-display",
        "typography-primary",
        "typography-mono",
      ],
    },
    {
      prefix: "visual.imagery",
      leaves: ["photography-introduction", "photography-principles"],
    },
    {
      prefix: "visual.colors",
      leaves: ["color-introduction", "color-primary"],
    },
    { prefix: "visual.actLabel", leaves: ["logo-introduction"] },

    { prefix: "animation.introduction", leaves: ["animation-introduction"] },
    { prefix: "animation.principles", leaves: ["animation-principles"] },
    { prefix: "animation.personality", leaves: ["animation-personality"] },
    { prefix: "animation.archetypes", leaves: ["animation-archetypes"] },
    { prefix: "animation.interactions", leaves: ["animation-interactions"] },
    { prefix: "animation.donts", leaves: ["animation-donts"] },
  ];

function fieldStatusToSection(status: FieldGapStatus): SectionStatus {
  switch (status) {
    case "ok":
      return "ok";
    case "empty":
      return "empty";
    case "stub":
      return "stub";
    case "sample":
      return "sample";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

function leavesForFieldPath(pathKey: string): readonly string[] {
  for (const row of FIELD_PATH_TO_LEAVES) {
    if (pathKey === row.prefix || pathKey.startsWith(row.prefix)) {
      return row.leaves;
    }
  }
  return [];
}

function normalizeChannelKey(label: string): string {
  return label.trim().toLowerCase();
}

/** Map expression channel labels onto applications-* nav ids. */
function expressionChannelToAppId(channel: string): string | null {
  const key = normalizeChannelKey(channel);
  if (!key) return null;
  // Known + slug — always have an id (adaptive leaves).
  if (key === "web") return "applications-web";
  if (key === "social") return "applications-social";
  if (key === "print" || key.startsWith("print")) return "applications-print";
  if (key === "swag" || key === "merchandise") return "applications-merchandise";
  if (key === "business cards" || key === "business-cards" || key === "business card") {
    return "applications-business-cards";
  }
  if (key === "packaging") return "applications-packaging";
  if (key === "signage") return "applications-signage";
  if (key === "presentation") return "applications-presentation";
  if (key === "out of home" || key === "ooh") return "applications-ooh";
  if (key === "digital ads" || key === "digital-ads") {
    return "applications-digital-ads";
  }
  if (key === "app") return "applications-app";
  if (key === "email") return "applications-email";
  return `applications-${key.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "channel"}`;
}

function appIdsFromNav(groups: readonly NavGroup[]): string[] {
  const apps = groups.find((g) => g.id === "applications");
  if (!apps) return [];
  return apps.items.map((i) => i.id);
}

function logoAssetExists(brandRoot: string): boolean {
  return (
    fs.existsSync(path.join(brandRoot, "brand/assets/logo.svg")) ||
    fs.existsSync(path.join(brandRoot, "guide/public/brand/logo.svg"))
  );
}

function applyOverride(
  current: SectionStatus,
  override: BrandSetupSectionStatus | undefined,
): SectionStatus {
  if (override === undefined) return current;
  if (override === "ok") return "ok";
  if (override === "needs-work") return "empty";
  return override;
}

function collectLeafIds(groups: readonly NavGroup[]): string[] {
  const ids: string[] = [];
  for (const group of groups) {
    for (const item of group.items) {
      ids.push(item.id);
      if (item.children) {
        for (const child of item.children) ids.push(child.id);
      }
    }
  }
  return ids;
}

/**
 * Resolve per-leaf customization status for nav + section headers.
 */
export function resolveSectionStatus(
  brand: BrandGuideViewModel,
  completeness: BrandCompleteness,
  options?: { brandRoot?: string },
): ResolvedSectionStatus {
  const byId: Record<string, SectionStatus> = {};
  const nav = brand.nav.length > 0 ? brand.nav : GUIDE_NAV;
  const leafIds = collectLeafIds(nav);
  for (const id of leafIds) {
    byId[id] = "ok";
  }

  const bump = (id: string, status: SectionStatus) => {
    if (!(id in byId)) return;
    byId[id] = worse(byId[id], status);
  };

  // 1) Completeness field rollup — mixed ok/sample + empty/stub → partial
  const leafMix = new Map<string, { progress: boolean; gap: boolean }>();
  const noteMix = (id: string, kind: "progress" | "gap") => {
    const cur = leafMix.get(id) ?? { progress: false, gap: false };
    if (kind === "progress") cur.progress = true;
    else cur.gap = true;
    leafMix.set(id, cur);
  };

  for (const section of completeness.sections) {
    for (const field of section.fields) {
      if (field.path.startsWith("expressions")) continue;
      const leaves = leavesForFieldPath(field.path);
      if (leaves.length === 0) continue;
      const isProgress = field.status === "ok" || field.status === "sample";
      for (const leaf of leaves) {
        if (isProgress) {
          noteMix(leaf, "progress");
          if (field.status === "sample") bump(leaf, "sample");
        } else {
          noteMix(leaf, "gap");
          bump(leaf, fieldStatusToSection(field.status));
        }
      }
    }
  }
  for (const [id, flags] of leafMix) {
    if (flags.progress && flags.gap && id in byId) {
      byId[id] = "partial";
    }
  }

  // 2) UI stubs
  for (const id of UI_STUB_IDS) {
    bump(id, "stub");
  }

  // 3) Asset placeholders
  for (const id of ASSET_PLACEHOLDER_IDS) {
    bump(id, "assets");
  }

  // Logo mark/scaling/clearspace: only "assets" when a real SVG exists but UI still uses text wordmark
  const root =
    options?.brandRoot ??
    path.resolve(process.cwd(), process.cwd().endsWith("guide") ? ".." : ".");
  if (logoAssetExists(root)) {
    bump("logo-mark", "assets");
    bump("logo-scaling", "assets");
    bump("logo-clearspace", "assets");
    bump("logo-donts", "assets");
  }

  // 5) Applications: no expression channel match → empty
  const matchedAppIds = new Set<string>();
  for (const item of brand.expressions.items) {
    const appId = expressionChannelToAppId(item.channel);
    if (appId) {
      matchedAppIds.add(appId);
      const hasTitle = Boolean(item.title.trim());
      const hasCopy = Boolean(item.copy.trim());
      if (!hasTitle && !hasCopy) {
        bump(appId, "empty");
      } else if (!hasTitle || !hasCopy) {
        bump(appId, "partial");
      }
    }
  }
  for (const appId of appIdsFromNav(nav)) {
    if (!matchedAppIds.has(appId)) {
      bump(appId, "empty");
    }
  }

  // 6) Starter kit baseline: default download still needs customization everywhere
  // (except Utilities tools). Specific stub/empty/partial/assets signals stay worse.
  const isStarter =
    brand.setup.status === "starter" ||
    brand.name.trim().toLowerCase() === "sample brand";
  if (isStarter) {
    for (const id of Object.keys(byId)) {
      if (id.startsWith("utilities-")) continue;
      if (byId[id] === "ok") bump(id, "sample");
    }
  }

  // 7) setup.sectionStatus overrides
  const overrides = brand.setup.sectionStatus ?? {};
  for (const [id, override] of Object.entries(overrides)) {
    if (!(id in byId)) continue;
    byId[id] = applyOverride(byId[id], override);
  }

  // Chapter aggregates
  const chapters: ChapterStatusAggregate[] = nav.map((group) => {
    let needsWorkCount = 0;
    let worst: SectionStatus = "ok";
    for (const raw of group.items) {
      const item = raw as NavItem;
      const status = byId[item.id] ?? "ok";
      if (status !== "ok") {
        needsWorkCount += 1;
        worst = worse(worst, status);
      }
      for (const child of item.children ?? []) {
        const childStatus = byId[child.id] ?? "ok";
        if (childStatus !== "ok") {
          needsWorkCount += 1;
          worst = worse(worst, childStatus);
        }
      }
    }
    return { id: group.id, needsWorkCount, worst };
  });

  return { byId, chapters };
}
