import type { VoiceSpectrumRow } from "@/lib/brand-types";

type VoiceSpectrumTableProps = {
  rows: readonly VoiceSpectrumRow[];
};

const VIEW_W = 720;
const VIEW_H = 88;
const TRACK_Y = 28;
const LABEL_Y = 54;
const X0 = 56;
const X1 = VIEW_W - 56;
const STEP_COUNT = 5;

function stepX(index: number): number {
  return X0 + (index / (STEP_COUNT - 1)) * (X1 - X0);
}

/** Soft-wrap a step label for SVG (prefer breaking on spaces). */
function wrapLabel(label: string): [string] | [string, string] {
  if (label.length <= 12) return [label];
  const mid = Math.ceil(label.length / 2);
  const spaceBefore = label.lastIndexOf(" ", mid);
  const spaceAfter = label.indexOf(" ", mid);
  let breakAt = -1;
  if (spaceBefore > 0 && spaceAfter > 0) {
    breakAt =
      mid - spaceBefore <= spaceAfter - mid ? spaceBefore : spaceAfter;
  } else if (spaceBefore > 0) {
    breakAt = spaceBefore;
  } else if (spaceAfter > 0) {
    breakAt = spaceAfter;
  }
  if (breakAt <= 0) return [label];
  return [label.slice(0, breakAt), label.slice(breakAt + 1)];
}

function SpectrumRowSvg({ row }: { row: VoiceSpectrumRow }) {
  const hasRange = row.end >= row.start && row.end >= 0;
  const tickXs = row.steps.map((_, i) => stepX(i));
  const span = (X1 - X0) / (STEP_COUNT - 1);
  const rangeLeft = hasRange ? tickXs[row.start]! - span * 0.32 : 0;
  const rangeRight = hasRange ? tickXs[row.end]! + span * 0.32 : 0;
  const rangeWidth = Math.max(rangeRight - rangeLeft, 10);
  const rangeLabel = hasRange
    ? row.start === row.end
      ? row.steps[row.start]
      : `${row.steps[row.start]} → ${row.steps[row.end]}`
    : null;

  return (
    <svg
      className="voice-spectrum-svg"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={
        rangeLabel
          ? `${row.label}: ${rangeLabel}`
          : `${row.label} voice spectrum`
      }
    >
      <line
        className="vs-track"
        x1={X0}
        y1={TRACK_Y}
        x2={X1}
        y2={TRACK_Y}
      />

      {hasRange ? (
        <rect
          className="vs-range"
          x={rangeLeft}
          y={TRACK_Y - 8}
          width={rangeWidth}
          height={16}
          rx={8}
          ry={8}
        />
      ) : null}

      {row.steps.map((step, index) => {
        const x = tickXs[index]!;
        const inRange =
          hasRange && index >= row.start && index <= row.end;
        const lines = wrapLabel(step);
        return (
          <g key={step}>
            <circle
              className={inRange ? "vs-tick is-active" : "vs-tick"}
              cx={x}
              cy={TRACK_Y}
              r={inRange ? 5.5 : 3.5}
            />
            <text
              className={inRange ? "vs-label is-active" : "vs-label"}
              x={x}
              y={LABEL_Y}
              textAnchor="middle"
            >
              {lines.map((line, lineIndex) => (
                <tspan
                  key={line}
                  x={x}
                  dy={lineIndex === 0 ? 0 : 13}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function VoiceSpectrumTable({ rows }: VoiceSpectrumTableProps) {
  if (!rows.length) return null;

  return (
    <div
      className="voice-spectrum"
      role="list"
      aria-label="Brand voice spectrum — highlighted range marks where this brand sits on each dimension"
    >
      {rows.map((row) => (
        <div className="voice-spectrum-row" role="listitem" key={row.id}>
          <p className="voice-spectrum-dim">{row.label}</p>
          <SpectrumRowSvg row={row} />
        </div>
      ))}
    </div>
  );
}
