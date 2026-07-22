# Plan implementation audit — Path-owned shell + markdown compile

**Date:** 2026-07-22  
**Plan:** Path-owned shell + markdown compile  
**Scope:** Review of the current repo against the approved plan intent (clone-per-brand, git-pull upgrades, edit markdown → compile → `brand.json`, light brand overrides).

This file documents **gaps and risks**, not a full changelog of what went well. Detail sections below are ordered by severity; use the **work queue** for execution order.

---

## Work queue

Work top to bottom. Check items off when done. Skip parked items unless needed.

### Done

- [x] **H1** — Derive guide/agent colors from `DESIGN.md` (Guide column + rebuild)
- [x] **H5** — Recompute `_hash` after design color sync
- [x] **M1** — Swatch usage from DESIGN (park remaining Name-column polish)
- [x] **H4** — Fix questionnaire so intake does not teach hand-editing `brand.json`
- [x] **H3a** — Brand-content hardcodes only: `logo.donts`, act labels, specimen strings (markdown wins)
- [x] **M6** — Stop truncating `anti_personality` to three items
- [x] **M2** — Compile-time required-label validation (fail loud on missing/bad markdown contract)
- [x] **H2** — Golden fixture for Sample Brand compile output
- [x] **M3** — Make `loadBrand()` resolve repo root without assuming `cwd` is `guide/`
- [x] **M4** — Clarify `agent.md` ownership (shell vs brand)
- [x] **H3b** — Agent roles/permissions scaffold documented as shell defaults
- [x] **M5** — Incident tone context shown in the guide (mirrors brand.md)
- [x] **M7** — Tighten overrides docs (edit `brand/overrides.css` only)

### Now / next

_(empty — continue with Later / lows)_

### Later (lows)

- [ ] **L5** — Align `optional/` scaffolds with edit→compile (pair with H4 if touching intake)
- [ ] **L2** — Prove assets pipeline (sample logo + `/brand/...` convention)
- [ ] **L1** — `CODEOWNERS` or path guard
- [ ] **L4** — Enforce supported `_spec_version` in loader
- [ ] **L3** — Harden `templates.md` / `examples.md` parsers

### Batches

| Batch | Items |
| --- | --- |
| Done | H1 → H5 → H4 → H3a → M6 → M2 → H2 → M3 → M4 → H3b → M5 → M7 |
| Next | L5 → L2 → L1 → L4 → L3 |

---

## Summary

The core architecture is in place: brand zone + `UPSTREAM.md`, `compile-brand` → `compile-design`, guide loads compiled JSON + `brand/setup.json`, shell-owned nav, `sample-brand.ts` removed, docs largely updated, build/`compile:check` succeed.

High and medium work-queue items from the original audit are **complete**. Remaining work is **Later (lows)** only.

| Severity | Count (remaining open) |
| --- | ---: |
| High | 0 |
| Medium | 0 (queue items) |
| Low | 5 |

---

## High

### H1 — Guide color layers are hardcoded in the compiler, not derived from `DESIGN.md`

**Status:** Fixed (2026-07-22)

**Resolution:** [`scripts/compile-design.mjs`](../scripts/compile-design.mjs) rebuilds `color.tokens` and `guide.visual.colors` from `DESIGN.md`. Optional **Guide** column; `_hash` recomputed after rebuild.

---

### H2 — No true golden-file / parity test

**Status:** Fixed (2026-07-22)

**Resolution:** [`scripts/fixtures/brand.sample.expected.json`](../scripts/fixtures/brand.sample.expected.json) + [`scripts/validate-brand.mjs`](../scripts/validate-brand.mjs) golden parity (volatile `_hash` / `_compiled` / `_last_material_change` stabilized). Regenerate with `npm run compile:golden` or `UPDATE_GOLDEN=1 npm run compile:check`.

---

### H3 — Agent / logo fields still bypass markdown as source of truth

**Status:** Fixed — **H3a** + **H3b** (2026-07-22)

