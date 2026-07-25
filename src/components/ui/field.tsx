import { cn } from "@/lib/cn";

const control =
  "w-full rounded-[10px] border border-hairline bg-surface-raised px-3.5 text-[13.5px] text-ink placeholder:text-ink-muted focus:border-hairline-strong focus:outline-none";

export function Field({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[12.5px] font-medium text-ink-secondary"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-[11.5px] text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, "h-10", className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(control, "resize-y py-2.5 leading-6", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, "h-10 pr-9", className)} {...props} />;
}
