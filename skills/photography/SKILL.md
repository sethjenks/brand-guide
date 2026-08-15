---
file: photography
skill_id: photography
skills_spec_version: 1.0.0
version: 1.1.0
depth: deep
status: stable
priority: 2
retrieval_tags: [photography, imagery, skill]
summary: >
  Chapter skill router for Photography (ops: populate, audit, improve).
  Adaptive category leaves; compile crop/style/mood/product/moments; hide empty.
ops: [populate, audit, improve]
writes:
  - brand.md#Visual/Photography
  - rules.md#Photography
  - examples.md#Imagery examples
---

# Photography

Guide chapter **Photography** is authored as `brand.md` → Visual → **Photography / Imagery**.

## Op picker

| Op | Use when |
| --- | --- |
| [`populate`](populate.md) | Imagery labels empty/placeholder, or user asks to build Photography |
| [`audit`](audit.md) | Content exists; pre-ship review; stub/placeholder detection |
| [`improve`](improve.md) | Tighten mood, categories, prompts, or few-shots |

If unclear, ask. Default: **audit** when Imagery fields exist, **populate** when they are empty. Whole-brand [`intake/`](../../intake/) still wins when `brand/setup.json` is `starter` and `intake` is `pending` — do not chapter-populate first.

## Read order

1. This file (field map)
2. `brand.md` → `### Photography / Imagery`
3. [`rules.md`](../../rules.md) → `## Photography`
4. [`examples.md`](../../examples.md) → `## Imagery examples`
5. [`guide/src/lib/section-status.ts`](../../guide/src/lib/section-status.ts) + `filterNavForAuthoredLeaves`
6. Compiled `brand.json` → `guide.visual.imagery` (read-only after compile)

## Write targets

Keep `**Label.**` names — `compile-brand.mjs` keys off them. Share `leafId`s with the guide.

| leafId | Label / source | Compiles to | Hide-empty |
| --- | --- | --- | --- |
| `photography-introduction` | `**Imagery introduction.**` | `guide.visual.imagery.introduction` (chapter intro: 12–28 words, statement-only) | always-on |
| — | `**Imagery style.**` / `**Imagery mood.**` / `**Imagery tone.**` | `imagery.style` / `mood` / `guide.visual.imagery.tone` (tone = short mood phrase) | — |
| — | `**Concealed crop.**` | `imagery.crop` | — |
| `photography-category-subjects` | `**Imagery subjects.**` | `guide.visual.imagery.subjects` | hide when empty |
| `photography-category-settings` | `**Imagery settings.**` | `guide.visual.imagery.settings` | hide when empty |
| `photography-category-product` | `**Imagery product.**` or `**Imagery prompt product.**` | `imagery.product` | hide when empty |
| `photography-category-moments` | `**Imagery moments.**` or `**Imagery prompt lifestyle.**` | `imagery.moments` | hide when empty |
| `photography-donts` | `**Imagery avoid.**` | `guide.visual.imagery.avoid` (split `·` / `,` / newlines via `splitList`) | hide when empty |
| — | `**Imagery negative.**` | `imagery.negative_prompts` (prefer `·`-separated) | — |

Also: `rules.md` → `## Photography`; `examples.md` → `## Imagery examples` YAML.

Author only categories the source supports. Prefer hiding empty product/moments over fabricating Sample Brand category copy. Specimen placeholders may still show **assets** when copy is present — that is UI unfinishedness, not a reason to invent categories.

### Allowed `guide/src` edits

Add Photography category leaves + nav when the source has more authored categories than the shell (subjects / settings / product / moments). Prefer hide-empty over leftover badges for fabricated categories.

## Conflict rules

1. [`rules.md`](../../rules.md) (Photography + global precedence)
2. Strategy / Voice (imagery mood must not contradict personality)
3. Visual Imagery labels
4. Compiled `brand.json`

Do not invent neon / purple-AI / fake-handshake imagery for a grayscale starter unless the user expands the palette. Never hand-edit `brand.json`, `tokens.json`, or generated CSS.

## Done gate

After populate/improve: `cd guide && npm run compile`, then spot-check authored Photography leaves only. Audit may stop at a report.

## Changelog

- 2026-08-14 — 1.1.0 — Adaptive leaves: compile crop/style/mood/product/moments; hide empty product/moments/donts; avoid fabricated categories.
- 2026-08-11 — 1.0.1 — **Imagery introduction.** is the chapter intro (12–28 words); tone stays a mood phrase.
- 2026-08-10 — 1.0.0 — Deep router + populate/audit/improve; rules + imagery examples.
