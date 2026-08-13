import { SectionStatusShape } from "@/components/SectionStatusShape";
import type { SectionStatus } from "@/lib/section-status-ui";
import { sectionStatusBadgeLabel } from "@/lib/section-status-ui";

type SectionStatusBadgeProps = {
  status?: SectionStatus;
  className?: string;
};

/**
 * Compact customization status chip (Missing / Stub / Starter / Partial / Needs assets).
 * Shared by Brand document, section headers, and nav tooling.
 */
export function SectionStatusBadge({
  status,
  className,
}: SectionStatusBadgeProps) {
  const label = sectionStatusBadgeLabel(status);
  if (!label || !status || status === "ok") return null;
  return (
    <span
      className={["brand-doc-badge", `brand-doc-badge-${status}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      <SectionStatusShape status={status} size="md" />
      {label}
    </span>
  );
}
