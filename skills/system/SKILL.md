---
file: system
skill_id: system
skills_spec_version: 1.0.0
version: 0.2.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [system, design-system, skill]
summary: >
  Chapter skill router for System / Design system (ops: populate, audit, improve).
  Intro + components from guide.system / fence; hide unauthored grid/composition/supporting.
ops: [populate, audit, improve]
writes:
  - brand.md#Design system
---

# System

Guide **System** is fed by `brand.md` → **Design system** (fenced). Do not rewrite Strategy / Voice while editing this fence.

## Leaf map

| leafId | Source | Hide-empty |
| --- | --- | --- |
| `system-introduction` | **System intro.** (or Spacing document-like prose) → `guide.system.intro` | always-on when authored |
| `system-components` | Design system → `### Components` table → `guide.system.components` | hide when empty |
| `system-grid` | Authored grid / document-like spacing copy → `guide.system.grid` | hide when empty |
| `system-composition` | Authored composition note → `guide.system.composition` | hide when empty |
| `system-supporting` | Authored supporting device → `guide.system.supporting` | hide when empty |

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Fence missing tokens, or user asks to author spacing/components |
| `audit` | Check knobs, derived scales, required colors/fonts, adaptive leaves |
| `improve` | Tighten grid/composition/component notes |

Defer to intake when starter + pending. For a Stitch/MD3 dump, prefer `npm run import:design` over hand-splicing (see Later ops).

## Read order

1. `brand.md` fenced Design system (`<!-- brand-guide:design-system -->`)
2. [`UPSTREAM.md`](../../UPSTREAM.md) semantic token contract
3. `examples/design-system.default.md` (reset snapshot)
4. Guide System leaves via `filterNavForAuthoredLeaves`

## Write targets

Design system tables + `:root` knobs: `--type-base`, `--type-ratio`, `--space-unit`, `--radius-base`, layout tokens, Components table, Logo (implementation). Keep the fence comments intact.

Author **System intro.** for the GraphicStatement. Fill Components from the source. Only author grid / composition / supporting when the source has them — unauthored leaves hide (no Sample stubs).

### Allowed `guide/src` edits

Add System leaves when the source has more authored slices than the shell (e.g. an extra supporting device). Prefer hide-empty for grid / composition / supporting over placeholders.

## Conflict rules

Do not put theme-owned `--color-ink` (etc.) back on document `:root` via this skill’s CSS advice — compile already withholds them. Document `--space-*` ≠ Astryx `--spacing-*`. `npm run tokens:reset` replaces the fence only. If display/mono stacks (`--font-serif` / `--font-mono`) exist, leave `layout.tsx` webfont loaders to [`skills/typography/SKILL.md`](../typography/SKILL.md).

## Populate

1. Fill spacing, radius, Components table, logo implementation from the source.
2. Write **System intro.** (and Components rows) into the fence so `guide.system` compiles.
3. Author grid / composition / supporting **only** when evidenced; otherwise leave empty (leaves hide).
4. Required `--font-sans` + color roles must remain. Compile. Do not own next/font loaders here — typography skill does.

## Audit

Confirm fence present, required tokens, knobs have defaults; `system-introduction` / components from `guide.system`; `system-grid` / `system-composition` / `system-supporting` hidden when unauthored. Report-only unless asked to fix.

## Improve

One knob or component row. Do not splice a dump without `--print` first. Do not invent composition/supporting specimens.

## Later ops

`tokens`, `import-dump`

## Done gate

Sources → `cd guide && npm run compile` → spot-check authored System leaves only. Never hand-edit generated CSS/JSON.
