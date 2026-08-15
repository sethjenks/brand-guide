# Strategy — populate

## Preconditions

- Intake is `complete` or `skipped` (unless the user explicitly asked to build Strategy).
- Read [`SKILL.md`](SKILL.md) field map.
- Source: transcript, site, PDF, or stated positioning — do not invent competitors or proof.

## Steps

1. Fill **Overview** (required **What.** as the chapter intro: 12–28 words, one sentence preferred, statement-only; plus Problem / Current / Opportunity / Solution, Origin, Vision intro, Long-term ambition).
2. Fill **Positioning** (category, not, audience primary/secondary, differentiation, only-we, territory). Claims must be falsifiable from the source. Guide renders `positioning.fields` on `strategy-positioning`.
3. Fill **Audience** intro + Segments / Wants / Needs table (one row per real audience).
4. Fill **Personality**: attributes, we are / are not, trait scores; then a complete `#### Primary archetype` block. Uncomment Secondary/Tertiary only if the source names them — do not invent a three-ring wheel.
5. Fill **Promise** (mission, purpose, position, promise bullets, base message, synthesizing phrase, boilerplates).
6. Fill **Message Pillars** (at least one row: Pillar, Summary, **Emotional driver**, **Functional value**, **Trust message** — guide shows all three).
7. Fill **Guardrails** (tone summary, cannot-be, litmus test). Confirm with the user if this is a new brand’s first guardrails (`requires_approval`).
8. Align [`rules.md`](../../rules.md) → `## Strategy` with litmus / no-invented-claims constraints.
9. Add at least one on/off pair in `examples.md` → `## Strategy examples` (positioning or promise lines).
10. `cd guide && npm run compile`. Spot-check Strategy (positioning fields + pillar drivers). If the source has more slices than the shell, add a leaf in `guide/src`.

## Checklist

- [ ] All compile-required labels present
- [ ] **What.** is 12–28 words, statement-only
- [ ] Primary archetype block complete; Wheel is a known id
- [ ] Pillars table has ≥ 1 row with emotional / functional / trust when the source has them
- [ ] Positioning fields present on `strategy-positioning`
- [ ] Guardrails include litmus test
- [ ] No invented competitors
- [ ] Compile run

## Stop conditions

- Do not fabricate market share, awards, or rival names.
- Do not promote `optional/positioning.md` in this op.
- Do not hand-edit compiled outputs.
