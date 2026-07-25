import { cn } from "@/lib/cn";

type Tone = "neutral" | "good" | "warning" | "critical" | "accent";

/**
 * Rótulo de estado. A cor nunca é o único canal: o texto (e, quando houver, o
 * ícone) carrega o significado sozinho.
 */
const tones: Record<Tone, string> = {
  neutral: "border-hairline bg-surface-sunken text-ink-secondary",
  good: "border-[#bfe4bf] bg-[#eef7ee] text-[color:var(--status-good-text)]",
  warning: "border-[#f2dfae] bg-[#fdf5e3] text-[#7a5300]",
  critical: "border-[#f0c6c6] bg-[#fbeeee] text-[#8f2222]",
  accent: "border-accent-200 bg-accent-100 text-accent-700",
};

export function Badge({
  tone = "neutral",
  icon,
  children,
  className,
}: {
  tone?: Tone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] leading-none font-medium",
        tones[tone],
        className,
      )}
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      {children}
    </span>
  );
}
