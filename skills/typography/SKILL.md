---
file: typography
skill_id: typography
skills_spec_version: 1.0.0
version: 0.1.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [typography, skill]
summary: >
  Chapter skill router for Typography (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Visual/Typography
  - brand.md#Design system/Type tokens
---

# Typography

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Type fields empty, or user asks to set faces/scale |
| `audit` | Check stacks, knobs, and `layout.tsx` font contract |
| `improve` | Tighten specimens, hierarchy, or type don’ts |

Defer to intake when starter + pending. Default: `audit` if `--font-sans` exists, `populate` otherwise.

## Read order

1. `brand.md` → Visual → **Typography** (`**Type primary.**`, fallback, family, specimens)
2. `brand.md` → Design system → Type tokens (`--font-sans` required; optional `--font-serif`; `--type-base` / `--type-ratio`)
3. [`guide/src/app/layout.tsx`](../../guide/src/app/layout.tsx) — owns `next/font` CSS variables (today `--font-geist-sans`)
4. [`guide/src/themes/brand.ts`](../../guide/src/themes/brand.ts) — maps stacks to Astryx `--font-family-*`

## Write targets

Visual type labels + Design system Type table and `:root` knobs. Authored stacks must include the `next/font` variable. Do **not** codegen `next/font` from the stack string — adding a face is a hand edit in `layout.tsx`.

## Conflict rules

Theme-owned type still ships through the Design system fence → `brand.generated.ts` → Astryx. Live UI reads `--font-family-body` / `--font-family-heading`, not `--font-sans` directly. Do not invent `--brand-*` on `:root`.

## Populate

Set faces and knobs from the source. Keep `--font-sans` required. Optional `--font-serif` for headings. Compile + `theme:build` (via `predev`/`prebuild` or `npm run theme:build`).

## Audit

Confirm required `--font-sans`, stack contains the layout variable, specimens match Visual labels. Note stub leaves (`typography-setting`, `typography-testing` in `section-status.ts`). Report-only unless asked to fix.

## Improve

Adjust `--type-base` / `--type-ratio`, specimens, or Visual type note. Do not put theme-owned colors on document `:root`.

## Later ops

`scale`, `pairing`, `specimens`

## Done gate

Sources → `cd guide && npm run compile` (and `theme:build` if stacks/knobs changed) → spot-check Typography. Never hand-edit compiled CSS/JSON.
