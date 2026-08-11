# Chapter skill template

Copy into `skills/<id>/SKILL.md`. Keep `skills_spec_version` in lockstep with [`README.md`](README.md).

```yaml
---
file: <id>
skill_id: <id>                 # GUIDE_NAV chapter id
skills_spec_version: 1.0.0
version: 0.1.0                 # 0.x scaffold; 1.0.0 when deep
depth: scaffold                # scaffold | deep
status: draft                  # draft | stable
priority: 2
retrieval_tags: [<id>, skill]
summary: >
  Chapter skill router (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#<heading>
---
```

## Required sections (router)

1. **Op picker** — `populate` / `audit` / `improve`; when to defer to whole-brand intake
2. **Read order** — `brand.md` slices, related `rules.md` / `examples.md`, assets
3. **Write targets** — exact headings / `**Label.**` fields
4. **Conflict rules** — [`rules.md`](../rules.md) precedence; Color/Type must not break Design system required roles
5. **Ops** — inline sections (scaffold) or links to sibling files (deep)
6. **Done gate** — edit sources → `npm run compile` from `guide/` → spot-check the guide chapter (`audit` may stop at report-only)
7. **Never** — hand-edit `brand.json`, `tokens.json`, or generated CSS

## Ops layout

- **Scaffold** — keep Populate / Audit / Improve as sections in this file.
- **Deep** — split into `populate.md` / `audit.md` / `improve.md`; this file stays the router + field map + changelog. Sibling ops inherit this file’s `version`.

## Later ops

List reserved extended-op names (see catalog). Do not add sibling files until the chapter is deepened for that op.
