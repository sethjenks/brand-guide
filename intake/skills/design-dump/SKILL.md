---
skill_id: design-dump
intake_skills_spec_version: 1.0.0
version: 1.0.0
status: stable
source_kinds: [DESIGN.md, design-dump]
summary: >
  Populate Design system from a Stitch/MD3-style DESIGN.md dump via
  npm run import:design. Do not invent Strategy/Voice from token names.
---

# Design dump / DESIGN.md

## When to use

User provides a Stitch/MD3-style `DESIGN.md` (YAML `colors`, `typography`, `rounded`, `spacing`).

Set `brand/setup.json` → `intake` to `"skipped"`. After [`_shared.md`](../_shared.md): `status` `"populated"`.

## Read this first

1. [`../README.md`](../README.md) routing table
2. This file
3. [`../_shared.md`](../_shared.md)
4. Mapping details: [`UPSTREAM.md`](../../../UPSTREAM.md) (Design dump import)

## Source-specific steps

1. Set `intake` to `"skipped"` if still `"pending"`.
2. From `guide/`, preview the mapping:

```bash
npm run import:design -- --print ../path/to/DESIGN.md
```

3. After review, splice into the Design system fence (`brand.md.bak` is written):

```bash
npm run import:design -- --splice --yes ../path/to/DESIGN.md
```

Maps YAML `colors` / `typography` / `rounded` / `spacing` onto required semantic roles. Does **not** rewrite Strategy / Voice.

4. Inventory prose in the dump (if any) into `resources/transcripts/populate-<slug>-inventory.md`. Tokens → Visual + Design system `filled`. Strategy/Voice without prose → `placeholder` (leave Sample Brand), not invented pillars.
5. Finish Strategy / Voice / Expressions only from dump prose or user signal. Then follow [`../_shared.md`](../_shared.md).

## Write mapping

| From source | Into |
| --- | --- |
| YAML colors / type / radius / spacing | `brand.md` Design system fence (via `import:design`) |
| Named color intent | Visual → Colors + Color ↔ Brand contract (roles, not invented pillars) |
| Dump prose (mission, voice, imagery) | Strategy / Voice / Visual as `filled` |
| No strategy prose | Strategy / Voice stay Sample Brand + coverage `placeholder` |

Cite the dump in `sources[]` with `"kind": "citation"` (label `"DESIGN.md"`, detail = path).

## Stop conditions

- Do **not** invent message pillars or values from token names (`obsidian-ink`, `clay-earth`, …).
- Tokens-only dumps: fill Visual + Design system fully; leave Strategy / Voice as placeholders.
- Do not hand-edit `brand.json` / `tokens.json`.
- If the file is a full constitution, use [`brand-md/SKILL.md`](../brand-md/SKILL.md) instead.

## Done

Coverage must list every Strategy/Voice field left `placeholder` or `inferred`. Shared checklist + user summary.
