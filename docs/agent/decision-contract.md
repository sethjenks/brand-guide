# Decision contract

Shell-owned process rules for agents working in this kit. Brand tone and vocabulary stay in [`rules.md`](../../rules.md) and `brand.md` — do not duplicate them here.

Use this before planning or editing. Rule IDs are stable; keep them in sync with validators and docs that cite them.

## Rule levels

| Level | Meaning | Required handling |
| --- | --- | --- |
| Invariant | Cannot be violated | Follow it; checks should fail if broken |
| Default | Normal choice | Use it unless the task proves a reason not to |
| Heuristic | Product- or brand-dependent | Decide from context and record why |
| Escape hatch | Allowed exception | Explain why and add stronger coverage |
| Recommendation | Style guidance | Follow unless the task requires otherwise |

## Rule catalog

| Rule ID | Level | Summary |
| --- | --- | --- |
| `compile-sources-only` | Invariant | Edit `brand.md` / `rules.md` / `examples.md` / `templates.md` / `brand/*`; never hand-edit `brand.json`, `tokens.json`, or generated CSS. Ship via `npm run compile` from `guide/`. |
| `required-semantic-tokens` | Invariant | Design system must include required color roles and `--font-sans`. Compile fails if missing. |
| `intake-gate-first` | Invariant | When `status: "starter"` and `intake: "pending"`, run the Branding Exercise (or skip to populate-from-source) before chapter `populate`. |
| `skills-router-required` | Invariant | Chapter work starts at `skills/<id>/SKILL.md`, then the op. Do not invent a parallel recipe. |
| `primitive-before-custom-ui` | Default | Prefer shared guide primitives and Astryx components before new layout shells. Name rejected primitives when inventing UI. |
| `extended-chapter-toggle` | Heuristic → invariant when off | Extended chapters (`logo`, `photography`, `animation`, `applications`) may be `"off"` in setup. Do not `populate` an off chapter unless the user asks to turn it on. |
| `coverage-honesty-when-populated` | Default | When setting `status: "populated"`, write `brand/coverage.json` with honest `filled` \| `inferred` \| `placeholder`. Do not invent Strategy/Voice from token names alone. |
| `chapter-intro-word-bound` | Default | `GraphicStatement` chapter intros: 12–28 words, statement-only. Soft audit bound — not a compile fail. |

## Enforcement

| Enforcement | Use for |
| --- | --- |
| Compile / `compile:check` | Sources-only outputs, setup schema, required tokens, skills integrity |
| `post-populate-check` | Whole-brand populate readiness |
| Skills routers + ops | Chapter write targets and conflict rules |
| [`UPSTREAM.md`](../../UPSTREAM.md) | Shell vs brand ownership and extension points |
| This doc + [`agent.md`](../../agent.md) | Decision criteria and workflow |

## Related

- Task routing: [`workflow.md`](workflow.md)
- Verification: [`verification-tiers.md`](verification-tiers.md)
- Future composition bet: [`section-inventory-spec.md`](section-inventory-spec.md) (do not implement yet)
