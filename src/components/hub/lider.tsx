"use client";

import { faixaNota, type MembroEquipe } from "@/lib/data";

/**
 * Visão do líder: uso das ferramentas pelo time. Sem CRM — nada de valor de
 * negócio aqui, só o que o Hub mede.
 */
export function LiderView({ equipe }: { equipe: MembroEquipe[] }) {
  const totalPreparacoes = equipe.reduce((t, m) => t + m.preparacoes, 0);
  const totalCalls = equipe.reduce((t, m) => t + m.calls, 0);
  const totalTreinos = equipe.reduce((t, m) => t + m.treinos, 0);
  const media = equipe.reduce((t, m) => t + m.media, 0) / equipe.length;

  const ordenada = [...equipe].sort((a, b) => b.media - a.media);
  const maxUso = Math.max(
    ...equipe.map((m) => m.preparacoes + m.calls + m.treinos),
  );

  const indicadores = [
    { rotulo: "Preparações", valor: totalPreparacoes },
    { rotulo: "Calls analisadas", valor: totalCalls },
    { rotulo: "Treinos", valor: totalTreinos },
    { rotulo: "Média das calls", valor: media.toFixed(1), destaque: true },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="grid shrink-0 grid-cols-2 gap-3 sm:grid-cols-4">
        {indicadores.map((item) => (
          <div
            key={item.rotulo}
            className="rounded-xl border border-line bg-surface p-3 shadow-[var(--shadow-card)]"
          >
            <p className="text-[11px] font-medium text-ink-3">{item.rotulo}</p>
            <p
              className="mt-1.5 text-[22px] leading-none font-semibold tracking-[-0.02em]"
              style={item.destaque ? { color: "var(--brand)" } : undefined}
            >
              {item.valor}
            </p>
            <p className="mt-1 text-[10.5px] text-ink-3">últimos 30 dias</p>
          </div>
        ))}
      </div>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
        <header className="shrink-0 border-b border-line px-4 py-3">
          <h2 className="text-[13.5px] font-semibold text-ink">
            Uso das ferramentas por vendedor
          </h2>
          <p className="mt-0.5 text-[11.5px] text-ink-3">
            Quem treina aparece na nota das calls — a barra mostra o volume de
            uso.
          </p>
        </header>

        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
          <table className="w-full text-[12.5px]">
            <caption className="sr-only">
              Preparações, calls analisadas, treinos e média por vendedor
            </caption>
            <thead className="sticky top-0 bg-surface">
              <tr className="border-b border-line text-left text-ink-3">
                <th scope="col" className="px-4 py-2 font-medium">
                  Vendedor
                </th>
                <th scope="col" className="px-2 py-2 text-right font-medium">
                  Prep.
                </th>
                <th scope="col" className="px-2 py-2 text-right font-medium">
                  Calls
                </th>
                <th scope="col" className="px-2 py-2 text-right font-medium">
                  Treinos
                </th>
                <th scope="col" className="px-4 py-2 text-right font-medium">
                  Média
                </th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {ordenada.map((membro) => {
                const uso = membro.preparacoes + membro.calls + membro.treinos;
                const faixa = faixaNota(membro.media);
                return (
                  <tr key={membro.id} className="border-b border-line-2">
                    <th
                      scope="row"
                      className="px-4 py-2.5 text-left font-normal"
                    >
                      <span className="block font-medium text-ink">
                        {membro.nome}
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-3">
                          <span
                            className="block h-full rounded-full bg-brand"
                            style={{ width: `${(uso / maxUso) * 100}%` }}
                          />
                        </span>
                        <span className="text-[10.5px] text-ink-3">
                          {uso} usos
                        </span>
                      </span>
                    </th>
                    <td className="px-2 py-2.5 text-right text-ink-2">
                      {membro.preparacoes}
                    </td>
                    <td className="px-2 py-2.5 text-right text-ink-2">
                      {membro.calls}
                    </td>
                    <td className="px-2 py-2.5 text-right text-ink-2">
                      {membro.treinos}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <span
                        className="font-semibold"
                        style={{ color: faixa.cor }}
                      >
                        {membro.media.toFixed(1)}
                      </span>
                      <span className="ml-1 text-[10.5px] text-ink-3">
                        {faixa.rotulo}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
