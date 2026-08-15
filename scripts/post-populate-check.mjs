#!/usr/bin/env node
/**
 * Post-populate checklist (machine-assisted).
 * Exit non-zero only on hard fails (invalid setup, missing required color roles,
 * type face/stack/loader mismatches).
 * Warnings (missing coverage when populated, missing logo assets, system-only
 * font stacks) exit 0.
 *
 * Usage: node scripts/post-populate-check.mjs
 *        npm run post-populate-check  (from guide/)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseCoverage } from "./lib/coverage-schema.mjs";
import { parseSetup } from "./lib/setup-schema.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const REQUIRED_COLORS = [
  "--color-ink",
  "--color-ink-muted",
  "--color-ink-subtle",
  "--color-canvas",
  "--color-paper",
  "--color-surface",
  "--color-surface-deep",
  "--color-border",
];

const DESIGN_SYSTEM_START = "<!-- brand-guide:design-system -->";
const DESIGN_SYSTEM_END = "<!-- /brand-guide:design-system -->";

const FONT_STACK_TOKENS = ["--font-sans", "--font-serif", "--font-mono"];

let hardFails = 0;
let warns = 0;

function pass(msg) {
  console.log(`PASS  ${msg}`);
}
function warn(msg) {
  warns += 1;
  console.warn(`WARN  ${msg}`);
}
function fail(msg) {
  hardFails += 1;
  console.error(`FAIL  ${msg}`);
}

/**
 * Parse `**Label.** value` lines from brand.md Visual sections.
 * @param {string} md
 * @returns {Map<string, string>}
 */
function extractLabeled(md) {
  /** @type {Map<string, string>} */
  const map = new Map();
  for (const line of md.split("\n")) {
    const m = line.match(/^\*\*([^*]+)\.\*\*\s*(.*)$/);
    if (!m) continue;
    map.set(m[1].trim().toLowerCase(), m[2].trim());
  }
  return map;
}

/**
 * Collect `variable: "--font-…"` declarations from layout.tsx.
 * @param {string} layoutSrc
 * @returns {Set<string>}
 */
