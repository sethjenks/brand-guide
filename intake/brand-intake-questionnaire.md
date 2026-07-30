---
file: brand-intake-questionnaire
spec_version: 1.0.0
version: 1.2.0
updated: 2026-07-30
status: final
skill_type: exercise
skill_stage: 0
skill_order: 0
author: Seth Jenks
owner: Seth Jenks
summary: >
  Foundation branding exercise for brand-guide. First gate when setup is
  starter and intake is pending. Agent asks one question at a time (or share
  as written questionnaire). Output → resources/transcripts/. Then rewrite
  brand.md / brand/setup.json and compile — never hand-edit brand.json.
usage_modes:
  agent: Ask questions one at a time. Save answers as you go. Default when intake is pending.
  async: Send as written questionnaire. Responses saved as text file.
  live: Use as interview script. Record and transcribe. Save verbatim.
output_path: resources/transcripts/questionnaire-{brand}-{date}.txt
feeds_into:
  - brand.md
  - brand/setup.json
  - examples.md
  - rules.md
compiles_to:
  - brand.json
tags:
  - exercise
  - intake
  - foundation
  - questionnaire
priority: 0
visibility: public
---

# Branding Exercise

Starting point for customizing this brand-guide kit. **Complete this before** replacing Sample Brand in the edit surfaces: `brand.md` (constitution + Design system) and `brand/setup.json` (plus `examples.md` / `rules.md` as needed).

**Do not hand-edit** `brand.json`. After you update the sources, run `npm run compile` from `guide/` so `brand.json` and guide CSS regenerate. See [`populate-from-source.md`](populate-from-source.md) and [`UPSTREAM.md`](../UPSTREAM.md).

## Agent protocol (default)

When `brand/setup.json` has `status: "starter"` and `intake` is `"pending"`, this exercise is the **first** thing the agent does.

1. Tell the user you are starting the Branding Exercise (about 20 questions across six sections).
2. Ask whether they want to proceed **one question at a time** (default), receive the **full written questionnaire**, or **skip** because they already have a website URL, brand PDF, or `brand.md` — in that case set `intake` to `"skipped"` and follow [`populate-from-source.md`](populate-from-source.md).
3. **One-by-one mode:** Ask exactly one question. Wait for the answer. Capture it. Optionally ask one short clarifying follow-up if the answer is vague. Then move to the next question. Do not dump the full list unless asked.
4. After the last answer (or when the user stops early with enough signal), save the transcript to `resources/transcripts/questionnaire-{brand-name}-{YYYY-MM-DD}.txt`.
5. Set `brand/setup.json` → `intake` to `"complete"`.
6. Rewrite `brand.md` (including Design system), `examples.md`, `rules.md`, and setup copy from the transcript. Run `npm run compile` from `guide/`. Set `status` to `"populated"` when the cover callout should demote.

**Instructions (async / live):**
- In async mode: share this document and collect written responses
- In live mode: use as an interview guide, record the session, save the transcript
- Save completed responses to `resources/transcripts/questionnaire-{brand-name}-{YYYY-MM-DD}.txt`
- After intake (human review gate):
  1. Rewrite `brand.md` (including Design system) and related brand markdown from the transcript
  2. Update `brand/setup.json` (set `intake` to `"complete"`, then `status` to `"populated"` when the cover callout should demote)
  3. From `guide/`, run `npm run compile`
  4. Skim the visual guide and `brand.json` for gaps — fix **sources**, then compile again

---

## About You

**What business are you in?**

*(Describe the category, industry, and what you do at its most fundamental level.)*

```
Response:
```

---

**What is your unique value proposition?**

*(Why should people choose you over any of your competitors? What do you offer that no one else does?)*

```
Response:
```

---

**What is your mission?**

*(Why does this organization exist? What problem are you solving?)*

```
Response:
```

---

**What are your three most important goals?**

*(Short-term priorities — what are you working toward in the next 12–24 months?)*

```
Response:
1.
2.
3.
```

---

**Why was this company created?**

*(Tell the origin story. What happened that made this necessary? Who started it and why?)*

```
Response:
```

---

**Describe your product and service.**

*(Be specific. What do you actually deliver? How does it work?)*

```
Response:
```

---

## Target Market

**Who is your target market?**

*(Describe your primary customer or audience. Who are they? What do they care about?)*

```
Response:
```

---

**Prioritize your stakeholders in order of importance.**

*(List every audience — customers, donors, partners, employees, etc. — ranked by priority.)*

```
Response:
1.
2.
3.
4.
5.
```

---

**How do you want to be perceived by each audience?**

*(For each stakeholder group above, describe the feeling or impression you want to leave.)*

```
Response:
```

---

**What values and beliefs unite your customers?**

*(What do your best customers believe about the world? What do they care about most?)*

```
Response:
```

---

**If you could communicate a single message about your company, what would it be?**

*(One sentence. The thing you'd say if you had thirty seconds.)*

```
Response:
```

---

**Where will your brand touch-points be with the end user(s)?**

*(Website, social, email, in-person, product packaging, events, etc. Where do people encounter you?)*

```
Response:
```

---

## Positioning

**What are the trends and changes that affect your industry?**

*(What's shifting in your market? What forces are your customers or competitors responding to?)*

```
Response:
```

---

**How do you market your product or service?**

*(What channels, messages, and approaches are you using today?)*

```
Response:
```

---

## Competition

**What is your competitive advantage?**

*(What do you do or have that your competitors don't? What's hard to replicate about you?)*

```
Response:
```

---

**What do you do better than anyone else?**

*(Not just better — the best. What's the thing only you can claim?)*

```
Response:
```

---

## Goals/Success

**What will you be in five years?**

*(Describe the organization at its best-case future state. Scale, reach, impact, reputation.)*

```
Response:
```

---

**How do you measure success?**

*(What are the metrics, signals, or moments that tell you it's working?)*

```
Response:
```

---

**If you could travel to the future. What would your company be and look like?**

*(Unconstrained vision. No limitations. What does it feel like when you've fully arrived?)*

```
Response:
```

---

## Barriers

**What are the potential barriers to success for your company.**

*(Internal and external — what could get in the way?)*

```
Response:
```

---

**What keeps you up at night?**

*(Honest answer. What's the thing you worry about most?)*

```
Response:
```

---

## Facilitator Notes

*For live interview and agent one-by-one mode:*

- Let the subject talk. The most useful data is often in the stories they tell around the answers, not the answers themselves.
- Probe on specifics: "Can you give me an example?" and "What does that look like in practice?" unlock more than any question.
- Note language — the exact words people use to describe their work, their customers, and their fears are the raw material for voice and messaging.
- Pay attention to what they avoid saying. The negative space defines as much as the content.
- Save the full transcript verbatim. Do not summarize before saving — later analysis needs the raw material.
- When turning the transcript into kit files: edit `brand.md` / `brand/setup.json`, then `npm run compile` from `guide/`. Never patch `brand.json` by hand.
