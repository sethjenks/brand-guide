#!/usr/bin/env node
/**
 * Compile Design system tokens from brand.md into the visual guide + rebuild
 * colors in brand.json.
 *
 * Reads the fenced Design system region in brand.md
 * (`<!-- brand-guide:design-system -->` … `<!-- /brand-guide:design-system -->`),
 * then parses token tables + the ```css :root``` block and writes:
 *   - guide/src/styles/tokens.generated.css
 *   - tokens.json (DTCG) + guide/public/tokens.json (identical copy)
 *   - brand.json color.tokens + guide.visual.colors (derived from Design system)
 *   - copies brand/assets → guide/public/brand
 *   - syncs brand/overrides.css
 *
 * Color guide layers: optional 4th table column `Guide` with
 *   brand | secondary | interface | chrome | —
 * (`chrome` / `—` / empty with default chrome tokens = CSS only, not guide swatches).
 * Unknown `--color-*` tokens default to `interface` so new palette entries appear
 * in the guide without editing the compiler.
 *
 * Usage: node scripts/compile-design.mjs
 *        npm run tokens / npm run compile  (from guide/)
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const BRAND_MD_PATH = path.join(root, "brand.md");
const TOKENS_OUT = path.join(root, "guide/src/styles/tokens.generated.css");
const THEME_INPUT_OUT = path.join(
  root,
  "guide/src/themes/brand.generated.ts",
);
const DTCG_OUT = path.join(root, "tokens.json");
const DTCG_PUBLIC_OUT = path.join(root, "guide/public/tokens.json");
const BRAND_JSON_PATH = path.join(root, "brand.json");
const ASSETS_SRC = path.join(root, "brand/assets");
const ASSETS_DEST = path.join(root, "guide/public/brand");
const OVERRIDES_SRC = path.join(root, "brand/overrides.css");
const OVERRIDES_DEST = path.join(root, "guide/src/styles/brand.overrides.css");

/** Color tokens remapped to --brand-* in tokens.generated.css (no temporary --color-* aliases). */
const BRAND_COLOR_ALIAS = {
  "--color-ink": "--brand-ink",
  "--color-ink-muted": "--brand-ink-muted",
  "--color-ink-subtle": "--brand-ink-subtle",
  "--color-canvas": "--brand-canvas",
  "--color-rail": "--brand-rail",
  "--color-paper": "--brand-paper",
  "--color-surface": "--brand-surface",
  "--color-surface-deep": "--brand-surface-deep",
  "--color-border": "--brand-border",
};

/**
 * Semantic roles required in brand.md Design system (theme contract).
 * Accent is derived from ink; rail / gray scale / type / space stay optional.
 */
const REQUIRED_COLOR_TOKENS = [
  "--color-ink",
  "--color-ink-muted",
  "--color-ink-subtle",
  "--color-canvas",
  "--color-paper",
  "--color-surface",
  "--color-surface-deep",
  "--color-border",
];

/** Default modular type scale (Astryx expandTypeScale-compatible). */
const DEFAULT_TYPE_BASE = 16;
const DEFAULT_TYPE_RATIO = 1.2;

/**
 * Document space ramp multipliers for `--space-1`…`7` from `--space-unit`.
 * Preserves classic rem steps when unit is `0.25rem`.
 */
const SPACE_UNIT_MULTIPLIERS = [1, 2, 4, 6, 10, 16, 24];
const DEFAULT_SPACE_UNIT = "0.25rem";

/**
 * Guide CSS font-size steps derived from type knobs (Astryx step indices).
 * display / h0 stay authored (fluid clamps).
 */
const TYPE_STEP_TOKENS = [
  { name: "--font-size-sm", step: -1, usage: "Captions, meta" },
  { name: "--font-size-base", step: 0, usage: "Body" },
  { name: "--font-size-lg", step: 1, usage: "Lead" },
  { name: "--font-size-xl", step: 2, usage: "Section titles" },
];

const DESIGN_SYSTEM_START = "<!-- brand-guide:design-system -->";
const DESIGN_SYSTEM_END = "<!-- /brand-guide:design-system -->";

const DTCG_DESCRIPTION =
  "Brand Guide design tokens — DTCG format. Generated at compile time from brand.md Design system section (same pass as tokens.generated.css). Do not edit by hand.";

