"use client";

import { useState } from "react";
import { AlertTriangle, Headphones, Sparkles } from "lucide-react";
import { Modal } from "@/components/hub/modal";
import { AnaliseCallResultado } from "@/components/hub/dialogs/analise-call-resultado";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { BuildNotice } from "@/components/ui/notice";
import { faixaNota, getAnaliseResultado, getCalls } from "@/lib/data";

export function AnaliseCallDialog({
  aberto,
  aoFechar,
  aoEnviarContexto,
  aoAbrirFerramenta,
  destacado,
}: {
  aberto: boolean;
  aoFechar: () => void;
  aoEnviarContexto: (titulo: string, detalhe: string) => void;
  /** Leva de uma análise para outra ferramenta do Hub. */
  aoAbrirFerramenta: (ferramenta: "simulador" | "preparador") => void;
  destacado: string | null;
}) {
  const calls = [...getCalls()].reverse();
  const analise = getAnaliseResultado();
  const [empresa, setEmpresa] = useState("");
  const selecionada = calls.find((call) => call.id === destacado) ?? null;

  /* Abrir pelo cartão começa no formulário; abrir por uma barra do gráfico ou
     pela lista mostra a análise pronta. */
  const [vistaEscolhida, setVistaEscolhida] = useState<
    "formulario" | "resultado" | null
  >(null);
  const [abertura, setAbertura] = useState(`${aberto}:${destacado}`);

  if (abertura !== `${aberto}:${destacado}`) {
    setAbertura(`${aberto}:${destacado}`);
    setVistaEscolhida(null);
  }

  const noResultado =
    (vistaEscolhida ?? (destacado ? "resultado" : "formulario")) ===
    "resultado";

  if (noResultado) {
    return (
      <Modal
        aberto={aberto}
        aoFechar={aoFechar}
        icone={Headphones}
        titulo="Análise da call"
        descricao={`${analise.empresa} · ${analise.data}`}
        aoVoltar={() => setVistaEscolhida("formulario")}
        acoes={
          <button
            type="button"
            onClick={() => {
              aoEnviarContexto(
                `Análise de call · ${analise.contato}`,
                `${analise.empresa} — nota ${analise.nota}/100, disponível para a C-CÍLIA ajudar no próximo passo.`,
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
            <Button
              variante="contorno"
              onClick={() => setVistaEscolhida("formulario")}
            >
              Analisar outra call
            </Button>
            <span className="ml-auto text-[11px] text-ink-3">
              {analise.contato} · conduzida por {analise.vendedor}
            </span>
          </>
        }
      >
        <AnaliseCallResultado
          dados={analise}
          aoTreinar={() => aoAbrirFerramenta("simulador")}
          aoPreparar={() => aoAbrirFerramenta("preparador")}
        />
      </Modal>
    );
  }

  function enviarContexto() {
    const casa =
      empresa.trim() || selecionada?.empresa || "chamada sem empresa";
    aoEnviarContexto(
      `Análise de call · ${casa}`,
      "Transcrição disponível para a C-CÍLIA ajudar no próximo passo.",
    );
    aoFechar();
  }

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      icone={Headphones}
      titulo="Análise de Call"
      descricao="Cole a transcrição e receba análise e avaliação."
      rodape={
        <>
          <Button variante="marca" disabled>
            Analisar call
          </Button>
          <Button variante="contorno" onClick={enviarContexto}>
            <Sparkles size={14} strokeWidth={1.9} aria-hidden />
            Levar para a C-CÍLIA
          </Button>
        </>
      }
    >
      <div className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_290px]">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Empresa" htmlFor="call-empresa">
              <Input
                id="call-empresa"
                value={empresa}
                onChange={(event) => setEmpresa(event.target.value)}
                placeholder={selecionada?.empresa ?? "Ex.: TMT Bebidas"}
              />
            </Field>
            <Field label="Contato" htmlFor="call-contato">
              <Input
                id="call-contato"
                placeholder={selecionada?.contato ?? "Ex.: Elias Choi"}
              />
            </Field>
            <Field label="Data da reunião" htmlFor="call-data">
              <Input id="call-data" type="date" />
            </Field>
          </div>

          <Field
            label="Transcrição da chamada"
            htmlFor="call-transcricao"
            obrigatorio
            dica="Cole o texto do Meet, Zoom, Teams ou de qualquer gravador. Identificar quem fala ajuda, mas não é obrigatório."
          >
            <Textarea
              id="call-transcricao"
              rows={12}
              placeholder={
                "[00:00] Vendedor: Obrigado pelo tempo, Elias. Antes de falar da ferramenta, queria entender como vocês fazem hoje…\n[00:42] Elias: A gente controla tudo em planilha e trava no fechamento do mês…"
              }
            />
          </Field>

          <BuildNotice>
            O campo de transcrição e o formato do relatório já estão de pé. A
            avaliação automática entra na próxima etapa do projeto.
          </BuildNotice>
        </form>

        <aside className="flex min-h-0 flex-col rounded-xl border border-line bg-surface-2 p-3">
          <p className="text-[12.5px] font-semibold text-ink">
            Análises anteriores
          </p>
          <p className="mt-0.5 text-[11px] text-ink-3">
            Clique em uma para abrir a análise completa.
          </p>

          <ul className="scroll-thin mt-2.5 flex max-h-[52vh] flex-col gap-1.5 overflow-y-auto pr-1">
            {calls.map((call) => {
              const faixa = faixaNota(call.nota);
              return (
                <li key={call.id}>
                  <button
                    type="button"
                    onClick={() => setVistaEscolhida("resultado")}
                    className={
                      "w-full rounded-lg border bg-surface px-3 py-2 text-left transition-colors hover:border-brand-line " +
                      (call.id === destacado
                        ? "border-brand-line"
                        : "border-line")
                    }
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[12.5px] font-medium text-ink">
                        {call.empresa}
                      </span>
                      <span
                        className="shrink-0 text-[12px] font-semibold tabular-nums"
                        style={{ color: faixa.cor }}
                      >
                        {call.nota.toFixed(1)}
                        <span className="ml-1 text-[10px] font-medium">
                          {faixa.rotulo}
                        </span>
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-ink-3">
                      {call.contato} · {call.quando}
                    </p>
                    <p className="mt-1 text-[11.5px] leading-snug text-ink-2">
                      {call.destaque}
                    </p>
                    {call.atencao && (
                      <p className="mt-1 flex gap-1.5 text-[11px] leading-snug text-ink-3">
                        <AlertTriangle
                          size={12}
                          strokeWidth={1.9}
                          aria-hidden
                          className="mt-0.5 shrink-0"
                          style={{ color: "var(--score-mid)" }}
                        />
                        {call.atencao}
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </Modal>
  );
}
