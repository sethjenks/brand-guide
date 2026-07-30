---
name: "Sample Brand"
tagline: "Clear work, plainly said."
version: 1
language: en
type: master
---

# Sample Brand

Portable brand constitution and design system for humans and agents. Aesthetic **intent** lives in Strategy / Voice / Visual; concrete tokens live in **Design system** (below).

This file is the **out-of-box default example** for the brand-guide kit — grayscale Sample Brand with every section filled. Copy it to root [`brand.md`](../brand.md) when you want the starter constitution (not only theme tokens). Theme-only reset: `npm run tokens:reset` (splices [`design-system.default.md`](design-system.default.md) into an existing `brand.md`).

Edit root `brand.md` (and `examples.md`, `rules.md`, `templates.md`, `brand/setup.json`). Run `npm run compile` from `guide/` to regenerate `brand.json`, CSS, and `tokens.json`. Do not hand-edit generated outputs.

---

## For agents (LLM)

**First fill (recommended):** If `brand/setup.json` → `intake` is `"pending"`, start with the Branding Exercise in [`intake/brand-intake-questionnaire.md`](../intake/brand-intake-questionnaire.md) — ask one question at a time by default. If the user already has a website URL, brand-guide PDF, or a `brand.md`, set `intake` to `"skipped"` and follow [`intake/populate-from-source.md`](../intake/populate-from-source.md). After fill: update root `brand.md`, `examples.md`, `rules.md`, and `brand/setup.json`; run compile; set `intake` to `"complete"` (or leave `"skipped"`) and `status` to `"populated"` so the cover callout demotes.

When the root file is empty or partially filled and no external source is provided, do **one** of the following:

1. **Populate from context** — Infer from the repo (`README.md`, tokens, marketing copy). Cite sources. Replace placeholders.
2. **Interview** — Ask a short ordered set (mission, audience, differentiation, voice do/don’t, one visual anchor). Then write complete sections.

**Conflict rule.** If Visual intent and Design system values disagree, prefer Strategy / Guardrails / Voice unless the user says the design system wins — then update Visual to match.

Prefer `brand.json` for structured tokens, rules, and labeled examples when present (runtime truth after compile). Prefer `tokens.json` for portable DTCG interchange.

### Section map

| Section | Job | Use when | Skip when | Compiled truth |
| --- | --- | --- | --- | --- |
| **For agents** | Load order, conflict rules, this map | Always first | — | — |
| **Strategy** | Positioning, promise, pillars, guardrails | Pitch, about, “what is this brand?” | Pure UI token tweaks | `brand.json` strategy / guide copy |
| **Voice** | Tone, phrases, do/don’t, tone-by-context | Blog, email, social, UI microcopy, support | Theme-only CSS edits | `brand.json` → voice |
| **Visual** | Aesthetic *intent*: roles, mood, type faces, imagery, logo principles | Design brief, art direction, on-brand feel | You only need hex/CSS values | `brand.json` → visual (narrative) |
| **Color ↔ Brand contract** | Brand ideas → semantic roles → token *names* | Renaming roles, explaining why a color exists | Shipping CSS values | Docs + validation aid |
| **Expressions** | Channel patterns | Channel-specific copy | Token or strategy work | `brand.json` (+ `examples.md` for few-shots) |
| **Agent** | System prompt base, agent labels | Building prompts / agent config | Human-facing marketing | `brand.json` → agent |
| **Design system** | Ship layer: token tables, `:root`, spacing, components | UI, CSS, Figma/DTCG, theme edits | Copy-only or strategy-only tasks | `tokens.generated.css`, `tokens.json`, `brand.json` colors |

### Task slices

| Task | Read in this file | Also read |
| --- | --- | --- |
| Blog / email / social | Voice (+ Expressions if present) | `examples.md` |
| Pitch / positioning | Strategy + Voice | — |
| Landing / marketing UI | Voice + Visual + Design system | `rules.md` for contrast / don’ts |
| App chrome / CSS tokens | Design system (Color / Type / Spacing) | Prefer `tokens.json` or `brand.json` colors after compile |
| Logo / wordmark | Visual → Logo + Design system → Logo (implementation) | `brand/assets/` |
| First fill / intake | Entire file in order | `intake/brand-intake-questionnaire.md` (or `populate-from-source.md` if skipping), then `examples.md`, `rules.md`, `brand/setup.json` |
| Runtime structured read | Prefer compiled artifacts over re-parsing this file | `brand.json`, `tokens.json` |

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

**Solution.** A filled grayscale template: Strategy, Voice, Visual, and Design system tokens in one `brand.md`, plus a visual guide you can open locally.

**Transformation.** Before: fragmented vibe checks. After: one file agents load and humans edit — constitution and tokens together.

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

**Boilerplate long.** Sample Brand is the filled example inside brand-guide: a Strategy / Voice / Visual constitution, Design system tokens, brand.json for agents, and a Next.js visual guide.

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

This section is the brief. Concrete hex / CSS values live in **Design system** below.

### Colors

**Colors intro.** Grayscale only in the starter. Values: Design system → Color tokens. Customize each layer when you adopt the kit.

Semantic roles (token names only):

- **Ink** — primary text, key UI chrome (`--color-ink`)
- **Muted** — secondary text (`--color-ink-muted`)
- **Border** — rules and dividers (`--color-border`)
- **Surface** — subtle panels (`--color-surface`)
- **Paper** — page background (`--color-paper`)

