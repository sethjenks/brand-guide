"use client";

import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Button } from "@astryxdesign/core/Button";
import { Grid } from "@astryxdesign/core/Grid";
import { MediaTheme } from "@astryxdesign/core/theme";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useEffect, useRef, useState, type CSSProperties } from "react";

export type ColorTileItem = {
  id: string;
  name: string;
  /** Hex color value (e.g. `#2395E7`). */
  value: string;
};

type ColorTilesProps = {
  colors: readonly ColorTileItem[];
  /** Gap between tiles; defaults to 1. */
  gap?: 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  /**
   * Fixed column count. Defaults to 3 when there is one swatch (right-aligned),
   * otherwise `min(count, 6)` so a 12-step scale stacks as two rows of six.
   */
  columns?: number;
  "aria-label"?: string;
  className?: string;
};

function resolveColumns(count: number, columns?: number): number {
  if (columns != null && columns > 0) return columns;
  if (count === 1) return 3;
  return Math.min(count, 6);
}

type Rgb = { r: number; g: number; b: number };

function parseHex(value: string): Rgb | null {
  const cleaned = value.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return {
      r: Number.parseInt(cleaned[0] + cleaned[0], 16),
      g: Number.parseInt(cleaned[1] + cleaned[1], 16),
      b: Number.parseInt(cleaned[2] + cleaned[2], 16),
    };
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return {
      r: Number.parseInt(cleaned.slice(0, 2), 16),
      g: Number.parseInt(cleaned.slice(2, 4), 16),
      b: Number.parseInt(cleaned.slice(4, 6), 16),
    };
  }
  return null;
}

function relativeLuminance({ r, g, b }: Rgb): number {
  const toLinear = (channel: number) => {
    const s = channel / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** Light surface → dark text; dark surface → light text. */
function surfaceMode(value: string): "light" | "dark" {
  const rgb = parseHex(value);
  if (!rgb) return "dark";
  return relativeLuminance(rgb) > 0.45 ? "light" : "dark";
}

function formatRgb(value: string): string | null {
  const rgb = parseHex(value);
  if (!rgb) return null;
  return `${rgb.r}/${rgb.g}/${rgb.b}`;
}

function formatHex(value: string): string {
  const rgb = parseHex(value);
  if (!rgb) return value.trim();
  const toHex = (channel: number) =>
    channel.toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function ColorTileValue({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1400);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      label={`Copy ${label} ${value}`}
      tooltip={copied ? "Copied" : `Copy ${label}`}
      className={`color-tile-value${copied ? " is-copied" : ""}`}
      onClick={() => {
        void handleCopy();
      }}
    >
      <Text type="supporting" color="primary" display="block">
        {value}
      </Text>
    </Button>
  );
}

/**
 * Square brand-color tiles with name / RGB / HEX — each value copies on click.
 * A single swatch occupies the right third of the row (3-column track).
 * Larger scales (e.g. Radix 12-step) default to six columns → two rows.
 */
export function ColorTiles({
  colors,
  gap = 1,
  columns,
  "aria-label": ariaLabel = "Color tiles",
  className,
}: ColorTilesProps) {
  if (colors.length === 0) return null;

  const isSingle = colors.length === 1;
  const columnCount = resolveColumns(colors.length, columns);

  return (
    <Grid
      columns={columnCount}
      gap={gap}
      width="100%"
      aria-label={ariaLabel}
      className={[
        "color-tiles",
        isSingle ? "color-tiles-single" : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {colors.map((color) => {
        const mode = surfaceMode(color.value);
        const hex = formatHex(color.value);
        const rgb = formatRgb(color.value);
        const style = {
          "--color-tile-bg": color.value,
        } as CSSProperties;

        return (
          <AspectRatio key={color.id} ratio={1}>
            <VStack
              gap={0}
              justify="end"
              width="100%"
              height="100%"
              className={`color-tile color-tile-${mode}`}
              style={style}
            >
              <MediaTheme mode={mode}>
                <VStack gap={0} className="color-tile-meta">
                  <ColorTileValue value={color.name} label="name" />
                  {rgb ? <ColorTileValue value={rgb} label="RGB" /> : null}
                  <ColorTileValue value={hex} label="HEX" />
                </VStack>
              </MediaTheme>
            </VStack>
          </AspectRatio>
        );
      })}
    </Grid>
  );
}