/** @typedef {{ value: string, usage?: string, guide?: string }} TokenDef */

const GUIDE_LAYERS = new Set(["brand", "secondary", "interface"]);

/** Default guide layer when Design system omits the Guide column. */
const DEFAULT_GUIDE_LAYER = {
  "--color-ink": "brand",
  "--color-ink-muted": "secondary",
  "--color-ink-subtle": "secondary",
  "--color-border": "chrome",
  "--color-surface": "chrome",
  "--color-surface-deep": "chrome",
  "--color-paper": "chrome",
  "--color-canvas": "chrome",
  "--color-rail": "chrome",
};

/**
 * Parse markdown tables whose first column is a CSS custom property.
 * Optional columns: Value, Usage, Guide.
 * @param {string} md
 * @returns {Map<string, TokenDef>}
 */
function parseTokenTables(md) {
  /** @type {Map<string, TokenDef>} */
  const tokens = new Map();
  const row =
    /^\|\s*`(--[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*(?:\|\s*([^|\n]*?)\s*)?(?:\|\s*([^|\n]*?)\s*)?\|?\s*$/;

  for (const line of md.split(/\n/)) {
    const match = line.match(row);
    if (!match) continue;
    const name = match[1];
    const value = match[2].trim();
    const col3 = match[3]?.trim() || "";
    const col4 = match[4]?.trim() || "";

    // Tables may be Token|Value|Usage or Token|Value|Usage|Guide
    let usage;
    let guide;
    if (col4) {
      usage = stripCell(col3) || undefined;
      guide = normalizeGuideLayer(stripCell(col4));
    } else if (col3) {
      const asGuide = normalizeGuideLayer(stripCell(col3));
      if (asGuide && !col3.includes(" ")) {
        // Unlikely: 3-col with guide only — treat as usage unless exact layer word
        if (GUIDE_LAYERS.has(asGuide) || asGuide === "chrome") {
          guide = asGuide;
        } else {
          usage = stripCell(col3) || undefined;
        }
      } else {
        usage = stripCell(col3) || undefined;
      }
    }

    tokens.set(name, { value, usage, guide });
  }
  return tokens;
}

/** @param {string} cell */
function stripCell(cell) {
  return cell
    .replace(/^`|`$/g, "")
    .replace(/^[—–-]$/, "")
    .trim();
}

/**
 * @param {string} raw
 * @returns {string | undefined}
 */
function normalizeGuideLayer(raw) {
  if (!raw) return undefined;
  const v = raw.toLowerCase().replace(/[`*]/g, "").trim();
  if (!v || v === "—" || v === "-" || v === "–" || v === "none" || v === "omit") {
    return "chrome";
  }
  if (v === "chrome" || v === "app" || v === "shell") return "chrome";
  if (GUIDE_LAYERS.has(v)) return v;
  return undefined;
}

/**
 * @param {string} md
 * @returns {Map<string, string>}
 */
function parseCssRootBlock(md) {
  /** @type {Map<string, string>} */
  const tokens = new Map();
  const fence = /```css\s*([\s\S]*?)```/gi;
  let css = "";
  for (const match of md.matchAll(fence)) {
    if (match[1].includes(":root")) {
      css = match[1];
      break;
    }
  }
  if (!css) return tokens;

  const decl = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  for (const match of css.matchAll(decl)) {
    tokens.set(match[1], match[2].trim());
  }
  return tokens;
}

/**
 * @param {Map<string, TokenDef>} fromTables
 * @param {Map<string, string>} fromCss
 * @returns {Map<string, TokenDef>}
 */
function mergeTokens(fromTables, fromCss) {
  /** @type {Map<string, TokenDef>} */
  const out = new Map(fromTables);
  for (const [name, value] of fromCss) {
    const prev = out.get(name);
    out.set(name, {
      value,
      usage: prev?.usage,
      guide: prev?.guide,
    });
  }
  return out;
}

/**
 * Match Astryx expandTypeScale: round(base × ratio^step), rem from 16px root.
 * @param {number} base
 * @param {number} ratio
 * @param {number} step
 * @returns {string}
 */
