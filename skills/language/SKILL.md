---
file: language
skill_id: language
skills_spec_version: 1.0.0
version: 1.0.0
depth: deep
status: stable
priority: 2
retrieval_tags: [language, voice, skill]
summary: >
  Chapter skill router for Language / Voice (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Voice
  - rules.md#Vocabulary
  - rules.md#Copy structure
  - examples.md#Copy examples
---

# Language

Guide chapter **Language** is authored as `brand.md` → **Voice** (`**Act label.** Language`).

## Op picker

| Op | Use when |
| --- | --- |
| [`populate`](populate.md) | Voice empty/placeholder, or user asks to build Language |
| [`audit`](audit.md) | Review principles, spectrum, phrases, we-say/never-say |
| [`improve`](improve.md) | Tighten CTAs, headlines, spectrum, or few-shots |

If unclear, ask. Default: **audit** when **Identity.** and Phrases exist, **populate** otherwise. Intake still wins when setup is `starter` + `intake: pending`.

## Read order

1. This file (field map)
2. `brand.md` → `## Voice`
3. `brand.md` → Strategy Personality (voice must match archetype)
4. [`rules.md`](../../rules.md) → Vocabulary + Copy structure
5. [`examples.md`](../../examples.md) → `## Copy examples`
6. Language leaves in `nav.ts`

## Write targets

Keep headings and `**Label.**` names the compiler already reads.

| Heading | Required / compiled |
| --- | --- |
| `### Identity` | **Identity.** **Essence.** |
| `#### Voice spectrum` | **Spectrum intro.** + Dimension / From / To / Notes table (From/To labels must match shell spectrum steps) |
| `### Principles` | **Principles intro.** + Principle / Description / Do / Don't table (≥ 1 row) |
| `### Tagline & Slogans` | **Tagline intro.** + primary / alternatives |
| `### Story` | **Story long.** **Story short.** (medium optional) |
| `### Headlines` | Bullet list (≥ 1) |
| `### Calls to action` | Do / Don't table |
| `### Phrases` | Bullet list (≥ 1) |
| `### Tonal Rules` | **Voice pillars.** **Do.** **Don’t.** Vocabulary use/never · And / yet table · We Say / We Never Say table · numbered **Rules** |
| `### Tone by context` | **Context intro.** + Context / Guidance / Example table (≥ 1 row) |

Also: `rules.md` Vocabulary **Blocklist:** / **Prefer:** (comma-separated — compiler parses these lines); Copy structure bullets; `examples.md` → `## Copy examples` YAML (`id`, `type`, `label`, `input`, `reason`).

**Later ops** (not separate files yet): `spectrum`, `review-copy`, `phrases` — use **improve** scoped to that slice.

## Conflict rules

Vocabulary blocklist in `rules.md` is highest precedence. Litmus: if any brand name could replace ours, rewrite. Voice must not contradict Strategy **We are** / Guardrails. Never hand-edit compiled outputs.

## Done gate

After populate/improve: `cd guide && npm run compile`, spot-check Language. Audit may stop at a report.

## Changelog

- 2026-08-10 — 1.0.0 — Deep router + populate/audit/improve.
