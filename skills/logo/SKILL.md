---
file: logo
skill_id: logo
skills_spec_version: 1.0.0
version: 1.1.0
depth: deep
status: stable
priority: 2
retrieval_tags: [logo, skill]
summary: >
  Chapter skill router for Logo (ops: populate, audit, improve).
  Clearspace on guide.visual.logo; load SVG when present; hide supporting if none.
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
7. [`guide/src/lib/section-status.ts`](../../guide/src/lib/section-status.ts) + `filterNavForAuthoredLeaves`

## Write targets

| leafId | Source | Compiler / consumer | Hide-empty |
| --- | --- | --- | --- |
| `logo-introduction` | `**Logo description.**` | `guide.visual.logo.description` (chapter intro: 12–28 words, statement-only) | always-on |
| `logo-clearspace` | `**Logo clearspace.**` | `guide.visual.logo.clearspace` (also `logo.clearspace`) | — |
| `logo-donts` | `**Logo donts.**` | `guide.visual.logo.donts` + `logo.donts` (·-separated; required non-empty) | — |
| `logo-supporting` | `**Supporting logo.**` and/or `supporting.svg` / `supporting.png` | `guide.visual.logo.supporting` | hide when none |
| `logo-mark` / scaling / use / … | `brand/assets/logo.svg` (or `.png`) | Guide loads SVG when present instead of a text wordmark | — |

Also: Design system → Logo (implementation); `rules.md` → `## Logo`; `examples.md` → `## Logo examples`.

## Asset conventions

Place files in [`brand/assets/`](../../brand/assets/) (brand-owned). `compile-design.mjs` copies **files** (not subfolders) to `guide/public/brand/`. Do not hand-edit the public copy.

Preferred filenames:

- `logo.svg` (preferred) or `logo.png` — guide specimens load this when present
- `wordmark.svg`
- `mark.svg`
- `supporting.svg` / `supporting.png` (optional; with **Supporting logo.**)

Missing `logo.svg` is a warn in `post-populate-check`, not a compile fail. Do not treat assets-badge placeholders as a populate failure when prose + clearspace are authored.

### Allowed `guide/src` edits

Add Logo leaves when the source has more lockups / supporting marks than the shell (e.g. a second supporting mark). Prefer hide-empty for `logo-supporting` over Sample stubs.

## Conflict rules

1. `rules.md` Logo + global precedence
2. Visual Logo labels
3. Design system Logo (implementation) — should not contradict clearspace/donts
4. Compiled `brand.json`

Never stretch/outline/drop-shadow guidance that contradicts **Logo donts.** Never hand-edit `brand.json` / generated public assets.

## Done gate

After populate/improve: `cd guide && npm run compile`, confirm assets copied if files were added, spot-check Logo (SVG when present; supporting only if authored). Audit may stop at a report.

## Changelog

- 2026-08-14 — 1.1.0 — Clearspace on `guide.visual.logo`; load SVG when present; hide supporting if none.
- 2026-08-11 — 1.0.1 — Chapter intro bound on **Logo description.** (12–28 words, statement-only).
- 2026-08-10 — 1.0.0 — Deep router + populate/audit/improve; rules, examples, asset conventions.
