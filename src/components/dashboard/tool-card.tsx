import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ToolCard({
  href,
  icon: Icon,
  title,
  description,
  steps,
  cta,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  steps: string[];
  cta: string;
}) {
  return (
    <Card className="group flex flex-col p-5 transition-shadow duration-200 hover:shadow-[var(--shadow-pop)]">
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-[10px] bg-accent-100 text-accent-700"
      >
        <Icon size={17} strokeWidth={1.75} />
      </span>

      <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-5 text-ink-secondary">
        {description}
      </p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {steps.map((step) => (
          <li
            key={step}
            className="flex gap-2 text-[12.5px] leading-5 text-ink-muted"
          >
            <span
              aria-hidden
              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-400"
            />
            {step}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink"
      >
        {cta}
        <ArrowRight
          size={14}
          strokeWidth={2}
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </Card>
  );
}
