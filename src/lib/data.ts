/**
 * Dados de demonstração do AI Hub.
 *
 * Aqui não existe CRM: nada de valor de negócio, funil ou meta. Tudo que o
 * painel mostra vem do uso das próprias ferramentas — preparações geradas,
 * notas das calls analisadas e evolução no treino.
 *
 * As funções `get*` são o ponto de troca por API/banco depois.
 */

export type Membro = {
  nome: string;
  papel: string;
  empresa: string;
};

export type Preparacao = {
  id: string;
  contato: string;
  empresa: string;
  produto: string;
  /** Rótulo curto já pronto para exibição ("Hoje", "2d", "14 de jul."). */
  quando: string;
};

export type AnaliseCall = {
  id: string;
  contato: string;
  empresa: string;
  quando: string;
  /** 0–10, uma casa decimal. */
  nota: number;
  destaque: string;
  atencao?: string;
};

export type Objecao = {
  id: string;
  titulo: string;
  fala: string;
  rodadas: number;
};

export type CenarioTreino = {
  id: string;
  titulo: string;
  perfil: string;
  nivel: "Fácil" | "Intermediário" | "Difícil";
};

export type ResumoTreino = {
  total: number;
  media: number;
  evolucao: number[];
};

export type MembroEquipe = {
  id: string;
  nome: string;
  preparacoes: number;
  calls: number;
  treinos: number;
  /** Média das notas de call, 0–10. */
  media: number;
};

const membro: Membro = {
  nome: "Lucas Peixoto",
  papel: "Aluno",
  empresa: "VENDE-C",
};

const preparacoes: Preparacao[] = [
  {
    id: "p1",
    contato: "Renata Peixoto",
    empresa: "Itaú",
    produto: "VENDE-C CORP",
    quando: "2d",
  },
  {
    id: "p2",
    contato: "Mariana Peixoto",
    empresa: "ACCENTURE",
    produto: "VENDE-C CORP",
    quando: "2d",
  },
  {
    id: "p3",
    contato: "Lucas Peixoto",
    empresa: "VENDE-C",
    produto: "VENDE-C PASS",
    quando: "3d",
  },
  {
    id: "p4",
    contato: "Elias Choi",
    empresa: "TMT BEBIDAS",
    produto: "VENDE-C PASS + CORP",
    quando: "3d",
  },
  {
    id: "p5",
    contato: "Fátima Peixoto",
    empresa: "Colégio Ipê Arujá",
    produto: "VENDE-C PASS",
    quando: "14 de jul.",
  },
  {
    id: "p6",
    contato: "Fátima Peixoto",
    empresa: "Colégio Ipê Arujá",
    produto: "VENDE-C PASS",
    quando: "14 de jul.",
  },
  {
    id: "p7",
    contato: "Fátima Peixoto",
    empresa: "Colégio Ipê Arujá",
    produto: "VENDE-C PASS",
    quando: "13 de jul.",
  },
];

/** Ordem cronológica: da mais antiga para a mais recente. */
const calls: AnaliseCall[] = [
  {
    id: "c1",
    contato: "Sérgio Paiva",
    empresa: "Orbital Tech",
    quando: "12 de jul.",
    nota: 1.4,
    destaque: "Abertura sem contexto; cliente assumiu a condução.",
    atencao: "Nenhuma pergunta de diagnóstico antes da demonstração.",
  },
  {
    id: "c2",
    contato: "Denis Rocha",
    empresa: "Lacto Sul",
    quando: "14 de jul.",
    nota: 2.7,
    destaque: "Apresentou preço antes de mapear a dor.",
    atencao: "Desconto oferecido sem pedido do cliente.",
  },
  {
    id: "c3",
    contato: "Fátima Peixoto",
    empresa: "Colégio Ipê Arujá",
    quando: "16 de jul.",
    nota: 7.2,
    destaque: "Boa escuta; faltou combinar o próximo passo.",
    atencao: "Reunião terminou sem data definida.",
  },
  {
    id: "c4",
    contato: "Elias Choi",
    empresa: "TMT BEBIDAS",
    quando: "18 de jul.",
    nota: 1.0,
    destaque: "Conversa girou em funcionalidades, não em impacto.",
    atencao: "Decisor não participou e não foi mapeado.",
  },
  {
    id: "c5",
    contato: "Mariana Peixoto",
    empresa: "ACCENTURE",
    quando: "22 de jul.",
    nota: 9.7,
    destaque: "Diagnóstico firme, impacto quantificado, próximo passo fechado.",
  },
  {
    id: "c6",
    contato: "Renata Peixoto",
    empresa: "Itaú",
    quando: "23 de jul.",
    nota: 9.8,
    destaque: "Objeção de prazo reenquadrada sem ceder preço.",
  },
  {
    id: "c7",
    contato: "Lucas Peixoto",
    empresa: "VENDE-C",
    quando: "24 de jul.",
    nota: 9.5,
    destaque: "Ritmo bom; encerrou confirmando critérios de decisão.",
  },
];

