---
name: "Sample Brand"
tagline: "Clear work, plainly said."
version: 1
language: en
type: master
---

# Sample Brand

Portable brand constitution and design system for humans and agents. Aesthetic **intent** lives in Strategy / Voice / Visual; concrete tokens live in **Design system** (below).

This is the out-of-box grayscale starter. Canonical copy also lives at [`examples/brand.default.md`](examples/brand.default.md). Edit this file (and `examples.md`, `rules.md`, `templates.md`, `brand/setup.json`). Run `npm run compile` from `guide/` to regenerate `brand.json`, CSS, and `tokens.json`. Do not hand-edit generated outputs.

---

## For agents (LLM)

**First fill (recommended):** If `brand/setup.json` → `intake` is `"pending"`, start with the Branding Exercise in [`intake/brand-intake-questionnaire.md`](intake/brand-intake-questionnaire.md) — ask one question at a time by default. If the user already has a website URL, brand-guide PDF, this `brand.md`, or a Figma design URL, set `intake` to `"skipped"` and follow [`intake/populate-from-source.md`](intake/populate-from-source.md). After fill: update this file, `examples.md`, `rules.md`, and `brand/setup.json`; run compile; set `intake` to `"complete"` (or leave `"skipped"`) and `status` to `"populated"` so the cover callout demotes.

When this file is empty or partially filled and no external source is provided, do **one** of the following:

1. **Branding Exercise** — Run [`intake/brand-intake-questionnaire.md`](intake/brand-intake-questionnaire.md) one question at a time. Save the transcript, then write complete sections.
2. **Populate from context** — Infer from the repo (`README.md`, tokens, marketing copy). Cite sources. Replace placeholders.
3. **Short interview** — If they decline the full exercise, ask a short ordered set (mission, audience, differentiation, voice do/don’t, one visual anchor). Then write complete sections.

**Conflict rule.** If Visual intent and Design system values disagree, prefer Strategy / Guardrails / Voice unless the user says the design system wins — then update Visual to match.

Prefer `brand.json` for structured tokens, rules, and labeled examples when present (runtime truth after compile). Prefer `tokens.json` for portable DTCG interchange.

### Section map

| Section | Job | Use when | Skip when | Compiled truth |
| --- | --- | --- | --- | --- |
| **For agents** | Load order, conflict rules, this map | Always first | — | — |
| **Strategy** | Positioning, promise, pillars, guardrails | Pitch, about, “what is this brand?” | Pure UI token tweaks | `brand.json` strategy / guide copy → guide **Strategy** |
| **Voice** | Tone, phrases, do/don’t, tone-by-context | Blog, email, social, UI microcopy, support | Theme-only CSS edits | `brand.json` → voice → guide **Language** |
| **Visual** | Aesthetic *intent*: roles, mood, type faces, imagery, logo principles | Design brief, art direction, on-brand feel | You only need hex/CSS values | `brand.json` → visual → guide **Logo / Typography / Color / Photography** |
| **Color ↔ Brand contract** | Brand ideas → semantic roles → token *names* | Renaming roles, explaining why a color exists | Shipping CSS values | Docs + validation aid |
| **Expressions** | Channel patterns | Channel-specific copy | Token or strategy work | `brand.json` (+ `examples.md` for few-shots) → guide **Applications** |
| **Agent** | System prompt base, agent labels | Building prompts / agent config | Human-facing marketing | `brand.json` → agent |
| **Design system** | Ship layer: token tables, `:root`, spacing, components | UI, CSS, Figma/DTCG, theme edits | Copy-only or strategy-only tasks | `tokens.generated.css`, `tokens.json`, `brand.json` colors → guide **System** (partial) |

The human-facing guide is organized as nine brand-book chapters (Strategy, Language, Logo, Typography, Color, Photography, System, Animation, Applications). Authoring headings in this file stay Strategy / Voice / Visual / Expressions / Design system; the shell maps compiled fields into those chapters.

### Task slices

