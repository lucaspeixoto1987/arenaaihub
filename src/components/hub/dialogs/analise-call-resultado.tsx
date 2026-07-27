"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CircleAlert,
  Ear,
  Gauge,
  MessageSquare,
  Mic,
  Repeat2,
  ShieldAlert,
  ThumbsUp,
  UserSearch,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  BotaoCopiar,
  Etiqueta,
  TituloSecao,
} from "@/components/hub/dialogs/pecas";
import { Button } from "@/components/ui/button";
import { estiloEstado, faixaNota100, type AnaliseResultado } from "@/lib/data";

const SECOES = [
  { id: "placar", rotulo: "Placar" },
  { id: "conversa", rotulo: "Conversa" },
  { id: "falhas", rotulo: "O que custou" },
  { id: "cliente", rotulo: "Cliente" },
  { id: "conducao", rotulo: "Condução" },
  { id: "replay", rotulo: "Replay" },
  { id: "plano", rotulo: "Plano" },
];

const CORES_SENTIMENTO = {
  positivo: "var(--score-good)",
  neutro: "#c4c9cb",
  negativo: "var(--score-low)",
} as const;

/** Anel da nota: o número é a informação, o anel só dá a proporção. */
function AnelNota({ nota, cor }: { nota: number; cor: string }) {
  const raio = 38;
  const volta = 2 * Math.PI * raio;
  const preenchido = (Math.max(0, Math.min(100, nota)) / 100) * volta;

  return (
    <div className="relative h-[92px] w-[92px] shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={raio}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth="9"
        />
        <circle
          cx="50"
          cy="50"
          r={raio}
          fill="none"
          stroke={cor}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${preenchido} ${volta}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-[26px] leading-none font-bold"
          style={{ color: cor }}
        >
          {nota}
        </span>
        <span className="mt-1 text-[9.5px] font-medium text-ink-3">de 100</span>
      </div>
    </div>
  );
}