**H3a:** Act labels, type specimens, and `logo.donts` compile from `brand.md` (guide + agent donts share one list).

**H3b:** `agent.roles` / `permissions` / `connector_scopes` documented as **shell defaults** in [`UPSTREAM.md`](../UPSTREAM.md) and [`agent.md`](../agent.md); brand tone via `brand.md` → **System prompt base.**

---

### H4 — Stale intake path still tells people to edit `brand.json`

**Status:** Fixed (2026-07-22)

**Resolution:** [`intake/brand-intake-questionnaire.md`](../intake/brand-intake-questionnaire.md) feeds into markdown + `brand/setup.json`; `brand.json` is `compiles_to` only.

---

### H5 — `_hash` is stale after design color sync

**Status:** Fixed (2026-07-22) with H1.

---

## Medium

### M1 — Guide color/usage copy is compiler-owned, not brand-owned

**Status:** Largely addressed with H1 — usage from DESIGN.md. Remaining polish: optional Name column (parked).

---

### M2 — Fragile markdown contract (`**Label.**` + middle-dot lists)

**Status:** Fixed (2026-07-22) — compile fails with an explicit checklist of missing required labels/fields.

---

### M3 — `loadBrand()` assumes `process.cwd()` is `guide/`

**Status:** Fixed (2026-07-22) — walks parents for `brand.md` + `brand.json` + `brand/setup.json`; optional `BRAND_ROOT`.

---

### M4 — Ownership of `agent.md` is ambiguous

**Status:** Fixed (2026-07-22) — `agent.md` listed as shell-owned in UPSTREAM + agent.md ownership table.

---

### M5 — Incident tone context dropped from the guide only

**Status:** Fixed (2026-07-22) — guide includes all Tone-by-context rows from `brand.md` (including Incident).

---

### M6 — `anti_personality` truncated to three items

**Status:** Fixed (2026-07-22) — full `we are not` list emitted; golden check expects ≥ 4 for Sample Brand.

---

### M7 — Generated override CSS lives under shell path

**Status:** Fixed (docs) (2026-07-22) — UPSTREAM + `brand/overrides.css` banner: edit brand file only; generated path is compiler output.

---

## Low

### L1 — No `CODEOWNERS` / automated path guard

Plan documented ownership in `UPSTREAM.md` only. Nothing prevents a brand from committing shell edits.

### L2 — Assets pipeline unproven

`brand/assets/` → `guide/public/brand/` copy works, but there is no sample asset and the guide UI does not yet reference `/brand/...` for a wordmark image (wordmark is still text-only). Fine for V1; document that brands must wire asset URLs themselves or add a convention (e.g. `brand/assets/logo.svg` auto-used).

### L3 — `templates.md` / `examples.md` parsers are minimal

YAML/list parsing is hand-rolled. Odd quoting or nested structures will fail quietly or partially.

### L4 — Spec version bump policy is documented but not enforced

`_spec_version` is `1.1.0`; loader only checks that a string exists, not that it is supported.

### L5 — Questionnaire / optional scaffolds not fully aligned

Questionnaire (H4) is fixed. `optional/` deep-dives were not systematically updated for the compile workflow.

---

## What looks correct (for calibration)

- Path ownership docs (`UPSTREAM.md`) and `brand/` zone
- Compile order: brand then design; `npm run compile` / `compile:check` / `compile:golden`
- Guide reads `brand.json` + `brand/setup.json`; Zod validation
- Shell-owned nav; setup status in `brand/setup.json`
- Colors derived from DESIGN.md; golden fixture parity
- Production `next build` succeeds with the new loader

---

## Recommended follow-up order

Superseded by the **Work queue** at the top of this file (Later / lows).

---

## How this file should be used

- High/medium queue items are complete for clone-per-brand upgrades.
- Treat **Later (lows)** as polish before scaling many brand clones that need logos, stricter CI ownership, or richer markdown parsers.
