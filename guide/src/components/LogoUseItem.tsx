import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { ReactNode } from "react";
import { AssetStage } from "@/components/AssetStage";
import { ClotheslineRow } from "@/components/ClotheslineRow";

type LogoUseItemProps = {
  /** Left-column name (e.g. Logo, Supporting logo). */
  title: string;
  /** Short usage note under the title. */
  detail?: string;
  /** Optional image asset for the right stage. */
  src?: string;
  alt?: string;
  /** Fallback stage content when there is no `src`. */
  children?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Logo-use row: label (+ detail) left, bordered image stage right.
 * Stack multiple under a `LogoAssetSection` clothesline.
 */
export function LogoUseItem({
  title,
  detail,
  src,
  alt = "",
  children,
  id,
  className,
}: LogoUseItemProps) {
  return (
    <VStack
      as="article"
      id={id}
      gap={0}
      width="100%"
      aria-label={title}
      className={["logo-use-item", className].filter(Boolean).join(" ")}
    >
      <ClotheslineRow
        label={
          <VStack gap={1} className="logo-use-item-meta">
            <Text
              weight="semibold"
              color="primary"
              display="block"
              className="clothesline-title"
            >
              {title}
            </Text>
            {detail ? (
              <Text type="supporting" color="secondary" display="block">
                {detail}
              </Text>
            ) : null}
          </VStack>
        }
      >
        <AssetStage
          aria-label={`${title} specimen`}
          minHeight={280}
          className="logo-use-item-stage"
        >
          {src ? (
            <img
              src={src}
              alt={alt || title}
              className="logo-use-item-media"
            />
          ) : (
            children
          )}
        </AssetStage>
      </ClotheslineRow>
    </VStack>
  );
}
