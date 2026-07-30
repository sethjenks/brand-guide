# Examples

Reference snapshots for the brand-guide kit. Root [`brand.md`](../brand.md) is the live edit surface; files here are copy/paste or reset sources.

| File | What |
| --- | --- |
| [`brand.default.md`](brand.default.md) | **Full Sample Brand default** — Strategy / Voice / Visual / Expressions / Agent + grayscale Design system. Canonical “what the starter looks like.” |
| [`design-system.default.md`](design-system.default.md) | Grayscale Design system fence only — **token reset target** for `npm run tokens:reset` |

## Restore full Sample Brand

Replaces the entire root constitution (including Philo or any filled brand):

```bash
cp examples/brand.default.md brand.md
cd guide && npm run compile
```

Then update `examples.md`, `rules.md`, and `brand/setup.json` if you want those satellites to match Sample Brand too.

## Reset theme tokens only

Keeps Strategy / Voice / Visual; swaps only the fenced Design system block:

```bash
cd guide && npm run tokens:reset
```

That splices `design-system.default.md` into `brand.md` between
`<!-- brand-guide:design-system -->` … `<!-- /brand-guide:design-system -->`,
then recompiles.

## Apply a Design system patch

Replace the fenced Design system block in `brand.md` with another example’s
fence contents, then:

```bash
cd guide && npm run tokens
```
