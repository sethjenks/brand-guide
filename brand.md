---
name: "Sunset"
tagline: "Find what they left behind."
version: 1
language: en
type: master
---

# Sunset

Portable brand constitution and design system for humans and agents. Aesthetic **intent** lives in Strategy / Voice / Visual; concrete tokens live in **Design system** (below).

Populated from the live marketing site (https://www.hellosunset.com) on 2026-08-22. Inventory: [`resources/transcripts/populate-sunset-inventory.md`](resources/transcripts/populate-sunset-inventory.md). Edit this file (and `examples.md`, `rules.md`, `templates.md`, `brand/setup.json`). Run `npm run compile` from `guide/` to regenerate `brand.json`, CSS, and `tokens.json`. Do not hand-edit generated outputs.

---

## For agents (LLM)

**First fill (recommended):** If `brand/setup.json` → `intake` is `"pending"`, load [`intake/skills/README.md`](intake/skills/README.md) and run [`intake/skills/questionnaire/SKILL.md`](intake/skills/questionnaire/SKILL.md) (question bank: [`intake/brand-intake-questionnaire.md`](intake/brand-intake-questionnaire.md)) — ask one question at a time by default. If the user already has a website URL, brand-guide PDF, this `brand.md`, DESIGN.md, or a Figma design URL, set `intake` to `"skipped"` and follow the routing table in [`intake/skills/README.md`](intake/skills/README.md) (slim entry: [`intake/populate-from-source.md`](intake/populate-from-source.md)). After fill: update this file, `examples.md`, `rules.md`, and `brand/setup.json`; run compile; set `intake` to `"complete"` (or leave `"skipped"`) and `status` to `"populated"` so the cover callout demotes.

When this file is empty or partially filled and no external source is provided, do **one** of the following:

1. **Branding Exercise** — Run [`intake/skills/questionnaire/SKILL.md`](intake/skills/questionnaire/SKILL.md) one question at a time. Save the transcript, then write complete sections.
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
| **Visual** | Aesthetic *intent*: roles, mood, type faces, imagery, logo principles, motion | Design brief, art direction, on-brand feel | You only need hex/CSS values | `brand.json` → visual → guide **Logo / Typography / Color / Photography**; `guide.animation` → **Animation** |
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
| Animation / motion | Visual → Animation / Motion | [`skills/animation/SKILL.md`](skills/animation/SKILL.md) |
| One guide chapter | Matching section | [`skills/`](skills/README.md) (`skills/<id>/SKILL.md` + op) |
| First fill / intake | Entire file in order | [`intake/skills/README.md`](intake/skills/README.md) (questionnaire or matching path skill), then `examples.md`, `rules.md`, `brand/setup.json` — chapter skills after intake |
| Runtime structured read | Prefer compiled artifacts over re-parsing this file | `brand.json`, `tokens.json` |

---

## Strategy

**Act label.** Strategy

### Overview

**What.** Sunset is an estate-settlement platform that finds and secures the accounts, assets, and debts a loved one left behind.

**Origin.** Sunset Software, Inc. was founded in 2024 in Salt Lake City by Stephen Walter (Co-founder and CEO, a practicing attorney) and Kaela Worthen (Co-founder, previously led payments and fintech product at Podium). They built Sunset after each personally settled a loved one’s estate — Stephen after his father-in-law died; Kaela while helping her husband itemize his parents’ assets. Sunset is the second company they built together.

**What it really does.** It finds every financial account, debt, and asset of a deceased person, then helps families and the professionals who serve them close, transfer, and distribute what was found — without charging the family.

**Problem.** After a death, families sort mail for months, wait for creditors to call, search devices for unknown accounts, and never know if they found it all — while putting the deceased at risk of fraud.

**Current.** Most estates in the U.S. are still settled by hand: forms typed and retyped, balances written on legal pads, banks that take months to release funds, and companies that charge grieving families thousands of dollars or a percentage of the estate.

**Opportunity.** Give every family a complete picture on the day after — not the year after — and keep them in control of every next step.

**Solution.** Automated search across government, credit, and banking sources; county-specific probate documents in all 50 states and 3,000+ counties; an FDIC-insured estate bank account; assisted closures and transfers; then distribution to heirs. Free for families. Paid by bank partners and by Sunset Pro.

**Transformation.** Before: months of phone calls and the fear of unknown bills. After: a complete inventory, clear next steps, and nothing that moves without your approval.

**Vision intro.** Where we are headed — the long-term ambition that keeps strategy, product, and creative pointed at the same horizon.

**Long-term ambition.** Do for estate settlement what TurboTax did for taxes: asset discovery, creditor notification, closures, tax filings, court submissions, and distributions — handled with care, finished in weeks instead of years.

### Positioning

**Positioning intro.** A succinct expression of our core business activity and what sets us apart. This statement helps align marketing efforts with our brand and value proposition.

**Category.** Estate settlement platform for families and the professionals who serve them.

**Not.** Not a probate law firm. Not a fee-extracting “after-loss” bill. Not a percentage of the estate.

**Audience.** Family members, executors, administrators, and personal representatives settling an estate — and probate attorneys, licensed fiduciaries, trustees, aftercare specialists, and funeral homes who do this work with them.

**Audience primary.** Families, executors, and personal representatives settling an estate themselves

**Audience secondary.** Probate attorneys, licensed fiduciaries, trustees, aftercare specialists, and funeral homes

**Differentiation.** Free for families in all 50 states and U.S. territories; paid by receiving banks and by Pro subscriptions, not by the estate; silent discovery (institutions are not notified during search except life insurance).

**Only we.** The family-facing suite — search, probate documents, closures, transfers, and estate bank account setup — stays free because banks pay a referral fee when assets move and professionals pay for Sunset Pro.

**Territory.** Clarity after a loss. Completeness over guesswork. The family stays in control.

### Audience

**Audience intro.** A closer look at the groups of people that help our business thrive. We should consider who they are and how they think when we make decisions about design and messaging.

| Segments | Wants | Needs |
| --- | --- | --- |
| Families · Executors · Personal representatives | To find every account without months of mail and phone trees — and to know nothing moves unless they say so. | A free, complete inventory; probate papers for their county; an estate account they control; help closing what was found. |
| Probate attorneys · Licensed fiduciaries · Trustees | A comprehensive estate asset inventory so they can choose the right probate path and file without surprises. | Richer account detail, due-diligence records, exports, and a client-approval workflow before a search runs. |
| Funeral homes · Aftercare specialists | One less thing for families to worry about after the service. | Free materials for family packets and a path that costs the family nothing. |

### Personality

**Archetype.** The Caregiver *(inferred — the site never names an archetype; see coverage)*

**Archetype drive.** Service · Compassion · Protection · Generosity

**Archetype seeks.** Service

**Archetype at best.** Compassionate · Generous · Protective · Trustworthy

**Archetype at worst.** Martyring · Intrusive · Enabling · Over-promising

**Archetype motto.** Here with you.

**Archetype voice.** Warm · Supportive · Reassuring · Patient

**Personality intro.** A unique set of characteristics that make our brand feel truly human. We strive to maintain this personality in all of our communications.

**Attributes.** Guided · Specific · Patient · Honest about money · In your control

**Trait scores.** direct: 4 · warm: 5 · playful: 1

**We are.** Step-by-step · Specific about accounts and next steps · Patient with grief · Honest about how we get paid · Protective of the deceased and the family.

**We are not.** Fee-extracting · Fake-urgent · Corporate euphemism · Grief theater · Silent about revenue

| Trait | Description |
| --- | --- |
| Guided | One question at a time. Always say what comes next. |
| Specific | Name the account type, the county, the document, the fee source. |
| Patient | Families go as fast or as slow as they want. Nothing moves without approval. |
| Honest about money | Say we are paid by banks and by Pro — never hide the model. |
| In your control | The estate bank account is theirs. Search stays private until they request closure. |

Copy a `#### Primary|Secondary|Tertiary archetype` block below for each wheel selection. Keep **Wheel.** aligned with a classic archetype id (or alias) so the guide can emphasize the ring.

#### Primary archetype

**Name.** Caregiver

**Wheel.** Caregiver

**Motivations.** Provide structure

**Personality narrative.** Sunset sits with people on the worst week of their lives and does the financial work so they can grieve. The site never names an archetype; Caregiver is inferred from “felt cared for,” “less scary,” “guided the whole way,” and the About letter (“Here with you”). At best that is protection and permission to rest; at worst it could over-promise or take over. Human review required.

**Quote.** Here with you.

**Drive.** Service · Compassion · Protection · Completeness · Control stays with the family

**Fears.** Unknown bills · Missed accounts · Fraud against the deceased · Charging a grieving family

**Strategy.** Find everything · Stay free for families · Nothing moves without approval

**Voice.** Warm · Supportive · Reassuring · Patient · Specific

**Seeks.** Service

**Motto.** Here with you. · Find what they left behind.

**Audience feels.** Cared for · Safe · Guided · Less scared · In control

**Brands.** (not claimed on the site — do not invent peer brands)

**At best.** Compassionate · Generous · Protective

**At worst.** Martyring · Intrusive · Enabling

**Characters.** The friend who sits at the kitchen table · The attorney who translates the bank · The product person who makes money move safely

**Types.** Helper · Guide · Guardian

**Types highlighted.** Helper · Guide

### Promise

**Mission intro.** Why we exist in practical terms — the job we do every day for the people who depend on this brand.

**Mission.** Find every account, asset, and debt a loved one left behind, then help families claim and close them — free.

**Purpose.** Families should be able to grieve without a second job, and without writing a check to clean up the financial life of someone they just lost.

**Position.** Estate settlement platform. Free for families. Paid by banks and by professionals. Not a law firm. Not a percentage of the estate.

**Promise.** If it exists, we’ll find it. You stay in control. You keep the money.

- We will find and secure the accounts, assets, and debts they left behind.
- We will not charge families a fee or take a percentage of the estate.
- We will not move anything forward without your approval.

**Base message.** Find what they left behind.

**Synthesizing phrase.** Find, claim, and close every account — free for families, paid by banks.

**Boilerplate short.** Sunset finds every account, asset, and debt your loved one left behind. Free for families, in all 50 states.

**Boilerplate long.** Sunset is an estate settlement platform from Sunset Software, Inc. It helps families and the professionals who serve them discover and close every financial account, debt, and asset of a deceased person. Family-facing tools are free. Sunset is paid by bank partners when assets transfer, and by Sunset Pro for probate attorneys, fiduciaries, trustees, and aftercare specialists.

### Message Pillars

**Values intro.** The beliefs we return to when design and messaging decisions get hard — short enough to remember, sharp enough to choose.

**Pillars intro.** The message pillars that carry strategy into copy, product, and campaigns — each one a shorthand for what we stand on.

| Pillar | Summary | Emotional driver | Functional value | Trust message |
| --- | --- | --- | --- | --- |
| **Find everything** | If it exists, we’ll find it | Relief | Automated search across IRS, credit bureaus, banking networks, and more | You can be confident nothing was overlooked. |
| **Free for families** | Paid by banks, not families | Dignity | No fees, subscriptions, or cuts of the inheritance | You will not get a bill in the worst month of your life. |
| **Your pace, your control** | Nothing moves without your approval | Safety | You approve each step; the estate account is yours | You stay in the driver’s seat. |

### Guardrails

**Guardrails intro.** Hard edges for agents and humans — what we sound like, what we refuse, and the test that keeps us on-brand.

**Tone summary.** Calm, specific, guided, honest about money.

**The brand cannot be.** A fee on grief · Fake urgency · A cut of the inheritance · A silent search that notifies banks (except life insurance) · Grief theater.

**Litmus test.** If you could swap in any other estate-settlement name and the line still works, rewrite it. If the line hides how Sunset gets paid, rewrite it.

---

## Voice

**Act label.** Language

### Identity

**Identity.** We speak like a calm guide at the kitchen table: one question at a time, and nothing moves without you.

**Essence.** Find what they left behind.

#### Voice spectrum

**Spectrum intro.** Where this brand sits on volume, energy, sociability, and attitude — the range we inhabit, not the extremes we avoid.

Mark the brand’s range with **From** / **To** (labels must match the shell spectrum steps). **Notes** sit under the table in the guide.

| Dimension | From | To | Notes |
| --- | --- | --- | --- |
| Volume | Inside voices | Inside voices | Calm enough for grief; never loud for its own sake. Inferred from the rebrand (“clear, calm, and purposeful”). |
| Energy | Relaxed | Going for a stroll | At your pace — purposeful, not frantic. |
| Sociability | Just in the family | Friends & family | Written for the household, then for the attorney or funeral director beside them. |
| Attitude | Traditional | Opinionated when needed | Gentle with families; direct about companies that charge the grieving. |

### Principles

**Principles intro.** Refer to these language principles when authoring written content. These principles cover tone of voice and the subject matter that matters in the brand, products, and services.

| Principle | Description | Do | Don't |
| --- | --- | --- | --- |
| One question at a time. | Lead with the next useful step. Short sentences. Then stop. | “Begin search.” “We’ll email you when results are ready.” | Stack five asks or bury the action in sympathy. |
| Name the thing. | Prefer the account, the county, the document, the fee source. | “Generate probate documents for your county.” | “Unlock a seamless after-loss journey.” |
| Honest about money. | Families never pay. Say who does. | “We’re paid by banks, not families.” | Hide referral fees or imply Sunset is a charity. |
| Stay in their control. | Approval is the product. | “Nothing happened unless I said so.” (user proof) | Move, file, or notify on their behalf without saying so. |

### Tagline & Slogans

**Tagline intro.** An external piece of language that sums up our brand promise in a few memorable words.

- **Primary:** Find what they left behind.
- Alternatives: If it exists, we’ll find it. · We’re paid by banks, not families. · Always know what comes next.

### Story

**Story intro.** Our story is an external tool that translates our core beliefs and reason for being.

**Story long.** For ten years Stephen Walter and Kaela Worthen had been close friends. He was a practicing attorney who translated families to financial institutions. She had built payments systems that moved billions through small businesses. They did not set out to start an estate company. Then his father-in-law died, and the day after he sat with his mother-in-law and gave her a complete picture of the debts and accounts — work that would have taken her months. Around the same time Kaela was at a kitchen table helping her husband itemize his parents’ assets. They compared notes and built the thing they wished had existed: a platform that finds every account, files the forms, and shepherds the assets home. They refused to charge grieving families. It took almost a year to land the model: receiving banks pay a referral fee when assets move, and professionals pay for Sunset Pro. That is the day Sunset became Sunset. A sunset is also a sunrise.

**Story medium.** Two cofounders each settled a loved one’s estate by hand, then built the platform they wished had existed. Sunset finds and closes what they left behind — free for families, paid by banks and by professionals. Founded 2024, Salt Lake City.

**Story short.** Sunset finds what they left behind, then helps you claim and close it — free for families.

### Headlines

**Headlines intro.** Short, ownable lines for campaigns, product, and empty states — voice first, benefit clear.

- Find what they left behind.
- If it exists, we’ll find it.
- There’s a better way to find and secure their assets.
- Always know what comes next.
- We’re paid by banks, not families.
- At your pace, in your control.

### Calls to action

**CTA intro.** Clarity and brevity in wording calls to action is critical. Avoid ambiguous actions or drawn-out phrasing. Use action verbs.

| Do | Don't |
| --- | --- |
| begin search | Click here |
| Learn more about our process | Unlock your after-loss journey |
| Contact partners@hellosunset.com | Start your journey today |
| Log in | Get started now |

### Phrases

- Find what they left behind.
- If it exists, we’ll find it.
- We’re paid by banks, not families.
- Always know what comes next.
- At your pace, in your control.
- Nothing moves forward without your approval.
- Begin search.
- You keep all your money.
- A sunset is also a sunrise.
- Here with you.

### Tonal Rules

**Voice pillars.** Guided · Specific · Honest about money

**Do.** Lead with the next step · Name accounts and documents · Say who pays Sunset

**Don’t.** Charge-the-family framing · Vague “after-loss journeys” · Fake urgency

**Vocabulary use.** find · search · close · transfer · estate · account · free · approve · family

**Vocabulary never.** synergistic · best-in-class · seamless · revolutionary · unlock your potential · percentage of the estate · after-loss journey

**And / yet pairs**

**And yet intro.** Tension pairs that keep the voice from tipping into a single trait — lean into one pole, then balance with the other.

| Lean | Bridge | And yet | Phrase |
| --- | --- | --- | --- |
| Warm | yet | Specific | Find what they left behind. |
| Patient | yet | Direct | Nothing moves forward without your approval. |
| Protective | yet | Honest | We’re paid by banks, not families. |
| Guided | yet | In their control | Always know what comes next. |

**Rules**

1. Lead with the next step the reader can take.
2. Prefer short sentences; split compound claims.
3. Name the account, document, or fee source.
4. Never claim “revolutionary,” “seamless,” or “best-in-class.”
5. Never hide how Sunset gets paid.
6. One idea per paragraph in marketing copy.
7. Match channel length: social short, support patient, Pro precise.
8. When unsure, choose the plainer word.

**Identity boundaries.** We are not a growth-hack voice. We are not ironic. We are not a bill on grief.

| We Say | We Never Say |
| --- | --- |
| Find what they left behind. | Unlock your potential. |
| We’re paid by banks, not families. | A small percentage of the estate. |
| Begin search. | Start your after-loss journey today. |
| Nothing moves forward without your approval. | We’ll take it from here — no need to look. |

### Tone by context

**Context intro.** How the voice flexes by channel — same principles, different length and urgency.

| Context | Guidance | Example |
| --- | --- | --- |
| Product UI | Short labels; verbs on buttons | begin search |
| Email | One purpose; when results are ready, say so | We’ll email you as soon as your requested searches are complete. |
| Social | One idea; prefer a Voice phrase | Find what they left behind. |
| Support | Patient, concrete, a real person | Email support@hellosunset.com — we reply within 1 business day. |
| Incident | Facts first; no spin | We fixed the search path at 14:02 UTC. |
| Pro / attorneys | Precise, duty-aware, no family-voice softness that hides the work | Upload the death certificate, then invite your client to authorize the search. |

---

## Visual

**Act label.** Visual

This section is the brief. Concrete hex / CSS values live in **Design system** below.

### Colors

**Colors intro.** A warm cream field and dark brown ink — quiet enough for grief, clear enough to act.

Semantic roles (token names only; required in Design system):

- **Primary text** — body, headings, key chrome (`--color-ink`); primary buttons use ink on cream
- **Secondary text** — supporting copy, captions (`--color-ink-muted`)
- **Tertiary text** — meta, timestamps, placeholders (`--color-ink-subtle`)
- **Border** — rules and dividers (`--color-border`)
- **Surface** — subtle panels (`--color-surface`)
- **Surface deep** — deeper panels, muted fills (`--color-surface-deep`)
- **Paper** — content card / page surface (`--color-paper`)
- **Canvas** — app canvas behind the content card (`--color-canvas`)
- **Hover accent** — nav / link hover and FAQ rule (`--color-accent`, site `--_colors---secondary--red-600`). Not the primary button fill.

Accessibility expectation: primary and secondary body text ≥ 4.5:1 on paper; tertiary ≥ 4.5:1 when used at body size.

The marketing CSS also names unused secondaries (yellow, orange, blue, purple). Do not treat those as brand accents.

### Typography

**Type note.** Tobias for headlines, Geist for everything you read and tap — hierarchy through size, not decoration.

**Type display.** Tobias — headlines and display

**Type display foundry.** Klim Type Foundry

**Type primary.** Geist — body and UI

**Type primary foundry.** Vercel

**Type fallback.** Georgia, system-ui, sans-serif

**Type family.** Tobias + Geist

**Type specimen display.** Sunset

**Type specimen section.** Brand Strategy

**Type specimen lead.** Find what they left behind.

**Type specimen body.** Sunset finds every account, asset, and debt your loved one left behind. Free for families, in all 50 states.

### Photography / Imagery

**Imagery introduction.** Photography shows real families, real product screens, and quiet rooms — warm light, no grief theater.

**Imagery style.** Editorial portraits, product-in-context UI, warm natural light.

**Imagery mood.** Calm, cared-for, clear.

**Imagery tone.** Human, authentic, reflective, hopeful

**Imagery subjects.** Testimonial portraits, cofounders, product UI, funeral-home print

**Imagery settings.** Kitchen-table quiet, cream fields, landscape light, honest interiors

**Imagery avoid.** Oversaturated stock, fake handshakes, neon gradients, grief-porn close-ups

**Imagery product.** Sunset discovery or settlement UI on a cream field, natural light, candid crop --ar 4:5 --style raw

**Imagery prompt product.** Sunset app showing an estate inventory on a laptop, cream field, natural light, candid crop --ar 4:5 --style raw

**Imagery prompt lifestyle.** A person at a kitchen table with documents, not a stock smile; warm light; room to breathe.

**Imagery negative.** oversaturated · generic stock office · neon gradients · purple AI cliché · grief-porn

### Logo / Wordmark

**Logo description.** The Sunset wordmark is a typed lockup with a rising sun over the t — every sunset is also a sunrise.

**Logo clearspace.** Approximately the height of the sun segment

**Logo donts.** Don’t stretch or outline · Don’t add drop shadows · Don’t place on busy photography without a cream or paper panel · Don’t separate the sun from the wordmark unless using the approved mark

### Animation / Motion

**Animation introduction.** Motion on the marketing site orients: pages settle, steps reveal, and nothing blocks the next action.

**Animation principles intro.** How the brand moves and why. Keep motion purposeful, consistent, and quiet enough that it never stands between someone and their next action.

**Animation personality intro.** Motion personality is the easing curve that drives demos, transitions, and every ease this chapter documents. Pick one primary feel; use the others sparingly for contrast.

**Animation personality default.** Editorial

**Animation archetypes intro.** Movement archetypes are the basic patterns demos and components reuse. Turn them all off in a build and the principles and curve still hold.

**Animation interactions intro.** Familiar interactions running on the brand curve. Same personality, different jobs.

**Animation donts context.** Do not diminish motion by overusing it. Avoid the following treatments.

**Animation donts.** Don’t animate every micro-interaction · Don’t block clicks waiting for motion to finish · Don’t mix conflicting easing personalities on one screen · Don’t ignore prefers-reduced-motion · Don’t loop decorative motion in the main task path · Don’t delay exits the user has already left behind

#### Principles

| Principle | Description | Do | Don't |
| --- | --- | --- | --- |
| Orient, don’t decorate | Animate when it clarifies a change of state or space. Skip motion when it only adds spectacle. | Fade and settle a step so the eye can track what opened. | Add bounce or sparkle to every hover and click. |
| Match the action | Direction and weight should feel like the thing that just happened — forward to go deeper, back to return, soft to settle, firm to confirm. | Slide a drill-in view from the same edge the control implies. | Use a playful overshoot for a destructive or irreversible action. |
| Prefer entrance over exit | People need help arriving. Once attention has moved on, most exits can be instant. | Animate a modal in; dismiss tooltips and menus immediately. | Make users wait on exit choreography before they can act again. |
| Respect reduced motion | Some people experience motion sensitivity. Honor system preferences with instant state changes. | Swap timed transitions for immediate show/hide when prefers-reduced-motion is on. | Ship large parallax or looping motion with no reduced-motion path. |

#### Personality

| Id | Title | Body |
| --- | --- | --- |
| drift | Drift | Calm and considered. Elements settle into place like paper coming to rest. |
| punch | Punch | Decisive and athletic. Motion starts hard and brakes late, like a sprinter into the line. |
| elastic | Elastic | Playful and physical. Elements overshoot their mark and spring back, full of energy. |
| editorial | Editorial | Slow and stately. Motion at the pace of turning a page. Our default — inferred from “clear, calm, and purposeful.” |

#### Archetypes

| Id | Title | Body |
| --- | --- | --- |
| enter | Enter | New content arrives into view — fade, rise, or scale from a quiet rest state. |
| move | Move | An element relocates within the same surface without leaving the layout. |
| glide | Glide | Continuous, low-friction travel — carousels, peeks, and lateral browsing. |
| push | Push | One surface displaces another, implying depth or a stack change. |
| pan | Pan | The viewport or frame shifts across a larger field — maps, canvases, wide media. |

#### Interactions

| Id | Title | Body |
| --- | --- | --- |
| exchange | Exchange | Swap one piece of content for another in place — crossfade or short push. |
| carousel | Carousel | Glide between peers. Keep momentum readable; never snap without a cue. |
| toggle | Toggle | Binary state change. Fast, firm, and obvious which side is on. |
| reveal | Reveal | Progressive disclosure — expand to show more without losing place. |
| accordion | Accordion | One section opens as another settles. Height change should feel measured, not elastic. |
| tabs | Tabs | Sibling views exchange. Prefer a short crossfade or indicator move over a full page slide. |
| modal | Modal | Focus shifts to a layer. Enter with a clear settle; exit quickly once dismissed. |
| toast | Toast | Brief notice. Arrive enough to be seen; leave without drama. |

### Style

Design keywords: Warm cream · Strong type · Honest contrast · No ornament for its own sake.

Direction: The identity should feel clear, calm, and purposeful — a sunset that is also a sunrise.

### Color ↔ Brand contract

| Brand idea | Semantic role | Token name |
| --- | --- | --- |
| Clarity / focus | Primary text & primary buttons | `--color-ink` |
| Calm surfaces | Content card / page surface | `--color-paper` |
| Warm field | App canvas / marketing ground | `--color-canvas` |
| Subtle panels | Panels, zebra rows | `--color-surface` |
| Deeper wash | Muted fills, hover grounds | `--color-surface-deep` |
| Quiet structure | Borders / rules | `--color-border` |
| Secondary info | Supporting copy | `--color-ink-muted` |
| Tertiary meta | Timestamps, placeholders | `--color-ink-subtle` |
| Link / hover (not primary CTA) | Interactive hover | `--color-accent` |

When aesthetic principles change, update Visual here and align Design system tokens. When palette hex shifts materially, update Design system first, then confirm this contract still names the right roles. Compile fails if any required role above is missing from Design system.

---

## Expressions

**Act label.** Applications

Where the brand shows up (also rendered in the visual guide):

| Channel | Title | Copy | Sample |
| --- | --- | --- | --- |
| Web | Marketing pages | Brand name as the hero signal. One headline, one supporting line, one CTA — cream field, ink type. | Find what they left behind. |
| App | Search and settlement | One question at a time. Nothing moves without approval. | begin search |
| Social | Ownable phrases | One idea per post. High-contrast wordmark on cream or ink. Prefer a phrase from the Voice list. | Find what they left behind. |
| Email | Results and support | One purpose; when searches complete, say so; a real person on the reply. | We’ll email you as soon as your requested searches are complete. |
| Print | Funeral-home trifolds | Same type hierarchy. Fits a family packet. Free for the family. | Give families one less thing to worry about. |

**Channel web.** Marketing pages; brand name as hero signal

**Channel app.** One question at a time; begin search

**Channel social.** Short ownable phrases; high-contrast wordmarks

**Channel email.** One purpose; clear next step

**Channel print.** Trifold for funeral-home family packets

---

## Agent

**System prompt base.** You work on behalf of Sunset (Sunset Software, Inc.). Prefer plain language. Never charge families in copy. Stay in the cream-and-ink token set; terracotta is hover only unless the user expands the palette.

**Compliance threshold.** 0.85

---

<!-- brand-guide:design-system -->
## Design system

Implementation layer for **Sunset**, populated from https://www.hellosunset.com shared CSS (2026-08-22). Strategy / Voice / Visual above are the brief; this section defines **what to ship**: tokens, type scale, spacing, and component notes.

**Theme authoring:** edit this fenced block only. Run `npm run tokens` or `npm run compile` from `guide/`. Canonical token-only reset snapshot: [`examples/design-system.default.md`](examples/design-system.default.md) (starter grayscale — do not use to wipe Sunset). Reset with `npm run tokens:reset` only if you intend to drop back to the kit grayscale.

Compiled outputs (do not hand-edit): `guide/src/styles/tokens.generated.css`, [`tokens.json`](tokens.json), `guide/public/tokens.json`, and `brand.json` color fields.

### Color tokens

| Token | Value | Usage | Guide |
| --- | --- | --- | --- |
| `--color-ink` | `#211E19` | Primary text, key chrome, primary CTAs (site `--_colors---neutral--900`) | brand |
| `--color-ink-muted` | `#535048` | Secondary text, captions (`neutral--800`) | secondary |
| `--color-ink-subtle` | `#878275` | Tertiary text, meta, placeholders (`neutral--700`) | secondary |
| `--color-accent` | `#AD5137` | Link / nav hover and FAQ rule (`secondary--red-600`); not primary button fill | brand |
| `--color-gray-1` | `#FFFFFF` | App background (site `neutral--100`) | interface |
| `--color-gray-2` | `#F7F3EB` | Subtle background (`neutral--200`) | interface |
| `--color-gray-3` | `#EDE6DA` | UI element background (`neutral--300`) | interface |
| `--color-gray-4` | `#E4DECF` | Hovered UI element background (interpolated 300–500) | interface |
| `--color-gray-5` | `#DCD5CA` | Active / selected UI element background (`neutral--500`) | interface |
| `--color-gray-6` | `#C4BDB2` | Subtle borders and separators (interpolated) | interface |
| `--color-gray-7` | `#B2ABA0` | UI element border and focus rings (interpolated) | interface |
| `--color-gray-8` | `#9A948A` | Hovered UI element border (interpolated) | interface |
| `--color-gray-9` | `#878275` | Solid backgrounds (`neutral--700`) | interface |
| `--color-gray-10` | `#6D6860` | Hovered solid backgrounds (interpolated) | interface |
| `--color-gray-11` | `#535048` | Low-contrast text (`neutral--800`) | interface |
| `--color-gray-12` | `#211E19` | High-contrast text (`neutral--900`) | interface |
| `--color-border` | `#DCD5CA` | Dividers, hairlines, input borders (`neutral--500`) | chrome |
| `--color-surface` | `#EDE6DA` | Panels, zebra rows, subtle fills (`neutral--300`) | chrome |
| `--color-surface-deep` | `#DCD5CA` | Deeper panels, hover fills (`neutral--500`) | chrome |
| `--color-paper` | `#FFFFFF` | Page / content card background (`neutral--100`) | chrome |
| `--color-canvas` | `#F7F3EB` | App canvas behind the content card (`neutral--200` / theme-color) | chrome |
| `--color-rail` | `#EDE6DA` | Sidebar / rail background (`neutral--300`) | chrome |

`Guide` column: `brand` | `secondary` | `interface` | `chrome` (CSS only). Interface is the 12-step Radix-style scale shown in the guide; semantic aliases (`paper`, `surface`, …) stay `chrome` for theme CSS. New `--color-*` rows default to `interface` unless the name suggests brand/accent.

```css
:root {
  /* Color — site :root neutrals + hover accent; interface steps between specified stops are interpolated */
  --color-ink: #211E19;
  --color-ink-muted: #535048;
  --color-ink-subtle: #878275;
  --color-accent: #AD5137;
  --color-gray-1: #FFFFFF;
  --color-gray-2: #F7F3EB;
  --color-gray-3: #EDE6DA;
  --color-gray-4: #E4DECF;
  --color-gray-5: #DCD5CA;
  --color-gray-6: #C4BDB2;
  --color-gray-7: #B2ABA0;
  --color-gray-8: #9A948A;
  --color-gray-9: #878275;
  --color-gray-10: #6D6860;
  --color-gray-11: #535048;
  --color-gray-12: #211E19;
  --color-border: #DCD5CA;
  --color-surface: #EDE6DA;
  --color-surface-deep: #DCD5CA;
  --color-paper: #FFFFFF;
  --color-canvas: #F7F3EB;
  --color-rail: #EDE6DA;

  /* Typography — --type-base / --type-ratio derive sm/base/lg/xl on compile */
  --font-sans: var(--font-geist-sans), "Geist", system-ui, sans-serif;
  --font-serif: var(--font-tobias), "Tobias", Georgia, serif;
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

- Primary buttons stay ink on cream. `--color-accent` is the site hover terracotta, not a second CTA fill.
- Body text on `--color-paper` must meet WCAG AA (≥ 4.5:1). Ink on paper exceeds AAA.
- Prefer these tokens for marketing and UI; add new semantic tokens here before using one-off hex in CSS.
- Do not ship CSS secondaries yellow / orange / blue / purple as brand accents unless a later source specifies their use.

**DTCG / agent names (compiled)**

Edit tokens in the tables above (and the `:root` block). On `npm run compile`:

- CSS custom properties → `guide/src/styles/tokens.generated.css`
- Agent color map → `brand.json` (`color-ink`, …)
- DTCG export → `tokens.json` (`color.ink`, …) and `guide/public/tokens.json`

Do not hand-edit `tokens.json` or `brand.json`. Theme authoring stays in this Design system section.

| Agent key | DTCG path | Value | Usage |
| --- | --- | --- | --- |
| `color-ink` | `color.ink` | `#211E19` | Primary text / primary CTA |
| `color-ink-muted` | `color.ink-muted` | `#535048` | Secondary text |
| `color-ink-subtle` | `color.ink-subtle` | `#878275` | Tertiary text |
| `color-accent` | `color.accent` | `#AD5137` | Link hover |
| `color-border` | `color.border` | `#DCD5CA` | Borders |
| `color-surface` | `color.surface` | `#EDE6DA` | Surfaces |
| `color-paper` | `color.paper` | `#FFFFFF` | Background |
| `color-canvas` | `color.canvas` | `#F7F3EB` | Canvas |

### Type tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--font-sans` | `var(--font-geist-sans), "Geist", system-ui, sans-serif` | Body + UI |
| `--font-serif` | `var(--font-tobias), "Tobias", Georgia, serif` | Display / headlines |
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
2. Display — brand name, cover (Tobias)
3. XL — section titles (derived)
4. LG — subsection titles (derived)
5. Base — body (derived, Geist)
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

**Radius.** `--radius-base` is the single roundness knob. Compile emits `radiusBasePx` into the Astryx theme; Astryx expands semantic radii (`inner`, `element`, `container`, `page`). Set to `0` for sharp corners. Site buttons use `0.5rem` (`--_components---button--border-radius`).

Document-like layout: single column for prose. Constrain readable copy to `--content-max` (≈ 65 characters) so lines stay in the 65–75 character comfort range; grids, swatches, and specimens may span wider. Generous vertical rhythm between sections (`--space-6`).

App chrome sizes (`--chrome-h`, `--sidebar-w`, `--workspace-pad`) live in `guide/src/app/globals.css` and are not themed from this section.

### Components

| Component | Guidance |
| --- | --- |
| Primary button | Ink fill, cream text; site label “begin search”; radius `--radius-base` — not rounded-full pills |
| Secondary button | Transparent fill, muted ink text, `1px` ink-muted border |
| Links | Ink at rest; terracotta `--color-accent` on hover |
| Cards | Prefer none. Use only when the container is interactive |
| Dividers | `--color-border` hairlines |
| Code / tokens | Surface background; no brand mono authored |

### Logo (implementation)

- Default: ink wordmark on cream or paper
- Inverse: cream wordmark on ink
- Min clearspace: height of the sun segment
- Export SVG preferred (`brand/assets/logo.svg`); PNG favicon / webclip as fallbacks
- Mark-only: `brand/assets/mark.svg` (sun segment). Do not invent a new mark.

### Sync checklist

When restoring or editing the default:

1. Prefer the populate inventory under `resources/transcripts/` over Sample Brand reset files
2. Prefer [`examples/design-system.default.md`](examples/design-system.default.md) / `npm run tokens:reset` only when intentionally returning to kit grayscale
3. Spot-check the guide; color swatches and `brand.json` values sync automatically
<!-- /brand-guide:design-system -->
