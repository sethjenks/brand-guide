/**
 * Client-safe section status types and display helpers (no Node APIs).
 */

export type SectionStatus =
  | "ok"
  | "empty"
  | "stub"
  | "sample"
  | "partial"
  | "assets";

export type SectionStatusMap = Readonly<Record<string, SectionStatus>>;

export type ChapterStatusAggregate = {
  id: string;
  needsWorkCount: number;
  worst: SectionStatus;
};

export type ResolvedSectionStatus = {
  byId: SectionStatusMap;
  chapters: readonly ChapterStatusAggregate[];
};

const SEVERITY: Record<SectionStatus, number> = {
  ok: 0,
  assets: 1,
  sample: 2,
  partial: 3,
  stub: 4,
  empty: 5,
};

export function worse(a: SectionStatus, b: SectionStatus): SectionStatus {
  return SEVERITY[a] >= SEVERITY[b] ? a : b;
}

export function sectionNeedsWork(status: SectionStatus | undefined): boolean {
  return Boolean(status && status !== "ok");
}

export function sectionStatusBadgeLabel(
  status: SectionStatus | undefined,
): string | null {
  switch (status) {
    case undefined:
    case "ok":
      return null;
    case "empty":
      return "Missing";
    case "stub":
      return "Stub";
    case "sample":
      return "Starter";
    case "partial":
      return "Partial";
    case "assets":
      return "Needs assets";
    default: {
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

export function sectionStatusNavLabel(
  status: SectionStatus | undefined,
): string | null {
  return sectionNeedsWork(status) ? "Needs work" : null;
}
