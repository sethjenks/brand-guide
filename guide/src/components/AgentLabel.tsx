import { Text } from "@astryxdesign/core/Text";

type AgentLabelProps = {
  className?: string;
};

/** Marks guide content that is especially useful as agent instruction. */
export function AgentLabel({ className }: AgentLabelProps) {
  return (
    <Text
      as="span"
      type="label"
      weight="semibold"
      color="secondary"
      className={["agent-label", className].filter(Boolean).join(" ")}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-inner)",
      }}
      aria-label="Structured guidance for agents generating on-brand work"
    >
      For agents
    </Text>
  );
}
