"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  Dumbbell,
  LayoutDashboard,
  Waypoints,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";
import type { Seller } from "@/lib/data";

const nav = [
  {
    href: "/",
    label: "Painel",
    hint: "Visão do dia",
    icon: LayoutDashboard,
  },
  {
    href: "/preparacao",
    label: "Preparação",
    hint: "Antes da reunião",
    icon: ClipboardList,
  },
  {
    href: "/pos-venda",
    label: "Análise pós-venda",
    hint: "Depois da chamada",
    icon: Waypoints,
  },
  {
    href: "/treino",
    label: "Sala de treino",
    hint: "Objeções e cenários",
    icon: Dumbbell,
  },
];

export function Sidebar({ seller }: { seller: Seller }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[264px] shrink-0 flex-col border-r border-hairline bg-paper px-4 py-5 lg:flex">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2.5 px-2 py-1"
        aria-label="Arena — início"
      >
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-[10px] bg-ink text-[13px] font-semibold text-paper"
        >
          A
        </span>
        <span className="font-display text-[22px] leading-none tracking-[-0.01em] text-ink">
          Arena
        </span>
      </Link>

      <nav className="flex flex-col gap-1" aria-label="Navegação principal">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-[10px] px-3 py-2.5 transition-colors duration-150",
                active
                  ? "bg-surface-raised shadow-[var(--shadow-card)] ring-1 ring-hairline"
                  : "hover:bg-[#efede7]",
              )}
            >
              <Icon
                size={17}
                strokeWidth={1.75}
                aria-hidden
                className={cn(
                  "shrink-0",
                  active ? "text-accent-600" : "text-ink-muted",
                )}
              />
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-[13.5px] leading-tight font-medium",
                    active ? "text-ink" : "text-ink-secondary",
                  )}
                >
                  {item.label}
                </span>
                <span className="block text-[11.5px] leading-tight text-ink-muted">
                  {item.hint}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="rounded-[12px] border border-hairline bg-surface p-3">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-100 text-[12.5px] font-semibold text-accent-700"
            >
              {initials(seller.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ink">
                {seller.name}
              </p>
              <p className="truncate text-[11.5px] text-ink-muted">
                {seller.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
