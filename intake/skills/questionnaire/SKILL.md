---
skill_id: questionnaire
intake_skills_spec_version: 1.0.0
version: 1.0.0
status: stable
source_kinds: [interview, transcript]
summary: >
  Whole-brand first fill from the Branding Exercise. Question bank lives in
  intake/brand-intake-questionnaire.md — do not duplicate it here.
---

# Questionnaire

## When to use

No existing brand materials, or `brand/setup.json` is `starter` with `intake: "pending"`. Default when the user has not provided a URL, PDF, `brand.md`, DESIGN.md, or Figma file.

`intake`: `"complete"` after the transcript is saved, then `status`: `"populated"` after [`_shared.md`](../_shared.md).

## Read this first

1. [`../README.md`](../README.md) routing table
2. This file
3. Question bank: [`../../brand-intake-questionnaire.md`](../../brand-intake-questionnaire.md) — **do not copy the questions into this skill**
4. [`../_shared.md`](../_shared.md)

## Source-specific steps

1. Tell the user you are starting the Branding Exercise (about 20 questions across six sections).
2. Ask whether they want **one question at a time** (default), the **full written questionnaire**, or **skip** because they already have a source — if skip, set `intake` to `"skipped"` and return to the routing table.
3. **One-by-one:** Ask exactly one question from the question bank. Wait. Capture. Optional short clarifier if vague. Do not dump the full list unless asked.
4. After the last answer (or when they stop with enough signal), save `resources/transcripts/questionnaire-{brand-name}-{YYYY-MM-DD}.txt`.
5. Set `brand/setup.json` → `intake` to `"complete"`.
6. Build `resources/transcripts/populate-<slug>-inventory.md` from the transcript (`filled` from answers; `inferred` only with evidence; do not invent pillars).
7. Rewrite `brand.md` (including Design system), `examples.md`, `rules.md`, and setup copy from the transcript.
8. Then follow [`../_shared.md`](../_shared.md): compile → gap pass → checklist → `status: "populated"`.

## Write mapping

| From source | Into |
| --- | --- |
| Transcript answers | `brand.md` Strategy / Voice / Visual / Expressions / Design system |
| Guardrails / litmus | `brand.md` Guardrails + `rules.md` |
| Sample lines | `examples.md` |

Cite the transcript in `sources[]` as `"kind": "citation"` (label `"Branding Exercise"`, detail = transcript path). Leave starter intake cards.

## Stop conditions

- Do not invent competitors, awards, or proof the transcript does not support.
- Changing Guardrails is `requires_approval` per [`agent.md`](../../../agent.md).
- Do not hand-edit `brand.json` / `tokens.json`.
- If they provide a URL/PDF/`brand.md`/DESIGN.md/Figma mid-interview, stop and route to that path skill.

## Done

Coverage + shared checklist + inferred-field list for the user.
