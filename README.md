# VENDE-C AI HUB

Painel de ferramentas de IA para o vendedor, dentro da plataforma ARENA.

Quatro ferramentas na coluna da esquerda — **Preparador de Reunião**, **Análise
de Call**, **Simulador de Objeções** e **Treino de Vendas** — cada uma abrindo em
popup. A **C-CÍLIA** fica docada à direita o tempo todo: quando você não está
dentro de uma ferramenta, conversa com ela; quando sai de uma, o contexto do que
você acabou de fazer aparece na conversa.

Esta entrega é a **interface completa**, com dados de demonstração. Os motores de
IA de cada ferramenta entram nas próximas etapas — onde isso vale, a tela diz.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run format
```

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** com tokens em CSS custom properties
- **lucide-react** para ícones
- Popups em `<dialog>` nativo — foco preso, Esc e fundo inerte sem biblioteca

## Estrutura

```
src/
  app/
    layout.tsx                 fonte, metadados, idioma
    globals.css                tokens (cromo escuro, área clara, marca, notas)
    (app)/
      layout.tsx               shell: menu lateral + área de trabalho
      page.tsx                 o Hub inteiro (estado das ferramentas e do chat)
  components/
    shell/sidebar.tsx          menu lateral escuro da ARENA
    hub/
      banner.tsx               banner preto, Ficha do Negócio, Vendedor/Líder
      tool-card.tsx            cartão de ferramenta + divisor de etapa
      previews.tsx             prévias dentro dos cartões
      ccilia.tsx               painel de conversa docado
      lider.tsx                visão do líder (uso das ferramentas pelo time)
      modal.tsx                primitivo de popup
      dialogs/                 os cinco popups
    ui/                        botão, campos, aviso de etapa
  lib/
    data.ts                    dados de demonstração
    cn.ts                      utilitário de classes
```

### Trocar os dados de demonstração por dados reais

`src/lib/data.ts` expõe os tipos do domínio (`Preparacao`, `AnaliseCall`,
`Objecao`, `CenarioTreino`, `ResumoTreino`, `MembroEquipe`). As funções `get*`
retornam constantes locais; ligar a um banco ou API é substituir o corpo delas,
sem tocar em componente nenhum.

## Decisões de design

**Cabe em uma tela.** O Hub ocupa exatamente a altura da janela: o menu, o
banner, a coluna das ferramentas e a conversa vivem juntos sem rolagem de
página. O que precisa rolar rola dentro do próprio painel (mensagens, listas).
Abaixo de 1024px o layout empilha e a página passa a rolar normalmente.

**Sem CRM.** Não há valor de negócio, funil nem meta em lugar nenhum. Os únicos
números do painel vêm do uso das ferramentas: preparações geradas, notas das
calls analisadas e evolução no treino.

**O preto é da casa.** Menu e banner mantêm o cromo escuro do app atual, e o
rosa da marca aparece em identidade, interação e nos dados do treino — nunca
como enfeite.

**Nota nunca só por cor.** As barras de nota usam a escala verde/âmbar/vermelho
validada para daltonismo e contraste, e o número aparece impresso embaixo de
cada barra, então a leitura não depende de enxergar a cor.

**Ferramenta abastece a conversa.** Todo popup tem uma ação que leva o contexto
para a C-CÍLIA e fecha — é assim que as duas metades da tela se conversam.

**Honestidade de etapa.** Onde o motor ainda não existe, a tela avisa em vez de
simular um resultado.

## Próximas etapas sugeridas

1. Motor da Análise de Call: transcrição → nota, pontos e próximo passo.
2. Motor do Preparador: pesquisa do lead e roteiro da reunião.
3. Simulador e Treino com cliente simulado respondendo.
4. C-CÍLIA conectada, recebendo o contexto das ferramentas.
5. Persistência (histórico, Ficha do Negócio) e autenticação.
