import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { EmptyMedia } from "@/components/EmptyMedia";
import { StruckStage } from "@/components/StruckStage";

export type DontGridItem = {
  id: string;
  /** Caption under the specimen (e.g. "Don't stretch"). */
  caption: string;
  /** Optional don’t-example image. */
  src?: string;
  alt?: string;
  /** Fallback specimen when there is no `src`. */
  children?: ReactNode;
};

type DontGridGap = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;

type DontGridProps = {
  items: readonly DontGridItem[];
  /** Fixed column count; defaults to 3. */
  columns?: number;
  gap?: DontGridGap;
  /** Width/height ratio for each specimen; defaults to 4/3. */
  ratio?: number;
  "aria-label"?: string;
  className?: string;
};

/**
 * Don’ts grid: bordered specimen with strike overlay + caption below.
 * Prefer real assets via `src`; otherwise pass placeholder children.
 */
export function DontGrid({
  items,
  columns = 3,
  gap = 4,
  ratio = 4 / 3,
  "aria-label": ariaLabel = "Don’ts",
  className,
}: DontGridProps) {
  if (items.length === 0) return null;

  return (
    <Grid
      columns={columns}
      gap={gap}
      width="100%"
      aria-label={ariaLabel}
      className={["dont-grid", className].filter(Boolean).join(" ")}
    >
      {items.map((item) => (
        <VStack
          key={item.id}
          gap={2}
          hAlign="start"
          width="100%"
          className="dont-grid-item"
        >
          <StruckStage
            ratio={ratio}
            className="dont-grid-stage"
            style={{ background: "var(--color-background-card)" }}
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.alt ?? item.caption}
                className="dont-grid-media"
              />
            ) : (
              <HStack
                hAlign="center"
                vAlign="center"
                width="100%"
                height="100%"
                className="dont-grid-placeholder"
              >
                {item.children ?? <EmptyMedia label="Specimen pending" />}
              </HStack>
            )}
          </StruckStage>
          <Text
            weight="semibold"
            color="primary"
            display="block"
            className="dont-grid-caption"
          >
            {item.caption}
          </Text>
        </VStack>
      ))}
    </Grid>
  );
}
