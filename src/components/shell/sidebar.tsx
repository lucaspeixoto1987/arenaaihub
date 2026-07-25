"use client";

import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  ChevronLeft,
  Home,
  Radio,
  Settings,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Membro } from "@/lib/data";

type Item = {
  label: string;
  icon: typeof Home;
  /** Só o Hub existe neste projeto; o resto é a plataforma ARENA em volta. */
  ativo?: boolean;
};

const grupos: { titulo?: string; itens: Item[] }[] = [
  {
    itens: [
      { label: "Início", icon: Home },
      { label: "Meu progresso", icon: TrendingUp },
    ],
  },
  {
    titulo: "Aprendizagem",
    itens: [
      { label: "Programas Online", icon: BookOpen },
      { label: "Aulas ao Vivo", icon: Radio },
    ],
  },
  {
    titulo: "Inteligência artificial",
    itens: [{ label: "Ferramentas de IA", icon: Sparkles, ativo: true }],
  },
  {
    titulo: "Comunidade",
    itens: [{ label: "Portal de Membros", icon: UserRound }],
  },
];

export function Sidebar({ membro }: { membro: Membro }) {
  const [fechada, setFechada] = useState(false);

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col bg-chrome text-on-chrome transition-[width] duration-200 lg:flex",
        fechada ? "w-[72px]" : "w-[248px]",
      )}
    >
      <div className="flex h-[68px] items-center gap-2 px-4">
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-brand-vivid text-[15px] font-black text-white"
        >
          A
        </span>
        {!fechada && (
          <span className="min-w-0 leading-none">
            <span className="block text-[17px] font-extrabold tracking-[-0.02em]">
              ARENA
            </span>
            <span className="block text-[9px] font-semibold tracking-[0.18em] text-on-chrome-3 uppercase">
              VENDE-C
            </span>
          </span>
        )}
        <button
          type="button"
          onClick={() => setFechada((v) => !v)}
          aria-label={fechada ? "Expandir menu" : "Recolher menu"}
          className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-md text-on-chrome-3 transition-colors hover:bg-chrome-2 hover:text-on-chrome"
        >
          <ChevronLeft
            size={16}
            strokeWidth={2}
            className={cn("transition-transform", fechada && "rotate-180")}
          />
        </button>
      </div>

      <nav
        className="scroll-thin flex-1 overflow-y-auto px-3 pt-2 pb-4"
        aria-label="Navegação da plataforma"
      >
        {grupos.map((grupo, index) => (
          <div key={grupo.titulo ?? index} className={index > 0 ? "mt-5" : ""}>
            {grupo.titulo && !fechada && (
              <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-[0.12em] text-on-chrome-3 uppercase">
                {grupo.titulo}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {grupo.itens.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-current={item.ativo ? "page" : undefined}
                      aria-disabled={item.ativo ? undefined : true}
                      title={
                        item.ativo
                          ? undefined
                          : "Área da plataforma ARENA — fora deste painel"
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                        item.ativo
                          ? "bg-brand/18 text-on-chrome"
                          : "text-on-chrome-2 hover:bg-chrome-2 hover:text-on-chrome",
                        fechada && "justify-center px-0",
                      )}
                      style={
                        item.ativo
                          ? { backgroundColor: "rgba(226, 18, 106, 0.16)" }
                          : undefined
                      }
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.9}
                        aria-hidden
                        className={cn(
                          "shrink-0",
                          item.ativo ? "text-brand-vivid" : "text-current",
                        )}
                      />
                      {!fechada && (
                        <span className="truncate text-[13.5px] font-medium">
                          {item.label}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-chrome-line p-3">
        <button
          type="button"
          aria-disabled
          title="Área da plataforma ARENA — fora deste painel"
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg bg-chrome-2 py-2.5 text-[12px] font-semibold tracking-[0.08em] text-on-chrome uppercase transition-colors hover:bg-chrome-3",
            fechada && "px-0",
          )}
        >
          <BarChart3 size={15} strokeWidth={2} aria-hidden />
          {!fechada && "SalesDash"}
        </button>

        <div
          className={cn(
            "mt-3 flex items-center gap-2.5",
            fechada && "justify-center",
          )}
        >
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-vivid text-[12px] font-bold text-white"
          >
            LP
          </span>
          {!fechada && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">
                  {membro.nome}
                </span>
                <span className="block truncate text-[11px] text-on-chrome-3">
                  {membro.papel}
                </span>
              </span>
              <button
                type="button"
                aria-label="Configurações"
                aria-disabled
                title="Área da plataforma ARENA — fora deste painel"
                className="grid h-7 w-7 place-items-center rounded-md text-on-chrome-3 transition-colors hover:bg-chrome-2 hover:text-on-chrome"
              >
                <Settings size={15} strokeWidth={1.9} aria-hidden />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
