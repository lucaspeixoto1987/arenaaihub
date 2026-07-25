"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  ClipboardList,
  Dumbbell,
  LayoutDashboard,
  Waypoints,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/button";

const mobileNav = [
  { href: "/", label: "Painel", icon: LayoutDashboard },
  { href: "/preparacao", label: "Preparação", icon: ClipboardList },
  { href: "/pos-venda", label: "Pós-venda", icon: Waypoints },
  { href: "/treino", label: "Treino", icon: Dumbbell },
];

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();

  function onSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = String(form.get("lead") ?? "").trim();
    router.push(
      query ? `/preparacao?lead=${encodeURIComponent(query)}` : "/preparacao",
    );
  }

  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 lg:hidden"
          aria-label="Arena — início"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-[10px] bg-ink text-[13px] font-semibold text-paper"
          >
            A
          </span>
        </Link>

        <form onSubmit={onSearch} className="hidden min-w-0 flex-1 sm:block">
          <label htmlFor="lead-search" className="sr-only">
            Pesquisar lead ou empresa
          </label>
          <div className="relative max-w-sm">
            <Search
              size={15}
              strokeWidth={1.75}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-muted"
            />
            <input
              id="lead-search"
              name="lead"
              type="search"
              autoComplete="off"
              placeholder="Pesquisar lead, empresa ou domínio"
              className="h-10 w-full rounded-full border border-hairline bg-surface pr-4 pl-9 text-[13.5px] text-ink placeholder:text-ink-muted focus:border-hairline-strong focus:outline-none"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/pos-venda"
            className={buttonClasses(
              "secondary",
              "sm",
              "hidden sm:inline-flex",
            )}
          >
            Analisar chamada
          </Link>
          <Link href="/preparacao" className={buttonClasses("primary", "sm")}>
            Preparar reunião
          </Link>
        </div>
      </div>

      <nav
        aria-label="Navegação principal"
        className="flex gap-1 overflow-x-auto px-4 pb-2.5 lg:hidden"
      >
        {mobileNav.map((item) => {
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
                "inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                active
                  ? "bg-surface-raised text-ink ring-1 ring-hairline"
                  : "text-ink-secondary hover:bg-surface-sunken",
              )}
            >
              <Icon
                size={15}
                strokeWidth={1.75}
                aria-hidden
                className={active ? "text-accent-600" : "text-ink-muted"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
