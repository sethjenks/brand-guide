type AgentLabelProps = {
  className?: string;
};

/** Marks guide content that is especially useful as agent instruction. */
export function AgentLabel({ className }: AgentLabelProps) {
  return (
    <span
      className={["agent-label", className].filter(Boolean).join(" ")}
      title="Structured guidance for agents generating on-brand work"
    >
      For agents
    </span>
  );
}
