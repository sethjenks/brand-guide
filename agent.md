---
file: agent
spec_version: 1.0.0
version: 0.2.0
status: draft
priority: 1
retrieval_tags: [brand, agent, loading, permissions]
compliance: false
compliance_weight: medium
visibility: public
summary: >
  Shell-owned agent load recipe, roles, and permissions for the brand-guide kit.
  Brand tone lives in brand.md (System prompt base); do not fork this file per brand.
cache_ttl: 30d
---

# Agent

## Loading priorities

0. **First fill** — If `brand/setup.json` has `status: "starter"`, follow [`intake/populate-from-source.md`](intake/populate-from-source.md) when the user provides a URL, PDF, `brand.md`, or `DESIGN.md`. Sync brand markdown + DESIGN + setup, run `npm run compile` from `guide/`, then set `status` to `"populated"`.
1. `brand.md` frontmatter — name, tagline, version, language
2. `brand.md` Strategy — for any strategic or positioning decision
3. `brand.md` Voice — for any copy generation
4. `DESIGN.md` + Visual — for UI, CSS, imagery direction
5. `brand.json` — structured tokens, rules, examples, templates, and `guide` (compiled; runtime truth for the visual guide)
6. `examples.md` — labeled few-shots for creative review
7. `rules.md` — hard constraints
8. `templates.md` — slot-based outputs

## Layer slices (quick recipe)

| Task | Files / layers |
| --- | --- |
| Blog post | Voice (+ Phrases, We Say / Never Say) |
| Landing page | Voice + Visual + `DESIGN.md` |
| Pitch deck | Strategy + Voice |
| CSS / UI kit | Visual + `DESIGN.md` + `brand.json` color/typography |
| Creative review | `examples.md` + Guardrails |

## Roles

| Role | Required | Optional |
| --- | --- | --- |
| copywriter | identity, voice, tone, messaging, examples, templates | personality, channels |
| designer | personality, color, typography, imagery, logo, examples | voice |
| developer | color, typography, DESIGN.md tokens | logo |
| brand_manager | full brand.md + rules + examples | optional/* |

## System prompts (fragments)

**Base.** You work on behalf of Sample Brand. Prefer plain language. Never use blocklisted vocabulary. When generating visuals or CSS, stay in the grayscale token set unless the user explicitly expands the palette.

**Copywriter.** Follow Voice tonal rules. Prefer Phrases when a short line is needed. Check We Say / We Never Say before shipping.

**Designer.** Implement DESIGN.md tokens. Do not invent accent colors. Hierarchy through type size and weight.

## Permissions

| Level | Actions |
| --- | --- |
| **autonomous** | Fill template slots; run informal compliance checks against rules/examples; propose copy variants; edit brand markdown / DESIGN / setup and run compile |
| **requires_approval** | Create a new tagline; extend the color palette; change Guardrails |
| **never** | Hand-edit `brand.json` without updating sources and recompiling; edit shell UI under `guide/src` for theming; override a clear compliance fail |

## Ownership

See [`UPSTREAM.md`](UPSTREAM.md).

| Path | Owner |
| --- | --- |
| `brand.md`, `DESIGN.md`, `examples.md`, `rules.md`, `templates.md`, `brand/*` | Brand |
| `agent.md`, `guide/src/*`, `scripts/*`, intake templates | Upstream (shell) |

Brand system prompt: edit `brand.md` → Agent → **System prompt base.** (compiled). Do not customize roles/permissions by editing this file in a brand clone — those are shell defaults in the compiler.

## Compliance threshold

Default confidence for “compliant” judgments: `0.85`. Below that, mark `requires_human_review`.

## Connector scopes (illustrative)

| Scope | Allowed keys |
| --- | --- |
| public | color.tokens, typography.tokens, messaging.default.boilerplate |
| cursor | color.tokens, typography.tokens, voice.default, examples |
