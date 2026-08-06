import { Button } from "@astryxdesign/core/Button";
import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
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
import { GraphicStatement } from "@/components/GraphicStatement";
import { GuideColumn } from "@/components/GuideColumn";
import { GuideHero } from "@/components/GuideHero";
import { GuardrailsSection } from "@/components/GuardrailsSection";
import { HeadlinesSection } from "@/components/HeadlinesSection";
import { AssetStage } from "@/components/AssetStage";
import { DontGrid, type DontGridItem } from "@/components/DontGrid";
import { ImageGrid, type ImageGridItem } from "@/components/ImageGrid";
import {
  PhotographyCategoriesSection,
  type PhotographyCategoryNavItem,
} from "@/components/PhotographyCategoriesSection";
import { PhotographyCategorySection } from "@/components/PhotographyCategorySection";
import { LogoAssetSection } from "@/components/LogoAssetSection";
import { LogoUseItem } from "@/components/LogoUseItem";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { ScaleStack, type ScaleStackStep } from "@/components/ScaleStack";
import { SectionStub } from "@/components/SectionStub";
import { SetupSourceCard } from "@/components/SetupSourceCard";
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
import { loadBrand, type ColorSwatch } from "@/lib/load-brand";
import { assessBrandCompleteness } from "@/lib/brand-completeness";
import { sectionLeafStyle } from "@/lib/section-leaf";
import { GUIDE_CHAPTERS } from "@/lib/nav";
import "@/styles/flourish/hero.css";
import "@/styles/flourish/logo-collage.css";
import "@/styles/flourish/type-principles.css";
import "@/styles/flourish/type-treatment.css";

function toColorTiles(colors: readonly ColorSwatch[]): ColorTileItem[] {
  return colors.map((color) => ({
    id: color.token,
    name: color.name,
    value: color.value,
  }));
}

/** Approved pairs for the Combinations diagram (outer field + inset). */
function colorCombinationItems(colors: {
  brand: readonly ColorSwatch[];
  secondary: readonly ColorSwatch[];
  interface: readonly ColorSwatch[];
}): ColorCombinationItem[] {
  const ink = colorValue(colors.brand, "Ink", "var(--color-text-primary)");
  const paper = colorValue(
    colors.interface,
    "Gray 1",
    "var(--color-background-surface)",
  );
  const surface = colorValue(
    colors.interface,
    "Gray 3",
    "var(--color-background-card)",
  );
  const muted = colorValue(
    colors.secondary,
    "Ink Muted",
    "var(--color-text-secondary)",
  );

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
  interface: readonly ColorSwatch[];
}): ColorContrastItem[] {
  const ink = colorValue(colors.brand, "Ink", "var(--color-text-primary)");
  const gray1 = colorValue(colors.interface, "Gray 1", "#fcfcfc");
  const gray2 = colorValue(colors.interface, "Gray 2", "#f9f9f9");
  const gray3 = colorValue(colors.interface, "Gray 3", "#f0f0f0");
  const gray7 = colorValue(colors.interface, "Gray 7", "#cecece");
  const gray9 = colorValue(colors.interface, "Gray 9", "#8d8d8d");
  const gray10 = colorValue(colors.interface, "Gray 10", "#838383");
  const paper = "var(--color-background-surface)";

  return [
    {
      id: "contrast-light-do",
      background: gray2,
      left: ink,
      right: gray7,
      caption: "Always do this",
      chipTone: "dark",
    },
    {
      id: "contrast-light-dont",
      background: gray2,
      left: gray1,
      right: gray3,
      caption: "Don’t do this",
      struck: true,
      chipTone: "dark",
    },
    {
      id: "contrast-dark-do",
      background: ink,
      left: paper,
      right: gray7,
      caption: "Always do this",
      chipTone: "light",
    },
    {
      id: "contrast-dark-dont",
      background: ink,
      left: gray10,
      right: gray9,
      caption: "Don’t do this",
      struck: true,
      chipTone: "light",
    },
  ];
}

function colorValue(
  colors: readonly ColorSwatch[],
  name: string,
  fallback: string,
): string {
  return colors.find((c) => c.name === name)?.value ?? fallback;
}

