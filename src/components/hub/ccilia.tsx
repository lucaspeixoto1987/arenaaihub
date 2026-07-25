"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, RotateCcw, SendHorizonal, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

export type Mensagem = {
  id: string;
  autor: "cecilia" | "voce" | "sistema" | "contexto";
  texto: string;
  /** Linha de apoio usada nos cartões de contexto vindos das ferramentas. */
  detalhe?: string;
};

const LIMITE_DIARIO = 50;

/** Atalhos do começo da conversa — somem assim que ela engata. */
const SUGESTOES = [
  "Como abrir uma reunião de diagnóstico?",
  "Me ajuda a responder “está caro”",
  "O que revisar antes da call de amanhã?",
  "Escreve um follow-up para quem sumiu",
];

export function CCilia({
  mensagens,
  aoEnviar,
  aoLimpar,
}: {
  mensagens: Mensagem[];
  aoEnviar: (texto: string) => void;
  aoLimpar: () => void;
}) {
  const [texto, setTexto] = useState("");
  const lista = useRef<HTMLDivElement>(null);
  const primeiraRenderizacao = useRef(true);

  const usadas = mensagens.filter((m) => m.autor === "voce").length;

  /* Rola só a lista de mensagens — nunca a página — e não no primeiro render. */
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    const el = lista.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mensagens.length]);

  function enviar() {
    const valor = texto.trim();
    if (!valor) return;
    aoEnviar(valor);
    setTexto("");
  }

  return (
    <section className="flex h-[70dvh] flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)] lg:h-auto lg:min-h-0">
      <header className="flex shrink-0 items-center gap-2.5 border-b border-line bg-brand-wash/60 px-4 py-2.5">
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-[13px] font-bold text-white"
        >
          C
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[13.5px] leading-tight font-semibold text-ink">
            C-CÍLIA
          </h2>
          <p className="text-[11px] leading-tight text-ink-3">
            {usadas} de {LIMITE_DIARIO} mensagens hoje
          </p>
        </div>
        <button
          type="button"
          onClick={aoLimpar}
          aria-label="Começar uma conversa nova"
          title="Começar uma conversa nova"
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-3 transition-colors hover:bg-surface-3 hover:text-ink"
        >
          <RotateCcw size={15} strokeWidth={1.9} aria-hidden />
        </button>
      </header>

      <div
        ref={lista}
        className="scroll-thin min-h-0 flex-1 overflow-y-auto px-4 py-4"
      >
        <ul className="flex flex-col gap-3">
          {mensagens.map((mensagem) => (
            <li key={mensagem.id}>
              {mensagem.autor === "contexto" ? (
                <div className="mx-auto flex max-w-[92%] items-start gap-2.5 rounded-lg border border-brand-line bg-brand-wash px-3 py-2.5">
                  <Sparkles
                    size={14}
                    strokeWidth={1.9}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-brand"
                  />
                  <p className="text-[12px] leading-relaxed text-ink-2">
                    <b className="font-semibold text-ink">{mensagem.texto}</b>
                    {mensagem.detalhe && (
                      <>
                        <br />
                        {mensagem.detalhe}
                      </>
                    )}
                  </p>
                </div>
              ) : mensagem.autor === "sistema" ? (
                <p className="mx-auto max-w-[92%] text-center text-[11px] leading-relaxed text-ink-3">
                  {mensagem.texto}
                </p>
              ) : (
                <div
                  className={cn(
                    "max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                    mensagem.autor === "cecilia"
                      ? "rounded-tl-sm bg-surface-2 text-ink"
                      : "ml-auto rounded-tr-sm bg-brand text-white",
                  )}
                >
                  {mensagem.texto}
                </div>
              )}
            </li>
          ))}
        </ul>

        {usadas === 0 && (
          <div className="mt-4">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-ink-3 uppercase">
              Para começar
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {SUGESTOES.map((sugestao) => (
                <li key={sugestao}>
                  <button
                    type="button"
                    onClick={() => aoEnviar(sugestao)}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-ink-2 transition-colors hover:border-brand-line hover:bg-brand-wash hover:text-brand-strong"
                  >
                    {sugestao}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-line p-3">
        <div className="flex items-end gap-2 rounded-xl border border-line bg-surface-2 p-1.5 focus-within:border-brand-line">
          <label htmlFor="mensagem-ccilia" className="sr-only">
            Escreva para a C-CÍLIA
          </label>
          <textarea
            id="mensagem-ccilia"
            rows={1}
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                enviar();
              }
            }}
            placeholder="Pergunte à C-CÍLIA ou peça ajuda com uma reunião…"
            className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-[13px] text-ink placeholder:text-ink-3 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Falar por voz"
            title="Ditar mensagem"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-ink-2 transition-colors hover:bg-surface-3"
          >
            <Mic size={15} strokeWidth={1.9} aria-hidden />
          </button>
          <button
            type="button"
            onClick={enviar}
            disabled={!texto.trim()}
            aria-label="Enviar mensagem"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-white transition-colors hover:bg-brand-strong disabled:opacity-40"
          >
            <SendHorizonal size={15} strokeWidth={1.9} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