| Task | Read in this file | Also read |
| --- | --- | --- |
| Blog / email / social | Voice (+ Expressions if present) | `examples.md`; chapter work: [`skills/language/SKILL.md`](skills/language/SKILL.md) |
| Pitch / positioning | Strategy + Voice | [`skills/strategy/SKILL.md`](skills/strategy/SKILL.md) |
| Landing / marketing UI | Voice + Visual + Design system | `rules.md` for contrast / don’ts |
| App chrome / CSS tokens | Design system (Color / Type / Spacing) | Prefer `tokens.json` or `brand.json` colors after compile; [`skills/color/SKILL.md`](skills/color/SKILL.md) / [`skills/typography/SKILL.md`](skills/typography/SKILL.md) |
| Logo / wordmark | Visual → Logo + Design system → Logo (implementation) | `brand/assets/`; [`skills/logo/SKILL.md`](skills/logo/SKILL.md) |
| Photography / imagery | Visual → Photography / Imagery | [`skills/photography/SKILL.md`](skills/photography/SKILL.md) |
| One guide chapter | Matching section | [`skills/`](skills/README.md) (`skills/<id>/SKILL.md` + op) |
| First fill / intake | Entire file in order | `intake/brand-intake-questionnaire.md` (or `populate-from-source.md` if skipping), then `examples.md`, `rules.md`, `brand/setup.json` — chapter skills after intake |
| Runtime structured read | Prefer compiled artifacts over re-parsing this file | `brand.json`, `tokens.json` |

---

## Strategy

**Act label.** Strategy

### Overview

**What.** Sample Brand is a starter brand constitution for teams who want guidelines agents can read and humans can trust — without hunting PDFs.

**Origin.** Built as the default grayscale template inside this brand-guide kit so teams start from a finished example, not blank scaffolds.

**What it really does.** It holds meaning (why we sound and look a certain way) so product, marketing, and agents share one source of truth.

**Problem.** Brand rules live in slide decks and tribal knowledge. Agents invent tone; humans disagree about “on brand.”

**Current.** Teams paste guidelines into every prompt, or ship generic creative and hope it sticks.

**Opportunity.** Keep meaning in the repo — one file agents load, one design system they implement.

**Solution.** A filled grayscale template: Strategy, Voice, Visual, and Design system tokens in one `brand.md`, plus a visual guide you can open locally.

**Transformation.** Before: fragmented vibe checks. After: one file agents load and humans edit — constitution and tokens together.

**Vision intro.** Where we are headed — the long-term ambition that keeps strategy, product, and creative pointed at the same horizon.

**Long-term ambition.** Every team that clones this kit ships on-brand work without reverse-engineering a PDF.

### Positioning

**Positioning intro.** A succinct expression of our core business activity and what sets us apart. This statement helps align marketing efforts with our brand and value proposition.

**Category.** Repo-native brand constitution for product and creative teams.

**Not.** Not a design-tool plugin. Not a marketing agency. Not a vibes deck.

**Audience.** Founders, designers, and builders who ship with AI tools and need shared brand context.

**Audience primary.** Founders and product teams shipping with AI tools

**Audience secondary.** Designers maintaining a design system alongside brand meaning

**Differentiation.** File-based, grayscale-first, dual audience (human guide + agent API).

**Only we.** A starter that ships a filled Sample Brand, a visual guide, and a compiled `brand.json` in one repo.

**Territory.** Clarity over ornament. Plain language over hype.

### Audience

**Audience intro.** A closer look at the groups of people that help our business thrive. We should consider who they are and how they think when we make decisions about design and messaging.

| Segments | Wants | Needs |
| --- | --- | --- |
| Founders · Product teams · AI builders | A shared brand context that travels with the work — not another PDF to hunt when shipping with agents. | Plain rules they can load once, trust, and apply without a design ops team. |
| Designers · Design-system leads · Brand owners | Meaning and tokens in the same place so visual decisions stay tied to voice and strategy. | Clear do/don’t guidance, grayscale-first tokens, and a guide that shows the system in use. |
| Agents · Cursor workflows · Automation | Structured brand facts they can retrieve without inventing tone or palette. | Stable `brand.json`, retrieval tags, and copy that fails a litmus test when it could belong to anyone. |

### Personality

**Archetype.** The Editor

**Archetype drive.** Precision · Clarity · Restraint

**Archetype seeks.** Understanding

**Archetype at best.** Wise · Accessible · Calm · Grounded · Trustworthy

