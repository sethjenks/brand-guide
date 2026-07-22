# Upstream ownership & upgrades

This kit is a **clone-per-brand** template. Brands customize theme and content; shell updates come from the upstream repo via git.

## Ownership

| Zone | Paths | Who edits |
| --- | --- | --- |
| Brand content | `brand.md`, `examples.md`, `rules.md`, `templates.md` | Brand |
| Theme | `DESIGN.md` | Brand |
| Overrides | `brand/setup.json`, `brand/overrides.css`, `brand/assets/**` | Brand |
| Generated | `brand.json`, `guide/src/styles/tokens.generated.css`, `guide/src/styles/brand.overrides.css`, `guide/public/brand/**` | Compiler only (commit the outputs) |
| Shell | `guide/src/app/**`, `guide/src/components/**`, `guide/src/lib/**`, `scripts/**`, `agent.md`, intake templates | Upstream |

**Do not hand-edit** `brand.json`, `tokens.generated.css`, or `guide/src/styles/brand.overrides.css`. Edit sources and run `npm run compile` from `guide/`.

**Do not edit** shell UI to theme the guide — use `DESIGN.md` and optional `brand/overrides.css`.

### `agent.md` (shell-owned)

[`agent.md`](agent.md) is the **upstream** load recipe, roles table, and permission policy for this kit. Brand clones should not fork it for tone — put the brand system prompt in `brand.md` → **Agent** → `**System prompt base.**` (compiled into `brand.json`).

`brand.json` → `agent.roles` / `permissions` / `connector_scopes` are **shell defaults** emitted by `compile-brand.mjs` (not brand-edited). Changing them is an upstream shell change.

### Theme colors (`DESIGN.md`)

Every `--color-*` hex row becomes an agent token in `brand.json`. Optional **Guide** column values: `brand` | `secondary` | `interface` | `chrome` (CSS/agent only — not a guide swatch). If Guide is omitted, defaults apply (`canvas` / `rail` → chrome; names containing `brand` / `accent` / `primary` → brand; everything else → interface so new colors still appear in the guide).

### CSS overrides

| Edit this | Not this |
| --- | --- |
| [`brand/overrides.css`](brand/overrides.css) | `guide/src/styles/brand.overrides.css` |

The file under `guide/src/styles/` is **generated** on compile (copied from `brand/overrides.css`). Edits there are wiped on the next `npm run compile` and will fight upstream merges. Prefer tokens in `DESIGN.md` first; use overrides only for light additive tweaks.

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
npm run compile         # brand.md (+ examples/rules/templates) → brand.json, then DESIGN.md → CSS + colors
npm run compile:check   # compile + smoke + golden fixture parity
npm run compile:golden  # regenerate scripts/fixtures/brand.sample.expected.json
npm run tokens          # alias of compile
npm run tokens:reset    # restore examples/DESIGN.default.md → DESIGN.md, then compile
```

`predev` / `prebuild` run compile automatically.

Optional: set `BRAND_ROOT` to the kit root if the Next app is not started from `guide/` (the loader also walks parents looking for `brand.md` + `brand.json` + `brand/setup.json`).
