"use client";

import { Card } from "@astryxdesign/core/Card";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useEffect, useId, useRef, useState } from "react";
import { Clothesline } from "@/components/Clothesline";
import { Icons } from "@/components/icons";

type SetupSourceCardProps = {
  label: string;
  detail: string;
  prompt: string;
};

/**
 * Accepted-source card: detail plus a compact, copyable agentic prompt.
 */
export function SetupSourceCard({
  label,
  detail,
  prompt,
}: SetupSourceCardProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const promptId = useId();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1400);
  }

  return (
    <Clothesline as="article" className="setup-source" title={label}>
      <VStack gap={3} width="100%" align="start">
        <Text
          color="secondary"
          type="supporting"
          as="p"
          display="block"
          className="measure"
        >
          {detail}
        </Text>
        <Card
          variant="default"
          elevation="none"
          padding={0}
          width="100%"
          className="setup-source-prompt"
          style={{
            borderRadius: "var(--radius-element)",
            padding: "var(--space-3)",
            boxSizing: "border-box",
          }}
          aria-labelledby={promptId}
        >
          <HStack gap={2} justify="between" align="center" width="100%">
            <Text
              id={promptId}
              weight="semibold"
              color="primary"
              type="supporting"
              display="block"
            >
              Agent prompt
            </Text>
            <IconButton
              variant="ghost"
              size="sm"
              label={`Copy prompt for ${label}`}
              tooltip={copied ? "Copied" : "Copy prompt"}
              icon={
                copied ? <Icons.Check size={14} /> : <Icons.Copy size={14} />
              }
              onClick={() => {
                void handleCopy();
              }}
            />
          </HStack>
          <pre
            className="copy-snippet-text setup-source-prompt-text"
            style={{ color: "var(--color-text-primary)" }}
          >
            {prompt}
          </pre>
        </Card>
      </VStack>
    </Clothesline>
  );
}
