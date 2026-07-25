import { Sidebar } from "@/components/shell/sidebar";
import { getMembro } from "@/lib/data";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-chrome">
      <Sidebar membro={getMembro()} />

      {/* Cabeçalho compacto no lugar do menu em telas pequenas */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-2 bg-chrome px-4 text-on-chrome lg:hidden">
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-[8px] bg-brand-vivid text-[13px] font-black text-white"
          >
            A
          </span>
          <span className="text-[15px] font-extrabold tracking-[-0.02em]">
            ARENA
          </span>
          <span className="ml-auto text-[10px] font-semibold tracking-[0.16em] text-on-chrome-3 uppercase">
            AI Hub
          </span>
        </div>

        <main className="min-h-0 flex-1 overflow-hidden bg-workspace">
          {children}
        </main>
      </div>
    </div>
  );
}
