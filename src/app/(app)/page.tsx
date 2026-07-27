"use client";

import { useState } from "react";
import {
  ClipboardList,
  Headphones,
  MessageSquareWarning,
  Swords,
} from "lucide-react";
import { Banner, type Segmento } from "@/components/hub/banner";
import { CCilia, type Mensagem } from "@/components/hub/ccilia";
import { EtapaDivisor, ToolCard } from "@/components/hub/tool-card";
import {
  CallsPreview,
  PreparacoesPreview,
  TreinoPreview,
} from "@/components/hub/previews";
import { LiderView } from "@/components/hub/lider";
import { PreparadorDialog } from "@/components/hub/dialogs/preparador";
import { AnaliseCallDialog } from "@/components/hub/dialogs/analise-call";
import { SimuladorDialog } from "@/components/hub/dialogs/simulador";
import { TreinoDialog } from "@/components/hub/dialogs/treino";
import { FichaDialog } from "@/components/hub/dialogs/ficha";
import {
  getCalls,
  getEquipe,
  getMembro,
  getObjecoes,
  getPreparacoes,
  getTreino,
} from "@/lib/data";

type Ferramenta = "preparador" | "calls" | "simulador" | "treino" | "ficha";

const SAUDACAO: Mensagem = {
  id: "m0",
  autor: "cecilia",
  texto:
    "Oi, Lucas! Sou a C-CÍLIA, sua parceira de vendas aqui no VENDE-C. Me conta o que você tem pela frente — ou abra uma ferramenta ao lado e o contexto vem parar aqui. Bora!",
};

const FICHA_COMPLETUDE = 68;

export default function HubPage() {
  const membro = getMembro();
  const preparacoes = getPreparacoes();
  const calls = getCalls();
  const treino = getTreino();
  const equipe = getEquipe();
  const objecoes = getObjecoes();
  const rodadasObjecoes = objecoes.reduce((total, o) => total + o.rodadas, 0);

  const [segmento, setSegmento] = useState<Segmento>("vendedor");
  const [aberta, setAberta] = useState<Ferramenta | null>(null);
  const [destacado, setDestacado] = useState<string | null>(null);
  const [mensagens, setMensagens] = useState<Mensagem[]>([SAUDACAO]);

  function abrir(ferramenta: Ferramenta, id: string | null = null) {
    setDestacado(id);
    setAberta(ferramenta);
  }

  function fechar() {
    setAberta(null);
    setDestacado(null);
  }

  function enviarMensagem(texto: string) {
    setMensagens((atuais) => [
      ...atuais,
      { id: `u${atuais.length}`, autor: "voce", texto },
      {
        id: `s${atuais.length + 1}`,
        autor: "sistema",
        texto:
          "A C-CÍLIA responde quando o motor de conversa for conectado — próxima etapa do projeto.",
      },
    ]);
  }

  function receberContexto(titulo: string, detalhe: string) {
    setMensagens((atuais) => [
      ...atuais,
      { id: `c${atuais.length}`, autor: "contexto", texto: titulo, detalhe },
    ]);
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-y-auto p-3 lg:overflow-hidden">
      <Banner
        segmento={segmento}
        aoTrocarSegmento={setSegmento}
        aoAbrirFicha={() => abrir("ficha")}
        fichaCompleta={FICHA_COMPLETUDE}
      />

      {segmento === "vendedor" ? (
        <div className="grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(300px,340px)_minmax(0,1fr)]">
          {/* Coluna das ferramentas */}
          <div className="flex flex-col gap-2 lg:min-h-0">
            <EtapaDivisor>Antes da reunião</EtapaDivisor>
            <div className="min-h-[132px] lg:flex-1">
              <ToolCard
                icone={ClipboardList}
                titulo="Preparador de Reunião"
                descricao="Objeções, perguntas obrigatórias, tom e roteiro."
                aoAbrir={() => abrir("preparador")}
              >
                <PreparacoesPreview
                  preparacoes={preparacoes}
                  aoAbrir={(id) => abrir("preparador", id)}
                />
              </ToolCard>
            </div>

            <EtapaDivisor>Depois da reunião</EtapaDivisor>
            <div className="min-h-[164px] lg:flex-1">
              <ToolCard
                icone={Headphones}
                titulo="Análise de Call"
                descricao="Cole a transcrição e receba análise e avaliação."
                aoAbrir={() => abrir("calls")}
              >
                <CallsPreview
                  calls={calls}
                  aoAbrir={(id) => abrir("calls", id)}
                />
              </ToolCard>
            </div>

            <EtapaDivisor>Ambiente de treino</EtapaDivisor>
            <div className="flex min-h-[132px] gap-2 lg:flex-1">
              <div className="w-[116px] shrink-0">
                <ToolCard
                  icone={MessageSquareWarning}
                  titulo="Simulador de Objeções"
                  descricao="Treino rápido"
                  aoAbrir={() => abrir("simulador")}
                  compacto
                >
                  <span className="text-[10px] leading-snug text-ink-3">
                    {objecoes.length} objeções · {rodadasObjecoes} rodadas
                  </span>
                </ToolCard>
              </div>
              <div className="min-w-0 flex-1">
                <ToolCard
                  icone={Swords}
                  titulo="Treino de Vendas"
                  descricao="Simule uma conversa com um cliente."
                  aoAbrir={() => abrir("treino")}
                >
                  <TreinoPreview resumo={treino} />
                </ToolCard>
              </div>
            </div>
          </div>

          {/* C-CÍLIA sempre presente */}
          <CCilia
            mensagens={mensagens}
            aoEnviar={enviarMensagem}
            aoLimpar={() => setMensagens([SAUDACAO])}
          />
        </div>
      ) : (
        <LiderView equipe={equipe} />
      )}

      <PreparadorDialog
        aberto={aberta === "preparador"}
        aoFechar={fechar}
        aoEnviarContexto={receberContexto}
        aoAbrirFerramenta={(ferramenta) => abrir(ferramenta)}
        destacado={destacado}
      />
      <AnaliseCallDialog
        aberto={aberta === "calls"}
        aoFechar={fechar}
        aoEnviarContexto={receberContexto}
        aoAbrirFerramenta={(ferramenta) => abrir(ferramenta)}
        destacado={destacado}
      />
      <SimuladorDialog aberto={aberta === "simulador"} aoFechar={fechar} />
      <TreinoDialog aberto={aberta === "treino"} aoFechar={fechar} />
      <FichaDialog
        aberto={aberta === "ficha"}
        aoFechar={fechar}
        completude={FICHA_COMPLETUDE}
      />

      <p className="sr-only">
        Painel de {membro.nome}, {membro.papel} na {membro.empresa}.
      </p>
    </div>
  );
}
