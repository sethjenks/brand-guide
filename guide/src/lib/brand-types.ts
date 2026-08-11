/**
 * Brand JSON + guide view-model types.
 * `_spec_version` policy: bump minor for additive fields, major for breaking shape changes.
 * See UPSTREAM.md.
 */

export const BRAND_SPEC_VERSION = "1.1.0";

export type NavLeaf = {
  id: string;
  label: string;
};

export type NavItem = {
  id: string;
  label: string;
  children?: readonly NavLeaf[];
};

export type NavGroup = {
  id: string;
  label: string;
  items: readonly NavItem[];
};

export type ColorSwatch = {
  name: string;
  token: string;
  value: string;
  usage: string;
};

export type ArchetypeRole = "primary" | "secondary" | "tertiary";

/** Brand Voice spectrum row (Identity → Voice spectrum table). */
export type VoiceSpectrumRow = {
  id: string;
  label: string;
  steps: readonly string[];
  /** Inclusive start index into steps; end < 0 means no range marked. */
  start: number;
  end: number;
  notes: string;
};

/** And / yet tonal pair — optional phrase illustrates the rule in the guide. */
export type AndYetPair = {
  lean: string;
  yet: string;
  /** Which connective the brand uses between the two poles. */
  bridge?: "and" | "yet";
  /** Ownable phrase that illustrates this tonal pair. */
  phrase?: string;
};

/** Full influencer-style archetype profile (copy for 2nd/3rd as needed). */
export type ArchetypeProfile = {
  role: ArchetypeRole;
  name: string;
  wheel: string;
  motivations: string;
  personality: string;
  quote: string;
  drive: readonly string[];
  fears: readonly string[];
  strategy: readonly string[];
  voice: readonly string[];
  seeks: string;
  mottos: readonly string[];
  audienceFeels: readonly string[];
  brands: readonly string[];
  atBest: readonly string[];
  atWorst: readonly string[];
  characters: readonly string[];
  types: readonly string[];
  typesHighlighted: readonly string[];
};

export type SetupStatus = "starter" | "populated";

export type IntakeStatus = "pending" | "complete" | "skipped";

/** Per GUIDE_NAV leaf override for hybrid section status. */
export type BrandSetupSectionStatus =
  | "ok"
  | "needs-work"
  | "empty"
  | "stub"
  | "sample"
  | "assets";

/** Guide chapters that always ship (theme + meaning spine + kit utilities). */
export const CORE_CHAPTER_IDS = [
  "strategy",
  "language",
  "typography",
  "color",
  "system",
  "utilities",
] as const;

/** Guide chapters that can be hidden via brand/setup.json → chapters. */
export const EXTENDED_CHAPTER_IDS = [
  "logo",
  "photography",
  "animation",
  "applications",
] as const;

export type CoreChapterId = (typeof CORE_CHAPTER_IDS)[number];
export type ExtendedChapterId = (typeof EXTENDED_CHAPTER_IDS)[number];
export type ChapterToggle = "on" | "off";
export type BrandSetupChapters = Partial<
  Record<ExtendedChapterId, ChapterToggle>
>;

/** Starter UI copy-target — requires a non-empty agentic prompt. */
export type SetupIntakeSource = {
  kind: "intake";
  label: string;
  detail: string;
  /** Agentic prompt tailored to this source path (copyable in the setup UI). */
  prompt: string;
  url?: string;
  path?: string;
};

/** Provenance-only entry — no prompt; not shown as an Agent prompt card. */
export type SetupCitationSource = {
  kind: "citation";
  label: string;
  detail: string;
  url?: string;
  path?: string;
};

export type SetupSource = SetupIntakeSource | SetupCitationSource;

export type BrandSetup = {
  status: SetupStatus;
  /** Branding Exercise gate: pending until questionnaire done or skipped for a source. */
  intake: IntakeStatus;
  year: string;
  support: string;
  headline: string;
  body: string;
  sources: readonly SetupSource[];
  prompt: string;
  /**
   * Optional per-section status overrides (GUIDE_NAV leaf id → status).
   * `ok` clears auto flags; `needs-work` forces Missing; other values force that status.
   */
  sectionStatus?: Readonly<Record<string, BrandSetupSectionStatus>>;
  /**
   * Optional Extended chapter visibility. Omitted keys default to `on`.
   * Core chapters (Strategy, Language, Typography, Color, System, Utilities)
   * cannot be turned off — they still feed theme and kit chrome.
   */
  chapters?: BrandSetupChapters;
};