/** First named face from a CSS font-family stack. */
function faceNameFromStack(stack: string): string {
  return stack.split(",")[0]?.trim() || stack;
}

/** Designated brand weights from Design system → Type tokens. */
function typeWeightItems(family: string): TypeWeightItem[] {
  return [
    {
      id: "weight-semibold",
      label: `${family} Semibold`,
      weight: "semibold",
    },
    {
      id: "weight-medium",
      label: `${family} Medium`,
      weight: "medium",
    },
    {
      id: "weight-regular",
      label: `${family} Regular`,
      weight: "normal",
    },
  ];
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
function typeHierarchyLevels(family: string): TypeHierarchyLevel[] {
  return [
    {
      id: "hierarchy-headline",
      role: "Headline",
      face: `${family} Semibold`,
      size: "Display / 1.1",
      casing: "Sentence case",
      sample:
        "Headlines nulla vitae euismod sem. Integer ut vehicula mauris.",
      fontSize: "var(--font-size-display)",
      lineHeight: "1.1",
      weight: "semibold",
    },
    {
      id: "hierarchy-subhead",
      role: "Subhead",
      face: `${family} Semibold`,
      size: "XL / 1.2",
      casing: "Sentence case",
      sample:
        "Subheads suspendisse aliquet at dui eu pellentesque. In dui turpis, mollis vel est ullamcorper, bibendum consectetur massa.",
      fontSize: "var(--font-size-xl)",
      lineHeight: "1.2",
      weight: "semibold",
    },
    {
      id: "hierarchy-body",
      role: "Body",
      face: `${family} Regular`,
      size: "Base / 1.55",
      casing: "Sentence case",
      sample:
        "Body phasellus at ornare mauris, eu viverra tellus. Curabitur sit amet lorem lorem. Praesent vel turpis ex. Pellentesque in felis ante. In massa dolor, porta sed dictum non, gravida et urna. Phasellus imperdiet ligula eu neque blandit, vitae lacinia augue consequat.",
      fontSize: "var(--font-size-base)",
      lineHeight: "var(--line-height-body)",
      weight: "normal",
    },
  ];
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

function logoOnColorItems(
  brandName: string,
  colors: {
    brand: readonly ColorSwatch[];
    secondary: readonly ColorSwatch[];
    interface: readonly ColorSwatch[];
  },
): ImageGridItem[] {
  const wordmark = logoWordmark(brandName);

  return [
    {
      id: "on-paper",
      background: colorValue(
        colors.interface,
        "Paper",
        "var(--color-background-surface)",
      ),
      tone: "light",
      children: wordmark,
    },
    {
      id: "on-surface",
      background: colorValue(
        colors.interface,
        "Surface",
        "var(--color-background-card)",
      ),
      tone: "light",
      children: wordmark,
    },
    {
      id: "on-ink-muted",
      background: colorValue(
        colors.secondary,
        "Ink Muted",
        "var(--color-text-secondary)",
      ),
      tone: "dark",
      children: wordmark,
    },
    {
      id: "on-ink",
      background: colorValue(
        colors.brand,
        "Ink",
        "var(--color-text-primary)",
      ),
      tone: "dark",
      children: wordmark,
    },
  ];
}

/** One-row reverse pair: ink-on-paper and paper-on-ink. */
function logoSingleColorItems(
  brandName: string,
  colors: {
    brand: readonly ColorSwatch[];
    interface: readonly ColorSwatch[];
  },
): ImageGridItem[] {
  const wordmark = logoWordmark(brandName);

  return [
    {
      id: "single-on-ink",
      background: colorValue(
        colors.brand,
        "Ink",
        "var(--color-text-primary)",
      ),
      tone: "dark",
      children: wordmark,
    },
    {
      id: "single-on-paper",
      background: colorValue(
        colors.interface,
        "Paper",
        "var(--color-background-surface)",
      ),
      tone: "light",
      children: wordmark,
    },
  ];
}

/** Default cascade widths; override per brand with assets via `src` / step `src`. */
const LOGO_SCALE_STEPS: readonly ScaleStackStep[] = [
  { id: "scale-xl", width: 320 },
  { id: "scale-lg", width: 200 },
  { id: "scale-md", width: 140 },
  { id: "scale-sm", width: 96 },
  { id: "scale-xs", width: 64 },
  { id: "scale-min", width: 20, label: "20px min" },
];

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

/** Color don’ts — placeholder specimens (swap for assets via `src`). */
function colorDontItems(): DontGridItem[] {
  return Array.from({ length: 6 }, (_, index) => ({
    id: `color-dont-${index}`,
    caption: "Don’t do this",
  }));
}

/** Photography don’ts from imagery.avoid (comma-separated) + placeholders. */
function photographyDontItems(avoid: string): DontGridItem[] {
  const parts = avoid
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const captions =
    parts.length > 0
      ? parts.map((part) =>
          /^don[’']t/i.test(part) ? part : `Don’t use ${part.toLowerCase()}`,
        )
      : ["Don’t do this", "Don’t do this", "Don’t do this"];

  return captions.map((caption, index) => ({
    id: `photo-dont-${index}`,
    caption,
  }));
}

function photographyCategoryNav(): PhotographyCategoryNavItem[] {
  return [
    { id: "photography-category-subjects", label: "Subjects" },
    { id: "photography-category-settings", label: "Settings" },
    { id: "photography-category-product", label: "Product" },
    { id: "photography-category-moments", label: "Moments" },
  ];
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

const APPLICATION_PLACEHOLDER_CONTEXT =
  "Describe how the brand appears in this channel. Include example applications below.";

/** Applications leaf: label + description + one AssetStage or many ImageGrid cells. */
function ApplicationSection({
  id,
  title,
  context,
  sample,
  images = 1,
}: {
  id: string;
  title: string;
  context: string;
  /** Temporary stage copy until real application assets exist. */
  sample?: string;
  /** 1 → AssetStage; 2+ → ImageGrid. */
  images?: number;
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
  ) : null;

  return (
    <LogoAssetSection id={id} title={title} context={context}>
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
            children: index === 0 ? sampleNode : undefined,
          }))}
        />
      )}
    </LogoAssetSection>
  );
}

