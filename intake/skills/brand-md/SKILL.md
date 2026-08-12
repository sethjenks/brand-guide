---
skill_id: brand-md
intake_skills_spec_version: 1.0.0
version: 1.0.0
status: stable
source_kinds: [brand.md, constitution]
summary: >
  Merge or replace this repo’s brand.md from an existing constitution
  (Strategy / Voice / Visual + Design system). Preserve compile labels.
---

# brand.md

## When to use

User provides an existing `brand.md` (this kit’s format or a compatible constitution: Strategy / Voice / Visual + Design system).

Set `brand/setup.json` → `intake` to `"skipped"`. After [`_shared.md`](../_shared.md): `status` `"populated"`.

## Read this first

1. [`../README.md`](../README.md) routing table
2. This file
3. [`../_shared.md`](../_shared.md)
4. Compile-required labels in [`brand.md`](../../../brand.md) For agents / [`skills/strategy/SKILL.md`](../../../skills/strategy/SKILL.md) field map

## Source-specific steps

1. Set `intake` to `"skipped"` if still `"pending"`.
2. Read the source constitution. Inventory which headings/labels exist vs this kit’s required `**Label.**` names (`resources/transcripts/populate-<slug>-inventory.md`).
3. **Merge or replace** root `brand.md`:
   - Prefer the source’s Strategy / Voice / Visual / Expressions / Agent copy
   - Keep this kit’s **For agents** section map unless the source already has an equivalent
   - Preserve the `<!-- brand-guide:design-system -->` fence. If the source has tokens, splice them into the fence (tables + `:root`). If it has no Design system, keep this kit’s grayscale fence and mark Visual/designSystem `placeholder` or `inferred` with evidence
4. Align `examples.md` / `rules.md` to the source voice; do not leave Sample Brand few-shots if the source replaced Strategy/Voice.
5. Then follow [`../_shared.md`](../_shared.md).

## Write mapping

| From source | Into |
| --- | --- |
| Strategy / Voice / Visual / Expressions | matching `brand.md` headings (keep compile labels) |
| Design system / tokens | fenced Design system in `brand.md` |
| Logo notes / files | Visual → Logo + `brand/assets/` if provided |
| Channel examples | `examples.md` / Expressions |

Cite the source path or paste origin in `sources[]` with `"kind": "citation"` (label `"brand.md"`).

## Stop conditions

- Do not rename `**Label.**` keys `compile-brand.mjs` keys off.
- Do not invent pillars the source omitted; mark `placeholder` instead.
- Do not hand-edit `brand.json` / `tokens.json`.
- If the file is tokens-only, use [`design-dump/SKILL.md`](../design-dump/SKILL.md) instead.

## Done

Coverage + shared checklist. List every heading you adapted or left Sample Brand on purpose.
