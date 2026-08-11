/**
 * brand/setup.json schema for compile-time validation.
 * Keep in sync with guide/src/lib/setup-schema.ts (fixture-locked in validate-brand).
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { z } = require(
  path.resolve(__dirname, "../../guide/node_modules/zod"),
);

const intakeSourceSchema = z.object({
  kind: z.literal("intake"),
  label: z.string().min(1),
  detail: z.string(),
  prompt: z.string().min(1),
  url: z.string().optional(),
  path: z.string().optional(),
});

const citationSourceSchema = z.object({
  kind: z.literal("citation"),
  label: z.string().min(1),
  detail: z.string(),
  url: z.string().optional(),
  path: z.string().optional(),
});

const setupSourceSchema = z.preprocess((val) => {
  if (!val || typeof val !== "object") return val;
  const o = /** @type {Record<string, unknown>} */ (val);
  if (o.kind === "citation") return o;
  if (
    o.kind === "intake" ||
    (typeof o.prompt === "string" && o.prompt.trim().length > 0)
  ) {
    return { ...o, kind: "intake" };
  }
  return {
    ...o,
    kind: "__missing__",
    _hint:
      'Each sources[] entry needs kind: "citation" or a non-empty prompt (intake).',
  };
}, z.discriminatedUnion("kind", [intakeSourceSchema, citationSourceSchema]));

const setupSectionStatusEnum = z.enum([
  "ok",
  "needs-work",
  "empty",
  "stub",
  "sample",
  "assets",
]);

const setupChaptersSchema = z
  .object({
    logo: z.enum(["on", "off"]).optional(),
    photography: z.enum(["on", "off"]).optional(),
    animation: z.enum(["on", "off"]).optional(),
    applications: z.enum(["on", "off"]).optional(),
  })
  .strict();

export const setupSchema = z.object({
  status: z.enum(["starter", "populated"]),
  intake: z.enum(["pending", "complete", "skipped"]),
  year: z.string(),
  support: z.string(),
  headline: z.string(),
  body: z.string(),
  sources: z.array(setupSourceSchema),
  prompt: z.string(),
  sectionStatus: z.record(z.string(), setupSectionStatusEnum).optional(),
  chapters: setupChaptersSchema.optional(),
});

/**
 * @param {unknown} data
 * @returns {{ success: true, data: import("zod").infer<typeof setupSchema> } | { success: false, error: import("zod").ZodError }}
 */
export function parseSetup(data) {
  return setupSchema.safeParse(data);
}

/**
 * @param {unknown} data
 * @returns {import("zod").infer<typeof setupSchema>}
 */
export function parseSetupOrThrow(data) {
  return setupSchema.parse(data);
}
