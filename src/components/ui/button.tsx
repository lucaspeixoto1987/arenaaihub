import { cn } from "@/lib/cn";

type Variante = "marca" | "solida" | "contorno" | "fantasma";
type Tamanho = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-45";

const variantes: Record<Variante, string> = {
  marca: "bg-brand text-white hover:bg-brand-strong",
  solida: "bg-ink text-white hover:bg-[#2a2e33]",
  contorno: "border border-line bg-surface text-ink hover:bg-surface-2",
  fantasma: "text-ink-2 hover:bg-surface-3 hover:text-ink",
};

const tamanhos: Record<Tamanho, string> = {
  sm: "h-8 px-3 text-[12.5px]",
  md: "h-10 px-4 text-[13.5px]",
};

export function botaoClasses(
  variante: Variante = "contorno",
  tamanho: Tamanho = "md",
  className?: string,
) {
  return cn(base, variantes[variante], tamanhos[tamanho], className);
}

export function Button({
  variante = "contorno",
  tamanho = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante;
  tamanho?: Tamanho;
}) {
  return (
    <button className={botaoClasses(variante, tamanho, className)} {...props} />
  );
}
