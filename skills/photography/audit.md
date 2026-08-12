# Photography — audit

## Preconditions

- Read [`SKILL.md`](SKILL.md) field map and current `brand.md` Imagery labels.
- You may read compiled `brand.json` as a mirror; if it disagrees with markdown, markdown wins — tell the user to compile.

## Steps

1. Score each write-target label: present / thin / missing / contradicts Voice or `rules.md` Photography. Score **Imagery introduction.** word length: short (<12) / ok (12–28) / long (>28). Do not treat **Imagery tone.** length as the GraphicStatement gate.
2. Check `examples.md` → `## Imagery examples`: at least one `on-brand` and one `off-brand`; reasons cite the actual rule broken.
3. Check `rules.md` → `## Photography` exists and does not contradict **Imagery avoid.**
4. Overlay **section-status** (do not treat stubs as finished content):

   From [`guide/src/lib/section-status.ts`](../../guide/src/lib/section-status.ts):

   | Leaf id | Status source | Meaning |
   | --- | --- | --- |
   | `photography-donts` | `ASSET_PLACEHOLDER_IDS` | Don’t specimens not customized |
   | `photography-categories` | `ASSET_PLACEHOLDER_IDS` | Category overview still placeholder visuals |
   | `photography-category-subjects` | `ASSET_PLACEHOLDER_IDS` | Subject stage placeholder |
   | `photography-category-settings` | `ASSET_PLACEHOLDER_IDS` | Settings stage placeholder |
   | `photography-category-product` | `HARDCODED_PHOTO_IDS` | Starter product context hardcoded in `page.tsx` |
   | `photography-category-moments` | `HARDCODED_PHOTO_IDS` | Starter moments context hardcoded in `page.tsx` |

   Copy on `visual.imagery` can be `ok` while those leaves still show **assets** / **empty**. Report both.

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
- Do not claim category leaves are done while they remain hardcoded or placeholder.
