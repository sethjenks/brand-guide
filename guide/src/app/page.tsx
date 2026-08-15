import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties, ReactNode } from "react";
import fs from "node:fs";
import path from "node:path";
import { AgentLabel } from "@/components/AgentLabel";
import { AndYetSection } from "@/components/AndYetSection";
import { AppShell } from "@/components/AppShell";
import { ArchetypeExplorer } from "@/components/ArchetypeExplorer";
import { AudienceSection } from "@/components/AudienceSection";
import { BrandDocument } from "@/components/BrandDocument";
import { BrandingQuestionnaire } from "@/components/BrandingQuestionnaire";
import { ChapterSection } from "@/components/ChapterSection";
import { Clothesline } from "@/components/Clothesline";
import { ClotheslineGrid } from "@/components/ClotheslineGrid";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import {
  ColorCombinations,
  type ColorCombinationItem,
} from "@/components/ColorCombinations";
import {
  ColorContrastGrid,
  type ColorContrastItem,
} from "@/components/ColorContrastGrid";
import { ColorPaletteSection } from "@/components/ColorPaletteSection";
import { ColorTiles, type ColorTileItem } from "@/components/ColorTiles";
import { ContextSection } from "@/components/ContextSection";
import { CopySnippet } from "@/components/CopySnippet";
import { CopyValue } from "@/components/CopyValue";
import { CtaSection } from "@/components/CtaSection";
import { DoDontColumns } from "@/components/DoDontColumns";
import { GraphicStatement } from "@/components/GraphicStatement";
import { GuideColumn } from "@/components/GuideColumn";
import { GuideHero } from "@/components/GuideHero";
import { GuardrailsSection } from "@/components/GuardrailsSection";
import { HeadlinesSection } from "@/components/HeadlinesSection";
import { AssetStage } from "@/components/AssetStage";
import { DontGrid, type DontGridItem } from "@/components/DontGrid";
import { EmptyMedia } from "@/components/EmptyMedia";
import { ImageGrid, type ImageGridItem } from "@/components/ImageGrid";
import { LabeledField } from "@/components/LabeledField";
import {
  PhotographyCategoriesSection,
  type PhotographyCategoryNavItem,
} from "@/components/PhotographyCategoriesSection";
import { PhotographyCategorySection } from "@/components/PhotographyCategorySection";
import { LogoAssetSection } from "@/components/LogoAssetSection";
import { LogoUseItem } from "@/components/LogoUseItem";
import { AnimationArchetypesSection } from "@/components/AnimationArchetypesSection";
import { AnimationInteractionsSection } from "@/components/AnimationInteractionsSection";
import { AnimationPersonalitySection } from "@/components/AnimationPersonalitySection";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { ScaleStack, type ScaleStackStep } from "@/components/ScaleStack";
import { SectionStub } from "@/components/SectionStub";
import { SectionStatusKey } from "@/components/SectionStatusKey";
import { SetupSourceCard } from "@/components/SetupSourceCard";
import { SetupHeroBody } from "@/components/SetupHeroBody";
import { StatementSection } from "@/components/StatementSection";
import { StorySection } from "@/components/StorySection";
import { TypefaceSection } from "@/components/TypefaceSection";
import {
  TypeHierarchySection,
  type TypeHierarchyLevel,
} from "@/components/TypeHierarchySection";
import {
  TypePrinciplesSection,
  type TypePrincipleItem,
} from "@/components/TypePrinciplesSection";
import { TypeSpecimenSection } from "@/components/TypeSpecimenSection";
import {
  TypeWeightsSection,
  type TypeWeightItem,
} from "@/components/TypeWeightsSection";
import { VoiceSpectrumSection } from "@/components/VoiceSpectrumSection";
import { applicationChannelToLeafId } from "@/lib/application-channels";
import { loadBrand, type ColorSwatch } from "@/lib/load-brand";
import type { SetupIntakeSource } from "@/lib/brand-types";
import { assessBrandCompleteness } from "@/lib/brand-completeness";
import { sectionLeafStyle } from "@/lib/section-leaf";
import { resolveSectionStatus } from "@/lib/section-status";
import type { SectionStatus } from "@/lib/section-status-ui";
import { flattenNavSectionIds, GUIDE_CHAPTERS } from "@/lib/nav";
import { splitList } from "@/lib/split-list";
import { brandThemeInput } from "@/themes/brand.generated";
import "@/styles/flourish/hero.css";
import "@/styles/flourish/logo-collage.css";
import "@/styles/flourish/type-principles.css";
import "@/styles/flourish/type-treatment.css";

/** Suggested stacks when compiled theme input omits optional faces. */
const DISPLAY_STACK = "var(--font-serif), Georgia, serif";
const PRIMARY_STACK = "var(--font-sans), system-ui, sans-serif";
const MONO_STACK = "var(--font-mono), ui-monospace, monospace";

/** Strip a trailing " — role" suffix from Visual face labels. */
function shortFaceName(raw: string | undefined): string {
  const trimmed = raw?.trim() ?? "";
  if (!trimmed) return "";
  const dash = trimmed.indexOf(" — ");
  return dash === -1 ? trimmed : trimmed.slice(0, dash).trim();
}

function compiledFontSans(): string {
  return brandThemeInput.fontSans || PRIMARY_STACK;
}

function compiledFontSerif(): string {
  if (
    "fontSerif" in brandThemeInput &&
    typeof brandThemeInput.fontSerif === "string" &&
    brandThemeInput.fontSerif.trim()
  ) {
    return brandThemeInput.fontSerif;
  }
  return DISPLAY_STACK;
}

function compiledFontMono(): string {
  if (
    "fontMono" in brandThemeInput &&
    typeof brandThemeInput.fontMono === "string" &&
    brandThemeInput.fontMono.trim()
  ) {
    return brandThemeInput.fontMono;
  }
  return MONO_STACK;
}

function toColorTiles(colors: readonly ColorSwatch[]): ColorTileItem[] {
  return colors.map((color) => ({
    id: color.token,
    name: color.name,
    value: color.value,
  }));
}

function colorValue(
  colors: readonly ColorSwatch[],
  name: string,
  fallback: string,
): string {
  return colors.find((c) => c.name === name)?.value ?? fallback;
}

/** Prefer exact name, then token suffix, then name/token heuristics. */
function resolveSwatchValue(
  pools: readonly (readonly ColorSwatch[])[],
  opts: {
    names?: readonly string[];
    tokenEndsWith?: readonly string[];
    nameIncludes?: readonly string[];
    fallback: string;
  },
): string {
  const flat = pools.flat();
  for (const name of opts.names ?? []) {
    const hit = flat.find(
      (c) => c.name.toLowerCase() === name.toLowerCase(),
    );
    if (hit) return hit.value;
  }
  for (const suffix of opts.tokenEndsWith ?? []) {
    const needle = suffix.toLowerCase();
    const hit = flat.find((c) => c.token.toLowerCase().endsWith(needle));
    if (hit) return hit.value;
  }
  for (const part of opts.nameIncludes ?? []) {
    const needle = part.toLowerCase();
    const hit = flat.find(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.token.toLowerCase().includes(needle),
    );
    if (hit) return hit.value;
  }
  return opts.fallback;
}

function resolvePaper(
  brand: readonly ColorSwatch[],
  iface: readonly ColorSwatch[],
): string {
  return resolveSwatchValue([brand, iface], {
    names: ["Paper"],
    tokenEndsWith: ["paper"],
    nameIncludes: ["paper"],
    fallback: "var(--color-background-surface)",
  });
}

function resolveInk(
  brand: readonly ColorSwatch[],
  secondary: readonly ColorSwatch[] = [],
): string {
  return resolveSwatchValue([brand, secondary], {
    names: ["Ink"],
    tokenEndsWith: ["ink"],
    nameIncludes: ["ink"],
    fallback: "var(--color-text-primary)",
  });
}

function resolveSurface(iface: readonly ColorSwatch[]): string {
  return resolveSwatchValue([iface], {
    names: ["Surface"],
    tokenEndsWith: ["surface"],
    nameIncludes: ["surface", "mist", "muted"],
    fallback: "var(--color-background-card)",
  });
}

function resolveMuted(
  secondary: readonly ColorSwatch[],
  iface: readonly ColorSwatch[],
): string {
  return resolveSwatchValue([secondary, iface], {
    names: ["Ink Muted", "Muted"],
    tokenEndsWith: ["muted", "secondary"],
    nameIncludes: ["muted", "mist"],
    fallback: "var(--color-text-secondary)",
  });
}

