# Logo — improve

## Preconditions

- Logo labels already exist (otherwise [`populate.md`](populate.md)).
- User named the slice: clearspace, don’ts, colorways, or assets.
- Read [`SKILL.md`](SKILL.md).

## Steps

1. Preserve description/donts that already work. Edit only the requested slice.
2. If tightening **clearspace**, update Visual **Logo clearspace.** and Design system Logo (implementation) together.
3. If tightening **donts**, keep ·-separated lists; mirror hard bans in `rules.md` → `## Logo`.
4. If ingesting **assets**, rename to `logo.svg` / `wordmark.svg` / `mark.svg` under `brand/assets/`, then compile (copies to `guide/public/brand/`). Do not edit the public tree.
5. Add few-shots under `examples.md` → `## Logo examples` when the change is a new do/don’t (`logo-00n`).
6. `cd guide && npm run compile`.
7. Spot-check Logo. Placeholder leaves may still show **assets** — improving prose does not by itself replace specimen UI.

## Checklist

- [ ] Unrelated Logo labels untouched
- [ ] Visual + Design system implementation still agree
- [ ] Assets only in `brand/assets/`
- [ ] Compile run

## Stop conditions

- No full rewrite of Logo + Design system fence.
- No generated fake SVG.
- No hand-edits to compiled outputs.
