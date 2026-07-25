import { Hammer } from "lucide-react";

/**
 * Aviso de etapa: a tela e o formato já existem, o motor que a alimenta é o
 * próximo passo do projeto.
 */
export function BuildNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-dashed border-line bg-surface-2 px-3 py-2.5 text-[11.5px] leading-snug text-ink-2">
      <Hammer
        size={13}
        strokeWidth={1.9}
        aria-hidden
        className="mt-0.5 shrink-0 text-ink-3"
      />
      {children}
    </p>
  );
}