function typeStepToRem(base, ratio, step) {
  const px = Math.round(base * Math.pow(ratio, step));
  const rem = Math.round((px / 16) * 10000) / 10000;
  return `${rem}rem`;
}

/**
 * @param {string} unitRaw
 * @returns {{ amount: number, unit: string }}
 */
function parseSpaceUnit(unitRaw) {
  const trimmed = unitRaw.trim();
  const match = trimmed.match(/^(-?[\d.]+)\s*(rem|px|em)$/i);
  if (match) {
    return { amount: Number(match[1]), unit: match[2].toLowerCase() };
  }
  const num = Number(trimmed);
  if (Number.isFinite(num)) {
    return { amount: num, unit: "rem" };
  }
  return parseSpaceUnit(DEFAULT_SPACE_UNIT);
}

/**
 * Derive modular font sizes + document space ramp from knobs.
 * Overwrites any hand-authored overlapping `--font-size-sm|base|lg|xl` and `--space-1`…`7`.
 * @param {Map<string, TokenDef>} tokens
 * @returns {{ typeBase: number, typeRatio: number }}
 */
function deriveTypeAndSpaceScales(tokens) {
  const typeBaseRaw = tokens.get("--type-base")?.value?.trim();
  const typeRatioRaw = tokens.get("--type-ratio")?.value?.trim();
  let typeBase = DEFAULT_TYPE_BASE;
  let typeRatio = DEFAULT_TYPE_RATIO;
  if (typeBaseRaw) {
    const n = Number.parseFloat(typeBaseRaw);
    if (Number.isFinite(n) && n > 0) typeBase = n;
  }
  if (typeRatioRaw) {
    const n = Number.parseFloat(typeRatioRaw);
    if (Number.isFinite(n) && n > 0) typeRatio = n;
  }

  // Ensure knobs exist in the token map (defaults when omitted).
  if (!tokens.has("--type-base")) {
    tokens.set("--type-base", { value: String(typeBase), usage: "Modular type scale base (px)" });
  }
  if (!tokens.has("--type-ratio")) {
    tokens.set("--type-ratio", { value: String(typeRatio), usage: "Modular type scale ratio" });
  }

  for (const { name, step, usage } of TYPE_STEP_TOKENS) {
    const prev = tokens.get(name);
    tokens.set(name, {
      value: typeStepToRem(typeBase, typeRatio, step),
      usage: prev?.usage || usage,
      guide: prev?.guide,
    });
  }

  const spaceUnitRaw =
    tokens.get("--space-unit")?.value?.trim() || DEFAULT_SPACE_UNIT;
  if (!tokens.has("--space-unit")) {
    tokens.set("--space-unit", {
      value: spaceUnitRaw,
      usage: "Document spacing unit",
    });
  }
  const { amount, unit } = parseSpaceUnit(spaceUnitRaw);
  for (let i = 0; i < SPACE_UNIT_MULTIPLIERS.length; i++) {
    const name = `--space-${i + 1}`;
    const prev = tokens.get(name);
    const product =
      Math.round(amount * SPACE_UNIT_MULTIPLIERS[i] * 10000) / 10000;
    tokens.set(name, {
      value: `${product}${unit}`,
      usage: prev?.usage,
      guide: prev?.guide,
    });
  }

  return { typeBase, typeRatio };
}

/**
 * Extract the fenced Design system region from brand.md.
 * @param {string} md
 * @returns {string}
 */
function extractDesignSystem(md) {
  const start = md.indexOf(DESIGN_SYSTEM_START);
  const end = md.indexOf(DESIGN_SYSTEM_END);
  if (start === -1 || end === -1 || end <= start) {
    console.error(
      `Missing Design system fence in brand.md (expected ${DESIGN_SYSTEM_START} … ${DESIGN_SYSTEM_END}).`,
    );
    process.exit(1);
  }
  const slice = md
    .slice(start + DESIGN_SYSTEM_START.length, end)
    .trim();
  if (!slice) {
    console.error("Design system fence in brand.md is empty.");
    process.exit(1);
  }
  return slice;
}

/**
 * @param {Map<string, TokenDef>} tokens
 * @returns {string}
 */
