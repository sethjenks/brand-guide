---
file: typography
skill_id: typography
skills_spec_version: 1.0.0
version: 0.2.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [typography, skill]
summary: >
  Chapter skill router for Typography (ops: populate, audit, improve).
  N-face contract: one Visual field, one stack, one next/font loader, one
  TypefaceSection per authored face.
ops: [populate, audit, improve]
writes:
  - brand.md#Visual/Typography
  - brand.md#Design system/Type tokens
  - guide/src/app/layout.tsx
---

# Typography

## Face contract

| Role | Visual fields | Stack | Guide leaf id | Nav label |
| --- | --- | --- | --- | --- |
| Display / serif | **Type display.** + **Type display foundry.** | `--font-serif` (optional `--font-display` in the stack string) | `typography-display` | Display typeface |
| Body / UI | **Type primary.** + **Type primary foundry.** | `--font-sans` (required) | `typography-primary` | Primary typeface |
| Label / mono | **Type mono.** + **Type mono foundry.** | `--font-mono` | `typography-mono` | Label typeface |

One Visual field, one Design system stack, one `next/font` loader, and one TypefaceSection per authored face. Hide display/label leaves when those Visual fields are empty. Do **not** use **Type fallback.** or `system-ui` as a second typeface leaf. **Type note.** is the chapter intro only (12–28 words, statement-only) — it may *name* faces but must not be the only place they appear.

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Type fields empty, or user asks to set faces/scale |
| `audit` | Check stacks, knobs, loaders, and TypefaceSections |
| `improve` | Tighten specimens, hierarchy, or type don’ts |

Defer to intake when starter + pending. Default: `audit` if `--font-sans` exists, `populate` otherwise.

## Read order

1. Inventory **every** distinct face in the source (display / body / label — do not stop at two).
2. `brand.md` → Visual → **Typography** (`**Type display.**`, `**Type primary.**`, `**Type mono.**` + foundries; **Type note.**; family; specimens)
3. `brand.md` → Design system → Type tokens (`--font-sans` required; optional `--font-serif`; optional `--font-mono`; `--type-base` / `--type-ratio`)
4. [`guide/src/app/layout.tsx`](../../guide/src/app/layout.tsx) — owns `next/font` CSS variables on `<html>`
5. Guide TypefaceSections — one leaf per authored face (`typography-display` / `typography-primary` / `typography-mono`)

## Write targets

Visual type labels + Design system Type table and `:root` knobs + **`layout.tsx` loaders**.

**Type note.** is the chapter intro (12–28 words, one sentence preferred, statement-only — no “Scale tokens: Design system → …” pointer). Authored stacks must lead with the matching `next/font` variable. Do **not** codegen `next/font` from the stack string — adding a face is a required hand edit in `layout.tsx`.

### Allowed `guide/src` edits

1. `layout.tsx` loaders so every stack `var(--font-*)` is injected on `<html>` (never put a `next/font` className on `<body>`).
2. Add TypefaceSections + nav items if the shell has fewer leaves than authored faces.

Do **not** leave “add a loader” as a human note. Do **not** cram extra faces into the primary leaf or **Type note.**

## Conflict rules

Theme-owned type ships through the Design system fence → `brand.generated.ts` → Astryx. Live UI reads `--font-family-body` / `--font-family-heading` / `--font-family-mono`, not `--font-sans` directly. Do not invent `--brand-*` on `:root`. Do not put theme-owned `--color-ink` (etc.) on document `:root`.

## Populate

1. Inventory every distinct face in the source.
2. Author **Type primary.** (+ foundry) and `--font-sans` (required).
3. When a display/serif face exists: **Type display.** + foundry + `--font-serif`.
4. When a label/mono face exists: **Type mono.** + foundry + `--font-mono`.
5. Edit `layout.tsx` so every `var(--font-*)` in those stacks has a matching `variable: "--font-…"`.
6. Ensure one TypefaceSection (and nav leaf) per authored face — shell hides empty display/mono.
7. Write **Type note.** as the chapter intro (12–28 words, statement-only).
8. Compile + `theme:build` (via `predev`/`prebuild` or `npm run theme:build`).

## Audit

Confirm:

- Visual face count === `variable:` loaders in `layout.tsx` === TypefaceSections rendered
- Required `--font-sans`; optional stacks match authored Visual fields
- Stacks contain the layout variables they name
- Specimens / weights / hierarchy rows use the matching role’s `fontFamily`
- Flag a primary leaf whose context lists other faces (they belong on their own leaves)
- Score **Type note.** word length: short (<12) / ok (12–28) / long (>28); flag Design system pointers in that field
- Note stub leaves (`typography-setting`, `typography-testing` in `section-status.ts`)

Report-only unless asked to fix.

## Improve

Adjust `--type-base` / `--type-ratio`, specimens, or Visual type note. If tightening the chapter intro, land **Type note.** in 12–28 words, statement-only. Do not put theme-owned colors on document `:root`.

## Later ops

`scale`, `pairing`, `specimens`

## Done gate

Sources → `cd guide && npm run compile` (and `theme:build` if stacks/knobs/loaders changed) → spot-check each Typography leaf in its own face, not a fallback. Never hand-edit compiled CSS/JSON.
