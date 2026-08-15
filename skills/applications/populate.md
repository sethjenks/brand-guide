# Applications — populate

## Preconditions

- Intake is `complete` or `skipped`.
- Read [`SKILL.md`](SKILL.md) channel map.
- Evidence for each channel (site, deck, social, packaging) — skip nav leaves you cannot support.

## Steps

1. Keep `**Act label.** Applications`.
2. Write the Expressions table with **one row per real surface** only. Unknown channels become `applications-<slug>`.
3. For each row: Title (pattern name), Copy (how the brand shows up), Sample (an on-voice line — prefer a Phrase from Voice).
4. Optional `**Channel <name>.**` one-liners for the same channels (merged with the table row).
5. Add [`rules.md`](../../rules.md) → `## Applications` constraints (don’t invent channels; samples must pass Vocabulary).
6. Add `examples.md` → `## Application examples` on/off pairs (`app-00n`) for at least one filled channel.
7. `cd guide && npm run compile`.
8. Spot-check Applications. Nav follows the table — unauthored catalog leaves are gone. If a channel needs a page section the shell lacks, add the leaf in `guide/src`.

## Checklist

- [ ] Table has ≥ 1 Channel row (compile requires this)
- [ ] Channel cells map to known ids or `applications-<slug>`
- [ ] Samples would pass Voice litmus
- [ ] Compile run; nav leaf count === table rows (deduped)

## Stop conditions

- Do not invent channels to fill a fixed nav catalog.
- Do not promote `optional/channels.md` in this op.
- Do not hand-edit compiled outputs.