function renderTokensCss(tokens) {
  const lines = [
    "/* GENERATED FILE — do not edit by hand.",
    " * Source: brand.md Design system section",
    " * Regenerate: node scripts/compile-design.mjs  (or npm run compile)",
    " *",
    " * Semantic chrome colors from brand.md emit as --brand-*.",
    " * Interface scales (e.g. --color-gray-*) emit under their authored names.",
    " * Astryx semantic tokens (--color-text-*, --color-background-*) come from the theme.",
    " */",
    "",
    ":root {",
  ];

  const ordered = [...tokens.entries()].sort(([a], [b]) => a.localeCompare(b));

  for (const [name, { value }] of ordered) {
    const brandName = BRAND_COLOR_ALIAS[name];
    if (brandName) {
      lines.push(`  ${brandName}: ${value};`);
      continue;
    }
    lines.push(`  ${name}: ${value};`);
  }

  lines.push("}", "");
  return lines.join("\n");
}

/**
 * Emit the small theme-input module consumed by guide/src/themes/brand.ts.
 * Required color roles must already be present (see assertRequiredColorTokens).
 * @param {Map<string, TokenDef>} tokens
 */
function renderThemeInput(tokens) {
  const requiredColor = (name) => {
    const value = tokens.get(name)?.value?.trim();
    if (!value) {
      throw new Error(`renderThemeInput: missing required token ${name}`);
    }
    return value;
  };
  const optionalColor = (name, fallback) =>
    tokens.get(name)?.value?.trim() || fallback;

  const radiusRaw = tokens.get("--radius-base")?.value?.trim() || "0.5rem";
  let radiusBasePx = 8;
  if (radiusRaw.endsWith("rem")) {
    radiusBasePx = Math.round(parseFloat(radiusRaw) * 16);
  } else if (radiusRaw.endsWith("px")) {
    radiusBasePx = Math.round(parseFloat(radiusRaw));
  }

  const typeBaseRaw = tokens.get("--type-base")?.value?.trim();
  const typeRatioRaw = tokens.get("--type-ratio")?.value?.trim();
  let typeBase = DEFAULT_TYPE_BASE;
  let typeRatio = DEFAULT_TYPE_RATIO;
  if (typeBaseRaw) {
    const n = Number.parseFloat(typeBaseRaw);
    if (Number.isFinite(n) && n > 0) typeBase = n;
  }
  if (typeRatioRaw) {
    const n = Number.parseFloat(typeRatioRaw);
    if (Number.isFinite(n) && n > 0) typeRatio = n;
  }

  const ink = requiredColor("--color-ink");
  const input = {
    accent: ink,
    radiusBasePx,
    typeScale: { base: typeBase, ratio: typeRatio },
    colors: {
      ink,
      inkMuted: requiredColor("--color-ink-muted"),
      inkSubtle: requiredColor("--color-ink-subtle"),
      canvas: requiredColor("--color-canvas"),
      rail: optionalColor("--color-rail", "#e6e6e6"),
      paper: requiredColor("--color-paper"),
      surface: requiredColor("--color-surface"),
      surfaceDeep: requiredColor("--color-surface-deep"),
      border: requiredColor("--color-border"),
    },
  };

  return [
    "/**",
    " * GENERATED FILE — do not edit by hand.",
    " * Source: brand.md Design system (via scripts/compile-design.mjs)",
    " * Consumed by guide/src/themes/brand.ts for Astryx defineTheme.",
    " */",
    "",
    `export const brandThemeInput = ${JSON.stringify(input, null, 2)} as const;`,
    "",
  ].join("\n");
}

/**
 * Split a CSS font-family list into DTCG fontFamily array entries.
 * @param {string} value
 * @returns {string | string[]}
 */
function parseFontFamilyValue(value) {
  const parts = [];
  let current = "";
  let quote = null;
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === ",") {
      const trimmed = current.trim();
      if (trimmed) parts.push(trimmed);
      current = "";
      continue;
    }
    current += ch;
  }
  const last = current.trim();
  if (last) parts.push(last);
  if (parts.length === 0) return value.trim();
  if (parts.length === 1) return parts[0];
  return parts;
}

/**
 * Best-effort $type for unknown / misc tokens.
 * @param {string} value
 * @returns {string}
 */
