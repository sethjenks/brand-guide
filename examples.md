---
file: examples
spec_version: 1.0.0
version: 0.1.0
status: draft
priority: 5
retrieval_tags: [brand, examples, few-shot]
compliance: true
compliance_weight: high
visibility: public
summary: >
  Labeled on-brand / off-brand few-shot examples for Sample Brand.
cache_ttl: 30d
---

# Examples

Few-shot pairs for creative review. Compiled into `brand.json` → `examples` via `npm run compile`.

## Copy examples

```yaml
- id: copy-001
  type: headline
  label: off-brand
  input: "Unlock your potential with our synergistic brand solutions."
  reason: "Jargon, vague benefit, fails the litmus test."

- id: copy-002
  type: headline
  label: on-brand
  input: "Clear work, plainly said."
  reason: "Ownable, specific, matches voice pillars."

- id: copy-003
  type: cta
  label: off-brand
  input: "Start your journey to world-class branding today!"
  reason: "Hype, fake urgency, not plain language."

- id: copy-004
  type: cta
  label: on-brand
  input: "Open the guide"
  reason: "Concrete verb, short, matches UI tone."

- id: copy-005
  type: product_update
  label: off-brand
  input: "We're thrilled to announce a seamless new experience."
  reason: "Emotion theater + forbidden 'seamless'."

- id: copy-006
  type: product_update
  label: on-brand
  input: "We added grayscale token names to DESIGN.md so agents and CSS stay aligned."
  reason: "Specific change and why it matters."
```

## Color examples

```yaml
- id: color-001
  label: off-brand
  input: "#7C3AED"
  reason: "Accent purple breaks the grayscale starter; nearest approved is ink/paper/surface only."

- id: color-002
  label: on-brand
  input: "#111111"
  reason: "Matches --color-ink / color-ink."

- id: color-003
  label: off-brand
  input: "#FF6B35"
  reason: "Warm accent not in palette."

- id: color-004
  label: on-brand
  input: "#f5f5f5"
  reason: "Matches --color-surface."
```

## Imagery examples

```yaml
- id: imagery-001
  label: off-brand
  input: "Neon gradient 3D blobs with stock handshake overlay"
  reason: "Oversaturated, generic stock, decorative noise."

- id: imagery-002
  label: on-brand
  input: "Natural light desk scene: open laptop showing a plain brand guide page, muted neutrals, candid crop"
  reason: "Editorial, product-in-context, calm mood."

- id: imagery-003
  label: off-brand
  input: "Glowing AI brain in purple void"
  reason: "Cliché AI visual; wrong palette and energy."

- id: imagery-004
  label: on-brand
  input: "Black wordmark on white paper with generous margins, photographed flat"
  reason: "Matches logo and style direction."
```
