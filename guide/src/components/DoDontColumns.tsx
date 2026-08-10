import { Grid } from "@astryxdesign/core/Grid";
import type { ReactNode } from "react";

type DoDontColumnsGap = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;

type DoDontColumnsProps = {
  do?: ReactNode;
  dont?: ReactNode;
  className?: string;
  gap?: DoDontColumnsGap;
  columnGap?: DoDontColumnsGap;
};

/**
 * Two-column Do / Don’t (or similar paired) layout. Slots stay ReactNode
 * so CTA display examples and Principles string bodies can both fit.
 */
export function DoDontColumns({
  do: doSlot,
  dont: dontSlot,
  className,
  gap = 6,
  columnGap = 8,
}: DoDontColumnsProps) {
  if (!doSlot && !dontSlot) return null;

  return (
    <Grid
      columns={2}
      gap={gap}
      columnGap={columnGap}
      align="start"
      className={className}
    >
      {doSlot}
      {dontSlot}
    </Grid>
  );
}
