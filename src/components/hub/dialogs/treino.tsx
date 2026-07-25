"use client";

import { useState } from "react";
import { Swords } from "lucide-react";
import { Modal } from "@/components/hub/modal";
import { Button } from "@/components/ui/button";
import { Field, Select, Textarea } from "@/components/ui/field";
import { BuildNotice } from "@/components/ui/notice";
import { getCenarios, getProdutos, getTreino } from "@/lib/data";

export function TreinoDialog({
  aberto,
  aoFechar,
}: {
  aberto: boolean;
  aoFechar: () => void;
}) {
  const cenarios = getCenarios();
  const produtos = getProdutos();
  const resumo = getTreino();
  const [escolhido, setEscolhido] = useState(cenarios[0]?.id ?? "");

  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      icone={Swords}
      titulo="Treino de Vendas"
      descricao="Simule uma conversa inteira com um cliente."
      largura="media"
      rodape={
        <>
          <Button variante="marca" disabled>
            Iniciar treino
          </Button>
          <span className="text-[11px] text-ink-3">
            Sua média hoje é {resumo.media.toFixed(1)} em {resumo.total} rodadas
          </span>
        </>
      }
    >
      <div className="flex flex-col gap-4 p-5">
        <fieldset className="min-w-0">
          <legend className="mb-2 text-[12px] font-medium text-ink-2">
            Qual cenário você quer treinar?
          </legend>
          <ul className="flex flex-col gap-2">
            {cenarios.map((cenario) => (
              <li key={cenario.id}>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface p-3 transition-colors hover:bg-surface-2 has-checked:border-brand-line has-checked:bg-brand-wash">
                  <input
                    type="radio"
                    name="cenario"
                    value={cenario.id}
                    checked={escolhido === cenario.id}
                    onChange={() => setEscolhido(cenario.id)}
                    className="mt-0.5 accent-[var(--brand)]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] font-medium text-ink">
                        {cenario.titulo}
                      </span>
                      <span className="shrink-0 rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-ink-2">
                        {cenario.nivel}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-ink-3">
                      {cenario.perfil}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <Field label="Produto que você vai apresentar" htmlFor="treino-produto">
          <Select id="treino-produto" defaultValue={produtos[0]}>
            {produtos.map((produto) => (
              <option key={produto}>{produto}</option>
            ))}
          </Select>
        </Field>

        <Field
          label="Algo específico para o cliente simulado saber"
          htmlFor="treino-contexto"
          dica="Opcional. Serve para o treino parecer com a sua realidade."
        >
          <Textarea
            id="treino-contexto"
            rows={3}
            placeholder="Ex.: cliente veio de indicação, já usa um concorrente e tem equipe enxuta."
          />
        </Field>

        <BuildNotice>
          Os cenários e a mecânica de rodadas já estão desenhados. O cliente
          simulado que conversa de volta entra na próxima etapa do projeto.
        </BuildNotice>
      </div>
    </Modal>
  );
}
