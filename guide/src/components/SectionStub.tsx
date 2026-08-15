import { Text } from "@astryxdesign/core/Text";
import { AssetStage } from "@/components/AssetStage";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { EmptyMedia } from "@/components/EmptyMedia";
import type { SectionStatus } from "@/lib/section-status-ui";

type SectionStubProps = {
  id: string;
  title: string;
  status?: SectionStatus;
};

/** Placeholder leaf when brand.md has no compiled content yet. */
export function SectionStub({ id, title, status = "stub" }: SectionStubProps) {
  return (
    <ClotheslineLeaf
      id={id}
      title={title}
      status={status}
      headerContent={
        <Text color="secondary" as="p" display="block" className="measure">
          Structural placeholder — content arrives from <code>brand.md</code>.
        </Text>
      }
    >
      <AssetStage aria-label={`${title} placeholder`} minHeight={180}>
        <EmptyMedia label="Coming soon" />
      </AssetStage>
    </ClotheslineLeaf>
  );
}
