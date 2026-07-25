import type { Metadata } from "next";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { BuildNotice } from "@/components/ui/notice";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Preparação de reunião" };

const deliverables = [
  {
    title: "Retrato da conta",
    body: "Setor, porte, movimentos recentes e o que mudou no último trimestre.",
  },
  {
    title: "Quem está na sala",
    body: "Papel de cada participante, prioridade provável e como ele mede sucesso.",
  },
  {
    title: "Hipótese de dor",
    body: "Duas ou três hipóteses ranqueadas, com a evidência que sustenta cada uma.",
  },
  {
    title: "Roteiro da conversa",
    body: "Abertura, perguntas de diagnóstico na ordem certa e o próximo passo a pedir.",
  },
  {
    title: "Objeções prováveis",
    body: "O que costuma travar nesse perfil e como reenquadrar sem dar desconto.",
  },
];

export default async function PreparacaoPage({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string }>;
}) {
  const { lead } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-[1360px]">
      <PageHeader
        eyebrow="Antes da reunião"
        title="Preparação de reunião"
        description="Diga sobre quem é a conversa. A preparação devolve contexto, hipótese de dor e um roteiro de condução que cabe em uma página."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-5 sm:p-6">
          <form className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Empresa ou lead" htmlFor="empresa">
                <Input
                  id="empresa"
                  name="empresa"
                  defaultValue={lead ?? ""}
                  placeholder="Vetorial Log"
                />
              </Field>
              <Field label="Site ou LinkedIn" htmlFor="site">
                <Input
                  id="site"
                  name="site"
                  placeholder="vetorial.com.br"
                  inputMode="url"
                />
              </Field>
              <Field label="Contato" htmlFor="contato">
                <Input
                  id="contato"
                  name="contato"
                  placeholder="Marina Duarte"
                />
              </Field>
              <Field label="Cargo" htmlFor="cargo">
                <Input
                  id="cargo"
                  name="cargo"
                  placeholder="Diretora de Operações"
                />
              </Field>
              <Field label="Etapa do negócio" htmlFor="etapa">
                <Select id="etapa" name="etapa" defaultValue="Diagnóstico">
                  <option>Descoberta</option>
                  <option>Diagnóstico</option>
                  <option>Proposta</option>
                  <option>Negociação</option>
                  <option>Fechamento</option>
                </Select>
              </Field>
              <Field label="Duração prevista" htmlFor="duracao">
                <Select id="duracao" name="duracao" defaultValue="45 minutos">
                  <option>30 minutos</option>
                  <option>45 minutos</option>
                  <option>60 minutos</option>
                </Select>
              </Field>
            </div>

            <Field
              label="Objetivo da reunião"
              htmlFor="objetivo"
              hint="O que precisa estar combinado quando a chamada terminar."
            >
              <Textarea
                id="objetivo"
                name="objetivo"
                rows={4}
                placeholder="Validar o impacto do retrabalho de integração e sair com data para apresentar proposta ao time financeiro."
              />
            </Field>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" type="submit" disabled>
                Gerar preparação
              </Button>
              <Button variant="ghost" type="reset">
                Limpar
              </Button>
            </div>

            <BuildNotice>
              A tela e o formato da entrega já estão definidos. A pesquisa
              automática do lead entra na próxima etapa do projeto.
            </BuildNotice>
          </form>
        </Card>

        <Card className="h-fit">
          <CardHeader
            title="O que você recebe"
            description="Sempre a mesma estrutura, para virar hábito antes de toda chamada."
          />
          <ol className="flex flex-col gap-4 border-t border-hairline px-5 py-5">
            {deliverables.map((item, index) => (
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
