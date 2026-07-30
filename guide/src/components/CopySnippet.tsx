"use client";

import { Divider } from "@astryxdesign/core/Divider";
import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
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
 * Clothesline-style snippet on a 12-col grid: label left, panel spans 6 cols on the right.
 */
export function CopySnippet({
  id,
  title = "Prompt",
  text,
}: CopySnippetProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <VStack
      as="section"
      id={id}
      gap={4}
      className="copy-snippet clothesline-grid-section"
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <Divider variant="strong" />
      <Grid
        columns={12}
        gap={4}
        columnGap={6}
        align="start"
        className="copy-snippet-grid"
        width="100%"
      >
        <GridSpan columns={4}>
          <Text
            weight="semibold"
            color="primary"
            display="block"
            id={id ? `${id}-title` : undefined}
            className="clothesline-title"
          >
            {title}
          </Text>
        </GridSpan>
        {/* Spacers push the panel into columns 7–12 (right half). */}
        <GridSpan columns={2}>
          <span aria-hidden="true" />
        </GridSpan>
        <GridSpan columns={6}>
          <div className="copy-snippet-panel">
            <HStack gap={0.5} justify="end" className="copy-snippet-toolbar">
              <IconButton
                variant="ghost"
                size="sm"
                label="Copy"
                tooltip={copied ? "Copied" : "Copy"}
                icon={
                  copied ? <Icons.Check size={14} /> : <Icons.Copy size={14} />
                }
                onClick={() => {
                  void handleCopy();
                }}
              />
            </HStack>
            <pre className="copy-snippet-text">{text}</pre>
          </div>
        </GridSpan>
      </Grid>
    </VStack>
  );
}