**Archetype at worst.** Aloof · Detached · Complicated · Dismissive

**Archetype motto.** Say the useful thing, then stop.

**Archetype voice.** Knowledgeable · Assured · Guiding

**Personality intro.** A unique set of characteristics that make our brand feel truly human. We strive to maintain this personality in all of our communications.

**Attributes.** Clear · Steady · Direct · Respectful · Practical

**Trait scores.** direct: 5 · warm: 3 · playful: 1

**We are.** Plainspoken · Specific · Diff-friendly · Respectful of the reader’s time.

**We are not.** Hype-driven · Vague · Performatively premium · Loud for its own sake

| Trait | Description |
| --- | --- |
| Clear | Prefer the plain word. If a line needs a decoder ring, rewrite it until it can only mean one thing. |
| Steady | Keep the same register across product, docs, and agents — no sudden hype spikes or mood swings. |
| Direct | Lead with the useful fact. Cut throat-clearing, fake urgency, and ornamental setup. |
| Respectful | Assume the reader is busy and capable. Earn attention; don’t perform for it. |

Copy a `#### Primary|Secondary|Tertiary archetype` block below for each wheel selection. Keep **Wheel.** aligned with a classic archetype id (or alias) so the guide can emphasize the ring.

#### Primary archetype

**Name.** Editor / Sage

**Wheel.** Sage

**Motivations.** Seeking understanding

**Personality narrative.** The Editor wants clarity that lasts — cutting noise so the useful thing remains. They distrust jargon and theater, and believe restraint is a form of respect. At their best they make complex work feel simple; at their worst they can sound aloof or over-precise.

**Quote.** Say the useful thing, then stop.

**Drive.** Precision · Clarity · Restraint · Understanding · Craft

**Fears.** Ambiguity · Noise · Hype · Performative complexity · Vague inspiration

**Strategy.** Cut to the useful thing · Prefer concrete nouns · Edit until the line can only mean one thing

**Voice.** Knowledgeable · Assured · Guiding · Direct · Calm

**Seeks.** Understanding

**Motto.** Say the useful thing, then stop. · Clear work, plainly said.

**Audience feels.** Relieved · Oriented · Respected · Steady · Clear-headed

**Brands.** Strunk & White · The Economist · Notion docs done well

**At best.** Wise · Accessible · Calm · Grounded · Trustworthy

**At worst.** Aloof · Detached · Complicated · Dismissive

**Characters.** The careful editor · The reference librarian · The senior who deletes the flourish

**Types.** Editor · Guide · Critic · Analyst

**Types highlighted.** Editor · Guide

<!--
#### Secondary archetype

**Name.** Creator / Maker
**Wheel.** Creator
**Motivations.** Seeking innovation
**Personality narrative.** …
**Quote.**
**Drive.** …
**Fears.** …
**Strategy.** …
**Voice.** …
**Seeks.** Innovation
**Motto.** …
**Audience feels.** …
**Brands.** …
**At best.** …
**At worst.** …
**Characters.** …
**Types.** …
**Types highlighted.** …

#### Tertiary archetype

**Name.** Outlaw / Revolutionary / Maverick
**Wheel.** Rebel
…same fields as Primary…
-->

### Promise

**Mission intro.** Why we exist in practical terms — the job we do every day for the people who depend on this brand.

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

**Boilerplate long.** Sample Brand is the filled example inside brand-guide: a Strategy / Voice / Visual constitution, Design system tokens, brand.json for agents, and a Next.js visual guide.

### Message Pillars

**Values intro.** The beliefs we return to when design and messaging decisions get hard — short enough to remember, sharp enough to choose.

**Pillars intro.** The message pillars that carry strategy into copy, product, and campaigns — each one a shorthand for what we stand on.

| Pillar | Summary | Emotional driver | Functional value | Trust message |
| --- | --- | --- | --- | --- |
| **Clarity** | Cut jargon; name the thing | Relieved | Plain-language copy and UI | You’ll always know what we mean. |
| **Craft** | Care shows in small decisions | Confident | Consistent type, space, contrast | Details aren’t decoration. |
| **Portability** | Brand rules move with the work | Steady | Files agents and humans share | The brand travels with the repo. |

### Guardrails

