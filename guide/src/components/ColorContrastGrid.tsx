import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { CSSProperties } from "react";
import { Icons } from "@/components/icons";

export type ColorContrastItem = {
  id: string;
  /** Field / stage background. */
  background: string;
  /** Left half of the centered split bar. */
  left: string;
  /** Right half of the centered split bar. */
  right: string;
  /** Caption under the specimen. */
  caption: string;
  /** Show the diagonal don’t-strike overlay. */
  struck?: boolean;
  /**
   * Specimen chip on the field: `dark` = dark chip / light label (for light
   * grounds); `light` = light chip / dark label (for dark grounds).
   */
  chipTone?: "dark" | "light";
  /** Chip label; defaults to "Placeholder". */
  chipLabel?: string;
};

type ColorContrastGridProps = {
  items: readonly ColorContrastItem[];
  columns?: number;
  gap?: 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  /** Width/height ratio for each specimen; defaults to 16/10. */
  ratio?: number;
  "aria-label"?: string;
  className?: string;
};

/**
 * Contrast specimens: field + chip + centered split bar, optional don’t-strike.
 * Pass any CSS colors for `background` / `left` / `right` on each item.
 */
export function ColorContrastGrid({
  items,
  columns = 2,
  gap = 4,
  ratio = 16 / 10,
  "aria-label": ariaLabel = "Color contrast examples",
  className,
}: ColorContrastGridProps) {
  if (items.length === 0) return null;

  return (
    <Grid
      columns={columns}
      gap={gap}
      width="100%"
      aria-label={ariaLabel}
      className={["color-contrast-grid", className].filter(Boolean).join(" ")}
    >
      {items.map((item) => {
        const chipTone = item.chipTone ?? "dark";
        const style = {
          "--color-contrast-bg": item.background,
          "--color-contrast-left": item.left,
          "--color-contrast-right": item.right,
        } as CSSProperties;

        return (
          <VStack
            key={item.id}
            gap={2}
            hAlign="start"
            width="100%"
            className="color-contrast-item"
          >
            <HStack
              hAlign="center"
              vAlign="center"
              width="100%"
              className={[
                "color-contrast-stage",
                item.struck ? "color-contrast-stage-dont" : null,
              ]
                .filter(Boolean)
                .join(" ")}
              style={style}
            >
              <AspectRatio ratio={ratio}>
                <VStack
                  gap={0}
                  justify="center"
                  hAlign="center"
                  width="100%"
                  height="100%"
                  className="color-contrast-field"
                >
                  <HStack
                    gap={1}
                    vAlign="center"
                    className={`color-contrast-chip color-contrast-chip-${chipTone}`}
                  >
                    <Icons.Image size={12} aria-hidden="true" />
                    <Text
                      type="label"
                      weight="medium"
                      color="inherit"
                      className="color-contrast-chip-label"
                    >
                      {item.chipLabel ?? "Placeholder"}
                    </Text>
                  </HStack>

                  <HStack
                    gap={0}
                    vAlign="stretch"
                    width="100%"
                    className="color-contrast-split"
                    aria-hidden="true"
                  >
                    <VStack gap={0} className="color-contrast-split-left" />
                    <VStack gap={0} className="color-contrast-split-right" />
                  </HStack>
                </VStack>
              </AspectRatio>

              {item.struck ? (
                <VStack
                  gap={0}
                  className="dont-grid-strike"
                  aria-hidden="true"
                />
              ) : null}
            </HStack>

            <Text
              weight="semibold"
              color="primary"
              display="block"
              className="color-contrast-caption"
            >
              {item.caption}
            </Text>
          </VStack>
        );
      })}
    </Grid>
  );
}
