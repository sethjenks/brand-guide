"use client";

import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import { useEffect, useRef, useState } from "react";
import { Icons } from "@/components/icons";

type CopySnippetProps = {
  id?: string;
  /** Clothesline label (left column). */
  title?: string;
  /** Plain text shown and copied. */
  text: string;
};

/**
 * Clothesline-style snippet: label left, panel on the right half.
 * Stacks to a single column below 720px via useMediaQuery.
 */
export function CopySnippet({
  id,
  title = "Prompt",
  text,
}: CopySnippetProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNarrow = useMediaQuery("(max-width: 720px)");

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1400);
  }

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
          tooltip={copied ? "Copied" : "Copy"}
          icon={copied ? <Icons.Check size={14} /> : <Icons.Copy size={14} />}
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

  const body = isNarrow ? (
    <VStack gap={4} width="100%" align="start">
      {titleNode}
      {panel}
    </VStack>
  ) : (
    <Grid columns={12} gap={4} columnGap={6} align="start" width="100%">
      <GridSpan columns={4}>{titleNode}</GridSpan>
      {/* Spacers push the panel into columns 7–12 (right half). */}
      <GridSpan columns={2}>
        <span aria-hidden="true" />
      </GridSpan>
      <GridSpan columns={6}>{panel}</GridSpan>
    </Grid>
  );

  return (
    <VStack
      as="section"
      id={id}
      gap={4}
      width="100%"
      className="clothesline-grid-section"
      aria-labelledby={id ? `${id}-title` : undefined}
      style={{ marginTop: "var(--section-gap)" }}
    >
      <Divider variant="strong" />
      {body}
    </VStack>
  );
}
