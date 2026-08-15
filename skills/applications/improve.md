# Applications — improve

This is the **channel** op: one surface at a time.

## Preconditions

- Expressions table exists (otherwise [`populate.md`](populate.md)).
- User named the channel (Web, Social, Print, App, …) or audit listed one gap.

## Steps

1. Find or add **one** table row. Use a known Channel label from [`SKILL.md`](SKILL.md) or accept `applications-<slug>` for a real unknown surface.
2. Rewrite Title / Copy / Sample for that row only. Sample should be shippable Voice (prefer an existing Phrase).
3. Update the matching `**Channel <name>.**` line if present.
4. Add an on/off pair in `examples.md` → `## Application examples` for that channel (`app-00n`).
5. `cd guide && npm run compile`. Spot-check that nav leaf only (add `guide/src` leaf if the shell lacks the page section).

## Checklist

- [ ] Other channel rows untouched
- [ ] Channel label maps to a known id or `applications-<slug>`
- [ ] Sample passes blocklist
- [ ] Compile run

## Stop conditions

- Do not batch-rewrite all applications.
- Do not invent channels.
- Do not hand-edit compiled outputs.
