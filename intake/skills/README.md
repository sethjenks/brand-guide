---
file: intake-skills
intake_skills_spec_version: 1.0.0
version: 1.0.0
status: draft
visibility: public
summary: >
  Whole-brand intake path skills. Agents load this routing table, pick the
  matching skill, then follow that SKILL.md plus _shared.md. Chapter skills
  under skills/ remain post-intake deepeners.
---

# Intake skills

Shell-owned recipes for **first fill** of this kit. **Do not fork this tree in a brand clone** — merge upstream ([`UPSTREAM.md`](../../UPSTREAM.md)).

Current **`intake_skills_spec_version`: `1.0.0`**. Every path `SKILL.md` frontmatter must match. Mismatch means the skill is stale vs this catalog (no CI gate yet).

Intake skills are **not** compiled into `brand.json`. They tell agents how to populate brand markdown from a source; `npm run compile` remains the ship path.

**Load order:** this table → matching `intake/skills/<id>/SKILL.md` → [`_shared.md`](_shared.md) (inventory → write → coverage → compile → checklist → status). After first compile, run chapter [`skills/<id>/populate.md`](../../skills/README.md) only for slices the path skill flagged as thin.

Chapter skills under [`skills/`](../../skills/README.md) still win only **after** intake is `complete` or `skipped`. Do not chapter-populate first when `status` is `starter` and `intake` is `pending`.

## Routing table

Canonical copy. Keep [`../populate-from-source.md`](../populate-from-source.md) in sync when adding a row.

| Detect when | Skill | `intake` / `status` |
| --- | --- | --- |
| No materials / starter + `intake: pending` | [`questionnaire/SKILL.md`](questionnaire/SKILL.md) | `complete` → then `populated` |
| `http(s)` marketing / product / About URL | [`website/SKILL.md`](website/SKILL.md) | `skipped` → `populated` |
| PDF / deck attached | [`pdf/SKILL.md`](pdf/SKILL.md) | `skipped` → `populated` |
| Existing `brand.md` / constitution | [`brand-md/SKILL.md`](brand-md/SKILL.md) | `skipped` → `populated` |
| Stitch/MD3 `DESIGN.md` dump | [`design-dump/SKILL.md`](design-dump/SKILL.md) | `skipped` → `populated` |
| `figma.com/design/...` | [`figma/SKILL.md`](figma/SKILL.md) | `skipped` → `populated` |

Ambiguous source → ask once. Multiple sources → run the primary path skill, then merge extra citations in `brand/setup.json` → `sources[]` (`kind: "citation"`).

If the source kind is not in this table, stop and ask — do not improvise a new path without adding a skill (see **Adding a path**).

## Catalog

| skill_id | version | status | source_kinds | path |
| --- | --- | --- | --- | --- |
| questionnaire | 1.0.0 | stable | interview, transcript | [questionnaire/SKILL.md](questionnaire/SKILL.md) |
| website | 1.0.0 | stable | url, website | [website/SKILL.md](website/SKILL.md) |
| pdf | 1.0.0 | stable | pdf, deck | [pdf/SKILL.md](pdf/SKILL.md) |
| brand-md | 1.0.0 | stable | brand.md, constitution | [brand-md/SKILL.md](brand-md/SKILL.md) |
| design-dump | 1.0.0 | stable | DESIGN.md, design-dump | [design-dump/SKILL.md](design-dump/SKILL.md) |
| figma | 1.0.0 | stable | figma.com/design | [figma/SKILL.md](figma/SKILL.md) |

Shared contract: [`_shared.md`](_shared.md). Copy-me for new paths: [`_template.md`](_template.md).

## Versioning

| Field | Scope | Bump when |
| --- | --- | --- |
| `intake_skills_spec_version` | Router, shared contract, frontmatter keys | Breaking/additive change to how intake skills are structured or loaded |
| `version` (per skill) | That path’s recipe | Any change to the path `SKILL.md` |

Per-skill semver: **0.x** scaffold; **1.0.0** first ship; **patch** wording; **minor** additive steps; **major** renamed write targets or conflict rules.

## Adding a path

1. Copy [`_template.md`](_template.md) → `intake/skills/<id>/SKILL.md`. Fill `skill_id`, `source_kinds`, and source-specific steps. End with “then follow `_shared.md`.”
2. Add a row to **this** routing table **and** the table in [`../populate-from-source.md`](../populate-from-source.md).
3. Add or adjust a `brand/setup.json` → `sources[]` intake card `prompt` so it names `intake/skills/<id>/SKILL.md`.
4. Add a catalog row above. Bump `intake_skills_spec_version` only on breaking router/shared-contract changes; otherwise bump the new skill’s `version` to `1.0.0`.

Do not put path-specific scrape/MCP/import protocols in `_shared.md` or `populate-from-source.md`.

## Non-goals

- No chapter `populate` before the intake gate
- No hand-edit of `brand.json` / `tokens.json`
- No new compile scripts in this catalog (inventory stays in the path skill until a later extension)
