# Populate from source

Use this when bootstrapping the visual guide from an existing brand artifact.

## Goal

Fill **every** section of this kit from a source the user provides, then demote the out-of-box setup callout.

Use this path when the user already has brand materials. If they do **not**, prefer the Branding Exercise first: [`skills/questionnaire/SKILL.md`](skills/questionnaire/SKILL.md) (question bank: [`brand-intake-questionnaire.md`](brand-intake-questionnaire.md); agent one-by-one by default).

**Agents:** load the routing table, then the matching path skill. Do not improvise a path that is not in the table.

Canonical catalog (how to extend, versioning): [`skills/README.md`](skills/README.md).  
Shared contract (inventory → write → compile → checklist): [`skills/_shared.md`](skills/_shared.md).

## Routing table

1. If `brand/setup.json` → `intake` is still `"pending"`, set it to `"skipped"` (you are using a source instead of the questionnaire).
2. Read the source(s) the user attached or linked. For Figma, follow **Figma MCP protocol** below. For a design dump, run `npm run import:design -- --print <path>` from `guide/` (or `--splice --yes` after review — writes `brand.md.bak`).
3. Update, in order:
   - [`brand.md`](../brand.md) — Strategy / Voice / Visual / Expressions / Agent labels **and** the fenced Design system (tokens)
   - [`examples.md`](../examples.md), [`rules.md`](../rules.md), [`templates.md`](../templates.md) as needed
   - [`brand/setup.json`](../brand/setup.json) — hero/setup copy if needed; cite each source in `sources[]` with `"kind": "citation"` (no `prompt`). Leave starter intake cards alone, or keep them for re-populate.
   - [`brand/coverage.json`](../brand/coverage.json) — required for populated brands; section statuses `filled` | `inferred` | `placeholder` (see **Honesty rules**)
   - Copy [`populate-worklog.md`](populate-worklog.md) → `resources/transcripts/` and fill sources, coverage honesty, rejected inventions, and verification (Tier 3)
4. From `guide/`, run `npm run compile` so `brand.json`, CSS, and `tokens.json` regenerate (also validates `setup.json`).
5. Preserve the guide’s section structure (Strategy / Language / Logo / Typography / Color / Photography / System / Applications — authored in brand.md as Strategy / Voice / Visual / Expressions / Design system). Replace Sample Brand copy with the real brand where the source has signal; keep grayscale unless the source specifies a palette.
6. Run **Post-populate checklist** below (required). Prefer `npm run post-populate-check` from `guide/`.
7. Set in `brand/setup.json`:

```json
{
  "intake": "skipped",
  "status": "populated"
}
```

8. Do **not** hand-edit `brand.json`, `tokens.json`, or `guide/src` UI files for content/theme — **except**: (1) `guide/src/app/layout.tsx` webfont loaders for every stack `var(--font-*)`; (2) **any** missing TypefaceSection / nav leaf / list row when the source has more items than the shell. Follow the chapter skill. Do not cram extras into a chapter intro.
9. Summarize for the user: checklist results, inferred fields from coverage, worklog path, and what still needs human review.

## Post-populate checklist (required)

Run from `guide/` after compile. Do not skip.

- [ ] **Setup validates** — `npm run compile` / `compile:check` passes; citations use `"kind": "citation"` (no fake `prompt`).
- [ ] **Required color roles** — Design system has ink, ink-muted, ink-subtle, canvas, paper, surface, surface-deep, border (+ accent if the source has a CTA color).
- [ ] **Type contract** — Inventory display / body / label faces. `--font-sans` required. Author `--font-serif` + **Type display.** when a display face exists; `--font-mono` + **Type mono.** when a label face exists. Edit `layout.tsx` so every `var(--font-*)` is loaded. One TypefaceSection per authored face (do not cram faces into **Type note.** or the primary leaf; do not treat `system-ui` as a second typeface).
- [ ] **Logo assets** — If the source had no mark: note `brand/assets/` gap. If present: file under `brand/assets/` and recompile.
- [ ] **Source coverage** — `brand/coverage.json` written for populated brands; every `inferred` Strategy/Voice field listed for human review; `placeholder` sections stay Sample Brand (or explicit stubs), not invented.
- [ ] **Honesty** — No pillars/values invented from token names alone.
- [ ] **Status** — `intake: "skipped"`, `status: "populated"` only after this checklist.
- [ ] **User summary** — Paste checklist results + inferred-field list (not only a narrative).
- [ ] **Populate worklog** — Filled copy under `resources/transcripts/` from [`populate-worklog.md`](populate-worklog.md) (Tier 3).

Machine assist: `npm run post-populate-check` (hard fails exit non-zero; missing coverage / logos warn only).

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

Then continue with the shared Steps (compile, checklist, setup status, summary). Cite the Figma URL in `brand/setup.json` → `sources[]` as `"kind": "citation"` (label `"Figma"`, detail = file URL + what was used).

## Design dump import

From `guide/`:

```bash
npm run import:design -- --print ../path/to/DESIGN.md
npm run import:design -- --splice --yes ../path/to/DESIGN.md   # writes brand.md.bak
```

Maps YAML `colors` / `typography` / `rounded` / `spacing` into the Design system fence and required semantic roles. Does **not** invent Strategy/Voice. Finish prose + `brand/coverage.json` per honesty rules. Mapping details: [`UPSTREAM.md`](../UPSTREAM.md).

### Honesty rules

- If the file is **tokens-only**, fill Visual + Design system fully; leave Strategy / Voice as Sample Brand placeholders only where the source has no signal; mark those sections `placeholder` in `brand/coverage.json`.
- Statuses: `filled` (direct extract), `inferred` (extrapolation with evidence — human review), `placeholder` (Sample Brand residue left on purpose).
- Do **not** invent message pillars or values from color or token names.
- Prefer Strategy / Guardrails / Voice over conflicting Visual intent unless the user says the design system wins — then update Visual to match (same conflict rule as `brand.md` For agents).
- Starter / Sample Brand kits do **not** ship `coverage.json`; write it when setting `status` to `"populated"`.

Ambiguous source → ask once. Multiple sources → run the primary path skill, then merge extra citations (`kind: "citation"`). New source kinds → add a skill per [`skills/README.md`](skills/README.md) **Adding a path**.

Path-specific protocols (scrape, PDF extract, `import:design`, Figma MCP) live in those `SKILL.md` files — not here.

## Prompt you can paste

```
Using this brand-guide repo and my source (URL / PDF / brand.md / DESIGN.md / Figma design URL), populate the guide: load intake/skills/README.md, pick the matching path skill, and follow intake/skills/_shared.md. Set brand/setup.json intake to "skipped" (or "complete" for the questionnaire). Update brand.md (including Design system), examples.md, rules.md, brand/coverage.json, and brand/setup.json. Cite sources with kind "citation". Never hand-edit brand.json or tokens.json. Keep grayscale unless the source specifies a palette. Run npm run compile and npm run post-populate-check from guide/. When done, set brand/setup.json status to "populated".
```