function guessDtcgType(value) {
  const v = value.trim();
  if (isColorValue(v)) return "color";
  if (/^-?\d+(\.\d+)?$/.test(v)) return "number";
  if (/^-?\d+(\.\d+)?(px|rem|em|ms|s|%)$/i.test(v)) return "dimension";
  if (/^(thin|hairline|extra-light|ultra-light|light|normal|regular|book|medium|semi-bold|demi-bold|bold|extra-bold|ultra-bold|black|heavy)$/i.test(v)) {
    return "fontWeight";
  }
  if (/var\(--font|sans-serif|serif|monospace|system-ui/i.test(v)) {
    return "fontFamily";
  }
  return "string";
}

/**
 * @param {string} cssName
 * @param {TokenDef} def
 * @param {string} type
 * @param {unknown} value
 * @returns {Record<string, unknown>}
 */
function dtcgToken(cssName, def, type, value) {
  /** @type {Record<string, unknown>} */
  const ext = { css: cssName };
  const layer = resolveGuideLayer(cssName, def.guide);
  if (layer) ext.guide = layer;

  /** @type {Record<string, unknown>} */
  const token = {
    $type: type,
    $value: value,
    $extensions: { "com.brand-guide": ext },
  };
  if (def.usage) token.$description = def.usage;
  return token;
}

/**
 * Ensure a nested group path exists; return the leaf parent object.
 * @param {Record<string, any>} root
 * @param {string[]} pathParts
 * @returns {Record<string, any>}
 */
function ensureGroup(root, pathParts) {
  let cur = root;
  for (const part of pathParts) {
    if (!cur[part] || typeof cur[part] !== "object") {
      cur[part] = {};
    }
    cur = cur[part];
  }
  return cur;
}

/**
 * Build DTCG document from the merged DESIGN token map.
 * Unknown prefixes land under `misc` (warn only — keep markdown easy to extend).
 * @param {Map<string, TokenDef>} tokens
 * @returns {{ doc: Record<string, any>, leafCount: number, miscNames: string[] }}
 */
function renderTokensDtcg(tokens) {
  /** @type {Record<string, any>} */
  const doc = { $description: DTCG_DESCRIPTION };
  let leafCount = 0;
  /** @type {string[]} */
  const miscNames = [];

  const ordered = [...tokens.entries()].sort(([a], [b]) => a.localeCompare(b));

  for (const [name, def] of ordered) {
    const value = def.value;

    if (name.startsWith("--color-") && isColorValue(value)) {
      const leaf = name.slice("--color-".length);
      const group = ensureGroup(doc, ["color"]);
      group[leaf] = dtcgToken(name, def, "color", value);
      leafCount += 1;
      continue;
    }

    if (name === "--font-sans") {
      const group = ensureGroup(doc, ["font"]);
      group.sans = dtcgToken(name, def, "fontFamily", parseFontFamilyValue(value));
      leafCount += 1;
      continue;
    }

    if (name.startsWith("--font-weight-")) {
      const leaf = name.slice("--font-weight-".length);
      const group = ensureGroup(doc, ["font", "weight"]);
      const num = Number(value);
      group[leaf] = dtcgToken(
        name,
        def,
        "fontWeight",
        Number.isFinite(num) ? num : value,
      );
      leafCount += 1;
      continue;
    }

    if (name === "--type-base" || name === "--type-ratio") {
      const leaf = name.slice("--type-".length);
      const group = ensureGroup(doc, ["type"]);
      const num = Number(value);
      group[leaf] = dtcgToken(
        name,
        def,
        "number",
        Number.isFinite(num) ? num : value,
      );
      leafCount += 1;
      continue;
    }

    if (name.startsWith("--font-size-")) {
      const leaf = name.slice("--font-size-".length);
      const group = ensureGroup(doc, ["text"]);
      group[leaf] = dtcgToken(name, def, "dimension", value);
      leafCount += 1;
      continue;
    }

    if (name.startsWith("--line-height-")) {
      const leaf = name.slice("--line-height-".length);
      const group = ensureGroup(doc, ["text", "lineHeight"]);
      const num = Number(value);
      group[leaf] = dtcgToken(
        name,
        def,
        "number",
        Number.isFinite(num) ? num : value,
      );
      leafCount += 1;
      continue;
    }

    if (name.startsWith("--space-")) {
      const leaf = name.slice("--space-".length);
      const group = ensureGroup(doc, ["space"]);
      group[leaf] = dtcgToken(name, def, "dimension", value);
      leafCount += 1;
      continue;
    }

    if (name === "--content-max" || name === "--guide-max") {
      const leaf = name.slice(2);
      const group = ensureGroup(doc, ["layout"]);
      group[leaf] = dtcgToken(name, def, "dimension", value);
      leafCount += 1;
      continue;
    }

    if (name.startsWith("--radius-")) {
      const leaf = name.slice("--radius-".length);
      const group = ensureGroup(doc, ["radius"]);
      group[leaf] = dtcgToken(name, def, "dimension", value);
      leafCount += 1;
      continue;
    }

    // Unknown prefix — misc (do not fail compile; brands may add custom rows)
    miscNames.push(name);
    const leaf = name.replace(/^--/, "").replace(/\//g, "-");
    const group = ensureGroup(doc, ["misc"]);
    group[leaf] = dtcgToken(name, def, guessDtcgType(value), value);
    leafCount += 1;
  }

  return { doc, leafCount, miscNames };
}

/**
 * Fail loudly if required semantic color roles are missing from Design system.
 * @param {Map<string, TokenDef>} tokens
 */
function assertRequiredColorTokens(tokens) {
  /** @type {string[]} */
  const missing = [];
  for (const name of REQUIRED_COLOR_TOKENS) {
    const def = tokens.get(name);
    if (!def || !isColorValue(def.value)) {
      missing.push(name);
    }
  }
  if (missing.length === 0) return;

  console.error(
    "brand.md Design system is missing required semantic color token(s):\n",
  );
  for (const name of missing) {
    console.error(`  - ${name}`);
  }
  console.error(
    "\nAdd each as a Color tokens table row (or :root hex) in brand.md → Design system.",
  );
  console.error(
    "Required roles: ink, ink-muted, ink-subtle, canvas, paper, surface, surface-deep, border.",
  );
  console.error("See UPSTREAM.md → Semantic token contract.");
  process.exit(1);
}

/**
 * Write DTCG to repo root + public copy; fail if required colors missing.
 * @param {Map<string, TokenDef>} tokens
 */
function writeDtcg(tokens) {
  // Required roles already asserted in main(); keep DTCG group sanity checks.
  const { doc, leafCount, miscNames } = renderTokensDtcg(tokens);

  if (!doc.color || typeof doc.color !== "object") {
    console.error("DTCG color group is empty — check brand.md Design system color tokens");
    process.exit(1);
  }
  const colorLeaves = Object.keys(doc.color).filter(
    (k) => k !== "$description" && doc.color[k]?.$value != null,
  );
  if (colorLeaves.length === 0) {
    console.error("DTCG color group has no leaf tokens");
    process.exit(1);
  }
  for (const name of REQUIRED_COLOR_TOKENS) {
    const leaf = name.slice("--color-".length);
    if (!doc.color[leaf]?.$value) {
      console.error(`DTCG missing color.${leaf}`);
      process.exit(1);
    }
  }

  const json = `${JSON.stringify(doc, null, 2)}\n`;
  fs.writeFileSync(DTCG_OUT, json, "utf8");
  fs.mkdirSync(path.dirname(DTCG_PUBLIC_OUT), { recursive: true });
  fs.writeFileSync(DTCG_PUBLIC_OUT, json, "utf8");

  // Verify round-trip
  const written = JSON.parse(fs.readFileSync(DTCG_OUT, "utf8"));
  if (!written.color?.ink?.$value) {
    console.error("DTCG write verification failed: color.ink.$value empty");
    process.exit(1);
  }

  if (miscNames.length > 0) {
    console.warn(
      `DTCG: ${miscNames.length} token(s) under misc (unknown prefix): ${miscNames.join(", ")}`,
    );
  }

  console.log(
    `Wrote ${leafCount} DTCG tokens → ${path.relative(root, DTCG_OUT)} (+ public copy)`,
  );
}

/** @param {string} hex */
function hexToRgbHsl(hex) {
  const h = String(hex).replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    return null;
  }
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  const l = (max + min) / 2;
  let hue = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rf:
        hue = ((gf - bf) / d + (gf < bf ? 6 : 0)) / 6;
        break;
      case gf:
        hue = ((bf - rf) / d + 2) / 6;
        break;
      default:
        hue = ((rf - gf) / d + 4) / 6;
    }
  }
  return {
    rgb: `${r}, ${g}, ${b}`,
    hsl: `${Math.round(hue * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`,
  };
}

