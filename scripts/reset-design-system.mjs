#!/usr/bin/env node
/**
 * Replace the fenced Design system block in brand.md with
 * examples/design-system.default.md, then compile.
 *
 * Usage: node scripts/reset-design-system.mjs
 *        npm run tokens:reset  (from guide/)
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const BRAND_MD = path.join(root, "brand.md");
const DEFAULT_BLOCK = path.join(root, "examples/design-system.default.md");
const DESIGN_SYSTEM_START = "<!-- brand-guide:design-system -->";
const DESIGN_SYSTEM_END = "<!-- /brand-guide:design-system -->";

function normalizeFenceBlock(raw) {
  let text = raw.trim();
  if (!text.includes(DESIGN_SYSTEM_START)) {
    text = `${DESIGN_SYSTEM_START}\n${text}`;
  }
  if (!text.includes(DESIGN_SYSTEM_END)) {
    text = `${text}\n${DESIGN_SYSTEM_END}`;
  }
  return text.trim();
}

function main() {
  if (!fs.existsSync(BRAND_MD)) {
    console.error(`Missing ${BRAND_MD}`);
    process.exit(1);
  }
  if (!fs.existsSync(DEFAULT_BLOCK)) {
    console.error(`Missing ${DEFAULT_BLOCK}`);
    process.exit(1);
  }

  const brandMd = fs.readFileSync(BRAND_MD, "utf8");
  const start = brandMd.indexOf(DESIGN_SYSTEM_START);
  const end = brandMd.indexOf(DESIGN_SYSTEM_END);
  if (start === -1 || end === -1 || end <= start) {
    console.error(
      `Missing Design system fence in brand.md (expected ${DESIGN_SYSTEM_START} … ${DESIGN_SYSTEM_END}).`,
    );
    process.exit(1);
  }

  const replacement = normalizeFenceBlock(
    fs.readFileSync(DEFAULT_BLOCK, "utf8"),
  );
  const next =
    brandMd.slice(0, start) +
    replacement +
    brandMd.slice(end + DESIGN_SYSTEM_END.length);
  fs.writeFileSync(BRAND_MD, next.endsWith("\n") ? next : `${next}\n`, "utf8");
  console.log(
    `Reset Design system in brand.md from ${path.relative(root, DEFAULT_BLOCK)}`,
  );

  const compile = spawnSync(
    process.execPath,
    [path.join(__dirname, "compile-all.mjs")],
    { stdio: "inherit" },
  );
  process.exit(compile.status ?? 1);
}

main();
