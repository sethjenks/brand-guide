---
file: skills
skills_spec_version: 1.0.0
version: 1.0.0
status: draft
visibility: public
summary: >
  Shell-owned chapter skills for the brand-guide kit. Agents load a chapter
  router, pick an op, and write into brand.md / rules.md / examples.md.
---

# Chapter skills

Shell-owned agent recipes. **Do not fork this tree in a brand clone** — merge upstream ([`UPSTREAM.md`](../UPSTREAM.md)). Brand tone stays in `brand.md` → Agent → System prompt base.

Current **`skills_spec_version`: `1.0.0`**. Every `SKILL.md` frontmatter must match. Mismatch means the skill is stale vs this catalog (no CI gate yet).

Skills are **not** compiled into `brand.json`. They tell agents which constitution slices to edit; `npm run compile` remains the ship path.

## Ops vocabulary

| Op | Job | Default when |
| --- | --- | --- |
| `populate` | First fill / rebuild of the chapter slice | Fields empty or placeholder; user asks to build the section |
| `audit` | Report gaps vs field map / section-status; minimal edits | Content exists; “is this chapter done?” |
| `improve` | Surgical deepen; preserve what works | User asks to tighten one area |

**Router:** always start at `skills/<id>/SKILL.md`. Ask if the op is unclear. Default: `audit` if content exists, `populate` if mostly placeholders.

**Intake gate:** whole-brand [`intake/`](../intake/) still wins when `brand/setup.json` has `status: "starter"` and `intake: "pending"`. Do not run chapter `populate` first.

## Catalog

| skill_id | version | depth | status | ops layout | path |
| --- | --- | --- | --- | --- | --- |
| strategy | 0.1.0 | scaffold | draft | inline | [strategy/SKILL.md](strategy/SKILL.md) |
| language | 0.1.0 | scaffold | draft | inline | [language/SKILL.md](language/SKILL.md) |
| logo | 1.0.0 | deep | stable | files | [logo/SKILL.md](logo/SKILL.md) |
| typography | 0.1.0 | scaffold | draft | inline | [typography/SKILL.md](typography/SKILL.md) |
| color | 0.1.0 | scaffold | draft | inline | [color/SKILL.md](color/SKILL.md) |
| photography | 1.0.0 | deep | stable | files | [photography/SKILL.md](photography/SKILL.md) |
| system | 0.1.0 | scaffold | draft | inline | [system/SKILL.md](system/SKILL.md) |
| animation | 0.1.0 | scaffold | draft | inline | [animation/SKILL.md](animation/SKILL.md) |
| applications | 0.1.0 | scaffold | draft | inline | [applications/SKILL.md](applications/SKILL.md) |

## Versioning

Two clocks:

| Field | Scope | Bump when |
| --- | --- | --- |
| `skills_spec_version` | Shared contract (template, frontmatter, op names) | Breaking/additive change to how skills are structured or loaded |
| `version` (per skill) | That chapter’s recipe | Any change to the router or its op files |

Per-skill semver: **0.x** scaffold; **1.0.0** first deep ship; **patch** wording; **minor** additive steps/ops; **major** renamed write targets, conflict rules, or ops.

Op sibling files inherit the chapter `version`. Changing an op file bumps the chapter skill.

## Non-goals

- No `compile-photography.mjs` / chapter packages
- No `chapters.enabled` in `brand/setup.json`
- No promoting [`optional/`](../optional/) into compile — promote a file only when a section outgrows `brand.md`; skills remain the tuning surface until then
- No Core/Extended toggle UX
- No skill versions in `brand.json`; no per-brand `extends:`

## Changelog

| Date | skill_id | version | Why |
| --- | --- | --- | --- |
| 2026-08-10 | (catalog) | spec 1.0.0 | Initial skills tree, ops vocabulary, Photography + Logo deep |
| 2026-08-10 | photography | 1.0.0 | Deep router + populate/audit/improve |
| 2026-08-10 | logo | 1.0.0 | Deep router + populate/audit/improve |
