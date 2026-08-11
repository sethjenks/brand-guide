---
file: language
skill_id: language
skills_spec_version: 1.0.0
version: 0.1.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [language, voice, skill]
summary: >
  Chapter skill router for Language / Voice (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Voice
  - rules.md#Vocabulary
  - examples.md#Copy examples
---

# Language

Guide chapter **Language** is authored as `brand.md` → **Voice** (`actLabel: Language`).

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Voice is empty/placeholder, or user asks to build Language |
| `audit` | Content exists; review principles, spectrum, phrases |
| `improve` | Tighten CTAs, headlines, or we-say/never-say |

Defer to intake when setup is starter + pending. Default: `audit` if Voice has fields, `populate` otherwise.

## Read order

1. `brand.md` → **Voice** (Principles, Tagline, Story, Headlines, CTA, Spectrum, And/Yet, Context, Phrases)
2. `rules.md` → Vocabulary + Copy structure
3. `examples.md` → Copy examples
4. `brand.md` → Strategy Personality (voice must match archetype)

## Write targets

`brand.md` → `## Voice` labeled fields and tables. Copy few-shots: `examples.md` → `## Copy examples`. Blocklist/prefer: `rules.md` → `## Vocabulary`.

## Conflict rules

Vocabulary blocklist in `rules.md` is highest precedence. Do not ship copy that fails the litmus test (if any brand name could replace ours, it is off-brand).

## Populate

Write Voice from transcript/source. Fill principles, tagline, story, headlines, CTAs, spectrum, contexts, phrases. Add at least one on/off copy pair in `examples.md`. Compile.

## Audit

Check Language leaves vs `section-status`. Flag empty spectrum/context. Compare phrases to blocklist. Report-only unless asked to fix.

## Improve

Surgical: one context, CTA pair, or few-shot. Do not rewrite all of Voice.

## Later ops

`spectrum`, `review-copy`, `phrases`

## Done gate

Sources → `cd guide && npm run compile` → spot-check Language. Never hand-edit compiled outputs.
