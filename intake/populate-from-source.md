# Populate from source

Use this when bootstrapping the visual guide from an existing brand artifact.

## Goal

Fill **every** section of this kit from a source the user provides, then demote the out-of-box setup callout.

## Accepted sources (one or more)

- **Website URL** — scrape or fetch marketing / product / about pages
- **Brand guide PDF** — extract strategy, voice, and visual rules
- **`brand.md`** — portable brand constitution (any compatible layout)
- **`DESIGN.md`** — tokens, type, components

## Steps

1. Read the source(s) the user attached or linked.
2. Update, in order:
   - [`brand.md`](../brand.md) — Strategy / Voice / Visual / Expressions / Agent labels (edit surface)
   - [`DESIGN.md`](../DESIGN.md) — concrete tokens (theme source for the guide)
   - [`examples.md`](../examples.md), [`rules.md`](../rules.md), [`templates.md`](../templates.md) as needed
   - [`brand/setup.json`](../brand/setup.json) — hero/setup copy if needed
3. From `guide/`, run `npm run compile` so `brand.json` and CSS regenerate.
4. Preserve the guide’s section structure (What to say / How to say it / Where to say it). Replace Sample Brand copy with the real brand; keep grayscale unless the source specifies a palette.
5. Set in `brand/setup.json`:

```json
{
  "status": "populated"
}
```

6. Do **not** hand-edit `brand.json` or `guide/src` UI files for content/theme.
7. Summarize for the user what changed and what still needs human review.

## Prompt you can paste

```
Using this brand-guide repo and my source (URL / PDF / brand.md / DESIGN.md), populate the guide: update brand.md, DESIGN.md, examples.md, rules.md, and brand/setup.json so every section reflects my brand. Keep the grayscale structure unless my source specifies a palette. Run npm run compile from guide/. When done, set brand/setup.json status to "populated".
```
