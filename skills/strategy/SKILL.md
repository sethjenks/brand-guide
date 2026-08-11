---
file: strategy
skill_id: strategy
skills_spec_version: 1.0.0
version: 1.0.0
depth: deep
status: stable
priority: 2
retrieval_tags: [strategy, skill]
summary: >
  Chapter skill router for Strategy (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Strategy
  - rules.md#Strategy
  - examples.md#Strategy examples
---

# Strategy

## Op picker

| Op | Use when |
| --- | --- |
| [`populate`](populate.md) | Strategy headings empty/placeholder, or user asks to build Strategy |
| [`audit`](audit.md) | Content exists; “is positioning / archetype / guardrails done?” |
| [`improve`](improve.md) | Tighten one leaf (positioning, archetype, or guardrails) |

If unclear, ask. Default: **audit** when **What.** and **Mission.** exist, **populate** otherwise. Whole-brand [`intake/`](../../intake/) still wins when `brand/setup.json` is `starter` and `intake` is `pending`.

Changing **Guardrails** is `requires_approval` per [`agent.md`](../../agent.md).

## Read order

1. This file (field map)
2. `brand.md` → `## Strategy`
3. `brand.md` → Voice (personality must not contradict tone)
4. [`rules.md`](../../rules.md) → `## Strategy` + Conflict resolution
5. [`examples.md`](../../examples.md) → `## Strategy examples`
6. Strategy leaves in [`guide/src/lib/nav.ts`](../../guide/src/lib/nav.ts)

## Write targets

Keep `**Label.**` names — `compile-brand.mjs` keys off them. Required for compile:

| Heading | Required labels / structures |
| --- | --- |
| `### Overview` | **What.** **Problem.** **Current.** **Opportunity.** **Solution.** (also Origin, Vision intro, Long-term ambition) |
| `### Positioning` | **Category.** **Audience.** **Differentiation.** / **Only we.** |
| `### Audience` | **Audience intro.** + Segments / Wants / Needs table |
| `### Personality` | **Archetype.** **Attributes.** **We are.** **We are not.** + `#### Primary archetype` field block |
| `### Promise` | **Mission.** **Purpose.** **Position.** **Promise.** |
| `### Message Pillars` | At least one pillar table row |
| `### Guardrails` | **Tone summary.** **Litmus test.** **The brand cannot be.** |

Archetype H4 blocks use **Name.** **Wheel.** **Motivations.** **Personality narrative.** **Quote.** **Drive.** **Fears.** **Strategy.** **Voice.** **Seeks.** **Motto.** **Audience feels.** **Brands.** **At best.** **At worst.** **Characters.** **Types.** **Types highlighted.** Keep **Wheel.** aligned with a classic archetype id.

Also: `rules.md` → `## Strategy`; `examples.md` → `## Strategy examples`.

**Later ops** (not separate files yet): `positioning`, `archetype`, `guardrails` — use **improve** scoped to that leaf.

## Conflict rules

1. [`rules.md`](../../rules.md)
2. Guardrails + Voice
3. Compiled `brand.json`
4. Personality / archetype color alone

Do not invent competitive claims. Do not rename labels. Never hand-edit `brand.json` / `tokens.json` / generated CSS.

## Done gate

After populate/improve: `cd guide && npm run compile`, spot-check Strategy. Audit may stop at a report.

## Changelog

- 2026-08-10 — 1.0.0 — Deep router + populate/audit/improve; strategy rules + examples.
