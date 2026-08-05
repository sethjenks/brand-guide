"use client";

import {
  ARCHETYPE_MOTIVES,
  ARCHETYPE_SEGMENTS,
  type ArchetypeId,
} from "@/lib/archetype-wheel";
import "@/styles/flourish/archetype-wheel.css";

const CX = 200;
const CY = 200;
const R_OUTER = 188;
const R_MIDDLE = 138;
const R_INNER = 92;
const R_HOLE = 52;
const SLICE = 30;

type ArchetypeWheelProps = {
  /** Brand-decided archetypes (always marked). */
  decided?: readonly ArchetypeId[];
  /** Currently lit segment (hover or selection). */
  activeId: ArchetypeId | null;
  onHover: (id: ArchetypeId | null) => void;
  onSelect: (id: ArchetypeId) => void;
  className?: string;
};

function polar(r: number, angleDeg: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  // Round so Node SSR and browser trig produce identical path strings.
  const x = Math.round((CX + r * Math.cos(rad)) * 1e4) / 1e4;
  const y = Math.round((CY + r * Math.sin(rad)) * 1e4) / 1e4;
  return [x, y];
}

function annularPath(
  rInner: number,
  rOuter: number,
  a0: number,
  a1: number,
): string {
  const [x0o, y0o] = polar(rOuter, a0);
  const [x1o, y1o] = polar(rOuter, a1);
  const [x1i, y1i] = polar(rInner, a1);
  const [x0i, y0i] = polar(rInner, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return [
    `M ${x0o} ${y0o}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${x1o} ${y1o}`,
    `L ${x1i} ${y1i}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${x0i} ${y0i}`,
    "Z",
  ].join(" ");
}

function arcTextPath(r: number, a0: number, a1: number): string {
  const pad = 1.2;
  const start = a0 + pad;
  const end = a1 - pad;
  const [x0, y0] = polar(r, start);
  const [x1, y1] = polar(r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
}

function segmentAngles(index: number): { a0: number; a1: number } {
  const a0 = index * SLICE;
  return { a0, a1: a0 + SLICE };
}

export function ArchetypeWheel({
  decided = [],
  activeId,
  onHover,
  onSelect,
  className,
}: ArchetypeWheelProps) {
  const decidedSet = new Set(decided);
  const hasLit = activeId !== null;
  const activeMotive = activeId
    ? ARCHETYPE_SEGMENTS.find((s) => s.id === activeId)?.motive
    : null;

  const rootClass = [
    "archetype-wheel",
    "is-interactive",
    hasLit ? "is-emphasized" : "is-neutral",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={rootClass}>
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Interactive brand archetype wheel. Hover or select a segment to preview."
      >
        <defs>
          {ARCHETYPE_SEGMENTS.map((segment, index) => {
            const { a0, a1 } = segmentAngles(index);
            return (
              <g key={`defs-${segment.id}`}>
                <path
                  id={`aw-label-${segment.id}`}
                  d={arcTextPath((R_OUTER + R_MIDDLE) / 2, a0, a1)}
                  fill="none"
                />
                <path
                  id={`aw-driver-${segment.id}`}
                  d={arcTextPath((R_MIDDLE + R_INNER) / 2, a0, a1)}
                  fill="none"
                />
              </g>
            );
          })}
          {ARCHETYPE_MOTIVES.map((motive) => {
            const a0 = motive.startIndex * SLICE;
            const a1 = a0 + SLICE * 3;
            return (
              <path
                key={`defs-motive-${motive.id}`}
                id={`aw-motive-${motive.id}`}
                d={arcTextPath((R_INNER + R_HOLE) / 2 + 4, a0 + 4, a1 - 4)}
                fill="none"
              />
            );
          })}
        </defs>

        {ARCHETYPE_MOTIVES.map((motive) => {
          const a0 = motive.startIndex * SLICE;
          const a1 = a0 + SLICE * 3;
          const sample = ARCHETYPE_SEGMENTS[motive.startIndex];
          const motiveActive = hasLit && activeMotive === motive.id;
          return (
            <path
              key={`motive-${motive.id}`}
              className={`aw-band aw-motive${motiveActive ? " is-active" : ""}`}
              data-motive={motive.id}
              d={annularPath(R_HOLE, R_INNER, a0, a1)}
              style={
                motiveActive ? { fill: sample.colors.motive } : undefined
              }
            />
          );
        })}

        {ARCHETYPE_SEGMENTS.map((segment, index) => {
          const { a0, a1 } = segmentAngles(index);
          const isActive = activeId === segment.id;
          const isDecided = decidedSet.has(segment.id);
          return (
            <g
              key={segment.id}
              className={`aw-segment${isActive ? " is-active" : ""}${isDecided ? " is-decided" : ""}`}
              data-archetype={segment.id}
            >
              <path
                className="aw-band aw-middle"
                d={annularPath(R_INNER, R_MIDDLE, a0, a1)}
                style={
                  isActive ? { fill: segment.colors.middle } : undefined
                }
              />
              <path
                className="aw-band aw-outer"
                d={annularPath(R_MIDDLE, R_OUTER, a0, a1)}
                style={isActive ? { fill: segment.colors.outer } : undefined}
              />
              {/* Full-slice hit target above fills */}
              <path
                className="aw-hit"
                d={annularPath(R_INNER, R_OUTER, a0, a1)}
                tabIndex={0}
                role="button"
                aria-label={`${segment.label} archetype`}
                aria-pressed={isActive}
                onMouseEnter={() => onHover(segment.id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(segment.id)}
                onBlur={() => onHover(null)}
                onClick={() => onSelect(segment.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(segment.id);
                  }
                }}
              />
            </g>
          );
        })}

        {ARCHETYPE_SEGMENTS.map((segment) => {
          const isActive = activeId === segment.id;
          const dimmed = hasLit && !isActive;
          const activeFill =
            segment.colors.label === "dark"
              ? "var(--color-text-primary)"
              : "var(--color-background-surface)";
          return (
            <g
              key={`label-${segment.id}`}
              className="aw-labels"
              aria-hidden="true"
              style={{ pointerEvents: "none" }}
            >
              <text
                className={`aw-text aw-text-outer${isActive ? " is-active" : ""}${dimmed ? " is-dim" : ""}`}
                style={isActive ? { fill: activeFill } : undefined}
              >
                <textPath
                  href={`#aw-label-${segment.id}`}
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {segment.label.toUpperCase()}
                </textPath>
              </text>
              <text
                className={`aw-text aw-text-driver${isActive ? " is-active" : ""}${dimmed ? " is-dim" : ""}`}
                style={
                  isActive
                    ? { fill: "var(--color-text-primary)" }
                    : undefined
                }
              >
                <textPath
                  href={`#aw-driver-${segment.id}`}
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {segment.driver.toUpperCase()}
                </textPath>
              </text>
            </g>
          );
        })}

        {ARCHETYPE_MOTIVES.map((motive) => {
          const motiveActive = hasLit && activeMotive === motive.id;
          const dimmed = hasLit && !motiveActive;
          return (
            <text
              key={`motive-label-${motive.id}`}
              className={`aw-text aw-text-motive${motiveActive ? " is-active" : ""}${dimmed ? " is-dim" : ""}`}
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                ...(motiveActive
                  ? { fill: "var(--color-background-surface)" }
                  : {}),
              }}
            >
              <textPath
                href={`#aw-motive-${motive.id}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {motive.shortLabel.toUpperCase()}
              </textPath>
            </text>
          );
        })}

        <circle className="aw-hole" cx={CX} cy={CY} r={R_HOLE - 0.5} />
      </svg>
      <figcaption className="sr-only">
        Twelve brand archetypes. Hover or activate a segment to preview its
        profile on the right.
      </figcaption>
    </figure>
  );
}
