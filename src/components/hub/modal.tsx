"use client";

import { useEffect, useRef } from "react";
import { X, type LucideIcon } from "lucide-react";
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
  children,
}: {
  aberto: boolean;
  aoFechar: () => void;
  icone: LucideIcon;
  titulo: string;
  descricao?: string;
  largura?: "media" | "grande";
  rodape?: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (aberto && !el.open) el.showModal();
    if (!aberto && el.open) el.close();
  }, [aberto]);

  return (
    <dialog
      ref={ref}
      onClose={aoFechar}
      className={cn(
        "m-auto w-[calc(100vw-2rem)] rounded-2xl bg-surface p-0 text-ink shadow-[var(--shadow-pop)] backdrop:bg-black/55",
        "max-h-[92dvh] open:flex open:flex-col",
        largura === "grande" ? "max-w-5xl" : "max-w-2xl",
      )}
    >
      <header className="flex shrink-0 items-start gap-3 border-b border-line px-5 py-4">
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-wash text-brand"
        >
          <Icone size={16} strokeWidth={1.9} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] leading-tight font-semibold tracking-[-0.01em]">
            {titulo}
          </h2>
          {descricao && (
            <p className="mt-0.5 text-[12.5px] leading-snug text-ink-3">
              {descricao}
            </p>
          )}
        </div>
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
