import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";

type EmptyMediaProps = {
  /** Short label shown in empty stages / cells. */
  label?: string;
  className?: string;
};

/**
 * Dashed empty-media affordance for AssetStage / ImageGrid / DontGrid cells
 * that still need specimens.
 */
export function EmptyMedia({
  label = "Add imagery",
  className,
}: EmptyMediaProps) {
  return (
    <HStack
      hAlign="center"
      vAlign="center"
      width="100%"
      height="100%"
      className={["empty-media", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <Text
        type="supporting"
        color="secondary"
        display="block"
        className="empty-media-label"
      >
        {label}
      </Text>
    </HStack>
  );
}
