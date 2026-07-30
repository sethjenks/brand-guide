# Populate from source

Use this when bootstrapping the visual guide from an existing brand artifact.

## Goal

Fill **every** section of this kit from a source the user provides, then demote the out-of-box setup callout.

Use this path when the user already has brand materials. If they do **not**, prefer the Branding Exercise first: [`brand-intake-questionnaire.md`](brand-intake-questionnaire.md) (agent one-by-one by default).

## Accepted sources (one or more)

- **Website URL** — scrape or fetch marketing / product / about pages
- **Brand guide PDF** — extract strategy, voice, and visual rules
- **`brand.md`** — portable brand constitution + Design system (any compatible layout)

## Steps

1. If `brand/setup.json` → `intake` is still `"pending"`, set it to `"skipped"` (you are using a source instead of the questionnaire).
2. Read the source(s) the user attached or linked.
3. Update, in order:
   - [`brand.md`](../brand.md) — Strategy / Voice / Visual / Expressions / Agent labels **and** the fenced Design system (tokens)
   - [`examples.md`](../examples.md), [`rules.md`](../rules.md), [`templates.md`](../templates.md) as needed
   - [`brand/setup.json`](../brand/setup.json) — hero/setup copy if needed
4. From `guide/`, run `npm run compile` so `brand.json`, CSS, and `tokens.json` regenerate.
5. Preserve the guide’s section structure (Strategy / Language / Logo / Typography / Color / Photography / System / Applications — authored in brand.md as Strategy / Voice / Visual / Expressions / Design system). Replace Sample Brand copy with the real brand; keep grayscale unless the source specifies a palette.
6. Set in `brand/setup.json`:

```json
{
  "intake": "skipped",
  "status": "populated"
}
```

7. Do **not** hand-edit `brand.json` or `guide/src` UI files for content/theme.
8. Summarize for the user what changed and what still needs human review.

## Prompt you can paste

```
Using this brand-guide repo and my source (URL / PDF / brand.md), populate the guide: set brand/setup.json intake to "skipped", update brand.md (including Design system), examples.md, rules.md, and brand/setup.json so every section reflects my brand. Keep the grayscale structure unless my source specifies a palette. Run npm run compile from guide/. When done, set brand/setup.json status to "populated".
```
