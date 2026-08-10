/**
 * brand/coverage.json schema (populated brands only).
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { z } = require(
  path.resolve(__dirname, "../../guide/node_modules/zod"),
);

const coverageStatus = z.enum(["filled", "inferred", "placeholder"]);

const sectionSchema = z.object({
  status: coverageStatus,
  notes: z.string().nullable().optional(),
});

export const coverageSchema = z.object({
  _spec_version: z.string().min(1),
  source: z
    .object({
      label: z.string().min(1),
      kind: z.string().optional(),
      path: z.string().optional(),
      url: z.string().optional(),
    })
    .optional(),
  sections: z.object({
    strategy: sectionSchema,
    voice: sectionSchema,
    visual: sectionSchema,
    expressions: sectionSchema,
    designSystem: sectionSchema,
  }),
  fields: z
    .array(
      z.object({
        path: z.string().min(1),
        status: coverageStatus,
        evidence: z.string().nullable().optional(),
      }),
    )
    .optional(),
});

/**
 * @param {unknown} data
 */
export function parseCoverage(data) {
  return coverageSchema.safeParse(data);
}
