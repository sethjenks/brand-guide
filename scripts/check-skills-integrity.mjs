#!/usr/bin/env node
/**
 * Skills integrity: catalog rows ↔ SKILL.md, skills_spec_version lockstep,
 * deep+files ops siblings. Soft-warns when writes: anchors look missing from
 * the skill body (scaffolds allowed).
 *
 *   node scripts/check-skills-integrity.mjs
 *   npm run skills:check   # from guide/
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(root, "skills");
const readmePath = path.join(skillsDir, "README.md");

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  // Collect writes list items after writes:
  const writes = [];
  let inWrites = false;
  for (const line of match[1].split(/\r?\n/)) {
    if (/^writes:\s*$/.test(line)) {
      inWrites = true;
      continue;
    }
    if (inWrites) {
      const item = line.match(/^\s*-\s+(.+)$/);
      if (item) {
        writes.push(item[1].trim());
        continue;
      }
      if (/^[A-Za-z0-9_]+:/.test(line)) inWrites = false;
    }
  }
  if (writes.length) data.writes = writes;
  return data;
}

function parseCatalog(readme) {
  const fm = parseFrontmatter(readme);
  if (!fm?.skills_spec_version) {
    fail("skills/README.md frontmatter missing skills_spec_version");
  }
  const catalogVersion = fm?.skills_spec_version ?? null;

  const rows = [];
  const tableStart = readme.indexOf("| skill_id |");
  if (tableStart === -1) {
    fail("skills/README.md missing Catalog table (| skill_id | …)");
    return { catalogVersion, rows };
  }
  const afterHeader = readme.slice(tableStart);
  const lines = afterHeader.split(/\r?\n/).slice(2); // skip header + separator
  for (const line of lines) {
    if (!line.startsWith("|")) break;
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter((c, i, arr) => i > 0 && i < arr.length - 1);
    if (cells.length < 6) continue;
    const [skill_id, version, depth, status, opsLayout, pathCell] = cells;
    if (!skill_id || skill_id === "skill_id") continue;
    const link = pathCell.match(/\(([^)]+)\)/);
    rows.push({
      skill_id,
      version,
      depth,
      status,
      opsLayout,
      relPath: link ? link[1] : `${skill_id}/SKILL.md`,
    });
  }
  if (!rows.length) {
    fail("skills/README.md Catalog table has no skill rows");
  }
  return { catalogVersion, rows };
}

const readme = fs.readFileSync(readmePath, "utf8");
const { catalogVersion, rows } = parseCatalog(readme);

for (const row of rows) {
  const skillPath = path.join(skillsDir, row.relPath);
  if (!fs.existsSync(skillPath)) {
    fail(`Catalog skill "${row.skill_id}" missing file: skills/${row.relPath}`);
    continue;
  }
  const raw = fs.readFileSync(skillPath, "utf8");
  const fm = parseFrontmatter(raw);
  if (!fm) {
    fail(`skills/${row.relPath}: missing YAML frontmatter`);
    continue;
  }
  if (fm.skill_id && fm.skill_id !== row.skill_id) {
    fail(
      `skills/${row.relPath}: skill_id "${fm.skill_id}" ≠ catalog "${row.skill_id}"`,
    );
  }
  if (catalogVersion && fm.skills_spec_version !== catalogVersion) {
    fail(
      `skills/${row.relPath}: skills_spec_version "${fm.skills_spec_version}" ≠ catalog "${catalogVersion}"`,
    );
  }
  if (fm.version && fm.version !== row.version) {
    fail(
      `skills/${row.relPath}: version "${fm.version}" ≠ catalog "${row.version}"`,
    );
  }
  if (fm.depth && fm.depth !== row.depth) {
    fail(
      `skills/${row.relPath}: depth "${fm.depth}" ≠ catalog "${row.depth}"`,
    );
  }

  if (row.opsLayout === "files" || row.depth === "deep") {
    const dir = path.dirname(skillPath);
    for (const op of ["populate.md", "audit.md", "improve.md"]) {
      if (!fs.existsSync(path.join(dir, op))) {
        fail(
          `skills/${row.skill_id}/: deep/files skill missing ${op}`,
        );
      }
    }
  }

  // Soft: writes: entries should appear somewhere in the skill body
  if (Array.isArray(fm.writes)) {
    const body = raw.replace(/^---[\s\S]*?---\r?\n/, "");
    for (const w of fm.writes) {
      const heading = w.includes("#") ? w.split("#").slice(1).join("#") : w;
      const needle = heading.replace(/^.*\//, "").trim();
      if (needle && !body.includes(needle) && !raw.includes(w)) {
        warn(
          `skills/${row.relPath}: writes entry "${w}" not clearly referenced in skill body`,
        );
      }
    }
  }
}

for (const w of warnings) {
  console.warn(`warn: ${w}`);
}

if (errors.length) {
  console.error("skills integrity failed:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `skills integrity ok (${rows.length} catalog skills, skills_spec_version ${catalogVersion})`,
);
if (warnings.length) {
  console.log(`(${warnings.length} soft warning(s))`);
}
