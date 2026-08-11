---
skill_id: figma
intake_skills_spec_version: 1.0.0
version: 1.0.0
status: stable
source_kinds: [figma.com/design]
summary: >
  Populate the kit from a Figma design URL via official Figma MCP.
  Import only — do not push tokens.json into Figma.
---

# Figma

## When to use

User provides a `https://www.figma.com/design/:fileKey/...` URL (design files only — not `/make/`). Prefer a link with `node-id=...`.

Set `brand/setup.json` → `intake` to `"skipped"`. After [`_shared.md`](../_shared.md): `status` `"populated"`.

Import only: pull strategy, voice, values, and visual tokens **from** Figma into brand-owned markdown. Do **not** push `tokens.json` into Figma (compiled DTCG remains the outbound interchange for plugins).

## Read this first

1. [`../README.md`](../README.md) routing table
2. This file
3. [`../_shared.md`](../_shared.md)

## Prerequisites

- Official Figma MCP available and authenticated (`mcp_auth` if tools fail with auth errors). Prefer remote/official Figma MCP over Desktop-only tools when both exist.
- If the URL has no `node-id`, ask for a node-specific link before tools that need a concrete node (especially `get_variable_defs`).

## URL parsing

- `fileKey` — from `/design/:fileKey/`. On branch URLs (`/design/:fileKey/branch/:branchKey/...`), use `branchKey` as `fileKey`.
- `nodeId` — from `node-id=1-2` → `1:2` (replace `-` with `:`).

## Source-specific steps

1. Set `intake` to `"skipped"` if still `"pending"`.
2. Parse `fileKey` / `nodeId`.
3. **`get_metadata`** — map pages and frames (brand-book: Strategy, Voice, Values, Logo, Color, Type, etc.).
4. **`get_variable_defs`** — colors, type, spacing, radii when variables exist on the target node.
5. **`search_design_system`** / **`get_libraries`** — named styles and library tokens when variables are thin or missing.
6. For brand-book frames with copy (mission, pillars, voice, imagery rules): **`get_design_context`** and **`get_screenshot`** as needed. Load the Figma design-to-code skill before `get_design_context` when that skill is available.
7. **`download_assets`** — logos / key marks into [`brand/assets/`](../../../brand/assets/) when present.
8. Write `resources/transcripts/populate-<slug>-inventory.md` from variables + frame copy **before** rewriting `brand.md`.
9. Then follow [`../_shared.md`](../_shared.md).

## Write mapping

| From Figma | Into |
| --- | --- |
| Mission, pillars, values, audience, guardrails | `brand.md` → Strategy |
| Tone, phrases, do / don’t | `brand.md` → Voice |
| Color roles, type faces, imagery mood, logo rules | `brand.md` → Visual |
| Variables / styles (hex, font, space) | Design system fence (tables + `:root`) |
| Logo / mark exports | `brand/assets/` + Visual → Logo |
| Channel examples if present | `examples.md` / Expressions |

Cite the Figma URL in `sources[]` as `"kind": "citation"` (label `"Figma"`, detail = file URL + what was used).

## Stop conditions

- Keep grayscale unless variables/styles specify a palette.
- Do not invent pillars from token names.
- Do not push compiled tokens back into Figma on this path.
- Do not hand-edit `brand.json` / `tokens.json`.

## Done

Coverage + shared checklist + inferred-field list. Note missing `node-id` or unauthenticated MCP in the user summary if you had to skip variables.
