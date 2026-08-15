"use client";

import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { motion } from "motion/react";
import {
  AnimationDemoCard,
  MotionDemoUnavailable,
} from "@/components/MotionSpecimen";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { personalityCurve } from "@/lib/animation-presets";
import type { SectionStatus } from "@/lib/section-status-ui";
type PersonalityItem = {
  id: string;
  title: string;
  body: string;
};

type AnimationPersonalitySectionProps = {
  id?: string;
  intro: string;
  defaultName: string;
  items: readonly PersonalityItem[];
  status?: SectionStatus;
};

function isDefaultItem(item: PersonalityItem, defaultName: string): boolean {
  const needle = defaultName.trim().toLowerCase();
  if (!needle) return false;
  return item.id === needle || item.title.trim().toLowerCase() === needle;
}

/**
 * Animation → Personality: clothesline intro + curve demos.
 */
export function AnimationPersonalitySection({
  id = "animation-personality",
  intro,
  defaultName,
  items,
  status,
}: AnimationPersonalitySectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Personality"
      intro={intro || undefined}
      status={status}
      className="animation-personality-section"
    >
      {items.length > 0 ? (
        <Grid
          columns={2}
          gap={8}
          columnGap={8}
          align="start"
          width="100%"
          className="motion-demo-grid"
          aria-label="Animation personality"
        >
          {items.map((item) => {
            const curve = personalityCurve(item.id);
            const defaulted = isDefaultItem(item, defaultName);
            return (
              <AnimationDemoCard
                key={item.id || item.title}
                title={item.title}
                body={item.body}
                badge={defaulted ? "Default" : undefined}
                defaulted={defaulted}
              >
                {({ playKey, reduceMotion }) =>
                  curve ? (
                    <HStack
                      hAlign="start"
                      vAlign="center"
                      width="100%"
                      padding={4}
                    >
                      <motion.div
                        key={playKey}
                        className="motion-specimen-tile-labeled"
                        initial={{ x: 0 }}
                        animate={{ x: "70%" }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : {
                                duration: curve.duration,
                                ease: curve.ease,
                              }
                        }
                      >
                        {item.title.slice(0, 1)}
                      </motion.div>
                    </HStack>
                  ) : (
                    <MotionDemoUnavailable />
                  )
                }
              </AnimationDemoCard>
            );
          })}
        </Grid>
      ) : null}
    </ClotheslineLeaf>
  );
}
