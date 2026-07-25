"use client";

import { useRef, useState } from "react";
import type { Kpi, TrendPoint } from "@/lib/data";
import { formatByKind } from "@/lib/format";

const W = 160;
const H = 38;
const PAD_Y = 5;

/**
 * Tendência de 12 períodos ao lado do valor do indicador.
 *
 * Linha na cor de recuo, período atual no acento. O valor exato de cada ponto
 * aparece na camada de hover (camada de ponto-mais-próximo, sem alvo milimétrico)
 * e também pelo teclado — nunca é o único caminho para o número principal, que
 * já está impresso no cartão.
 */
export function Sparkline({
  points,
  format,
  label,
}: {
  points: TrendPoint[];
  format: Kpi["format"];
  label: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const formatValue = (value: number) => formatByKind(format, value);

  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const coords = points.map((point, index) => ({
    x: (index / (points.length - 1)) * W,
    y: H - PAD_Y - ((point.value - min) / span) * (H - PAD_Y * 2),
  }));

  const path = coords
    .map(
      (coord, index) =>
        `${index === 0 ? "M" : "L"}${coord.x.toFixed(2)},${coord.y.toFixed(2)}`,
    )
    .join(" ");

  const last = coords[coords.length - 1];
  const current = active === null ? null : coords[active];

  function handleMove(event: React.MouseEvent<SVGSVGElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = (event.clientX - rect.left) / rect.width;
    const index = Math.round(ratio * (points.length - 1));
    setActive(Math.max(0, Math.min(points.length - 1, index)));
  }

  function handleKey(event: React.KeyboardEvent<SVGSVGElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      const base = active ?? points.length - 1;
      setActive(Math.max(0, Math.min(points.length - 1, base + step)));
    }
    if (event.key === "Escape") setActive(null);
  }

  const readout = active === null ? null : points[active];

  return (
    <div className="relative">
      {readout ? (
        <div
          role="status"
          className="pointer-events-none absolute -top-8 right-0 z-10 rounded-md border border-hairline bg-surface-raised px-2 py-1 text-[11.5px] whitespace-nowrap text-ink shadow-[var(--shadow-pop)]"
        >
          <span className="text-ink-muted">{readout.label}</span>{" "}
          <span className="font-medium tabular-nums">
            {formatValue(readout.value)}
          </span>
        </div>
      ) : null}

      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        role="img"
        tabIndex={0}
        aria-label={`${label}: tendência dos últimos ${points.length} períodos, de ${formatValue(values[0])} a ${formatValue(values[values.length - 1])}`}
        className="overflow-visible focus-visible:outline-offset-4"
        onMouseMove={handleMove}
        onMouseLeave={() => setActive(null)}
        onKeyDown={handleKey}
        onBlur={() => setActive(null)}
      >
        <path
          d={path}
          fill="none"
          stroke="var(--de-emphasis)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {current ? (
          <line
            x1={current.x}
            x2={current.x}
            y1={0}
            y2={H}
            stroke="var(--axis)"
            strokeWidth={1}
          />
        ) : null}

        {/* Período atual: único ponto no acento, com anel na cor da superfície. */}
        <circle
          cx={last.x}
          cy={last.y}
          r={4}
          fill="var(--accent-500)"
          stroke="var(--surface)"
          strokeWidth={2}
        />

        {current && active !== points.length - 1 ? (
          <circle
            cx={current.x}
            cy={current.y}
            r={4}
            fill="var(--ink)"
            stroke="var(--surface)"
            strokeWidth={2}
          />
        ) : null}
      </svg>
    </div>
  );
}
