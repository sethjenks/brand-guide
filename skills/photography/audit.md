# Photography — audit

## Preconditions

- Read [`SKILL.md`](SKILL.md) field map and current `brand.md` Imagery labels.
- You may read compiled `brand.json` as a mirror; if it disagrees with markdown, markdown wins — tell the user to compile.

## Steps

1. Score each write-target label: present / thin / missing / contradicts Voice or `rules.md` Photography. Score **Imagery introduction.** word length: short (<12) / ok (12–28) / long (>28). Do not treat **Imagery tone.** length as the GraphicStatement gate.
2. Check `examples.md` → `## Imagery examples`: at least one `on-brand` and one `off-brand`; reasons cite the actual rule broken.
3. Check `rules.md` → `## Photography` exists and does not contradict **Imagery avoid.**
4. Overlay **section-status** (do not treat specimen placeholders as finished visuals):

   | Leaf id | Meaning |
   | --- | --- |
   | `photography-category-subjects` / `settings` | Hide when subjects/settings empty |
   | `photography-category-product` / `moments` | Hide when product/moments empty — do not fabricate |
   | `photography-donts` | Hide when **Imagery avoid.** empty |

   Copy on `visual.imagery` can be `ok` while gallery cells still show **assets**. Report both. Do **not** call leftover badges expected for categories you invented.

5. Deliver a gap list: label, what’s wrong, suggested op (`improve` vs full `populate`). Do not invent replacement copy unless the user asks to fix.

## Rubric

- **Imagery introduction.** is 12–28 words and reads as a brand statement
- Style/mood/tone specific enough that two photographers would shoot similarly; tone is a short mood phrase, not the intro
- Avoid/negatives are concrete motifs, not “bad photos”
- Prompts include light, crop, and subject; not generic “lifestyle shot”
- Few-shots would fail/pass the same way a human reviewer would

## Stop conditions

- Report-only by default.
- Do not silently rewrite Sample Brand starter copy during audit.
- Do not claim category leaves are done while gallery specimens are still placeholders.
- Do not treat missing product/moments as a fail when the source has none (leaves should hide).
