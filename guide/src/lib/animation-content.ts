/**
 * Sample Animation chapter content for the starter guide.
 * Replace with brand-authored motion guidance when available.
 */

import type { ClotheslineGridItem } from "@/components/ClotheslineGrid";
import type { DontGridItem } from "@/components/DontGrid";
import type { PrincipleItem } from "@/components/PrinciplesSection";

export const ANIMATION_INTRODUCTION =
  "Motion orients. It helps people see what changed, where to look next, and how the brand feels under the hand — never decoration for its own sake.";

export const ANIMATION_PRINCIPLES_INTRO =
  "How the brand moves and why. Keep motion purposeful, consistent, and quiet enough that it never stands between someone and their next action.";

export const ANIMATION_PRINCIPLES: readonly PrincipleItem[] = [
  {
    title: "Orient, don’t decorate",
    body: "Animate when it clarifies a change of state or space. Skip motion when it only adds spectacle.",
    do: "Fade and settle a panel so the eye can track what opened.",
    dont: "Add bounce or sparkle to every hover and click.",
  },
  {
    title: "Match the action",
    body: "Direction and weight should feel like the thing that just happened — forward to go deeper, back to return, soft to settle, firm to confirm.",
    do: "Slide a drill-in view from the same edge the control implies.",
    dont: "Use a playful overshoot for a destructive or irreversible action.",
  },
  {
    title: "Prefer entrance over exit",
    body: "People need help arriving. Once attention has moved on, most exits can be instant.",
    do: "Animate a modal in; dismiss tooltips and menus immediately.",
    dont: "Make users wait on exit choreography before they can act again.",
  },
  {
    title: "Respect reduced motion",
    body: "Some people experience motion sensitivity. Honor system preferences with instant state changes.",
    do: "Swap timed transitions for immediate show/hide when prefers-reduced-motion is on.",
    dont: "Ship large parallax or looping motion with no reduced-motion path.",
  },
];

export const ANIMATION_PERSONALITY_INTRO =
  "Motion personality is the easing curve that drives demos, transitions, and every ease this chapter documents. Pick one primary feel; use the others sparingly for contrast.";

/** Sample brand default: Editorial — calm guide pacing. */
export const ANIMATION_PERSONALITY: readonly ClotheslineGridItem[] = [
  {
    title: "Drift",
    body: "Calm and considered. Elements settle into place like paper coming to rest.",
  },
  {
    title: "Punch",
    body: "Decisive and athletic. Motion starts hard and brakes late, like a sprinter into the line.",
  },
  {
    title: "Elastic",
    body: "Playful and physical. Elements overshoot their mark and spring back, full of energy.",
  },
  {
    title: "Editorial",
    body: "Slow and stately. Motion at the pace of turning a page in a well-made book. Our default.",
  },
];

export const ANIMATION_ARCHETYPES_INTRO =
  "Movement archetypes are the basic patterns demos and components reuse. Turn them all off in a build and the principles and curve still hold.";

export const ANIMATION_ARCHETYPES: readonly ClotheslineGridItem[] = [
  {
    title: "Enter",
    body: "New content arrives into view — fade, rise, or scale from a quiet rest state.",
  },
  {
    title: "Move",
    body: "An element relocates within the same surface without leaving the layout.",
  },
  {
    title: "Glide",
    body: "Continuous, low-friction travel — carousels, peeks, and lateral browsing.",
  },
  {
    title: "Push",
    body: "One surface displaces another, implying depth or a stack change.",
  },
  {
    title: "Pan",
    body: "The viewport or frame shifts across a larger field — maps, canvases, wide media.",
  },
];

export const ANIMATION_INTERACTIONS_INTRO =
  "Familiar interactions running on the brand curve. Same personality, different jobs.";

export const ANIMATION_INTERACTIONS: readonly ClotheslineGridItem[] = [
  {
    title: "Exchange",
    body: "Swap one piece of content for another in place — crossfade or short push.",
  },
  {
    title: "Carousel",
    body: "Glide between peers. Keep momentum readable; never snap without a cue.",
  },
  {
    title: "Toggle",
    body: "Binary state change. Fast, firm, and obvious which side is on.",
  },
  {
    title: "Reveal",
    body: "Progressive disclosure — expand to show more without losing place.",
  },
  {
    title: "Accordion",
    body: "One section opens as another settles. Height change should feel measured, not elastic.",
  },
  {
    title: "Tabs",
    body: "Sibling views exchange. Prefer a short crossfade or indicator move over a full page slide.",
  },
  {
    title: "Modal",
    body: "Focus shifts to a layer. Enter with a clear settle; exit quickly once dismissed.",
  },
  {
    title: "Toast",
    body: "Brief notice. Arrive enough to be seen; leave without drama.",
  },
];

export const ANIMATION_DONTS_CONTEXT =
  "Do not diminish motion by overusing it. Avoid the following treatments.";

export const ANIMATION_DONTS: readonly DontGridItem[] = [
  {
    id: "animation-dont-everywhere",
    caption: "Don’t animate every micro-interaction",
  },
  {
    id: "animation-dont-block",
    caption: "Don’t block clicks waiting for motion to finish",
  },
  {
    id: "animation-dont-mixed-eases",
    caption: "Don’t mix conflicting easing personalities on one screen",
  },
  {
    id: "animation-dont-ignore-prm",
    caption: "Don’t ignore prefers-reduced-motion",
  },
  {
    id: "animation-dont-loop",
    caption: "Don’t loop decorative motion in the main task path",
  },
  {
    id: "animation-dont-exit-delay",
    caption: "Don’t delay exits the user has already left behind",
  },
];
