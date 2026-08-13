import type { SectionStatus } from "@/lib/section-status-ui";

export type SectionStatusShapeKind = "ring" | "half" | "triangle";

type SectionStatusShapeProps = {
  status?: SectionStatus;
  size?: "sm" | "md";
  className?: string;
};

/** Map status → silhouette (stub/sample share empty’s ring). */
export function sectionStatusShapeKind(
  status: SectionStatus | undefined,
): SectionStatusShapeKind | null {
  switch (status) {
    case undefined:
    case "ok":
      return null;
    case "empty":
    case "stub":
    case "sample":
      return "ring";
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
 * empty/stub/sample → ring; partial → half-filled; assets → up-triangle.
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
