/**
 * Completeness checklist for the Brand document utility.
 * Keep required paths aligned with scripts/compile-brand.mjs need() checks (~1238–1291).
 */

import type { BrandGuideViewModel } from "@/lib/brand-types";

export type FieldGapStatus = "ok" | "empty" | "stub" | "sample";

export type CompletenessField = {
  path: string;
  label: string;
  value: string;
  status: FieldGapStatus;
  hint?: string;
};

export type CompletenessSection = {
  id: string;
  title: string;
  fields: readonly CompletenessField[];
};

export type BrandCompleteness = {
  summary: {
    ok: number;
    empty: number;
    stub: number;
    sample: number;
    attention: number;
  };
  sections: readonly CompletenessSection[];
};

const STUB_RE = /^(\.\.\.|…|TBD|TODO|FIXME|\.)$/i;
const SAMPLE_NAME = "Sample Brand";
const SAMPLE_TAGLINE = "Clear work, plainly said.";

function isStub(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return STUB_RE.test(trimmed);
}

function looksLikeSample(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  return (
    v === SAMPLE_NAME ||
    v === SAMPLE_TAGLINE ||
    v.includes(SAMPLE_NAME) ||
    /\bSample Brand\b/i.test(v)
  );
}

function classify(
  value: string,
  opts: { treatSample: boolean },
): FieldGapStatus {
  const trimmed = value.trim();
  if (!trimmed) return "empty";
  if (isStub(trimmed)) return "stub";
  if (opts.treatSample && looksLikeSample(trimmed)) return "sample";
  return "ok";
}

function field(
  path: string,
  label: string,
  value: string,
  treatSample: boolean,
  hint?: string,
): CompletenessField {
  return {
    path,
    label,
    value: value.trim(),
    status: classify(value, { treatSample }),
    hint,
  };
}

function listValue(items: readonly string[]): string {
  return items.map((item) => item.trim()).filter(Boolean).join(" · ");
}

/**
 * Assess brand guide fields for missing / stub / starter residue.
 */
