---
skill_id: pdf
intake_skills_spec_version: 1.0.0
version: 1.0.0
status: stable
source_kinds: [pdf, deck]
summary: >
  Populate the kit from an attached brand-guide PDF or deck. Extract
  strategy, voice, and visual rules; inventory before write.
---

# PDF / deck

## When to use

User attaches or paths a brand-guide **PDF** or slide **deck**.

Set `brand/setup.json` → `intake` to `"skipped"`. After [`_shared.md`](../_shared.md): `status` `"populated"`.

## Read this first

1. [`../README.md`](../README.md) routing table
2. This file
3. [`../_shared.md`](../_shared.md)

## Source-specific steps

1. Set `intake` to `"skipped"` if still `"pending"`.
2. Extract text and structure (sections: strategy, voice, values, logo, color, type, imagery). Preserve quotes; do not paraphrase into inventory until labeled.
3. If pages are image-only, OCR or describe frames enough to inventory — flag low-confidence extracts as `inferred`.
4. Export logo / mark files into [`brand/assets/`](../../../brand/assets/) when present (SVG preferred).
5. Inventory colors (named swatches / hex), typefaces, and do/don’t lists into `resources/transcripts/populate-<slug>-inventory.md` **before** rewriting `brand.md`.
6. Then follow [`../_shared.md`](../_shared.md): write → compile → gap pass → checklist → status.

## Write mapping

| From source | Into |
| --- | --- |
| Mission, pillars, audience, guardrails | `brand.md` → Strategy |
| Tone, phrases, do / don’t | `brand.md` → Voice |
| Color, type, imagery, logo rules | Visual + Design system fence |
| Mark / wordmark files | `brand/assets/` |
| Channel samples | `examples.md` / Expressions |

Cite the PDF in `sources[]` with `"kind": "citation"` (label `"Brand guide PDF"`, detail = filename + what was used). No `prompt`.

## Stop conditions

- Keep grayscale unless the PDF specifies a palette.
- Do not invent pillars from token or swatch names.
- Do not invent competitors, awards, or proof the PDF does not support.
- Do not hand-edit `brand.json` / `tokens.json`.

## Done

Coverage + shared checklist + inferred-field list. Note missing logo exports in coverage if the PDF showed a mark you could not file.
