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
  input: "We added grayscale token names to brand.md Design system so agents and CSS stay aligned."
  reason: "Specific change and why it matters."
```

## Strategy examples

```yaml
- id: strategy-001
  type: positioning
  label: off-brand
  input: "The world's leading synergistic brand platform for every team."
  reason: "Unfalsifiable superlative + blocklisted 'synergistic'; fails Only-we / litmus."

- id: strategy-002
  type: positioning
  label: on-brand
  input: "A starter that ships a filled Sample Brand, a visual guide, and a compiled brand.json in one repo."
  reason: "Concrete, exclusive, matches Only we."

- id: strategy-003
  type: promise
  label: off-brand
  input: "We unlock your potential with world-class brand vibes."
  reason: "Blocklist + empty inspiration; contradicts Guardrails."

- id: strategy-004
  type: promise
  label: on-brand
  input: "Hold brand meaning in the repo so humans and agents share one source of truth."
  reason: "Matches Mission; specific job to be done."
```

## Application examples

```yaml
- id: app-001
  type: web
  label: off-brand
  input: "Unlock your potential — start your brand journey today with our seamless hero."
  reason: "Blocklist, fake urgency, not the Web pattern (one headline, one supporting line)."

- id: app-002
  type: web
  label: on-brand
  input: "Open the guide"
  reason: "Concrete CTA; matches Sample Brand Web sample."

- id: app-003
  type: social
  label: off-brand
  input: "Three ideas, a product dump, and a purple gradient wordmark."
  reason: "Social is one idea; off-palette; not an ownable phrase."

- id: app-004
  type: social
  label: on-brand
  input: "Clear work, plainly said."
  reason: "One ownable Voice phrase; high-contrast lockup implied."
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

## Logo examples

```yaml
- id: logo-001
  label: off-brand
  input: "Wordmark stretched to fill a banner, drop shadow, placed on a busy photo"
  reason: "Stretch, shadow, and busy photography without a paper panel violate Logo donts."

- id: logo-002
  label: on-brand
  input: "Ink wordmark on paper with clearspace equal to the cap-height of S"
  reason: "Default colorway and measurable clearspace."

- id: logo-003
  label: off-brand
  input: "Outlined wordmark in #7C3AED on a neon gradient"
  reason: "Outline plus off-palette accent; starter lockup is ink/paper only."

- id: logo-004
  label: on-brand
  input: "Paper wordmark reversed on ink, SVG, transparent background"
  reason: "Approved inverse; SVG preferred per Design system Logo implementation."
```
