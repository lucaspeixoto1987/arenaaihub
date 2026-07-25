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
