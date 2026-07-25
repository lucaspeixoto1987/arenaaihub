import { ClipboardList, Dumbbell, Waypoints } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatTile } from "@/components/dashboard/stat-tile";
import { ToolCard } from "@/components/dashboard/tool-card";
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings";
import { RecentReviews } from "@/components/dashboard/recent-reviews";
import { TrainingPanel } from "@/components/dashboard/training-panel";
import { PipelineFunnel } from "@/components/charts/pipeline-funnel";
import {
  getDrills,
  getFunnel,
  getKpis,
  getMeetings,
  getReviews,
  getSeller,
} from "@/lib/data";
import { formatCurrency, formatDateLong } from "@/lib/format";

/** A saudação e a data são do momento da visita. */
export const dynamic = "force-dynamic";

function greeting(hour: number) {
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

const tools = [
  {
    href: "/preparacao",
    icon: ClipboardList,
    title: "Preparação de reunião",
    description:
      "Pesquise o lead e entre na chamada com hipótese de dor, perguntas e plano de condução.",
    steps: [
      "Contexto da empresa, do contato e do momento",
      "Perguntas de diagnóstico na ordem certa",
      "Riscos e objeções prováveis do cenário",
    ],
    cta: "Preparar uma reunião",
  },
  {
    href: "/pos-venda",
    icon: Waypoints,
    title: "Análise pós-venda",
    description:
      "Cole a transcrição da chamada e receba a leitura do que funcionou e do próximo passo.",
    steps: [
      "Momentos-chave e sinais de compra que passaram",
      "Objeções tratadas e as que ficaram abertas",
      "Próximo passo sugerido com follow-up pronto",
    ],
    cta: "Analisar uma chamada",
  },
  {
    href: "/treino",
    icon: Dumbbell,
    title: "Sala de treino",
    description:
      "Simule objeções e cenários difíceis antes de encarar o cliente real.",
    steps: [
      "Objeções de preço, concorrente e urgência",
      "Cenários por perfil de decisor e etapa",
      "Feedback rodada a rodada, com evolução medida",
    ],
    cta: "Começar um treino",
  },
];

export default function DashboardPage() {
  const seller = getSeller();
  const kpis = getKpis();
  const meetings = getMeetings();
  const funnel = getFunnel();
  const reviews = getReviews();
  const drills = getDrills();

  const now = new Date();
  const today = meetings.filter((meeting) => meeting.day === "hoje");
  const unprepared = today.filter((meeting) => meeting.prep !== "pronto");
  const atStake = today.reduce(
    (total, meeting) => total + meeting.dealValue,
    0,
  );
  const firstName = seller.name.split(" ")[0];

  return (
    <div className="mx-auto w-full max-w-[1360px]">
      <header className="pt-8 pb-7">
        <p className="text-[12.5px] text-ink-muted first-letter:uppercase">
          {formatDateLong(now)}
        </p>
        <h1 className="mt-1.5 font-display text-[34px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[40px]">
          {greeting(now.getHours())}, {firstName}.
        </h1>
        <p className="mt-2 max-w-xl text-[14px] leading-6 text-ink-secondary">
          {today.length} reuniões hoje, {unprepared.length} ainda sem preparação
          completa, {formatCurrency(atStake)} em jogo. Comece pela que abre em
          seguida.
        </p>
      </header>

      <section aria-labelledby="indicadores">
        <h2 id="indicadores" className="sr-only">
          Indicadores
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <StatTile key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </section>

      <section aria-labelledby="ferramentas" className="mt-10">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2
            id="ferramentas"
            className="text-[15px] font-semibold tracking-[-0.01em] text-ink"
          >
            Suas ferramentas
          </h2>
          <p className="hidden text-[12.5px] text-ink-muted sm:block">
            Antes, durante e depois da reunião
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          <UpcomingMeetings meetings={meetings} />
          <RecentReviews reviews={reviews} />
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <PipelineFunnel stages={funnel} />
          </Card>

          <TrainingPanel drills={drills} />
        </div>
      </section>
    </div>
  );
}
