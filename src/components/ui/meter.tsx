import { cn } from "@/lib/cn";

/**
 * Medidor de razão contra um limite. O trilho é um passo mais claro da mesma
 * rampa do preenchimento, para o estado ser legível na barra inteira.
 */
export function Meter({
  value,
  label,
  className,
}: {
  /** 0–100 */
  value: number;
  label: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full", className)}
      style={{ backgroundColor: "var(--accent-100)" }}
      role="meter"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{
          width: `${clamped}%`,
          backgroundColor: "var(--accent-500)",
        }}
      />
    </div>
  );
}
