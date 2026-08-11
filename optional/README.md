# Optional scaffolds

Use these when the single-page [`brand.md`](../brand.md) is no longer enough. Promote a file to the repo root (or a `brands/<slug>/` package) when a section needs its own version history or variants.

Until then, tune chapter quality via shell-owned [`skills/`](../skills/README.md) (still writing into `brand.md` / `rules.md` / `examples.md`). Do not wire these optional files into compile unless a section truly outgrows the constitution.

## When to promote

| Need | Start from |
| --- | --- |
| Deep positioning / competitive notes | `positioning.md` |
| Multiple audiences | `audience.md` + `audience/` variants |
| Channel-specific tone | `channels.md` or `tone/` variants |
| Voice variants (e.g. B2B) | `voice.md` + `voice/voice-b2b.md` with `extends: voice` |
| Token tables beyond brand.md Design system | `color.md`, `typography.md` |
| Logo / imagery long-form | `logo.md`, `photography.md`, `illustration.md` |

## Inheritance rule

Root file = default. Variants declare `extends: <core>` in YAML frontmatter and document **only overrides**.

## Kit note

These scaffolds align with Brand.Brand taxonomy. V1 of brand-guide keeps the filled Sample Brand in root files; optional files stay blank until you need them.

## Frontmatter template

```yaml
---
file: positioning
spec_version: 1.0.0
version: 0.1.0
status: draft
priority: 3
retrieval_tags: [positioning]
compliance: true
compliance_weight: medium
visibility: public
summary: >
  Extended positioning notes.
cache_ttl: 30d
---
```
