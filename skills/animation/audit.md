# Animation — audit

## Preconditions

- Read [`SKILL.md`](SKILL.md) field map and current `brand.md` Animation labels.
- You may read compiled `brand.json` as a mirror; if it disagrees with markdown, markdown wins — tell the user to compile.

## Steps

1. Score each write-target label and table: present / thin / missing / contradicts Voice or `rules.md` Animation. Score **Animation introduction.** word length: short (<12) / ok (12–28) / long (>28).
2. Check personality **default** names a row (id or title).
3. Check table **Id** cells against the demo key lists in [`SKILL.md`](SKILL.md). Unknown ids are copy-only — report them; do not invent presets.
4. Check `examples.md` → `## Animation examples`: at least one `on-brand` and one `off-brand`; reasons cite the actual rule broken.
5. Check `rules.md` → `## Animation` exists and does not contradict **Animation donts.**
6. Overlay **section-status**: animation leaves roll up from `animation.*` completeness paths. On a starter kit they may still show **sample**.
7. Deliver a gap list: label, what’s wrong, suggested op (`improve` vs full `populate`). Do not invent replacement copy unless the user asks to fix.

## Rubric

- **Animation introduction.** is 12–28 words and reads as a brand statement
- Principles would let an engineer decide when to animate
- One primary personality; others are contrast only
- Donts are testable (blocking, mixed eases, PRM, loops)
- Few-shots would fail/pass the same way a human reviewer would
- Reduced motion is covered in principles and don’ts

## Stop conditions

- Report-only by default.
- Do not silently rewrite Sample Brand starter copy during audit.
- Do not claim demos are brand-authored — choreography is shell-owned.
