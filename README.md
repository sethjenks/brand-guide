# Brand Guide

A cloneable, grayscale starter kit for a **human-friendly brand guide** and an **agent-readable brand constitution**.

Brands customize **theme + content**; the Next.js shell is upstream-owned. See [`UPSTREAM.md`](UPSTREAM.md) for ownership and how to pull updates.

## Out of the box

The cover asks you to populate the guide from an existing source:

- Website **URL**
- Brand guide **PDF**
- **`brand.md`**
- **`DESIGN.md`**

Give that source to your agent (or harness) along with this repo. Follow [`intake/populate-from-source.md`](intake/populate-from-source.md). When finished, set `status` to `"populated"` in [`brand/setup.json`](brand/setup.json) — the setup callout then drops to a small tertiary note.

Until then, Sample Brand content remains as a structural preview.

## Edit → compile → run

| Edit (brand-owned) | Generated (do not hand-edit) |
| --- | --- |
| `brand.md`, `examples.md`, `rules.md`, `templates.md` | `brand.json` |
| `DESIGN.md` | `guide/src/styles/tokens.generated.css` |
| `brand/setup.json`, `brand/overrides.css`, `brand/assets/` | `guide/src/styles/brand.overrides.css`, `guide/public/brand/` |

```bash
cd guide
npm install
npm run compile   # also runs on npm run dev / build
npm run dev
```

**Reset** theme to the out-of-box grayscale:

```bash
cd guide && npm run tokens:reset
```

That copies [`examples/DESIGN.default.md`](examples/DESIGN.default.md) → `DESIGN.md` and recompiles. Other swap-ins live under `examples/`.

App chrome sizes (sidebar width, top bar height) stay in `globals.css` and are not themed from `DESIGN.md`.

## Dual audience

| Audience | Start here |
| --- | --- |
| **Humans** | Browse the visual guide (`guide/`) or read [`brand.md`](brand.md) + [`DESIGN.md`](DESIGN.md) |
| **Agents** | Discover root [`brand.md`](brand.md); prefer compiled [`brand.json`](brand.json) for structured reads; for first fill use [`intake/populate-from-source.md`](intake/populate-from-source.md) |

## Agent load order

1. Read `brand.md` frontmatter (`name`, `tagline`, `version`, `language`).
2. Prefer `brand.json` for tokens, rules, examples, templates, and `guide` (visual guide payload).
3. Slice by task:
   - **Copy / social** → Voice in `brand.md` + [`examples.md`](examples.md)
   - **UI / CSS** → Visual in `brand.md` + [`DESIGN.md`](DESIGN.md)
   - **Pitch / strategy** → Strategy in `brand.md`
4. Use Voice **Phrases** and **We Say / We Never Say** as lightweight few-shots; use `examples.md` for labeled on/off-brand review.
5. Respect [`rules.md`](rules.md) and [`agent.md`](agent.md) for permissions and conflict precedence.
6. After editing sources, run `npm run compile` from `guide/` — never patch `brand.json` by hand.

## Quick start (visual guide)

```bash
cd guide
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port Next prints).

## Repo map

```text
brand.md          Strategy / Voice / Visual constitution (edit)
DESIGN.md         Tokens / theme source (edit)
brand.json        Compiled agent API + guide payload (generated)
brand/            setup.json, overrides.css, assets/ (brand-owned)
examples.md       Few-shot on/off-brand pairs
examples/         Swap-in theme examples (e.g. DESIGN.revhawk.md)
rules.md          Blocklists, contrast, conflict resolution
agent.md          Roles, prompts, permissions, load recipe
templates.md      Slot-based output templates
scripts/          compile-brand, compile-design, compile-all
intake/           Populate-from-source + questionnaire
optional/         Deeper scaffolds when you outgrow the single page
guide/            Next.js visual brand guide (shell — upstream-owned)
UPSTREAM.md       Ownership map + upgrade recipe
```

## Customize

1. Prefer [`intake/populate-from-source.md`](intake/populate-from-source.md) with a URL, PDF, `brand.md`, or `DESIGN.md`.
2. Or run [`intake/brand-intake-questionnaire.md`](intake/brand-intake-questionnaire.md), save under `resources/transcripts/`, then update brand markdown + `brand/setup.json` and `npm run compile` (never hand-edit `brand.json`).
3. Theme the guide by editing `DESIGN.md` (including new `--color-*` rows and optional Guide column) and running `npm run compile` in `guide/`.
4. Keep strategy/voice copy in `brand.md`; compile updates `brand.json`.
5. Light tweaks: `brand/overrides.css`, logos in `brand/assets/`.
6. Set `brand/setup.json` `status` to `"populated"` when the starter callout should demote.

## Upgrades

See [`UPSTREAM.md`](UPSTREAM.md). Short version: `git fetch upstream && git merge upstream/main`, then `cd guide && npm install && npm run build`, deploy to the brand subdomain.

## Spec version

`brand.json` → `_spec_version` (`1.1.0`+). Additive fields are backward compatible; breaking changes bump the version and are noted in release notes.

## License

MIT — see [LICENSE](LICENSE).
