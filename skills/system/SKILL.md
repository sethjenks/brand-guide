---
file: system
skill_id: system
skills_spec_version: 1.0.0
version: 0.1.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [system, design-system, skill]
summary: >
  Chapter skill router for System / Design system (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Design system
---

# System

Guide **System** is fed by `brand.md` → **Design system** (fenced). Do not rewrite Strategy / Voice while editing this fence.

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Fence missing tokens, or user asks to author spacing/components |
| `audit` | Check knobs, derived scales, required colors/fonts |
| `improve` | Tighten grid/composition/component notes |

Defer to intake when starter + pending. For a Stitch/MD3 dump, prefer `npm run import:design` over hand-splicing (see Later ops).

## Read order

1. `brand.md` fenced Design system (`<!-- brand-guide:design-system -->`)
2. [`UPSTREAM.md`](../../UPSTREAM.md) semantic token contract
3. `examples/design-system.default.md` (reset snapshot)
4. Guide System leaves (several are stubs/placeholders in `section-status.ts`)

## Write targets

Design system tables + `:root` knobs: `--type-base`, `--type-ratio`, `--space-unit`, `--radius-base`, layout tokens, Components table, Logo (implementation). Keep the fence comments intact.

## Conflict rules

Do not put theme-owned `--color-ink` (etc.) back on document `:root` via this skill’s CSS advice — compile already withholds them. Document `--space-*` ≠ Astryx `--spacing-*`. `npm run tokens:reset` replaces the fence only.

## Populate

Fill spacing, radius, components, logo implementation from the source. Required `--font-sans` + color roles must remain. Compile.

## Audit

Confirm fence present, required tokens, knobs have defaults, System leaves that are stubs (`system-grid`) / asset placeholders (`system-composition`, `system-supporting`). Report-only unless asked to fix.

## Improve

One knob or component row. Do not splice a dump without `--print` first.

## Later ops

`tokens`, `import-dump`

## Done gate

Sources → `cd guide && npm run compile` → spot-check System. Never hand-edit generated CSS/JSON.
