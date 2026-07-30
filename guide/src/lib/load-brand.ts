import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { GUIDE_NAV } from "@/lib/nav";
import type { BrandGuideViewModel, BrandSetup } from "@/lib/brand-types";

const colorSwatchSchema = z.object({
  name: z.string(),
  token: z.string(),
  value: z.string(),
  usage: z.string(),
});

const guideSchema = z.object({
  name: z.string().min(1),
  tagline: z.string(),
  strategy: z.object({
    actLabel: z.string(),
    overview: z.object({
      what: z.string(),
      problem: z.string(),
      current: z.string(),
      opportunity: z.string(),
      solution: z.string(),
    }),
    promise: z.object({
      mission: z.string(),
      purpose: z.string(),
      position: z.string(),
      promise: z.string(),
    }),
    audience: z.object({
      intro: z.string(),
      groups: z.array(
        z.object({
          segments: z.array(z.string()),
          wants: z.string(),
          needs: z.string(),
        }),
      ),
    }),
    positioning: z.object({
      intro: z.string(),
      statement: z.string(),
    }),
    vision: z.object({
      intro: z.string(),
      statement: z.string(),
    }),
    mission: z.object({
      intro: z.string(),
      statement: z.string(),
    }),
    values: z.object({
      intro: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          body: z.string(),
        }),
      ),
    }),
    pillars: z.object({
      intro: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          summary: z.string(),
          emotional: z.string(),
          functional: z.string(),
          trust: z.string(),
        }),
      ),
    }),
    archetype: z.object({
      name: z.string(),
      drive: z.string(),
      seeks: z.string(),
      atBest: z.array(z.string()),
      atWorst: z.array(z.string()),
      motto: z.string(),
      voice: z.array(z.string()),
    }),
    archetypeProfiles: z.array(
      z.object({
        role: z.enum(["primary", "secondary", "tertiary"]),
        name: z.string(),
        wheel: z.string(),
        motivations: z.string(),
        personality: z.string(),
        quote: z.string(),
        drive: z.array(z.string()),
        fears: z.array(z.string()),
        strategy: z.array(z.string()),
        voice: z.array(z.string()),
        seeks: z.string(),
        mottos: z.array(z.string()),
        audienceFeels: z.array(z.string()),
        brands: z.array(z.string()),
        atBest: z.array(z.string()),
        atWorst: z.array(z.string()),
        characters: z.array(z.string()),
        types: z.array(z.string()),
        typesHighlighted: z.array(z.string()),
      }),
    ),
    personality: z.object({
      intro: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          body: z.string(),
        }),
      ),
      traits: z.array(z.string()),
      weAre: z.array(z.string()),
      weAreNot: z.array(z.string()),
    }),
    guardrails: z.object({
      intro: z.string(),
      tone: z.string(),
      cannotBe: z.array(z.string()),
      litmus: z.string(),
    }),
  }),
  voice: z.object({
    actLabel: z.string(),
    identity: z.string(),
    essence: z.string(),
    principles: z.object({
      intro: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          body: z.string(),
          do: z.string(),
          dont: z.string(),
        }),
      ),
    }),
    tagline: z.object({
      intro: z.string(),
      statement: z.string(),
    }),
    story: z.object({
      intro: z.string(),
      long: z.string(),
      medium: z.string(),
      short: z.string(),
    }),
    headlines: z.object({
      intro: z.string(),
      items: z.array(z.string()),
    }),
    cta: z.object({
      intro: z.string(),
      do: z.array(z.string()),
      dont: z.array(z.string()),
    }),
    spectrum: z.object({
      intro: z.string(),
      rows: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          steps: z.array(z.string()),
          start: z.number(),
          end: z.number(),
          notes: z.string(),
        }),
      ),
    }),
    phrases: z.array(z.string()),
    andYet: z.object({
      intro: z.string(),
      pairs: z.array(
        z.object({
          lean: z.string(),
          yet: z.string(),
          bridge: z.enum(["and", "yet"]).optional(),
          phrase: z.string().optional(),
        }),
      ),
    }),
    weSay: z.array(z.object({ say: z.string(), never: z.string() })),
    contexts: z.object({
      intro: z.string(),
      items: z.array(
        z.object({
          context: z.string(),
          guidance: z.string(),
          example: z.string(),
        }),
      ),
    }),
  }),
  visual: z.object({
    actLabel: z.string(),
    colors: z.object({
      intro: z.string(),
      brand: z.array(colorSwatchSchema),
      secondary: z.array(colorSwatchSchema),
      interface: z.array(colorSwatchSchema),
    }),
    typography: z.object({
      family: z.string(),
      note: z.string(),
      faces: z.object({ primary: z.string(), fallback: z.string() }),
      specimens: z.array(
        z.object({
          label: z.string(),
          sample: z.string(),
          size: z.enum(["display", "xl", "lg", "base"]),
        }),
      ),
    }),
    logo: z.object({
      description: z.string(),
      donts: z.array(z.string()),
    }),
    imagery: z.object({
      tone: z.string(),
      subjects: z.string(),
      settings: z.string(),
      avoid: z.string(),
    }),
  }),
  expressions: z.object({
    actLabel: z.string(),
    items: z.array(
      z.object({
        channel: z.string(),
        title: z.string(),
        copy: z.string(),
        sample: z.string(),
      }),
    ),
  }),
});

