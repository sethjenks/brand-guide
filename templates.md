---
file: templates
spec_version: 1.0.0
version: 0.1.0
status: draft
priority: 5
retrieval_tags: [brand, templates, output]
compliance: false
compliance_weight: medium
visibility: public
summary: >
  Slot-based output templates for Sample Brand.
cache_ttl: 30d
---

# Templates

Fill slots with on-brand copy. Respect `rules.md` and Voice.

## social_caption

```
structure: "{{hook}} {{proof}} {{cta}}"
constraints:
  max_chars: 280
example:
  hook: "Most brand docs collect dust."
  proof: "Sample Brand lives in your repo."
  cta: "Open the guide."
```

## product_update

```
structure: "{{change}} — {{why}}."
constraints:
  max_sentences: 2
example:
  change: "We added grayscale tokens to brand.md Design system"
  why: "so agents and CSS stay aligned"
```

## ui_empty_state

```
structure: "{{observation}} {{next_step}}"
constraints:
  max_chars: 120
example:
  observation: "No transcripts yet."
  next_step: "Run the Branding Exercise and save the file here."
```

## meta_description

```
structure: "{{what}}. {{promise}}."
constraints:
  max_chars: 155
example:
  what: "Sample Brand is a grayscale starter brand guide for humans and agents"
  promise: "Clear work, plainly said"
```
