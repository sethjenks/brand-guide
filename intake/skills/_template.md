---
skill_id: your-path-id
intake_skills_spec_version: 1.0.0
version: 1.0.0
status: draft
source_kinds: [example-kind]
summary: >
  One-line when to use this path. Copy to intake/skills/<id>/SKILL.md and
  register in README.md + populate-from-source.md routing tables.
---

# Your path name

## When to use

Detect this source when: _(one sentence matching a routing-table “Detect when” cell)._

Set `brand/setup.json` → `intake` to `"skipped"` (or `"complete"` only for questionnaire).

## Read this first

1. [`README.md`](README.md) routing table
2. This file
3. [`_shared.md`](_shared.md)

## Source-specific steps

1. Read / fetch / parse the source.
2. Build the inventory file (`resources/transcripts/populate-<slug>-inventory.md`) **before** rewriting `brand.md`.
3. _(Path-only extraction: tokens, copy, assets.)_
4. Then follow [`_shared.md`](_shared.md): write targets → compile → gap pass → checklist → status.

## Write mapping

| From source | Into |
| --- | --- |
| _(strategy copy)_ | `brand.md` → Strategy |
| _(voice)_ | `brand.md` → Voice |
| _(visual / tokens)_ | Visual + Design system fence |
| _(logo)_ | `brand/assets/` |

## Stop conditions

- Do not invent pillars from token names.
- Do not hand-edit `brand.json` / `tokens.json`.
- If the source does not match this skill, return to the routing table — do not stretch this recipe.

## Done

Coverage + shared checklist + user summary of inferred fields. Cite the source in `sources[]` with `"kind": "citation"`.
