import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { Clothesline } from "@/components/Clothesline";
import { sectionLeafStyle } from "@/lib/section-leaf";

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
}: LogoAssetSectionProps) {
  return (
    <VStack
      as="section"
      id={id}
      gap={4}
      className="logo-asset-section"
      style={sectionLeafStyle}
      aria-labelledby={`${id}-title`}
    >
      <Clothesline
        className="logo-asset-clothesline"
        action={action}
        title={
          <Heading level={3} id={`${id}-title`} className="clothesline-title">
            {title}
          </Heading>
        }
      >
        {context ? (
          <Text
            color="primary"
            as="p"
            display="block"
            className="measure logo-asset-context"
          >
            {context}
          </Text>
        ) : null}
      </Clothesline>

      {children ?? null}
    </VStack>
  );
}