export function AnaliseCallResultado({
  dados,
  aoTreinar,
  aoPreparar,
}: {
  dados: AnaliseResultado;
  aoTreinar: () => void;
  aoPreparar: () => void;
}) {
  const [copiado, setCopiado] = useState<string | null>(null);
  const [secaoAtiva, setSecaoAtiva] = useState(SECOES[0].id);
  const corpo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = corpo.current;
    const rolavel = raiz?.parentElement;
    if (!raiz || !rolavel) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visivel) setSecaoAtiva(visivel.target.id.replace("secao-", ""));
      },
      { root: rolavel, rootMargin: "-140px 0px -55% 0px" },
    );

    SECOES.forEach((secao) => {
      const alvo = raiz.querySelector(`#secao-${secao.id}`);
      if (alvo) observador.observe(alvo);
    });
    return () => observador.disconnect();
  }, []);

  function copiar(texto: string) {
    navigator.clipboard?.writeText(texto);
    setCopiado(texto);
    setTimeout(
      () => setCopiado((atual) => (atual === texto ? null : atual)),
      1600,
    );
  }

  function irPara(id: string) {
    corpo.current
      ?.querySelector(`#secao-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const faixa = faixaNota100(dados.nota);
  const pontosPerdidos = dados.violacoes.reduce((t, v) => t + v.peso, 0);

  const sinais = [
    {
      icone: Mic,
      valor: `${dados.conducao.falaVendedor}%`,
      rotulo: "do tempo foi você falando",
      ruim: dados.conducao.falaVendedor > 60,
    },
    {
      icone: MessageSquare,
      valor: `${dados.conducao.perguntasAbertas} de ${dados.conducao.perguntasTotal}`,
      rotulo: "perguntas foram abertas",
      ruim: dados.conducao.perguntasAbertas === 0,
    },
    {
      icone: ArrowRight,
      valor: "Sem data",
      rotulo: "próximo passo combinado",
      ruim: true,
    },
  ];

  return (
    <div ref={corpo} className="bg-surface-2">
      {/* Identificação + índice */}
      <div className="sticky top-0 z-10 border-b border-line bg-surface/95 px-5 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-bold"
            style={{ backgroundColor: faixa.wash, color: faixa.cor }}
          >
            {dados.nota}
          </span>
          <div className="min-w-0">
            <p className="text-[14.5px] leading-tight font-semibold text-ink">
              {dados.contato}
              <span className="ml-1.5 text-[12px] font-normal text-ink-3">
                {dados.empresa}
              </span>
            </p>
            <p className="text-[12px] text-ink-3">
              {dados.data} · conduzida por {dados.vendedor}
            </p>
          </div>

          <div className="ml-auto">
            <Etiqueta cor={faixa.cor} wash={faixa.wash} linha={faixa.linha}>
              {faixa.rotulo}
            </Etiqueta>
          </div>
        </div>

        <nav className="scroll-thin -mb-1 mt-2.5 flex gap-1 overflow-x-auto pb-1">
          {SECOES.map((secao) => (
            <button
              key={secao.id}
              type="button"
              onClick={() => irPara(secao.id)}
              aria-current={secaoAtiva === secao.id ? "true" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors",
                secaoAtiva === secao.id
                  ? "border-brand-line bg-brand-wash text-brand"
                  : "border-line text-ink-2 hover:border-brand-line hover:text-brand",
              )}
            >
              {secao.rotulo}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {/* ---------- Placar ---------- */}
        <section id="secao-placar" className="scroll-mt-[136px]">
          <TituloSecao icone={Gauge} apoio="o veredito em dez segundos">
            Placar da call
          </TituloSecao>

          <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <article
              className="flex items-center gap-4 rounded-xl border p-4"
              style={{ backgroundColor: faixa.wash, borderColor: faixa.linha }}
            >
              <AnelNota nota={dados.nota} cor={faixa.cor} />
              <div className="min-w-0">
                <p
                  className="text-[11px] font-bold tracking-[0.1em] uppercase"
                  style={{ color: faixa.cor }}
                >
                  {faixa.rotulo}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
                  {dados.resumo}
                </p>
              </div>
            </article>

            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {sinais.map((sinal) => {
                const Icone = sinal.icone;
                return (
                  <div
                    key={sinal.rotulo}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5"
                  >
                    <Icone
                      size={15}
                      strokeWidth={1.9}
                      aria-hidden
                      className="shrink-0"
                      style={{
                        color: sinal.ruim
                          ? "var(--score-low)"
                          : "var(--score-good)",
                      }}
                    />
                    <p className="min-w-0">
                      <span
                        className="text-[15px] font-semibold tabular-nums"
                        style={{
                          color: sinal.ruim
                            ? "var(--score-low)"
                            : "var(--score-good)",
                        }}
                      >
                        {sinal.valor}
                      </span>
                      <span className="ml-1.5 text-[11.5px] text-ink-3">
                        {sinal.rotulo}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex items-start gap-3 rounded-xl border border-brand-line bg-brand-wash p-4">
            <ShieldAlert
              size={16}
              strokeWidth={1.9}
              aria-hidden
              className="mt-0.5 shrink-0 text-brand"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-bold tracking-[0.1em] text-brand uppercase">
                A mudança que mais importa
              </p>
              <p className="mt-1 text-[14px] leading-snug font-semibold text-ink">
                {dados.principalPonto}
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Conversa ---------- */}
        <section id="secao-conversa" className="scroll-mt-[136px]">
          <TituloSecao icone={Repeat2} apoio="nota por etapa, do começo ao fim">
            Como foi a conversa
          </TituloSecao>

          {/* Clima ao longo da chamada */}
          <div className="mb-3 rounded-xl border border-line bg-surface p-3.5">
            <p className="text-[11px] font-medium text-ink-3">
              Clima ao longo da chamada
            </p>
            <div className="mt-2 flex gap-0.5">
              {dados.sentimento.map((parte) => (
                <div key={parte.trecho} className="flex-1">
                  <div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: CORES_SENTIMENTO[parte.estado] }}
                  />
                  <p className="mt-1.5 text-[10.5px] text-ink-3">
                    {parte.trecho} ·{" "}
                    <span className="font-medium text-ink-2">
                      {parte.estado}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {dados.criterios.map((criterio) => {
              const estilo = estiloEstado(criterio.estado);
              return (
                <li
                  key={criterio.id}
                  className="flex flex-col rounded-xl border border-line bg-surface p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-ink">
                      {criterio.titulo}
                    </p>
                    <span
                      className="text-[13px] font-bold tabular-nums"
                      style={{ color: estilo.cor }}
                    >
                      {criterio.nota.toFixed(1)}
                      <span className="text-[10px] font-medium text-ink-3">
                        /10
                      </span>
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${criterio.nota * 10}%`,
                        backgroundColor: estilo.cor,
                      }}
                    />
                  </div>

                  {criterio.citacao && (
                    <p
                      className="mt-2.5 border-l-2 pl-2.5 text-[12px] leading-snug text-ink-2 italic"
                      style={{ borderColor: estilo.linha }}
                    >
                      “{criterio.citacao}”
                    </p>
                  )}

                  <p className="mt-2 text-[11.5px] leading-snug text-ink-3">
                    {criterio.comentario}
                  </p>

                  <div className="mt-2.5">
                    <Etiqueta
                      cor={estilo.cor}
                      wash={estilo.wash}
                      linha={estilo.linha}
                    >
                      {estilo.rotulo}
                    </Etiqueta>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ---------- O que custou pontos ---------- */}
        <section id="secao-falhas" className="scroll-mt-[136px]">
          <TituloSecao icone={CircleAlert} apoio={`−${pontosPerdidos} pontos`}>
            O que custou caro
          </TituloSecao>

          <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--low-wash)",
                borderColor: "var(--low-line)",
              }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.1em] uppercase"
                style={{ color: "var(--score-low)" }}
              >
                Modos de falha detectados
              </p>
              <ul className="mt-2.5 flex flex-col gap-2">
                {dados.modosDeFalha.map((modo) => (
                  <li
                    key={modo}
                    className="flex gap-2 text-[12.5px] leading-snug text-ink-2"
                  >
                    <AlertTriangle
                      size={13}
                      strokeWidth={1.9}
                      aria-hidden
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--score-low)" }}
                    />
                    {modo}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="flex flex-col gap-3">
              {dados.violacoes.map((violacao) => (
                <li
                  key={violacao.titulo}
                  className="rounded-xl border border-line bg-surface p-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p
                      className="text-[13px] font-semibold"
                      style={{ color: "var(--score-low)" }}
                    >
                      {violacao.titulo}
                    </p>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums"
                      style={{
                        color: "var(--score-low)",
                        backgroundColor: "var(--low-wash)",
                      }}
                    >
                      −{violacao.peso} pts
                    </span>
                  </div>
                  <p
                    className="mt-2 border-l-2 pl-2.5 text-[12.5px] leading-snug text-ink-2 italic"
                    style={{ borderColor: "var(--low-line)" }}
                  >
                    “{violacao.citacao}”
                  </p>
                  <p className="mt-2 text-[11.5px] leading-snug text-ink-3">
                    {violacao.impacto}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Raio-X do cliente ---------- */}
        <section id="secao-cliente" className="scroll-mt-[136px]">
          <TituloSecao
            icone={UserSearch}
            apoio="o que a call revelou sobre ela"
          >
            Raio-X do cliente
          </TituloSecao>

          <div className="grid gap-3 md:grid-cols-2">
            <article className="rounded-xl border border-line bg-surface p-4">
              <p className="text-[10px] font-bold tracking-[0.1em] text-ink-3 uppercase">
                Dor real
              </p>
              <p className="mt-1.5 text-[13.5px] leading-snug font-medium text-ink">
                {dados.cliente.dorReal}
              </p>
            </article>
            <article className="rounded-xl border border-line bg-surface p-4">
              <p className="text-[10px] font-bold tracking-[0.1em] text-ink-3 uppercase">
                Objeção de fundo
              </p>
              <p className="mt-1.5 text-[13.5px] leading-snug font-medium text-ink">
                {dados.cliente.objecaoFundo}
              </p>
            </article>
          </div>

          <div className="mt-3 rounded-xl border border-dashed border-line bg-surface p-4">
            <p className="text-[10px] font-bold tracking-[0.1em] text-ink-3 uppercase">
              Ficou na mesa
            </p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {dados.cliente.ficouNaMesa.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-[12.5px] leading-snug text-ink-2"
                >
                  <span
                    aria-hidden
                    className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-line"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Condução ---------- */}
        <section id="secao-conducao" className="scroll-mt-[136px]">
          <TituloSecao icone={Ear}>Como você conduziu</TituloSecao>

          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[12.5px] font-medium text-ink">
                Equilíbrio de fala
              </p>
              <p className="text-[11.5px] text-ink-3 tabular-nums">
                {dados.conducao.falaVendedor}% você ·{" "}
                {100 - dados.conducao.falaVendedor}% cliente
              </p>
            </div>
            <div className="mt-2 flex gap-0.5">
              <div
                className="h-2.5 rounded-l-full bg-brand"
                style={{ width: `${dados.conducao.falaVendedor}%` }}
              />
              <div
                className="h-2.5 rounded-r-full"
                style={{
                  width: `${100 - dados.conducao.falaVendedor}%`,
                  backgroundColor: "var(--score-good)",
                }}
              />
            </div>
            <p className="mt-2 text-[11.5px] text-ink-3">
              O ideal fica perto de 40% seu, 60% do cliente.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-surface-2 p-3">
                <p className="text-[12px] font-medium text-ink">Perguntas</p>
                <p className="mt-1 text-[12.5px] text-ink-2">
                  <span className="font-semibold tabular-nums">
                    {dados.conducao.perguntasTotal}
                  </span>{" "}
                  no total ·{" "}
                  <span
                    className="font-semibold tabular-nums"
                    style={{
                      color:
                        dados.conducao.perguntasAbertas === 0
                          ? "var(--score-low)"
                          : "var(--score-good)",
                    }}
                  >
                    {dados.conducao.perguntasAbertas} abertas
                  </span>
                </p>
              </div>
              <div className="rounded-lg bg-surface-2 p-3">
                <p className="text-[12px] font-medium text-ink">Interrupções</p>
                <p className="mt-1 text-[12.5px] text-ink-2">
                  <span className="font-semibold tabular-nums">
                    {dados.conducao.interrupcoes}
                  </span>{" "}
                  — mas também sem espaço para ela falar
                </p>
              </div>
            </div>

            <dl className="mt-3 flex flex-col gap-1.5 text-[12.5px] leading-snug">
              <div className="flex gap-2">
                <dt className="shrink-0 font-medium text-ink">Escuta:</dt>
                <dd className="text-ink-2">{dados.conducao.escuta}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="shrink-0 font-medium text-ink">Clareza:</dt>
                <dd className="text-ink-2">{dados.conducao.clareza}</dd>
              </div>
            </dl>
          </div>

          {/* Fez bem x precisa melhorar */}
          <div className="mt-3 grid items-start gap-3 lg:grid-cols-2">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--good-wash)",
                borderColor: "var(--good-line)",
              }}
            >
              <p
                className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] uppercase"
                style={{ color: "var(--score-good)" }}
              >
                <ThumbsUp size={13} strokeWidth={2} aria-hidden />
                Fez bem
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {dados.fezBem.map((item) => (
                  <li key={item.titulo}>
                    <p className="text-[12.5px] font-semibold text-ink">
                      {item.titulo}
                    </p>
                    <p
                      className="mt-1 border-l-2 pl-2.5 text-[12px] leading-snug text-ink-2 italic"
                      style={{ borderColor: "var(--good-line)" }}
                    >
                      “{item.citacao}”
                    </p>
                    <p className="mt-1 text-[11.5px] text-ink-3">
                      {item.porque}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--mid-wash)",
                borderColor: "var(--mid-line)",
              }}
            >
              <p
                className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.1em] uppercase"
                style={{ color: "#8a5200" }}
              >
                <AlertTriangle size={13} strokeWidth={2} aria-hidden />
                Precisa melhorar
              </p>
              <ul className="mt-3 flex flex-col gap-3.5">
                {dados.melhorar.map((item) => (
                  <li key={item.titulo}>
                    <p className="text-[12.5px] font-semibold text-ink">
                      {item.titulo}
                    </p>
                    <p
                      className="mt-1 border-l-2 pl-2.5 text-[12px] leading-snug text-ink-2 italic"
                      style={{ borderColor: "var(--mid-line)" }}
                    >
                      “{item.citacao}”
                    </p>
                    <p className="mt-1 text-[11.5px] text-ink-3">
                      {item.impacto}
                    </p>
                    <div className="mt-2 flex items-start gap-2 rounded-lg bg-surface p-2.5">
                      <p className="min-w-0 flex-1 text-[12px] leading-snug text-ink-2">
                        <span className="font-semibold text-ink">
                          Em vez disso:{" "}
                        </span>
                        {item.correcao}
                      </p>
                      <BotaoCopiar
                        texto={item.correcao}
                        copiado={copiado === item.correcao}
                        aoCopiar={copiar}
                        rotulo=""
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Replay ---------- */}
        <section id="secao-replay" className="scroll-mt-[136px]">
          <TituloSecao icone={Repeat2} apoio="os momentos para reescrever">
            Replay ideal
          </TituloSecao>

          <ul className="flex flex-col gap-3">
            {dados.replay.map((momento) => (
              <li
                key={momento.gatilho}
                className="rounded-xl border border-line bg-surface p-4"
              >
                <p className="text-[10px] font-bold tracking-[0.1em] text-ink-3 uppercase">
                  {momento.gatilho}
                </p>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div
                    className="rounded-lg border p-3"
                    style={{
                      backgroundColor: "var(--low-wash)",
                      borderColor: "var(--low-line)",
                    }}
                  >
                    <p
                      className="text-[10px] font-bold tracking-[0.08em] uppercase"
                      style={{ color: "var(--score-low)" }}
                    >
                      Você disse
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-snug text-ink-2 italic">
                      “{momento.disse}”
                    </p>
                  </div>

                  <div
                    className="rounded-lg border p-3"
                    style={{
                      backgroundColor: "var(--good-wash)",
                      borderColor: "var(--good-line)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="text-[10px] font-bold tracking-[0.08em] uppercase"
                        style={{ color: "var(--score-good)" }}
                      >
                        Versão ideal
                      </p>
                      <BotaoCopiar
                        texto={momento.ideal}
                        copiado={copiado === momento.ideal}
                        aoCopiar={copiar}
                        rotulo=""
                      />
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-snug font-medium text-ink italic">
                      “{momento.ideal}”
                    </p>
                  </div>
                </div>

                <p className="mt-2.5 text-[11.5px] leading-snug text-ink-3">
                  <span className="font-semibold text-ink-2">
                    Por que funciona:{" "}
                  </span>
                  {momento.porque}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Plano ---------- */}
        <section id="secao-plano" className="scroll-mt-[136px]">
          <TituloSecao
            icone={ArrowRight}
            apoio="as três mudanças que elevam a próxima call"
          >
            Plano para as próximas
          </TituloSecao>

          <ol className="flex flex-col gap-3">
            {dados.plano.map((acao, index) => (
              <li
                key={acao.titulo}
                className="flex gap-3 rounded-xl border border-line bg-surface p-4"
              >
                <span
                  aria-hidden
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-bold text-white"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">
                    {acao.titulo}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-ink-3">
                    {acao.detalhe}
                  </p>
                  <div
                    className="mt-2.5 flex items-start gap-2 rounded-lg border p-3"
                    style={{
                      backgroundColor: "var(--good-wash)",
                      borderColor: "var(--good-line)",
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[9.5px] font-bold tracking-[0.1em] uppercase"
                        style={{ color: "var(--score-good)" }}
                      >
                        Frase pronta
                      </p>
                      <p className="mt-1 text-[12.5px] leading-snug font-medium text-ink italic">
                        “{acao.frase}”
                      </p>
                    </div>
                    <BotaoCopiar
                      texto={acao.frase}
                      copiado={copiado === acao.frase}
                      aoCopiar={copiar}
                      rotulo=""
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-line bg-surface p-4">
            <p className="min-w-0 flex-1 text-[12.5px] text-ink-2">
              Treine a objeção que travou esta call ou já prepare a próxima
              reunião com esse aprendizado.
            </p>
            <Button variante="contorno" tamanho="sm" onClick={aoTreinar}>
              Treinar a objeção
            </Button>
            <Button variante="marca" tamanho="sm" onClick={aoPreparar}>
              Preparar a próxima
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
