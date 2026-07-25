import type { Metadata } from "next";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BuildNotice } from "@/components/ui/notice";
import { PageHeader } from "@/components/layout/page-header";
import { TrainingPanel } from "@/components/dashboard/training-panel";
import { getDrills } from "@/lib/data";

export const metadata: Metadata = { title: "Sala de treino" };

const scenarios = [
  {
    id: "preco",
    title: "Objeção de preço",
    quote: "“Está bem acima do que planejamos investir este ano.”",
    level: "Intermediário",
    persona: "Diretora financeira, decisão por comitê",
  },
  {
    id: "incumbente",
    title: "Concorrente incumbente",
    quote: "“Já usamos outra ferramenta há três anos e funciona.”",
    level: "Difícil",
    persona: "Head de operações, contrato vigente",
  },
  {
    id: "urgencia",
    title: "Sem urgência",
    quote: "“Faz sentido, mas vamos retomar no próximo trimestre.”",
    level: "Intermediário",
    persona: "Gerente com prioridades concorrentes",
  },
  {
    id: "gatekeeper",
    title: "Acesso ao decisor",
    quote: "“Eu levo internamente e te dou um retorno.”",
    level: "Fácil",
    persona: "Analista sem poder de assinatura",
  },
  {
    id: "desconto",
    title: "Pressão por desconto",
    quote: "“Se cobrir a proposta do concorrente, a gente fecha hoje.”",
    level: "Difícil",
    persona: "Comprador experiente, fim de trimestre",
  },
  {
    id: "escopo",
    title: "Dúvida de implantação",
    quote: "“Meu time não tem gente para tocar mais um projeto agora.”",
    level: "Intermediário",
    persona: "Gerente de TI, equipe enxuta",
  },
];

export default function TreinoPage() {
  const drills = getDrills();

  return (
    <div className="mx-auto w-full max-w-[1360px]">
      <PageHeader
        eyebrow="Entre uma reunião e outra"
        title="Sala de treino"
        description="Escolha uma objeção ou um cenário e treine a resposta em voz alta antes de encarar o cliente de verdade. Cada rodada devolve o que segurou e o que soou frágil."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {scenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className="flex flex-col p-5 transition-shadow duration-200 hover:shadow-[var(--shadow-pop)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
                    {scenario.title}
                  </h2>
                  <Badge tone="neutral" className="shrink-0">
                    {scenario.level}
                  </Badge>
                </div>

                <p className="mt-3 font-display text-[17px] leading-[1.4] text-ink-secondary">
                  {scenario.quote}
                </p>

                <p className="mt-3 text-[12px] text-ink-muted">
                  {scenario.persona}
                </p>

                <div className="mt-auto pt-5">
                  <Button variant="secondary" size="sm" disabled>
                    Iniciar simulação
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <BuildNotice>
            Os cenários e a mecânica de rodadas já estão desenhados. O simulador
            que conversa de volta entra na próxima etapa do projeto.
          </BuildNotice>
        </div>

        <div className="flex flex-col gap-4">
          <TrainingPanel drills={drills} />

          <Card className="h-fit">
            <CardHeader
              title="Como funciona uma rodada"
              description="Cinco minutos, sempre no mesmo ritmo."
            />
            <ol className="flex flex-col gap-3 border-t border-hairline px-5 py-5">
              {[
                "Você escolhe o cenário e o perfil do decisor.",
                "O cliente simulado abre com a objeção — e insiste, como na vida real.",
                "Você responde por texto ou voz, sem roteiro na frente.",
                "No fim, sai o que segurou, o que soou frágil e uma versão melhor da sua resposta.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-100 text-[11px] font-semibold text-accent-700"
                  >
                    {index + 1}
                  </span>
                  <p className="text-[12.5px] leading-5 text-ink-secondary">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
