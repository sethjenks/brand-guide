---
name: "Sample Brand"
tagline: "Clear work, plainly said."
version: 1
language: en
type: master
---

# Sample Brand

Portable brand constitution for humans and agents. Aesthetic **intent** lives here; concrete tokens live in [`DESIGN.md`](DESIGN.md).

Edit this file (and `DESIGN.md`, `examples.md`, `rules.md`, `templates.md`, `brand/setup.json`). Run `npm run compile` from `guide/` to regenerate `brand.json`. Do not hand-edit `brand.json`.

---

## For agents (LLM)

**First fill (recommended):** Follow [`intake/populate-from-source.md`](intake/populate-from-source.md). Accept a website URL, brand-guide PDF, `brand.md`, and/or `DESIGN.md`. Update this file, `DESIGN.md`, `examples.md`, `rules.md`, and `brand/setup.json`. Run compile. Set `brand/setup.json` `status` to `"populated"` when done so the cover callout demotes.

When this file is empty or partially filled and no external source is provided, do **one** of the following:

1. **Populate from context** — Infer from the repo (`README.md`, `DESIGN.md`, tokens, marketing copy). Cite sources. Replace placeholders.
2. **Interview** — Ask a short ordered set (mission, audience, differentiation, voice do/don’t, one visual anchor). Then write complete sections.

**If `DESIGN.md` is alongside this file:** Read it. Align Visual → Colors with tokens there. If they conflict, prefer Strategy essence and Guardrails unless the user says the design system wins.

**Task slices**

| Task | Read |
| --- | --- |
| Blog / email / social | Voice (+ `examples.md`) |
| Landing / UI / CSS | Voice + Visual + `DESIGN.md` |
| Pitch / positioning | Strategy + Voice |

Prefer `brand.json` for structured tokens, rules, and labeled examples when present (runtime truth after compile).

---

## Strategy

**Act label.** What to say

### Overview

**What.** Sample Brand is a starter brand constitution for teams who want guidelines agents can read and humans can trust — without hunting PDFs.

**Origin.** Built as the default grayscale template inside this brand-guide kit so teams start from a finished example, not blank scaffolds.

**What it really does.** It holds meaning (why we sound and look a certain way) so product, marketing, and agents share one source of truth.

**Problem.** Brand rules live in slide decks and tribal knowledge. Agents invent tone; humans disagree about “on brand.”

**Current.** Teams paste guidelines into every prompt, or ship generic creative and hope it sticks.

**Opportunity.** Keep meaning in the repo — one file agents load, one design system they implement.

**Solution.** A filled grayscale template: Strategy, Voice, and Visual in brand.md, tokens in DESIGN.md, and a visual guide you can open locally.

**Transformation.** Before: fragmented vibe checks. After: one file agents load and humans edit, paired with a design system in `DESIGN.md`.

**Long-term ambition.** Every team that clones this kit ships on-brand work without reverse-engineering a PDF.

### Positioning

**Category.** Repo-native brand constitution for product and creative teams.

**Not.** Not a design-tool plugin. Not a marketing agency. Not a vibes deck.

**Audience.** Founders, designers, and builders who ship with AI tools and need shared brand context.

**Audience primary.** Founders and product teams shipping with AI tools

**Audience secondary.** Designers maintaining a design system alongside brand meaning

**Differentiation.** File-based, grayscale-first, dual audience (human guide + agent API).

**Only we.** A starter that ships a filled Sample Brand, a visual guide, and a compiled `brand.json` in one repo.

**Territory.** Clarity over ornament. Plain language over hype.

### Personality

**Archetype.** The Editor

**Archetype drive.** Precision · Clarity · Restraint

**Archetype seeks.** Understanding

**Archetype at best.** Wise · Accessible · Calm · Grounded · Trustworthy

**Archetype at worst.** Aloof · Detached · Complicated · Dismissive

**Archetype motto.** Say the useful thing, then stop.

**Archetype voice.** Knowledgeable · Assured · Guiding

**Attributes.** Clear · Steady · Direct · Respectful · Practical

**Trait scores.** direct: 5 · warm: 3 · playful: 1

**We are.** Plainspoken · Specific · Diff-friendly · Respectful of the reader’s time.

