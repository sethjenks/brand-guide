import type { ReactNode } from "react";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import type { SectionStatus } from "@/lib/section-status-ui";

type ColorPaletteSectionProps = {
  id: string;
  title: string;
  /** Short rationale beside the label. */
  context?: string;
  /**
   * Palette body — typically `ColorTiles` for the swatch row.
   */
  children: ReactNode;
  className?: string;
  status?: SectionStatus;
};

/**
 * Color chapter leaf: clothesline (label + context) above color tiles.
 */
export function ColorPaletteSection({
  id,
  title,
  context,
  children,
  className,
  status,
}: ColorPaletteSectionProps) {
  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      status={status}
      gap={4}
      className={["color-palette-section", className].filter(Boolean).join(" ")}
    >
      {children}
    </ClotheslineLeaf>
  );
}
