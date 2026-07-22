---
file: brand-intake-questionnaire
spec_version: 1.0.0
version: 1.1.0
updated: 2026-07-22
status: final
skill_type: exercise
skill_stage: 0
skill_order: 0
author: Seth Jenks
owner: Seth Jenks
summary: >
  Foundation intake for brand-guide. Complete before rewriting brand.md,
  DESIGN.md, and brand/setup.json. Then compile — never hand-edit brand.json.
  Written questionnaire or live interview. Output → resources/transcripts/.
usage_modes:
  async: Send as written questionnaire. Responses saved as text file.
  live: Use as interview script. Record and transcribe. Save verbatim.
output_path: resources/transcripts/questionnaire-{brand}-{date}.txt
feeds_into:
  - brand.md
  - DESIGN.md
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

# Brand Intake Questionnaire

Starting point for customizing this brand-guide kit. Complete it before replacing Sample Brand in the **edit surfaces**: `brand.md`, `DESIGN.md`, and `brand/setup.json` (plus `examples.md` / `rules.md` as needed).

**Do not hand-edit** `brand.json`. After you update the sources, run `npm run compile` from `guide/` so `brand.json` and guide CSS regenerate. See [`populate-from-source.md`](populate-from-source.md) and [`UPSTREAM.md`](../UPSTREAM.md).

**Instructions:**
- In async mode: share this document and collect written responses
- In live mode: use as an interview guide, record the session, save the transcript
- Save completed responses to `resources/transcripts/questionnaire-{brand-name}-{YYYY-MM-DD}.txt`
- After intake (human review gate):
  1. Rewrite `brand.md`, `DESIGN.md`, and related brand markdown from the transcript
  2. Update `brand/setup.json` (set `status` to `"populated"` when the cover callout should demote)
  3. From `guide/`, run `npm run compile`
  4. Skim the visual guide and `brand.json` for gaps — fix **sources**, then compile again

---

## Section 1 — About You

**1.1 What business are you in?**

*(Describe the category, industry, and what you do at its most fundamental level.)*

```
Response:
```

---

**1.2 What is your unique value proposition?**

*(Why should people choose you over any of your competitors? What do you offer that no one else does?)*

```
Response:
```

---

**1.3 What is your mission?**

*(Why does this organization exist? What problem are you solving?)*

```
Response:
```

---

**1.4 What are your three most important goals right now?**

*(Short-term priorities — what are you working toward in the next 12–24 months?)*

```
Response:
1.
2.
3.
```

---

**1.5 Why was this company created?**

*(Tell the origin story. What happened that made this necessary? Who started it and why?)*

```
Response:
```

---

**1.6 Describe your product or service.**

*(Be specific. What do you actually deliver? How does it work?)*

```
Response:
```

---

## Section 2 — Target Market

**2.1 Who is your target market?**

*(Describe your primary customer or audience. Who are they? What do they care about?)*

```
Response:
```

---

**2.2 Prioritize your stakeholders in order of importance.**

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

**2.3 How do you want to be perceived by each audience?**

*(For each stakeholder group above, describe the feeling or impression you want to leave.)*

```
Response:
```

---

**2.4 What values and beliefs unite your customers?**

*(What do your best customers believe about the world? What do they care about most?)*

```
Response:
```

---

**2.5 If you could communicate a single message about your company, what would it be?**

*(One sentence. The thing you'd say if you had thirty seconds.)*

```
Response:
```

---

**2.6 Where will your brand touch-points be with the end user?**

*(Website, social, email, in-person, product packaging, events, etc. Where do people encounter you?)*

```
Response:
```

---

## Section 3 — Positioning

**3.1 What are the trends and changes affecting your industry right now?**

*(What's shifting in your market? What forces are your customers or competitors responding to?)*

```
Response:
```

---

**3.2 How do you currently market your product or service?**

*(What channels, messages, and approaches are you using today?)*

```
Response:
```

---

## Section 4 — Competition

**4.1 What is your competitive advantage?**

*(What do you do or have that your competitors don't? What's hard to replicate about you?)*

```
Response:
```

---

**4.2 What do you do better than anyone else?**

*(Not just better — the best. What's the thing only you can claim?)*

```
Response:
```

---

## Section 5 — Goals and Success

**5.1 What will you be in five years?**

*(Describe the organization at its best-case future state. Scale, reach, impact, reputation.)*

```
Response:
```

---

**5.2 How do you measure success?**

*(What are the metrics, signals, or moments that tell you it's working?)*

```
Response:
```

---

**5.3 If you could travel to the future — what would your company be and look like?**

*(Unconstrained vision. No limitations. What does it feel like when you've fully arrived?)*

```
Response:
```

---

## Section 6 — Barriers

**6.1 What are the potential barriers to success for your company?**

*(Internal and external — what could get in the way?)*

```
Response:
```

---

**6.2 What keeps you up at night?**

*(Honest answer. What's the thing you worry about most?)*

```
Response:
```

---

## Facilitator Notes

*For live interview mode:*

- Let the subject talk. The most useful data is often in the stories they tell around the answers, not the answers themselves.
- Probe on specifics: "Can you give me an example?" and "What does that look like in practice?" unlock more than any question.
- Note language — the exact words people use to describe their work, their customers, and their fears are the raw material for voice and messaging.
- Pay attention to what they avoid saying. The negative space defines as much as the content.
- Save the full transcript verbatim. Do not summarize before saving — the analysis skills need the raw material.
- When turning the transcript into kit files: edit `brand.md` / `DESIGN.md` / `brand/setup.json`, then `npm run compile` from `guide/`. Never patch `brand.json` by hand.
