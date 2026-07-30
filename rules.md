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
  Executable brand rules — vocabulary, color, conflict precedence.
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

## Color

- Starter palette is grayscale only (`brand.md` → Design system).
- Compliance ΔE threshold vs approved tokens: `5.0`
- Min contrast body text on paper: `4.5`
- Off-palette accents require human approval and a `brand.md` Design system update.

## Conflict resolution

**Precedence (highest first):**

1. `rules.md` (this file)
2. Active voice/tone variant (if any)
3. `brand.md` Guardrails + Voice
4. `brand.json` compiled fields
5. Personality / archetype color alone

If Design system hex values disagree with Visual semantic roles in `brand.md`, flag the conflict; prefer Strategy essence unless the user names the design system as authoritative for that decision.