**Guardrails intro.** Hard edges for agents and humans — what we sound like, what we refuse, and the test that keeps us on-brand.

**Tone summary.** Direct, calm, specific, human.

**The brand cannot be.** Synergy soup · Fake urgency · Empty inspiration · Decorative complexity.

**Litmus test.** If you could swap in any other brand name and the line still works, rewrite it.

---

## Voice

**Act label.** Language

### Identity

**Identity.** We speak like a careful editor: short sentences, concrete nouns, no theater. We are Sample Brand — the quiet template that shows how a brand should live in a repository.

**Essence.** Say the useful thing, then stop.

#### Voice spectrum

**Spectrum intro.** Where this brand sits on volume, energy, sociability, and attitude — the range we inhabit, not the extremes we avoid.

Mark the brand’s range with **From** / **To** (labels must match the shell spectrum steps). **Notes** sit under the table in the guide.

| Dimension | From | To | Notes |
| --- | --- | --- | --- |
| Volume | Inside voices | Inside voices | Quiet, measured; never loud for its own sake. |
| Energy | Relaxed | Going for a stroll | Calm confidence; purposeful, not frantic. |
| Sociability | Just in the family | Friends & family | Clear for the people who need it — not a party brand. |
| Attitude | Opinionated when needed | Opinionated when needed | Direct when it matters; never polarizing for sport. |

### Principles

**Principles intro.** Refer to these language principles when authoring written content. These principles cover tone of voice and the subject matter that matters in the brand, products, and services.

| Principle | Description | Do | Don't |
| --- | --- | --- | --- |
| Say the useful thing, then stop. | Cut to the job the reader needs done. Short sentences, concrete nouns, no theater — then leave the rest unsaid. | Lead with the change and why it matters. | Pad the point with hype, throat-clearing, or synonym stacks. |
| Specific beats impressive. | Prefer the exact noun over the polished adjective. Proof before flourish; if a line could belong to any brand, rewrite it. | Name the file, the step, or the outcome. | Claim seamless, revolutionary, or best-in-class without evidence. |

### Tagline & Slogans

**Tagline intro.** An external piece of language that sums up our brand promise in a few memorable words.

- **Primary:** Clear work, plainly said.
- Alternatives: Brand context that ships with the work. · Guidelines agents can actually read. · Quiet system, loud clarity.

### Story

**Story intro.** Our story is an external tool that translates our core beliefs and reason for being.

**Story long.** Brand work used to live in decks, Notion pages, and tribal memory — then vanish the moment a new hire or an agent needed it. Sample Brand exists so meaning stays where the work stays: in the repo. We started with a grayscale starter on purpose. Color and flourish can wait; clarity cannot. Strategy, language, and visual rules compile into files humans browse and agents read, so every surface — product UI, email, support — can pull from the same constitution. We are not a plugin and not an agency. We are the quiet template that shows how a brand should travel with the work.

**Story medium.** Brand context used to scatter across decks and chat threads. Sample Brand keeps it in the repo — Strategy, Language, and Visual rules that compile for humans and agents alike. Grayscale first; meaning first. Clear work, plainly said.

**Story short.** Sample Brand keeps brand meaning in the repo so humans and agents share one source of truth.

### Headlines

**Headlines intro.** Short, ownable lines for campaigns, product, and empty states — voice first, benefit clear.

- Clear work, plainly said.
- The brand lives where the work lives.
- Specific beats impressive.
- Ornament is optional; clarity is not.

### Calls to action

**CTA intro.** Clarity and brevity in wording calls to action is critical. Avoid ambiguous actions or drawn-out phrasing. Use action verbs.

| Do | Don't |
| --- | --- |
| Save draft | Click here |
| Open the guide | Learn more |
| Ship with the work | Get started now |
| Copy token | Unlock your potential |

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

**And yet intro.** Tension pairs that keep the voice from tipping into a single trait — lean into one pole, then balance with the other.

| Lean | Bridge | And yet | Phrase |
| --- | --- | --- | --- |
| Knowledgeable | yet | Humble | Clear work, plainly said. |
| Direct | yet | Warm | Specific beats impressive. |
| Precise | yet | Plain | If it needs a synonym, it needs a rewrite. |
| Confident | yet | Quiet | Grayscale first; meaning first. |

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

