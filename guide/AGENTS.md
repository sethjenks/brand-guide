# AGENTS.md

Project-specific guidance for AI coding agents.

<!-- ASTRYX:START -->
Astryx v0.1.9 · 153 components
CLI: run every command as `npx astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:
1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:
- No <div> — components do all layout/spacing. Full page → AppShell; sidebar nav → SideNav.
- Frame first: pick the shell (AppShell / Layout+LayoutPanel) and budget regions in px BEFORE writing content (`astryx docs layout`).
- Dense data = rows (Table, List/Item) edge-to-edge — never Card-wrapped list items. Card = dashboard widgets, galleries, settings groups only.
- Status → StatusDot/Token; Badge only for counts and enumerated states, never decoration.
- Custom styling: component props first; else style/className with tokens — var(--color-*|--spacing-*|--radius-*). No raw hex/px. (No StyleX/Tailwind compiler here — don't use xstyle/utility classes.)
- Tokens for every value (`astryx docs tokens`). Brand/accent via `astryx theme` — never override --color-* in :root.
- SELF-CHECK before you finish: re-read the file and replace any raw <div>/<span> layout, imported .css/@apply, or hardcoded value (#hex, 16px) with the component or a token (var(--color-*|--spacing-*|…)). If unsure a component/prop exists, run `astryx component <Name>` / `astryx search "<thing>"`; don't hand-roll CSS.

MORE CLI:
  search "<query>"   find any component / hook / doc / template / block
  component --list   153 components by category
  template --list    page + block recipes
  docs <topic>       color, elevation, icons, illustrations, internationalization, layout, migration, motion, principles, shape, spacing, styling, theme, tokens, typography
  swizzle <Name>     eject component source for deep customization
  upgrade --apply    run after any @astryxdesign/core bump
<!-- ASTRYX:END -->

## Brand Guide notes

- Shell chrome is Astryx (`AppShell` + `SideNav` in `src/components/AppShell.tsx`). Do not reintroduce custom `.app-shell` CSS.
- **Separate with shape and color, not lines:** prefer tonal contrast and spacing over hairline dividers (e.g. AppShell `elevated` — darker wash nav, lighter content — instead of `section` borders).
- Brand theme: edit `src/themes/brand.ts` (maps compile output from `brand.generated.ts`). Rebuild with `npm run theme:build` (also runs in `predev` / `prebuild`).
- **Typefaces:** use Astryx tokens (`--font-family-body` / `--font-family-heading`). Next loads Geist into `--font-geist-sans`; do not apply a separate `next/font` className on `body` (that fights the theme stack). Legacy `--font-sans` aliases to `--font-family-body`.
- Chapter body content still uses legacy classes in `globals.css` and temporary `--color-*` aliases to `--brand-*`. Prefer Astryx components + theme tokens for new UI; migrate sections incrementally.
- Shared guide primitives (reuse across chapters): `ChapterHeader` (inverted H0 chapter title — wired via `ChapterSection`), `Clothesline` (top rule, title left, content right, optional `action`), `ClotheslineGrid` (Values, Personality, Pillars), `LogoAssetSection` (Logo chapter clothesline + media), `AssetStage` (single large image stage), `ImageGrid` (multi-cell logo/color specimens), `ScaleStack` (logo size cascade — shared `src` scaled, or per-step images), `LogoUseItem` (label left + image stage right; stack under Logo use), `DontGrid` (don’t specimens with strike + caption), `ColorPaletteSection` (Color chapter clothesline + tiles), `ColorTiles` (square swatches with copyable name / RGB / HEX), `ColorCombinations` (approved outer/inner color-pair specimens), `ColorContrastGrid` (do/don’t contrast fields with split bars), `CopySnippet` (clothesline + in-panel copy icon), `GuardrailsSection`, `ArchetypeExplorer` / `ArchetypeProfileCard`, `GraphicStatement`, `AudienceSection`, `StatementSection` (Positioning / Vision / Mission), `PrinciplesSection` (Language → Principles), `StorySection` (Language → Story), `HeadlinesSection` (Language → Headlines), `CtaSection` (Language → Calls to action), `VoiceSpectrumSection` (Language → Voice spectrum), `AndYetSection` (Language → And / Yet), `ContextSection` (Language → By context). Prefer these over one-off intro/header markup.
- **Section width:** `.block` leaves are full content-column width (same as Strategy clothesline sections). Constrain readable copy with `max-width: var(--measure)` / `var(--content-max)` (`65ch`) or the `.measure` class — not by narrowing the section itself. Grids, swatches, specimens, stages, and tables span the column.
- **Section rhythm:** main-body gaps use `--section-gap` (`1.5 × --space-6`) between chapters/blocks. Prefer that token over tighter ad-hoc margins when adding sections.
- Discover before writing UI: `npx astryx build`, `npx astryx component <Name>`, `npx astryx template <Name>`.
