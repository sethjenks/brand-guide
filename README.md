# Brand Guide

A cloneable, grayscale starter kit for a **human-friendly brand guide** and an **agent-readable brand constitution**.

Brands customize **theme + content**; the Next.js shell is upstream-owned. See [`UPSTREAM.md`](UPSTREAM.md) for ownership and how to pull updates.

## Out of the box

The cover asks you to complete intake before the Sample Brand preview demotes:

1. **Branding Exercise** (recommended when you have no existing guide) — [`intake/skills/questionnaire/SKILL.md`](intake/skills/questionnaire/SKILL.md) (questions: [`intake/brand-intake-questionnaire.md`](intake/brand-intake-questionnaire.md)). An agent can ask **one by one**, or you can fill the written questionnaire.
2. **Or populate from a source** — Website **URL**, brand guide **PDF**, **`brand.md`**, **DESIGN.md**, or a **Figma** design URL. Load [`intake/skills/README.md`](intake/skills/README.md), then the matching path skill (slim entry: [`intake/populate-from-source.md`](intake/populate-from-source.md)). Set `intake` to `"skipped"`.

When finished, set `status` to `"populated"` in [`brand/setup.json`](brand/setup.json) — the setup callout then drops to a small tertiary note. Until then, Sample Brand content remains as a structural preview. See the filled default at [`examples/brand.default.md`](examples/brand.default.md).

## Edit → compile → run

| Edit (brand-owned) | Generated (do not hand-edit) |
| --- | --- |
| `brand.md` (Strategy / Voice / Visual + Design system), `examples.md`, `rules.md`, `templates.md` | `brand.json`, `guide/public/brand.txt`, `guide/src/styles/tokens.generated.css`, `tokens.json`, `guide/public/tokens.json` |
| `brand/setup.json`, `brand/overrides.css`, `brand/assets/` | `guide/src/styles/brand.overrides.css`, `guide/public/brand/` |

Theme authoring stays in **`brand.md` → Design system** (fenced block). Compile also emits a DTCG [`tokens.json`](tokens.json) for design-tool / external interchange (same values as the CSS). Prefer `brand.json` for voice, rules, and the visual guide payload.

```bash
cd guide
npm install
npm run compile   # also runs on npm run dev / build
npm run dev
```

**Reset** theme tokens to the out-of-box grayscale (Strategy / Voice / Visual unchanged):

```bash
cd guide && npm run tokens:reset
```

That splices [`examples/design-system.default.md`](examples/design-system.default.md) into the Design system fence in `brand.md` and recompiles. For the **full** Sample Brand constitution (not just tokens), copy [`examples/brand.default.md`](examples/brand.default.md) → `brand.md` and recompile. Other swap-ins live under `examples/`.

App chrome sizes (sidebar width, top bar height) stay in `globals.css` and are not themed from the Design system section.

## Dual audience

| Audience | Start here |
| --- | --- |
| **Humans** | Browse the visual guide (`guide/`) or read [`brand.md`](brand.md) |
| **Agents** | Give the deployed guide’s `/brand` URL for one-link loading (`/brand.txt` is the direct file); in-repo agents can discover root [`brand.md`](brand.md); prefer compiled [`brand.json`](brand.json) for structured reads |

## Agent load order

0. If `brand/setup.json` is `starter` with `intake: "pending"`, load [`intake/skills/README.md`](intake/skills/README.md) and run the questionnaire skill (one question at a time by default). See [`agent.md`](agent.md).
1. Read `brand.md` frontmatter (`name`, `tagline`, `version`, `language`) and the **For agents** section map.
2. Prefer `brand.json` for tokens, rules, examples, templates, and `guide` (visual guide payload).
3. For portable design tokens (Figma, Style Dictionary, external tools), use generated [`tokens.json`](tokens.json) (DTCG). Do not hand-edit it.
4. Slice by task (also in `brand.md`):
   - **Copy / social** → Voice + [`examples.md`](examples.md)
   - **UI / CSS** → Visual + Design system
   - **Pitch / strategy** → Strategy + Voice
5. Use Voice **Phrases** and **We Say / We Never Say** as lightweight few-shots; use `examples.md` for labeled on/off-brand review.
6. Respect [`rules.md`](rules.md) and [`agent.md`](agent.md) for permissions and conflict precedence.
7. After editing sources, run `npm run compile` from `guide/` — never patch `brand.json` or `tokens.json` by hand.

## Quick start (visual guide)

```bash
cd guide
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port Next prints).

## Repo map

```text
brand.md          Strategy / Voice / Visual + Design system (edit)
brand.json        Compiled agent API + guide payload (generated)
tokens.json       DTCG design tokens export (generated; also guide/public/)
brand/            setup.json, overrides.css, assets/ (brand-owned)
examples.md       Few-shot on/off-brand pairs
examples/         brand.default.md (full Sample Brand) + Design system patches
rules.md          Blocklists, contrast, conflict resolution
agent.md          Roles, prompts, permissions, load recipe
templates.md      Slot-based output templates
scripts/          compile-brand, compile-design, reset-design-system, compile-all
intake/           Questionnaire + populate-from-source routing table; path skills in intake/skills/
skills/           Shell-owned chapter skills (populate / audit / improve)
optional/         Deeper scaffolds when you outgrow the single page
guide/            Next.js visual brand guide (shell — upstream-owned)
UPSTREAM.md       Ownership map + upgrade recipe
```

## Customize

1. Prefer [`intake/skills/questionnaire/SKILL.md`](intake/skills/questionnaire/SKILL.md) when starting from scratch (agent one-by-one or written). Save under `resources/transcripts/`, set `intake` to `"complete"`, then update brand markdown + `brand/setup.json` and `npm run compile` (never hand-edit `brand.json`).
2. Or skip the questionnaire via [`intake/skills/README.md`](intake/skills/README.md) when you have a URL, PDF, `brand.md`, DESIGN.md, or Figma design URL (set `intake` to `"skipped"`).
3. Theme the guide by editing `brand.md` → Design system (including new `--color-*` rows and optional Guide column) and running `npm run compile` in `guide/`.
4. Keep strategy/voice copy in the upper sections of `brand.md`; compile updates `brand.json`.
5. Light tweaks: `brand/overrides.css`, logos in `brand/assets/`.
6. Set `brand/setup.json` `status` to `"populated"` when the starter callout should demote.
7. Hide Extended guide chapters (Logo, Photography, Animation, Applications) with `brand/setup.json` → `chapters` (`"on"` / `"off"`). Core chapters cannot be turned off — see [`UPSTREAM.md`](UPSTREAM.md).

## Upgrades

See [`UPSTREAM.md`](UPSTREAM.md). Short version: `git fetch upstream && git merge upstream/main`, then `cd guide && npm install && npm run build`, deploy to the brand subdomain.

## CI

Pull requests and pushes to `main` run [`.github/workflows/compile-check.yml`](.github/workflows/compile-check.yml):

1. **check** — `npm run compile:check` from `guide/` (compile + validate-brand + skills integrity)
2. **smoke** — `npm run smoke` (production build + HTTP assert that core chapter intro ids render on `/`)

Locally: `cd guide && npm run smoke`.

## Spec version

`brand.json` → `_spec_version` (`1.2.0`+). Additive fields are backward compatible; breaking changes bump the version and are noted in release notes.

## License

MIT — see [LICENSE](LICENSE).
