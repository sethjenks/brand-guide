# Agent workflow router

App-local routing for brand-guide work. Classify the task, read the listed docs, pick a [verification tier](verification-tiers.md), then edit. Do not start implementation until this preflight is done.

Entry contract: [`agent.md`](../../agent.md). Decision rules: [`decision-contract.md`](decision-contract.md).

## Required preflight

1. Confirm intake gate: if `brand/setup.json` has `status: "starter"` and `intake: "pending"`, follow intake first (`intake-gate-first`).
2. Classify the task type (table below).
3. Read every doc listed for that row (combine rows when a task spans surfaces).
4. Name a verification tier before editing.

## Task routing

| Task type | Read before editing |
| --- | --- |
| Intake / Branding Exercise | [`intake/brand-intake-questionnaire.md`](../../intake/brand-intake-questionnaire.md), [`decision-contract.md`](decision-contract.md) |
| Populate from source | [`intake/populate-from-source.md`](../../intake/populate-from-source.md), [`intake/populate-worklog.md`](../../intake/populate-worklog.md), [`decision-contract.md`](decision-contract.md), [`verification-tiers.md`](verification-tiers.md) |
| One guide chapter | [`skills/<id>/SKILL.md`](../../skills/README.md) + op (`populate` / `audit` / `improve`), [`skills/README.md`](../../skills/README.md), [`decision-contract.md`](decision-contract.md) |
| Theme / Design system | [`UPSTREAM.md`](../../UPSTREAM.md) semantic token contract, `brand.md` → Design system, [`decision-contract.md`](decision-contract.md) |
| Shell / guide UI | [`guide/AGENTS.md`](../../guide/AGENTS.md), [`UPSTREAM.md`](../../UPSTREAM.md) extension points, [`decision-contract.md`](decision-contract.md) (`primitive-before-custom-ui`) |
| Broken compile / setup / status | Failing script output first, then the relevant contract above |

## Worklog

Whole-brand populate (intake / populate-from-source) must fill a copy of [`intake/populate-worklog.md`](../../intake/populate-worklog.md) under `resources/transcripts/`. Chapter skills do **not** require a worklog.

## Future (do not implement yet)

[`section-inventory-spec.md`](section-inventory-spec.md) describes inventory-driven guide composition. Do not rewrite `page.tsx` from inventory until a follow-up plan explicitly ships it.