const setupSchema = z.object({
  status: z.enum(["starter", "populated"]),
  intake: z.enum(["pending", "complete", "skipped"]),
  year: z.string(),
  support: z.string(),
  headline: z.string(),
  body: z.string(),
  sources: z.array(z.object({ label: z.string(), detail: z.string() })),
  prompt: z.string(),
});

const brandJsonSchema = z
  .object({
    _spec_version: z.string(),
    guide: guideSchema,
  })
  .passthrough();

function repoRoot(): string {
  if (process.env.BRAND_ROOT) {
    return path.resolve(process.env.BRAND_ROOT);
  }

  // Walk up from cwd looking for the kit root (works from guide/ or repo root).
  let dir = process.cwd();
  for (let i = 0; i < 8; i++) {
    const hasBrandJson = fs.existsSync(path.join(dir, "brand.json"));
    const hasBrandMd = fs.existsSync(path.join(dir, "brand.md"));
    const hasSetup = fs.existsSync(path.join(dir, "brand", "setup.json"));
    if (hasBrandJson && hasBrandMd && hasSetup) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  // Legacy fallback when cwd is guide/
  return path.resolve(process.cwd(), "..");
}

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * Load compiled brand.json + brand/setup.json into the guide view model.
 * Call from Server Components only (uses fs).
 */
export function loadBrand(): BrandGuideViewModel {
  const root = repoRoot();
  const brandPath = path.join(root, "brand.json");
  const setupPath = path.join(root, "brand/setup.json");

  if (!fs.existsSync(brandPath)) {
    throw new Error(
      `Missing ${brandPath}. Run \`npm run compile\` from guide/.`,
    );
  }
  if (!fs.existsSync(setupPath)) {
    throw new Error(`Missing ${setupPath}.`);
  }

  const brandParsed = brandJsonSchema.safeParse(readJson(brandPath));
  if (!brandParsed.success) {
    throw new Error(
      `Invalid brand.json guide payload:\n${brandParsed.error.message}`,
    );
  }

  const setupParsed = setupSchema.safeParse(readJson(setupPath));
  if (!setupParsed.success) {
    throw new Error(`Invalid brand/setup.json:\n${setupParsed.error.message}`);
  }

  const setup = setupParsed.data as BrandSetup;
  const guide = brandParsed.data.guide;

  return {
    ...guide,
    year: setup.year,
    support: setup.support,
    setup,
    nav: GUIDE_NAV,
  };
}

export type { BrandGuideViewModel, ColorSwatch } from "@/lib/brand-types";
