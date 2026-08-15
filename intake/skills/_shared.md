---
file: intake-skills-shared
intake_skills_spec_version: 1.0.0
version: 1.2.0
status: draft
summary: >
  Shared populate contract for every intake path skill. Path SKILL.md files
  extract the source, then follow this file before setting status populated.
---

# Shared populate contract

Every path skill runs this **after** source-specific extraction. Do not skip inventory. Do not set `status: "populated"` until the checklist passes.

## 1. Intake flag

- Questionnaire path: leave `intake` as `"pending"` until the transcript is saved, then `"complete"`.
- All other paths: if `intake` is still `"pending"`, set it to `"skipped"` (source instead of questionnaire).

## 2. Inventory before write

Write `resources/transcripts/populate-<slug>-inventory.md` **before** rewriting `brand.md`. Include:

| Column | Meaning |
| --- | --- |
| Field | Constitution label or token (e.g. `Strategy › What.`, `--color-accent`) |
| Value | Extracted or proposed text |
| Status | `filled` \| `inferred` \| `placeholder` |
| Evidence | URL, quote, CSS variable, page, or “not in source” |

**Statuses**

- `filled` — quote, token, or asset on the source
- `inferred` — extrapolation with evidence (human review)
- `placeholder` — Sample Brand residue left on purpose, or an explicit stub

Do **not** invent message pillars or values from color or token names. If the source does not name an archetype, **ask once** or mark `inferred` — do not silently assign Sage.

Keep grayscale unless the source specifies a palette (`:root` tokens, brand-book swatches, Figma variables, DESIGN.md YAML).

## 3. Write targets (in order)

1. [`brand.md`](../../brand.md) — Strategy / Voice / Visual / Expressions / Agent **and** the fenced Design system
2. [`examples.md`](../../examples.md), [`rules.md`](../../rules.md), [`templates.md`](../../templates.md) as needed
3. [`brand/setup.json`](../../brand/setup.json) — hero/setup copy if needed; cite each source in `sources[]` with `"kind": "citation"` (no `prompt`). Leave starter intake cards for re-populate.
4. [`brand/coverage.json`](../../brand/coverage.json) — required when setting `status` to `"populated"`; section statuses `filled` | `inferred` | `placeholder`
5. [`guide/src/app/layout.tsx`](../../guide/src/app/layout.tsx) — when the source authors webfonts: add `next/font` loaders so every stack `var(--font-*)` is injected on `<html>` (see Type contract below)

Preserve the guide’s section structure. Replace Sample Brand copy where the source has signal.

### Citation vs intake in `sources[]`

| kind | Purpose | `prompt` |
| --- | --- | --- |
| `intake` (default when `prompt` present) | Starter UI copy-target cards | Required |
| `citation` | Provenance after populate | Omit |

## 4. Compile

From `guide/`:

```bash
npm run compile
```

Do **not** hand-edit `brand.json`, `tokens.json`, or `guide/src` UI files for content/theme — **except**:

1. `guide/src/app/layout.tsx` webfont loaders (required when stacks name `var(--font-*)`)
2. **Any** missing TypefaceSection / nav leaf / list row when the source has more items than the shell — follow the chapter skill. Do not cram extras into a chapter intro (**Type note.**, **Identity.**, **Colors intro.**, **Logo description.**)

See [`skills/typography/SKILL.md`](../../skills/typography/SKILL.md) and the matching chapter skill for leaf ids.

## 5. Gap pass

After the first compile, run chapter [`skills/<id>/populate.md`](../../skills/README.md) **only** for coverage slices marked `inferred` or `placeholder` that the path skill flagged as thin (typical: Expressions, Photography, Logo assets). Do not rebuild filled Strategy/Voice from scratch.

## 6. Post-populate checklist (required)

Run from `guide/` after compile. Prefer `npm run post-populate-check` (hard fails exit non-zero; missing coverage / logos warn only). Do not skip.

- [ ] **Setup validates** — `npm run compile` / `compile:check` passes; citations use `"kind": "citation"` (no fake `prompt`).
- [ ] **Required color roles** — Design system has ink, ink-muted, ink-subtle, canvas, paper, surface, surface-deep, border (+ accent if the source has a CTA color).
- [ ] **Type contract** — Inventory display / body / label faces. `--font-sans` required. Author `--font-serif` + **Type display.** when a display face exists; `--font-mono` + **Type mono.** when a label face exists. Edit `layout.tsx` so every `var(--font-*)` is loaded. One TypefaceSection per authored face (do not cram faces into **Type note.** or the primary leaf; do not treat `system-ui` as a second typeface).
- [ ] **Logo assets** — If the source had no mark: note `brand/assets/` gap. If present: file under `brand/assets/` and recompile.
- [ ] **Source coverage** — `brand/coverage.json` written; every `inferred` Strategy/Voice field listed for human review; `placeholder` sections stay Sample Brand (or explicit stubs), not invented.
- [ ] **Honesty** — No pillars/values invented from token names alone.
- [ ] **Status** — set only after this checklist:
  - Questionnaire: `"intake": "complete"`, `"status": "populated"`
  - Other paths: `"intake": "skipped"`, `"status": "populated"`
- [ ] **User summary** — Paste checklist results + inferred-field list (not only a narrative).

## 7. Conflict rule

Prefer Strategy / Guardrails / Voice over conflicting Visual intent unless the user says the design system wins — then update Visual to match (same rule as `brand.md` For agents).
