"use client";

import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/** Divisor de etapa entre os grupos de ferramentas. */
export function EtapaDivisor({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <span className="h-px flex-1 bg-line" />
      <span className="text-[9.5px] font-semibold tracking-[0.14em] whitespace-nowrap text-ink-3 uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/**
 * Cartão de ferramenta.
 *
 * O cartão inteiro abre o popup por meio de um botão que cobre a área (sem
 * aninhar botões), então a prévia interna pode ter seus próprios itens
 * clicáveis para abrir um registro específico.
 */
export function ToolCard({
  icone: Icone,
  titulo,
  descricao,
  aoAbrir,
  compacto,
  children,
}: {
  icone: LucideIcon;
  titulo: string;
  descricao?: string;
  aoAbrir: () => void;
  compacto?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)] transition-all",
        "hover:border-brand-line hover:shadow-[0_6px_20px_-10px_rgba(20,22,26,0.28)]",
        compacto ? "justify-center p-3" : "p-3",
      )}
    >
      <button
        type="button"
        onClick={aoAbrir}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-offset-[-3px]"
      >
        <span className="sr-only">Abrir {titulo}</span>
      </button>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] scale-x-0 bg-brand transition-transform duration-200 group-hover:scale-x-100"
      />

      <div
        className={cn(
          "pointer-events-none relative z-10 flex min-w-0 shrink-0 gap-2.5",
          compacto ? "flex-col items-center text-center" : "items-start",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "grid shrink-0 place-items-center rounded-lg bg-surface-3 text-ink-2 transition-colors group-hover:bg-brand-wash group-hover:text-brand",
            compacto ? "h-9 w-9" : "h-7 w-7",
          )}
        >
          <Icone size={compacto ? 18 : 15} strokeWidth={1.9} />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block font-semibold tracking-[-0.01em] text-ink",
              compacto ? "text-[11.5px] leading-tight" : "text-[13.5px]",
            )}
          >
            {titulo}
          </span>
          {descricao && (
            <span
              className={cn(
                "mt-0.5 block leading-snug text-ink-3",
                compacto ? "text-[10.5px]" : "text-[11.5px]",
              )}
            >
              {descricao}
            </span>
          )}
        </span>

        {!compacto && (
          <ArrowUpRight
            size={14}
            strokeWidth={2}
            aria-hidden
            className="mt-0.5 shrink-0 text-ink-3 opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>

      {children && (
        <div
          className={cn(
            "pointer-events-none relative z-10 mt-2 flex min-h-0 flex-col",
            compacto ? "shrink-0 items-center text-center" : "flex-1",
          )}
        >
          {children}
        </div>
      )}
    </article>
  );
}