Accessibility expectation: body text ≥ 4.5:1 contrast on paper.

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
| Clarity / focus | Primary text & actions | `--color-ink` |
| Calm surfaces | Page / panels | `--color-paper`, `--color-surface` |
| Quiet structure | Borders / rules | `--color-border` |
| Secondary info | Muted text | `--color-ink-muted` |

When aesthetic principles change, update Visual here and align Design system tokens. When palette hex shifts materially, update Design system first, then confirm this contract still names the right roles.

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

---

<!-- brand-guide:design-system -->
## Design system

Implementation layer for the grayscale **Sample Brand** starter. Strategy / Voice / Visual above are the brief; this section defines **what to ship**: tokens, type scale, spacing, and component notes.

**Theme authoring:** edit this fenced block only. Run `npm run tokens` or `npm run compile` from `guide/`. Canonical token-only reset snapshot: [`design-system.default.md`](design-system.default.md) (same tokens as this block). Reset with `npm run tokens:reset` (replaces this block; leaves Strategy / Voice / Visual untouched).

Compiled outputs (do not hand-edit): `guide/src/styles/tokens.generated.css`, [`tokens.json`](../tokens.json), `guide/public/tokens.json`, and `brand.json` color fields.

### Color tokens

| Token | Value | Usage | Guide |
| --- | --- | --- | --- |
| `--color-ink` | `#111111` | Primary text, key chrome, CTAs | brand |
| `--color-ink-muted` | `#4a4a4a` | Secondary text, captions | secondary |
| `--color-border` | `#d0d0d0` | Dividers, hairlines, input borders | interface |
| `--color-surface` | `#f5f5f5` | Panels, zebra rows, subtle fills | interface |
| `--color-surface-deep` | `#e8e8e8` | Deeper panels, hover fills | interface |
| `--color-paper` | `#ffffff` | Page / content card background | interface |
| `--color-canvas` | `#dcdcdc` | App canvas behind the content card | chrome |
| `--color-rail` | `#e6e6e6` | Sidebar / rail background | chrome |

`Guide` column: `brand` | `secondary` | `interface` | `chrome` (CSS only). New `--color-*` rows default to `interface` unless the name suggests brand/accent.

```css
:root {
  /* Color */
  --color-ink: #111111;
  --color-ink-muted: #4a4a4a;
  --color-border: #d0d0d0;
  --color-surface: #f5f5f5;
  --color-surface-deep: #e8e8e8;
  --color-paper: #ffffff;
  --color-canvas: #dcdcdc;
  --color-rail: #e6e6e6;

  /* Typography */
  --font-sans: var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.75rem;
  --font-size-display: clamp(2.75rem, 6vw, 4.25rem);
  --line-height-body: 1.55;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing & layout */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2.5rem;
  --space-6: 4rem;
  --space-7: 6rem;
  --content-max: 44rem;
  --guide-max: 60rem;

  /* Radius — change --radius-base to soften/sharpen the whole shell */
  --radius-base: 0.5rem;
}
```

**Rules**

- No accent hue in the starter kit.
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
| `color-border` | `color.border` | `#d0d0d0` | Borders |
| `color-surface` | `color.surface` | `#f5f5f5` | Surfaces |
| `color-paper` | `color.paper` | `#ffffff` | Background |

### Type tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--font-sans` | `var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif` | Display + body |
| `--font-size-base` | `1rem` | Body |
| `--font-size-sm` | `0.875rem` | Captions, meta |
| `--font-size-lg` | `1.25rem` | Lead |
| `--font-size-xl` | `1.75rem` | Section titles |
| `--font-size-display` | `clamp(2.75rem, 6vw, 4.25rem)` | Cover / hero brand name |
| `--line-height-body` | `1.55` | Body copy |
| `--font-weight-regular` | `400` | Body |
| `--font-weight-medium` | `500` | Labels |
| `--font-weight-semibold` | `600` | Headings |

**Hierarchy**

1. Display — brand name, cover
2. XL — section titles (Strategy, Voice, Visual)
3. LG — subsection titles
4. Base — body
5. SM — captions, token labels

**Accessibility**

- Min body size: `16px` (`1rem` at default root)
- Min line-height: `1.5`
- Min contrast ratio (body): `4.5`

### Spacing & layout

| Token | Value |
| --- | --- |
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `1rem` |
| `--space-4` | `1.5rem` |
| `--space-5` | `2.5rem` |
| `--space-6` | `4rem` |
| `--space-7` | `6rem` |
| `--content-max` | `44rem` |
| `--guide-max` | `60rem` |
| `--radius-base` | `0.5rem` |

**Radius.** `--radius-base` is the single roundness knob for the app shell. The guide derives `--radius-sm` (½×), `--radius-md` (1×), and `--radius-lg` (1½×) from it in CSS — nav items, panels, swatches, and the content card all track this value. Set to `0` for sharp corners.

Document-like layout: single column for prose; wide enough for swatches and type specimens. Generous vertical rhythm between sections (`--space-6`).

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

1. Prefer this full example ([`brand.default.md`](brand.default.md)) when resetting the whole constitution
2. Prefer [`design-system.default.md`](design-system.default.md) / `npm run tokens:reset` when resetting tokens only
3. Spot-check the guide; color swatches and `brand.json` values sync automatically
<!-- /brand-guide:design-system -->
