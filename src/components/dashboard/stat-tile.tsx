import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import type { Kpi } from "@/lib/data";
import { formatByKind, formatDelta } from "@/lib/format";

export function StatTile({ kpi }: { kpi: Kpi }) {
  const rising = kpi.delta > 0;
  const good = rising === kpi.higherIsBetter;
  const DeltaIcon = rising ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-5">
      <p className="text-[12.5px] font-medium text-ink-muted">{kpi.label}</p>

      <p className="mt-3 text-[28px] leading-none font-semibold tracking-[-0.02em] text-ink">
        {formatByKind(kpi.format, kpi.value)}
        {kpi.unitSuffix ? (
          <span className="ml-1.5 text-[14px] font-normal text-ink-muted">
            {kpi.unitSuffix}
          </span>
        ) : null}
      </p>

      <p className="mt-2.5 flex items-center gap-1.5 text-[12.5px]">
        <DeltaIcon
          size={14}
          strokeWidth={2}
          aria-hidden
          style={{
            color: good ? "var(--status-good-text)" : "var(--status-critical)",
          }}
        />
        <span
          className="font-medium tabular-nums"
          style={{
            color: good ? "var(--status-good-text)" : "var(--status-critical)",
          }}
        >
          {formatDelta(kpi.delta)}
        </span>
        <span className="text-ink-muted">{kpi.deltaPeriod}</span>
      </p>

      <div className="mt-4">
        <Sparkline points={kpi.trend} format={kpi.format} label={kpi.label} />
      </div>
    </Card>
  );
}
