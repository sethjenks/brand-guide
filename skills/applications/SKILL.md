---
file: applications
skill_id: applications
skills_spec_version: 1.0.0
version: 1.1.0
depth: deep
status: stable
priority: 2
retrieval_tags: [applications, expressions, skill]
summary: >
  Chapter skill router for Applications / Expressions (ops: populate, audit, improve).
  Adaptive nav: one leaf per Expressions row; unknown → applications-<slug>.
ops: [populate, audit, improve]
writes:
  - brand.md#Expressions
  - rules.md#Applications
  - examples.md#Application examples
---

# Applications

Guide **Applications** is authored as `brand.md` → **Expressions** (`**Act label.** Applications`).

## Op picker

| Op | Use when |
| --- | --- |
| [`populate`](populate.md) | Expression table empty, or user asks to fill channels from a source |
| [`audit`](audit.md) | Compare nav leaves vs table rows |
| [`improve`](improve.md) | Deepen **one** channel (`channel` extended op — stay in improve) |

If unclear, ask. Default: **audit** when the Expressions table has rows, **populate** otherwise. Intake still wins when starter + pending. Prefer one channel at a time over rewriting every leaf.

## Read order

1. This file (channel map)
2. `brand.md` → `## Expressions`
3. Voice + Visual (samples must match)
4. [`rules.md`](../../rules.md) → `## Applications` + Vocabulary
5. [`examples.md`](../../examples.md) → `## Application examples`
6. [`guide/src/lib/application-channels.ts`](../../guide/src/lib/application-channels.ts) + `withApplicationsFromExpressions`

## Write targets

Expressions **markdown table** columns: `Channel | Title | Copy | Sample` (compiler keeps rows with a Channel cell). Optional `**Channel <name>.**` labels merge into the same row — table is still the compile source.

**One table row per real surface.** Nav = authored rows only (empty catalog leaves are gone). Known Channel labels → ids; unknown → `applications-<slug>`.

| Channel cell (normalized) | leafId |
| --- | --- |
| Web | `applications-web` |
| Social | `applications-social` |
| Print | `applications-print` |
| Business cards | `applications-business-cards` |
| Merchandise / Swag | `applications-merchandise` |
| Packaging | `applications-packaging` |
| Signage | `applications-signage` |
| Presentation | `applications-presentation` |
| Out of home / OOH | `applications-ooh` |
| Digital ads | `applications-digital-ads` |
| App | `applications-app` |
| Email | `applications-email` |
| *(any other)* | `applications-<slug>` |

Also: `rules.md` → `## Applications`; `examples.md` → `## Application examples`.

### Allowed `guide/src` edits

Add an Applications leaf (+ page section) when the Expressions table has a channel the shell does not yet render (known map or `applications-<slug>`). Nav is rebuilt from the table — do not leave orphan catalog leaves for unauthored channels.

## Conflict rules

Channel copy follows Voice + Vocabulary blocklist. Do not invent a channel the brand does not use. Never hand-edit compiled outputs.

## Done gate

After populate/improve: `cd guide && npm run compile`, spot-check Applications (only authored surfaces). Audit may stop at a report.

## Changelog

- 2026-08-14 — 1.1.0 — Adaptive leaves: one row → one nav leaf; unknown → `applications-<slug>`; empty leaves gone.
- 2026-08-10 — 1.0.0 — Deep router + populate/audit/improve; channel map; application examples.
