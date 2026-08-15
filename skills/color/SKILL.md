---
file: color
skill_id: color
skills_spec_version: 1.0.0
version: 0.2.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [color, skill]
summary: >
  Chapter skill router for Color (ops: populate, audit, improve).
  Adaptive leaves: proportion / donts / secondary hide-empty; combinations from
  authored swatches (Ink/Paper/Surface), not Gray 1.
ops: [populate, audit, improve]
writes:
  - brand.md#Visual/Colors
  - brand.md#Design system/Color tokens
  - rules.md#Color
  - examples.md#Color examples
---

# Color

Color is a **guide chapter** and a **theme contribution**. Hiding or thinning the chapter does not remove required semantic roles.

## Leaf map

| leafId | Source | Hide-empty |
| --- | --- | --- |
| `color-introduction` | **Colors intro.** (chapter intro: 12–28 words, statement-only) | always-on |
| `color-primary` | Design system brand / primary swatches | — |
| `color-secondary` | Secondary swatches | hide when empty |
| `color-interface` | Interface scale | — |
| `color-proportion` | **Colors proportion.** | hide when empty |
| `color-combinations` | Derived from authored Ink / Paper / Surface / Muted swatches (`on-*` pairings) | — |
| `color-contrast` | Same swatch resolvers (do/don’t contrast) | — |
| `color-donts` | **Colors donts.** (or **Color donts.**) — `splitList` | hide when empty |

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Palette empty, or user asks to set colors from a source |
| `audit` | Check required roles, contrast, Guide column, adaptive leaves |
| `improve` | Add swatches, proportion, donts, or color few-shots |

Defer to intake when starter + pending. Default: `audit` if Design system color table exists.

## Read order

1. Inventory every named swatch in the source (Ink, Paper, accents — do not stop at Gray 1).
2. `brand.md` → Visual → **Colors** + Color ↔ Brand contract
3. `brand.md` → Design system → Color tokens + `:root`
4. `rules.md` → **Color** (ΔE, contrast)
5. `examples.md` → Color examples
6. [`guide/src/themes/brand.ts`](../../guide/src/themes/brand.ts) — ink → `--color-text-primary`, etc.

## Write targets

Visual color intent + Design system token table (Token / Value / Usage / Guide) and `:root`. **Colors intro.** is the chapter intro (12–28 words, statement-only — no Design system pointer). Keep required roles: `--color-ink`, `--color-ink-muted`, `--color-ink-subtle`, `--color-canvas`, `--color-paper`, `--color-surface`, `--color-surface-deep`, `--color-border`. Optional `--color-accent` (else accent = ink).

Author **Colors proportion.** when the brand has a usage mix (hide `color-proportion` if empty). Author **Colors donts.** as a `·` / `,` list — or leave empty and the leaf hides.

**Combinations / contrast / logo on-\*:** resolve from authored swatch **names** (Ink, Paper, Surface, Muted). Do **not** treat Gray 1 (or any single interface step) as ink/paper for pairings.

### Allowed `guide/src` edits

Add Color leaves when the source has more authored palettes than the shell (e.g. a tertiary set). Prefer hide-empty for proportion / donts / secondary over Sample stubs.

## Conflict rules

Compile fails if required roles are missing. Theme-owned hexes go through `brand.generated.ts` → Astryx semantics — **not** as `--color-ink` on document `:root`, and **never** invent `--brand-*`. Off-palette accents need human approval + Design system update. If Visual intent disagrees with hex, flag it; prefer Strategy unless the user names Design system as authoritative.

## Populate

1. Inventory every distinct named color in the source.
2. Author roles and hexes together (Ink / Paper / Surface named so combinations resolve).
3. Write **Colors intro.** (12–28 words, statement-only).
4. Author **Colors proportion.** and **Colors donts.** when the source supports them; otherwise leave empty (leaves hide).
5. Update Visual contract if roles change. Add on/off color examples.
6. Compile + `theme:build`.

## Audit

Checklist: required tokens present; body contrast ≥ 4.5 on paper; Guide column values valid; no orphan `:root --brand-*`; combinations resolve Ink/Paper (not Gray 1); `color-proportion` / `color-donts` / `color-secondary` hidden when empty. Score **Colors intro.** word length: short (<12) / ok (12–28) / long (>28); flag Design system pointers. Report-only unless asked to fix.

## Improve

Additive swatches, proportion, or donts. If tightening the chapter intro, land **Colors intro.** in 12–28 words, statement-only. Do not silently drop required roles.

## Later ops

`contrast`, `from-source`, `theme-check`

## Done gate

Sources → `cd guide && npm run compile` (and `theme:build` if chrome colors changed) → spot-check Color leaves that are authored. Never hand-edit compiled outputs.
