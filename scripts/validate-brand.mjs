#!/usr/bin/env node
/**
 * Validate brand.json + DTCG tokens.json after compile:
 * 1) Required keys smoke check
 * 2) Golden fixture parity (stable fields) against Sample Brand sources
 * 3) DTCG smoke + golden fixture for tokens.json
 *
 * Regenerate fixtures after intentional Sample Brand changes:
 *   UPDATE_GOLDEN=1 npm run compile:check
 *   # or: node scripts/update-golden.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brandPath = path.join(root, "brand.json");
const brandMarkdownPath = path.join(root, "brand.md");
const publicBrandPath = path.join(root, "guide/public/brand.txt");
const fixturePath = path.join(
  root,
  "scripts/fixtures/brand.sample.expected.json",
);
const dtcgPath = path.join(root, "tokens.json");
const dtcgPublicPath = path.join(root, "guide/public/tokens.json");
const dtcgFixturePath = path.join(
  root,
  "scripts/fixtures/tokens.sample.expected.json",
);

if (!fs.existsSync(brandPath)) {
  console.error("Missing brand.json — run compile first");
  process.exit(1);
}

const brand = JSON.parse(fs.readFileSync(brandPath, "utf8"));
const required = [
  "guide.name",
  "guide.tagline",
  "guide.strategy.overview.what",
  "guide.voice.phrases",
  "guide.visual.colors.brand",
  "guide.expressions.items",
  "examples.copy",
  "rules.vocabulary",
  "templates.social_caption",
  "personality.anti_personality",
];

/** @param {unknown} obj @param {string} dotted */
function get(obj, dotted) {
  return dotted.split(".").reduce((acc, key) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return /** @type {Record<string, unknown>} */ (acc)[key];
  }, obj);
}

/** @param {Record<string, unknown>} input */
function stabilize(input) {
  const clone = structuredClone(input);
  clone._hash = "<volatile>";
  clone._compiled = "<volatile>";
  clone._last_material_change = "<volatile>";
  return clone;
}

let failed = 0;
for (const key of required) {
  const value = get(brand, key);
  const ok =
    value !== undefined &&
    value !== null &&
    value !== "" &&
    !(Array.isArray(value) && value.length === 0);
  if (!ok) {
    console.error(`FAIL missing/empty: ${key}`);
    failed += 1;
  }
}

if (!brand._spec_version) {
  console.error("FAIL missing _spec_version");
  failed += 1;
}

const anti = get(brand, "personality.anti_personality");
if (Array.isArray(anti) && anti.length < 4) {
  // Sample Brand lists four "we are not" items — truncation regression
  console.error(
    `FAIL personality.anti_personality length ${anti.length} (expected ≥ 4 for Sample Brand)`,
  );
  failed += 1;
}

const contexts = get(brand, "guide.voice.contexts");
if (Array.isArray(contexts)) {
  const hasIncident = contexts.some(
    (c) =>
      c &&
      typeof c === "object" &&
      /^incident$/i.test(String(/** @type {{ context?: string }} */ (c).context || "")),
  );
  if (!hasIncident) {
    console.error(
      "FAIL guide.voice.contexts missing Incident (should mirror brand.md Tone by context)",
    );
    failed += 1;
  }
}

const stable = stabilize(brand);

if (process.env.UPDATE_GOLDEN === "1") {
  fs.mkdirSync(path.dirname(fixturePath), { recursive: true });
  fs.writeFileSync(fixturePath, `${JSON.stringify(stable, null, 2)}\n`, "utf8");
  console.log(`Updated golden fixture → ${path.relative(root, fixturePath)}`);
} else if (!fs.existsSync(fixturePath)) {
  console.error(
    `Missing golden fixture at ${path.relative(root, fixturePath)}. Run UPDATE_GOLDEN=1 npm run compile:check once.`,
  );
  failed += 1;
} else {
  const expected = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  const actualJson = JSON.stringify(stable, null, 2);
  const expectedJson = JSON.stringify(expected, null, 2);
  if (actualJson !== expectedJson) {
    console.error(
      "FAIL golden fixture mismatch. If Sample Brand sources changed intentionally:\n  UPDATE_GOLDEN=1 npm run compile:check\n",
    );
    // Print a short diff hint
    const aLines = actualJson.split("\n");
    const eLines = expectedJson.split("\n");
    const max = Math.max(aLines.length, eLines.length);
    let shown = 0;
    for (let i = 0; i < max && shown < 12; i++) {
      if (aLines[i] !== eLines[i]) {
        console.error(`  line ${i + 1}:`);
        console.error(`    expected: ${eLines[i] ?? "<missing>"}`);
        console.error(`    actual:   ${aLines[i] ?? "<missing>"}`);
        shown += 1;
      }
    }
    failed += 1;
  } else {
    console.log(
      `OK golden fixture parity (${path.relative(root, fixturePath)})`,
    );
  }
}

