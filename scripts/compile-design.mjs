#!/usr/bin/env node
/**
 * Compile DESIGN.md tokens into the visual guide + rebuild colors in brand.json.
 *
 * Reads token tables + the ```css :root``` block from DESIGN.md, then writes:
 *   - guide/src/styles/tokens.generated.css
 *   - brand.json color.tokens + guide.visual.colors (derived from DESIGN.md)
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

const DESIGN_PATH = path.join(root, "DESIGN.md");
const TOKENS_OUT = path.join(root, "guide/src/styles/tokens.generated.css");
const BRAND_JSON_PATH = path.join(root, "brand.json");
const ASSETS_SRC = path.join(root, "brand/assets");
const ASSETS_DEST = path.join(root, "guide/public/brand");
const OVERRIDES_SRC = path.join(root, "brand/overrides.css");
const OVERRIDES_DEST = path.join(root, "guide/src/styles/brand.overrides.css");

/** @typedef {{ value: string, usage?: string, guide?: string }} TokenDef */

const GUIDE_LAYERS = new Set(["brand", "secondary", "interface"]);

/** Default guide layer when DESIGN.md omits the Guide column. */
const DEFAULT_GUIDE_LAYER = {
  "--color-ink": "brand",
  "--color-ink-muted": "secondary",
  "--color-border": "interface",
  "--color-surface": "interface",
  "--color-surface-deep": "interface",
  "--color-paper": "interface",
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
 * @param {Map<string, TokenDef>} tokens
 * @returns {string}
 */
function renderTokensCss(tokens) {
  const lines = [
    "/* GENERATED FILE — do not edit by hand.",
    " * Source: DESIGN.md",
    " * Regenerate: node scripts/compile-design.mjs  (or npm run compile)",
    " */",
    "",
    ":root {",
  ];

  const ordered = [...tokens.entries()].sort(([a], [b]) => a.localeCompare(b));
  for (const [name, { value }] of ordered) {
    lines.push(`  ${name}: ${value};`);
  }
  lines.push("}", "");
  return lines.join("\n");
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
    .sort(([a], [b]) => a.localeCompare(b));

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
  if (!fs.existsSync(DESIGN_PATH)) {
    console.error(`Missing ${DESIGN_PATH}`);
    process.exit(1);
  }

  const md = fs.readFileSync(DESIGN_PATH, "utf8");
  const fromTables = parseTokenTables(md);
  const fromCss = parseCssRootBlock(md);
  const tokens = mergeTokens(fromTables, fromCss);

  if (tokens.size === 0) {
    console.error(
      "No tokens found in DESIGN.md (expected tables or a css :root block).",
    );
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(TOKENS_OUT), { recursive: true });
  fs.writeFileSync(TOKENS_OUT, renderTokensCss(tokens), "utf8");
  console.log(
    `Wrote ${tokens.size} tokens → ${path.relative(root, TOKENS_OUT)}`,
  );

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
      `Rebuilt brand.json colors from DESIGN.md (${agentCount} agent tokens, ${guideCount} guide swatches)`,
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
