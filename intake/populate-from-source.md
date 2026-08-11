# Populate from source

Use this when bootstrapping the visual guide from an existing brand artifact.

## Goal

Fill **every** section of this kit from a source the user provides, then demote the out-of-box setup callout.

Use this path when the user already has brand materials. If they do **not**, prefer the Branding Exercise first: [`skills/questionnaire/SKILL.md`](skills/questionnaire/SKILL.md) (question bank: [`brand-intake-questionnaire.md`](brand-intake-questionnaire.md); agent one-by-one by default).

**Agents:** load the routing table, then the matching path skill. Do not improvise a path that is not in the table.

Canonical catalog (how to extend, versioning): [`skills/README.md`](skills/README.md).  
Shared contract (inventory → write → compile → checklist): [`skills/_shared.md`](skills/_shared.md).

## Routing table

Keep in sync with [`skills/README.md`](skills/README.md).

| Detect when | Skill | `intake` / `status` |
| --- | --- | --- |
| No materials / starter + `intake: pending` | [`skills/questionnaire/SKILL.md`](skills/questionnaire/SKILL.md) | `complete` → then `populated` |
| `http(s)` marketing / product / About URL | [`skills/website/SKILL.md`](skills/website/SKILL.md) | `skipped` → `populated` |
| PDF / deck attached | [`skills/pdf/SKILL.md`](skills/pdf/SKILL.md) | `skipped` → `populated` |
| Existing `brand.md` / constitution | [`skills/brand-md/SKILL.md`](skills/brand-md/SKILL.md) | `skipped` → `populated` |
| Stitch/MD3 `DESIGN.md` dump | [`skills/design-dump/SKILL.md`](skills/design-dump/SKILL.md) | `skipped` → `populated` |
| `figma.com/design/...` | [`skills/figma/SKILL.md`](skills/figma/SKILL.md) | `skipped` → `populated` |

Ambiguous source → ask once. Multiple sources → run the primary path skill, then merge extra citations (`kind: "citation"`). New source kinds → add a skill per [`skills/README.md`](skills/README.md) **Adding a path**.

Path-specific protocols (scrape, PDF extract, `import:design`, Figma MCP) live in those `SKILL.md` files — not here.

## Prompt you can paste

```
Using this brand-guide repo and my source (URL / PDF / brand.md / DESIGN.md / Figma design URL), populate the guide: load intake/skills/README.md, pick the matching path skill, and follow intake/skills/_shared.md. Set brand/setup.json intake to "skipped" (or "complete" for the questionnaire). Update brand.md (including Design system), examples.md, rules.md, brand/coverage.json, and brand/setup.json. Cite sources with kind "citation". Never hand-edit brand.json or tokens.json. Keep grayscale unless the source specifies a palette. Run npm run compile and npm run post-populate-check from guide/. When done, set brand/setup.json status to "populated".
```
