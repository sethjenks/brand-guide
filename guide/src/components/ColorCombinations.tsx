import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties } from "react";

export type ColorCombinationItem = {
  id: string;
  /** Ground / field color. */
  outer: string;
  /** Centered inset color. */
  inner: string;
};

type ColorCombinationsProps = {
  items: readonly ColorCombinationItem[];
  /** Gap between tiles; defaults to 1. */
  gap?: 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  /**
   * Inset size as a fraction of the outer tile (0–1).
   * Defaults to 0.5 (half width/height, equal padding).
   */
  insetRatio?: number;
  "aria-label"?: string;
  className?: string;
};

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

function isLightSurface(value: string): boolean {
  const rgb = parseHex(value);
  if (!rgb) return false;
  return relativeLuminance(rgb) > 0.45;
}

/**
 * Approved color-pair specimens: outer field with a centered inner square.
 * Pass any hex (or CSS color) for `outer` / `inner` on each item.
 */
export function ColorCombinations({
  items,
  gap = 1,
  insetRatio = 0.5,
  "aria-label": ariaLabel = "Approved color combinations",
  className,
}: ColorCombinationsProps) {
  if (items.length === 0) return null;

  const insetPercent = `${Math.min(1, Math.max(0.1, insetRatio)) * 100}%`;

  return (
    <Grid
      columns={{ minWidth: 160, max: items.length, repeat: "fit" }}
      gap={gap}
      width="100%"
      aria-label={ariaLabel}
      className={["color-combinations", className].filter(Boolean).join(" ")}
    >
      {items.map((item) => {
        const style = {
          "--color-combination-outer": item.outer,
          "--color-combination-inner": item.inner,
        } as CSSProperties;

        return (
          <AspectRatio key={item.id} ratio={1}>
            <HStack
              hAlign="center"
              vAlign="center"
              width="100%"
              height="100%"
              className={[
                "color-combination",
                isLightSurface(item.outer) ? "color-combination-light" : null,
              ]
                .filter(Boolean)
                .join(" ")}
              style={style}
              aria-label={`Outer ${item.outer}, inner ${item.inner}`}
            >
              <VStack gap={0} width={insetPercent}>
                <AspectRatio ratio={1}>
                  <VStack
                    gap={0}
                    width="100%"
                    height="100%"
                    className="color-combination-inner"
                    aria-hidden="true"
                  />
                </AspectRatio>
              </VStack>
            </HStack>
          </AspectRatio>
        );
      })}
    </Grid>
  );
}
