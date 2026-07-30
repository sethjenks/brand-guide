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

export type SetupStatus = "starter" | "populated";

export type IntakeStatus = "pending" | "complete" | "skipped";

export type BrandSetup = {
  status: SetupStatus;
  /** Branding Exercise gate: pending until questionnaire done or skipped for a source. */
  intake: IntakeStatus;
  year: string;
  support: string;
  headline: string;
  body: string;
  sources: readonly { label: string; detail: string }[];
  prompt: string;
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
    pillars: readonly {
      name: string;
      summary: string;
      emotional: string;
      functional: string;
      trust: string;
    }[];
    archetype: {
      name: string;
      drive: string;
      seeks: string;
      atBest: readonly string[];
      atWorst: readonly string[];
      motto: string;
      voice: readonly string[];
    };
    personality: {
      traits: readonly string[];
      weAre: readonly string[];
      weAreNot: readonly string[];
    };
    guardrails: {
      tone: string;
      cannotBe: readonly string[];
      litmus: string;
    };
  };
  voice: {
    actLabel: string;
    identity: string;
    essence: string;
    phrases: readonly string[];
    andYet: readonly { lean: string; yet: string }[];
    weSay: readonly { say: string; never: string }[];
    contexts: readonly {
      context: string;
      guidance: string;
      example: string;
    }[];
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
