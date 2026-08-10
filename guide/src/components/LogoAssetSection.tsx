import type { ReactNode } from "react";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import type { SectionStatus } from "@/lib/section-status-ui";

type LogoAssetSectionProps = {
  id: string;
  title: string;
  /** Optional short context beside the label. */
  context?: string;
  /** Optional right-side action (e.g. Download). */
  action?: ReactNode;
  /**
   * Media below the clothesline — typically `AssetStage` (single image)
   * or `ImageGrid` (multi-cell specimens). Optional for clothesline-only leaves.
   */
  children?: ReactNode;
  status?: SectionStatus;
};

/**
 * Logo chapter leaf: clothesline (label + context + optional action)
 * above media (`AssetStage` or `ImageGrid`).
 */
export function LogoAssetSection({
  id,
  title,
  context,
  action,
  children,
  status,
}: LogoAssetSectionProps) {
  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      context={context}
      action={action}
      status={status}
      gap={4}
      className="logo-asset-section"
    >
      {children}
    </ClotheslineLeaf>
  );
}
