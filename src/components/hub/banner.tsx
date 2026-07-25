"use client";

import { ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/cn";

export type Segmento = "vendedor" | "lider";

export function Banner({
  segmento,
  aoTrocarSegmento,
  aoAbrirFicha,
  fichaCompleta,
}: {
  segmento: Segmento;
  aoTrocarSegmento: (valor: Segmento) => void;
  aoAbrirFicha: () => void;
  fichaCompleta: number;
}) {
  return (
    <section className="relative shrink-0 overflow-hidden rounded-xl bg-chrome px-4 py-5 sm:py-6">
      {/* Brilho discreto atrás da marca — o preto continua sendo o assunto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--brand-vivid)" }}
      />

      <div className="relative flex flex-col items-center gap-4 lg:block">
        <div className="text-center">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-on-chrome-3 uppercase">
            Ferramentas de IA exclusivas
          </p>
          <p className="mt-1.5 flex items-center justify-center gap-2.5">
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-[9px] bg-brand-vivid text-[15px] font-black text-white"
            >
              V
            </span>
            <span className="text-[26px] leading-none font-extrabold tracking-[-0.02em] text-on-chrome sm:text-[30px]">
              VENDE-C{" "}
              <span style={{ color: "var(--brand-vivid)" }}>AI HUB</span>
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 lg:absolute lg:top-0 lg:right-0 lg:items-end">
          <button
            type="button"
            onClick={aoAbrirFicha}
            className="inline-flex items-center gap-1.5 rounded-md border border-chrome-line bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-on-chrome-2 transition-colors hover:bg-white/10 hover:text-on-chrome"
          >
            <ClipboardCheck size={13} strokeWidth={1.9} aria-hidden />
            Ficha do Negócio
            <span className="rounded-full bg-white/10 px-1.5 py-px text-[10px] font-semibold text-on-chrome">
              {fichaCompleta}%
            </span>
          </button>

          <div
            className="relative inline-flex h-7 rounded-full border border-chrome-line bg-white/5 p-0.5"
            role="tablist"
            aria-label="Visão do painel"
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-white transition-transform duration-200",
                segmento === "lider" ? "translate-x-full" : "translate-x-0",
              )}
            />
            {(["vendedor", "lider"] as const).map((valor) => (
              <button
                key={valor}
                type="button"
                role="tab"
                aria-selected={segmento === valor}
                onClick={() => aoTrocarSegmento(valor)}
                className={cn(
                  "relative z-10 w-[76px] text-[9.5px] font-bold tracking-[0.08em] uppercase transition-colors",
                  segmento === valor
                    ? "text-chrome"
                    : "text-on-chrome-3 hover:text-on-chrome",
                )}
              >
                {valor === "vendedor" ? "Vendedor" : "Líder"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