**We are not.** Hype-driven · Vague · Performatively premium · Loud for its own sake

### Promise

**Mission.** Hold brand meaning in the repo so humans and agents share one source of truth.

**Purpose.** We exist to make brand context portable — clear, fast to load, and doable without a design ops team.

**Position.** Repo-native brand constitution for product and creative teams. Not a plugin. Not an agency. Not a vibes deck.

**Promise.** Say what we mean in plain language. Keep visuals quiet so content can lead. Treat agents as first-class readers.

- We will say what we mean in plain language.
- We will keep visual systems quiet so content can lead.
- We will treat agents as first-class readers of this brand.

**Base message.** Clear work, plainly said.

**Synthesizing phrase.** Brand context that lives in the repo and travels with the work.

**Boilerplate short.** Sample Brand is a grayscale starter brand guide for humans and agents.

**Boilerplate long.** Sample Brand is the filled example inside brand-guide: a Strategy / Voice / Visual constitution, DESIGN.md tokens, brand.json for agents, and a Next.js visual guide.

### Message Pillars

| Pillar | Summary | Emotional driver | Functional value | Trust message |
| --- | --- | --- | --- | --- |
| **Clarity** | Cut jargon; name the thing | Relieved | Plain-language copy and UI | You’ll always know what we mean. |
| **Craft** | Care shows in small decisions | Confident | Consistent type, space, contrast | Details aren’t decoration. |
| **Portability** | Brand rules move with the work | Steady | Files agents and humans share | The brand travels with the repo. |

### Guardrails

**Tone summary.** Direct, calm, specific, human.

**The brand cannot be.** Synergy soup · Fake urgency · Empty inspiration · Decorative complexity.

**Litmus test.** If you could swap in any other brand name and the line still works, rewrite it.

---

## Voice

**Act label.** What to say

### Identity

**Identity.** We speak like a careful editor: short sentences, concrete nouns, no theater. We are Sample Brand — the quiet template that shows how a brand should live in a repository.

**Essence.** Say the useful thing, then stop.

### Tagline & Slogans

- **Primary:** Clear work, plainly said.
- Alternatives: Brand context that ships with the work. · Guidelines agents can actually read. · Quiet system, loud clarity.

### Phrases

- Clear work, plainly said.
- If it needs a synonym, it needs a rewrite.
- The brand lives where the work lives.
- Grayscale first; meaning first.
- Specific beats impressive.
- Agents read this file too.
- Ornament is optional; clarity is not.

### Tonal Rules

**Voice pillars.** Direct · Calm · Specific

**Do.** Lead with the user’s job to be done · Prefer short sentences · Use concrete nouns

**Don’t.** Hype without proof · Vague benefits · Corporate euphemism

**Vocabulary use.** build · ship · clear · plain · specific · guide

**Vocabulary never.** synergistic · best-in-class · seamless · revolutionary · unlock your potential

**And / yet pairs**

| Lean | And yet |
| --- | --- |
| Knowledgeable | Humble |
| Direct | Warm |
| Precise | Plain |
| Confident | Quiet |

**Rules**

1. Lead with the user’s job to be done.
2. Prefer short sentences; split compound claims.
3. Use concrete nouns over abstract nouns.
4. Never claim “revolutionary,” “seamless,” or “best-in-class.”
5. Proof before adjectives.
6. One idea per paragraph in marketing copy.
7. Match channel length: social short, docs precise, support patient.
8. When unsure, choose the plainer word.

**Identity boundaries.** We are not a growth-hack voice. We are not ironic. We are not corporate euphemism.

| We Say | We Never Say |
| --- | --- |
| Here’s what changed and why. | Unlock your potential. |
| Ship the brand with the work. | Synergistic brand solutions. |
| Plain language, strong contrast. | Seamless holistic experience. |
| Specific beats impressive. | World-class premium vibes. |

### Tone by context

| Context | Guidance | Example |
| --- | --- | --- |
| Product UI | Short labels; verbs on buttons | Save draft |
| Email | One purpose; clear next step | Your guide preview is ready — open it. |
| Social | One idea; ownable phrase if possible | Clear work, plainly said. |
| Support | Patient, concrete, no blame | Here’s the exact file to update. |
| Incident | Facts first; no spin | We fixed the deploy path at 14:02 UTC. |

