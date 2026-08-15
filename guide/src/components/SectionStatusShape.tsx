import type { SectionStatus } from "@/lib/section-status-ui";

export type SectionStatusShapeKind = "ring" | "square" | "half" | "triangle";

type SectionStatusShapeProps = {
  status?: SectionStatus;
  size?: "sm" | "md";
  className?: string;
};

/** Map status → silhouette. */
export function sectionStatusShapeKind(
  status: SectionStatus | undefined,
): SectionStatusShapeKind | null {
  switch (status) {
    case undefined:
    case "ok":
      return null;
    case "empty":
    case "sample":
      return "ring";
    case "stub":
      return "square";
    case "partial":
      return "half";
    case "assets":
      return "triangle";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

/**
 * Geometric mark for section customization status (nav + header badges).
 * empty/sample → ring; stub → square; partial → half-filled; assets → triangle.
 */
export function SectionStatusShape({
  status,
  size = "sm",
  className,
}: SectionStatusShapeProps) {
  const kind = sectionStatusShapeKind(status);
  if (!kind) return null;
  return (
    <span
      className={[
        "section-status-shape",
        `section-status-shape-${kind}`,
        `section-status-shape-${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    />
  );
}
