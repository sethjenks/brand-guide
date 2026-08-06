/**
 * Visual-guide projection of intake/brand-intake-questionnaire.md.
 * Keep in sync with the agent questionnaire; MD remains the agent source of truth.
 */

export type QuestionnaireQuestion = {
  prompt: string;
  hint: string;
  /** Numbered response lines when the questionnaire expects a list. */
  responseLines?: number;
};

export type QuestionnaireSection = {
  id: string;
  title: string;
  questions: readonly QuestionnaireQuestion[];
};

export const BRANDING_QUESTIONNAIRE_INTRO = {
  title: "Branding Questionnaire",
  summary:
    "Starting point for customizing this brand-guide kit. Complete this before replacing Sample Brand in brand.md and brand/setup.json.",
  protocol: [
    "About 20 questions across six sections.",
    "Default: one question at a time. Or send as a written questionnaire, or skip if you already have a website, PDF, brand.md, or Figma file.",
    "Save answers to resources/transcripts/, then rewrite brand.md / setup and run npm run compile from guide/.",
  ],
  outputPath: "resources/transcripts/questionnaire-{brand}-{date}.txt",
} as const;

export const BRANDING_QUESTIONNAIRE_SECTIONS: readonly QuestionnaireSection[] = [
  {
    id: "about-you",
    title: "About You",
    questions: [
      {
        prompt: "What business are you in?",
        hint: "Describe the category, industry, and what you do at its most fundamental level.",
      },
      {
        prompt: "What is your unique value proposition?",
        hint: "Why should people choose you over any of your competitors? What do you offer that no one else does?",
      },
      {
        prompt: "What is your mission?",
        hint: "Why does this organization exist? What problem are you solving?",
      },
      {
        prompt: "What are your three most important goals?",
        hint: "Short-term priorities — what are you working toward in the next 12–24 months?",
        responseLines: 3,
      },
      {
        prompt: "Why was this company created?",
        hint: "Tell the origin story. What happened that made this necessary? Who started it and why?",
      },
      {
        prompt: "Describe your product and service.",
        hint: "Be specific. What do you actually deliver? How does it work?",
      },
    ],
  },
  {
    id: "target-market",
    title: "Target Market",
    questions: [
      {
        prompt: "Who is your target market?",
        hint: "Describe your primary customer or audience. Who are they? What do they care about?",
      },
      {
        prompt: "Prioritize your stakeholders in order of importance.",
        hint: "List every audience — customers, donors, partners, employees, etc. — ranked by priority.",
        responseLines: 5,
      },
      {
        prompt: "How do you want to be perceived by each audience?",
        hint: "For each stakeholder group above, describe the feeling or impression you want to leave.",
      },
      {
        prompt: "What values and beliefs unite your customers?",
        hint: "What do your best customers believe about the world? What do they care about most?",
      },
      {
        prompt:
          "If you could communicate a single message about your company, what would it be?",
        hint: "One sentence. The thing you'd say if you had thirty seconds.",
      },
      {
        prompt: "Where will your brand touch-points be with the end user(s)?",
        hint: "Website, social, email, in-person, product packaging, events, etc. Where do people encounter you?",
      },
    ],
  },
  {
    id: "positioning",
    title: "Positioning",
    questions: [
      {
        prompt: "What are the trends and changes that affect your industry?",
        hint: "What's shifting in your market? What forces are your customers or competitors responding to?",
      },
      {
        prompt: "How do you market your product or service?",
        hint: "What channels, messages, and approaches are you using today?",
      },
    ],
  },
  {
    id: "competition",
    title: "Competition",
    questions: [
      {
        prompt: "What is your competitive advantage?",
        hint: "What do you do or have that your competitors don't? What's hard to replicate about you?",
      },
      {
        prompt: "What do you do better than anyone else?",
        hint: "Not just better — the best. What's the thing only you can claim?",
      },
    ],
  },
  {
    id: "goals",
    title: "Goals / Success",
    questions: [
      {
        prompt: "What will you be in five years?",
        hint: "Describe the organization at its best-case future state. Scale, reach, impact, reputation.",
      },
      {
        prompt: "How do you measure success?",
        hint: "What are the metrics, signals, or moments that tell you it's working?",
      },
      {
        prompt:
          "If you could travel to the future. What would your company be and look like?",
        hint: "Unconstrained vision. No limitations. What does it feel like when you've fully arrived?",
      },
    ],
  },
  {
    id: "barriers",
    title: "Barriers",
    questions: [
      {
        prompt:
          "What are the potential barriers to success for your company.",
        hint: "Internal and external — what could get in the way?",
      },
      {
        prompt: "What keeps you up at night?",
        hint: "Honest answer. What's the thing you worry about most?",
      },
    ],
  },
] as const;

export const BRANDING_QUESTIONNAIRE_FACILITATOR_NOTES = [
  "Let the subject talk. The most useful data is often in the stories they tell around the answers, not the answers themselves.",
  'Probe on specifics: "Can you give me an example?" and "What does that look like in practice?" unlock more than any question.',
  "Note language — the exact words people use to describe their work, their customers, and their fears are the raw material for voice and messaging.",
  "Pay attention to what they avoid saying. The negative space defines as much as the content.",
  "Save the full transcript verbatim. Do not summarize before saving — later analysis needs the raw material.",
  "When turning the transcript into kit files: edit brand.md / brand/setup.json, then npm run compile from guide/. Never patch brand.json by hand.",
] as const;
