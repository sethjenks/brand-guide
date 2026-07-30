"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "@/components/icons";

type CopyValueProps = {
  value: string;
  label?: string;
  absoluteUrl?: boolean;
};

export function CopyValue({ value, label, absoluteUrl = false }: CopyValueProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      const copyValue = absoluteUrl
        ? new URL(value, window.location.origin).toString()
        : value;
      await navigator.clipboard.writeText(copyValue);
    } catch {
      return;
    }

    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1400);
  }

  const accessibleLabel = label
    ? `Copy ${label} value ${value}`
    : `Copy ${value}`;

  return (
    <button
      type="button"
      className={`copy-value${copied ? " is-copied" : ""}`}
      onClick={handleCopy}
      aria-label={accessibleLabel}
      title={copied ? "Copied" : "Copy value"}
    >
      <code>{value}</code>
      <span className="copy-value-icon" aria-hidden="true">
        {copied ? <Icons.Check size={12} /> : <Icons.Copy size={12} />}
      </span>
    </button>
  );
}
