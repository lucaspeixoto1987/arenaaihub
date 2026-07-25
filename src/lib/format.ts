/** Formatação pt-BR usada em todo o painel. */

export function formatCurrency(value: number, compact = false) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);
}

export function formatNumber(value: number, compact = false) {
  return new Intl.NumberFormat("pt-BR", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number, fractionDigits = 0) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
}

/**
 * Formata pelo tipo do indicador. Recebe o tipo (e não uma função) para poder
 * cruzar a fronteira entre Server e Client Components.
 */
export function formatByKind(
  kind: "currency" | "number" | "percent",
  value: number,
) {
  if (kind === "currency") return formatCurrency(value, true);
  if (kind === "percent") return formatPercent(value);
  return formatNumber(value);
}

/** "+12,4%" / "−3,0%" — o sinal faz parte da leitura, não só a cor. */
export function formatDelta(value: number) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(value))}%`;
}

export function formatDateLong(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
