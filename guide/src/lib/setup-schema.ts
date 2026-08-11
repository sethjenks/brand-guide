/**
 * brand/setup.json Zod schema (runtime guide load).
 * Keep in sync with scripts/lib/setup-schema.mjs — fixture-locked in validate-brand.
 */
import { z } from "zod";

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
  const o = val as Record<string, unknown>;
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

export type SetupParsed = z.infer<typeof setupSchema>;
export type SetupSourceParsed = SetupParsed["sources"][number];
