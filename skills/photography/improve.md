# Photography — improve

## Preconditions

- Imagery labels already exist (otherwise use [`populate.md`](populate.md)).
- User named what to deepen, or audit listed a short gap list.
- Read [`SKILL.md`](SKILL.md) field map.

## Steps

1. Preserve labels that already work. Change only the slice in scope (e.g. negatives, product prompt, subjects). If tightening the chapter intro, land **Imagery introduction.** in 12–28 words, statement-only — do not expand **Imagery tone.** into that role.
2. If adding **category** guidance, keep it in the existing labels (`subjects` / `settings` / product + lifestyle **prompts**) rather than new heading names the compiler does not parse.
3. If adding **prompts**, update **Imagery prompt product.** / **Imagery prompt lifestyle.** and **Imagery negative.** together so they cannot contradict.
4. Add or replace few-shots in `examples.md` → `## Imagery examples` when the improvement is a new do/don’t. Keep `id` unique (`imagery-00n`).
5. Tighten `rules.md` → `## Photography` only for machine constraints (bans, people/stock policy) — not narrative mood (that stays in `brand.md`).
6. `cd guide && npm run compile` after writes.
7. Spot-check Photography. Do not expect hardcoded category leaves to update until the shell reads `brand.md` for those specimens.

## Checklist

- [ ] Unrelated Imagery labels untouched
- [ ] Avoid / negative / rules still agree
- [ ] New few-shots have `reason`
- [ ] Compile run

## Stop conditions

- No full-chapter rewrite.
- No `optional/photography.md` promotion.
- No hand-edits to compiled outputs.
