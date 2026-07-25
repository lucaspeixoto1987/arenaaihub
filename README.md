# Arena — inteligência de vendas

Base do produto: um painel para o vendedor com três ferramentas ao redor da
reunião — **preparação** (antes), **análise pós-venda** (depois) e **sala de
treino** (entre uma e outra).

Esta primeira entrega é a **fundação da interface**: shell de navegação, sistema
de design, painel completo com dados de demonstração e as três telas de
ferramenta já estruturadas. Os motores de IA de cada ferramenta entram nas
próximas etapas — onde isso vale, a tela diz isso de forma explícita.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
npm run format
```

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** com tokens em CSS custom properties
- **lucide-react** para ícones

## Estrutura

```
src/
  app/
    layout.tsx              fontes, metadados, idioma
    globals.css             tokens de design (cores, tipografia, sombras)
    (app)/
      layout.tsx            shell: sidebar + topbar
      page.tsx              Painel
      preparacao/           Preparação de reunião
      pos-venda/            Análise pós-venda
      treino/               Sala de treino
  components/
    layout/                 sidebar, topbar, cabeçalho de página
    ui/                     card, botão, badge, campos, medidor, aviso
    charts/                 sparkline, funil de pipeline
    dashboard/              blocos do painel
  lib/
    data.ts                 camada de dados (demonstração)
    format.ts               formatação pt-BR
    cn.ts                   utilitário de classes
```

### Trocar os dados de demonstração por dados reais

`src/lib/data.ts` já expõe os tipos finais do domínio (`Kpi`, `Meeting`,
`FunnelStage`, `CallReview`, `Drill`). As funções `get*` retornam constantes
locais; ligar a um banco ou API é substituir o corpo dessas funções, sem tocar
em nenhum componente.

## Decisões de design

**Sem cara de ferramenta de IA.** Nada de gradiente roxo, brilho ou ícone de
faísca. A base é papel quente (`#f6f5f1`), tinta quase preta e hairlines de 1px
no lugar de sombras pesadas. Títulos em serifa editorial (Instrument Serif),
interface em Inter.

**Cor com função.** O verde da marca é reservado a dados e sinais — nunca é
enfeite. O botão primário é tinta, não acento, para o acento continuar
significando alguma coisa quando aparece.

**Estado nunca só por cor.** Todo rótulo de estado (preparação da reunião, score
da chamada, variação de indicador) carrega texto — e ícone, quando ajuda — para
funcionar em impressão, daltonismo e leitor de tela.

**Gráficos.** Cada gráfico é de uma matiz só. O funil usa uma rampa ordinal
validada (monotonia de luminosidade, distância mínima entre passos, ponta clara
acima de 2:1 contra a superfície) e tem alternância para tabela; as sparklines
usam a cor de recuo com o período atual no acento, e o valor de cada ponto é
alcançável por mouse e por teclado.

**Honestidade de etapa.** Onde a ferramenta ainda não tem motor, a tela mostra
um aviso dizendo isso — em vez de simular um resultado que não existe.

## Próximas etapas sugeridas

1. Motor de preparação: pesquisa do lead e geração do roteiro.
2. Motor de análise: leitura de transcrição e sugestão de follow-up.
3. Simulador de treino: rodadas com resposta do cliente simulado e avaliação.
4. Persistência (contas, reuniões, histórico) e autenticação.