function resolveMidContrast(iface: readonly ColorSwatch[]): string {
  return resolveSwatchValue([iface], {
    names: ["Border"],
    tokenEndsWith: ["border"],
    nameIncludes: ["border", "mid", "gray"],
    fallback: "var(--color-border)",
  });
}

function resolveFieldWash(iface: readonly ColorSwatch[]): string {
  return resolveSwatchValue([iface], {
    names: ["Mist", "Surface"],
    tokenEndsWith: ["mist", "muted"],
    nameIncludes: ["mist", "muted", "surface", "wash"],
    fallback: "var(--color-background-muted)",
  });
}

/** Approved pairs for the Combinations diagram (outer field + inset). */
function colorCombinationItems(colors: {
  brand: readonly ColorSwatch[];
  secondary: readonly ColorSwatch[];
  interface: readonly ColorSwatch[];
}): ColorCombinationItem[] {
  const ink = resolveInk(colors.brand, colors.secondary);
  const paper = resolvePaper(colors.brand, colors.interface);
  const surface = resolveSurface(colors.interface);
  const muted = resolveMuted(colors.secondary, colors.interface);

  return [
    { id: "paper-ink", outer: paper, inner: ink },
    { id: "surface-muted", outer: surface, inner: muted },
    { id: "muted-surface", outer: muted, inner: surface },
    { id: "ink-paper", outer: ink, inner: paper },
  ];
}

/** Do / don’t contrast specimens (field + split bar). */
function colorContrastItems(colors: {
  brand: readonly ColorSwatch[];
  secondary: readonly ColorSwatch[];
  interface: readonly ColorSwatch[];
}): ColorContrastItem[] {
  const ink = resolveInk(colors.brand, colors.secondary);
  const paper = resolvePaper(colors.brand, colors.interface);
  const surface = resolveSurface(colors.interface);
  const field = resolveFieldWash(colors.interface);
  const mid = resolveMidContrast(colors.interface);
  const muted = resolveMuted(colors.secondary, colors.interface);

  return [
    {
      id: "contrast-light-do",
      background: field,
      left: ink,
      right: mid,
      caption: "Always do this",
      chipTone: "dark",
      chipLabel: "UI",
    },
    {
      id: "contrast-light-dont",
      background: field,
      left: paper,
      right: surface,
      caption: "Don’t do this",
      struck: true,
      chipTone: "dark",
      chipLabel: "UI",
    },
    {
      id: "contrast-dark-do",
      background: ink,
      left: paper,
      right: mid,
      caption: "Always do this",
      chipTone: "light",
      chipLabel: "UI",
    },
    {
      id: "contrast-dark-dont",
      background: ink,
      left: muted,
      right: mid,
      caption: "Don’t do this",
      struck: true,
      chipTone: "light",
      chipLabel: "UI",
    },
  ];
}

/** Designated brand weights — one row set per authored face role. */
function typeWeightItems(
  roles: readonly {
    id: string;
    family: string;
    fontFamily: string;
    fontStyle?: string;
  }[],
): TypeWeightItem[] {
  const cuts: {
    suffix: string;
    weight: TypeWeightItem["weight"];
  }[] = [
    { suffix: "Semibold", weight: "semibold" },
    { suffix: "Medium", weight: "medium" },
    { suffix: "Regular", weight: "normal" },
  ];

  return roles.flatMap((role) =>
    cuts.map((cut) => ({
      id: `weight-${role.id}-${cut.weight}`,
      label: `${role.family} ${cut.suffix}`,
      weight: cut.weight,
      fontFamily: role.fontFamily,
      fontStyle: role.fontStyle,
    })),
  );
}

/** Typesetting principles — live do/don’t specimens (swap for assets later). */
function typePrincipleItems(): TypePrincipleItem[] {
  return [
    {
      id: "principle-margins",
      description:
        "Keep type inside a clear margin. Generous padding keeps left-aligned copy readable in a composition.",
      doExample: (
        <Text
          weight="semibold"
          color="primary"
          display="block"
          className="type-principle-copy type-principle-copy-padded"
        >
          Use clear consistent margins and generous padding when left aligning
          type in a composition.
        </Text>
      ),
      dontExample: (
        <Text
          weight="semibold"
          color="primary"
          display="block"
          className="type-principle-copy type-principle-copy-crowded"
        >
          Do not allow type to overflow into the margins or crowd the
          composition.
        </Text>
      ),
    },
    {
      id: "principle-grid",
      description:
        "Align type to the same grid as surrounding elements. Floating blocks break rhythm and hierarchy.",
      doExample: (
        <Text
          weight="semibold"
          color="primary"
          display="block"
          className="type-principle-copy type-principle-copy-aligned"
        >
          Always align typography to the grid.
        </Text>
      ),
      dontExample: (
        <VStack gap={2} width="100%" className="type-principle-copy-float">
          <Text
            weight="semibold"
            color="primary"
            display="block"
            className="type-principle-copy"
          >
            Do not misalign type
          </Text>
          <Text
            weight="semibold"
            color="primary"
            display="block"
            className="type-principle-copy type-principle-copy-offset"
          >
            from the grid, or allow elements to ‘float’.
          </Text>
        </VStack>
      ),
    },
    {
      id: "principle-scale",
      description:
        "Create emphasis with size and weight. All-caps shouting is not a substitute for hierarchy.",
      doExample: (
        <Text
          weight="semibold"
          color="primary"
          display="block"
          className="type-principle-copy type-principle-copy-scale"
        >
          <Text as="span" display="inline" className="type-principle-emphasis">
            Always
          </Text>{" "}
          use scale to create emphasis.
        </Text>
      ),
      dontExample: (
        <Text
          weight="semibold"
          color="primary"
          display="block"
          className="type-principle-copy type-principle-copy-shout"
        >
          DO NOT USE TEXT CASE TO CREATE EMPHASIS.
        </Text>
      ),
    },
  ];
}

/** Hierarchy levels mapped to Design system type tokens (sizes illustrative). */
function typeHierarchyLevels(
  roles: {
    display?: { family: string; fontFamily: string; fontStyle?: string };
    primary: { family: string; fontFamily: string };
    mono?: { family: string; fontFamily: string };
  },
  samples: {
    headline: string;
    subhead: string;
    body: string;
    label: string;
  },
): TypeHierarchyLevel[] {
  const levels: TypeHierarchyLevel[] = [];

  if (roles.display) {
    levels.push({
      id: "hierarchy-headline",
      role: "Headline",
      face: `${roles.display.family} Semibold`,
      size: "Display / 1.1",
      casing: "Sentence case",
      sample: samples.headline,
      fontSize: "var(--font-size-display)",
      lineHeight: "1.1",
      weight: "semibold",
      fontFamily: roles.display.fontFamily,
      fontStyle: roles.display.fontStyle,
    });
  } else {
    levels.push({
      id: "hierarchy-headline",
      role: "Headline",
      face: `${roles.primary.family} Semibold`,
      size: "Display / 1.1",
      casing: "Sentence case",
      sample: samples.headline,
      fontSize: "var(--font-size-display)",
      lineHeight: "1.1",
      weight: "semibold",
      fontFamily: roles.primary.fontFamily,
    });
  }

  levels.push({
    id: "hierarchy-subhead",
    role: "Subhead",
    face: `${roles.primary.family} Semibold`,
    size: "XL / 1.2",
    casing: "Sentence case",
    sample: samples.subhead,
    fontSize: "var(--font-size-xl)",
    lineHeight: "1.2",
    weight: "semibold",
    fontFamily: roles.primary.fontFamily,
  });

  levels.push({
    id: "hierarchy-body",
    role: "Body",
    face: `${roles.primary.family} Regular`,
    size: "Base / 1.55",
    casing: "Sentence case",
    sample: samples.body,
    fontSize: "var(--font-size-base)",
    lineHeight: "var(--line-height-body)",
    weight: "normal",
    fontFamily: roles.primary.fontFamily,
  });

  if (roles.mono) {
    levels.push({
      id: "hierarchy-label",
      role: "Label",
      face: `${roles.mono.family} Regular`,
      size: "SM / 1.3",
      casing: "Sentence case",
      sample: samples.label,
      fontSize: "var(--font-size-sm)",
      lineHeight: "1.3",
      weight: "normal",
      fontFamily: roles.mono.fontFamily,
    });
  }

  return levels;
}

