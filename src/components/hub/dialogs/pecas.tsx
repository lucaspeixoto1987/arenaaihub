"use client";

import { Check, Copy, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/** Título de seção: rótulo curto, ícone e uma linha de apoio quando ajuda. */
export function TituloSecao({
  icone: Icone,
  children,
  apoio,
  acao,
}: {
  icone: LucideIcon;
  children: React.ReactNode;
  apoio?: string;
  acao?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icone size={14} strokeWidth={2} aria-hidden className="text-brand" />
      <h3 className="text-[11px] font-bold tracking-[0.1em] text-ink uppercase">
        {children}
      </h3>
      {apoio && <span className="text-[11.5px] text-ink-3">{apoio}</span>}
      {acao && <div className="ml-auto">{acao}</div>}
    </div>
  );
}

export function BotaoCopiar({
  texto,
  copiado,
  aoCopiar,
  rotulo = "Copiar",
  className,
}: {
  texto: string;
  copiado: boolean;
  aoCopiar: (texto: string) => void;
  rotulo?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => aoCopiar(texto)}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 transition-colors hover:border-brand-line hover:text-brand",
        className,
      )}
    >
      {copiado ? (
        <Check size={12} strokeWidth={2.2} aria-hidden />
      ) : (
        <Copy size={12} strokeWidth={1.9} aria-hidden />
      )}
      {copiado ? "Copiado" : rotulo}
    </button>
  );
}

/** Etiqueta de estado: cor sempre acompanhada do rótulo. */
export function Etiqueta({
  cor,
  wash,
  linha,
  children,
}: {
  cor: string;
  wash: string;
  linha: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-[0.04em] uppercase"
      style={{ color: cor, backgroundColor: wash, borderColor: linha }}
    >
      {children}
    </span>
  );
}

/** Guarda o texto longo: a tela abre curta, o detalhe fica a um clique. */
export function LerCompleto({
  children,
  rotulo = "Ler contexto completo",
}: {
  children: string;
  rotulo?: string;
}) {
  return (
    <details className="group mt-3">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-[11.5px] font-medium text-ink-3 transition-colors hover:text-brand">
        <span className="group-open:hidden">{rotulo}</span>
        <span className="hidden group-open:inline">Recolher</span>
      </summary>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">
        {children}
      </p>
    </details>
  );
}
