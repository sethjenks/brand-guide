import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral";
import { brandThemeInput } from "./brand.generated";

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
    scale: { base: 16, ratio: 1.2 },
    // Loaded face first (Next font CSS variable), then named Geist / system fallbacks.
    body: {
      family: "var(--font-geist-sans)",
      fallbacks: 'Geist, "IBM Plex Sans", system-ui, sans-serif',
    },
    heading: {
      family: "var(--font-geist-sans)",
      fallbacks: 'Geist, "IBM Plex Sans", system-ui, sans-serif',
    },
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
    "--color-border": [
      brandThemeInput.colors.border,
      brandThemeInput.colors.border,
    ],
    "--color-accent": [
      brandThemeInput.accent,
      brandThemeInput.accent,
    ],
    // Prefer the Next-loaded face so nav + content resolve identically.
    // String (not [light, dark]) — font stacks must not go through light-dark().
    "--font-family-body":
      'var(--font-geist-sans), Geist, "IBM Plex Sans", system-ui, sans-serif',
    "--font-family-heading":
      'var(--font-geist-sans), Geist, "IBM Plex Sans", system-ui, sans-serif',
  },
});

export default brandTheme;
