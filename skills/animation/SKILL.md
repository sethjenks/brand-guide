---
file: animation
skill_id: animation
skills_spec_version: 1.0.0
version: 0.1.0
depth: scaffold
status: draft
priority: 2
retrieval_tags: [animation, skill]
summary: >
  Chapter skill router for Animation (ops: populate, audit, improve).
ops: [populate, audit, improve]
writes:
  - guide/src/lib/animation-content.ts
---

# Animation

**Gap:** Animation is not in `brand.md` yet. Populate/improve edit [`guide/src/lib/animation-content.ts`](../../guide/src/lib/animation-content.ts) until a future `promote` op moves it into the constitution + compile.

## Op picker

| Op | Use when |
| --- | --- |
| `populate` | Replace starter motion copy with brand-authored guidance |
| `audit` | Check principles, personality, don’ts vs brand Voice |
| `improve` | Tighten one principle or interaction |

Defer to intake when starter + pending. Default: `audit` (starter content already exists in TS).

## Read order

1. `guide/src/lib/animation-content.ts`
2. `brand.md` → Strategy Personality + Voice (motion should match)
3. Animation leaves in `nav.ts`; `animation-donts` is an asset placeholder in `section-status.ts`

## Write targets

Exports in `animation-content.ts` (`ANIMATION_INTRODUCTION`, principles, personality, archetypes, interactions, don’ts). Keep TypeScript types (`PrincipleItem`, etc.). This is a shell content file — still do not theme via flourish CSS.

## Conflict rules

Do not invent `brand.md` Animation headings in this upgrade (no compile path). Do not hand-edit `brand.json` for motion.

## Populate

Rewrite the TS content from brand motion rules (or cited source). Keep reduced-motion coverage. No `npm run compile` required for TS-only edits; restart/refresh the guide.

## Audit

Compare motion personality to Voice. Note hardcoded starter + `animation-donts` placeholder. Report-only unless asked to fix.

## Improve

One principle, easing, or don’t. Preserve the rest.

## Later ops

`promote` — move this content into `brand.md` + compile (retire the TS file).

## Done gate

Edit `animation-content.ts` → spot-check Animation chapter. Compile only if you also touched markdown sources. Never hand-edit compiled JSON/CSS.
