# Applications — audit

## Preconditions

- Read [`SKILL.md`](SKILL.md) and current Expressions table.
- Nav is rebuilt from authored rows (`applications-<slug>` for unknown).

## Steps

1. List Expressions table Channels. For each, note leafId (known map or `applications-<slug>`).
2. Flag rows with blank Title or Copy.
3. Flag duplicate leaf ids (first row wins) and Channel labels that should be normalized (Web not “Website”).
4. Check Samples against Voice phrases / Vocabulary blocklist.
5. Compare filled channels to real brand surfaces (if a site exists but Web is missing, that’s a gap).
6. Gap list: which channels to `improve` vs leave out. Report-only unless asked to fix.

## Rubric

- Every filled row is a real surface, not a wish list
- Sample is a line someone could ship, not a description of the channel
- Nav leaf count matches authored rows (no leftover empty catalog leaves)

## Stop conditions

- Do not auto-populate missing surfaces during audit.
- Do not treat a digital-only brand as incomplete for lacking OOH/packaging.
