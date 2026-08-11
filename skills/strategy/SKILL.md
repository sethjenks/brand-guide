---
file: strategy
skill_id: strategy
skills_spec_version: 1.0.0
version: 0.1.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [strategy, skill]
summary: >
  Chapter skill router for Strategy (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Strategy
---

# Strategy

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Strategy headings are empty/placeholder, or the user asks to build Strategy |
| `audit` | Content exists; “is positioning / archetype / guardrails done?” |
| `improve` | Tighten one leaf without rewriting the chapter |

Defer to [`intake/`](../../intake/) when `brand/setup.json` is `starter` + `intake: pending`. Default: `audit` if fields exist, `populate` if mostly placeholders.

## Read order

1. `brand.md` → **Strategy** (Overview, Positioning, Audience, Personality, Promise, Pillars, Guardrails)
2. `brand.md` → Voice (personality must not contradict tone)
3. `rules.md` → Conflict resolution
4. Guide leaves: Strategy group in `guide/src/lib/nav.ts`

## Write targets

`brand.md` → `## Strategy`. Keep `**Label.**` lines the compiler already reads (Overview **What.** / **Vision intro.**, Positioning **Category.** **Audience.**, Personality **Archetype.**, Guardrails, etc.). Do not rename labels.

## Conflict rules

[`rules.md`](../../rules.md) wins over compiled `brand.json`. Guardrails are brand-owned; changing them is `requires_approval` per [`agent.md`](../../agent.md).

## Populate

Fill Strategy from the intake transcript or cited source. Complete Overview, Positioning, Audience, Personality (including archetype H4 blocks), Promise, Pillars, Guardrails. Do not invent competitive claims. Compile from `guide/`.

## Audit

Walk GUIDE_NAV Strategy leaves vs `section-status`. Report empty/stub fields by `**Label.**` name. Do not invent copy unless asked to fix.

## Improve

Edit one leaf (e.g. positioning statement or guardrails). Preserve surrounding Strategy.

## Later ops

`positioning`, `archetype`, `guardrails`

## Done gate

Sources → `cd guide && npm run compile` → spot-check Strategy. Never hand-edit `brand.json` / `tokens.json` / generated CSS.