---

## Visual

**Act label.** How to say it

Concrete values live in [`DESIGN.md`](DESIGN.md). This section is the brief.

### Colors

**Colors intro.** Grayscale only in the starter. Concrete values live in DESIGN.md. Customize each layer when you adopt the kit.

Semantic roles:

- **Ink** — primary text, key UI chrome (`--color-ink`)
- **Muted** — secondary text (`--color-ink-muted`)
- **Border** — rules and dividers (`--color-border`)
- **Surface** — subtle panels (`--color-surface`)
- **Paper** — page background (`--color-paper`)

Accessibility expectation: body text ≥ 4.5:1 contrast on paper.

### Typography

**Type note.** One grotesque for display and body. Hierarchy through size and weight — not a second decorative face.

**Type primary.** Geist — display and body

**Type fallback.** IBM Plex Sans, system-ui, sans-serif

**Type family.** Geist

**Type specimen display.** Sample Brand

**Type specimen section.** Brand Strategy

**Type specimen lead.** Clear work, plainly said.

**Type specimen body.** Brand context that lives in the repo and travels with the work.

### Photography / Imagery

**Imagery style.** Editorial, natural light, product-in-context.

**Imagery mood.** Focused, calm, confident.

**Imagery tone.** Human, authentic, reflective, hopeful

**Imagery subjects.** Real workspaces, candid crops, product-in-context

**Imagery settings.** Natural light, quiet interiors, honest materials

**Imagery avoid.** Oversaturated stock, fake handshakes, neon gradients

**Imagery prompt product.** Sample Brand guide on desk, natural light, muted neutrals, candid crop --ar 4:5 --style raw

**Imagery prompt lifestyle.** Candid use in real environments, no stock smiles.

**Imagery negative.** oversaturated · generic stock office · neon gradients · purple AI cliché

### Logo / Wordmark

**Logo description.** Wordmark in ink on paper (or reversed on ink). Clearspace ≈ height of the capital S.

**Logo clearspace.** Approximately the height of the capital S

**Logo donts.** Don’t stretch or outline · Don’t add drop shadows · Don’t place on busy photography without a paper panel

### Style

Design keywords: Quiet grid · Strong type · Honest contrast · No ornament for its own sake.

Direction: The identity should communicate system and clarity, not decoration.

---

## Brand ↔ DESIGN.md

| Layer | This file (`brand.md`) | `DESIGN.md` |
| --- | --- | --- |
| Role | Meaning, voice, **why** colors feel on-brand | Tokens, components, **what** to ship |
| Colors | Semantic roles, mood, contrast principles | Hex / CSS variables, usage tables |
| Change rule | Aesthetic or principles change → update `DESIGN.md` | Palette shifts materially → update Visual → Colors here |

### Color ↔ Brand contract

| Brand idea | Semantic role | Token in `DESIGN.md` |
| --- | --- | --- |
| Clarity / focus | Primary text & actions | `--color-ink` |
| Calm surfaces | Page / panels | `--color-paper`, `--color-surface` |
| Quiet structure | Borders / rules | `--color-border` |
| Secondary info | Muted text | `--color-ink-muted` |

---

## Expressions

**Act label.** Where to say it

Where the brand shows up (also rendered in the visual guide):

| Channel | Title | Copy | Sample |
| --- | --- | --- | --- |
| Web | Document-like pages | Brand name as the hero signal. One headline, one supporting line, one quiet system UI — grayscale throughout. | Open the guide |
| Social | Ownable phrases | One idea per post. High-contrast wordmark on paper or ink. Prefer a phrase from the Voice list. | Clear work, plainly said. |
| Print | Decks & handouts | Same type hierarchy. Generous margins. Hairline rules only when they aid reading — never as decoration. | Brand Guide · 2026 |

**Channel web.** Document-like pages; brand name as hero signal

**Channel social.** Short ownable phrases; high-contrast wordmarks

**Channel print.** Same type hierarchy; generous margins

**Channel email.** One purpose; clear next step

---

## Agent

**System prompt base.** You work on behalf of Sample Brand. Prefer plain language. Stay in the grayscale token set unless the user expands the palette.

**Compliance threshold.** 0.85