export function assessBrandCompleteness(
  brand: BrandGuideViewModel,
): BrandCompleteness {
  const treatSample =
    brand.setup.status === "starter" || brand.name.trim() === SAMPLE_NAME;

  const strategy: CompletenessField[] = [
    field("name", "Name", brand.name, treatSample),
    field("tagline", "Tagline", brand.tagline, treatSample),
    field(
      "strategy.actLabel",
      "Act label",
      brand.strategy.actLabel,
      treatSample,
    ),
    field(
      "strategy.overview.what",
      "What",
      brand.strategy.overview.what,
      treatSample,
    ),
    field(
      "strategy.overview.problem",
      "Problem",
      brand.strategy.overview.problem,
      treatSample,
    ),
    field(
      "strategy.overview.current",
      "Current",
      brand.strategy.overview.current,
      treatSample,
    ),
    field(
      "strategy.overview.opportunity",
      "Opportunity",
      brand.strategy.overview.opportunity,
      treatSample,
    ),
    field(
      "strategy.overview.solution",
      "Solution",
      brand.strategy.overview.solution,
      treatSample,
    ),
    field(
      "strategy.promise.mission",
      "Mission",
      brand.strategy.promise.mission,
      treatSample,
    ),
    field(
      "strategy.promise.purpose",
      "Purpose",
      brand.strategy.promise.purpose,
      treatSample,
    ),
    field(
      "strategy.promise.position",
      "Position",
      brand.strategy.promise.position,
      treatSample,
    ),
    field(
      "strategy.promise.promise",
      "Promise",
      brand.strategy.promise.promise,
      treatSample,
    ),
    field(
      "strategy.positioning.statement",
      "Positioning statement",
      brand.strategy.positioning.statement,
      treatSample,
    ),
    field(
      "strategy.vision.statement",
      "Vision statement",
      brand.strategy.vision.statement,
      treatSample,
    ),
    field(
      "strategy.mission.statement",
      "Mission statement",
      brand.strategy.mission.statement,
      treatSample,
    ),
    field(
      "strategy.audience.groups",
      "Audience groups",
      brand.strategy.audience.groups.length > 0
        ? brand.strategy.audience.groups
            .map((g) => g.segments.join(", "))
            .join("; ")
        : "",
      treatSample,
      "At least one audience group",
    ),
    field(
      "strategy.pillars",
      "Message pillars",
      brand.strategy.pillars.items.length > 0
        ? brand.strategy.pillars.items.map((p) => p.name).join(" · ")
        : "",
      treatSample,
      "At least one pillar row",
    ),
    field(
      "strategy.archetype.name",
      "Archetype",
      brand.strategy.archetype.name,
      treatSample,
    ),
    field(
      "strategy.personality.traits",
      "Attributes",
      listValue(brand.strategy.personality.traits),
      treatSample,
    ),
    field(
      "strategy.personality.weAre",
      "We are",
      listValue(brand.strategy.personality.weAre),
      treatSample,
    ),
    field(
      "strategy.personality.weAreNot",
      "We are not",
      listValue(brand.strategy.personality.weAreNot),
      treatSample,
    ),
    field(
      "strategy.guardrails.tone",
      "Tone summary",
      brand.strategy.guardrails.tone,
      treatSample,
    ),
    field(
      "strategy.guardrails.litmus",
      "Litmus test",
      brand.strategy.guardrails.litmus,
      treatSample,
    ),
  ];

  const voice: CompletenessField[] = [
    field("voice.actLabel", "Act label", brand.voice.actLabel, treatSample),
    field("voice.identity", "Identity", brand.voice.identity, treatSample),
    field("voice.essence", "Essence", brand.voice.essence, treatSample),
    field(
      "voice.principles",
      "Principles",
      brand.voice.principles.items.length > 0
        ? brand.voice.principles.items.map((p) => p.title).join(" · ")
        : "",
      treatSample,
      "At least one principle row",
    ),
    field(
      "voice.tagline.statement",
      "Tagline",
      brand.voice.tagline.statement,
      treatSample,
    ),
    field("voice.story.long", "Story long", brand.voice.story.long, treatSample),
    field(
      "voice.story.short",
      "Story short",
      brand.voice.story.short,
      treatSample,
    ),
    field(
      "voice.headlines",
      "Headlines",
      listValue(brand.voice.headlines.items),
      treatSample,
    ),
    field(
      "voice.cta.do",
      "CTA do",
      listValue(brand.voice.cta.do),
      treatSample,
    ),
    field(
      "voice.phrases",
      "Phrases",
      listValue(brand.voice.phrases),
      treatSample,
    ),
    field(
      "voice.andYet",
      "And / yet",
      brand.voice.andYet.pairs.length > 0
        ? brand.voice.andYet.pairs
            .map((p) => `${p.lean} / ${p.yet}`)
            .join(" · ")
        : "",
      treatSample,
      "Lean | And yet rows",
    ),
    field(
      "voice.weSay",
      "We say / never say",
      brand.voice.weSay.length > 0
        ? brand.voice.weSay.map((r) => r.say).join(" · ")
        : "",
      treatSample,
    ),
    field(
      "voice.contexts",
      "Tone by context",
      brand.voice.contexts.items.length > 0
        ? brand.voice.contexts.items.map((c) => c.context).join(" · ")
        : "",
      treatSample,
      "Context | Guidance | Example",
    ),
  ];

  const visual: CompletenessField[] = [
    field(
      "visual.actLabel",
      "Act label",
      brand.visual.actLabel,
      treatSample,
    ),
    field(
      "visual.colors.intro",
      "Colors intro",
      brand.visual.colors.intro,
      treatSample,
    ),
    field(
      "visual.typography.note",
      "Type note",
      brand.visual.typography.note,
      treatSample,
    ),
    field(
      "visual.logo.description",
      "Logo description",
      brand.visual.logo.description,
      treatSample,
    ),
    field(
      "visual.logo.donts",
      "Logo donts",
      listValue(brand.visual.logo.donts),
      treatSample,
    ),
    field(
      "visual.imagery.tone",
      "Imagery tone",
      brand.visual.imagery.tone,
      treatSample,
    ),
  ];

  const expressions: CompletenessField[] = [
    field(
      "expressions.actLabel",
      "Act label",
      brand.expressions.actLabel,
      treatSample,
    ),
    field(
      "expressions.items",
      "Channel expressions",
      brand.expressions.items.length > 0
        ? brand.expressions.items.map((e) => e.channel).join(" · ")
        : "",
      treatSample,
      "Channel | Title | Copy | Sample",
    ),
  ];

  const chapterToggles = brand.setup.chapters;
  const logoOn = chapterToggles?.logo !== "off";
  const photographyOn = chapterToggles?.photography !== "off";
  const applicationsOn = chapterToggles?.applications !== "off";

  const visualFields = visual.filter((f) => {
    if (f.path.startsWith("visual.logo") && !logoOn) return false;
    if (f.path.startsWith("visual.imagery") && !photographyOn) return false;
    return true;
  });

  const sections: CompletenessSection[] = [
    { id: "strategy", title: "Strategy", fields: strategy },
    { id: "voice", title: "Voice", fields: voice },
    { id: "visual", title: "Visual", fields: visualFields },
    ...(applicationsOn
      ? [{ id: "expressions", title: "Expressions", fields: expressions }]
      : []),
    {
      id: "design-system",
      title: "Design system",
      fields: [
        field(
          "design-system.note",
          "Tokens",
          "Authored in brand.md Design system fence → compile emits tokens. See System chapter.",
          false,
          "Not re-checked here — edit the Design system section in brand.md",
        ),
      ],
    },
  ];

  let ok = 0;
  let empty = 0;
  let stub = 0;
  let sample = 0;
  for (const section of sections) {
    for (const f of section.fields) {
      switch (f.status) {
        case "ok":
          ok += 1;
          break;
        case "empty":
          empty += 1;
          break;
        case "stub":
          stub += 1;
          break;
        case "sample":
          sample += 1;
          break;
        default: {
          const _exhaustive: never = f.status;
          void _exhaustive;
        }
      }
    }
  }

  return {
    summary: {
      ok,
      empty,
      stub,
      sample,
      attention: empty + stub + sample,
    },
    sections,
  };
}

export function gapBadgeLabel(status: FieldGapStatus): string | null {
  switch (status) {
    case "ok":
      return null;
    case "empty":
      return "Missing";
    case "stub":
      return "Stub";
    case "sample":
      return "Starter";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}
