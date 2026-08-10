#!/usr/bin/env node
/**
 * Import Stitch/MD3-style DESIGN.md YAML dumps into a brand.md Design system fence.
 *
 * Usage (from guide/ or repo root):
 *   node scripts/import-design-dump.mjs --print path/to/DESIGN.md
 *   node scripts/import-design-dump.mjs --splice --yes path/to/DESIGN.md
 *
 * Does not rewrite Strategy / Voice. Prefer --print, review, then --splice --yes.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);
const YAML = require(path.join(root, "guide/node_modules/yaml"));

const DESIGN_SYSTEM_START = "<!-- brand-guide:design-system -->";
const DESIGN_SYSTEM_END = "<!-- /brand-guide:design-system -->";

/** Prefer named brand keys, then MD3 roles. */
const ROLE_MAP = [
  {
    token: "--color-ink",
    keys: ["obsidian-ink", "on-surface", "on-background"],
    usage: "Primary text / chrome",
    guide: "brand",
  },
  {
    token: "--color-ink-muted",
    keys: ["on-surface-variant"],
    usage: "Secondary text",
    guide: "secondary",
  },
  {
    token: "--color-ink-subtle",
    keys: ["outline"],
    usage: "Tertiary text / meta",
    guide: "secondary",
  },
  {
    token: "--color-accent",
    keys: ["clay-earth", "primary-container", "primary"],
    usage: "Primary CTA / accent",
    guide: "brand",
  },
  {
    token: "--color-paper",
    keys: ["surface-container-lowest"],
    usage: "Content card / paper",
    guide: "chrome",
    fallback: "#ffffff",
  },
  {
    token: "--color-canvas",
    keys: ["warm-sand", "background", "surface"],
    usage: "App canvas / Level 0",
    guide: "chrome",
  },
  {
    token: "--color-surface",
    keys: ["surface-container", "surface-container-low"],
    usage: "Panels / subtle fills",
    guide: "chrome",
  },
  {
    token: "--color-surface-deep",
    keys: ["surface-container-high", "surface-container-highest", "surface-dim"],
    usage: "Deeper panels / hover",
    guide: "chrome",
  },
  {
    token: "--color-border",
    keys: ["warm-sand", "outline-variant"],
    usage: "Borders / dividers",
    guide: "chrome",
  },
  {
    token: "--color-rail",
    keys: ["surface-container-low", "surface-container"],
    usage: "Sidebar / rail",
    guide: "chrome",
  },
];

const REQUIRED = [
  "--color-ink",
  "--color-ink-muted",
  "--color-ink-subtle",
  "--color-canvas",
  "--color-paper",
  "--color-surface",
  "--color-surface-deep",
  "--color-border",
];

/**
 * @param {string} md
 */
function parseFrontmatter(md) {
  if (!md.startsWith("---")) {
    throw new Error("DESIGN.md must start with YAML frontmatter (---)");
  }
  const end = md.indexOf("\n---", 3);
  if (end === -1) throw new Error("Unclosed YAML frontmatter");
  const raw = md.slice(4, end);
  const data = YAML.parse(raw);
  if (!data || typeof data !== "object") {
    throw new Error("Frontmatter did not parse to an object");
  }
  return data;
}

/**
 * @param {Record<string, unknown>} colors
 * @param {string[]} keys
 */
