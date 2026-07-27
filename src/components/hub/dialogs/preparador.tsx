"use client";

import { useState } from "react";
import { ClipboardList, Globe, History, Search, Sparkles } from "lucide-react";
import { Modal } from "@/components/hub/modal";
import { PreparadorResultado } from "@/components/hub/dialogs/preparador-resultado";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { BuildNotice } from "@/components/ui/notice";
import {
  getPreparacaoResultado,
  getPreparacoes,
  getProdutos,
} from "@/lib/data";

const origens = ["Prospecção ativa", "Referido", "Lead de tráfego"];

export function PreparadorDialog({
  aberto,
  aoFechar,
  aoEnviarContexto,
  aoAbrirFerramenta,
  destacado,
}: {
  aberto: boolean;
  aoFechar: () => void;
  aoEnviarContexto: (titulo: string, detalhe: string) => void;
  /** Leva de uma preparação para outra ferramenta do Hub. */
  aoAbrirFerramenta: (ferramenta: "simulador" | "calls") => void;
  /** Preparação aberta a partir da lista do cartão. */
  destacado: string | null;
}) {
  const preparacoes = getPreparacoes();
  const produtos = getProdutos();
  const resultado = getPreparacaoResultado();
  const [contato, setContato] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [filtro, setFiltro] = useState("");
  /* Abrir pelo cartão começa no formulário; abrir por um registro da lista
     mostra direto a preparação pronta. A escolha do usuário (voltar, abrir uma
     preparação) vale até o diálogo ser aberto de novo. */
  const [vistaEscolhida, setVistaEscolhida] = useState<
    "formulario" | "resultado" | null
  >(null);
  const [abertura, setAbertura] = useState(`${aberto}:${destacado}`);

  if (abertura !== `${aberto}:${destacado}`) {
    setAbertura(`${aberto}:${destacado}`);
    setVistaEscolhida(null);
  }

  const noResultado =
    (vistaEscolhida ?? (destacado ? "resultado" : "formulario")) === "resultado";
  const setVista = setVistaEscolhida;

  const selecionada = preparacoes.find((item) => item.id === destacado);
  const lista = preparacoes.filter((item) =>
    `${item.contato} ${item.empresa}`
      .toLowerCase()
      .includes(filtro.toLowerCase()),
  );

  function enviarContexto() {
    const nome = contato.trim() || selecionada?.contato || "Reunião sem nome";
    const casa =
      empresa.trim() || selecionada?.empresa || "empresa não informada";
    aoEnviarContexto(
      `Preparação de reunião · ${nome}`,
      `${casa} — contexto disponível para a C-CÍLIA continuar a conversa.`,
    );
    aoFechar();
  }

  if (noResultado) {
    return (
      <Modal
        aberto={aberto}
        aoFechar={aoFechar}
        icone={ClipboardList}
        titulo="Preparação de reunião"
        descricao={`${resultado.empresa} · gerada ${resultado.geradaEm}`}
        aoVoltar={() => setVista("formulario")}
        acoes={
          <button
            type="button"
            onClick={() => {
              aoEnviarContexto(
                `Preparação de reunião · ${resultado.contato}`,
                `${resultado.empresa} — contexto disponível para a C-CÍLIA continuar a conversa.`,
              );
              aoFechar();
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-brand-line bg-brand-wash px-2.5 py-1.5 text-[11.5px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            <span
              aria-hidden
              className="grid h-5 w-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-white"
            >
              C
            </span>
            <span className="hidden sm:inline">Levar para a C-CÍLIA</span>
            <span className="sm:hidden">C-CÍLIA</span>
          </button>
        }
        rodape={
          <>
            <Button variante="contorno" onClick={() => setVista("formulario")}>
              Nova preparação
            </Button>
            <span className="ml-auto text-[11px] text-ink-3">
              {resultado.contato} · {resultado.produtos.join(" + ")}
            </span>
          </>
        }
      >
        <PreparadorResultado
          dados={resultado}
          aoTreinarObjecoes={() => aoAbrirFerramenta("simulador")}
          aoAnalisarCall={() => aoAbrirFerramenta("calls")}
        />
      </Modal>
    );
  }

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      icone={ClipboardList}
      titulo="Preparador de Reunião"
      descricao="Objeções, perguntas obrigatórias, tom e roteiro."
      rodape={
        <>
          <Button variante="marca" disabled>
            Gerar preparação
          </Button>
          <Button variante="contorno" onClick={enviarContexto}>
            <Sparkles size={14} strokeWidth={1.9} aria-hidden />
            Levar contexto para a C-CÍLIA
          </Button>
          <span className="ml-auto text-[11px] text-ink-3">
            Campos com <span className="text-brand">*</span> são obrigatórios
          </span>
        </>
      }
    >
      <div className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_290px]">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field
            label="Produto(s) que vai apresentar"
            htmlFor="prep-produto"
            obrigatorio
          >
            <Select id="prep-produto" defaultValue="">
              <option value="" disabled>
                Selecionar produto(s)
              </option>
              {produtos.map((produto) => (
                <option key={produto}>{produto}</option>
              ))}
            </Select>
          </Field>

          <Field label="Nome do contato" htmlFor="prep-contato" obrigatorio>
            <Input
              id="prep-contato"
              value={contato}
              onChange={(event) => setContato(event.target.value)}
              placeholder={selecionada?.contato ?? "Ex.: João da Silva"}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cargo" htmlFor="prep-cargo">
              <Input id="prep-cargo" placeholder="Ex.: Diretor comercial" />
            </Field>
            <Field label="Empresa" htmlFor="prep-empresa">
              <Input
                id="prep-empresa"
                value={empresa}
                onChange={(event) => setEmpresa(event.target.value)}
                placeholder={selecionada?.empresa ?? "Ex.: Acme Ltda"}
              />
            </Field>
          </div>

          <div className="rounded-lg border border-line bg-surface-2 p-3">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink-2">
              <Globe
                size={13}
                strokeWidth={1.9}
                aria-hidden
                className="text-brand"
              />
              Site da empresa <span className="text-ink-3">(opcional)</span>
            </p>
            <div className="mt-2 flex gap-2">
              <Input
                id="prep-site"
                aria-label="Site da empresa"
                placeholder="empresa.com"
                className="flex-1"
              />
              <Button
                variante="contorno"
                tamanho="sm"
                className="h-9 shrink-0"
                disabled
              >
                Ler site
              </Button>
            </div>
            <Textarea
              aria-label="Resumo do que a empresa faz"
              rows={2}
              className="mt-2"
              placeholder="Clique em “Ler site” para puxar um parágrafo com o que a empresa faz."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Segmento" htmlFor="prep-segmento">
              <Input id="prep-segmento" placeholder="Ex.: Clínicas médicas" />
            </Field>
            <Field label="Faturamento (faixa)" htmlFor="prep-faturamento">
              <Select id="prep-faturamento" defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                <option>Até R$ 1 mi/ano</option>
                <option>R$ 1 mi a R$ 10 mi/ano</option>
                <option>R$ 10 mi a R$ 50 mi/ano</option>
                <option>Acima de R$ 50 mi/ano</option>
              </Select>
            </Field>
          </div>

          <fieldset className="min-w-0">
            <legend className="mb-1.5 text-[12px] font-medium text-ink-2">
              Origem da reunião
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {origens.map((origem) => (
                <label
                  key={origem}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[12.5px] transition-colors hover:bg-surface-2 has-checked:border-brand-line has-checked:bg-brand-wash"
                >
                  <input
                    type="radio"
                    name="prep-origem"
                    value={origem}
                    className="accent-[var(--brand)]"
                  />
                  {origem}
                </label>
              ))}
            </div>
          </fieldset>

          <Field
            label="Tudo que você sabe sobre esse cliente e essa empresa"
            htmlFor="prep-contexto"
            dica="Quanto mais rico, melhor: histórico da relação, dores mencionadas, soluções já testadas, perfil pessoal do contato."
          >
            <Textarea
              id="prep-contexto"
              rows={5}
              placeholder="Conversas anteriores, sinais captados, quem mais participa da decisão…"
            />
          </Field>

          <BuildNotice>
            A tela e o formato da entrega já estão de pé. A geração automática
            da preparação entra na próxima etapa do projeto.
          </BuildNotice>
        </form>

        <aside className="flex min-h-0 flex-col rounded-xl border border-line bg-surface-2 p-3">
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
            <History
              size={14}
              strokeWidth={1.9}
              aria-hidden
              className="text-ink-3"
            />
            Últimas preparações
          </p>

          <div className="relative mt-2.5">
            <Search
              size={14}
              strokeWidth={1.9}
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-ink-3"
            />
            <Input
              aria-label="Filtrar preparações"
              value={filtro}
              onChange={(event) => setFiltro(event.target.value)}
              placeholder="Filtrar por nome ou empresa"
              className="pl-8"
            />
          </div>

          <ul className="scroll-thin mt-2.5 flex max-h-[46vh] flex-col gap-1.5 overflow-y-auto pr-1">
            {lista.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setVista("resultado")}
                  className={
                    "w-full rounded-lg border bg-surface px-3 py-2 text-left transition-colors hover:border-brand-line " +
                    (item.id === destacado
                      ? "border-brand-line"
                      : "border-line")
                  }
                >
                  <span className="block truncate text-[12.5px] font-medium text-ink">
                    {item.contato}
                  </span>
                  <span className="mt-0.5 flex items-baseline justify-between gap-2">
                    <span className="truncate text-[11px] text-ink-3">
                      {item.empresa}
                    </span>
                    <span className="shrink-0 text-[10.5px] text-ink-3">
                      {item.quando}
                    </span>
                  </span>
                  <span className="mt-1 block truncate text-[10.5px] font-medium text-brand">
                    {item.produto}
                  </span>
                </button>
              </li>
            ))}
            {lista.length === 0 && (
              <li className="px-1 py-2 text-[11.5px] text-ink-3">
                Nenhuma preparação com esse filtro.
              </li>
            )}
          </ul>
        </aside>
      </div>
    </Modal>
  );
}
