"use client";

import { useMemo, useState } from "react";
import { ArchetypeProfileCard } from "@/components/ArchetypeProfileCard";
import { ArchetypeWheel } from "@/components/ArchetypeWheel";
import { ClotheslineLeaf } from "@/components/ClotheslineLeaf";
import { mergeBrandOverCatalog } from "@/lib/archetype-catalog";
import {
  resolveArchetypeIds,
  type ArchetypeId,
} from "@/lib/archetype-wheel";
import type { ArchetypeProfile } from "@/lib/brand-types";

type ArchetypeExplorerProps = {
  brandProfiles: readonly ArchetypeProfile[];
  /** Fallback name when no wheel-mapped profiles exist yet. */
  fallbackName?: string;
  /** Hash target for guide nav (defaults to strategy-archetype). */
  id?: string;
};

export function ArchetypeExplorer({
  brandProfiles,
  fallbackName,
  id = "strategy-archetype",
}: ArchetypeExplorerProps) {
  const decided = useMemo(() => {
    const fromProfiles = resolveArchetypeIds(
      brandProfiles.map((p) => p.wheel || p.name),
    );
    if (fromProfiles.length) return fromProfiles;
    return resolveArchetypeIds(fallbackName ?? null);
  }, [brandProfiles, fallbackName]);

  const initial = decided[0] ?? "sage";
  const [selectedId, setSelectedId] = useState<ArchetypeId>(initial);
  const [hoveredId, setHoveredId] = useState<ArchetypeId | null>(null);

  const activeId = hoveredId ?? selectedId;
  const preview = mergeBrandOverCatalog(activeId, brandProfiles);

  return (
    <ClotheslineLeaf
      id={id}
      title="Archetype"
      gap={4}
      className="clothesline-grid-section archetype-explorer"
    >
      {/* Wheel occupies left ~2/3 (aligned with clothesline cols 1–2); profile on the right */}
      <div className="archetype-layout">
        <ArchetypeWheel
          decided={decided}
          activeId={activeId}
          onHover={setHoveredId}
          onSelect={setSelectedId}
        />
        <div className="archetype-preview">
          <ArchetypeProfileCard
            profile={preview}
            compact
            roleLabel="Profile"
          />
        </div>
      </div>
    </ClotheslineLeaf>
  );
}
