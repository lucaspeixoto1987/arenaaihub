import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import type { CallReview } from "@/lib/data";

/** O rótulo carrega o significado; a cor apenas reforça. */
function scoreTone(score: number): {
  tone: "good" | "warning" | "critical";
  text: string;
} {
  if (score >= 80) return { tone: "good", text: "forte" };
  if (score >= 65) return { tone: "warning", text: "atenção" };
  return { tone: "critical", text: "revisar" };
}

export function RecentReviews({ reviews }: { reviews: CallReview[] }) {
  return (
    <Card>
      <CardHeader
        title="Últimas análises"
        description="Leitura das chamadas que você já transcreveu."
        action={
          <Link
            href="/pos-venda"
            className={buttonClasses("ghost", "sm", "-mr-1")}
          >
            Abrir
          </Link>
        }
      />

      <ul className="divide-y divide-hairline border-t border-hairline">
        {reviews.map((review) => {
          const score = scoreTone(review.score);
          return (
            <li key={review.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-ink">
                    {review.company}
                  </p>
                  <p className="text-[12px] text-ink-muted">
                    {review.contact} · {review.when}
                  </p>
                </div>
                <Badge tone={score.tone} className="shrink-0 tabular-nums">
                  {review.score} · {score.text}
                </Badge>
              </div>

              <p className="mt-2 text-[12.5px] leading-5 text-ink-secondary">
                {review.headline}
              </p>

              {review.risk ? (
                <p className="mt-1.5 flex gap-1.5 text-[12px] leading-5 text-ink-muted">
                  <AlertTriangle
                    size={13}
                    strokeWidth={1.75}
                    aria-hidden
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--status-serious)" }}
                  />
                  {review.risk}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