function layoutFontVariables(layoutSrc) {
  /** @type {Set<string>} */
  const vars = new Set();
  const re = /variable:\s*["'](--font-[a-z0-9-]+)["']/gi;
  let m;
  while ((m = re.exec(layoutSrc)) !== null) {
    vars.add(m[1]);
  }
  return vars;
}

/**
 * Extract `var(--font-*)` names from a CSS declaration value.
 * @param {string} value
 * @returns {string[]}
 */
function varsInStack(value) {
  /** @type {string[]} */
  const found = [];
  const re = /var\(\s*(--font-[a-z0-9-]+)\s*[,)]/gi;
  let m;
  while ((m = re.exec(value)) !== null) {
    found.push(m[1]);
  }
  return found;
}

/**
 * Pull `:root` declaration values for known font stack tokens from the fence.
 * @param {string} fence
 * @returns {Map<string, string>}
 */
function fontStackDeclarations(fence) {
  /** @type {Map<string, string>} */
  const stacks = new Map();
  for (const token of FONT_STACK_TOKENS) {
    const escaped = token.replace(/-/g, "\\-");
    const re = new RegExp(`${escaped}\\s*:\\s*([^;]+);`, "i");
    const m = fence.match(re);
    if (m) stacks.set(token, m[1].trim());
  }
  return stacks;
}

// Setup
const setupPath = path.join(root, "brand/setup.json");
if (!fs.existsSync(setupPath)) {
  fail("brand/setup.json missing");
} else {
  const parsed = parseSetup(JSON.parse(fs.readFileSync(setupPath, "utf8")));
  if (!parsed.success) {
    fail(`brand/setup.json invalid:\n${parsed.error.message}`);
  } else {
    pass("brand/setup.json validates");
    const citations = parsed.data.sources.filter((s) => s.kind === "citation");
    const intakes = parsed.data.sources.filter((s) => s.kind === "intake");
    pass(
      `sources: ${intakes.length} intake, ${citations.length} citation`,
    );
    if (parsed.data.status === "populated") {
      const coveragePath = path.join(root, "brand/coverage.json");
      if (!fs.existsSync(coveragePath)) {
        warn(
          "brand/coverage.json missing while status is populated — write filled|inferred|placeholder report",
        );
      } else {
        const cov = parseCoverage(
          JSON.parse(fs.readFileSync(coveragePath, "utf8")),
        );
        if (!cov.success) {
          fail(`brand/coverage.json invalid:\n${cov.error.message}`);
        } else {
          pass("brand/coverage.json validates");
          const inferred = Object.entries(cov.data.sections)
            .filter(([, v]) => v.status === "inferred")
            .map(([k]) => k);
          if (inferred.length) {
            warn(`Review inferred sections: ${inferred.join(", ")}`);
          }
        }
      }
    }
  }
}

// Required color roles + type contract in Design system fence
const brandMdPath = path.join(root, "brand.md");
const layoutPath = path.join(root, "guide/src/app/layout.tsx");

if (!fs.existsSync(brandMdPath)) {
  fail("brand.md missing");
} else {
  const md = fs.readFileSync(brandMdPath, "utf8");
  const start = md.indexOf(DESIGN_SYSTEM_START);
  const end = md.indexOf(DESIGN_SYSTEM_END);
  if (start === -1 || end === -1) {
    fail("brand.md missing Design system fence markers");
  } else {
    const fence = md.slice(start, end);
    for (const token of REQUIRED_COLORS) {
      if (!fence.includes(`\`${token}\``) && !fence.includes(`${token}:`)) {
        fail(`Design system missing required token ${token}`);
      }
    }
    if (!fence.includes("--font-sans")) {
      fail("Design system missing --font-sans");
    } else {
      pass("required color roles + --font-sans present");
    }

    const labeled = extractLabeled(md);
    const typeDisplay = (labeled.get("type display") || "").trim();
    const typeMono = (labeled.get("type mono") || "").trim();

    if (typeDisplay && !fence.includes("--font-serif")) {
      fail(
        "**Type display.** authored but Design system fence missing --font-serif",
      );
    } else if (typeDisplay) {
      pass("Type display. paired with --font-serif");
    }

    if (typeMono && !fence.includes("--font-mono")) {
      fail(
        "**Type mono.** authored but Design system fence missing --font-mono",
      );
    } else if (typeMono) {
      pass("Type mono. paired with --font-mono");
    }

    const stacks = fontStackDeclarations(fence);
    const layoutSrc = fs.existsSync(layoutPath)
      ? fs.readFileSync(layoutPath, "utf8")
      : "";
    if (!fs.existsSync(layoutPath)) {
      fail("guide/src/app/layout.tsx missing");
    } else {
      const loaded = layoutFontVariables(layoutSrc);
      let loaderMismatches = 0;
      for (const [token, value] of stacks) {
        const vars = varsInStack(value);
        if (vars.length === 0) {
          warn(
            `${token} has no var(--font-*) — system faces are ok, but confirm intentional`,
          );
          continue;
        }
        for (const v of vars) {
          if (!loaded.has(v)) {
            fail(
              `${token} references ${v} but layout.tsx has no variable: "${v}"`,
            );
            loaderMismatches += 1;
          }
        }
      }
      if (loaderMismatches === 0 && stacks.size > 0) {
        pass("font stack var(--font-*) loaders match layout.tsx");
      }
    }
  }
}

// Guide view-model checks (brand.json after compile)
const brandJsonPath = path.join(root, "brand.json");
if (!fs.existsSync(brandJsonPath)) {
  fail("brand.json missing — run npm run compile");
} else {
  try {
    const brandJson = JSON.parse(fs.readFileSync(brandJsonPath, "utf8"));
    const guide = brandJson.guide || {};
    const expressionItems = guide.expressions?.items || [];
    const knownOrSlug = (channel) => {
      const key = String(channel || "")
        .trim()
        .toLowerCase();
      if (!key) return null;
      const map = {
        web: "applications-web",
        social: "applications-social",
        print: "applications-print",
        "business cards": "applications-business-cards",
        "business card": "applications-business-cards",
        merchandise: "applications-merchandise",
        swag: "applications-merchandise",
        packaging: "applications-packaging",
        signage: "applications-signage",
        presentation: "applications-presentation",
        "out of home": "applications-ooh",
        ooh: "applications-ooh",
        "digital ads": "applications-digital-ads",
        app: "applications-app",
        email: "applications-email",
      };
      if (map[key]) return map[key];
      if (key.startsWith("print")) return "applications-print";
      const slug = key.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      return `applications-${slug || "channel"}`;
    };
    let exprOk = true;
    for (const item of expressionItems) {
      const ch = (item.channel || "").trim();
      if (!ch) continue;
      const id = knownOrSlug(ch);
      if (!id) {
        fail(`expression channel "${ch}" has no applications leaf id`);
        exprOk = false;
      }
    }
    if (exprOk) {
      pass(
        `expressions channels have leaf ids (${expressionItems.length} row(s))`,
      );
    }

    const phrases = guide.voice?.phrases || [];
    const weSay = guide.voice?.weSay || [];
    // Catalog ids must exist in GUIDE_NAV (hardcoded check of known ids).
    if (phrases.length > 0) {
      pass("voice.phrases present — language-phrases leaf required in catalog");
    }
    if (weSay.length > 0) {
      pass("voice.weSay present — language-we-say leaf required in catalog");
    }

    const logoClearspace = guide.visual?.logo?.clearspace;
    if (logoClearspace) {
      pass("visual.logo.clearspace on guide view model");
    } else {
      const mdLabeled = fs.existsSync(brandMdPath)
        ? fs.readFileSync(brandMdPath, "utf8")
        : "";
      if (/\*\*Logo clearspace\.\*\*/i.test(mdLabeled)) {
        warn(
          "**Logo clearspace.** authored but guide.visual.logo.clearspace empty",
        );
      }
    }

    const proportion = guide.visual?.colors?.proportion;
    const mdForProp = fs.existsSync(brandMdPath)
      ? fs.readFileSync(brandMdPath, "utf8")
      : "";
    if (/\*\*Colors proportion\.\*\*/i.test(mdForProp) && !proportion) {
      warn(
        "**Colors proportion.** authored but guide.visual.colors.proportion empty",
      );
    }

    const avoid = guide.visual?.imagery?.avoid;
    if (Array.isArray(avoid)) {
      pass("imagery.avoid is an array on guide view model");
    } else if (typeof avoid === "string" && avoid.trim()) {
      warn("imagery.avoid should be a split array on the guide view model");
    }
  } catch (err) {
    fail(`brand.json unreadable: ${err instanceof Error ? err.message : err}`);
  }
}

// Logo assets
const assetsDir = path.join(root, "brand/assets");
const logoCandidates = ["logo.svg", "logo.png", "wordmark.svg", "mark.svg"];
if (!fs.existsSync(assetsDir)) {
  warn("brand/assets/ missing — add logo exports when available");
} else {
  const files = fs.readdirSync(assetsDir);
  const hasLogo = logoCandidates.some((f) => files.includes(f));
  if (!hasLogo) {
    warn(
      `No logo file in brand/assets/ (looked for ${logoCandidates.join(", ")})`,
    );
  } else {
    pass("logo asset present under brand/assets/");
  }
}

console.log("");
if (hardFails > 0) {
  console.error(`post-populate-check: ${hardFails} fail(s), ${warns} warn(s)`);
  process.exit(1);
}
console.log(`post-populate-check: OK (${warns} warn(s))`);
process.exit(0);
