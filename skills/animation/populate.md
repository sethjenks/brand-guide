# Animation — populate

## Preconditions

- Intake is `complete` or `skipped` (or the user explicitly asked to build this chapter after skipping intake).
- `brand/setup.json` → `chapters.animation` is not `"off"` (or the user asked to turn it on).
- Read [`SKILL.md`](SKILL.md) field map.
- Have a source: transcript, site, PDF, existing `brand.md`, or stated motion direction.

## Steps

1. Read Visual → Animation / Motion. If Sample Brand starter copy is still present and the brand is not Sample Brand, replace it.
2. Write labeled fields: **Animation introduction.** as the chapter intro (12–28 words, one sentence preferred, statement-only), then principles intro, personality intro + default, archetypes intro, interactions intro, donts context, donts (·-separated).
3. Fill `#### Principles` (at least the four jobs: orient, match the action, entrance over exit, reduced motion — rewrite in brand voice; keep the teaching).
4. Fill `#### Personality` with `Id | Title | Body`. Keep known ids if the brand’s curves map; set **Animation personality default.** to the primary Id or title.
5. Fill `#### Archetypes` and `#### Interactions` with known ids when the brand uses those patterns. Drop rows the brand does not use rather than inventing ids.
6. Align **Animation donts.** with [`rules.md`](../../rules.md) → `## Animation`. Add or tighten bullets there for hard constraints (PRM, no blocking exits).
7. Ensure `examples.md` → `## Animation examples` has at least one `on-brand` and one `off-brand`.
8. `cd guide && npm run compile`.
9. Spot-check Animation. Replay demos; unknown ids should show copy without choreography.

## Checklist

- [ ] Introduction + intros filled
- [ ] **Animation introduction.** is 12–28 words, statement-only
- [ ] Principles table has Do / Don't
- [ ] Personality default matches a row
- [ ] Archetype / interaction Ids are known keys or intentionally copy-only
- [ ] Donts ·-separated and mirrored in rules
- [ ] Animation few-shots on + off
- [ ] Compile run; no hand-edits to `brand.json`

## Stop conditions

- Do not invent easing tokens in Design system.
- Do not edit `guide/src/lib/animation-presets.ts` or MotionSpecimen CSS for a brand populate.
- Do not add `optional/animation.md`.
- Do not hand-edit compiled outputs.
