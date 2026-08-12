# Animation — improve

## Preconditions

- Animation labels already exist (otherwise use [`populate.md`](populate.md)).
- User named what to deepen, or audit listed a short gap list.
- Read [`SKILL.md`](SKILL.md) field map.

## Steps

1. Preserve labels that already work. Change only the slice in scope (e.g. one principle, the default curve, one interaction, donts). If tightening the chapter intro, land **Animation introduction.** in 12–28 words, statement-only.
2. If changing **personality default**, update **Animation personality default.** and keep that row in the Personality table.
3. If adding an archetype or interaction, use a known **Id** from the field map so the guide demo appears. New names without a preset are copy-only.
4. If tightening **donts**, keep ·-separated lists; mirror hard bans in `rules.md` → `## Animation`.
5. Add or replace few-shots in `examples.md` → `## Animation examples` when the improvement is a new do/don’t. Keep `id` unique (`animation-00n`).
6. `cd guide && npm run compile` after writes.
7. Spot-check Animation. Replay the touched demo.

## Checklist

- [ ] Unrelated Animation labels untouched
- [ ] Donts / rules still agree
- [ ] New few-shots have `reason`
- [ ] Compile run

## Stop conditions

- No full-chapter rewrite.
- No Design system motion tokens.
- No edits to `animation-presets.ts` unless this is an upstream shell change.
- No hand-edits to compiled outputs.
