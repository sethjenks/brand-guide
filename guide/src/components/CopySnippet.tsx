"use client";

import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import { useEffect, useRef, useState } from "react";
import { Clothesline } from "@/components/Clothesline";
import { Icons } from "@/components/icons";

type CopySnippetProps = {
  id?: string;
  /** Clothesline label (left column). */
  title?: string;
  /** Plain text shown and copied. */
  text: string;
};

type CopyFeedback = "idle" | "copied" | "failed";

/**
 * Clothesline-style snippet: label left, panel on the right.
 * Stacks to a single column below 720px via useMediaQuery.
 */
export function CopySnippet({
  id,
  title = "Prompt",
  text,
}: CopySnippetProps) {
  const [feedback, setFeedback] = useState<CopyFeedback>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNarrow = useMediaQuery("(max-width: 720px)");

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function flash(next: CopyFeedback) {
    setFeedback(next);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback("idle"), 1400);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      flash("copied");
    } catch {
      flash("failed");
    }
  }

  const tooltip =
    feedback === "copied"
      ? "Copied"
      : feedback === "failed"
        ? "Copy failed"
        : "Copy";

  const titleNode = (
    <Text
      weight="semibold"
      color="primary"
      display="block"
      id={id ? `${id}-title` : undefined}
      className="clothesline-title"
    >
      {title}
    </Text>
  );

  const panel = (
    <Card
      variant="default"
      elevation="none"
      padding={0}
      width="100%"
      style={{
        borderRadius: "var(--radius-element)",
        padding: "var(--space-3) var(--space-3) var(--space-4)",
        boxSizing: "border-box",
      }}
    >
      <HStack
        gap={0.5}
        justify="end"
        style={{
          margin: "calc(-1 * var(--space-1)) calc(-1 * var(--space-1)) var(--space-1) 0",
        }}
      >
        <IconButton
          variant="ghost"
          size="sm"
          label="Copy"
          tooltip={tooltip}
          icon={
            feedback === "copied" ? (
              <Icons.Check size={14} />
            ) : feedback === "failed" ? (
              <Icons.AlertCircle size={14} />
            ) : (
              <Icons.Copy size={14} />
            )
          }
          onClick={() => {
            void handleCopy();
          }}
        />
      </HStack>
      <pre
        className="copy-snippet-text"
        style={{ color: "var(--color-text-primary)" }}
      >
        {text}
      </pre>
    </Card>
  );

  if (isNarrow) {
    return (
      <VStack
        as="section"
        id={id}
        gap={4}
        width="100%"
        className="clothesline clothesline-grid-section"
        aria-labelledby={id ? `${id}-title` : undefined}
        style={{ marginTop: "var(--section-gap)" }}
      >
        <Divider variant="strong" />
        {titleNode}
        {panel}
      </VStack>
    );
  }

  return (
    <Clothesline
      as="section"
      id={id}
      className="clothesline-grid-section"
      aria-labelledby={id ? `${id}-title` : undefined}
      style={{ marginTop: "var(--section-gap)" }}
      title={titleNode}
    >
      {panel}
    </Clothesline>
  );
}