export default function Home() {
  const brand = loadBrand();
  const completeness = assessBrandCompleteness(brand);
  const questionnairePrompt =
    brand.setup.sources.find((s) =>
      s.label.toLowerCase().includes("questionnaire"),
    )?.prompt ?? brand.setup.prompt;
  const [
    strategyChapter,
    languageChapter,
    logoChapter,
    typographyChapter,
    colorChapter,
    photographyChapter,
    systemChapter,
    applicationsChapter,
    utilitiesChapter,
  ] = GUIDE_CHAPTERS;

  const expressionByChannel = Object.fromEntries(
    brand.expressions.items.map((item) => [
      item.channel.trim().toLowerCase(),
      item,
    ]),
  );

  return (
    <AppShell brandName={brand.name} groups={brand.nav}>
      <GuideColumn>
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
              <Text
                as="p"
                color="secondary"
                display="block"
                className="hero-support"
              >
                Build from scratch with the{" "}
                <a href="#utilities-branding-questionnaire">
                  Branding Questionnaire
                </a>
                , or hand your agent a website, PDF, brand.md, or Figma file —
                we&apos;ll fold what you have into this guide.
              </Text>

              <Grid
                className="setup-sources"
                columns={{ minWidth: 280, max: 2 }}
                gap={6}
                rowGap={8}
                width="100%"
                aria-label="Accepted sources"
              >
                {brand.setup.sources.map((source) => (
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
                style={{ background: "var(--color-text-primary)" }}
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
          />

          <StatementSection
            id="strategy-positioning"
            title="Positioning"
            intro={brand.strategy.positioning.intro}
            statement={brand.strategy.positioning.statement}
          />

          <StatementSection
            id="strategy-vision"
            title="Vision"
            intro={brand.strategy.vision.intro}
            statement={brand.strategy.vision.statement}
          />

          <StatementSection
            id="strategy-mission"
            title="Mission"
            intro={brand.strategy.mission.intro}
            statement={brand.strategy.mission.statement}
          />

          <ClotheslineGrid
            id="strategy-values"
            title="Values"
            intro={brand.strategy.values.intro}
            items={brand.strategy.values.items}
          />

          <ClotheslineGrid
            id="strategy-personality"
            title="Personality"
            intro={brand.strategy.personality.intro}
            items={brand.strategy.personality.items}
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
              body: pillar.summary,
            }))}
          />

          <GuardrailsSection
            id="strategy-guardrails"
            intro={brand.strategy.guardrails.intro}
            tone={brand.strategy.guardrails.tone}
            cannotBe={brand.strategy.guardrails.cannotBe}
            litmus={brand.strategy.guardrails.litmus}
          />
        </ChapterSection>

        <ChapterSection id={languageChapter.id} title={languageChapter.title}>
          <GraphicStatement id="language-introduction">
            {brand.voice.identity}
          </GraphicStatement>

          <PrinciplesSection
            intro={brand.voice.principles.intro}
            items={brand.voice.principles.items}
          />

          <StatementSection
            id="language-tagline"
            title="Tagline"
            intro={brand.voice.tagline.intro}
            statement={brand.voice.tagline.statement}
          />

          <StorySection
            intro={brand.voice.story.intro}
            long={brand.voice.story.long}
            medium={brand.voice.story.medium}
            short={brand.voice.story.short}
          />

          <HeadlinesSection
            intro={brand.voice.headlines.intro}
            items={brand.voice.headlines.items}
          />

          <CtaSection
            intro={brand.voice.cta.intro}
            doItems={brand.voice.cta.do}
            dontItems={brand.voice.cta.dont}
          />

          <VoiceSpectrumSection
            intro={brand.voice.spectrum.intro}
            rows={brand.voice.spectrum.rows}
          />

          <AndYetSection
            intro={brand.voice.andYet.intro}
            pairs={brand.voice.andYet.pairs}
          />

          <ContextSection
            intro={brand.voice.contexts.intro}
            items={brand.voice.contexts.items}
          />
        </ChapterSection>

        <ChapterSection id={logoChapter.id} title={logoChapter.title}>
          <GraphicStatement id="logo-introduction">
            {brand.visual.logo.description}
          </GraphicStatement>

          <LogoAssetSection
            id="logo-background"
            title="Background"
            context="Include a background on the logo history or approach here if applicable. Use an image if you need a visual aid."
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
            action={<Button label="Download" variant="primary" />}
          >
            <AssetStage aria-label={`${brand.name} logo`}>
              <Text
                type="display-2"
                weight="bold"
                color="primary"
                display="block"
                className="logo-stage-wordmark"
              >
                {brand.name}
              </Text>
            </AssetStage>
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-on-color"
            title="On color"
            context="When combining the logo with brand colors, always ensure there is ample contrast in color pairings. The following examples are approved combinations."
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
          >
            {/* Shared SVG: src="/brand/logo.svg". Size-specific PNGs: set step.src. */}
            <ScaleStack
              aria-label={`${brand.name} logo scaling`}
              steps={LOGO_SCALE_STEPS}
            >
              {logoWordmark(brand.name)}
            </ScaleStack>
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-clearspace"
            title="Clearspace"
            context="Don’t crowd the logo. When placing other elements nearby, ensure minimum clear space for brand consistency. Describe how the clear space is calculated relative to a fixed element from the logo. See example below."
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
                  <Text
                    type="display-2"
                    weight="bold"
                    color="primary"
                    display="block"
                    className="logo-stage-wordmark"
                  >
                    {brand.name}
                  </Text>
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
                  Clearspace ≈ height of a capital letter in the wordmark
                </Text>
              </VStack>
            </AssetStage>
          </LogoAssetSection>

          <SectionStub id="logo-supporting" title="Supporting logo" />

          <LogoAssetSection
            id="logo-use"
            title="Logo use"
            context="Together, the logo, supporting logo, and social icon comprise our logo collection. Though they all represent our brand and should be used, briefly describe how and when each logo should be used."
          >
            <VStack gap={8} width="100%" className="logo-use-stack">
              <LogoUseItem title="Logo" detail="Used most often">
                {logoWordmark(brand.name)}
              </LogoUseItem>
              <LogoUseItem
                title="Supporting logo"
                detail="Pair with the wordmark when a secondary mark helps recognition"
              >
                {logoWordmark(brand.name)}
              </LogoUseItem>
              <LogoUseItem
                title="Social icon"
                detail="Use at small sizes where the full wordmark won’t fit"
              >
                <Text
                  type="display-2"
                  weight="bold"
                  color="primary"
                  display="block"
                  className="logo-stage-wordmark"
                >
                  {brand.name.slice(0, 1)}
                </Text>
              </LogoUseItem>
            </VStack>
          </LogoAssetSection>

          <LogoAssetSection
            id="logo-donts"
            title="Don’ts"
            context="Do not diminish the value of the logo in our brand. Avoid the following treatments."
          >
            <DontGrid
              aria-label="Logo don’ts"
              columns={3}
              items={logoDontItems(brand.name, brand.visual.logo.donts)}
            />
          </LogoAssetSection>
        </ChapterSection>

        <ChapterSection id={typographyChapter.id} title={typographyChapter.title}>
          <GraphicStatement id="typography-introduction">
            {brand.visual.typography.note}
          </GraphicStatement>

          <LogoAssetSection
            id="typography-background"
            title="Background"
            context="Include a background on the typography history or approach here if applicable. Use an image if you need a visual aid."
          >
            {/* Prefer specimen assets: src="/brand/type-background-*.jpg" on ImageGrid items. */}
            <VStack gap={3} width="100%" className="type-background-media">
              <AssetStage
                aria-label={`${brand.visual.typography.family} typography background`}
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
                  >
                    {brand.visual.typography.family}
                  </Text>
                  <Text
                    weight="semibold"
                    color="secondary"
                    display="block"
                    className="type-treatment-meta"
                  >
                    {brand.visual.typography.faces.primary}
                  </Text>
                </VStack>
              </AssetStage>
              <ImageGrid
                aria-label="Typography treatment examples"
                columns={2}
                gap={3}
                items={[
                  {
                    id: "type-family",
                    background: colorValue(
                      brand.visual.colors.interface,
                      "Surface",
                      "var(--color-background-card)",
                    ),
                    tone: "light",
                    children: (
                      <Text
                        weight="bold"
                        display="block"
                        className="type-treatment-display"
                      >
                        {brand.visual.typography.family}
                      </Text>
                    ),
                  },
                  {
                    id: "type-glyph",
                    background: colorValue(
                      brand.visual.colors.interface,
                      "Surface",
                      "var(--color-background-card)",
                    ),
                    tone: "light",
                    children: (
                      <VStack gap={2} hAlign="start" width="100%">
                        <Text
                          type="supporting"
                          color="secondary"
                          display="block"
                        >
                          {brand.visual.typography.faces.fallback}
                        </Text>
                        <Text
                          weight="bold"
                          display="block"
                          className="type-treatment-display"
                        >
                          Aa
                        </Text>
                      </VStack>
                    ),
                  },
                ]}
              />
            </VStack>
          </LogoAssetSection>

          <TypefaceSection
            id="typography-primary"
            title="Primary typeface"
            context={`${brand.visual.typography.family} is our primary typeface. ${brand.visual.typography.note}`}
            faceName={brand.visual.typography.family}
            foundry="Vercel"
            downloadHref="/brand/fonts/primary.zip"
          />

          <TypefaceSection
            id="typography-supporting"
            title="Supporting typeface"
            context={`${faceNameFromStack(brand.visual.typography.faces.fallback)} is our supporting typeface. Use it when the primary face is unavailable or for system fallbacks.`}
            faceName={faceNameFromStack(brand.visual.typography.faces.fallback)}
            foundry="IBM"
            fontFamily={brand.visual.typography.faces.fallback}
            downloadHref="/brand/fonts/supporting.zip"
          />

          <TypeWeightsSection
            id="typography-weights"
            context="Type weight provides hierarchy to distinguish between pieces of information. Use this as a guide for typeface weights employed in our brand."
            items={typeWeightItems(brand.visual.typography.family)}
          />

          <TypeSpecimenSection
            id="typography-specimen"
            context="Typefaces transfer the voice of an organization to the reader."
            items={typeWeightItems(brand.visual.typography.family).filter(
              (item) => item.weight === "semibold" || item.weight === "normal",
            )}
          />

          <SectionStub id="typography-setting" title="Setting type" />

          <TypeHierarchySection
            id="typography-hierarchy"
            context="Size, scale and position all play a factor in how information is read. Always ensure there is a purposeful difference between type sizes. Type sizes are for example only."
            levels={typeHierarchyLevels(brand.visual.typography.family)}
          />

          <SectionStub id="typography-testing" title="Testing type" />

          <TypePrinciplesSection
            id="typography-principles"
            context="This is a guide that outlines general typesetting principles. Use them as a reference any time our typefaces are used."
            items={typePrincipleItems()}
          />

          <LogoAssetSection
            id="typography-donts"
            title="Don’ts"
            context="Do not diminish the value of typography in our brand. Avoid the following treatments."
          >
            <DontGrid
              aria-label="Typography don’ts"
              columns={3}
              items={typeDontItems(brand.visual.typography.family)}
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
          >
            <ColorTiles
              colors={toColorTiles(brand.visual.colors.brand)}
              aria-label="Primary palette colors"
            />
          </ColorPaletteSection>

          <ColorPaletteSection
            id="color-secondary"
            title="Secondary palette"
            context="Supporting tones for hierarchy without introducing a second brand hue."
          >
            <ColorTiles
              colors={toColorTiles(brand.visual.colors.secondary)}
              aria-label="Secondary palette colors"
            />
          </ColorPaletteSection>

          <ColorPaletteSection
            id="color-interface"
            title="Interface"
            context="Twelve-step scale for UI surfaces, borders, and text — Radix-style steps, not decorative accents."
          >
            <ColorTiles
              colors={toColorTiles(brand.visual.colors.interface)}
              columns={6}
              aria-label="Interface colors"
            />
          </ColorPaletteSection>

          <SectionStub id="color-proportion" title="Proportion" />

          <ColorPaletteSection
            id="color-combinations"
            title="Combinations"
            context="Some colors are not suitable to be used in combination with others. The following diagram demonstrates approved color combinations."
          >
            <ColorCombinations
              items={colorCombinationItems(brand.visual.colors)}
            />
          </ColorPaletteSection>

          <ColorPaletteSection
            id="color-contrast"
            title="Contrast"
            context="When using our colors in design, keep in mind how contrast may affect legibility. The following diagram demonstrates color contrast relationships. Use this as a starting point when combining colors."
          >
            <ColorContrastGrid
              items={colorContrastItems(brand.visual.colors)}
            />
          </ColorPaletteSection>

          <ColorPaletteSection
            id="color-donts"
            title="Don’ts"
            context="Do not diminish the value of color in our brand. Avoid the following treatments."
          >
            <DontGrid
              aria-label="Color don’ts"
              columns={3}
              items={colorDontItems()}
            />
          </ColorPaletteSection>
        </ChapterSection>

        <ChapterSection id={photographyChapter.id} title={photographyChapter.title}>
          <GraphicStatement id="photography-introduction">
            {brand.visual.imagery.tone}
          </GraphicStatement>

          <PhotographyCategoriesSection
            id="photography-categories"
            context="Imagery is broken into the following categories. Briefly describe the rationale behind the categories."
            items={photographyCategoryNav()}
          />

          <PhotographyCategorySection
            id="photography-category-subjects"
            title="Subjects"
            context={brand.visual.imagery.subjects}
          />

          <PhotographyCategorySection
            id="photography-category-settings"
            title="Settings"
            context={brand.visual.imagery.settings}
          />

          <PhotographyCategorySection
            id="photography-category-product"
            title="Product"
            context="Product-in-context: tools and surfaces in honest use, never catalog-white isolation."
          />

          <PhotographyCategorySection
            id="photography-category-moments"
            title="Moments"
            context="Quiet candid beats — focused work, natural pause, reflective hope without staging."
          />

          <LogoAssetSection
            id="photography-principles"
            title="Principles"
            context={brand.visual.imagery.tone}
          />

          <LogoAssetSection
            id="photography-donts"
            title="Don’ts"
            context="Do not diminish the value of imagery in our brand. Avoid the following treatments."
          >
            <DontGrid
              aria-label="Photography don’ts"
              columns={3}
              items={photographyDontItems(brand.visual.imagery.avoid)}
            />
          </LogoAssetSection>
        </ChapterSection>

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
            Layout and composition guidance for the design system — the grid,
            structure, and supporting devices that keep every surface consistent.
          </GraphicStatement>
          <SectionStub id="system-grid" title="Grid" />
          <LogoAssetSection
            id="system-composition"
            title="Composition"
            context="Describe any composition principles in how the identity comes to life. Include examples to demonstrate these principles."
          >
            {/* Prefer a composition asset: <img src="/brand/composition-*.jpg" alt="…" /> */}
            <VStack gap={2} width="100%" className="composition-examples">
              <AssetStage
                aria-label="Composition principle example"
                minHeight={480}
                className="composition-specimen"
              >
                <VStack
                  gap={6}
                  width="100%"
                  hAlign="stretch"
                  vAlign="between"
                  className="composition-specimen-layout"
                >
                  <HStack
                    hAlign="center"
                    vAlign="center"
                    width="100%"
                    className="composition-media-frame"
                    style={{
                      border: "1px solid var(--color-border)",
                      background: "var(--color-background-card)",
                    }}
                    aria-hidden="true"
                  />
                  <HStack
                    gap={4}
                    hAlign="between"
                    vAlign="end"
                    width="100%"
                    className="composition-specimen-footer"
                  >
                    <Text
                      type="display-2"
                      weight="bold"
                      color="secondary"
                      display="block"
                      className="composition-headline"
                    >
                      This is a brief headline.
                    </Text>
                    <Text
                      weight="bold"
                      color="secondary"
                      display="block"
                      className="composition-logo"
                    >
                      Logo
                    </Text>
                  </HStack>
                </VStack>
              </AssetStage>
              <Text
                color="secondary"
                type="supporting"
                display="block"
                className="composition-caption"
              >
                Caption describing composition principle
              </Text>
            </VStack>
          </LogoAssetSection>
          <LogoAssetSection
            id="system-supporting"
            title="Supporting device"
            context="If applicable, describe a supporting device used in the identity system and its role. Add as much guidance as needed in this section."
          >
            {/* Prefer device assets: src="/brand/device-*.svg" (or jpg) on ImageGrid items. */}
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
                {
                  id: "system-device-4",
                  background: "var(--color-background-muted)",
                  tone: "light",
                },
                {
                  id: "system-device-5",
                  background: "var(--color-background-muted)",
                  tone: "light",
                },
                {
                  id: "system-device-6",
                  background: "var(--color-background-muted)",
                  tone: "light",
                },
              ]}
            />
          </LogoAssetSection>
        </ChapterSection>

        <ChapterSection id={applicationsChapter.id} title={applicationsChapter.title}>
          {applicationsChapter.items.map((item) => {
            const channelKey = item.label.trim().toLowerCase();
            const expression = expressionByChannel[channelKey];
            const multiImage =
              channelKey === "social" ||
              channelKey === "digital ads" ||
              channelKey === "out of home";

            return (
              <ApplicationSection
                key={item.id}
                id={item.id}
                title={item.label}
                context={
                  expression
                    ? `${expression.title}. ${expression.copy}`
                    : APPLICATION_PLACEHOLDER_CONTEXT
                }
                sample={expression?.sample}
                images={multiImage ? 3 : 1}
              />
            );
          })}
        </ChapterSection>

        <ChapterSection id={utilitiesChapter.id} title={utilitiesChapter.title}>
          <BrandingQuestionnaire prompt={questionnairePrompt} />
          <BrandDocument brand={brand} gaps={completeness} />
        </ChapterSection>

        <footer className="footer">
          <p>
            {brand.name} · Customize <code>brand.md</code> (including Design
            system)
          </p>
          <p>Grayscale starter · Agents: prefer brand.json (compiled)</p>
        </footer>
      </GuideColumn>
    </AppShell>
  );
}
