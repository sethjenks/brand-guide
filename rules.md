---
file: rules
spec_version: 1.0.0
version: 0.1.0
status: draft
priority: 2
retrieval_tags: [brand, rules, compliance]
compliance: true
compliance_weight: high
visibility: public
summary: >
  Executable brand rules — vocabulary, strategy, applications, color,
  photography, logo, conflict precedence.
cache_ttl: 30d
---

# Rules

Machine-oriented constraints. Narrative guardrails also live in `brand.md` → Strategy → Guardrails.

## Vocabulary

**Blocklist:** synergistic, utilize, best-in-class, seamless, revolutionary, unlock your potential, world-class, holistic, leverage (empty use)

**Prefer:** build, ship, clear, plain, specific, guide, update, open

## Copy structure

- Lead with the job to be done or the concrete change.
- One primary claim per block; proof before adjectives.
- Social: max one idea; prefer an ownable phrase from `brand.md`.
- Fail the litmus test → rewrite (if any brand name could replace ours, it is off-brand).

## Strategy

- Do not invent competitors, market share, awards, or proof the source does not support.
- Positioning **Only we.** must fail the litmus test if another brand name could replace ours.
- Changing Guardrails (`Tone summary`, litmus, cannot-be) requires human approval.
- Archetype **Wheel.** must be a known catalog id; do not invent a three-ring wheel without source.

## Applications

- Only author Expression channels the brand actually uses. Leave unmatched Applications nav leaves empty rather than filling with generic copy.
- Channel cell labels must map (`Web`, `Social`, `Print`, `App`, …) — see `skills/applications/SKILL.md`.
- Samples are shippable Voice lines; they must pass Vocabulary blocklist and the litmus test.

## Color

- Starter palette is grayscale only (`brand.md` → Design system).
- Compliance ΔE threshold vs approved tokens: `5.0`
- Min contrast body text on paper: `4.5`
- Off-palette accents require human approval and a `brand.md` Design system update.

## Photography

- Prefer editorial, natural light, product-in-context. No oversaturated stock, fake handshakes, neon gradients, or purple AI clichés.
- People and places must be real or honestly candid — no stock theater.
- Image-gen prompts live in `brand.md` Visual → **Imagery prompt product.** / **Imagery prompt lifestyle.**; bans in **Imagery negative.**
- Do not treat hardcoded Photography category specimens in the guide as brand-authored until `brand.md` drives them.
- Alt text: describe the scene and product; do not invent emotion the photo does not show.

## Logo

- Default lockup: ink wordmark on paper. Inverse: paper wordmark on ink.
- Do not stretch, outline, add drop shadows, or place the mark on busy photography without a paper panel.
- Preferred files in `brand/assets/`: `logo.svg` (or `logo.png`), `wordmark.svg`, `mark.svg`. Compile copies files to `guide/public/brand/` — do not hand-edit the public copy.
- Clearspace must be measurable (e.g. cap-height), not “generous.”

## Conflict resolution

**Precedence (highest first):**

1. `rules.md` (this file)
2. Active voice/tone variant (if any)
3. `brand.md` Guardrails + Voice
4. `brand.json` compiled fields
5. Personality / archetype color alone

If Design system hex values disagree with Visual semantic roles in `brand.md`, flag the conflict; prefer Strategy essence unless the user names the design system as authoritative for that decision.
