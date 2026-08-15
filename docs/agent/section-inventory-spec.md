# Section inventory spec

**Status: in progress.** Skills write targets, compile field paths, nav ids, and `page.tsx` leaves share `leafId`s. Runtime nav = catalog ∩ authored data ∩ extended-on (`filterNavForAuthoredLeaves`). Do **not** rewrite all of `page.tsx` as a generic inventory renderer in this pass — stop hardcoding cardinality and hide empty leaves.

Task router note: [`workflow.md`](workflow.md).

## Goal

Declare guide leaves as an inventory (entity, grouping reason, brand labels, primitive) so skills write targets and UI composition share one map.

## Hide-empty invariant

A guide leaf is **shown if and only if** the brand authored the data for it (or it is a true always-on core: chapter intro, utilities, primary typeface).

- Drop a leaf when its backing field/list is empty.
- Prefer hiding over Sample Brand stubs (“Include a background here…”, placeholder channels, `system-ui` as a fake second face).
- Extended chapters still respect `brand/setup.json` → `chapters` on/off.

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

## Leaf map (this pass)

| leafId | brandLabels / source |
| --- | --- |
| `typography-display` | **Type display.** + foundry; `--font-serif` |
| `typography-primary` | **Type primary.** + foundry; `--font-sans` |
| `typography-mono` | **Type mono.** + foundry; `--font-mono` |
| `language-phrases` | ### Phrases bullets → `voice.phrases` |
| `language-we-say` | We Say / We Never Say table → `voice.weSay` |
| `language-spectrum` | #### Voice spectrum (From/To must match shell steps) |
| `applications-*` | Expressions table Channel column (+ merged **Channel X.** labels) |
| `photography-category-subjects` | **Imagery subjects.** |
| `photography-category-settings` | **Imagery settings.** |
| `photography-category-product` | **Imagery product.** / **Imagery prompt product.** |
| `photography-category-moments` | **Imagery moments.** / lifestyle |
| `photography-donts` | **Imagery avoid.** (split `·` / `,`) |
| `color-proportion` | **Colors proportion.** |
| `color-donts` | **Colors donts.** (split) |
| `logo-clearspace` | **Logo clearspace.** on `visual.logo` |
| `logo-supporting` | **Supporting logo.** / supporting asset |
| `strategy-positioning` | Positioning labels (Category, Not, Differentiation, …) |
| `strategy-pillars` | Message pillars + emotional/functional/trust |
| `system-introduction` | `guide.system.intro` from Design system notes |
| `system-grid` / `composition` / `supporting` | authored system fields only |

## Invariants

- Skills write targets and inventory rows **share `leafId`s**.
- Extended-chapter leaves respect `brand/setup.json` → `chapters` toggles.
- Prefer named primitives (`primitive-before-custom-ui`); new components need a fit-check line.

## Non-goals (this pass)

- Full `page.tsx` rewrite from inventory metadata
- Per-chapter compile packages
- Promoting [`optional/`](../../optional/) into compile
