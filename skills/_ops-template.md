# Op file template

Use for `populate.md` / `audit.md` / `improve.md` under a deep chapter. Ops do **not** carry their own semver — bump the parent `SKILL.md` `version` when any op file changes.

```markdown
# <Chapter> — <op>

## Preconditions

- Intake: `brand/setup.json` intake is `complete` or `skipped` before `populate`.
- Read the parent `SKILL.md` field map first.

## Steps

1. …

## Checklist / rubric

- …

## Stop conditions

- `audit`: report gaps; do not invent content unless the user asks to fix.
- `improve`: preserve what already works; do not full-rewrite.
- `populate`: do not hand-edit compiled outputs.

## Done

- Sources updated (or report-only for audit).
- `cd guide && npm run compile` after writes.
- Spot-check the matching guide chapter.
```
