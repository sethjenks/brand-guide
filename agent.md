---
file: agent
spec_version: 1.0.0
version: 0.3.0
status: draft
priority: 1
retrieval_tags: [brand, agent, loading, permissions]
compliance: false
compliance_weight: medium
visibility: public
summary: >
  Shell-owned agent load recipe, roles, and permissions for the brand-guide kit.
  Brand tone lives in brand.md (System prompt base); do not fork this file per brand.
  Intake (Branding Exercise) is the first gate when setup is starter and intake is pending.
  Chapter skills: skills/ (skills_spec_version 1.0.0).
cache_ttl: 30d
---

# Agent

## Loading priorities

0. **Intake gate (first)** — If `brand/setup.json` has `status: "starter"` and `intake` is `"pending"`, run [`intake/brand-intake-questionnaire.md`](intake/brand-intake-questionnaire.md) **before** anything else. Default: ask the Branding Exercise **one question at a time**. User may take the full written questionnaire, or skip to a source (set `intake` to `"skipped"` and follow populate-from-source). When finished, set `intake` to `"complete"`, rewrite brand markdown + setup from the transcript, compile, then set `status` to `"populated"`.
1. **Populate from source** — If `intake` is `"skipped"` (or the user already provided a URL, PDF, `brand.md`, DESIGN.md dump, or Figma design URL), follow [`intake/populate-from-source.md`](intake/populate-from-source.md). Sync brand markdown + setup + `brand/coverage.json`, run `npm run compile` and `npm run post-populate-check` from `guide/`, complete the post-populate checklist, then set `status` to `"populated"`. Cite sources with `"kind": "citation"`.
2. `brand.md` frontmatter — name, tagline, version, language
3. `brand.md` **For agents** — section map and task slices
4. `brand.md` Strategy — for any strategic or positioning decision
5. `brand.md` Voice — for any copy generation
6. `brand.md` Visual + Design system — for UI, CSS, imagery direction
7. `brand.json` — structured tokens, rules, examples, templates, and `guide` (compiled; runtime truth for the visual guide)
8. `tokens.json` — DTCG design-token interchange (compiled from Design system; use for external tools; do not hand-edit)
9. `examples.md` — labeled few-shots for creative review
10. `rules.md` — hard constraints
11. `templates.md` — slot-based outputs
12. [`skills/`](skills/README.md) — chapter routers (`skills_spec_version` **1.0.0**). Load after intake when the task is one guide chapter.

## Layer slices (quick recipe)

| Task | Files / layers |
| --- | --- |
| Blog post | Voice (+ Phrases, We Say / Never Say) |
| Landing page | Voice + Visual + Design system |
| Pitch deck | Strategy + Voice |
| CSS / UI kit | Visual + Design system + `brand.json` color/typography (+ `tokens.json` for DTCG export) |
| Creative review | `examples.md` + Guardrails |
| One guide chapter | [`skills/<id>/SKILL.md`](skills/README.md) + op (`populate` / `audit` / `improve`) |

## Chapter skills

Shell-owned recipes in [`skills/`](skills/README.md) (catalog + `skills_spec_version`). Do not fork per brand. Brand tone stays in `brand.md` → Agent → **System prompt base.**

Always open the chapter **router** (`skills/<id>/SKILL.md`). It picks the op: `populate` (first fill), `audit` (report gaps), `improve` (surgical). Default: audit if content exists, populate if mostly placeholders. Chapter `populate` only after intake is `complete` or `skipped`.

| Task | Skill | Op |
| --- | --- | --- |
| Build Strategy / positioning | [`skills/strategy/SKILL.md`](skills/strategy/SKILL.md) | `populate` |
| Is positioning / archetype / guardrails done? | strategy | `audit` |
| Tighten one Strategy leaf | strategy | `improve` |
| Build Language / Voice | [`skills/language/SKILL.md`](skills/language/SKILL.md) | `populate` |
| Review copy / spectrum / phrases | language | `audit` or `improve` |
| Build Photography | [`skills/photography/SKILL.md`](skills/photography/SKILL.md) | `populate` |
| Is Photography done? | photography | `audit` |
| Build Logo / ingest assets | [`skills/logo/SKILL.md`](skills/logo/SKILL.md) | `populate` |
| Tighten clearspace / don’ts | logo | `improve` |
| Fill or deepen one channel | [`skills/applications/SKILL.md`](skills/applications/SKILL.md) | `populate` / `improve` |
| Other chapters (scaffold) | `skills/<typography\|color\|system\|animation>/SKILL.md` | matching op |

Deep chapters: Strategy, Language, Logo, Photography, Applications. Scaffolds: Typography, Color, System, Animation. Skills write `brand.md` / `rules.md` / `examples.md` (Animation: `guide/src/lib/animation-content.ts` until promoted). Then `npm run compile` from `guide/`. Never hand-edit `brand.json`.

**Extended chapter toggles:** `brand/setup.json` → `chapters` (`logo` | `photography` | `animation` | `applications` → `"on"` \| `"off"`). Core chapters cannot be turned off. If a chapter is `off`, skip its skill `populate` unless the user asks to turn it on.

## Roles

| Role | Required | Optional |
| --- | --- | --- |
| copywriter | identity, voice, tone, messaging, examples, templates | personality, channels |
| designer | personality, color, typography, imagery, logo, examples | voice |
| developer | color, typography, Design system tokens | logo |
| brand_manager | full brand.md + rules + examples | optional/* |

## System prompts (fragments)

**Base.** You work on behalf of Sample Brand. Prefer plain language. Never use blocklisted vocabulary. When generating visuals or CSS, stay in the grayscale token set unless the user explicitly expands the palette.

**Copywriter.** Follow Voice tonal rules. Prefer Phrases when a short line is needed. Check We Say / We Never Say before shipping.

**Designer.** Implement Design system tokens in `brand.md`. Do not invent accent colors. Hierarchy through type size and weight.

## Permissions

| Level | Actions |
| --- | --- |
| **autonomous** | Fill template slots; run informal compliance checks against rules/examples; propose copy variants; edit brand.md / setup and run compile |
| **requires_approval** | Create a new tagline; extend the color palette; change Guardrails |
| **never** | Hand-edit `brand.json` without updating sources and recompiling; edit shell UI under `guide/src` for theming; override a clear compliance fail |

## Ownership

See [`UPSTREAM.md`](UPSTREAM.md).

| Path | Owner |
| --- | --- |
| `brand.md`, `examples.md`, `rules.md`, `templates.md`, `brand/*` | Brand |
| `agent.md`, `skills/**`, `guide/src/*`, `scripts/*`, intake templates | Upstream (shell) |

Brand system prompt: edit `brand.md` → Agent → **System prompt base.** (compiled). Do not customize roles/permissions by editing this file in a brand clone — those are shell defaults in the compiler.

## Compliance threshold

Default confidence for “compliant” judgments: `0.85`. Below that, mark `requires_human_review`.

## Connector scopes (illustrative)

| Scope | Allowed keys |
| --- | --- |
| public | color.tokens, typography.tokens, messaging.default.boilerplate |
| cursor | color.tokens, typography.tokens, voice.default, examples |
