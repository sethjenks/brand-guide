---
file: applications
skill_id: applications
skills_spec_version: 1.0.0
version: 0.1.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [applications, expressions, skill]
summary: >
  Chapter skill router for Applications / Expressions (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Expressions
---

# Applications

Guide **Applications** is authored as `brand.md` → **Expressions** (`**Act label.** Applications`).

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Expression table empty, or user asks to fill channels |
| `audit` | Compare nav application leaves vs table rows |
| `improve` | Deepen one channel |

Defer to intake when starter + pending. Prefer one channel at a time (`improve` / later `channel` op) over rewriting every leaf.

## Read order

1. `brand.md` → **Expressions** (channel table + `**Channel web.**` etc.)
2. `brand.md` → Voice + Visual (samples must match)
3. GUIDE_NAV Applications items (`applications-web`, `applications-social`, …)
4. `section-status.ts` — unmatched nav channels stay `empty`

## Write targets

Expressions markdown table columns: Channel, Title, Copy, Sample. Labeled `**Channel <name>.**` lines. Channel names should map to nav ids (Web → `applications-web`, etc.).

## Conflict rules

Channel copy follows Voice + `rules.md` Vocabulary. Do not invent a channel the brand does not use — leave the nav leaf empty rather than fabricating.

## Populate

Fill channels you have evidence for. Keep Sample Brand’s web/social/print if this is still the starter. Compile.

## Audit

List nav leaves with no matching expression row. Flag empty title/copy. Report-only unless asked to fix.

## Improve

One channel’s title/copy/sample. Do not batch-rewrite all applications.

## Later ops

`channel`

## Done gate

Sources → `cd guide && npm run compile` → spot-check Applications. Never hand-edit compiled outputs.
