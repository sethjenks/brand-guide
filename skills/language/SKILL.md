---
file: language
skill_id: language
skills_spec_version: 1.0.0
version: 1.1.0
depth: deep
status: stable
priority: 2
retrieval_tags: [language, voice, skill]
summary: >
  Chapter skill router for Language / Voice (ops: populate, audit, improve).
  Adaptive leaves: phrases / we-say hide when empty; spectrum From/To exact-match.
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
6. Language leaves in `nav.ts` / `filterNavForAuthoredLeaves`

## Write targets

Keep headings and `**Label.**` names the compiler already reads. Share `leafId`s with the guide.

| leafId | Heading / source | Hide-empty |
| --- | --- | --- |
| `language-introduction` | `### Identity` → **Identity.** (chapter intro: 12–28 words, statement-only) + **Essence.** | always-on |
| `language-spectrum` | `#### Voice spectrum` → **Spectrum intro.** + Dimension / From / To / Notes | — |
| `language-principles` | `### Principles` → table (≥ 1 row) | — |
| `language-tagline` | `### Tagline & Slogans` | — |
| `language-story` | `### Story` → **Story long.** **Story short.** | — |
| `language-headlines` | `### Headlines` bullets | — |
| `language-cta` | `### Calls to action` Do / Don't | — |
| `language-phrases` | `### Phrases` bullets → `voice.phrases` | hide when empty |
| `language-we-say` | We Say / We Never Say table → `voice.weSay` | hide when empty |
| `language-and-yet` | And / yet table | — |
| `language-context` | `### Tone by context` table | — |

Also: `rules.md` Vocabulary **Blocklist:** / **Prefer:**; Copy structure; `examples.md` → `## Copy examples` YAML.

**Spectrum:** From / To must **exact-match** shell steps in [`voice-spectrum.ts`](../../guide/src/lib/voice-spectrum.ts) (Volume, Energy, Sociability, Attitude). Mismatch → compile `WARN` + range unmarked. Do **not** invent poles.

**Phrases:** keep on `### Phrases` / `language-phrases`. Do **not** roll phrases into **Identity.** / introduction.

### Allowed `guide/src` edits

Add Language leaves + nav items when the source has more authored slices than the shell catalog (e.g. extra context rows that need their own leaf). Prefer hide-empty over stubs.

## Conflict rules

Vocabulary blocklist in `rules.md` is highest precedence. Litmus: if any brand name could replace ours, rewrite. Voice must not contradict Strategy **We are** / Guardrails. Never hand-edit compiled outputs.

## Done gate

After populate/improve: `cd guide && npm run compile`, spot-check Language (phrases / we-say only if authored). Audit may stop at a report.

## Changelog

- 2026-08-14 — 1.1.0 — Adaptive leaves: `language-phrases` / `language-we-say` hide-empty; spectrum exact-match; no phrases-in-intro.
- 2026-08-11 — 1.0.1 — Chapter intro bound on **Identity.** (12–28 words, statement-only).
- 2026-08-10 — 1.0.0 — Deep router + populate/audit/improve.
