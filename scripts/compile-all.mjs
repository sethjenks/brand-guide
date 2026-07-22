#!/usr/bin/env node
/** Run compile-brand then compile-design. */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
