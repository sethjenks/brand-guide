---
skill_id: website
intake_skills_spec_version: 1.0.0
version: 1.0.2
status: stable
source_kinds: [url, website]
summary: >
  Populate the kit from a marketing / product / About URL. Inventory CSS
  tokens, fonts, and assets before rewriting brand.md.
---

# Website

## When to use

User provides an `http(s)` marketing, product, or About URL (not `figma.com/design/`).

Set `brand/setup.json` → `intake` to `"skipped"`. After [`_shared.md`](../_shared.md): `status` `"populated"`.

## Read this first

1. [`../README.md`](../README.md) routing table
2. This file
3. [`../_shared.md`](../_shared.md)

## Source-specific steps

1. Set `intake` to `"skipped"` if still `"pending"`.
2. **Map** the site (home, About/Company, 1–2 product or solutions pages, contact/footer).
3. **Scrape in parallel** those pages (JS sites: wait for render). Prefer main content plus linked CSS.
4. **Fetch design signals before any `brand.md` rewrite:**
   - HTML font preloads / `@font-face`
   - Linked stylesheet `:root` / brand CSS variables (ink, bg, accent, font stacks)
   - Favicon / apple-touch-icon / clear SVG mark → [`brand/assets/`](../../../brand/assets/)
   - Do not trust `theme-color` alone; SPAs often hide tokens in `/assets/*.css`
5. Build `resources/transcripts/populate-<slug>-inventory.md` with quotes, CTAs, claims, colors, type, logo, imagery (alt + URL). Mark `filled` / `inferred` / `placeholder`. Inventory **every** surface (Expressions channels), face (display / body / mono), and phrase — do not stop at the first two.
6. Then follow [`../_shared.md`](../_shared.md): write constitution from the inventory → compile → gap pass → checklist → status.

Typical thin slices for the gap pass: Expressions (channels), Photography (image inventory), Logo (if only a favicon), Language phrases.

## Write mapping

| From source | Into |
| --- | --- |
| Home / About positioning, pillars, audience | `brand.md` → Strategy |
| Headlines, CTAs, phrases, tone | `brand.md` → Voice + `examples.md` |
| `:root` colors, font stacks, imagery mood | Visual + Design system fence |
| Favicon / wordmark SVG | `brand/assets/` + Visual → Logo |
| Nav, footer, social, email, retail | Expressions (only channels the brand uses; unknown → `applications-<slug>`) |

Cite the URL in `sources[]` with `"kind": "citation"` (label `"Website"`, detail = URL + pages + tokens used).

## Stop conditions

- Keep grayscale unless CSS/brand-book specifies a palette.
- Do not invent pillars from color names.
- Archetype: ask once or mark `inferred` — do not silently assign Sage.
- Do not reconstruct wordmarks from path soup if an official SVG/PNG exists; note the gap if not.
- Do not hand-edit `brand.json` / `tokens.json`.

## Done

Coverage + shared checklist + inferred-field list. Inventory every surface / face / phrase from the source. Load every webfont named by stack `var(--font-*)` in `guide/src/app/layout.tsx`. Author **Type display.** / `--font-serif` and **Type mono.** / `--font-mono` when the source has those faces. One TypefaceSection per authored face. When the shell has fewer leaves than authored items (channels, faces, phrases, categories), **add the leaf** in `guide/src` — prefer hide-empty over stubs.