**Context intro.** How the voice flexes by channel — same principles, different length and urgency.

| Context | Guidance | Example |
| --- | --- | --- |
| Product UI | Short labels; verbs on buttons | Save draft |
| Email | One purpose; clear next step | Your guide preview is ready — open it. |
| Social | One idea; ownable phrase if possible | Clear work, plainly said. |
| Support | Patient, concrete, no blame | Here’s the exact file to update. |
| Incident | Facts first; no spin | We fixed the deploy path at 14:02 UTC. |

---

## Visual

**Act label.** Visual

This section is the brief. Concrete hex / CSS values live in **Design system** below.

### Colors

**Colors intro.** Grayscale starter with a 12-step interface scale (Radix-style). Values: Design system → Color tokens. Swap the scale for your Radix (or equivalent) palette when you adopt the kit.

Semantic roles (token names only; required in Design system):

- **Primary text** — body, headings, key chrome (`--color-ink`); theme accent defaults to ink (optional `--color-accent` when CTA must diverge)
- **Secondary text** — supporting copy, captions (`--color-ink-muted`)
- **Tertiary text** — meta, timestamps, placeholders (`--color-ink-subtle`)
- **Border** — rules and dividers (`--color-border`)
- **Surface** — subtle panels (`--color-surface`)
- **Surface deep** — deeper panels, muted fills (`--color-surface-deep`)
- **Paper** — content card / page surface (`--color-paper`)
- **Canvas** — app canvas behind the content card (`--color-canvas`)

Accessibility expectation: primary and secondary body text ≥ 4.5:1 on paper; tertiary ≥ 4.5:1 when used at body size.

### Typography

**Type note.** One grotesque for display and body. Hierarchy through size and weight — not a second decorative face. Scale tokens: Design system → Type tokens.

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

**Logo description.** Wordmark in ink on paper (or reversed on ink). Clearspace ≈ height of the capital S. Implementation: Design system → Logo (implementation).

**Logo clearspace.** Approximately the height of the capital S

**Logo donts.** Don’t stretch or outline · Don’t add drop shadows · Don’t place on busy photography without a paper panel

### Style

Design keywords: Quiet grid · Strong type · Honest contrast · No ornament for its own sake.

Direction: The identity should communicate system and clarity, not decoration.

### Color ↔ Brand contract

| Brand idea | Semantic role | Token name |
| --- | --- | --- |
| Clarity / focus | Primary text & actions (accent = ink) | `--color-ink` |
| Calm surfaces | Content card / page surface | `--color-paper` |
| Subtle panels | Panels, zebra rows | `--color-surface` |
| Deeper wash | Muted fills, hover grounds | `--color-surface-deep` |
| App chrome | Canvas behind the content card | `--color-canvas` |
| Quiet structure | Borders / rules | `--color-border` |
| Secondary info | Supporting copy | `--color-ink-muted` |
| Tertiary meta | Timestamps, placeholders | `--color-ink-subtle` |

When aesthetic principles change, update Visual here and align Design system tokens. When palette hex shifts materially, update Design system first, then confirm this contract still names the right roles. Compile fails if any required role above is missing from Design system.

---

## Expressions

**Act label.** Applications

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

---

<!-- brand-guide:design-system -->
## Design system

Implementation layer for the grayscale **Sample Brand** starter. Strategy / Voice / Visual above are the brief; this section defines **what to ship**: tokens, type scale, spacing, and component notes.

**Theme authoring:** edit this fenced block only. Run `npm run tokens` or `npm run compile` from `guide/`. Canonical token-only reset snapshot: [`examples/design-system.default.md`](examples/design-system.default.md) (same tokens as this block). Reset with `npm run tokens:reset` (replaces this block; leaves Strategy / Voice / Visual untouched).

Compiled outputs (do not hand-edit): `guide/src/styles/tokens.generated.css`, [`tokens.json`](tokens.json), `guide/public/tokens.json`, and `brand.json` color fields.

### Color tokens

