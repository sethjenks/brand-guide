# Upstream ownership & upgrades

This kit is a **clone-per-brand** template. Brands customize theme and content; shell updates come from the upstream repo via git.

## Ownership

| Zone | Paths | Who edits |
| --- | --- | --- |
| Brand content + theme | `brand.md` (includes Design system), `examples.md`, `rules.md`, `templates.md` | Brand |
| Overrides | `brand/setup.json`, `brand/overrides.css`, `brand/assets/**` | Brand |
| Generated | `brand.json`, `tokens.json`, `guide/public/brand.txt`, `guide/public/tokens.json`, `guide/src/styles/tokens.generated.css`, `guide/src/styles/brand.overrides.css`, `guide/public/brand/**` | Compiler only (commit the outputs) |
| Shell | `guide/src/app/**`, `guide/src/components/**`, `guide/src/lib/**`, `scripts/**`, `agent.md`, `skills/**`, intake templates | Upstream |

**Do not hand-edit** `brand.json`, `tokens.json`, `guide/public/brand.txt`, `guide/public/tokens.json`, `tokens.generated.css`, or `guide/src/styles/brand.overrides.css`. Edit sources and run `npm run compile` from `guide/`.

**Do not edit** shell UI to theme the guide — use `brand.md` → Design system and optional `brand/overrides.css`.

### `agent.md` (shell-owned)

[`agent.md`](agent.md) is the **upstream** load recipe, roles table, and permission policy for this kit. Brand clones should not fork it for tone — put the brand system prompt in `brand.md` → **Agent** → `**System prompt base.**` (compiled into `brand.json`).

`brand.json` → `agent.roles` / `permissions` / `connector_scopes` are **shell defaults** emitted by `compile-brand.mjs` (not brand-edited). Changing them is an upstream shell change.

### Theme colors (`brand.md` Design system)

Every `--color-*` hex row in the fenced Design system section becomes an agent token in `brand.json` and a DTCG leaf in `tokens.json`. Optional **Guide** column values: `brand` | `secondary` | `interface` | `chrome` (CSS/agent only — not a guide swatch). If Guide is omitted, defaults apply (`canvas` / `rail` → chrome; names containing `brand` / `accent` / `primary` → brand; everything else → interface so new colors still appear in the guide).

`tokens.json` is a Design Tokens Community Group (DTCG) export for external tools. Theme authoring stays in `brand.md` → Design system only.

### Semantic token contract

These roles must appear as color tokens in `brand.md` → Design system. `compile-design.mjs` fails with a checklist if any are missing. The guide theme ([`guide/src/themes/brand.ts`](guide/src/themes/brand.ts)) maps them onto Astryx:

| Role | Design token | Astryx mapping |
| --- | --- | --- |
| ink | `--color-ink` | text/icon primary, inverted background |
| ink-muted | `--color-ink-muted` | text/icon secondary |
| ink-subtle | `--color-ink-subtle` | text/icon disabled |
| canvas | `--color-canvas` | `--color-background-body` |
| paper | `--color-paper` | `--color-background-surface` |
| surface | `--color-surface` | `--color-background-card` |
| surface-deep | `--color-surface-deep` | `--color-background-muted` |
| border | `--color-border` | `--color-border` |

**Optional accent:** `--color-accent` (not in the required set). When omitted, theme `accent` equals ink (grayscale starters stay unchanged). When authored, it drives `brandThemeInput.accent` → Astryx `--color-accent` / primary actions.

**Optional** (grayscale defaults / existing fallbacks if omitted): `--color-gray-*`, `--color-rail`, `--radius-base`, `--type-base` / `--type-ratio` (default `16` / `1.2`), `--space-unit` (default `0.25rem`).

**Required face stack:** `--font-sans` (CSS `font-family` list). Compile fails if missing. Emitted as `brandThemeInput.fontSans` for [`guide/src/themes/brand.ts`](guide/src/themes/brand.ts) (drives Astryx `typography.body` and `--font-family-body`).

**Optional heading face:** `--font-serif`. When present, emitted as `brandThemeInput.fontSerif` and DTCG `font.serif`; [`guide/src/themes/brand.ts`](guide/src/themes/brand.ts) uses it for `typography.heading` / `--font-family-heading`. When omitted, heading equals sans (Sample Brand default).

