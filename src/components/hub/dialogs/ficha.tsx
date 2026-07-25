"use client";

import { ClipboardCheck } from "lucide-react";
import { Modal } from "@/components/hub/modal";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { BuildNotice } from "@/components/ui/notice";

/**
 * Ficha do Negócio: o contexto fixo que abastece todas as ferramentas. Quanto
 * mais completa, melhor a resposta de qualquer uma delas.
 */
export function FichaDialog({
  aberto,
  aoFechar,
  completude,
}: {
  aberto: boolean;
  aoFechar: () => void;
  completude: number;
}) {
  return (
    <Modal
      aberto={aberto}
      aoFechar={aoFechar}
      icone={ClipboardCheck}
      titulo="Ficha do Negócio"
      descricao="O que a IA sabe sobre a sua empresa antes de qualquer conversa."
      largura="media"
      rodape={
        <>
          <Button variante="marca" disabled>
            Salvar ficha
          </Button>
          <span className="text-[11px] text-ink-3">
            Vale para todas as ferramentas do Hub
          </span>
        </>
      }
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="rounded-lg border border-line bg-surface-2 p-3">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[12.5px] font-medium text-ink">
              Ficha {completude}% completa
            </p>
            <p className="text-[11px] text-ink-3">
              Faltam produtos e objeções recorrentes
            </p>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-wash">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${completude}%` }}
              role="meter"
              aria-valuenow={completude}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Completude da ficha"
            />
          </div>
        </div>

        <Field
          label="O que a sua empresa faz"
          htmlFor="ficha-empresa"
          obrigatorio
        >
          <Textarea
            id="ficha-empresa"
            rows={3}
            placeholder="Em duas ou três frases, como você explicaria a empresa para alguém que nunca ouviu falar dela."
          />
        </Field>

        <Field
          label="Cliente ideal"
          htmlFor="ficha-icp"
          dica="Porte, segmento, cargo de quem decide e quando ele costuma procurar você."
        >
          <Textarea
            id="ficha-icp"
            rows={3}
            placeholder="Ex.: clínicas de 10 a 50 funcionários…"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Principal diferencial" htmlFor="ficha-diferencial">
            <Input id="ficha-diferencial" placeholder="O que só você entrega" />
          </Field>
          <Field label="Concorrente mais citado" htmlFor="ficha-concorrente">
            <Input
              id="ficha-concorrente"
              placeholder="Quem aparece nas conversas"
            />
          </Field>
        </div>

        <Field
          label="Objeções que mais aparecem"
          htmlFor="ficha-objecoes"
          dica="Uma por linha. É daqui que o Simulador tira os treinos mais próximos da sua realidade."
        >
          <Textarea
            id="ficha-objecoes"
            rows={3}
            placeholder="Está caro&#10;Vou pensar&#10;Já tenho fornecedor"
          />
        </Field>

        <BuildNotice>
          A ficha já está estruturada. A gravação e o uso automático dela pelas
          ferramentas entram na próxima etapa do projeto.
        </BuildNotice>
      </div>
    </Modal>
  );
}
