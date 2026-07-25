import { cn } from "@/lib/cn";

const controle =
  "w-full rounded-lg border border-line bg-surface px-3 text-[13px] text-ink placeholder:text-ink-3 focus:border-brand-line focus:outline-none";

export function Field({
  label,
  htmlFor,
  obrigatorio,
  dica,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  obrigatorio?: boolean;
  dica?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[12px] font-medium text-ink-2">
        {label}
        {obrigatorio && (
          <span className="ml-0.5 text-brand" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {dica && <p className="text-[11px] leading-snug text-ink-3">{dica}</p>}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controle, "h-9", className)} {...props} />;
}

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(controle, "h-9 pr-8", className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(controle, "resize-y py-2 leading-relaxed", className)}
      {...props}
    />
  );
}