**Next font loader contract (two owners):** Design system owns the CSS stacks; [`guide/src/app/layout.tsx`](guide/src/app/layout.tsx) owns which webfont CSS variables `next/font` injects (e.g. `--font-geist-sans`). Author stacks so they reference those variables. Compile does **not** codegen `next/font` — adding Literata (or any second face) is a hand edit in `layout.tsx`.

**Design dump import:** Stitch/MD3-style `DESIGN.md` YAML → Design system fence via `npm run import:design` ([`scripts/import-design-dump.mjs`](scripts/import-design-dump.mjs)). Maps named keys (`obsidian-ink`, `clay-earth`, …) and MD3 roles onto required semantic tokens; `--splice --yes` backs up `brand.md.bak` first. Does not rewrite Strategy/Voice.

**Setup validation:** Every `npm run compile` validates [`brand/setup.json`](brand/setup.json) (`intake` | `citation` sources). See [`scripts/lib/setup-schema.mjs`](scripts/lib/setup-schema.mjs) (keep in sync with [`guide/src/lib/setup-schema.ts`](guide/src/lib/setup-schema.ts)).

**Coverage (populated only):** Optional [`brand/coverage.json`](brand/coverage.json) with `filled` | `inferred` | `placeholder` section statuses. Missing when `status` is `populated` → warn in `compile:check` / `post-populate-check`, not a hard fail.

**Derived scales (compile):** `--type-base` + `--type-ratio` → `--font-size-sm|base|lg|xl` (Astryx geometric formula) and `brandThemeInput.typeScale` for [`guide/src/themes/brand.ts`](guide/src/themes/brand.ts). `--space-unit` → `--space-1`…`7` as `unit × [1, 2, 4, 6, 10, 16, 24]` (document rhythm). Keep fluid `--font-size-display` / `--font-size-h0` authored. Document `--space-*` is separate from Astryx UI `--spacing-*` — do not alias them.

`--radius-base` → `radiusBasePx`; Astryx expands semantic radii (`inner`, `element`, `container`, `page`).

**Token layers:** DTCG / `tokens.json` / `brand.json` keep authored role names (`--color-ink`, etc.) for agents and export. `tokens.generated.css` emits interface scales, type, and space — not theme-owned chrome (those hexes go through `brand.generated.ts` → `brand.ts` → Astryx `--color-text-*` / `--color-background-*`). Live UI must use Astryx semantics, not invent `--brand-*` or document `:root --color-ink`.

### CSS overrides

| Edit this | Not this |
| --- | --- |
| [`brand/overrides.css`](brand/overrides.css) | `guide/src/styles/brand.overrides.css` |

The file under `guide/src/styles/` is **generated** on compile (copied from `brand/overrides.css`). Edits there are wiped on the next `npm run compile` and will fight upstream merges. Prefer tokens in the Design system section first; use overrides only for light additive tweaks.

### Guide flourish (shell-owned)

Intentional brand-book chrome (chapter invert, type specimens, don’t strikes, archetype wheel, voice spectrum, hero type) lives in [`guide/src/styles/flourish/`](guide/src/styles/flourish/) and is imported by owning components. It is **not** Design system tokens and **not** `brand/overrides.css`. Upstream edits those files; brand clones should not fork flourish for theming.

## Spec version

`brand.json` includes `_spec_version`. Additive fields are backward compatible. Breaking shape changes bump the major/minor per the release notes; recompile after merging upstream.

## Upgrade a brand clone

```bash
git remote add upstream <upstream-brand-guide-url>   # once
git fetch upstream
git merge upstream/main
cd guide && npm install && npm run build
# deploy to the brand subdomain
```

Resolve conflicts in brand-owned paths carefully. Conflicts under `guide/src/` usually mean local shell edits — prefer upstream and re-apply intent via `brand/` overrides instead.

## Compile

From `guide/`:

```bash
npm run compile         # brand.md (+ examples/rules/templates) → brand.json, then Design system → CSS + colors + DTCG
npm run compile:check   # compile + smoke + golden fixture parity
npm run compile:golden  # regenerate scripts/fixtures/*.sample.expected.json
npm run tokens          # alias of compile
npm run tokens:reset    # splice examples/design-system.default.md into brand.md Design system fence, then compile
```

Full Sample Brand constitution (Strategy through Design system): [`examples/brand.default.md`](examples/brand.default.md) — copy over root `brand.md` when you want the grayscale starter end-to-end.

`predev` / `prebuild` run compile automatically.

Optional: set `BRAND_ROOT` to the kit root if the Next app is not started from `guide/` (the loader also walks parents looking for `brand.md` + `brand.json` + `brand/setup.json`).
