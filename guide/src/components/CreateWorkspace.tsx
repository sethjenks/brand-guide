import { Text } from "@astryxdesign/core/Text";
import { Clothesline } from "@/components/Clothesline";
import { sectionLeafStyle } from "@/lib/section-leaf";

type CreateWorkspaceProps = {
  brandName: string;
};

/**
 * Empty Create workspace until the first generation tools are named.
 * Clothesline (not EmptyMedia) — this is a product surface, not a missing specimen.
 */
export function CreateWorkspace({ brandName }: CreateWorkspaceProps) {
  return (
    <Clothesline
      id="studio-overview"
      title="Overview"
      style={sectionLeafStyle}
    >
      <Text
        as="p"
        type="body"
        color="secondary"
        display="block"
        className="measure"
      >
        Create makes things from the {brandName} brand you defined — social,
        ads, decks, and more. Tools land here next.
      </Text>
    </Clothesline>
  );
}
