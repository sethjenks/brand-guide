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
  children: (ctx: MotionDemoContext) => ReactNode;
};

/**
 * Bordered motion stage with Replay. Honors prefers-reduced-motion.
 */
export function MotionSpecimen({ label, children }: MotionSpecimenProps) {
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
      <HStack gap={3} vAlign="center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          label="Replay"
          clickAction={() => setPlayKey((key) => key + 1)}
        />
        {reduceMotion ? (
          <Text color="secondary">
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
  children: (ctx: MotionDemoContext) => ReactNode;
};

export function AnimationDemoCard({
  title,
  body,
  badge,
  defaulted = false,
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
            <Text color="secondary">
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
      <MotionSpecimen label={`${title} motion demo`}>{children}</MotionSpecimen>
    </VStack>
  );
}
