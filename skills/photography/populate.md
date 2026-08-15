# Photography — populate

## Preconditions

- Intake is `complete` or `skipped` (or the user explicitly asked to build this chapter after skipping intake).
- Read [`SKILL.md`](SKILL.md) field map.
- Have a source: transcript, site, PDF, existing `brand.md`, or stated art direction.

## Steps

1. Read Visual → Photography / Imagery. If Sample Brand starter copy is still present and the brand is not Sample Brand, replace it — do not leave grayscale-kit clichés as if they were the new brand.
2. Write Imagery labels the source supports. **Imagery introduction.** is the chapter intro (12–28 words, statement-only). Keep **Imagery tone.** a short mood phrase. Author **Imagery style.** / **Imagery mood.** / **Concealed crop.** when evidenced. Subjects, settings, avoid; product via **Imagery product.** or **Imagery prompt product.**; moments via **Imagery moments.** or **Imagery prompt lifestyle.** Empty product/moments → those leaves hide.
3. Align **Imagery avoid.** / **Imagery negative.** with [`rules.md`](../../rules.md) → `## Photography`. Prefer `·`-separated lists (`splitList` also accepts `,`). Add or tighten bullets there if the brand has extra hard constraints.
4. Ensure `examples.md` → `## Imagery examples` has at least two pairs (on/off). Add category-flavored inputs when the source supports them.
5. **Prompts:** keep product and lifestyle prompts concrete (light, crop, palette, what is in frame). Put banned motifs in **Imagery negative.** / **Imagery avoid.**
6. **Categories:** author only evidenced categories. Do **not** fabricate product/moments to clear leftover badges.
7. `cd guide && npm run compile`.
8. Spot-check authored Photography leaves. If the source has more categories than the shell, add a leaf in `guide/src`.

## Checklist

- [ ] **Imagery introduction.** is 12–28 words, statement-only
- [ ] Style, mood, tone filled when evidenced (tone stays a short mood phrase)
- [ ] Subjects / settings / product / moments only when evidenced (empty → hide)
- [ ] Avoid / negative lists (`·` or `,`)
- [ ] `rules.md` Photography constraints match avoid/negative
- [ ] Imagery few-shots on + off
- [ ] Compile run; no hand-edits to `brand.json`

## Stop conditions

- Do not invent people, products, or locations the source does not support.
- Do not add a second constitution file (`optional/photography.md`) — stay in `brand.md` until the section outgrows it.
- Do not hand-edit compiled outputs.
