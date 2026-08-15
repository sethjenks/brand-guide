"use client";

import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  AnimationDemoCard,
  MotionDemoUnavailable,
} from "@/components/MotionSpecimen";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import {
  isInteractionPresetId,
  type InteractionPresetId,
} from "@/lib/animation-presets";
import type { MotionDemoContext } from "@/components/MotionSpecimen";
import type { SectionStatus } from "@/lib/section-status-ui";

type InteractionItem = {
  id: string;
  title: string;
  body: string;
};

type AnimationInteractionsSectionProps = {
  id?: string;
  intro: string;
  items: readonly InteractionItem[];
  status?: SectionStatus;
};

const PEERS = ["One", "Two", "Three"] as const;

function duration(reduceMotion: boolean, seconds: number): number {
  return reduceMotion ? 0 : seconds;
}

function ExchangeDemo({ playKey, reduceMotion }: MotionDemoContext) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
  }, [playKey]);

  return (
    <HStack hAlign="center" vAlign="center" width="100%" padding={4}>
      <button
        type="button"
        className="motion-interaction-hit"
        onClick={() => setIndex((i) => (i + 1) % 2)}
        aria-label="Exchange content"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="motion-specimen-chip"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: duration(reduceMotion, 0.28) }}
          >
            <Text weight="semibold">{index === 0 ? "A" : "B"}</Text>
          </motion.div>
        </AnimatePresence>
      </button>
    </HStack>
  );
}

function CarouselDemo({ playKey, reduceMotion }: MotionDemoContext) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
  }, [playKey]);

  return (
    <VStack gap={2} hAlign="center" vAlign="center" width="100%" padding={4}>
      <button
        type="button"
        className="motion-interaction-hit"
        onClick={() => setIndex((i) => (i + 1) % PEERS.length)}
        aria-label="Advance carousel"
      >
        <HStack
          width="100%"
          hAlign="center"
          style={{ overflow: "hidden", minWidth: "6rem" }}
        >
          <motion.div
            key={index}
            className="motion-specimen-chip"
            initial={reduceMotion ? false : { x: 28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: duration(reduceMotion, 0.4),
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Text weight="semibold">{PEERS[index]}</Text>
          </motion.div>
        </HStack>
      </button>
    </VStack>
  );
}

function ToggleDemo({ playKey, reduceMotion }: MotionDemoContext) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(false);
  }, [playKey]);

  return (
    <HStack hAlign="center" vAlign="center" width="100%" padding={4}>
      <button
        type="button"
        className="motion-interaction-hit"
        aria-pressed={on}
        aria-label={on ? "Toggle on" : "Toggle off"}
        onClick={() => setOn((value) => !value)}
      >
        <HStack
          className={["motion-toggle-track", on ? "is-on" : ""]
            .filter(Boolean)
            .join(" ")}
          hAlign={on ? "end" : "start"}
          vAlign="center"
        >
          <motion.div
            className="motion-toggle-knob"
            layout={!reduceMotion}
            transition={{ duration: duration(reduceMotion, 0.22), ease: [0.4, 0, 0.2, 1] }}
          />
        </HStack>
      </button>
    </HStack>
  );
}

function RevealDemo({ playKey, reduceMotion }: MotionDemoContext) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [playKey]);

  return (
    <VStack gap={2} hAlign="start" vAlign="center" width="100%" padding={4}>
      <button
        type="button"
        className="motion-interaction-hit"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Text weight="semibold">{open ? "Hide" : "Show more"}</Text>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: duration(reduceMotion, 0.35), ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: "hidden", width: "100%" }}
      >
        <Text color="secondary">Extra detail stays in place.</Text>
      </motion.div>
    </VStack>
  );
}

function AccordionDemo({ playKey, reduceMotion }: MotionDemoContext) {
  const [open, setOpen] = useState(0);
  useEffect(() => {
    setOpen(0);
  }, [playKey]);

  const sections = ["First", "Second"] as const;

  return (
    <VStack gap={1} width="100%" padding={4} hAlign="stretch">
      {sections.map((label, index) => {
        const expanded = open === index;
        return (
          <VStack key={label} gap={1} width="100%" className="motion-accordion-item">
            <button
              type="button"
              className="motion-interaction-hit"
              aria-expanded={expanded}
              onClick={() => setOpen(index)}
            >
              <Text weight="semibold">{label}</Text>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: expanded ? "auto" : 0,
                opacity: expanded ? 1 : 0,
              }}
              transition={{
                duration: duration(reduceMotion, 0.32),
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ overflow: "hidden" }}
            >
              <Text color="secondary">{label} settles as the other closes.</Text>
            </motion.div>
          </VStack>
        );
      })}
    </VStack>
  );
}

