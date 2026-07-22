# Sample Brand — DESIGN.md (default)

Implementation layer for **Sample Brand**. Aesthetic intent and semantic roles live in [`brand.md`](brand.md). This file defines **what to ship**: tokens, type scale, spacing, and component notes.

Tokens below implement the **Color ↔ Brand contract** in `brand.md`.

**Theme source:** swap or edit root `DESIGN.md`, then run `npm run tokens` (from `guide/`). Canonical out-of-box copy: [`examples/DESIGN.default.md`](examples/DESIGN.default.md). Reset with `npm run tokens:reset`.

---

## Link to brand

- Brand constitution: [`brand.md`](brand.md)
- Compiled agent API: [`brand.json`](brand.json)
- Visual guide CSS is generated from the tokens below
- Reset snapshot path when this file lives under `examples/`: copy to root `DESIGN.md` via `npm run tokens:reset`

---

## Color tokens

| Token | Value | Usage | Guide |
| --- | --- | --- | --- |
| `--color-ink` | `#111111` | Primary text, key chrome, CTAs | brand |
| `--color-ink-muted` | `#4a4a4a` | Secondary text, captions | secondary |
| `--color-border` | `#d0d0d0` | Dividers, hairlines, input borders | interface |
| `--color-surface` | `#f5f5f5` | Panels, zebra rows, subtle fills | interface |
| `--color-surface-deep` | `#e8e8e8` | Deeper panels, hover fills | interface |
| `--color-paper` | `#ffffff` | Page / content card background | interface |
| `--color-canvas` | `#dcdcdc` | App canvas behind the content card | chrome |
| `--color-rail` | `#e6e6e6` | Sidebar / rail background | chrome |

```css
:root {
  /* Color */
  --color-ink: #111111;
  --color-ink-muted: #4a4a4a;
  --color-border: #d0d0d0;
  --color-surface: #f5f5f5;
  --color-surface-deep: #e8e8e8;
  --color-paper: #ffffff;
  --color-canvas: #dcdcdc;
  --color-rail: #e6e6e6;

  /* Typography */
  --font-sans: var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.75rem;
  --font-size-display: clamp(2.75rem, 6vw, 4.25rem);
  --line-height-body: 1.55;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing & layout */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2.5rem;
  --space-6: 4rem;
  --space-7: 6rem;
  --content-max: 44rem;
  --guide-max: 60rem;
  --radius-card: 0.75rem;
}
```

**Rules**

- No accent hue in the starter kit.
- Body text on `--color-paper` must meet WCAG AA (≥ 4.5:1). Ink on paper exceeds AAA.
- Prefer these tokens for marketing and UI; add new semantic tokens here before using one-off hex in CSS.

**W3C-style names (for `brand.json`)**

| Name | Value | Usage |
| --- | --- | --- |
| `color-ink` | `#111111` | Primary text / CTA |
| `color-ink-muted` | `#4a4a4a` | Secondary text |
| `color-border` | `#d0d0d0` | Borders |
| `color-surface` | `#f5f5f5` | Surfaces |
| `color-paper` | `#ffffff` | Background |

---

## Typography

| Token | Value | Usage |
| --- | --- | --- |
| `--font-sans` | `var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif` | Display + body |
| `--font-size-base` | `1rem` | Body |
| `--font-size-sm` | `0.875rem` | Captions, meta |
| `--font-size-lg` | `1.25rem` | Lead |
| `--font-size-xl` | `1.75rem` | Section titles |
| `--font-size-display` | `clamp(2.75rem, 6vw, 4.25rem)` | Cover / hero brand name |
| `--line-height-body` | `1.55` | Body copy |
| `--font-weight-regular` | `400` | Body |
| `--font-weight-medium` | `500` | Labels |
| `--font-weight-semibold` | `600` | Headings |

**Hierarchy**

1. Display — brand name, cover
2. XL — section titles (Strategy, Voice, Visual)
3. LG — subsection titles
4. Base — body
5. SM — captions, token labels

**Accessibility**

- Min body size: `16px` (`1rem` at default root)
- Min line-height: `1.5`
- Min contrast ratio (body): `4.5`

---

## Spacing & layout

| Token | Value |
| --- | --- |
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `1rem` |
| `--space-4` | `1.5rem` |
| `--space-5` | `2.5rem` |
| `--space-6` | `4rem` |
| `--space-7` | `6rem` |
| `--content-max` | `44rem` |
| `--guide-max` | `60rem` |
| `--radius-card` | `0.75rem` |

Document-like layout: single column for prose; wide enough for swatches and type specimens. Generous vertical rhythm between sections (`--space-6`).

App chrome sizes (`--chrome-h`, `--sidebar-w`, `--workspace-pad`) live in `guide/src/app/globals.css` and are not themed from this file.

---

## Components (notes)

| Component | Guidance |
| --- | --- |
| Primary button | Ink fill, paper text; no rounded-full pills |
| Secondary button | Paper fill, ink text, `1px` border |
| Links | Ink, underline on hover; no accent color |
| Cards | Prefer none. Use only when the container is interactive |
| Dividers | `--color-border` hairlines |
| Code / tokens | Surface background, mono optional |

---

## Logo usage (implementation)

- Default: ink wordmark on paper
- Inverse: paper wordmark on ink
- Min clearspace: `1em` of the wordmark height
- Export SVG preferred; PNG fallback with transparent background

---

## Sync checklist

When restoring or editing the default:

1. Copy this file to root `DESIGN.md`
2. Run `npm run tokens` from `guide/` (or `npm run tokens:reset`)
3. Spot-check the guide; color swatches and `brand.json` values sync automatically
