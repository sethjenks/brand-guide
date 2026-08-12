# Section inventory spec (future)

**Status: do not implement yet.** This captures the Toolcraft-style composition bet so a follow-up plan can start clean. Do not rewrite [`guide/src/app/page.tsx`](../../guide/src/app/page.tsx) from inventory until that plan ships.

Task router note: [`workflow.md`](workflow.md).

## Goal

Declare guide leaves as an inventory (entity, grouping reason, brand labels, primitive) so skills write targets and UI composition share one map. Today field maps live in chapter skills and `page.tsx` wires chapters imperatively — those can drift.

## Row shape

Each inventory row:

| Field | Type | Purpose |
| --- | --- | --- |
| `chapterId` | string | GUIDE_NAV / skill id (e.g. `animation`, `logo`) |
| `leafId` | string | Stable leaf id shared with skills write targets |
| `entity` | string | Product meaning (e.g. "Motion principles") |
| `groupingReason` | string | Why these controls/fields sit together |
| `brandLabels` | string[] | `**Label.**` fields / headings in `brand.md` |
| `primitive` | string | Preferred shell primitive (e.g. `ClotheslineLeaf`, `PrinciplesSection`) |
| `statusKey` | string | Key used by section-status / coverage |
| `extendedToggle` | optional | `logo` \| `photography` \| `animation` \| `applications` when the leaf lives under an Extended chapter |

## Invariants (when implemented)

- Skills write targets and inventory rows **share `leafId`s**.
- Extended-chapter leaves respect `brand/setup.json` → `chapters` toggles (`extended-chapter-toggle`).
- Prefer named primitives (`primitive-before-custom-ui`); new components need a fit-check line.

## Future MVP acceptance

- One chapter (recommend **Animation** or **Logo**) can render leaves from inventory metadata.
- Other chapters may remain imperative in `page.tsx`.
- Skills for that chapter still compile through existing `brand.md` → `npm run compile` path.
- No requirement that inventory itself is compiled into `brand.json`.

## Non-goals

- Full `page.tsx` rewrite in the first MVP
- Per-chapter compile packages
- Promoting [`optional/`](../../optional/) into compile
- Toolcraft runtime / canvas / performance suites
