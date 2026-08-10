import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import type { ReactNode } from "react";

type ClotheslineRowGap = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;

type ClotheslineRowProps = {
  /** Left-column meta (label, index, heading stack). */
  label: ReactNode;
  /** Right-column content (spans 2 of 3). */
  children: ReactNode;
  className?: string;
  gap?: ClotheslineRowGap;
  columnGap?: ClotheslineRowGap;
  role?: string;
};

/**
 * Shared 1+2 clothesline body row (label left, content spans two columns).
 */
export function ClotheslineRow({
  label,
  children,
  className,
  gap = 4,
  columnGap = 6,
  role,
}: ClotheslineRowProps) {
  return (
    <Grid
      columns={3}
      gap={gap}
      columnGap={columnGap}
      align="start"
      width="100%"
      className={className}
      role={role}
    >
      {label}
      <GridSpan columns={2}>{children}</GridSpan>
    </Grid>
  );
}
