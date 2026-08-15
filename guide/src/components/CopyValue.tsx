"use client";

import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { useEffect, useRef, useState } from "react";
import { Icons } from "@/components/icons";

type CopyValueProps = {
  value: string;
  label?: string;
  absoluteUrl?: boolean;
};

type CopyFeedback = "idle" | "copied" | "failed";

export function CopyValue({ value, label, absoluteUrl = false }: CopyValueProps) {
  const [feedback, setFeedback] = useState<CopyFeedback>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      const copyValue = absoluteUrl
        ? new URL(value, window.location.origin).toString()
        : value;
      await navigator.clipboard.writeText(copyValue);
      flash("copied");
    } catch {
      flash("failed");
    }
  }

  const accessibleLabel = label
    ? `Copy ${label} value ${value}`
    : `Copy ${value}`;

  const tooltip =
    feedback === "copied"
      ? "Copied"
      : feedback === "failed"
        ? "Copy failed"
        : "Copy value";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      label={accessibleLabel}
      tooltip={tooltip}
      className={[
        "copy-value",
        feedback === "copied" ? "is-copied" : "",
        feedback === "failed" ? "is-failed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => {
        void handleCopy();
      }}
    >
      <HStack gap={1} vAlign="center" className="copy-value-inner">
        <code>{value}</code>
        <span className="copy-value-icon" aria-hidden="true">
          {feedback === "copied" ? (
            <Icons.Check size={12} />
          ) : feedback === "failed" ? (
            <Icons.AlertCircle size={12} />
          ) : (
            <Icons.Copy size={12} />
          )}
        </span>
      </HStack>
    </Button>
  );
}
