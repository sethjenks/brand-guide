---
file: photography
skill_id: photography
skills_spec_version: 1.0.0
version: 1.0.0
depth: deep
status: stable
priority: 2
retrieval_tags: [photography, imagery, skill]
summary: >
  Chapter skill router for Photography (ops: populate, audit, improve).
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
4. [`examples.md`](../../examples.md) → `## Imagery examples` (Photography few-shots)
5. [`guide/src/lib/section-status.ts`](../../guide/src/lib/section-status.ts) — stub / placeholder / hardcoded photo leaves
6. Compiled `brand.json` → `guide.visual.imagery` + `imagery` + `examples.imagery` (read-only after compile)

## Write targets

Keep `**Label.**` names — `compile-brand.mjs` keys off them.

| Label | Compiles to |
| --- | --- |
| `**Imagery style.**` | `imagery.style` |
| `**Imagery mood.**` | `imagery.mood` |
| `**Imagery tone.**` | `guide.visual.imagery.tone` |
| `**Imagery subjects.**` | `guide.visual.imagery.subjects` |
| `**Imagery settings.**` | `guide.visual.imagery.settings` |
| `**Imagery avoid.**` | `guide.visual.imagery.avoid` |
| `**Imagery prompt product.**` | `imagery.prompts.product_photography` |
| `**Imagery prompt lifestyle.**` | `imagery.prompts.lifestyle` |
| `**Imagery negative.**` | `imagery.negative_prompts` (·-separated) |

Also: `rules.md` → `## Photography` (constraint bullets); `examples.md` → `## Imagery examples` YAML (`id` / `label` / `input` / `reason`).

**Prompts / categories** (extended ops, not separate files yet): product/lifestyle prompts and negative lists live in the labels above; category copy for Subjects / Settings / Product / Moments should stay consistent with those labels. Guide leaves `photography-category-product` and `photography-category-moments` are **hardcoded** in the shell until `brand.md` drives them — do not pretend those specimens are brand-authored.

## Conflict rules

1. [`rules.md`](../../rules.md) (Photography + global precedence)
2. Strategy / Voice (imagery mood must not contradict personality)
3. Visual Imagery labels
4. Compiled `brand.json`

Do not invent neon / purple-AI / fake-handshake imagery for a grayscale starter unless the user expands the palette. Never hand-edit `brand.json`, `tokens.json`, or generated CSS.

## Done gate

After populate/improve: `cd guide && npm run compile`, then spot-check the Photography chapter. Audit may stop at a report.

## Changelog

- 2026-08-10 — 1.0.0 — Deep router + populate/audit/improve; rules + imagery examples.
