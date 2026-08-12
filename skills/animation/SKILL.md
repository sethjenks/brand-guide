---
file: animation
skill_id: animation
skills_spec_version: 1.0.0
version: 1.0.1
depth: deep
status: stable
priority: 2
retrieval_tags: [animation, motion, skill]
summary: >
  Chapter skill router for Animation (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - brand.md#Visual/Animation
  - rules.md#Animation
  - examples.md#Animation examples
---

# Animation

Guide chapter **Animation** is authored as `brand.md` → Visual → **Animation / Motion**. Shell-owned demos in [`guide/src/lib/animation-presets.ts`](../../guide/src/lib/animation-presets.ts) play when item **Id** cells match known keys.

## Op picker

| Op | Use when |
| --- | --- |
| [`populate`](populate.md) | Animation labels empty/placeholder, or user asks to build Animation |
| [`audit`](audit.md) | Content exists; pre-ship review; unknown demo ids |
| [`improve`](improve.md) | Tighten one principle, personality, archetype, interaction, or don’t |

If unclear, ask. Default: **audit** when Animation labels exist, **populate** when they are empty. Whole-brand [`intake/`](../../intake/) still wins when `brand/setup.json` is `starter` and `intake` is `pending` — do not chapter-populate first. If `chapters.animation` is `"off"`, do not populate unless the user asks to turn it on.

## Read order

1. This file (field map)
2. `brand.md` → Visual → `### Animation / Motion`
3. [`rules.md`](../../rules.md) → `## Animation`
4. [`examples.md`](../../examples.md) → `## Animation examples`
5. Strategy Personality + Voice (motion must match)
6. [`guide/src/lib/animation-presets.ts`](../../guide/src/lib/animation-presets.ts) — known demo ids
7. Compiled `brand.json` → `guide.animation` (read-only after compile)

## Write targets

Keep `**Label.**` names — `compile-brand.mjs` keys off them. Tables live under `####` headings so personality / archetypes / interactions stay distinct.

| Source | Compiles to |
| --- | --- |
| `**Animation introduction.**` | `guide.animation.introduction` (chapter intro: 12–28 words, one sentence preferred, statement-only) |
| `**Animation principles intro.**` | `guide.animation.principles.intro` |
| `#### Principles` table `Principle \| Description \| Do \| Don't` | `guide.animation.principles.items` |
| `**Animation personality intro.**` | `guide.animation.personality.intro` |
| `**Animation personality default.**` | `guide.animation.personality.default` |
| `#### Personality` table `Id \| Title \| Body` | `guide.animation.personality.items` |
| `**Animation archetypes intro.**` | `guide.animation.archetypes.intro` |
| `#### Archetypes` table `Id \| Title \| Body` | `guide.animation.archetypes.items` |
| `**Animation interactions intro.**` | `guide.animation.interactions.intro` |
| `#### Interactions` table `Id \| Title \| Body` | `guide.animation.interactions.items` |
| `**Animation donts context.**` | `guide.animation.donts.context` |
| `**Animation donts.**` | `guide.animation.donts.items` (·-separated) |

Also: `rules.md` → `## Animation`; `examples.md` → `## Animation examples` YAML (`id` / `label` / `input` / `reason`).

**Demo ids** (shell choreography; unknown ids render copy only):

| Table | Ids |
| --- | --- |
| Personality | `drift`, `punch`, `elastic`, `editorial` |
| Archetypes | `enter`, `move`, `glide`, `push`, `pan` |
| Interactions | `exchange`, `carousel`, `toggle`, `reveal`, `accordion`, `tabs`, `modal`, `toast` |

Do not edit `animation-presets.ts` or MotionSpecimen CSS in a brand clone. Brands author titles and bodies; the shell owns the motion.

## Conflict rules

1. [`rules.md`](../../rules.md) (Animation + global precedence)
2. Strategy / Voice (motion personality must not contradict Voice)
3. Visual Animation labels
4. Compiled `brand.json`

Honor reduced motion in copy and don’ts. Never hand-edit `brand.json`, `tokens.json`, or generated CSS.

## Done gate

After populate/improve: `cd guide && npm run compile`, then spot-check the Animation chapter (including Replay on demos). Audit may stop at a report.

## Changelog

- 2026-08-11 — 1.0.1 — Chapter intro bound on **Animation introduction.** (12–28 words, statement-only).
- 2026-08-11 — 1.0.0 — Promote into brand.md + compile; populate/audit/improve; live demos keyed by Id.
