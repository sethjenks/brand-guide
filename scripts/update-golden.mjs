/** Regenerate golden fixtures from current sources:
 *   - scripts/fixtures/brand.sample.expected.json
 *   - scripts/fixtures/tokens.sample.expected.json
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compile = spawnSync(process.execPath, [path.join(__dirname, "compile-all.mjs")], {
  stdio: "inherit",
});
if (compile.status !== 0) process.exit(compile.status ?? 1);

const validate = spawnSync(
  process.execPath,
  [path.join(__dirname, "validate-brand.mjs")],
  {
    stdio: "inherit",
    env: { ...process.env, UPDATE_GOLDEN: "1" },
  },
);
process.exit(validate.status ?? 1);
