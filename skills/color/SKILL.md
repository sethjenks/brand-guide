---
file: color
skill_id: color
skills_spec_version: 1.0.0
version: 0.1.1
depth: scaffold
status: draft
priority: 2
retrieval_tags: [color, skill]
summary: >
  Chapter skill router for Color (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Visual/Colors
  - brand.md#Design system/Color tokens
  - rules.md#Color
  - examples.md#Color examples
---

# Color

Color is a **guide chapter** and a **theme contribution**. Hiding or thinning the chapter does not remove required semantic roles.

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Palette empty, or user asks to set colors from a source |
| `audit` | Check required roles, contrast, Guide column |
| `improve` | Add swatches, combinations, or color few-shots |

Defer to intake when starter + pending. Default: `audit` if Design system color table exists.

## Read order

1. `brand.md` → Visual → **Colors** + Color ↔ Brand contract
2. `brand.md` → Design system → Color tokens + `:root`
3. `rules.md` → **Color** (ΔE, contrast)
4. `examples.md` → Color examples
5. [`guide/src/themes/brand.ts`](../../guide/src/themes/brand.ts) — ink → `--color-text-primary`, etc.

## Write targets

Visual color intent + Design system token table (Token / Value / Usage / Guide) and `:root`. **Colors intro.** is the chapter intro (12–28 words, one sentence preferred, statement-only — no “Values: Design system → …” pointer). Keep required roles: `--color-ink`, `--color-ink-muted`, `--color-ink-subtle`, `--color-canvas`, `--color-paper`, `--color-surface`, `--color-surface-deep`, `--color-border`. Optional `--color-accent` (else accent = ink).

## Conflict rules

Compile fails if required roles are missing. Theme-owned hexes go through `brand.generated.ts` → Astryx semantics — **not** as `--color-ink` on document `:root`, and **never** invent `--brand-*`. Off-palette accents need human approval + Design system update. If Visual intent disagrees with hex, flag it; prefer Strategy unless the user names Design system as authoritative.

## Populate

Author roles and hexes together. Write **Colors intro.** as the chapter intro (12–28 words, statement-only). Update Visual contract if roles change. Add on/off color examples. Compile + `theme:build`.

## Audit

Checklist: required tokens present; body contrast ≥ 4.5 on paper; Guide column values valid; no orphan `:root --brand-*`. Score **Colors intro.** word length: short (<12) / ok (12–28) / long (>28); flag Design system pointers in that field. Report-only unless asked to fix.

## Improve

Additive swatches or examples. If tightening the chapter intro, land **Colors intro.** in 12–28 words, statement-only. Do not silently drop required roles.

## Later ops

`contrast`, `from-source`, `theme-check`

## Done gate

Sources → `cd guide && npm run compile` (and `theme:build` if chrome colors changed) → spot-check Color. Never hand-edit compiled outputs.
