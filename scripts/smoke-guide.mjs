#!/usr/bin/env node
/**
 * Thin guide smoke: start production Next, GET /, assert core chapter intro ids.
 * Caller must run `npm run build` from guide/ first (see package.json "smoke").
 *
 *   node scripts/smoke-guide.mjs
 *   npm run smoke   # from guide/
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = 3456;
const HOST = `http://127.0.0.1:${PORT}`;
const READY_MS = 60_000;
const POLL_MS = 500;

/** Core chapter GraphicStatement / intro leaf ids (extended chapters omitted). */
const REQUIRED_IDS = [
  "strategy-introduction",
  "language-introduction",
  "typography-introduction",
  "color-introduction",
  "system-introduction",
];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const guideDir = path.join(root, "guide");

const child = spawn(
  process.execPath,
  [
    path.join(guideDir, "node_modules/next/dist/bin/next"),
    "start",
    "-p",
    String(PORT),
  ],
  {
    cwd: guideDir,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: String(PORT) },
  },
);

let settling = "";
child.stdout?.on("data", (chunk) => {
  settling += chunk.toString();
});
child.stderr?.on("data", (chunk) => {
  settling += chunk.toString();
});

function cleanup() {
  if (child.exitCode === null && !child.killed) {
    child.kill("SIGTERM");
  }
}

process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

/**
 * @param {number} ms
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForHomeHtml() {
  const deadline = Date.now() + READY_MS;
  let lastErr = "";
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(
        `next start exited early (code ${child.exitCode})\n${settling}`,
      );
    }
    try {
      const res = await fetch(`${HOST}/`);
      if (res.ok) {
        return await res.text();
      }
      lastErr = `HTTP ${res.status}`;
    } catch (err) {
      lastErr = err instanceof Error ? err.message : String(err);
    }
    await sleep(POLL_MS);
  }
  throw new Error(
    `Timed out waiting for ${HOST}/ (${lastErr})\n${settling.slice(-2000)}`,
  );
}

try {
  const html = await waitForHomeHtml();
  const missing = REQUIRED_IDS.filter(
    (id) => !html.includes(`id="${id}"`) && !html.includes(`id='${id}'`),
  );
  if (missing.length) {
    console.error("smoke-guide: missing required element id(s):");
    for (const id of missing) console.error(`  - ${id}`);
    cleanup();
    process.exit(1);
  }
  console.log(
    `smoke-guide: ok (${REQUIRED_IDS.length} core intro ids on ${HOST}/)`,
  );
  cleanup();
  // Give the process a moment to exit; don't hang the npm script.
  await sleep(300);
  process.exit(0);
} catch (err) {
  console.error(`smoke-guide: ${err instanceof Error ? err.message : err}`);
  cleanup();
  process.exit(1);
}
