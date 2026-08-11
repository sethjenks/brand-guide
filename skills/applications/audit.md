# Applications — audit

## Preconditions

- Read [`SKILL.md`](SKILL.md) and current Expressions table.
- Section-status: unmatched nav ids are `empty` by design.

## Steps

1. List GUIDE_NAV application ids. For each, note matching table Channel or **empty**.
2. Flag rows with blank Title or Copy (section-status bumps those to empty even when Channel matches).
3. Flag Channel labels that do not map (`expressionChannelToAppId` returns null) — they will not light up a leaf.
4. Check Samples against Voice phrases / Vocabulary blocklist.
5. Compare filled channels to real brand surfaces (if a site exists but Web is missing, that’s a gap).
6. Gap list: which channels to `improve` vs leave empty. Report-only unless asked to fix.

## Rubric

- Every filled row is a real surface, not a wish list
- Sample is a line someone could ship, not a description of the channel
- Empty leaves are intentional, not forgotten — say so in the report

## Stop conditions

- Do not auto-populate empty leaves during audit.
- Do not treat empty OOH/packaging as a fail for a digital-only brand.
