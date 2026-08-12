# Photography — populate

## Preconditions

- Intake is `complete` or `skipped` (or the user explicitly asked to build this chapter after skipping intake).
- Read [`SKILL.md`](SKILL.md) field map.
- Have a source: transcript, site, PDF, existing `brand.md`, or stated art direction.

## Steps

1. Read Visual → Photography / Imagery. If Sample Brand starter copy is still present and the brand is not Sample Brand, replace it — do not leave grayscale-kit clichés as if they were the new brand.
2. Write all ten `**Imagery …**` labels. **Imagery introduction.** is the chapter intro (12–28 words, statement-only). Keep **Imagery tone.** a short mood phrase — do not stretch it into the GraphicStatement. Then style, mood, subjects, settings, avoid, prompt product, prompt lifestyle, negative.
3. Align **Imagery avoid.** / **Imagery negative.** with [`rules.md`](../../rules.md) → `## Photography`. Add or tighten bullets there if the brand has extra hard constraints (stock bans, people policy, alt-text).
4. Ensure `examples.md` → `## Imagery examples` has at least two pairs (on/off). Add category-flavored inputs (subjects, settings, product-in-context, candid moment) when the source supports them.
5. **Prompts:** keep product and lifestyle prompts concrete (light, crop, palette, what is in frame). Put banned motifs in **Imagery negative.** as a ·-separated list.
6. **Categories:** subjects/settings/product/moments should be describable from the labels you wrote. Do not fabricate photo specimens for hardcoded guide leaves (`photography-category-product`, `photography-category-moments`).
7. `cd guide && npm run compile`.
8. Spot-check Photography in the guide. Completeness should pick up `visual.imagery.*`; leftover **assets** / **empty** badges on category/don’ts leaves are expected until the shell is driven by markdown.

## Checklist

- [ ] **Imagery introduction.** is 12–28 words, statement-only
- [ ] Style, mood, tone filled (tone stays a short mood phrase)
- [ ] Subjects, settings, avoid filled
- [ ] Product + lifestyle prompts filled
- [ ] Negatives ·-separated
- [ ] `rules.md` Photography constraints match avoid/negative
- [ ] Imagery few-shots on + off
- [ ] Compile run; no hand-edits to `brand.json`

## Stop conditions

- Do not invent people, products, or locations the source does not support.
- Do not add a second constitution file (`optional/photography.md`) — stay in `brand.md` until the section outgrows it.
- Do not hand-edit compiled outputs.
