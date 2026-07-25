"use client";

import { useState } from "react";
import { MessageSquareWarning } from "lucide-react";
import { Modal } from "@/components/hub/modal";
import { Button } from "@/components/ui/button";
import { Field, Select, Textarea } from "@/components/ui/field";
import { BuildNotice } from "@/components/ui/notice";
import { getObjecoes, getProdutos } from "@/lib/data";

export function SimuladorDialog({
  aberto,
  aoFechar,
}: {
  aberto: boolean;
  aoFechar: () => void;
}) {
  const objecoes = getObjecoes();
  const produtos = getProdutos();
  const [escolhida, setEscolhida] = useState(objecoes[0]?.id ?? "");

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      icone={MessageSquareWarning}
      titulo="Simulador de Objeções"
      descricao="Treino rápido, focado em uma objeção real."
      largura="media"
      rodape={
        <>
          <Button variante="marca" disabled>
            Iniciar simulação
          </Button>
          <span className="text-[11px] text-ink-3">
            Cinco rodadas, com devolutiva ao final
          </span>
        </>
      }
    >
      <div className="flex flex-col gap-4 p-5">
        <fieldset className="min-w-0">
          <legend className="mb-2 text-[12px] font-medium text-ink-2">
            Qual objeção você quer treinar?
          </legend>
          <ul className="flex flex-col gap-2">
            {objecoes.map((objecao) => (
              <li key={objecao.id}>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface p-3 transition-colors hover:bg-surface-2 has-checked:border-brand-line has-checked:bg-brand-wash">
                  <input
                    type="radio"
                    name="objecao"
                    value={objecao.id}
                    checked={escolhida === objecao.id}
                    onChange={() => setEscolhida(objecao.id)}
                    className="mt-0.5 accent-[var(--brand)]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] font-medium text-ink">
                        {objecao.titulo}
                      </span>
                      <span className="shrink-0 text-[10.5px] text-ink-3">
                        {objecao.rodadas} rodadas
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-ink-2">
                      {objecao.fala}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <Field label="Produto em jogo" htmlFor="sim-produto">
          <Select id="sim-produto" defaultValue={produtos[0]}>
            {produtos.map((produto) => (
              <option key={produto}>{produto}</option>
            ))}
          </Select>
        </Field>

        <Field
          label="Contexto do cliente"
          htmlFor="sim-contexto"
          dica="Opcional. Quanto mais específico, mais dura fica a simulação."
        >
          <Textarea
            id="sim-contexto"
            rows={3}
            placeholder="Ex.: já recebeu proposta de concorrente, compra por comitê, fim de trimestre apertado."
          />
        </Field>

        <BuildNotice>
          As objeções e a mecânica de rodadas já estão desenhadas. O cliente
          simulado que responde entra na próxima etapa do projeto.
        </BuildNotice>
      </div>
    </Modal>
  );
}
