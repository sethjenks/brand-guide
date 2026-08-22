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
  Slot-based output templates for Sunset.
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
  hook: "If it exists, we'll find it."
  proof: "Sunset finds every account, asset, and debt they left behind — free for families."
  cta: "Begin search."
```

## product_update

```
structure: "{{change}} — {{why}}."
constraints:
  max_sentences: 2
example:
  change: "We'll email you as soon as your requested searches are complete"
  why: "so you can review and close discovered accounts when you're ready"
```

## ui_empty_state

```
structure: "{{observation}} {{next_step}}"
constraints:
  max_chars: 120
example:
  observation: "No searches yet."
  next_step: "Begin search to find what they left behind."
```

## meta_description

```
structure: "{{what}}. {{promise}}."
constraints:
  max_chars: 155
example:
  what: "Sunset finds every account, asset, and debt your loved one left behind"
  promise: "Free for families, in all 50 states"
```
