#!/usr/bin/env node
/** Run compile-brand then compile-design, then validate brand/setup.json. */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSetup } from "./lib/setup-schema.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function run(script) {
  const result = spawnSync(process.execPath, [path.join(__dirname, script)], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("compile-brand.mjs");
run("compile-design.mjs");

const setupPath = path.join(root, "brand/setup.json");
if (!fs.existsSync(setupPath)) {
  console.error(`compile-all: missing ${path.relative(root, setupPath)}`);
  process.exit(1);
}
const setupParsed = parseSetup(
  JSON.parse(fs.readFileSync(setupPath, "utf8")),
);
if (!setupParsed.success) {
  console.error("compile-all: invalid brand/setup.json:\n");
  console.error(setupParsed.error.message);
  process.exit(1);
}
console.log("OK brand/setup.json");