const objecoes: Objecao[] = [
  {
    id: "o1",
    titulo: "Preço acima do orçamento",
    fala: "“Está bem acima do que planejamos investir este ano.”",
    rodadas: 12,
  },
  {
    id: "o2",
    titulo: "Já usa um concorrente",
    fala: "“Já usamos outra ferramenta há três anos e funciona.”",
    rodadas: 8,
  },
  {
    id: "o3",
    titulo: "Sem urgência",
    fala: "“Faz sentido, mas vamos retomar no próximo trimestre.”",
    rodadas: 5,
  },
  {
    id: "o4",
    titulo: "Não é o decisor",
    fala: "“Eu levo internamente e te dou um retorno.”",
    rodadas: 4,
  },
  {
    id: "o5",
    titulo: "Pressão por desconto",
    fala: "“Se cobrir a proposta do concorrente, a gente fecha hoje.”",
    rodadas: 3,
  },
];

const cenarios: CenarioTreino[] = [
  {
    id: "t1",
    titulo: "Primeira reunião de diagnóstico",
    perfil: "Diretora de operações, pouca paciência",
    nivel: "Intermediário",
  },
  {
    id: "t2",
    titulo: "Apresentação de proposta",
    perfil: "Comitê com financeiro presente",
    nivel: "Difícil",
  },
  {
    id: "t3",
    titulo: "Retomada de negócio parado",
    perfil: "Contato sumido há 30 dias",
    nivel: "Intermediário",
  },
  {
    id: "t4",
    titulo: "Prospecção por indicação",
    perfil: "Contato aberto, mas sem tempo",
    nivel: "Fácil",
  },
];

const treino: ResumoTreino = {
  total: 9,
  media: 2.9,
  evolucao: [1.8, 2.1, 1.9, 2.4, 2.2, 2.6, 3.1, 2.8, 2.9],
};

const equipe: MembroEquipe[] = [
  {
    id: "e1",
    nome: "Mariana Peixoto",
    preparacoes: 14,
    calls: 9,
    treinos: 12,
    media: 8.4,
  },
  {
    id: "e2",
    nome: "Lucas Peixoto",
    preparacoes: 11,
    calls: 7,
    treinos: 9,
    media: 5.9,
  },
  {
    id: "e3",
    nome: "Elias Choi",
    preparacoes: 8,
    calls: 6,
    treinos: 4,
    media: 5.2,
  },
  {
    id: "e4",
    nome: "Denis Rocha",
    preparacoes: 5,
    calls: 3,
    treinos: 2,
    media: 4.1,
  },
  {
    id: "e5",
    nome: "Renata Peixoto",
    preparacoes: 3,
    calls: 1,
    treinos: 0,
    media: 3.4,
  },
];

const produtos = [
  "VENDE-C PASS",
  "VENDE-C CORP",
  "VENDE-C PASS + VENDE-C CORP",
  "Mentoria individual",
];

/* ===========================================================================
   Resultado do Preparador de Reunião
   O formato é o contrato com o motor de IA: cada campo tem um trabalho claro
   na tela, e nada é um parágrafo solto. Frases curtas viram destaque; o texto
   longo fica guardado atrás de "ler completo".
   =========================================================================== */

export type EtapaRoteiro = {
  id: string;
  titulo: string;
  minutos: number;
  objetivo: string;
  perguntas: { pergunta: string; revela: string }[];
};