function pickColor(colors, keys) {
  for (const key of keys) {
    const v = colors[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

/**
 * @param {string} name
 */
function toCssName(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

/**
 * @param {unknown} typography
 */
function collectFontFamilies(typography) {
  /** @type {Set<string>} */
  const faces = new Set();
  if (!typography || typeof typography !== "object") return faces;
  for (const entry of Object.values(typography)) {
    if (entry && typeof entry === "object" && "fontFamily" in entry) {
      const fam = /** @type {{ fontFamily?: string }} */ (entry).fontFamily;
      if (typeof fam === "string" && fam.trim()) faces.add(fam.trim());
    }
  }
  return faces;
}

/**
 * @param {string} face
 */
function stackForFace(face) {
  const lower = face.toLowerCase();
  if (lower === "geist") {
    return 'var(--font-geist-sans), "Geist", "IBM Plex Sans", system-ui, sans-serif';
  }
  if (lower === "literata" || lower.includes("serif") || lower === "tobias") {
    const title = face.charAt(0).toUpperCase() + face.slice(1);
    return `"${title}", "Iowan Old Style", "Palatino Linotype", Palatino, serif`;
  }
  const title = face.charAt(0).toUpperCase() + face.slice(1);
  return `"${title}", system-ui, sans-serif`;
}

/**
 * @param {Record<string, unknown>} data
 */
function buildTokens(data) {
  const colors =
    data.colors && typeof data.colors === "object"
      ? /** @type {Record<string, unknown>} */ (data.colors)
      : {};
  const brandName =
    typeof data.name === "string" && data.name.trim()
      ? data.name.trim()
      : "Imported brand";

  /** @type {Map<string, { value: string, usage: string, guide: string }>} */
  const tokens = new Map();

  for (const role of ROLE_MAP) {
    if (tokens.has(role.token)) continue;
    const value = pickColor(colors, role.keys) || role.fallback;
    if (!value) continue;
    tokens.set(role.token, {
      value,
      usage: role.usage,
      guide: role.guide,
    });
  }

  for (const [key, raw] of Object.entries(colors)) {
    if (typeof raw !== "string" || !raw.trim()) continue;
    const token = `--color-${toCssName(key)}`;
    if (tokens.has(token)) continue;
    // Skip keys already consumed as semantic roles
    const usedAsRole = ROLE_MAP.some((r) => r.keys.includes(key));
    if (usedAsRole && [...tokens.values()].some((t) => t.value === raw.trim())) {
      // still emit named brand aliases for clay/golden/etc.
      if (
        !["clay-earth", "golden-sun", "warm-sand", "obsidian-ink", "primary"].includes(
          key,
        )
      ) {
        continue;
      }
    }
    tokens.set(token, {
      value: raw.trim(),
      usage: `From dump: ${key}`,
      guide: usedAsRole ? "brand" : "interface",
    });
  }

  for (const req of REQUIRED) {
    if (!tokens.has(req)) {
      throw new Error(
        `Could not map required token ${req} from dump colors. Add an explicit key or fix ROLE_MAP.`,
      );
    }
  }

  const faces = [...collectFontFamilies(data.typography)];
  const serifFace = faces.find((f) =>
    /literata|serif|tobias|georgia|playfair/i.test(f),
  );
  const sansFace =
    faces.find((f) => /geist|sans|inter|plex/i.test(f)) ||
    faces.find((f) => f !== serifFace) ||
    "geist";

  const fontSans = stackForFace(sansFace);
  const fontSerif = serifFace ? stackForFace(serifFace) : undefined;

  let radiusBase = "0.5rem";
  const rounded = data.rounded;
  if (rounded && typeof rounded === "object") {
    const r = /** @type {Record<string, unknown>} */ (rounded);
    const def = r.DEFAULT ?? r.default ?? r.md;
    if (typeof def === "string" || typeof def === "number") {
      radiusBase = String(def);
    }
  }

  let spaceUnit = "0.25rem";
  const spacing = data.spacing;
  if (spacing && typeof spacing === "object") {
    const base = /** @type {Record<string, unknown>} */ (spacing).base;
    if (typeof base === "string" && base.endsWith("px")) {
      const px = Number.parseFloat(base);
      if (Number.isFinite(px)) spaceUnit = `${px / 16}rem`;
    } else if (typeof base === "number") {
      spaceUnit = `${base / 16}rem`;
    }
  }

  return { brandName, tokens, fontSans, fontSerif, radiusBase, spaceUnit };
}

/**
 * @param {ReturnType<typeof buildTokens>} built
 */
function renderFence(built) {
  const { brandName, tokens, fontSans, fontSerif, radiusBase, spaceUnit } =
    built;
  const colorRows = [...tokens.entries()]
    .filter(([name]) => name.startsWith("--color-"))
    .sort(([a], [b]) => a.localeCompare(b));

  const table = [
    "| Token | Value | Usage | Guide |",
    "| --- | --- | --- | --- |",
    ...colorRows.map(
      ([name, def]) =>
        `| \`${name}\` | \`${def.value}\` | ${def.usage} | ${def.guide} |`,
    ),
  ].join("\n");

  const cssLines = colorRows.map(
    ([name, def]) => `  ${name}: ${def.value};`,
  );
  cssLines.push(`  --font-sans: ${fontSans};`);
  if (fontSerif) cssLines.push(`  --font-serif: ${fontSerif};`);
  cssLines.push(`  --type-base: 16;`);
  cssLines.push(`  --type-ratio: 1.2;`);
  cssLines.push(`  --font-size-display: clamp(2.75rem, 6vw, 4.25rem);`);
  cssLines.push(`  --font-size-h0: clamp(4.5rem, 14vw, 9rem);`);
  cssLines.push(`  --line-height-body: 1.55;`);
  cssLines.push(`  --font-weight-regular: 400;`);
  cssLines.push(`  --font-weight-medium: 500;`);
  cssLines.push(`  --font-weight-semibold: 600;`);
  cssLines.push(`  --space-unit: ${spaceUnit};`);
  cssLines.push(`  --content-max: 65ch;`);
  cssLines.push(`  --guide-max: 60rem;`);
  cssLines.push(`  --radius-base: ${radiusBase};`);

  const typeTable = [
    "| Token | Value | Usage |",
    "| --- | --- | --- |",
    `| \`--font-sans\` | \`${fontSans}\` | Body / UI |`,
    ...(fontSerif
      ? [`| \`--font-serif\` | \`${fontSerif}\` | Headlines / display |`]
      : []),
    "| `--type-base` | `16` | Modular scale base (px) |",
    "| `--type-ratio` | `1.2` | Modular scale ratio |",
    "| `--radius-base` | `" + radiusBase + "` | Corner radius base |",
    "| `--space-unit` | `" + spaceUnit + "` | Space unit |",
  ].join("\n");

  return `${DESIGN_SYSTEM_START}
## Design system

Implementation layer imported from a design dump for **${brandName}**. Strategy / Voice / Visual above remain the brief — this block is **what to ship**.

**Theme authoring:** edit this fenced block only. Run \`npm run tokens\` or \`npm run compile\` from \`guide/\`.

### Color tokens

${table}

\`Guide\` column: \`brand\` | \`secondary\` | \`interface\` | \`chrome\` (CSS only).

\`\`\`css
:root {
${cssLines.join("\n")}
}
\`\`\`

**Rules**

- Prefer these tokens for marketing and UI; add new semantic tokens here before using one-off hex in CSS.
- Body text on \`--color-paper\` must meet WCAG AA (≥ 4.5:1).
- Compile does not load webfonts — add \`next/font\` loaders in \`guide/src/app/layout.tsx\` when using non-system faces.

### Type & layout tokens

${typeTable}

### Components

| Component | Guidance |
| --- | --- |
| Primary button | Accent fill, on-accent text; follow dump radius |
| Secondary button | Paper fill, ink text, border |
| Cards | Prefer none unless interactive |

### Sync checklist

1. Fill Strategy / Voice from dump prose (or leave Sample Brand placeholders + coverage.json)
2. Run \`npm run compile\` from \`guide/\`
3. Run \`npm run post-populate-check\` from \`guide/\`
${DESIGN_SYSTEM_END}
`;
}

/**
 * @param {string[]} argv
 */
function parseArgs(argv) {
  let print = true;
  let splice = false;
  let yes = false;
  /** @type {string[]} */
  const files = [];
  for (const arg of argv) {
    if (arg === "--print") print = true;
    else if (arg === "--splice") {
      splice = true;
      print = false;
    } else if (arg === "--yes") yes = true;
    else if (arg.startsWith("-")) {
      throw new Error(`Unknown flag: ${arg}`);
    } else files.push(arg);
  }
  if (files.length !== 1) {
    throw new Error(
      "Usage: node scripts/import-design-dump.mjs [--print|--splice --yes] <DESIGN.md>",
    );
  }
  return { print, splice, yes, file: path.resolve(files[0]) };
}

function main() {
  const { print, splice, yes, file } = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    process.exit(1);
  }
  const md = fs.readFileSync(file, "utf8");
  const data = parseFrontmatter(md);
  const built = buildTokens(data);
  const fence = renderFence(built);

  console.error(
    `Mapped ${built.tokens.size} color tokens for ${built.brandName}. Does not rewrite Strategy/Voice.`,
  );

  if (print && !splice) {
    process.stdout.write(fence);
    return;
  }

  if (splice) {
    if (!yes) {
      console.error(
        "Refusing --splice without --yes (writes brand.md.bak then replaces Design system fence).",
      );
      process.exit(1);
    }
    const brandPath = path.join(root, "brand.md");
    if (!fs.existsSync(brandPath)) {
      console.error(`Missing ${brandPath}`);
      process.exit(1);
    }
    const brand = fs.readFileSync(brandPath, "utf8");
    const start = brand.indexOf(DESIGN_SYSTEM_START);
    const end = brand.indexOf(DESIGN_SYSTEM_END);
    if (start === -1 || end === -1 || end < start) {
      console.error("brand.md missing design-system fence markers");
      process.exit(1);
    }
    const bakPath = `${brandPath}.bak`;
    fs.writeFileSync(bakPath, brand, "utf8");
    const next =
      brand.slice(0, start) +
      fence.trimEnd() +
      "\n" +
      brand.slice(end + DESIGN_SYSTEM_END.length);
    fs.writeFileSync(brandPath, next, "utf8");
    console.error(
      `Wrote ${path.relative(root, brandPath)} (backup ${path.relative(root, bakPath)})`,
    );
  }
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
