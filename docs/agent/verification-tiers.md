# Verification tiers

Classify blast radius before editing. Use the smallest tier that covers the changed surface; name the tier in the Done gate (one line).

## Tiers

| Tier | When | Gate |
| --- | --- | --- |
| 0 | Docs-only / audit report-only | None or targeted read |
| 1 | Single chapter populate / improve | `cd guide && npm run compile` + spot-check that chapter |
| 2 | Design system / theme chrome | compile + `npm run theme:build` + Color / Type spot-check |
| 3 | Whole-brand populate / `status: "populated"` | compile + `npm run post-populate-check` + intake checklist (+ populate worklog) |
| 4 | Shell / skills integrity / validators | `npm run compile:check` (includes `skills:check`) |

## Mapping

| Work | Default tier |
| --- | --- |
| Chapter `audit` (report-only) | 0 |
| Chapter `populate` / `improve` | 1 |
| Color / typography Design system edits | 2 |
| Intake questionnaire complete → populated | 3 |
| Populate from source | 3 |
| New guide primitive, skills catalog, validators | 4 |

## Done gate line

Example: `Verification tier: 1 — compile + spot-check Language.`

Do not claim done when required checks for the named tier failed, were skipped without reason, or were never run.