export type PreparacaoResultado = {
  id: string;
  contato: string;
  cargo: string;
  empresa: string;
  produtos: string[];
  duracaoMin: number;
  etapa: string;
  geradaEm: string;

  /** As três respostas que o vendedor precisa antes de entrar na chamada. */
  dor: { frase: string; porque: string; abertura: string };
  foco: { frase: string; pontos: string[]; completo: string };
  proximoPasso: string;

  contexto: { pontos: string[]; completo: string };
  roteiro: EtapaRoteiro[];
  frases: { frase: string; porque: string }[];
  objecoes: { id: string; fala: string; porque: string }[];
  checklist: string[];
};

const preparacaoExemplo: PreparacaoResultado = {
  id: "p1",
  contato: "José Francisco Peixoto",
  cargo: "Dono",
  empresa: "Renovação Engenharia",
  produtos: ["VENDE-C CORP", "VENDE-C PASS"],
  duracaoMin: 45,
  etapa: "Diagnóstico",
  geradaEm: "hoje, 08:42",

  dor: {
    frase:
      "A empresa depende do José para fechar contrato complexo e manter a operação comercial rodando.",
    porque:
      "Ele é o dono e a empresa vende manutenção de ar-condicionado predial — venda técnica que quase sempre passa pela figura do fundador.",
    abertura:
      "Como você lida hoje com a venda de novos contratos quando precisa dividir o tempo entre a gestão da engenharia e a prospecção?",
  },
  foco: {
    frase:
      "Tirar a venda do bolso do dono — CORP instala, PASS mantém rodando.",
    pontos: [
      "CORP desenha e executa o treinamento sob medida, alinhando a operação técnica ao processo comercial.",
      "PASS mantém o motor girando, com estímulo contínuo e formação para líderes e equipe.",
    ],
    completo:
      "Apresentar a união do VENDE-C CORP com o VENDE-C PASS como a solução definitiva para tirar a venda do bolso do José e estruturar a Renovação Engenharia de ponta a ponta. O CORP entra desenhando e executando o treinamento sob medida para alinhar a operação técnica de manutenção ao processo comercial real, enquanto o PASS mantém o motor rodando com estímulos contínuos e formação paralela para líderes e equipe. Juntos, entregam o que falta no negócio: método prático aplicado por quem vende de verdade, garantindo que a equipe execute com padrão e previsibilidade sem depender dele o tempo todo.",
  },
  proximoPasso:
    "Agendar uma sessão de alinhamento com os gestores para apresentar a proposta formalizada.",

  contexto: {
    pontos: [
      "Manutenção predial vive de contrato recorrente — previsibilidade é o produto.",
      "É o dono na linha de frente: a venda ainda depende da energia pessoal dele.",
      "Sem processo padronizado, a empresa fica refém da oscilação de mercado.",
      "Falta cadência na venda técnica e desenvolvimento contínuo da equipe.",
    ],
    completo:
      "O mercado de manutenção predial exige constância e previsibilidade em contratos recorrentes, mas as empresas desse setor costumam sofrer com equipes operando sem método estruturado. José Francisco está na linha de frente como dono da Renovação Engenharia, o que indica que a operação comercial ainda depende diretamente da sua energia pessoal para fechar contratos. Sem um processo padronizado e desenvolvimento contínuo, a empresa acaba refém da oscilação de mercado e da falta de cadência na venda técnica. O desafio central é tirar o peso dos ombros do fundador, instalando um modelo que funcione todos os dias.",
  },

  roteiro: [
    {
      id: "abertura",
      titulo: "Abertura",
      minutos: 5,
      objetivo:
        "Combinar o objetivo da conversa e ganhar permissão para investigar.",
      perguntas: [
        {
          pergunta:
            "Como você lida hoje com a venda de novos contratos quando precisa dividir o tempo entre a engenharia e a prospecção?",
          revela: "Abre a dor central sem acusar ninguém.",
        },
      ],
    },
    {
      id: "diagnostico",
      titulo: "Diagnóstico",
      minutos: 18,
      objetivo: "Medir o tamanho da dependência e o custo dela.",
      perguntas: [
        {
          pergunta:
            "De que forma sua equipe comercial transmite o valor técnico da manutenção sem precisar acionar você para fechar?",
          revela:
            "Mostra o grau de autonomia do time em negociações complexas.",
        },
        {
          pergunta:
            "Quantos contratos você perdeu no último semestre por não conseguir estar presente na negociação?",
          revela:
            "Quantifica o custo da dependência — vira argumento no fechamento.",
        },
        {
          pergunta:
            "Como o time é treinado hoje quando entra alguém novo na equipe técnica?",
          revela: "Expõe a ausência de método e a informalidade da formação.",
        },
      ],
    },
    {
      id: "valor",
      titulo: "Valor",
      minutos: 14,
      objetivo: "Conectar CORP + PASS à dor que ele acabou de descrever.",
      perguntas: [
        {
          pergunta:
            "Se a equipe fechasse dois contratos por mês sem você na sala, o que mudaria na sua rotina?",
          revela: "Faz o cliente dimensionar o ganho com as palavras dele.",
        },
      ],
    },
    {
      id: "fechamento",
      titulo: "Fechamento",
      minutos: 8,
      objetivo: "Sair com data marcada, não com “vou pensar”.",
      perguntas: [
        {
          pergunta:
            "Quem mais precisa estar na sala quando eu apresentar a proposta formalizada?",
          revela: "Mapeia os decisores e cria o próximo passo naturalmente.",
        },
      ],
    },
  ],

  frases: [
    {
      frase:
        "Nós trazemos professores que operam no campo todo dia, sem teoria vazia, para instalar um processo comercial que funciona sem depender da sua presença constante.",
      porque:
        "Mostra que a solução é prática, testada em centenas de operações e focada em dar autonomia ao empresário.",
    },
    {
      frase:
        "O investimento total de duzentos e sessenta e seis mil reais no pacote combinado estrutura desde a base dos processos até a evolução contínua da equipe por um ano inteiro.",
      porque:
        "Ancora o valor global do projeto no pacote completo, resolvendo o problema de raiz.",
    },
  ],

  objecoes: [
    {
      id: "o1",
      fala: "O investimento total de duzentos e sessenta e seis mil reais está pesado para o nosso caixa neste momento.",
      porque:
        "Some dois produtos de ticket alto numa empresa de porte médio onde o caixa é gerido de perto pelo dono.",
    },
    {
      id: "o2",
      fala: "Nossa equipe técnica e comercial já tem uma rotina corrida na rua, não sei se teriam tempo para um programa contínuo.",
      porque:
        "Reflexo direto de uma operação de manutenção focada no curto prazo e na urgência diária.",
    },
    {
      id: "o3",
      fala: "Já fizemos treinamento antes e a equipe voltou a fazer do jeito antigo em dois meses.",
      porque:
        "Experiência anterior com curso solto, sem instalação de processo nem acompanhamento.",
    },
  ],

  checklist: [
    "Não vender curso isolado nem palestra motivacional — o assunto é processo instalado.",
    "Mostrar as três camadas da empresa que o método atravessa para gerar receita previsível.",
    "Conectar cada entrega à dor de sobrecarga dele como fundador, não a funcionalidades.",
    "Fechar com a sessão de alinhamento agendada, com os gestores presentes.",
  ],
};

export function getMembro() {
  return membro;
}
export function getPreparacoes() {
  return preparacoes;
}
export function getCalls() {
  return calls;
}
export function getObjecoes() {
  return objecoes;
}
export function getCenarios() {
  return cenarios;
}
export function getTreino() {
  return treino;
}
export function getEquipe() {
  return equipe;
}
export function getProdutos() {
  return produtos;
}
export function getPreparacaoResultado() {
  return preparacaoExemplo;
}

/** Faixa da nota. O rótulo textual acompanha a cor em toda a interface. */
export function faixaNota(nota: number): {
  tom: "good" | "mid" | "low";
  cor: string;
  rotulo: string;
} {
  if (nota >= 8)
    return { tom: "good", cor: "var(--score-good)", rotulo: "boa" };
  if (nota >= 5)
    return { tom: "mid", cor: "var(--score-mid)", rotulo: "atenção" };
  return { tom: "low", cor: "var(--score-low)", rotulo: "revisar" };
}