// —— Public agent source ——
if (!fs.existsSync(publicBrandPath)) {
  console.error("FAIL missing guide/public/brand.txt — run compile first");
  failed += 1;
} else if (
  fs.readFileSync(brandMarkdownPath, "utf8") !==
  fs.readFileSync(publicBrandPath, "utf8")
) {
  console.error("FAIL brand.md and guide/public/brand.txt differ");
  failed += 1;
} else {
  console.log("OK public brand.txt parity");
}

// —— DTCG tokens.json ——
if (!fs.existsSync(dtcgPath)) {
  console.error("FAIL missing tokens.json — run compile first");
  failed += 1;
} else if (!fs.existsSync(dtcgPublicPath)) {
  console.error("FAIL missing guide/public/tokens.json — run compile first");
  failed += 1;
} else {
  const dtcgRaw = fs.readFileSync(dtcgPath, "utf8");
  const dtcgPublicRaw = fs.readFileSync(dtcgPublicPath, "utf8");
  if (dtcgRaw !== dtcgPublicRaw) {
    console.error("FAIL tokens.json and guide/public/tokens.json differ");
    failed += 1;
  }

  let dtcg;
  try {
    dtcg = JSON.parse(dtcgRaw);
  } catch {
    console.error("FAIL tokens.json is not valid JSON");
    failed += 1;
    dtcg = null;
  }

  if (dtcg) {
    const desc = String(dtcg.$description || "");
    if (!/generated/i.test(desc) || !/brand\.md/i.test(desc)) {
      console.error(
        "FAIL tokens.json $description should mention generated + brand.md",
      );
      failed += 1;
    }
    if (!dtcg.color?.ink?.$value) {
      console.error("FAIL tokens.json missing color.ink.$value");
      failed += 1;
    }
    if (!dtcg.color?.paper?.$value) {
      console.error("FAIL tokens.json missing color.paper.$value");
      failed += 1;
    }
    if (!dtcg.space || typeof dtcg.space !== "object") {
      console.error("FAIL tokens.json missing space group");
      failed += 1;
    }

    if (process.env.UPDATE_GOLDEN === "1") {
      fs.mkdirSync(path.dirname(dtcgFixturePath), { recursive: true });
      fs.writeFileSync(
        dtcgFixturePath,
        `${JSON.stringify(dtcg, null, 2)}\n`,
        "utf8",
      );
      console.log(
        `Updated DTCG golden fixture → ${path.relative(root, dtcgFixturePath)}`,
      );
    } else if (!fs.existsSync(dtcgFixturePath)) {
      console.error(
        `Missing DTCG golden fixture at ${path.relative(root, dtcgFixturePath)}. Run UPDATE_GOLDEN=1 npm run compile:check once.`,
      );
      failed += 1;
    } else {
      const expectedDtcg = JSON.parse(fs.readFileSync(dtcgFixturePath, "utf8"));
      const actualDtcgJson = JSON.stringify(dtcg, null, 2);
      const expectedDtcgJson = JSON.stringify(expectedDtcg, null, 2);
      if (actualDtcgJson !== expectedDtcgJson) {
        console.error(
          "FAIL DTCG golden fixture mismatch. If brand.md Design system tokens changed intentionally:\n  UPDATE_GOLDEN=1 npm run compile:check\n",
        );
        failed += 1;
      } else {
        console.log(
          `OK DTCG golden fixture parity (${path.relative(root, dtcgFixturePath)})`,
        );
      }
    }
  }
}

if (failed > 0) {
  process.exit(1);
}

console.log(
  `OK brand.json checks (${required.length} keys, spec ${brand._spec_version})`,
);
console.log("OK tokens.json DTCG checks");
