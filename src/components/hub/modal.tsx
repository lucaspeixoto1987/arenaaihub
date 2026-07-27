"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Diálogo das ferramentas. Usa <dialog> nativo: já traz foco preso, Esc e
 * fundo inerte sem biblioteca.
 */
export function Modal({
  aberto,
  aoFechar,
  icone: Icone,
  titulo,
  descricao,
  largura = "grande",
  rodape,
  aoVoltar,
  acoes,
  children,
}: {
  aberto: boolean;
  aoFechar: () => void;
  icone: LucideIcon;
  titulo: string;
  descricao?: string;
  largura?: "media" | "grande";
  rodape?: React.ReactNode;
  /** Quando existe, mostra a seta de voltar à esquerda do título. */
  aoVoltar?: () => void;
  /** Ações à direita do cabeçalho, antes do fechar. */
  acoes?: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  /* Fechamento vindo do próprio app (ex.: uma ferramenta abrindo outra) não
     deve disparar `aoFechar`, senão ele desfaz a abertura seguinte. */
  const fechamentoInterno = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (aberto && !el.open) el.showModal();
    if (!aberto && el.open) {
      fechamentoInterno.current = true;
      el.close();
    }
  }, [aberto]);

  return (
    <dialog
      ref={ref}
      onClose={() => {
        if (fechamentoInterno.current) {
          fechamentoInterno.current = false;
          return;
        }
        aoFechar();
      }}
      className={cn(
        "m-auto w-[calc(100vw-2rem)] rounded-2xl bg-surface p-0 text-ink shadow-[var(--shadow-pop)] backdrop:bg-black/55",
        "max-h-[92dvh] open:flex open:flex-col",
        largura === "grande" ? "max-w-5xl" : "max-w-2xl",
      )}
    >
      <header className="flex shrink-0 items-center gap-2.5 border-b border-line px-4 py-3 sm:gap-3 sm:px-5 sm:py-4">
        {aoVoltar && (
          <button
            type="button"
            onClick={aoVoltar}
            aria-label="Voltar"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-surface-3 hover:text-ink"
          >
            <ArrowLeft size={16} strokeWidth={1.9} aria-hidden />
          </button>
        )}
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-wash text-brand"
        >
          <Icone size={16} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[14px] leading-tight font-semibold tracking-[-0.01em] sm:text-[15px]">
            {titulo}
          </h2>
          {descricao && (
            <p className="mt-0.5 truncate text-[12px] leading-snug text-ink-3 sm:text-[12.5px]">
              {descricao}
            </p>
          )}
        </div>
        {acoes}
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-3 transition-colors hover:bg-surface-3 hover:text-ink"
        >
          <X size={17} strokeWidth={1.9} aria-hidden />
        </button>
      </header>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
        {children}
      </div>

      {rodape && (
        <footer className="flex shrink-0 flex-wrap items-center gap-3 border-t border-line bg-surface-2 px-5 py-3.5">
          {rodape}
        </footer>
      )}
    </dialog>
  );
}