function TabsDemo({ playKey, reduceMotion }: MotionDemoContext) {
  const [tab, setTab] = useState(0);
  useEffect(() => {
    setTab(0);
  }, [playKey]);

  const labels = ["Alpha", "Beta"] as const;

  return (
    <VStack gap={2} width="100%" padding={4} hAlign="stretch">
      <HStack gap={3}>
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            className="motion-interaction-hit"
            aria-pressed={tab === index}
            onClick={() => setTab(index)}
          >
            <Text weight={tab === index ? "semibold" : undefined}>{label}</Text>
          </button>
        ))}
      </HStack>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          className="motion-tab-panel"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: duration(reduceMotion, 0.22) }}
        >
          <Text color="secondary">{labels[tab]} view</Text>
        </motion.div>
      </AnimatePresence>
    </VStack>
  );
}

function ModalDemo({ playKey, reduceMotion }: MotionDemoContext) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [playKey]);

  return (
    <HStack
      hAlign="center"
      vAlign="center"
      width="100%"
      className="motion-specimen-stage"
    >
      <button
        type="button"
        className="motion-interaction-hit"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Dismiss modal" : "Open modal"}
      >
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              className="motion-specimen-panel"
              initial={
                reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: duration(reduceMotion, 0.4), ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", inset: "auto", width: "70%", minHeight: "3.5rem" }}
            >
              <HStack hAlign="center" vAlign="center" width="100%" height="100%">
                <Text weight="semibold">Focus</Text>
              </HStack>
            </motion.div>
          ) : (
            <Text color="secondary">Dismissed</Text>
          )}
        </AnimatePresence>
      </button>
    </HStack>
  );
}

function ToastDemo({ playKey, reduceMotion }: MotionDemoContext) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(true);
  }, [playKey]);

  return (
    <HStack
      hAlign="center"
      vAlign="center"
      width="100%"
      className="motion-specimen-stage"
    >
      <button
        type="button"
        className="motion-interaction-hit"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? "Hide toast" : "Show toast"}
        style={{ width: "100%", height: "100%", minHeight: "7.5rem" }}
      >
        <AnimatePresence initial={false}>
          {visible ? (
            <motion.div
              className="motion-toast"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: duration(reduceMotion, 0.35), ease: [0.22, 1, 0.36, 1] }}
            >
              <Text weight="semibold">Notice</Text>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </button>
    </HStack>
  );
}

function InteractionDemo({
  id,
  ctx,
}: {
  id: InteractionPresetId;
  ctx: MotionDemoContext;
}): ReactNode {
  switch (id) {
    case "exchange":
      return <ExchangeDemo {...ctx} />;
    case "carousel":
      return <CarouselDemo {...ctx} />;
    case "toggle":
      return <ToggleDemo {...ctx} />;
    case "reveal":
      return <RevealDemo {...ctx} />;
    case "accordion":
      return <AccordionDemo {...ctx} />;
    case "tabs":
      return <TabsDemo {...ctx} />;
    case "modal":
      return <ModalDemo {...ctx} />;
    case "toast":
      return <ToastDemo {...ctx} />;
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

/**
 * Animation → Interactions: clothesline intro + controllable mini-widgets.
 */
export function AnimationInteractionsSection({
  id = "animation-interactions",
  intro,
  items,
  status,
}: AnimationInteractionsSectionProps) {
  if (!intro && items.length === 0) return null;

  return (
    <ClotheslineLeaf
      id={id}
      title="Interactions"
      intro={intro || undefined}
      status={status}
      className="animation-interactions-section"
    >
      {items.length > 0 ? (
        <Grid
          columns={2}
          gap={8}
          columnGap={8}
          align="start"
          width="100%"
          className="motion-demo-grid"
          aria-label="Animation interactions"
        >
          {items.map((item) => (
            <AnimationDemoCard
              key={item.id || item.title}
              title={item.title}
              body={item.body}
              interactive={isInteractionPresetId(item.id)}
            >
              {(ctx) =>
                isInteractionPresetId(item.id) ? (
                  <InteractionDemo id={item.id} ctx={ctx} />
                ) : (
                  <MotionDemoUnavailable />
                )
              }
            </AnimationDemoCard>
          ))}
        </Grid>
      ) : null}
    </ClotheslineLeaf>
  );
}
