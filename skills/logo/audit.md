# Logo — audit

## Preconditions

- Read [`SKILL.md`](SKILL.md) and current Visual Logo labels.
- Markdown wins over stale `brand.json` — recommend compile if they disagree.

## Steps

1. Score **Logo description.** / **Logo clearspace.** / **Logo donts.**: present / thin / missing. Compiler requires description + non-empty donts. Score **Logo description.** word length: short (<12) / ok (12–28) / long (>28); flag Design system pointers in that field.
2. Compare Design system Logo (implementation) to those labels (clearspace units, ink/paper colorways).
3. Check `rules.md` → `## Logo` and `examples.md` → `## Logo examples`.
4. Assets:
   - `brand/assets/` exists?
   - Any of `logo.svg`, `logo.png`, `wordmark.svg`, `mark.svg`?
   - `logo.svg` specifically (drives `logoAssetExists` in section-status)
5. Overlay **section-status** placeholders — do not treat them as finished customisation:

   | Leaf id | Typical status | Meaning |
   | --- | --- | --- |
   | `logo-supporting` | stub | UI stub in `page.tsx` |
   | `logo-background`, `logo-scaling`, `logo-clearspace`, `logo-donts`, `logo-use` | assets | Placeholder specimens |
   | `logo-mark` (+ scaling/clearspace/donts) | assets if `logo.svg` exists | File present but UI may still use a text wordmark |

6. Report: prose gaps vs asset gaps vs shell stubs. Suggest `improve` vs `populate`. Do not invent a mark or don’ts unless asked to fix.

## Rubric

- **Logo description.** is 12–28 words and reads as a brand statement (construction lives on clearspace / implementation)
- Description plus clearspace would let a designer redraw the lockup without a meeting
- Clearspace is measurable
- Donts are testable (stretch, recolor, effects)
- Filenames match the convention or are explicitly absent

## Stop conditions

- Report-only by default.
- Do not copy files into `guide/public/brand/` by hand.