function specimenSample(
  specimens: readonly {
    label: string;
    sample: string;
    size: "display" | "xl" | "lg" | "base";
  }[],
  size: "display" | "xl" | "lg" | "base",
  fallback: string,
): string {
  const hit = specimens.find((s) => s.size === size)?.sample?.trim();
  return hit || fallback;
}

function brandGuideRepoRoot(): string {
  if (process.env.BRAND_ROOT) {
    return path.resolve(process.env.BRAND_ROOT);
  }
  let dir = process.cwd();
  for (let i = 0; i < 8; i++) {
    const hasBrandJson = fs.existsSync(path.join(dir, "brand.json"));
    const hasSetup = fs.existsSync(path.join(dir, "brand", "setup.json"));
    if (hasBrandJson && hasSetup) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return path.resolve(process.cwd(), "..");
}

const LOGO_ASSET_CANDIDATES = [
  "logo.svg",
  "logo.png",
  "wordmark.svg",
  "mark.svg",
] as const;

function logoAssetSrc(): string | null {
  const root = brandGuideRepoRoot();
  for (const filename of LOGO_ASSET_CANDIDATES) {
    const brandPath = path.join(root, "brand/assets", filename);
    const publicPath = path.join(root, "guide/public/brand", filename);
    if (fs.existsSync(brandPath) || fs.existsSync(publicPath)) {
      return `/brand/${filename}`;
    }
  }
  return null;
}

function supportingLogoAssetSrc(): string | null {
  const root = brandGuideRepoRoot();
  for (const filename of ["supporting.svg", "supporting.png"] as const) {
    const brandPath = path.join(root, "brand/assets", filename);
    const publicPath = path.join(root, "guide/public/brand", filename);
    if (fs.existsSync(brandPath) || fs.existsSync(publicPath)) {
      return `/brand/${filename}`;
    }
  }
  return null;
}

function markLogoAssetSrc(): string | null {
  const root = brandGuideRepoRoot();
  for (const filename of ["mark.svg", "mark.png"] as const) {
    const brandPath = path.join(root, "brand/assets", filename);
    const publicPath = path.join(root, "guide/public/brand", filename);
    if (fs.existsSync(brandPath) || fs.existsSync(publicPath)) {
      return `/brand/${filename}`;
    }
  }
  return null;
}

function logoWordmark(brandName: string) {
  return (
    <Text
      type="display-2"
      weight="bold"
      display="block"
      className="logo-stage-wordmark"
    >
      {brandName}
    </Text>
  );
}

function logoSpecimen(brandName: string): ReactNode {
  const src = logoAssetSrc();
  if (src) {
    return <img src={src} alt={brandName} className="logo-stage-wordmark" />;
  }
  return logoWordmark(brandName);
}

function parseClearspaceMinPx(clearspace: string | undefined): number {
  if (!clearspace?.trim()) return 24;
  const px = clearspace.match(/(\d+)\s*px/i);
  if (px) return Number(px[1]);
  const inch = clearspace.match(/(\d+(?:\.\d+)?)\s*(?:in|inch|inches)\b/i);
  if (inch) return Math.max(16, Math.round(Number(inch[1]) * 96));
  const bare = clearspace.match(/\b(\d{2,3})\b/);
  if (bare) return Number(bare[1]);
  return 24;
}

function logoScaleSteps(clearspace: string | undefined): ScaleStackStep[] {
  const minWidth = parseClearspaceMinPx(clearspace);
  const minLabel = clearspace?.trim() || `${minWidth}px min`;
  return [
    { id: "scale-xl", width: 320 },
    { id: "scale-lg", width: 200 },
    { id: "scale-md", width: 140 },
    { id: "scale-sm", width: 96 },
    { id: "scale-xs", width: 64 },
    { id: "scale-min", width: minWidth, label: minLabel },
  ];
}

function logoOnColorItems(
  brandName: string,
  colors: {
    brand: readonly ColorSwatch[];
    secondary: readonly ColorSwatch[];
    interface: readonly ColorSwatch[];
  },
): ImageGridItem[] {
  const specimen = logoSpecimen(brandName);

  return [
    {
      id: "on-paper",
      background: resolvePaper(colors.brand, colors.interface),
      tone: "light",
      children: specimen,
    },
    {
      id: "on-surface",
      background: resolveSurface(colors.interface),
      tone: "light",
      children: specimen,
    },
    {
      id: "on-ink-muted",
      background: resolveMuted(colors.secondary, colors.interface),
      tone: "dark",
      children: specimen,
    },
    {
      id: "on-ink",
      background: resolveInk(colors.brand, colors.secondary),
      tone: "dark",
      children: specimen,
    },
  ];
}

/** One-row reverse pair: ink-on-paper and paper-on-ink. */
function logoSingleColorItems(
  brandName: string,
  colors: {
    brand: readonly ColorSwatch[];
    secondary: readonly ColorSwatch[];
    interface: readonly ColorSwatch[];
  },
): ImageGridItem[] {
  const specimen = logoSpecimen(brandName);

  return [
    {
      id: "single-on-ink",
      background: resolveInk(colors.brand, colors.secondary),
      tone: "dark",
      children: specimen,
    },
    {
      id: "single-on-paper",
      background: resolvePaper(colors.brand, colors.interface),
      tone: "light",
      children: specimen,
    },
  ];
}

function logoDontItems(
  brandName: string,
  donts: readonly string[],
): DontGridItem[] {
  const wordmark = logoWordmark(brandName);

  return donts.map((caption, index) => ({
    id: `logo-dont-${index}`,
    caption,
    // Prefer per-don’t assets: set `src` (e.g. `/brand/logo-dont-stretch.svg`).
    children: wordmark,
  }));
}

/** Color don’ts from authored captions (swap for assets via `src`). */
function colorDontItems(donts: readonly string[]): DontGridItem[] {
  return donts.map((caption, index) => ({
    id: `color-dont-${index}`,
    caption,
  }));
}

/** Photography don’ts from imagery.avoid — empty when nothing authored. */
function photographyDontItems(
  avoid: string | readonly string[] | undefined,
): DontGridItem[] {
  const parts = Array.isArray(avoid)
    ? avoid.map((part) => String(part).trim()).filter(Boolean)
    : splitList(typeof avoid === "string" ? avoid : undefined);

  if (parts.length === 0) return [];

  return parts.map((part, index) => ({
    id: `photo-dont-${index}`,
    caption: /^don[’']t/i.test(part)
      ? part
      : `Don’t use ${part.toLowerCase()}`,
  }));
}

function slugId(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function animationDontItems(captions: readonly string[]): DontGridItem[] {
  return captions.map((caption, index) => ({
    id: slugId(caption, `animation-dont-${index}`),
    caption,
  }));
}

function photographyCategoryNav(imagery: {
  subjects?: string;
  settings?: string;
  product?: string;
  moments?: string;
}): PhotographyCategoryNavItem[] {
  const items: PhotographyCategoryNavItem[] = [];
  if (imagery.subjects?.trim()) {
    items.push({ id: "photography-category-subjects", label: "Subjects" });
  }
  if (imagery.settings?.trim()) {
    items.push({ id: "photography-category-settings", label: "Settings" });
  }
  if (imagery.product?.trim()) {
    items.push({ id: "photography-category-product", label: "Product" });
  }
  if (imagery.moments?.trim()) {
    items.push({ id: "photography-category-moments", label: "Moments" });
  }
  return items;
}

/** Typography don’ts — live bad treatments (swap for assets via `src`). */
function typeDontItems(family: string): DontGridItem[] {
  return [
    {
      id: "type-dont-stretch",
      caption: "Don’t stretch or condense type",
      children: (
        <Text
          weight="semibold"
          display="block"
          className="type-dont-sample type-dont-stretch"
        >
          {family}
        </Text>
      ),
    },
    {
      id: "type-dont-outline",
      caption: "Don’t outline or stroke glyphs",
      children: (
        <Text
          weight="semibold"
          display="block"
          className="type-dont-sample type-dont-outline"
        >
          {family}
        </Text>
      ),
    },
    {
      id: "type-dont-shadow",
      caption: "Don’t add drop shadows",
      children: (
        <Text
          weight="semibold"
          display="block"
          className="type-dont-sample type-dont-shadow"
        >
          {family}
        </Text>
      ),
    },
    {
      id: "type-dont-contrast",
      caption: "Don’t set low-contrast type",
      children: (
        <Text
          weight="semibold"
          display="block"
          className="type-dont-sample type-dont-contrast"
        >
          {family}
        </Text>
      ),
    },
    {
      id: "type-dont-caps",
      caption: "Don’t set long copy in all caps",
      children: (
        <Text
          weight="semibold"
          display="block"
          className="type-dont-sample type-dont-caps"
        >
          LONG COPY IN ALL CAPS IS HARD TO READ
        </Text>
      ),
    },
    {
      id: "type-dont-stack",
      caption: "Don’t stack decorative faces",
      children: (
        <Text
          weight="semibold"
          display="block"
          className="type-dont-sample type-dont-stack"
        >
          Aa Bb Cc
        </Text>
      ),
    },
  ];
}

/** Applications leaf: label + description + one AssetStage or many ImageGrid cells. */
function ApplicationSection({
  id,
  title,
  context,
  sample,
  images = 1,
  status,
}: {
  id: string;
  title: string;
  context: string;
  /** Temporary stage copy until real application assets exist. */
  sample?: string;
  /** 1 → AssetStage; 2+ → ImageGrid. */
  images?: number;
  status?: SectionStatus;
}) {
  const sampleNode = sample ? (
    <Text
      type="display-2"
      weight="bold"
      color="secondary"
      display="block"
      className="expression-sample"
    >
      {sample}
    </Text>
  ) : (
    <EmptyMedia label="Add application example" />
  );

  return (
    <LogoAssetSection id={id} title={title} context={context} status={status}>
      {/* Prefer application assets: src="/brand/applications/{id}-*.jpg". */}
      {images <= 1 ? (
        <AssetStage aria-label={`${title} application`}>{sampleNode}</AssetStage>
      ) : (
        <ImageGrid
          aria-label={`${title} application examples`}
          columns={Math.min(images, 3)}
          gap={3}
          ratio={4 / 3}
          items={Array.from({ length: images }, (_, index) => ({
            id: `${id}-image-${index}`,
            background: "var(--color-background-muted)",
            tone: "light" as const,
            children:
              index === 0 && sample ? (
                sampleNode
              ) : (
                <EmptyMedia label="Add application example" />
              ),
          }))}
        />
      )}
    </LogoAssetSection>
  );
}

export default function Home() {
  const brand = loadBrand();
  const faces = brand.visual.typography.faces;
  const displayName = shortFaceName(faces.display);
  const primaryName =
    shortFaceName(faces.primary) ||
    brand.visual.typography.family.trim() ||
    "Primary";
  const monoName = shortFaceName(faces.mono);
  const displayFoundry = faces.displayFoundry?.trim() ?? "";
  const primaryFoundry = faces.primaryFoundry?.trim() ?? "";
  const monoFoundry = faces.monoFoundry?.trim() ?? "";
  const displayStack = compiledFontSerif();
  const primaryStack = compiledFontSans();
  const monoStack = compiledFontMono();
  const typeRoles = [
    ...(displayName
      ? [
          {
            id: "display",
            family: displayName,
            fontFamily: displayStack,
            fontStyle: "italic" as string | undefined,
          },
        ]
      : []),
    {
      id: "primary",
      family: primaryName,
      fontFamily: primaryStack,
    },
    ...(monoName
      ? [
          {
            id: "mono",
            family: monoName,
            fontFamily: monoStack,
          },
        ]
      : []),
  ];
  const weightItems = typeWeightItems(typeRoles);
  const typeSpecimens = brand.visual.typography.specimens;
  const hierarchyLevels = typeHierarchyLevels(
    {
      ...(displayName
        ? {
            display: {
              family: displayName,
              fontFamily: displayStack,
              fontStyle: "italic",
            },
          }
        : {}),
      primary: { family: primaryName, fontFamily: primaryStack },
      ...(monoName
        ? { mono: { family: monoName, fontFamily: monoStack } }
        : {}),
    },
    {
      headline: specimenSample(
        typeSpecimens,
        "display",
        brand.tagline || brand.name,
      ),
      subhead: specimenSample(
        typeSpecimens,
        "xl",
        brand.tagline || brand.voice.identity || brand.name,
      ),
      body: specimenSample(
        typeSpecimens,
        "base",
        brand.support || brand.voice.identity || brand.tagline || brand.name,
      ),
      label: specimenSample(
        typeSpecimens,
        "lg",
        monoName
          ? `${monoName} · labels and metadata`
          : `${primaryName} · labels and metadata`,
      ),
    },
  );
  const completeness = assessBrandCompleteness(brand);
  const { byId: sectionStatusById, chapters: chapterStatus } =
    resolveSectionStatus(brand, completeness);
  const questionnairePrompt =
    brand.setup.sources.find(
      (s): s is SetupIntakeSource =>
        s.kind === "intake" && s.label.toLowerCase().includes("questionnaire"),
    )?.prompt ?? brand.setup.prompt;
  const [
    strategyChapter,
    languageChapter,
    logoChapter,
    typographyChapter,
    colorChapter,
    photographyChapter,
    systemChapter,
    animationChapter,
    applicationsChapter,
    utilitiesChapter,
  ] = GUIDE_CHAPTERS;
  const enabledChapterIds = new Set(brand.nav.map((group) => group.id));
  const navLeafIds = new Set(flattenNavSectionIds(brand.nav));
  const showLeaf = (id: string) => navLeafIds.has(id);
  const applicationsNavItems =
    brand.nav.find((group) => group.id === "applications")?.items ?? [];
  const supportingLogoCopy = brand.visual.logo.supporting?.trim() ?? "";
  const supportingLogoSrc = supportingLogoAssetSrc();
  const showSupportingLogo = Boolean(supportingLogoCopy || supportingLogoSrc);
  const primaryLogoSrc = logoAssetSrc();
  const socialMarkSrc = markLogoAssetSrc();
  const showSocialMark = Boolean(
    socialMarkSrc && socialMarkSrc !== primaryLogoSrc,
  );
  const photoDontItems = photographyDontItems(brand.visual.imagery.avoid);
  const colorDontCaptions = brand.visual.colors.donts ?? [];
  const photoCategoryNav = photographyCategoryNav(brand.visual.imagery);
  const principlesContext = [
    brand.visual.imagery.tone,
    brand.visual.imagery.style,
    brand.visual.imagery.mood,
  ]
    .filter(Boolean)
    .join(" ");
  const logoClearspace = brand.visual.logo.clearspace?.trim() ?? "";
  const systemIntro = brand.system?.intro?.trim() ?? "";
  const systemComponents = brand.system?.components ?? [];

  return (
    <AppShell
      brandName={brand.name}
      groups={brand.nav}
      mode="define"
      sectionStatusById={sectionStatusById}
      chapterStatus={chapterStatus}
      quietLeafStatus={brand.setup.status === "starter"}
    >
      <GuideColumn data-setup={brand.setup.status}>
        <GuideHero setup={brand.setup.status === "starter"}>
          {brand.setup.status === "starter" ? (
            <>
              <Text
                as="p"
                type="supporting"
                color="secondary"
                display="block"
                className="hero-meta"
              >
                Brand Guide · Setup
              </Text>
              <h1 className="hero-name hero-name-setup" data-type="h0">
                {brand.setup.headline}
              </h1>
              <SetupHeroBody body={brand.setup.body} />

              <Grid
                className="setup-sources"
                columns={{ minWidth: 280, max: 2 }}
                gap={6}
                rowGap={8}
                width="100%"
                aria-label="Accepted sources"
              >
                {brand.setup.sources
                  .filter(
                    (source): source is SetupIntakeSource =>
                      source.kind === "intake",
                  )
                  .map((source) => (
                  <SetupSourceCard
                    key={source.label}
                    label={source.label}
                    detail={source.detail}
                    prompt={source.prompt}
                    href={
                      source.label.toLowerCase().includes("questionnaire")
                        ? "#utilities-branding-questionnaire"
                        : undefined
                    }
                  />
                ))}
              </Grid>

              <CopySnippet
                id="setup-prompt"
                title="Default prompt"
                text={brand.setup.prompt}
              />

              <Clothesline
                as="section"
                id="setup-footnote"
                className="clothesline-grid-section"
                style={sectionLeafStyle}
                title={
                  <Text
                    weight="semibold"
                    color="primary"
                    display="block"
                    className="clothesline-title"
                  >
                    Note
                  </Text>
                }
              >
                <VStack gap={4} width="100%">
                  <Text
                    color="secondary"
                    type="supporting"
                    as="p"
                    display="block"
                    className="measure setup-footnote"
                  >
                    Starter preview below uses Sample Brand until you populate.
                    When finished, set <code>status</code> to{" "}
                    <code>populated</code> in <code>brand/setup.json</code>.
                  </Text>
                  <SectionStatusKey />
                </VStack>
              </Clothesline>
            </>
          ) : (
            <>
              <Text
                as="p"
                type="supporting"
                color="secondary"
                display="block"
                className="hero-meta"
              >
                Brand Guide · {brand.year}
              </Text>
              <h1 className="hero-name">{brand.name}</h1>
              <p className="hero-tagline">{brand.tagline}</p>
              <Text
                as="p"
                color="secondary"
                display="block"
                className="hero-support"
              >
                {brand.support}
              </Text>
              <VStack
                gap={0}
                className="hero-bar"
                aria-hidden="true"
                style={{ background: "var(--color-accent)" }}
              />
              <Clothesline
                as="section"
                id="setup-refresh"
                className="clothesline-grid-section"
                style={sectionLeafStyle}
                title={
                  <Text
                    weight="semibold"
                    color="primary"
                    display="block"
                    className="clothesline-title"
                  >
                    Refresh
                  </Text>
                }
              >
                <Text
                  color="secondary"
                  type="supporting"
                  as="p"
                  display="block"
                  className="measure setup-tertiary"
                >
                  Need to refresh from a source? See{" "}
                  <code>intake/populate-from-source.md</code>.
                </Text>
              </Clothesline>
            </>
          )}

          <Clothesline
            as="section"
            id="agent-source"
            className="clothesline-grid-section"
            style={sectionLeafStyle}
            title={
              <HStack gap={2} align="center" wrap="wrap">
                <Text
                  weight="semibold"
                  color="primary"
                  display="block"
                  className="clothesline-title"
                >
                  Agent source
                </Text>
                <AgentLabel />
              </HStack>
            }
          >
            <VStack gap={3}>
              <Text
                color="secondary"
                type="supporting"
                as="p"
                display="block"
                className="measure"
              >
                Give an agent this URL to load the complete brand guide.
              </Text>
              <HStack gap={3} wrap="wrap" className="agent-source-actions">
                <a href="/brand">Open brand source</a>
                <CopyValue
                  value="/brand"
                  label="agent brand guide URL"
                  absoluteUrl
                />
              </HStack>
            </VStack>
          </Clothesline>
        </GuideHero>

        <ChapterSection id={strategyChapter.id} title={strategyChapter.title}>
          <GraphicStatement id="strategy-introduction">
            {brand.strategy.overview.what}
          </GraphicStatement>

          <AudienceSection
            id="strategy-audience"
            intro={brand.strategy.audience.intro}
            groups={brand.strategy.audience.groups}
            status={sectionStatusById["strategy-audience"]}
          />

          <ClotheslineLeaf
            id="strategy-positioning"
            title="Positioning"
            intro={brand.strategy.positioning.intro || undefined}
            status={sectionStatusById["strategy-positioning"]}
            className="statement-section"
            headerContent={
              brand.strategy.positioning.statement ||
              brand.strategy.positioning.fields?.length ? (
              <VStack gap={6} width="100%" align="start">
                {brand.strategy.positioning.statement ? (
                  <Text
                    type="display-2"
                    weight="bold"
                    color="primary"
                    as="p"
                    display="block"
                    className="statement-display"
                  >
                    {brand.strategy.positioning.statement}
                  </Text>
                ) : null}
                {brand.strategy.positioning.fields?.length ? (
                  <VStack gap={4} width="100%" align="start">
                    {brand.strategy.positioning.fields.map((field) => (
                      <LabeledField key={field.label} label={field.label}>
                        <Text color="secondary" as="p" display="block">
                          {field.value}
                        </Text>
                      </LabeledField>
                    ))}
                  </VStack>
                ) : null}
              </VStack>
              ) : undefined
            }
          />

          <StatementSection
            id="strategy-vision"
            title="Vision"
            intro={brand.strategy.vision.intro}
            statement={brand.strategy.vision.statement}
            status={sectionStatusById["strategy-vision"]}
          />

          <StatementSection
            id="strategy-mission"
            title="Mission"
            intro={brand.strategy.mission.intro}
            statement={brand.strategy.mission.statement}
            status={sectionStatusById["strategy-mission"]}
          />

          <ClotheslineGrid
            id="strategy-values"
            title="Values"
            intro={brand.strategy.values.intro}
            items={brand.strategy.values.items}
            status={sectionStatusById["strategy-values"]}
          />

          <ClotheslineGrid
            id="strategy-personality"
            title="Personality"
            intro={brand.strategy.personality.intro}
            items={brand.strategy.personality.items}
            status={sectionStatusById["strategy-personality"]}
          />

          <ArchetypeExplorer
            brandProfiles={brand.strategy.archetypeProfiles}
            fallbackName={brand.strategy.archetype.name}
            id="strategy-archetype"
          />

          <ClotheslineGrid
            id="strategy-pillars"
            title="Pillars"
            intro={brand.strategy.pillars.intro}
            items={brand.strategy.pillars.items.map((pillar) => ({
              title: pillar.name,
              body: [
                pillar.summary,
                pillar.emotional && `Emotional: ${pillar.emotional}`,
                pillar.functional && `Functional: ${pillar.functional}`,
                pillar.trust && `Trust: ${pillar.trust}`,
              ]
                .filter(Boolean)
                .join("\n"),
            }))}
            status={sectionStatusById["strategy-pillars"]}
          />

          <GuardrailsSection
            id="strategy-guardrails"
            intro={brand.strategy.guardrails.intro}
            tone={brand.strategy.guardrails.tone}
            cannotBe={brand.strategy.guardrails.cannotBe}
            litmus={brand.strategy.guardrails.litmus}
            status={sectionStatusById["strategy-guardrails"]}
          />
        </ChapterSection>

        <ChapterSection id={languageChapter.id} title={languageChapter.title}>
          <GraphicStatement id="language-introduction">
            {brand.voice.identity}
          </GraphicStatement>
          {brand.voice.essence?.trim() ? (
            <Text
              color="secondary"
              type="supporting"
              as="p"
              display="block"
              className="measure"
            >
              {brand.voice.essence}
            </Text>
          ) : null}

          <PrinciplesSection
            intro={brand.voice.principles.intro}
            items={brand.voice.principles.items}
            status={sectionStatusById["language-principles"]}
          />

          <StatementSection
            id="language-tagline"
            title="Tagline"
            intro={brand.voice.tagline.intro}
            statement={brand.voice.tagline.statement}
            status={sectionStatusById["language-tagline"]}
          />

          <StorySection
            intro={brand.voice.story.intro}
            long={brand.voice.story.long}
            medium={brand.voice.story.medium}
            short={brand.voice.story.short}
            status={sectionStatusById["language-story"]}
          />

          <HeadlinesSection
            intro={brand.voice.headlines.intro}
            items={brand.voice.headlines.items}
            status={sectionStatusById["language-headlines"]}
          />

          <CtaSection
            intro={brand.voice.cta.intro}
            doItems={brand.voice.cta.do}
            dontItems={brand.voice.cta.dont}
            status={sectionStatusById["language-cta"]}
          />

          {showLeaf("language-phrases") && brand.voice.phrases.length > 0 ? (
            <ClotheslineGrid
              id="language-phrases"
              title="Phrases"
              intro=""
              items={brand.voice.phrases.map((phrase) => ({
                title: phrase,
                body: "",
              }))}
              status={sectionStatusById["language-phrases"]}
            />
          ) : null}

          {showLeaf("language-we-say") && brand.voice.weSay.length > 0 ? (
            <ClotheslineLeaf
              id="language-we-say"
              title="We say / never"
              status={sectionStatusById["language-we-say"]}
              className="clothesline-grid-section"
            >
              <VStack gap={8} width="100%">
                {brand.voice.weSay.map((row) => (
                  <DoDontColumns
                    key={`${row.say}-${row.never}`}
                    gap={8}
                    do={
                      <LabeledField label="We say" labelType="label" gap={3}>
                        <Text weight="bold" color="primary" as="p" display="block">
                          {row.say}
                        </Text>
                      </LabeledField>
                    }
                    dont={
                      <LabeledField label="Never" labelType="label" gap={3}>
                        <Text weight="bold" color="primary" as="p" display="block">
                          {row.never}
                        </Text>
                      </LabeledField>
                    }
                  />
                ))}
              </VStack>
            </ClotheslineLeaf>
          ) : null}

          <VoiceSpectrumSection
            intro={brand.voice.spectrum.intro}
            rows={brand.voice.spectrum.rows}
            status={sectionStatusById["language-spectrum"]}
          />

          <AndYetSection
            intro={brand.voice.andYet.intro}
            pairs={brand.voice.andYet.pairs}
            status={sectionStatusById["language-and-yet"]}
          />

          <ContextSection
            intro={brand.voice.contexts.intro}
            items={brand.voice.contexts.items}
            status={sectionStatusById["language-context"]}
          />
        </ChapterSection>

        {enabledChapterIds.has("logo") ? (
        <ChapterSection id={logoChapter.id} title={logoChapter.title}>
          <GraphicStatement id="logo-introduction">
            {brand.visual.logo.description}
          </GraphicStatement>

          <LogoAssetSection
            id="logo-background"
            title="Background"
            context="Include a background on the logo history or approach here if applicable. Use an image if you need a visual aid."
            status={sectionStatusById["logo-background"]}
          >
            <AssetStage aria-label="Logo background collage">
              <Grid
                columns={2}
                gap={3}
                className="logo-collage"
                aria-label="Logo history collage"
              >
                <VStack
                  gap={0}
                  padding={4}
                  hAlign="start"
                  vAlign="center"
                  className="logo-collage-cell logo-collage-cell-wordmark"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-background-card)",
                  }}
                >
                  <Text weight="bold" color="secondary" display="block">
                    {brand.name}
                  </Text>
                </VStack>
                <VStack
                  gap={0}
                  padding={4}
                  hAlign="center"
                  vAlign="center"
                  className="logo-collage-cell logo-collage-cell-framed"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-background-card)",
                  }}
                >
                  <Text weight="bold" color="secondary" display="block">
                    {brand.name}
                  </Text>
                </VStack>
                <VStack
                  gap={0}
                  padding={4}
                  hAlign="start"
                  vAlign="center"
                  className="logo-collage-cell logo-collage-cell-lockup"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-background-card)",
                  }}
                >
                  <Text weight="semibold" color="secondary" display="block">
                    {brand.name}
                  </Text>
                </VStack>
                <VStack
                  gap={0}
                  padding={4}
                  hAlign="center"
                  vAlign="center"
                  className="logo-collage-cell logo-collage-cell-mark"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "var(--color-background-card)",
                  }}
                >
                  <Text weight="bold" color="secondary" display="block">
                    {brand.name.slice(0, 1)}
                  </Text>
                </VStack>
              </Grid>
            </AssetStage>
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-mark"
            title="Logo"
            context="Our logo is the primary identifier for our brand. It captures our name, mission, and legacy."
            status={sectionStatusById["logo-mark"]}
          >
            <AssetStage aria-label={`${brand.name} logo`}>
              {logoSpecimen(brand.name)}
            </AssetStage>
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-on-color"
            title="On color"
            context="When combining the logo with brand colors, always ensure there is ample contrast in color pairings. The following examples are approved combinations."
            status={sectionStatusById["logo-on-color"]}
          >
            <ImageGrid
              aria-label="Logo on brand colors"
              items={logoOnColorItems(brand.name, brand.visual.colors)}
            />
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-single-color"
            title="Single color"
            context="Always maintain ample contrast between the background and the logo."
            status={sectionStatusById["logo-single-color"]}
          >
            <ImageGrid
              aria-label="Single-color logo pair"
              columns={2}
              gap={0}
              items={logoSingleColorItems(brand.name, brand.visual.colors)}
            />
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-scaling"
            title="Scaling"
            context="The logo has been carefully crafted to read well, even at small sizes. There is no limit at large scale, but be careful at smaller sizes. If legibility is an issue, it’s too small. Recommended minimum size is 20 pixels for screen, and 1/4 inches in print."
            status={sectionStatusById["logo-scaling"]}
          >
            {/* Shared SVG: src="/brand/logo.svg". Size-specific PNGs: set step.src. */}
            <ScaleStack
              aria-label={`${brand.name} logo scaling`}
              steps={logoScaleSteps(logoClearspace || undefined)}
            >
              {logoSpecimen(brand.name)}
            </ScaleStack>
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-clearspace"
            title="Clearspace"
            context="Don’t crowd the logo. When placing other elements nearby, ensure minimum clear space for brand consistency. Describe how the clear space is calculated relative to a fixed element from the logo. See example below."
            status={sectionStatusById["logo-clearspace"]}
          >
            {/* Prefer a diagram asset: <img src="/brand/logo-clearspace.svg" alt="…" /> */}
            <AssetStage aria-label={`${brand.name} logo clearspace`}>
              <VStack
                gap={4}
                hAlign="center"
                vAlign="center"
                className="logo-clearspace-diagram"
              >
                <HStack
                  gap={3}
                  vAlign="center"
                  hAlign="center"
                  className="logo-clearspace-row"
                >
                  <Text
                    color="secondary"
                    display="block"
                    className="logo-clearspace-x"
                    aria-hidden="true"
                  >
                    ×
                  </Text>
                  {logoSpecimen(brand.name)}
                  <Text
                    color="secondary"
                    display="block"
                    className="logo-clearspace-x"
                    aria-hidden="true"
                  >
                    ×
                  </Text>
                </HStack>
                <Text type="supporting" color="secondary" display="block">
                  {logoClearspace ||
                    "Clearspace ≈ height of a capital letter in the wordmark"}
                </Text>
              </VStack>
            </AssetStage>
          </LogoAssetSection>

          {showSupportingLogo && showLeaf("logo-supporting") ? (
            <LogoAssetSection
              id="logo-supporting"
              title="Supporting logo"
              context={
                supportingLogoCopy ||
                "Secondary mark used alongside the primary logo."
              }
              status={sectionStatusById["logo-supporting"]}
            >
              <AssetStage aria-label={`${brand.name} supporting logo`}>
                {supportingLogoSrc ? (
                  <img
                    src={supportingLogoSrc}
                    alt={`${brand.name} supporting logo`}
                    className="logo-stage-wordmark"
                  />
                ) : (
                  logoSpecimen(brand.name)
                )}
              </AssetStage>
            </LogoAssetSection>
          ) : null}

          <LogoAssetSection
            id="logo-use"
            title="Logo use"
            context="Together, the logo, supporting logo, and social icon comprise our logo collection. Though they all represent our brand and should be used, briefly describe how and when each logo should be used."
            status={sectionStatusById["logo-use"]}
          >
            <VStack gap={8} width="100%" className="logo-use-stack">
              <LogoUseItem title="Logo" detail="Used most often">
                {logoSpecimen(brand.name)}
              </LogoUseItem>
              {showSupportingLogo ? (
                <LogoUseItem
                  title="Supporting logo"
                  detail="Pair with the wordmark when a secondary mark helps recognition"
                >
                  {supportingLogoSrc ? (
                    <img
                      src={supportingLogoSrc}
                      alt={`${brand.name} supporting logo`}
                      className="logo-stage-wordmark"
                    />
                  ) : (
                    logoSpecimen(brand.name)
                  )}
                </LogoUseItem>
              ) : null}
              {showSocialMark ? (
                <LogoUseItem
                  title="Social icon"
                  detail="Use at small sizes where the full wordmark won’t fit"
                >
                  <img
                    src={socialMarkSrc!}
                    alt={`${brand.name} social icon`}
                    className="logo-stage-wordmark"
                  />
                </LogoUseItem>
              ) : null}
            </VStack>
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-donts"
            title="Don’ts"
            context="Do not diminish the value of the logo in our brand. Avoid the following treatments."
            status={sectionStatusById["logo-donts"]}
          >
            <DontGrid
              aria-label="Logo don’ts"
              columns={3}
              items={logoDontItems(brand.name, brand.visual.logo.donts)}
            />
          </LogoAssetSection>
        </ChapterSection>
        ) : null}

        <ChapterSection id={typographyChapter.id} title={typographyChapter.title}>
          <GraphicStatement id="typography-introduction">
            {brand.visual.typography.note}
          </GraphicStatement>

          <LogoAssetSection
            id="typography-background"
            title="Background"
            context="Include a background on the typography history or approach here if applicable. Use an image if you need a visual aid."
            status={sectionStatusById["typography-background"]}
          >
            {/* Prefer specimen assets: src="/brand/type-background-*.jpg" on ImageGrid items. */}
            <VStack gap={3} width="100%" className="type-background-media">
              <AssetStage
                aria-label={`${primaryName} typography background`}
                className="type-background-hero"
                minHeight={360}
              >
                <VStack
                  gap={2}
                  hAlign="start"
                  vAlign="center"
                  width="100%"
                  className="type-treatment type-treatment-hero"
                >
                  <Text
                    weight="bold"
                    color="primary"
                    display="block"
                    className="type-treatment-display"
                    style={
                      {
                        fontFamily: displayName ? displayStack : primaryStack,
                        ...(displayName ? { fontStyle: "italic" } : {}),
                      } as CSSProperties
                    }
                  >
                    {displayName || primaryName}
                  </Text>
                  <Text
                    weight="semibold"
                    color="secondary"
                    display="block"
                    className="type-treatment-meta"
                  >
                    {[
                      displayName && `Display · ${displayName}`,
                      `Primary · ${primaryName}`,
                      monoName && `Label · ${monoName}`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </Text>
                </VStack>
              </AssetStage>
              <ImageGrid
                aria-label="Typography treatment examples"
                columns={Math.min(Math.max(typeRoles.length, 1), 3)}
                gap={3}
                items={typeRoles.map((role) => ({
                  id: `type-family-${role.id}`,
                  background: colorValue(
                    brand.visual.colors.interface,
                    "Surface",
                    "var(--color-background-card)",
                  ),
                  tone: "light" as const,
                  children: (
                    <VStack gap={2} hAlign="start" width="100%">
                      <Text
                        type="supporting"
                        color="secondary"
                        display="block"
                      >
                        {role.id === "display"
                          ? "Display"
                          : role.id === "mono"
                            ? "Label"
                            : "Primary"}
                      </Text>
                      <Text
                        weight="bold"
                        display="block"
                        className="type-treatment-display"
                        style={
                          {
                            fontFamily: role.fontFamily,
                            ...(role.fontStyle
                              ? { fontStyle: role.fontStyle }
                              : {}),
                          } as CSSProperties
                        }
                      >
                        {role.family}
                      </Text>
                    </VStack>
                  ),
                }))}
              />
            </VStack>
          </LogoAssetSection>

          {displayName ? (
            <TypefaceSection
              id="typography-display"
              title="Display typeface"
              context={`${displayName} is our display typeface. Use it for headlines and expressive moments.`}
              faceName={displayName}
              foundry={displayFoundry}
              fontFamily={displayStack}
              fontStyle="italic"
              downloadHref="/brand/fonts/display.zip"
              status={sectionStatusById["typography-display"]}
            />
          ) : null}

          <TypefaceSection
            id="typography-primary"
            title="Primary typeface"
            context={`${primaryName} is our primary typeface for body and UI.`}
            faceName={primaryName}
            foundry={primaryFoundry}
            fontFamily={primaryStack}
            downloadHref="/brand/fonts/primary.zip"
            status={sectionStatusById["typography-primary"]}
          />

          {monoName ? (
            <TypefaceSection
              id="typography-mono"
              title="Label typeface"
              context={`${monoName} is our label typeface for captions, metadata, and code-adjacent UI.`}
              faceName={monoName}
              foundry={monoFoundry}
              fontFamily={monoStack}
              downloadHref="/brand/fonts/mono.zip"
              className="typeface-section-mono"
              status={sectionStatusById["typography-mono"]}
            />
          ) : null}

          <TypeWeightsSection
            id="typography-weights"
            context="Type weight provides hierarchy to distinguish between pieces of information. Use this as a guide for typeface weights employed in our brand."
            items={weightItems}
            status={sectionStatusById["typography-weights"]}
          />

          <TypeSpecimenSection
            id="typography-specimen"
            context="Typefaces transfer the voice of an organization to the reader."
            items={weightItems.filter(
              (item) =>
                item.weight === "semibold" || item.weight === "normal",
            )}
            status={sectionStatusById["typography-specimen"]}
          />

          <SectionStub id="typography-setting" title="Setting type"
            status={sectionStatusById["typography-setting"]}
          />

          <TypeHierarchySection
            id="typography-hierarchy"
            context="Size, scale and position all play a factor in how information is read. Always ensure there is a purposeful difference between type sizes. Type sizes are for example only."
            levels={hierarchyLevels}
            status={sectionStatusById["typography-hierarchy"]}
          />

          <SectionStub id="typography-testing" title="Testing type"
            status={sectionStatusById["typography-testing"]}
          />

          <TypePrinciplesSection
            id="typography-principles"
            context="This is a guide that outlines general typesetting principles. Use them as a reference any time our typefaces are used."
            items={typePrincipleItems()}
            status={sectionStatusById["typography-principles"]}
          />

          <LogoAssetSection
            id="typography-donts"
            title="Don’ts"
            context="Do not diminish the value of typography in our brand. Avoid the following treatments."
            status={sectionStatusById["typography-donts"]}
          >
            <DontGrid
              aria-label="Typography don’ts"
              columns={3}
              items={typeDontItems(primaryName)}
            />
          </LogoAssetSection>
        </ChapterSection>

        <ChapterSection id={colorChapter.id} title={colorChapter.title}>
          <GraphicStatement
            id="color-introduction"
            footer={
              <Text color="secondary" type="supporting">
                <AgentLabel />{" "}
                <a href="/tokens.json">Design tokens (DTCG)</a>
                {" — "}
                generated from brand.md Design system; do not hand-edit.
              </Text>
            }
          >
            {brand.visual.colors.intro}
          </GraphicStatement>

          <ColorPaletteSection
            id="color-primary"
            title="Primary palette"
            context="Signature ink — the primary brand signal for type, wordmark, and key actions."
            status={sectionStatusById["color-primary"]}
          >
            <ColorTiles
              colors={toColorTiles(brand.visual.colors.brand)}
              aria-label="Primary palette colors"
            />
          </ColorPaletteSection>

          {showLeaf("color-secondary") &&
          brand.visual.colors.secondary.length > 0 ? (
            <ColorPaletteSection
              id="color-secondary"
              title="Secondary palette"
              context="Supporting tones for hierarchy without introducing a second brand hue."
              status={sectionStatusById["color-secondary"]}
            >
              <ColorTiles
                colors={toColorTiles(brand.visual.colors.secondary)}
                aria-label="Secondary palette colors"
              />
            </ColorPaletteSection>
          ) : null}

          <ColorPaletteSection
            id="color-interface"
            title="Interface"
            context="Twelve-step scale for UI surfaces, borders, and text — Radix-style steps, not decorative accents."
            status={sectionStatusById["color-interface"]}
          >
            <ColorTiles
              colors={toColorTiles(brand.visual.colors.interface)}
              columns={6}
              aria-label="Interface colors"
            />
          </ColorPaletteSection>

          {showLeaf("color-proportion") &&
          brand.visual.colors.proportion?.trim() ? (
            <LogoAssetSection
              id="color-proportion"
              title="Proportion"
              context={brand.visual.colors.proportion}
              status={sectionStatusById["color-proportion"]}
            />
          ) : null}

          <ColorPaletteSection
            id="color-combinations"
            title="Combinations"
            context="Some colors are not suitable to be used in combination with others. The following diagram demonstrates approved color combinations."
            status={sectionStatusById["color-combinations"]}
          >
            <ColorCombinations
              items={colorCombinationItems(brand.visual.colors)}
            />
          </ColorPaletteSection>

          <ColorPaletteSection
            id="color-contrast"
            title="Contrast"
            context="When using our colors in design, keep in mind how contrast may affect legibility. The following diagram demonstrates color contrast relationships. Use this as a starting point when combining colors."
            status={sectionStatusById["color-contrast"]}
          >
            <ColorContrastGrid
              items={colorContrastItems(brand.visual.colors)}
            />
          </ColorPaletteSection>

          {showLeaf("color-donts") && colorDontCaptions.length > 0 ? (
            <ColorPaletteSection
              id="color-donts"
              title="Don’ts"
              context="Do not diminish the value of color in our brand. Avoid the following treatments."
              status={sectionStatusById["color-donts"]}
            >
              <DontGrid
                aria-label="Color don’ts"
                columns={3}
                items={colorDontItems(colorDontCaptions)}
              />
            </ColorPaletteSection>
          ) : null}
        </ChapterSection>

        {enabledChapterIds.has("photography") ? (
        <ChapterSection id={photographyChapter.id} title={photographyChapter.title}>
          <GraphicStatement id="photography-introduction">
            {brand.visual.imagery.introduction}
          </GraphicStatement>

          {photoCategoryNav.length > 0 ? (
            <PhotographyCategoriesSection
              id="photography-categories"
              context="Imagery is broken into the following categories. Briefly describe the rationale behind the categories."
              items={photoCategoryNav}
              status={sectionStatusById["photography-categories"]}
            />
          ) : null}

          {showLeaf("photography-category-subjects") &&
          brand.visual.imagery.subjects?.trim() ? (
            <PhotographyCategorySection
              id="photography-category-subjects"
              title="Subjects"
              context={brand.visual.imagery.subjects}
              status={sectionStatusById["photography-category-subjects"]}
            />
          ) : null}

          {showLeaf("photography-category-settings") &&
          brand.visual.imagery.settings?.trim() ? (
            <PhotographyCategorySection
              id="photography-category-settings"
              title="Settings"
              context={brand.visual.imagery.settings}
              status={sectionStatusById["photography-category-settings"]}
            />
          ) : null}

          {showLeaf("photography-category-product") &&
          brand.visual.imagery.product?.trim() ? (
            <PhotographyCategorySection
              id="photography-category-product"
              title="Product"
              context={brand.visual.imagery.product}
              status={sectionStatusById["photography-category-product"]}
            />
          ) : null}

          {showLeaf("photography-category-moments") &&
          brand.visual.imagery.moments?.trim() ? (
            <PhotographyCategorySection
              id="photography-category-moments"
              title="Moments"
              context={brand.visual.imagery.moments}
              status={sectionStatusById["photography-category-moments"]}
            />
          ) : null}

          <LogoAssetSection
            id="photography-principles"
            title="Principles"
            context={principlesContext || brand.visual.imagery.tone}
            status={sectionStatusById["photography-principles"]}
          />

          {showLeaf("photography-donts") && photoDontItems.length > 0 ? (
            <LogoAssetSection
              id="photography-donts"
              title="Don’ts"
              context="Do not diminish the value of imagery in our brand. Avoid the following treatments."
              status={sectionStatusById["photography-donts"]}
            >
              <DontGrid
                aria-label="Photography don’ts"
                columns={3}
                items={photoDontItems}
              />
            </LogoAssetSection>
          ) : null}
        </ChapterSection>
        ) : null}

        <ChapterSection id={systemChapter.id} title={systemChapter.title}>
          <GraphicStatement
            id="system-introduction"
            footer={
              <Text color="secondary" type="supporting">
                Token values live in{" "}
                <a href="/tokens.json">tokens.json</a> (compiled from brand.md
                Design system).
              </Text>
            }
          >
            {systemIntro}
          </GraphicStatement>

          {systemComponents.length > 0 ? (
            <ClotheslineLeaf
              id="system-components"
              title="Components"
              className="clothesline-grid-section"
            >
              <VStack gap={5} width="100%">
                {systemComponents.map((component) => (
                  <LabeledField key={component.name} label={component.name}>
                    <Text color="secondary" as="p" display="block">
                      {component.usage}
                    </Text>
                  </LabeledField>
                ))}
              </VStack>
            </ClotheslineLeaf>
          ) : null}

          {showLeaf("system-grid") && brand.system?.grid?.trim() ? (
            <SectionStub
              id="system-grid"
              title="Grid"
              status={sectionStatusById["system-grid"]}
            />
          ) : null}

          {showLeaf("system-composition") &&
          brand.system?.composition?.trim() ? (
            <LogoAssetSection
              id="system-composition"
              title="Composition"
              context={brand.system.composition}
              status={sectionStatusById["system-composition"]}
            >
              <VStack gap={2} width="100%" className="composition-examples">
                <AssetStage
                  aria-label="Composition principle example"
                  minHeight={480}
                  className="composition-specimen"
                >
                  <EmptyMedia label="Add composition example" />
                </AssetStage>
              </VStack>
            </LogoAssetSection>
          ) : null}

          {showLeaf("system-supporting") &&
          brand.system?.supporting?.trim() ? (
            <LogoAssetSection
              id="system-supporting"
              title="Supporting device"
              context={brand.system.supporting}
              status={sectionStatusById["system-supporting"]}
            >
              <ImageGrid
                aria-label="Supporting device specimens"
                columns={3}
                gap={3}
                ratio={1}
                items={[
                  {
                    id: "system-device-1",
                    background: "var(--color-background-muted)",
                    tone: "light",
                  },
                  {
                    id: "system-device-2",
                    background: "var(--color-background-muted)",
                    tone: "light",
                  },
                  {
                    id: "system-device-3",
                    background: "var(--color-background-muted)",
                    tone: "light",
                  },
                ]}
              />
            </LogoAssetSection>
          ) : null}
        </ChapterSection>

        {enabledChapterIds.has("animation") ? (
        <ChapterSection id={animationChapter.id} title={animationChapter.title}>
          <GraphicStatement id="animation-introduction">
            {brand.animation.introduction}
          </GraphicStatement>

          <PrinciplesSection
            id="animation-principles"
            intro={brand.animation.principles.intro}
            items={brand.animation.principles.items}
            status={sectionStatusById["animation-principles"]}
          />

          <AnimationPersonalitySection
            id="animation-personality"
            intro={brand.animation.personality.intro}
            defaultName={brand.animation.personality.default}
            items={brand.animation.personality.items}
            status={sectionStatusById["animation-personality"]}
          />

          <AnimationArchetypesSection
            id="animation-archetypes"
            intro={brand.animation.archetypes.intro}
            items={brand.animation.archetypes.items}
            status={sectionStatusById["animation-archetypes"]}
          />

          <AnimationInteractionsSection
            id="animation-interactions"
            intro={brand.animation.interactions.intro}
            items={brand.animation.interactions.items}
            status={sectionStatusById["animation-interactions"]}
          />

          <LogoAssetSection
            id="animation-donts"
            title="Don’ts"
            context={brand.animation.donts.context}
            status={sectionStatusById["animation-donts"]}
          >
            <DontGrid
              aria-label="Animation don’ts"
              columns={3}
              items={animationDontItems(brand.animation.donts.items)}
            />
          </LogoAssetSection>
        </ChapterSection>
        ) : null}

        {enabledChapterIds.has("applications") ? (
        <ChapterSection id={applicationsChapter.id} title={applicationsChapter.title}>
          {applicationsNavItems.map((item) => {
            const expression = brand.expressions.items.find((row) => {
              const channelKey = row.channel.trim().toLowerCase();
              return (
                channelKey === item.label.trim().toLowerCase() ||
                applicationChannelToLeafId(row.channel) === item.id
              );
            });
            if (!expression) return null;

            const channelKey = item.label.trim().toLowerCase();
            const multiImage =
              channelKey === "social" ||
              channelKey === "digital ads" ||
              channelKey === "out of home";

            return (
              <ApplicationSection
                key={item.id}
                id={item.id}
                title={item.label}
                context={`${expression.title}. ${expression.copy}`}
                sample={expression.sample}
                images={multiImage ? 3 : 1}
                status={sectionStatusById[item.id]}
              />
            );
          })}
        </ChapterSection>
        ) : null}

        <ChapterSection id={utilitiesChapter.id} title={utilitiesChapter.title}>
          <BrandingQuestionnaire prompt={questionnairePrompt} />
          <BrandDocument brand={brand} gaps={completeness} />
        </ChapterSection>

        <footer className="footer">
          {brand.setup.status === "populated" ? (
            <p>
              {brand.name} · Agents: prefer brand.json (compiled)
            </p>
          ) : (
            <>
              <p>
                {brand.name} · Customize <code>brand.md</code> (including Design
                system)
              </p>
              <p>Grayscale starter · Agents: prefer brand.json (compiled)</p>
            </>
          )}
        </footer>
      </GuideColumn>
    </AppShell>
  );
}
