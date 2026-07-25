import type { Metadata } from "next";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { BuildNotice } from "@/components/ui/notice";
import { PageHeader } from "@/components/layout/page-header";
import { RecentReviews } from "@/components/dashboard/recent-reviews";
import { getReviews } from "@/lib/data";

export const metadata: Metadata = { title: "Análise pós-venda" };

const readings = [
  {
    title: "Como foi a condução",
    body: "Quanto você falou, onde o cliente se abriu e em que ponto a conversa perdeu tração.",
  },
  {
    title: "Sinais de compra",
    body: "Frases que indicaram intenção — e as que passaram sem ser aproveitadas.",
  },
  {
    title: "Objeções",
    body: "As que foram tratadas, as que ficaram no ar e o reenquadramento sugerido.",
  },
  {
    title: "Próximo passo",
    body: "O que combinar agora, com um rascunho de follow-up pronto para revisar.",
  },
];

export default function PosVendaPage() {
  const reviews = getReviews();

  return (
    <div className="mx-auto w-full max-w-[1360px]">
      <PageHeader
        eyebrow="Depois da chamada"
        title="Análise pós-venda"
        description="Cole a transcrição da reunião. A leitura devolve o que funcionou, o que ficou aberto e qual é o próximo passo — enquanto a conversa ainda está fresca."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-4">
          <Card className="p-5 sm:p-6">
            <form className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Empresa" htmlFor="empresa">
                  <Input
                    id="empresa"
                    name="empresa"
                    placeholder="Orbital Tech"
                  />
                </Field>
                <Field label="Contato" htmlFor="contato">
                  <Input
                    id="contato"
                    name="contato"
                    placeholder="Sérgio Paiva"
                  />
                </Field>
              </div>

              <Field
                label="Transcrição da chamada"
                htmlFor="transcricao"
                hint="Cole o texto do Meet, Zoom, Teams ou de qualquer gravador. Identificação dos falantes ajuda, mas não é obrigatória."
              >
                <Textarea
                  id="transcricao"
                  name="transcricao"
                  rows={14}
                  placeholder={
                    "[00:00] Vendedor: Obrigado pelo tempo, Sérgio. Antes de entrar na ferramenta, queria entender como vocês fazem hoje…\n[00:42] Sérgio: A gente controla tudo em planilha e trava no fechamento do mês…"
                  }
                />
              </Field>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" type="submit" disabled>
                  Analisar chamada
                </Button>
                <Button variant="ghost" type="reset">
                  Limpar
                </Button>
              </div>

              <BuildNotice>
                O campo de transcrição e o formato do relatório já estão de pé.
                A análise automática entra na próxima etapa do projeto.
              </BuildNotice>
            </form>
          </Card>

          <RecentReviews reviews={reviews} />
        </div>

        <Card className="h-fit">
          <CardHeader
            title="O que a leitura devolve"
            description="Direcionamento prático, não resumo da chamada."
          />
          <ol className="flex flex-col gap-4 border-t border-hairline px-5 py-5">
            {readings.map((item, index) => (
              <li key={item.title} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-100 text-[11px] font-semibold text-accent-700"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-[13px] font-medium text-ink">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-5 text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
