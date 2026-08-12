"use client";

import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AnimationDemoCard } from "@/components/MotionSpecimen";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import {
  ARCHETYPE_PRESETS,
  isArchetypePresetId,
  type ArchetypePreset,
} from "@/lib/animation-presets";
import type { SectionStatus } from "@/lib/section-status-ui";
import type { MotionDemoContext } from "@/components/MotionSpecimen";

type ArchetypeItem = {
  id: string;
  title: string;
  body: string;
};

type AnimationArchetypesSectionProps = {
  id?: string;
  intro: string;
  items: readonly ArchetypeItem[];
  status?: SectionStatus;
};

function ArchetypeDemo({
  preset,
  ctx,
}: {
  preset: ArchetypePreset;
  ctx: MotionDemoContext;
}): ReactNode {
  const { playKey, reduceMotion } = ctx;
  const duration = reduceMotion ? 0 : preset.duration;

  switch (preset.kind) {
    case "enter":
      return (
        <HStack hAlign="center" vAlign="center" width="100%" padding={4}>
          <motion.div
            key={playKey}
            className="motion-specimen-tile"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: preset.y }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          />
        </HStack>
      );
    case "move":
      return (
        <HStack hAlign="start" vAlign="center" width="100%" padding={4}>
          <motion.div
            key={playKey}
            className="motion-specimen-tile"
            initial={{ x: 0 }}
            animate={{ x: `${preset.x}%` }}
            transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
          />
        </HStack>
      );
    case "glide":
      return (
        <HStack hAlign="start" vAlign="center" width="100%" padding={4}>
          <motion.div
            key={playKey}
            className="motion-specimen-tile"
            initial={{ x: 0 }}
            animate={reduceMotion ? { x: "40%" } : { x: ["0%", "75%", "0%"] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: preset.duration,
                    ease: "linear",
                    repeat: Infinity,
                  }
            }
          />
        </HStack>
      );
    case "push":
      return (
        <HStack width="100%" className="motion-specimen-stage">
          <HStack className="motion-specimen-panel motion-specimen-panel-rear" />
          <motion.div
            key={playKey}
            className="motion-specimen-panel"
            initial={reduceMotion ? { x: 0 } : { x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
          />
        </HStack>
      );
    case "pan":
      return (
        <HStack width="100%" className="motion-specimen-stage">
          <motion.div
            key={playKey}
            className="motion-specimen-strip"
            initial={{ x: 0 }}
            animate={{ x: `${preset.x}%` }}
            transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
          />
        </HStack>
      );
    default: {
      const _exhaustive: never = preset;
      return _exhaustive;
    }
  }
}

/**
 * Animation → Archetypes: clothesline intro + movement pattern demos.
 */
export function AnimationArchetypesSection({
  id = "animation-archetypes",
  intro,
  items,
  status,
}: AnimationArchetypesSectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Archetypes"
      intro={intro || undefined}
      status={status}
      className="animation-archetypes-section"
    >
      {items.length > 0 ? (
        <Grid
          columns={2}
          gap={8}
          columnGap={8}
          align="start"
          width="100%"
          className="motion-demo-grid"
          aria-label="Animation archetypes"
        >
          {items.map((item) => {
            const preset = isArchetypePresetId(item.id)
              ? ARCHETYPE_PRESETS[item.id]
              : null;
            return (
              <AnimationDemoCard
                key={item.id || item.title}
                title={item.title}
                body={item.body}
              >
                {(ctx) =>
                  preset ? <ArchetypeDemo preset={preset} ctx={ctx} /> : null
                }
              </AnimationDemoCard>
            );
          })}
        </Grid>
      ) : null}
    </ClotheslineLeaf>
  );
}
