import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { MediaTheme } from "@astryxdesign/core/theme";
import type { CSSProperties, ReactNode } from "react";
import { EmptyMedia } from "@/components/EmptyMedia";

export type ImageGridItem = {
  id: string;
  /** Cell background (token or compiled brand color value). */
  background: string;
  /** Optional image source. */
  src?: string;
  alt?: string;
  /** Centered content when there is no `src` (e.g. wordmark). */
  children?: ReactNode;
  /** Foreground tone for non-image content on this ground. */
  tone?: "light" | "dark";
};

type ImageGridGap = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;

type ImageGridProps = {
  items: readonly ImageGridItem[];
  /** Fixed column count; defaults to 2. */
  columns?: number;
  /** Gap between cells; defaults to 3. */
  gap?: ImageGridGap;
  /** Width/height ratio for each cell; defaults to 4/3. */
  ratio?: number;
  /** Hairline border around each cell using `--color-border`. */
  cellBorder?: boolean;
  "aria-label"?: string;
  className?: string;
};

/**
 * Equal-cell image grid for logo / visual specimens (e.g. On color).
 * One row = `items.length === columns` (e.g. Single color: 2 items, 2 columns).
 */
export function ImageGrid({
  items,
  columns = 2,
  gap = 3,
  ratio = 4 / 3,
  cellBorder = false,
  "aria-label": ariaLabel = "Image grid",
  className,
}: ImageGridProps) {
  if (items.length === 0) return null;

  return (
    <Grid
      columns={columns}
      gap={gap}
      width="100%"
      aria-label={ariaLabel}
      className={["image-grid", className].filter(Boolean).join(" ")}
    >
      {items.map((item) => {
        const tone = item.tone ?? "light";
        const style = {
          "--image-grid-cell-bg": item.background,
          color: "var(--color-text-primary)",
          ...(cellBorder
            ? { border: "1px solid var(--color-border)" }
            : {}),
        } as CSSProperties;

        return (
          <MediaTheme key={item.id} mode={tone === "dark" ? "dark" : "light"}>
            <HStack
              hAlign="center"
              vAlign="center"
              width="100%"
              className={`image-grid-cell image-grid-cell-${tone}`}
              style={style}
            >
              <AspectRatio ratio={ratio} fit="center">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    className="image-grid-media"
                  />
                ) : (
                  <HStack
                    hAlign="center"
                    vAlign="center"
                    width="100%"
                    height="100%"
                    className="image-grid-placeholder"
                  >
                    {item.children ?? <EmptyMedia />}
                  </HStack>
                )}
              </AspectRatio>
            </HStack>
          </MediaTheme>
        );
      })}
    </Grid>
  );
}
