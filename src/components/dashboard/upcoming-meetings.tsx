import Link from "next/link";
import {
  CheckCircle2,
  CircleDashed,
  CircleSlash,
  Lightbulb,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import type { Meeting, PrepStatus } from "@/lib/data";

const prepLabel: Record<
  PrepStatus,
  { text: string; tone: "good" | "warning" | "neutral"; icon: React.ReactNode }
> = {
  pronto: {
    text: "Preparada",
    tone: "good",
    icon: <CheckCircle2 size={13} strokeWidth={2} />,
  },
  parcial: {
    text: "Parcial",
    tone: "warning",
    icon: <CircleDashed size={13} strokeWidth={2} />,
  },
  pendente: {
    text: "Sem preparação",
    tone: "neutral",
    icon: <CircleSlash size={13} strokeWidth={2} />,
  },
};

export function UpcomingMeetings({ meetings }: { meetings: Meeting[] }) {
  return (
    <Card>
      <CardHeader
        title="Próximas reuniões"
        description="Prepare antes de entrar na chamada — o contexto vai junto."
        action={
          <Link
            href="/preparacao"
            className={buttonClasses("ghost", "sm", "-mr-1")}
          >
            Ver agenda
          </Link>
        }
      />

      <ul className="divide-y divide-hairline border-t border-hairline">
        {meetings.map((meeting) => {
          const prep = prepLabel[meeting.prep];
          return (
            <li
              key={meeting.id}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-surface-sunken/60 sm:flex-row sm:items-center sm:gap-5"
            >
              <div className="flex w-full shrink-0 items-baseline gap-2 sm:w-28 sm:flex-col sm:gap-0.5">
                <span className="text-[15px] font-semibold tabular-nums text-ink">
                  {meeting.time}
                </span>
                <span className="text-[11.5px] whitespace-nowrap text-ink-muted">
                  {meeting.day} · {meeting.durationMin} min
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="text-[14px] font-medium text-ink">
                    {meeting.company}
                  </p>
                  <span aria-hidden className="text-ink-muted">
                    ·
                  </span>
                  <p className="text-[13px] text-ink-secondary">
                    {meeting.contact}, {meeting.contactRole}
                  </p>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Badge tone="accent">{meeting.stage}</Badge>
                  <span className="text-[12.5px] tabular-nums text-ink-muted">
                    {formatCurrency(meeting.dealValue)}
                  </span>
                  <Badge tone={prep.tone} icon={prep.icon}>
                    {prep.text}
                  </Badge>
                </div>

                {meeting.signal ? (
                  <p className="mt-2 flex gap-2 text-[12.5px] leading-5 text-ink-secondary">
                    <Lightbulb
                      size={14}
                      strokeWidth={1.75}
                      aria-hidden
                      className="mt-0.5 shrink-0 text-accent-600"
                    />
                    {meeting.signal}
                  </p>
                ) : null}
              </div>

              <Link
                href={`/preparacao?lead=${encodeURIComponent(meeting.company)}`}
                className={buttonClasses(
                  meeting.prep === "pendente" ? "primary" : "secondary",
                  "sm",
                  "shrink-0 self-start sm:self-center",
                )}
              >
                {meeting.prep === "pendente" ? "Preparar" : "Revisar"}
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