/** Guide projection stored under brand.json → guide (compiled from brand.md). */
export type GuidePayload = {
  name: string;
  tagline: string;
  strategy: {
    actLabel: string;
    overview: {
      what: string;
      problem: string;
      current: string;
      opportunity: string;
      solution: string;
    };
    promise: {
      mission: string;
      purpose: string;
      position: string;
      promise: string;
    };
    audience: {
      intro: string;
      groups: readonly {
        segments: readonly string[];
        wants: string;
        needs: string;
      }[];
    };
    positioning: {
      intro: string;
      statement: string;
    };
    vision: {
      intro: string;
      statement: string;
    };
    mission: {
      intro: string;
      statement: string;
    };
    values: {
      intro: string;
      items: readonly { title: string; body: string }[];
    };
    pillars: {
      intro: string;
      items: readonly {
        name: string;
        summary: string;
        emotional: string;
        functional: string;
        trust: string;
      }[];
    };
    archetype: {
      name: string;
      drive: string;
      seeks: string;
      atBest: readonly string[];
      atWorst: readonly string[];
      motto: string;
      voice: readonly string[];
    };
    /** Primary / secondary / tertiary profile cards (template under the wheel). */
    archetypeProfiles: readonly ArchetypeProfile[];
    personality: {
      intro: string;
      items: readonly { title: string; body: string }[];
      traits: readonly string[];
      weAre: readonly string[];
      weAreNot: readonly string[];
    };
    guardrails: {
      intro: string;
      tone: string;
      cannotBe: readonly string[];
      litmus: string;
    };
  };
  voice: {
    actLabel: string;
    identity: string;
    essence: string;
    principles: {
      intro: string;
      items: readonly {
        title: string;
        body: string;
        do: string;
        dont: string;
      }[];
    };
    tagline: {
      intro: string;
      statement: string;
    };
    story: {
      intro: string;
      long: string;
      medium: string;
      short: string;
    };
    headlines: {
      intro: string;
      items: readonly string[];
    };
    cta: {
      intro: string;
      do: readonly string[];
      dont: readonly string[];
    };
    spectrum: {
      intro: string;
      rows: readonly VoiceSpectrumRow[];
    };
    phrases: readonly string[];
    andYet: {
      intro: string;
      pairs: readonly AndYetPair[];
    };
    weSay: readonly { say: string; never: string }[];
    contexts: {
      intro: string;
      items: readonly {
        context: string;
        guidance: string;
        example: string;
      }[];
    };
  };
  visual: {
    actLabel: string;
    colors: {
      intro: string;
      brand: ColorSwatch[];
      secondary: ColorSwatch[];
      interface: ColorSwatch[];
    };
    typography: {
      family: string;
      note: string;
      faces: { primary: string; fallback: string };
      specimens: readonly {
        label: string;
        sample: string;
        size: "display" | "xl" | "lg" | "base";
      }[];
    };
    logo: {
      description: string;
      donts: readonly string[];
    };
    imagery: {
      tone: string;
      subjects: string;
      settings: string;
      avoid: string;
    };
  };
  expressions: {
    actLabel: string;
    items: readonly {
      channel: string;
      title: string;
      copy: string;
      sample: string;
    }[];
  };
};

/** Runtime view model for the Next guide (guide payload + setup + shell nav). */
export type BrandGuideViewModel = GuidePayload & {
  year: string;
  support: string;
  setup: BrandSetup;
  nav: readonly NavGroup[];
};

export type BrandJson = {
  _hash: string;
  _spec_version: string;
  _compiled: string;
  _last_material_change: string;
  _sanitized: boolean;
  meta: Record<string, unknown>;
  identity: Record<string, unknown>;
  positioning: Record<string, unknown>;
  personality: Record<string, unknown>;
  voice: Record<string, unknown>;
  tone: Record<string, unknown>;
  messaging: Record<string, unknown>;
  color: Record<string, unknown>;
  typography: Record<string, unknown>;
  imagery: Record<string, unknown>;
  logo: Record<string, unknown>;
  audience: Record<string, unknown>;
  channels: Record<string, unknown>;
  agent: Record<string, unknown>;
  rules: Record<string, unknown>;
  examples: Record<string, unknown>;
  templates: Record<string, unknown>;
  guide: GuidePayload;
};
