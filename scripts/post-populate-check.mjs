#!/usr/bin/env node
/**
 * Post-populate checklist (machine-assisted).
 * Exit non-zero only on hard fails (invalid setup, missing required color roles).
 * Warnings (missing coverage when populated, missing logo assets) exit 0.
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

// Required color roles in Design system fence
const brandMdPath = path.join(root, "brand.md");
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
    if (fence.includes("--font-serif")) {
      warn(
        "--font-serif authored — ensure next/font loader in guide/src/app/layout.tsx if not a system face",
      );
    }
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
