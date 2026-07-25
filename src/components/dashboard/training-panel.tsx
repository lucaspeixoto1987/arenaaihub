import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Meter } from "@/components/ui/meter";
import { buttonClasses } from "@/components/ui/button";
import { formatPercent } from "@/lib/format";
import type { Drill } from "@/lib/data";

export function TrainingPanel({ drills }: { drills: Drill[] }) {
  const weakest = [...drills].sort((a, b) => a.mastery - b.mastery)[0];

  return (
    <Card>
      <CardHeader
        title="Sala de treino"
        description="Domínio por tipo de objeção, medido nas simulações."
      />

      <ul className="flex flex-col gap-4 px-5 pb-4">
        {drills.map((drill) => (
          <li key={drill.id}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[13px] font-medium text-ink">
                {drill.label}
              </span>
              <span className="text-[12.5px] tabular-nums text-ink-secondary">
                {formatPercent(drill.mastery)}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[12px] text-ink-muted">
              {drill.objection}
            </p>
            <Meter
              value={drill.mastery}
              label={`Domínio em ${drill.label}`}
              className="mt-2"
            />
            <p className="mt-1.5 text-[11.5px] text-ink-muted">
              {drill.sessions} simulações
            </p>
          </li>
        ))}
      </ul>

      <div className="border-t border-hairline px-5 py-4">
        <p className="text-[12.5px] leading-5 text-ink-secondary">
          Seu ponto mais fraco agora é{" "}
          <span className="font-medium text-ink">
            {weakest.label.toLowerCase()}
          </span>
          . Vale uma rodada antes da próxima proposta.
        </p>
        <Link
          href={`/treino?drill=${encodeURIComponent(weakest.id)}`}
          className={buttonClasses("secondary", "sm", "mt-3 w-full")}
        >
          Treinar {weakest.label.toLowerCase()}
        </Link>
      </div>
    </Card>
  );
}