/** @param {string} value */
function isColorValue(value) {
  const v = value.trim();
  return (
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v) ||
    /^rgba?\(/i.test(v) ||
    /^hsla?\(/i.test(v)
  );
}

/**
 * @param {string} token
 * @returns {string}
 */
function resolveGuideLayer(token, explicit) {
  if (explicit) return explicit;
  if (DEFAULT_GUIDE_LAYER[token]) return DEFAULT_GUIDE_LAYER[token];
  // Accents / brand hues → brand layer
  if (/brand|accent|primary|secondary-hue/.test(token)) return "brand";
  // New semantic colors show in the guide (interface) unless marked chrome
  return "interface";
}

/**
 * @param {string} token `--color-ink-muted`
 * @returns {string} `Ink muted`
 */
function swatchName(token) {
  return token
    .replace(/^--color-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Guess WCAG-ish labels for common cases; unknown → "n/a".
 * @param {string} hex
 */
function roughWcag(hex) {
  const conv = hexToRgbHsl(hex);
  if (!conv) return { wcag_on_white: "n/a", wcag_on_black: "n/a" };
  const [r, g, b] = conv.rgb.split(",").map((x) => Number(x.trim()));
  const toLin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const L = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  const contrast = (a, bL) => {
    const lighter = Math.max(a, bL);
    const darker = Math.min(a, bL);
    return (lighter + 0.05) / (darker + 0.05);
  };
  const onWhite = contrast(L, 1);
  const onBlack = contrast(L, 0);
  const grade = (ratio) =>
    ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "fail";
  return {
    wcag_on_white: grade(onWhite),
    wcag_on_black: grade(onBlack),
  };
}

/**
 * Rebuild agent color.tokens + guide.visual.colors from DESIGN color tokens.
 * @param {Record<string, any>} json
 * @param {Map<string, TokenDef>} tokens
 * @returns {{ agentCount: number, guideCount: number }}
 */
function rebuildColorsFromDesign(json, tokens) {
  /** @type {Record<string, any>} */
  const agentTokens = {};
  /** @type {{ name: string, token: string, value: string, usage: string }[]} */
  const brand = [];
  /** @type {{ name: string, token: string, value: string, usage: string }[]} */
  const secondary = [];
  /** @type {{ name: string, token: string, value: string, usage: string }[]} */
  const interfaceColors = [];

  const colorEntries = [...tokens.entries()]
    .filter(([name, def]) => name.startsWith("--color-") && isColorValue(def.value))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));

  for (const [token, def] of colorEntries) {
    const key = token.replace(/^--/, "");
    const conv = hexToRgbHsl(def.value);
    const wcag = roughWcag(def.value);
    agentTokens[key] = {
      value: def.value,
      type: "color",
      ...(conv || {}),
      usage: def.usage || "",
      ...wcag,
    };

    const layer = resolveGuideLayer(token, def.guide);
    if (!GUIDE_LAYERS.has(layer)) continue;

    const swatch = {
      name: swatchName(token),
      token,
      value: def.value,
      usage: def.usage || "",
    };
    if (layer === "brand") brand.push(swatch);
    else if (layer === "secondary") secondary.push(swatch);
    else interfaceColors.push(swatch);
  }

  if (!json.color || typeof json.color !== "object") {
    json.color = {};
  }
  json.color.tokens = agentTokens;

  const keys = Object.keys(agentTokens);
  const primary = keys.filter((k) =>
    /ink$|paper$|brand$/.test(k),
  );
  json.color.palettes = {
    primary:
      primary.length > 0
        ? primary.slice(0, 3)
        : keys.slice(0, Math.min(2, keys.length)),
    neutral: keys,
    semantic: {
      success: keys.find((k) => /brand$|success/.test(k)) || keys[0],
      error: keys.find((k) => /destructive|error/.test(k)) || keys[0],
    },
  };

  if (!json.guide?.visual?.colors) {
    if (!json.guide) json.guide = {};
    if (!json.guide.visual) json.guide.visual = {};
    json.guide.visual.colors = { intro: "", brand: [], secondary: [], interface: [] };
  }

  const intro = json.guide.visual.colors.intro || "";
  json.guide.visual.colors = {
    intro,
    brand,
    secondary,
    interface: interfaceColors,
  };

  return {
    agentCount: keys.length,
    guideCount: brand.length + secondary.length + interfaceColors.length,
  };
}

/** @param {Record<string, unknown>} json */
function recomputeHash(json) {
  const clone = { ...json, _hash: "" };
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(clone))
    .digest("hex");
  json._hash = `sha256:${hash}`;
}

