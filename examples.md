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
  Labeled on-brand / off-brand few-shot examples for Sunset.
cache_ttl: 30d
---

# Examples

Few-shot pairs for creative review. Compiled into `brand.json` → `examples` via `npm run compile`.

## Copy examples

```yaml
- id: copy-001
  type: headline
  label: off-brand
  input: "Unlock your potential with our synergistic after-loss journey."
  reason: "Jargon, vague benefit, fails the litmus test."

- id: copy-002
  type: headline
  label: on-brand
  input: "Find what they left behind."
  reason: "Site tagline; specific job; ownable."

- id: copy-003
  type: cta
  label: off-brand
  input: "Start your journey to world-class estate settlement today!"
  reason: "Hype, fake urgency, not the site CTA."

- id: copy-004
  type: cta
  label: on-brand
  input: "begin search"
  reason: "Concrete verb, short, matches marketing and app CTA."

- id: copy-005
  type: product_update
  label: off-brand
  input: "We're thrilled to announce a seamless new experience."
  reason: "Emotion theater + forbidden 'seamless'."

- id: copy-006
  type: product_update
  label: on-brand
  input: "Most families have 100% of assets discovered within two weeks — we'll email you when your searches are complete."
  reason: "Specific timeline and next step from the FAQ."
```

## Strategy examples

```yaml
- id: strategy-001
  type: positioning
  label: off-brand
  input: "The world's leading synergistic estate platform for every family."
  reason: "Unfalsifiable superlative + blocklisted 'synergistic'; fails Only-we / litmus."

- id: strategy-002
  type: positioning
  label: on-brand
  input: "The family-facing suite stays free because banks pay a referral fee when assets move and professionals pay for Sunset Pro."
  reason: "Concrete, exclusive, matches Only we."

- id: strategy-003
  type: promise
  label: off-brand
  input: "We take a small percentage of the estate so we can unlock your potential."
  reason: "Contradicts free-for-families model and Guardrails."

- id: strategy-004
  type: promise
  label: on-brand
  input: "Find every account, asset, and debt a loved one left behind, then help families claim and close them — free."
  reason: "Matches Mission; specific job to be done."
```

## Application examples

```yaml
- id: app-001
  type: web
  label: off-brand
  input: "Unlock your potential — start your after-loss journey today with our seamless hero."
  reason: "Blocklist, fake urgency, not the Web pattern (one headline, one supporting line)."

- id: app-002
  type: web
  label: on-brand
  input: "Find what they left behind."
  reason: "Concrete headline; matches Sunset Web sample."

- id: app-003
  type: social
  label: off-brand
  input: "Three ideas, a product dump, and a neon gradient wordmark."
  reason: "Social is one idea; off-palette; not an ownable phrase."

- id: app-004
  type: social
  label: on-brand
  input: "Find what they left behind."
  reason: "One ownable Voice phrase; high-contrast lockup implied."

- id: app-005
  type: app
  label: on-brand
  input: "begin search"
  reason: "Matches the product CTA on app.hellosunset.com."

- id: app-006
  type: print
  label: on-brand
  input: "Give families one less thing to worry about."
  reason: "Funeral-home trifold headline from /funeral-homes."
```

## Color examples

```yaml
- id: color-001
  label: off-brand
  input: "#7C3AED"
  reason: "Accent purple is not in the site palette; nearest approved is ink / cream / terracotta hover."

- id: color-002
  label: on-brand
  input: "#211E19"
  reason: "Matches --color-ink / site neutral-900."

- id: color-003
  label: off-brand
  input: "#0F87FF"
  reason: "Webflow default blue; not a Sunset brand color."

- id: color-004
  label: on-brand
  input: "#F7F3EB"
  reason: "Matches --color-canvas / site neutral-200 / theme-color."

- id: color-005
  label: on-brand
  input: "#AD5137"
  reason: "Site hover accent (secondary-red-600); not a primary button fill."
```

## Imagery examples

```yaml
- id: imagery-001
  label: off-brand
  input: "Neon gradient 3D blobs with stock handshake overlay"
  reason: "Oversaturated, generic stock, decorative noise."

- id: imagery-002
  label: on-brand
  input: "Natural light portrait of a real person, cream field, candid crop — matching site testimonial stills"
  reason: "Editorial, human, calm mood."

- id: imagery-003
  label: off-brand
  input: "Grief-porn close-up of crying hands over a casket, purple grade"
  reason: "Grief theater; wrong palette and energy."

- id: imagery-004
  label: on-brand
  input: "Sunset discovery UI on a cream field, photographed flat, generous margins"
  reason: "Product-in-context; matches home / how-it-works screens."
```

## Logo examples

```yaml
- id: logo-001
  label: off-brand
  input: "Wordmark stretched to fill a banner, drop shadow, placed on a busy photo"
  reason: "Stretch, shadow, and busy photography without a cream panel violate Logo donts."

- id: logo-002
  label: on-brand
  input: "Ink wordmark on cream with clearspace equal to the height of the sun segment"
  reason: "Default colorway and measurable clearspace."

- id: logo-003
  label: off-brand
  input: "Outlined wordmark in #7C3AED on a neon gradient"
  reason: "Outline plus off-palette accent."

- id: logo-004
  label: on-brand
  input: "Cream wordmark reversed on ink, SVG, transparent background"
  reason: "Approved inverse; SVG preferred per Design system Logo implementation."
```

## Animation examples

```yaml
- id: animation-001
  label: off-brand
  input: "Bounce and sparkle on every hover; ignore prefers-reduced-motion; delay the close until the exit flourish finishes."
  reason: "Decorates instead of orients; blocks the next action; no reduced-motion path."

- id: animation-002
  label: on-brand
  input: "Fade and settle the panel so the eye can track what opened; honor prefers-reduced-motion with an instant swap."
  reason: "Motion clarifies a state change and keeps a reduced-motion path."

- id: animation-003
  label: off-brand
  input: "Playful overshoot on a destructive confirm, mixed Punch and Elastic eases on the same screen."
  reason: "Easing does not match the action; conflicting personalities."

- id: animation-004
  label: on-brand
  input: "Editorial ease as the default curve; animate the modal in, dismiss it immediately."
  reason: "One primary personality; entrance over exit."
```
