import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";
import { brandThemeInput } from "./brand.generated";

/**
 * Split a CSS font-family stack into primary family + remaining fallbacks.
 * Preserves commas inside var() and quoted strings so the authored
 * `--font-sans` stack can drive Astryx typography.body/heading.
 */
function splitFontStack(stack: string): { family: string; fallbacks?: string } {
  const parts: string[] = [];
  let current = "";
  let quote: string | null = null;
  let depth = 0;

  for (let i = 0; i < stack.length; i++) {
    const ch = stack[i]!;
    if (quote) {
      current += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
      continue;
    }
    if (ch === "(") {
      depth += 1;
      current += ch;
      continue;
    }
    if (ch === ")") {
      depth = Math.max(0, depth - 1);
      current += ch;
      continue;
    }
    if (ch === "," && depth === 0) {
      const trimmed = current.trim();
      if (trimmed) parts.push(trimmed);
      current = "";
      continue;
    }
    current += ch;
  }

  const last = current.trim();
  if (last) parts.push(last);

  if (parts.length === 0) {
    return { family: stack.trim() };
  }

  const [family, ...rest] = parts;
  return {
    family: family!,
    fallbacks: rest.length > 0 ? rest.join(", ") : undefined,
  };
}

const fontSans = splitFontStack(brandThemeInput.fontSans);
const fontSerifStack =
  "fontSerif" in brandThemeInput &&
  typeof brandThemeInput.fontSerif === "string" &&
  brandThemeInput.fontSerif.trim()
    ? splitFontStack(brandThemeInput.fontSerif)
    : fontSans;
const fontSerifCss =
  "fontSerif" in brandThemeInput &&
  typeof brandThemeInput.fontSerif === "string" &&
  brandThemeInput.fontSerif.trim()
    ? brandThemeInput.fontSerif
    : brandThemeInput.fontSans;

/**
 * Brand Guide Astryx theme.
 * Color/radius/font values come from the design-system compile
 * (`brand.generated.ts`). Rebuild with `npx astryx theme build`.
 */
export const brandTheme = defineTheme({
  name: "brand-guide",
  extends: neutralTheme,
  color: {
    accent: brandThemeInput.accent,
    neutralStyle: "neutral",
  },
  typography: {
    scale: brandThemeInput.typeScale ?? { base: 16, ratio: 1.2 },
    // Body: `--font-sans`. Heading: optional `--font-serif`, else sans.
    // Next injects webfont CSS variables in layout.tsx — keep those vars in the stacks.
    body: fontSans,
    heading: fontSerifStack,
  },
  radius: {
    base: brandThemeInput.radiusBasePx,
    multiplier: 1,
  },
  components: {
    "side-nav-item": {
      base: {
        borderRadius: "0",
      },
    },
    // Sharp corners — brand guide buttons are square, not rounded.
    button: {
      base: {
        borderRadius: "0",
      },
    },
    "icon-button": {
      base: {
        borderRadius: "0",
      },
    },
  },
  tokens: {
    "--color-text-primary": [
      brandThemeInput.colors.ink,
      brandThemeInput.colors.ink,
    ],
    "--color-icon-primary": [
      brandThemeInput.colors.ink,
      brandThemeInput.colors.ink,
    ],
    "--color-text-secondary": [
      brandThemeInput.colors.inkMuted,
      brandThemeInput.colors.inkMuted,
    ],
    "--color-icon-secondary": [
      brandThemeInput.colors.inkMuted,
      brandThemeInput.colors.inkMuted,
    ],
    // Astryx's third text tier is `disabled` / placeholder — map tertiary here.
    "--color-text-disabled": [
      brandThemeInput.colors.inkSubtle,
      brandThemeInput.colors.inkSubtle,
    ],
    "--color-icon-disabled": [
      brandThemeInput.colors.inkSubtle,
      brandThemeInput.colors.inkSubtle,
    ],
    "--color-background-body": [
      brandThemeInput.colors.canvas,
      brandThemeInput.colors.canvas,
    ],
    "--color-background-surface": [
      brandThemeInput.colors.paper,
      brandThemeInput.colors.paper,
    ],
    "--color-background-card": [
      brandThemeInput.colors.surface,
      brandThemeInput.colors.surface,
    ],
    "--color-background-muted": [
      brandThemeInput.colors.surfaceDeep,
      brandThemeInput.colors.surfaceDeep,
    ],
    // Chapter invert / ink panels — brand ink, not Neutral default.
    "--color-background-inverted": [
      brandThemeInput.colors.ink,
      brandThemeInput.colors.ink,
    ],
    "--color-border": [
      brandThemeInput.colors.border,
      brandThemeInput.colors.border,
    ],
    "--color-accent": [
      brandThemeInput.accent,
      brandThemeInput.accent,
    ],
    // Brand-controlled on-accent (avoid Neutral dark-mode green residue).
    // Paper works for ink and typical dark chromatic accents; override when accent is light.
    "--color-on-accent": [
      brandThemeInput.colors.paper,
      brandThemeInput.colors.paper,
    ],
    // Same stacks as typography.body/heading — string so light-dark() is not applied.
    "--font-family-body": brandThemeInput.fontSans,
    "--font-family-heading": fontSerifCss,
  },
});

export default brandTheme;