function copyAssets() {
  fs.mkdirSync(ASSETS_DEST, { recursive: true });
  if (!fs.existsSync(ASSETS_SRC)) return 0;
  let count = 0;
  for (const name of fs.readdirSync(ASSETS_SRC)) {
    if (name === ".gitkeep") continue;
    const from = path.join(ASSETS_SRC, name);
    const to = path.join(ASSETS_DEST, name);
    const stat = fs.statSync(from);
    if (stat.isFile()) {
      fs.copyFileSync(from, to);
      count += 1;
    }
  }
  return count;
}

function syncOverrides() {
  const src = fs.existsSync(OVERRIDES_SRC)
    ? fs.readFileSync(OVERRIDES_SRC, "utf8")
    : "/* no brand overrides */\n";
  const banner =
    "/* GENERATED from brand/overrides.css — edit brand/overrides.css, then npm run compile */\n";
  fs.mkdirSync(path.dirname(OVERRIDES_DEST), { recursive: true });
  fs.writeFileSync(OVERRIDES_DEST, banner + src, "utf8");
}

function main() {
  if (!fs.existsSync(BRAND_MD_PATH)) {
    console.error(`Missing ${BRAND_MD_PATH}`);
    process.exit(1);
  }

  const brandMd = fs.readFileSync(BRAND_MD_PATH, "utf8");
  const md = extractDesignSystem(brandMd);
  const fromTables = parseTokenTables(md);
  const fromCss = parseCssRootBlock(md);
  const tokens = mergeTokens(fromTables, fromCss);

  if (tokens.size === 0) {
    console.error(
      "No tokens found in brand.md Design system (expected tables or a css :root block).",
    );
    process.exit(1);
  }

  assertRequiredColorTokens(tokens);

  const { typeBase, typeRatio } = deriveTypeAndSpaceScales(tokens);
  console.log(
    `Derived type scale (base=${typeBase}, ratio=${typeRatio}) + space-1…7 from --space-unit`,
  );

  fs.mkdirSync(path.dirname(TOKENS_OUT), { recursive: true });
  fs.writeFileSync(TOKENS_OUT, renderTokensCss(tokens), "utf8");
  console.log(
    `Wrote ${tokens.size} tokens → ${path.relative(root, TOKENS_OUT)}`,
  );

  fs.mkdirSync(path.dirname(THEME_INPUT_OUT), { recursive: true });
  fs.writeFileSync(THEME_INPUT_OUT, renderThemeInput(tokens), "utf8");
  console.log(
    `Wrote Astryx theme input → ${path.relative(root, THEME_INPUT_OUT)}`,
  );

  writeDtcg(tokens);

  if (fs.existsSync(BRAND_JSON_PATH)) {
    const json = JSON.parse(fs.readFileSync(BRAND_JSON_PATH, "utf8"));
    const { agentCount, guideCount } = rebuildColorsFromDesign(json, tokens);
    recomputeHash(json);
    fs.writeFileSync(
      BRAND_JSON_PATH,
      `${JSON.stringify(json, null, 2)}\n`,
      "utf8",
    );
    console.log(
      `Rebuilt brand.json colors from brand.md Design system (${agentCount} agent tokens, ${guideCount} guide swatches)`,
    );
  } else {
    console.warn("brand.json missing — run compile-brand first");
  }

  syncOverrides();
  console.log(`Synced brand overrides → ${path.relative(root, OVERRIDES_DEST)}`);

  const copied = copyAssets();
  console.log(`Copied ${copied} asset(s) → guide/public/brand`);
}

main();
