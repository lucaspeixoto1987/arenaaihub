"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  ClipboardCheck,
  Flame,
  Headphones,
  Quote,
  Shield,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  BotaoCopiar,
  LerCompleto,
  TituloSecao,
} from "@/components/hub/dialogs/pecas";
import { Button } from "@/components/ui/button";
import type { PreparacaoResultado } from "@/lib/data";

const SECOES = [
  { id: "resumo", rotulo: "Resumo" },
  { id: "contexto", rotulo: "Contexto" },
  { id: "roteiro", rotulo: "Roteiro" },
  { id: "frases", rotulo: "Frases" },
  { id: "objecoes", rotulo: "Objeções" },
  { id: "checklist", rotulo: "Checklist" },
];

export function PreparadorResultado({
  dados,
  aoTreinarObjecoes,
  aoAnalisarCall,
}: {
  dados: PreparacaoResultado;
  aoTreinarObjecoes: () => void;
  aoAnalisarCall: () => void;
}) {
  const [copiado, setCopiado] = useState<string | null>(null);
  const [feitos, setFeitos] = useState<number[]>([]);
  const [secaoAtiva, setSecaoAtiva] = useState(SECOES[0].id);
  const corpo = useRef<HTMLDivElement>(null);

  /* Marca no índice em que parte da preparação o vendedor está. */
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
    const alvo = corpo.current?.querySelector(`#secao-${id}`);
    alvo?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const totalPerguntas = dados.roteiro.reduce(
    (total, etapa) => total + etapa.perguntas.length,
    0,
  );

  return (
    <div ref={corpo} className="bg-surface-2">
      {/* Identificação + navegação, sempre à vista */}
      <div className="sticky top-0 z-10 border-b border-line bg-surface/95 px-5 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-wash text-[13px] font-bold text-brand"
          >
            JF
          </span>
          <div className="min-w-0">
            <p className="text-[14.5px] leading-tight font-semibold text-ink">
              {dados.contato}
              <span className="ml-1.5 text-[12px] font-normal text-ink-3">
                {dados.cargo}
              </span>
            </p>
            <p className="flex items-center gap-1.5 text-[12px] text-ink-3">
              <Building2 size={12} strokeWidth={1.9} aria-hidden />
              {dados.empresa}
            </p>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-1.5">
            {dados.produtos.map((produto) => (
              <span
                key={produto}
                className="rounded-full border border-brand-line bg-brand-wash px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.04em] text-brand"
              >
                {produto}
              </span>
            ))}
            <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[10.5px] font-medium text-ink-2">
              {dados.etapa} · {dados.duracaoMin} min
            </span>
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
        {/* ---------- Resumo: as três respostas antes de entrar na call ---------- */}
        <section id="secao-resumo" className="scroll-mt-[136px]">
          <TituloSecao icone={Sparkles} apoio="o que ler dois minutos antes">
            Resumo da reunião
          </TituloSecao>

          <div className="grid gap-3 md:grid-cols-3">
            <article className="flex flex-col rounded-xl border border-brand-line bg-brand-wash p-4">
              <p className="text-[10px] font-bold tracking-[0.1em] text-brand uppercase">
                Dor principal
              </p>
              <p className="mt-2 text-[14px] leading-snug font-semibold text-ink">
                {dados.dor.frase}
              </p>
              <p className="mt-2 text-[11.5px] leading-snug text-ink-2">
                {dados.dor.porque}
              </p>
            </article>

            <article className="flex flex-col rounded-xl border border-line bg-surface p-4">
              <p className="text-[10px] font-bold tracking-[0.1em] text-ink-3 uppercase">
                Seu foco
              </p>
              <p className="mt-2 text-[14px] leading-snug font-semibold text-ink">
                {dados.foco.frase}
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {dados.foco.pontos.map((ponto) => (
                  <li
                    key={ponto}
                    className="flex gap-2 text-[11.5px] leading-snug text-ink-2"
                  >
                    <span
                      aria-hidden
                      className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-brand"
                    />
                    {ponto}
                  </li>
                ))}
              </ul>
            </article>

            <article className="flex flex-col rounded-xl border border-line bg-surface p-4">
              <p className="text-[10px] font-bold tracking-[0.1em] text-ink-3 uppercase">
                Peça isto no fim
              </p>
              <p className="mt-2 text-[14px] leading-snug font-semibold text-ink">
                {dados.proximoPasso}
              </p>
              <p className="mt-auto pt-2 text-[11.5px] text-ink-3">
                Sem data marcada, a reunião não terminou.
              </p>
            </article>
          </div>

          {/* Abertura: a única frase que precisa estar decorada */}
          <div className="mt-3 flex flex-wrap items-start gap-3 rounded-xl border border-line bg-surface p-4">
            <Flame
              size={15}
              strokeWidth={1.9}
              aria-hidden
              className="mt-0.5 shrink-0 text-brand"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold tracking-[0.1em] text-ink-3 uppercase">
                Abra com esta pergunta
              </p>
              <p className="mt-1.5 text-[15px] leading-snug font-medium text-ink italic">
                “{dados.dor.abertura}”
              </p>
            </div>
            <BotaoCopiar
              texto={dados.dor.abertura}
              copiado={copiado === dados.dor.abertura}
              aoCopiar={copiar}
            />
          </div>
        </section>

        {/* ---------- Contexto ---------- */}
        <section id="secao-contexto" className="scroll-mt-[136px]">
          <TituloSecao icone={Building2}>Contexto da conta</TituloSecao>
          <div className="rounded-xl border border-line bg-surface p-4">
            <ul className="grid gap-2 sm:grid-cols-2">
              {dados.contexto.pontos.map((ponto) => (
                <li
                  key={ponto}
                  className="flex gap-2 text-[12.5px] leading-snug text-ink-2"
                >
                  <span
                    aria-hidden
                    className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-line"
                  />
                  {ponto}
                </li>
              ))}
            </ul>
            <LerCompleto>{dados.contexto.completo}</LerCompleto>
          </div>
        </section>

        {/* ---------- Roteiro ---------- */}
        <section id="secao-roteiro" className="scroll-mt-[136px]">
          <TituloSecao
            icone={Target}
            apoio={`${dados.duracaoMin} min · ${totalPerguntas} perguntas`}
          >
            Roteiro da conversa
          </TituloSecao>

          <ol className="flex flex-col">
            {dados.roteiro.map((etapa, index) => (
              <li key={etapa.id} className="flex gap-3">
                {/* Trilho da linha do tempo */}
                <div className="flex w-12 shrink-0 flex-col items-center">
                  <span className="flex h-7 w-12 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white tabular-nums">
                    {etapa.minutos}′
                  </span>
                  {index < dados.roteiro.length - 1 && (
                    <span aria-hidden className="w-px flex-1 bg-brand-line" />
                  )}
                </div>

                <div
                  className={cn(
                    "min-w-0 flex-1",
                    index < dados.roteiro.length - 1 && "pb-3",
                  )}
                >
                  <div className="rounded-xl border border-line bg-surface p-4">
                    <p className="text-[13.5px] font-semibold text-ink">
                      {etapa.titulo}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-ink-3">
                      {etapa.objetivo}
                    </p>

                    <ul className="mt-3 flex flex-col gap-2.5">
                      {etapa.perguntas.map((item) => (
                        <li
                          key={item.pergunta}
                          className="flex items-start gap-2.5 rounded-lg bg-surface-2 p-2.5"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] leading-snug font-medium text-ink">
                              {item.pergunta}
                            </p>
                            <p className="mt-1 text-[11.5px] leading-snug text-ink-3">
                              {item.revela}
                            </p>
                          </div>
                          <BotaoCopiar
                            texto={item.pergunta}
                            copiado={copiado === item.pergunta}
                            aoCopiar={copiar}
                            rotulo=""
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Frases ---------- */}
        <section id="secao-frases" className="scroll-mt-[136px]">
          <TituloSecao icone={Quote} apoio="use com as suas palavras">
            Frases fortes
          </TituloSecao>

          <div className="grid gap-3 md:grid-cols-2">
            {dados.frases.map((item) => (
              <article
                key={item.frase}
                className="flex flex-col rounded-xl border border-line bg-surface p-4"
              >
                <Quote
                  size={16}
                  strokeWidth={2}
                  aria-hidden
                  className="text-brand-line"
                />
                <p className="mt-2 text-[13.5px] leading-snug font-medium text-ink">
                  {item.frase}
                </p>
                <p className="mt-2 text-[11.5px] leading-snug text-ink-3">
                  {item.porque}
                </p>
                <div className="mt-3">
                  <BotaoCopiar
                    texto={item.frase}
                    copiado={copiado === item.frase}
                    aoCopiar={copiar}
                    rotulo="Copiar frase"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Objeções ---------- */}
        <section id="secao-objecoes" className="scroll-mt-[136px]">
          <TituloSecao
            icone={Shield}
            apoio={`${dados.objecoes.length} prováveis`}
            acao={
              <button
                type="button"
                onClick={aoTreinarObjecoes}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-wash px-3 py-1 text-[11.5px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                <Timer size={12} strokeWidth={2} aria-hidden />
                Treinar agora
              </button>
            }
          >
            Já se prepara
          </TituloSecao>

          <div className="grid gap-3 md:grid-cols-3">
            {dados.objecoes.map((objecao) => (
              <article
                key={objecao.id}
                className="flex flex-col rounded-xl border border-line bg-surface p-4"
              >
                <p className="text-[13px] leading-snug font-medium text-ink">
                  “{objecao.fala}”
                </p>
                <p className="mt-2 text-[11.5px] leading-snug text-ink-3">
                  {objecao.porque}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Checklist ---------- */}
        <section id="secao-checklist" className="scroll-mt-[136px]">
          <TituloSecao
            icone={ClipboardCheck}
            apoio={`${feitos.length} de ${dados.checklist.length}`}
          >
            Não pode esquecer
          </TituloSecao>

          <ul className="flex flex-col gap-1.5">
            {dados.checklist.map((item, index) => {
              const feito = feitos.includes(index);
              return (
                <li key={item}>
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl border bg-surface p-3 transition-colors",
                      feito
                        ? "border-brand-line bg-brand-wash/50"
                        : "border-line",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={feito}
                      onChange={() =>
                        setFeitos((atuais) =>
                          atuais.includes(index)
                            ? atuais.filter((i) => i !== index)
                            : [...atuais, index],
                        )
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand)]"
                    />
                    <span
                      className={cn(
                        "text-[12.5px] leading-snug",
                        feito ? "text-ink-3 line-through" : "text-ink-2",
                      )}
                    >
                      {item}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Depois da reunião */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-line bg-surface p-4">
          <Headphones
            size={15}
            strokeWidth={1.9}
            aria-hidden
            className="text-ink-3"
          />
          <p className="text-[12.5px] text-ink-2">
            Já fez essa reunião? A análise da call usa esta preparação como
            referência.
          </p>
          <Button
            variante="contorno"
            tamanho="sm"
            className="ml-auto"
            onClick={aoAnalisarCall}
          >
            Analisar esta call
          </Button>
        </div>
      </div>
    </div>
  );
}
