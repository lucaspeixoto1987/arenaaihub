"use client";

import { useState } from "react";
import { Table2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { CardHeader } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/format";
import type { FunnelStage } from "@/lib/data";

/**
 * Rampa ordinal de uma única matiz (claro → escuro conforme a etapa avança).
 * Validada com `validate_palette.js --ordinal` sobre a superfície #fdfcfa:
 * monotonia de luminosidade, distância mínima entre passos e ponta clara
 * acima de 2:1 contra a superfície.
 */
const RAMP = ["#7db29b", "#59a184", "#2f8163", "#216450"];

export function PipelineFunnel({ stages }: { stages: FunnelStage[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [asTable, setAsTable] = useState(false);

  const max = Math.max(...stages.map((stage) => stage.value));

  const rows = stages.map((stage, index) => {
    const previous = stages[index - 1];
    const conversion = previous ? (stage.deals / previous.deals) * 100 : null;
    return { ...stage, conversion, color: RAMP[index % RAMP.length] };
  });

  return (
    <>
      <CardHeader
        title="Funil do trimestre"
        description="Valor aberto por etapa, do primeiro contato à negociação."
        action={
          <button
            type="button"
            onClick={() => setAsTable((value) => !value)}
            aria-pressed={asTable}
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-2.5 py-1 text-[12px] font-medium text-ink-secondary transition-colors hover:bg-surface-sunken"
          >
            <Table2 size={13} strokeWidth={1.75} aria-hidden />
            {asTable ? "Gráfico" : "Tabela"}
          </button>
        }
      />

      <div className="px-5 pb-5">
        {asTable ? (
          <table className="w-full text-[12.5px]">
            <caption className="sr-only">
              Negócios abertos por etapa do funil no trimestre
            </caption>
            <thead>
              <tr className="border-b border-hairline text-left text-ink-muted">
                <th scope="col" className="pb-2 font-medium">
                  Etapa
                </th>
                <th scope="col" className="pb-2 text-right font-medium">
                  Negócios
                </th>
                <th scope="col" className="pb-2 text-right font-medium">
                  Valor
                </th>
                <th scope="col" className="pb-2 text-right font-medium">
                  Avanço
                </th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-hairline/60">
                  <th
                    scope="row"
                    className="py-2 text-left font-normal text-ink"
                  >
                    {row.label}
                  </th>
                  <td className="py-2 text-right text-ink-secondary">
                    {row.deals}
                  </td>
                  <td className="py-2 text-right text-ink-secondary">
                    {formatCurrency(row.value, true)}
                  </td>
                  <td className="py-2 text-right text-ink-secondary">
                    {row.conversion === null
                      ? "—"
                      : formatPercent(row.conversion)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col gap-3.5">
            {rows.map((row, index) => (
              <div
                key={row.label}
                className="relative -mx-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-sunken/70"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                {hovered === index ? (
                  <div
                    role="status"
                    className="pointer-events-none absolute right-2 bottom-full z-10 mb-1 rounded-md border border-hairline bg-surface-raised px-2.5 py-1.5 text-[11.5px] whitespace-nowrap text-ink shadow-[var(--shadow-pop)]"
                  >
                    <span className="font-medium">{row.label}</span>
                    <span className="text-ink-muted">
                      {" "}
                      · {row.deals} negócios · {formatCurrency(row.value)}
                    </span>
                    {row.conversion !== null ? (
                      <span className="text-ink-muted">
                        {" "}
                        · {formatPercent(row.conversion)} avançaram
                      </span>
                    ) : null}
                  </div>
                ) : null}

                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-medium text-ink">
                    {row.label}
                  </span>
                  <span className="text-[12.5px] tabular-nums text-ink-secondary">
                    {row.deals} · {formatCurrency(row.value, true)}
                  </span>
                </div>

                <div className="mt-2 h-3.5 w-full">
                  <div
                    className={cn(
                      "h-full rounded-r-[4px] transition-[width] duration-500",
                    )}
                    style={{
                      width: `${(row.value / max) * 100}%`,
                      backgroundColor: row.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
