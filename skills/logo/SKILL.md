---
file: logo
skill_id: logo
skills_spec_version: 1.0.0
version: 1.0.1
depth: deep
status: stable
priority: 2
retrieval_tags: [logo, skill]
summary: >
  Chapter skill router for Logo (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Visual/Logo
  - brand.md#Design system/Logo
  - rules.md#Logo
  - examples.md#Logo examples
  - brand/assets/
---

# Logo

## Op picker

| Op | Use when |
| --- | --- |
| [`populate`](populate.md) | Logo labels empty, or user asks to build Logo / ingest assets |
| [`audit`](audit.md) | “Is Logo ready?”; missing SVG; placeholder leaves |
| [`improve`](improve.md) | Tighten clearspace, don’ts, or asset filenames |

If unclear, ask. Default: **audit** when **Logo description.** exists, **populate** otherwise. Intake still wins when setup is `starter` + `intake: pending`.

## Read order

1. This file (field map + asset conventions)
2. `brand.md` → Visual → `### Logo / Wordmark`
3. `brand.md` → Design system → `### Logo (implementation)`
4. [`rules.md`](../../rules.md) → `## Logo`
5. [`examples.md`](../../examples.md) → `## Logo examples`
6. `brand/assets/` (compile copies files to `guide/public/brand/`)
7. [`guide/src/lib/section-status.ts`](../../guide/src/lib/section-status.ts) logo placeholder leaves

## Write targets

| Source | Compiler / consumer |
| --- | --- |
| `**Logo description.**` | `guide.visual.logo.description` (required; chapter intro: 12–28 words, one sentence preferred, statement-only — no Design system pointer; clearspace/donts stay on their labels) |
| `**Logo clearspace.**` | `logo.clearspace` |
| `**Logo donts.**` | `guide.visual.logo.donts` + `logo.donts` (·-separated; required non-empty) |
| Design system → Logo (implementation) | Human/agent implementation notes (not a JSON logo blob) |
| `rules.md` → `## Logo` | `rules.logo_rules.constraints` |
| `examples.md` → `## Logo examples` | `examples.logo` |

## Asset conventions

Place files in [`brand/assets/`](../../brand/assets/) (brand-owned). `compile-design.mjs` copies **files** (not subfolders) to `guide/public/brand/`. Do not hand-edit the public copy.

Preferred filenames (also what `post-populate-check` looks for):

- `logo.svg` (preferred) or `logo.png`
- `wordmark.svg`
- `mark.svg`

`section-status` treats `brand/assets/logo.svg` (or `guide/public/brand/logo.svg`) as a real mark: several Logo leaves stay **assets** until the UI uses the SVG instead of a text wordmark. Missing `logo.svg` is a warn in `post-populate-check`, not a compile fail.

**Assets** (extended op, not a separate file yet): ingest/normalize exports and clearspace specimens as part of populate/improve.

## Conflict rules

1. `rules.md` Logo + global precedence
2. Visual Logo labels
3. Design system Logo (implementation) — should not contradict clearspace/donts
4. Compiled `brand.json`

Never stretch/outline/drop-shadow guidance that contradicts **Logo donts.** Never hand-edit `brand.json` / generated public assets.

## Done gate

After populate/improve: `cd guide && npm run compile`, confirm assets copied if files were added, spot-check Logo. Audit may stop at a report.

## Changelog

- 2026-08-11 — 1.0.1 — Chapter intro bound on **Logo description.** (12–28 words, statement-only).
- 2026-08-10 — 1.0.0 — Deep router + populate/audit/improve; rules, examples, asset conventions.
