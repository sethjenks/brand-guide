# Logo — populate

## Preconditions

- Intake is `complete` or `skipped` (unless the user explicitly asked to build Logo).
- Read [`SKILL.md`](SKILL.md) field map and asset conventions.
- Have description, clearspace rule, don’ts, and/or asset files from the source.

## Steps

1. Write Visual → Logo / Wordmark:
   - `**Logo description.**` — construction, colorways (ink on paper / reverse), what it is (wordmark vs mark).
   - `**Logo clearspace.**` — measurable (e.g. cap-height of a letter), not “plenty of space”.
   - `**Logo donts.**` — ·-separated list (stretch, outline, shadows, busy photo without a panel, …).
2. Align Design system → **Logo (implementation)** (default/inverse, min clearspace, SVG preferred).
3. Add or tighten [`rules.md`](../../rules.md) → `## Logo` as machine constraints (filenames, don’ts, colorways).
4. Add `examples.md` → `## Logo examples` YAML: at least one `on-brand` and one `off-brand` (`id` like `logo-001`).
5. **Assets:** if the user provided SVG/PNG, save under `brand/assets/` using preferred names (`logo.svg`, `wordmark.svg`, `mark.svg`). Do not invent a mark. If none exist, leave the directory empty and say so — compile still succeeds.
6. `cd guide && npm run compile`. Confirm files appear in `guide/public/brand/` (not fonts-only leftovers).
7. Spot-check Logo. Expect **assets** badges on scaling/clearspace/donts/background/use until specimens exist; that is honest status, not a populate failure.

## Checklist

- [ ] Description, clearspace, donts present
- [ ] Design system Logo (implementation) agrees
- [ ] `rules.md` Logo bullets
- [ ] Logo few-shots on + off
- [ ] Assets named correctly or explicitly deferred
- [ ] Compile run; public copy not hand-edited

## Stop conditions

- Do not generate a fake logo file.
- Do not promote `optional/logo.md` in this op.
- Do not hand-edit `brand.json` or `guide/public/brand/**`.
