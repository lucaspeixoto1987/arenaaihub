"use client";

import {
  faixaNota,
  type AnaliseCall,
  type Preparacao,
  type ResumoTreino,
} from "@/lib/data";

/** Últimas preparações geradas. Cada linha abre aquela preparação. */
export function PreparacoesPreview({
  preparacoes,
  aoAbrir,
}: {
  preparacoes: Preparacao[];
  aoAbrir: (id: string) => void;
}) {
  if (preparacoes.length === 0) {
    return (
      <p className="rounded-lg border border-line-2 bg-surface-2 p-3 text-[11px] leading-snug text-ink-3">
        Você ainda não gerou nenhuma preparação. As próximas aparecem aqui.
      </p>
    );
  }

  return (
    <ul className="scroll-thin pointer-events-auto flex min-h-[84px] flex-1 flex-col gap-px overflow-y-auto lg:min-h-0">
      {preparacoes.slice(0, 4).map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => aoAbrir(item.id)}
            className="pointer-events-auto -mx-1 flex w-[calc(100%+0.5rem)] items-center gap-2 rounded px-1 py-[3px] text-left transition-colors hover:bg-surface-3"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
            />
            <span className="min-w-0 flex-1 truncate text-[11px] text-ink-2">
              {item.contato}
              <span className="text-ink-3"> · {item.empresa}</span>
            </span>
            <span className="shrink-0 text-[10px] text-ink-3">
              {item.quando}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/**
 * Notas das últimas 7 calls analisadas.
 *
 * A altura da barra carrega o valor; a cor marca a faixa (boa / atenção /
 * revisar) e vem sempre com o número impresso embaixo, então a leitura não
 * depende de enxergar a cor.
 */
export function CallsPreview({
  calls,
  aoAbrir,
}: {
  calls: AnaliseCall[];
  aoAbrir: (id: string) => void;
}) {
  if (calls.length === 0) {
    return (
      <p className="rounded-lg border border-line-2 bg-surface-2 p-3 text-[11px] leading-snug text-ink-3">
        Você ainda não analisou nenhuma call. As últimas 7 aparecem aqui.
      </p>
    );
  }

  const ultimas = calls.slice(-7);
  const media =
    ultimas.reduce((total, c) => total + c.nota, 0) / ultimas.length;
  const metade = Math.ceil(ultimas.length / 2);
  const antes = ultimas.slice(0, metade);
  const depois = ultimas.slice(metade);
  const mediaAntes = antes.reduce((t, c) => t + c.nota, 0) / antes.length;
  const mediaDepois = depois.reduce((t, c) => t + c.nota, 0) / depois.length;
  const variacao = Math.round(((mediaDepois - mediaAntes) / mediaAntes) * 100);
  const faixaMedia = faixaNota(media);

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-line-2 bg-surface-2 p-2.5">
      <div className="flex shrink-0 items-baseline justify-between gap-2">
        <span className="text-[9.5px] font-semibold tracking-[0.1em] text-ink-3 uppercase">
          Últimas {ultimas.length} análises
        </span>
        <span className="text-[10.5px] whitespace-nowrap text-ink-2 tabular-nums">
          média{" "}
          <b className="font-semibold" style={{ color: faixaMedia.cor }}>
            {media.toFixed(1)}
          </b>
          <span className="ml-1 text-ink-3">
            {variacao >= 0 ? "+" : "−"}
            {Math.abs(variacao)}%
          </span>
        </span>
      </div>

      <div className="mt-2 flex min-h-[44px] flex-1 items-end gap-1">
        {ultimas.map((call) => {
          const faixa = faixaNota(call.nota);
          return (
            <button
              key={call.id}
              type="button"
              onClick={() => aoAbrir(call.id)}
              title={`${call.empresa} · nota ${call.nota.toFixed(1)} (${faixa.rotulo})`}
              className="pointer-events-auto flex h-full flex-1 flex-col justify-end gap-1 rounded-sm"
            >
              <span
                className="w-full rounded-t-[3px] transition-opacity hover:opacity-80"
                style={{
                  height: `${Math.max(6, (call.nota / 10) * 100)}%`,
                  backgroundColor: faixa.cor,
                }}
              />
              <span className="text-center text-[9px] leading-none text-ink-2 tabular-nums">
                {call.nota.toFixed(1)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Evolução das notas de treino. Uma série só, na cor da marca. */
export function TreinoPreview({ resumo }: { resumo: ResumoTreino }) {
  if (resumo.total === 0) {
    return (
      <p className="rounded-lg border border-line-2 bg-surface-2 p-3 text-[11px] leading-snug text-ink-3">
        Você ainda não treinou. Sua evolução aparece aqui.
      </p>
    );
  }

  const W = 100;
  const H = 34;
  const pontos = resumo.evolucao;
  const max = Math.max(...pontos, 10);
  const passo = W / Math.max(1, pontos.length - 1);
  const linha = pontos
    .map(
      (nota, i) =>
        `${i === 0 ? "M" : "L"}${(i * passo).toFixed(1)},${(H - (nota / max) * H).toFixed(1)}`,
    )
    .join(" ");
  const area = `${linha} L${W},${H} L0,${H} Z`;

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-line-2 bg-surface-2 p-2.5">
      <div className="flex shrink-0 items-baseline justify-between gap-2">
        <span className="text-[9.5px] font-semibold tracking-[0.1em] text-ink-3 uppercase">
          Evolução
        </span>
        <span className="text-[10.5px] text-ink-2 tabular-nums">
          média{" "}
          <b className="font-semibold text-brand">{resumo.media.toFixed(1)}</b>
        </span>
      </div>

      <div className="mt-1.5 min-h-[26px] flex-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="h-full w-full"
          role="img"
          aria-label={`Evolução das notas de treino em ${resumo.total} rodadas, média ${resumo.media.toFixed(1)} de 10`}
        >
          <path d={area} fill="var(--brand)" opacity="0.12" />
          <path
            d={linha}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="mt-1 shrink-0 text-[10px] text-ink-3">
        {resumo.total} rodadas concluídas
      </p>
    </div>
  );
}
