# Populate from source

Use this when bootstrapping the visual guide from an existing brand artifact.

## Goal

Fill **every** section of this kit from a source the user provides, then demote the out-of-box setup callout.

Use this path when the user already has brand materials. If they do **not**, prefer the Branding Exercise first: [`brand-intake-questionnaire.md`](brand-intake-questionnaire.md) (agent one-by-one by default).

## Accepted sources (one or more)

- **Website URL** — scrape or fetch marketing / product / about pages
- **Brand guide PDF** — extract strategy, voice, and visual rules
- **`brand.md`** — portable brand constitution + Design system (any compatible layout)
- **Figma design URL** — brand book and/or variables library via the **official Figma MCP** (see below)

## Steps

1. If `brand/setup.json` → `intake` is still `"pending"`, set it to `"skipped"` (you are using a source instead of the questionnaire).
2. Read the source(s) the user attached or linked. For Figma, follow **Figma MCP protocol** below.
3. Update, in order:
   - [`brand.md`](../brand.md) — Strategy / Voice / Visual / Expressions / Agent labels **and** the fenced Design system (tokens)
   - [`examples.md`](../examples.md), [`rules.md`](../rules.md), [`templates.md`](../templates.md) as needed
   - [`brand/setup.json`](../brand/setup.json) — hero/setup copy if needed; cite each source in `sources[]`
4. From `guide/`, run `npm run compile` so `brand.json`, CSS, and `tokens.json` regenerate.
5. Preserve the guide’s section structure (Strategy / Language / Logo / Typography / Color / Photography / System / Applications — authored in brand.md as Strategy / Voice / Visual / Expressions / Design system). Replace Sample Brand copy with the real brand; keep grayscale unless the source specifies a palette.
6. Set in `brand/setup.json`:

```json
{
  "intake": "skipped",
  "status": "populated"
}
```

7. Do **not** hand-edit `brand.json`, `tokens.json`, or `guide/src` UI files for content/theme.
8. Summarize for the user what changed and what still needs human review.

## Figma MCP protocol

Import only: pull brand strategy, voice, values, and visual tokens **from** Figma into brand-owned markdown. Do **not** push `tokens.json` into Figma in this path (compiled DTCG remains the outbound interchange for plugins).

### Prerequisites

- User provides a `https://www.figma.com/design/:fileKey/...` URL (design files only — not `/make/`). Prefer a link with `node-id=...`.
- Official Figma MCP is available and authenticated (`mcp_auth` if tools fail with auth errors). Prefer the remote/official Figma MCP over Desktop-only tools when both exist.
- If the URL has no `node-id`, ask for a node-specific link before calling tools that require a concrete node (especially `get_variable_defs`).

### URL parsing

- `fileKey` — from `/design/:fileKey/`. On branch URLs (`/design/:fileKey/branch/:branchKey/...`), use `branchKey` as `fileKey`.
- `nodeId` — from `node-id=1-2` → `1:2` (replace `-` with `:`).

### Read sequence

1. Parse `fileKey` / `nodeId` from the URL.
2. **`get_metadata`** — map pages and frames (brand-book structure: Strategy, Voice, Values, Logo, Color, Type, etc.).
3. **`get_variable_defs`** — colors, type, spacing, radii when variables exist on the target node.
4. **`search_design_system`** / **`get_libraries`** — named styles and library tokens when variables are thin or missing.
5. For brand-book frames with copy (mission, pillars, voice, imagery rules): **`get_design_context`** and **`get_screenshot`** as needed to extract text and visual intent. Load the Figma design-to-code skill before `get_design_context` when that skill is available.
6. **`download_assets`** — logos / key marks into [`brand/assets/`](../brand/assets/) when present.

### Write mapping

| From Figma | Into |
| --- | --- |
| Mission, pillars, values, audience, guardrails | `brand.md` → Strategy (Overview, Message Pillars / Values, etc.) |
| Tone, phrases, do / don’t | `brand.md` → Voice |
| Color roles, type faces, imagery mood, logo rules | `brand.md` → Visual |
| Variables / styles (hex, font, space) | `brand.md` → Design system fence (tables + `:root`) |
| Logo / mark exports | `brand/assets/` + Visual → Logo notes |
| Channel examples if present | `examples.md` / Expressions as needed |

Then continue with the shared Steps (compile, setup status, summary). Cite the Figma URL in `brand/setup.json` → `sources[]` (e.g. label `"Figma"`, detail = file URL + what was used).

### Honesty rules

- If the file is **tokens-only**, fill Visual + Design system fully; leave Strategy / Voice as Sample Brand placeholders only where the source has no signal, and say so in the summary.
- Do **not** invent message pillars or values from color or token names.
- Prefer Strategy / Guardrails / Voice over conflicting Visual intent unless the user says the design system wins — then update Visual to match (same conflict rule as `brand.md` For agents).

## Prompt you can paste

```
Using this brand-guide repo and my source (URL / PDF / brand.md / Figma design URL), populate the guide: set brand/setup.json intake to "skipped", update brand.md (including Design system), examples.md, rules.md, and brand/setup.json so every section reflects my brand. For a Figma URL, use the official Figma MCP per intake/populate-from-source.md (metadata → variables/styles → frame copy → assets); write into brand.md — never hand-edit brand.json or tokens.json. Keep the grayscale structure unless my source specifies a palette. Run npm run compile from guide/. When done, set brand/setup.json status to "populated".
```
