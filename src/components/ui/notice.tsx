import { Hammer } from "lucide-react";

/**
 * Aviso honesto de etapa: a interface já existe, o motor que a alimenta é o
 * próximo passo do projeto.
 */
export function BuildNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-[10px] border border-dashed border-hairline-strong bg-surface-sunken px-3.5 py-3 text-[12.5px] leading-5 text-ink-secondary">
      <Hammer
        size={14}
        strokeWidth={1.75}
        aria-hidden
        className="mt-0.5 shrink-0 text-ink-muted"
      />
      {children}
    </p>
  );
}
