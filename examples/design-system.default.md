<!-- brand-guide:design-system -->
## Design system

Implementation layer for the grayscale **Sample Brand** starter. Strategy / Voice / Visual above are the brief; this section defines **what to ship**: tokens, type scale, spacing, and component notes.

**Theme authoring:** edit this fenced block only. Run `npm run tokens` or `npm run compile` from `guide/`. Canonical reset snapshot: [`examples/design-system.default.md`](design-system.default.md). Reset with `npm run tokens:reset` (replaces this block; leaves Strategy / Voice / Visual untouched). Full Sample Brand constitution (including this block): [`brand.default.md`](brand.default.md).

Compiled outputs (do not hand-edit): `guide/src/styles/tokens.generated.css`, [`tokens.json`](../tokens.json), `guide/public/tokens.json`, and `brand.json` color fields.

### Color tokens

| Token | Value | Usage | Guide |
| --- | --- | --- | --- |
| `--color-ink` | `#111111` | Primary text, key chrome, CTAs | brand |
| `--color-ink-muted` | `#4a4a4a` | Secondary text, captions | secondary |
| `--color-ink-subtle` | `#6b6b6b` | Tertiary text, meta, placeholders | secondary |
| `--color-border` | `#d0d0d0` | Dividers, hairlines, input borders | interface |
| `--color-surface` | `#f5f5f5` | Panels, zebra rows, subtle fills | interface |
| `--color-surface-deep` | `#e8e8e8` | Deeper panels, hover fills | interface |
| `--color-paper` | `#ffffff` | Page / content card background | interface |
| `--color-canvas` | `#dcdcdc` | App canvas behind the content card | chrome |
| `--color-rail` | `#e6e6e6` | Sidebar / rail background | chrome |

`Guide` column: `brand` | `secondary` | `interface` | `chrome` (CSS only). New `--color-*` rows default to `interface` unless the name suggests brand/accent.

```css
:root {
  /* Color */
  --color-ink: #111111;
  --color-ink-muted: #4a4a4a;
  --color-ink-subtle: #6b6b6b;
  --color-border: #d0d0d0;
  --color-surface: #f5f5f5;
  --color-surface-deep: #e8e8e8;
  --color-paper: #ffffff;
  --color-canvas: #dcdcdc;
  --color-rail: #e6e6e6;

  /* Typography — --type-base / --type-ratio derive sm/base/lg/xl on compile */
  --font-sans: var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif;
  --type-base: 16;
  --type-ratio: 1.2;
  --font-size-display: clamp(2.75rem, 6vw, 4.25rem);
  --font-size-h0: clamp(4.5rem, 14vw, 9rem);
  --line-height-body: 1.55;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing — --space-unit derives --space-1…7 on compile (document rhythm) */
  --space-unit: 0.25rem;
  --content-max: 65ch;
  --guide-max: 60rem;

  /* Radius — change --radius-base to soften/sharpen the whole shell */
  --radius-base: 0.5rem;
}
```

**Rules**

- No accent hue in the starter kit (omit `--color-accent` so theme accent equals ink). Author `--color-accent` when CTAs must diverge from primary text.
- Body text on `--color-paper` must meet WCAG AA (≥ 4.5:1). Ink on paper exceeds AAA.
- Prefer these tokens for marketing and UI; add new semantic tokens here before using one-off hex in CSS.

**DTCG / agent names (compiled)**

Edit tokens in the tables above (and the `:root` block). On `npm run compile`:

- CSS custom properties → `guide/src/styles/tokens.generated.css`
- Agent color map → `brand.json` (`color-ink`, …)
- DTCG export → `tokens.json` (`color.ink`, …) and `guide/public/tokens.json`

Do not hand-edit `tokens.json` or `brand.json`. Theme authoring stays in this Design system section.

| Agent key | DTCG path | Value | Usage |
| --- | --- | --- | --- |
| `color-ink` | `color.ink` | `#111111` | Primary text / CTA |
| `color-ink-muted` | `color.ink-muted` | `#4a4a4a` | Secondary text |
| `color-ink-subtle` | `color.ink-subtle` | `#6b6b6b` | Tertiary text |
| `color-border` | `color.border` | `#d0d0d0` | Borders |
| `color-surface` | `color.surface` | `#f5f5f5` | Surfaces |
| `color-paper` | `color.paper` | `#ffffff` | Background |

### Type tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--font-sans` | `var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif` | Display + body |
| `--type-base` | `16` | Modular scale base (px); compiles to Astryx `typography.scale.base` and `--font-size-*` steps |
| `--type-ratio` | `1.2` | Modular scale ratio; compiles to Astryx `typography.scale.ratio` |
| `--font-size-display` | `clamp(2.75rem, 6vw, 4.25rem)` | Cover / hero brand name (authored fluid) |
| `--font-size-h0` | `clamp(4.5rem, 14vw, 9rem)` | Chapter openers (authored fluid) |
| `--line-height-body` | `1.55` | Body copy |
| `--font-weight-regular` | `400` | Body |
| `--font-weight-medium` | `500` | Labels |
| `--font-weight-semibold` | `600` | Headings |

**Derived on compile** (do not hand-author): `--font-size-sm`, `--font-size-base`, `--font-size-lg`, `--font-size-xl` via geometric steps `base × ratio^n` (same formula as Astryx `expandTypeScale`).

**Hierarchy**

1. H0 — chapter openers (inverted ink panels)
2. Display — brand name, cover
3. XL — section titles (derived)
4. LG — subsection titles (derived)
5. Base — body (derived)
6. SM — captions, token labels (derived)

**Accessibility**

- Min body size: `16px` (`--type-base` at default root)
- Min line-height: `1.5`
- Min contrast ratio (body): `4.5`

### Spacing & layout

| Token | Value |
| --- | --- |
| `--space-unit` | `0.25rem` |
| `--content-max` | `65ch` (prose measure ≈ 65–75 characters) |
| `--guide-max` | `60rem` |
| `--radius-base` | `0.5rem` |

**Derived on compile** (do not hand-author): `--space-1`…`--space-7` as `unit × [1, 2, 4, 6, 10, 16, 24]`. Document rhythm for guide CSS — not Astryx UI `--spacing-*`.

**Radius.** `--radius-base` is the single roundness knob. Compile emits `radiusBasePx` into the Astryx theme; Astryx expands semantic radii (`inner`, `element`, `container`, `page`). Set to `0` for sharp corners.

Document-like layout: single column for prose; wide enough for swatches and type specimens. Generous vertical rhythm between sections (`--space-6`).

App chrome sizes (`--chrome-h`, `--sidebar-w`, `--workspace-pad`) live in `guide/src/app/globals.css` and are not themed from this section.

### Components

| Component | Guidance |
| --- | --- |
| Primary button | Ink fill, paper text; no rounded-full pills |
| Secondary button | Paper fill, ink text, `1px` border |
| Links | Ink, underline on hover; no accent color |
| Cards | Prefer none. Use only when the container is interactive |
| Dividers | `--color-border` hairlines |
| Code / tokens | Surface background, mono optional |

### Logo (implementation)

- Default: ink wordmark on paper
- Inverse: paper wordmark on ink
- Min clearspace: `1em` of the wordmark height
- Export SVG preferred; PNG fallback with transparent background

### Sync checklist

When restoring or editing the default:

1. Run `npm run tokens:reset` from `guide/` (or splice this file into `brand.md` Design system fence)
2. Spot-check the guide; color swatches and `brand.json` values sync automatically
<!-- /brand-guide:design-system -->
