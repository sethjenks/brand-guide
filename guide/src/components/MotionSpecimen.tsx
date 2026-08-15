"use client";

import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import "@/styles/flourish/motion-specimen.css";

export type MotionDemoContext = {
  playKey: number;
  reduceMotion: boolean;
};

type MotionSpecimenProps = {
  label: string;
  /** Show “Click stage to play” under Replay (interaction demos). */
  interactive?: boolean;
  children: (ctx: MotionDemoContext) => ReactNode;
};

/**
 * Bordered motion stage with Replay. Honors prefers-reduced-motion.
 */
export function MotionSpecimen({
  label,
  interactive = false,
  children,
}: MotionSpecimenProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [playKey, setPlayKey] = useState(0);

  return (
    <VStack gap={2} width="100%" className="motion-specimen-wrap">
      <HStack
        hAlign="start"
        vAlign="center"
        width="100%"
        className="motion-specimen"
        aria-label={label}
      >
        <HStack
          key={playKey}
          hAlign="start"
          vAlign="center"
          width="100%"
          className="motion-specimen-stage"
        >
          {children({ playKey, reduceMotion })}
        </HStack>
      </HStack>
      <HStack gap={3} vAlign="center" wrap="wrap">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          label="Replay"
          clickAction={() => setPlayKey((key) => key + 1)}
        />
        {interactive ? (
          <Text color="secondary" type="supporting">
            Click stage to play
          </Text>
        ) : null}
        {reduceMotion ? (
          <Text color="secondary" type="supporting">
            Reduced motion
          </Text>
        ) : null}
      </HStack>
    </VStack>
  );
}

type AnimationDemoCardProps = {
  title: string;
  body: string;
  badge?: string;
  defaulted?: boolean;
  interactive?: boolean;
  children: (ctx: MotionDemoContext) => ReactNode;
};

export function AnimationDemoCard({
  title,
  body,
  badge,
  defaulted = false,
  interactive = false,
  children,
}: AnimationDemoCardProps) {
  return (
    <VStack
      gap={3}
      width="100%"
      className={["motion-demo-card", defaulted ? "is-default" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <VStack gap={1} width="100%">
        <HStack gap={2} vAlign="center">
          <Heading level={4} className="clothesline-grid-item-title">
            {title}
          </Heading>
          {badge ? (
            <Text color="secondary" type="supporting">
              {badge}
            </Text>
          ) : null}
        </HStack>
        {body ? (
          <Text color="primary" as="p" display="block" className="measure">
            {body}
          </Text>
        ) : null}
      </VStack>
      <MotionSpecimen
        label={`${title} motion demo`}
        interactive={interactive}
      >
        {children}
      </MotionSpecimen>
    </VStack>
  );
}

/** Fallback when a brand motion id has no live demo preset. */
export function MotionDemoUnavailable() {
  return (
    <HStack hAlign="center" vAlign="center" width="100%" padding={4}>
      <Text color="secondary" type="supporting">
        No live demo for this id
      </Text>
    </HStack>
  );
}
