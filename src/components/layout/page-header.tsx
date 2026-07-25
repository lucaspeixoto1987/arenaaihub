export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="pt-8 pb-7">
      <p className="text-[12px] font-medium tracking-[0.08em] text-ink-muted uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-[32px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[38px]">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-[14px] leading-6 text-ink-secondary">
        {description}
      </p>
    </header>
  );
}