| Token | Value | Usage | Guide |
| --- | --- | --- | --- |
| `--color-ink` | `#111111` | Primary text, key chrome, CTAs | brand |
| `--color-ink-muted` | `#4a4a4a` | Secondary text, captions | secondary |
| `--color-ink-subtle` | `#6b6b6b` | Tertiary text, meta, placeholders | secondary |
| `--color-gray-1` | `#fcfcfc` | App background | interface |
| `--color-gray-2` | `#f9f9f9` | Subtle background | interface |
| `--color-gray-3` | `#f0f0f0` | UI element background | interface |
| `--color-gray-4` | `#e8e8e8` | Hovered UI element background | interface |
| `--color-gray-5` | `#e0e0e0` | Active / selected UI element background | interface |
| `--color-gray-6` | `#d9d9d9` | Subtle borders and separators | interface |
| `--color-gray-7` | `#cecece` | UI element border and focus rings | interface |
| `--color-gray-8` | `#bbbbbb` | Hovered UI element border | interface |
| `--color-gray-9` | `#8d8d8d` | Solid backgrounds | interface |
| `--color-gray-10` | `#838383` | Hovered solid backgrounds | interface |
| `--color-gray-11` | `#646464` | Low-contrast text | interface |
| `--color-gray-12` | `#202020` | High-contrast text | interface |
| `--color-border` | `#d0d0d0` | Dividers, hairlines, input borders | chrome |
| `--color-surface` | `#f5f5f5` | Panels, zebra rows, subtle fills | chrome |
| `--color-surface-deep` | `#e8e8e8` | Deeper panels, hover fills | chrome |
| `--color-paper` | `#ffffff` | Page / content card background | chrome |
| `--color-canvas` | `#dcdcdc` | App canvas behind the content card | chrome |
| `--color-rail` | `#e6e6e6` | Sidebar / rail background | chrome |

`Guide` column: `brand` | `secondary` | `interface` | `chrome` (CSS only). Interface is the 12-step Radix-style scale shown in the guide; semantic aliases (`paper`, `surface`, …) stay `chrome` for theme CSS. New `--color-*` rows default to `interface` unless the name suggests brand/accent.

```css
:root {
  /* Color */
  --color-ink: #111111;
  --color-ink-muted: #4a4a4a;
  --color-ink-subtle: #6b6b6b;
  --color-gray-1: #fcfcfc;
  --color-gray-2: #f9f9f9;
  --color-gray-3: #f0f0f0;
  --color-gray-4: #e8e8e8;
  --color-gray-5: #e0e0e0;
  --color-gray-6: #d9d9d9;
  --color-gray-7: #cecece;
  --color-gray-8: #bbbbbb;
  --color-gray-9: #8d8d8d;
  --color-gray-10: #838383;
  --color-gray-11: #646464;
  --color-gray-12: #202020;
  --color-border: #d0d0d0;
  --color-surface: #f5f5f5;
  --color-surface-deep: #e8e8e8;
  --color-paper: #ffffff;
  --color-canvas: #dcdcdc;
  --color-rail: #e6e6e6;

  /* Typography — --type-base / --type-ratio derive sm/base/lg/xl on compile */
  --font-sans: var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif;
  --type-base: 16;
  --type-ratio: 1.2;
  --font-size-display: clamp(2.75rem, 6vw, 4.25rem);
  --font-size-h0: clamp(4.5rem, 14vw, 9rem);
  --line-height-body: 1.55;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing — --space-unit derives --space-1…7 on compile (document rhythm) */
  --space-unit: 0.25rem;
  --content-max: 65ch;
  --guide-max: 60rem;

  /* Radius — change --radius-base to soften/sharpen the whole shell */
  --radius-base: 0.5rem;
}
```

**Rules**

- No accent hue in the starter kit (omit `--color-accent` so theme accent equals ink). Author `--color-accent` when CTAs must diverge from primary text.
- Body text on `--color-paper` must meet WCAG AA (≥ 4.5:1). Ink on paper exceeds AAA.
- Prefer these tokens for marketing and UI; add new semantic tokens here before using one-off hex in CSS.

**DTCG / agent names (compiled)**

Edit tokens in the tables above (and the `:root` block). On `npm run compile`:

- CSS custom properties → `guide/src/styles/tokens.generated.css`
- Agent color map → `brand.json` (`color-ink`, …)
- DTCG export → `tokens.json` (`color.ink`, …) and `guide/public/tokens.json`

Do not hand-edit `tokens.json` or `brand.json`. Theme authoring stays in this Design system section.

| Agent key | DTCG path | Value | Usage |
| --- | --- | --- | --- |
| `color-ink` | `color.ink` | `#111111` | Primary text / CTA |
| `color-ink-muted` | `color.ink-muted` | `#4a4a4a` | Secondary text |
| `color-ink-subtle` | `color.ink-subtle` | `#6b6b6b` | Tertiary text |
| `color-border` | `color.border` | `#d0d0d0` | Borders |
| `color-surface` | `color.surface` | `#f5f5f5` | Surfaces |
| `color-paper` | `color.paper` | `#ffffff` | Background |

### Type tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--font-sans` | `var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif` | Display + body |
| `--type-base` | `16` | Modular scale base (px); compiles to Astryx `typography.scale.base` and `--font-size-*` steps |
| `--type-ratio` | `1.2` | Modular scale ratio; compiles to Astryx `typography.scale.ratio` |
| `--font-size-display` | `clamp(2.75rem, 6vw, 4.25rem)` | Cover / hero brand name (authored fluid) |
| `--font-size-h0` | `clamp(4.5rem, 14vw, 9rem)` | Chapter openers (authored fluid) |
| `--line-height-body` | `1.55` | Body copy |
| `--font-weight-regular` | `400` | Body |
| `--font-weight-medium` | `500` | Labels |
| `--font-weight-semibold` | `600` | Headings |

**Derived on compile** (do not hand-author): `--font-size-sm`, `--font-size-base`, `--font-size-lg`, `--font-size-xl` via geometric steps `base × ratio^n` (same formula as Astryx `expandTypeScale`).

**Hierarchy**

1. H0 — chapter openers (inverted ink panels)
2. Display — brand name, cover
3. XL — section titles (derived)
4. LG — subsection titles (derived)
5. Base — body (derived)
6. SM — captions, token labels (derived)

**Accessibility**

- Min body size: `16px` (`--type-base` at default root)
- Min line-height: `1.5`
- Min contrast ratio (body): `4.5`

### Spacing & layout

| Token | Value |
| --- | --- |
| `--space-unit` | `0.25rem` |
| `--content-max` | `65ch` (prose measure ≈ 65–75 characters) |
| `--guide-max` | `60rem` |
| `--radius-base` | `0.5rem` |

**Derived on compile** (do not hand-author): `--space-1`…`--space-7` as `unit × [1, 2, 4, 6, 10, 16, 24]`. Document rhythm for guide CSS (`--section-gap` builds on `--space-6`) — not Astryx UI `--spacing-*`.

**Radius.** `--radius-base` is the single roundness knob. Compile emits `radiusBasePx` into the Astryx theme; Astryx expands semantic radii (`inner`, `element`, `container`, `page`). Set to `0` for sharp corners.

Document-like layout: single column for prose. Constrain readable copy to `--content-max` (≈ 65 characters) so lines stay in the 65–75 character comfort range; grids, swatches, and specimens may span wider. Generous vertical rhythm between sections (`--space-6`).

App chrome sizes (`--chrome-h`, `--sidebar-w`, `--workspace-pad`) live in `guide/src/app/globals.css` and are not themed from this section.

### Components

| Component | Guidance |
| --- | --- |
| Primary button | Ink fill, paper text; no rounded-full pills |
| Secondary button | Paper fill, ink text, `1px` border |
| Links | Ink, underline on hover; no accent color |
| Cards | Prefer none. Use only when the container is interactive |
| Dividers | `--color-border` hairlines |
| Code / tokens | Surface background, mono optional |

### Logo (implementation)

- Default: ink wordmark on paper
- Inverse: paper wordmark on ink
- Min clearspace: `1em` of the wordmark height
- Export SVG preferred; PNG fallback with transparent background

### Sync checklist

When restoring or editing the default:

1. Prefer [`examples/brand.default.md`](examples/brand.default.md) when resetting the whole constitution
2. Prefer [`examples/design-system.default.md`](examples/design-system.default.md) / `npm run tokens:reset` when resetting tokens only
3. Spot-check the guide; color swatches and `brand.json` values sync automatically
<!-- /brand-guide:design-system -->
