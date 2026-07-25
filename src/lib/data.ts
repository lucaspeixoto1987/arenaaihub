/**
 * Camada de dados de demonstração.
 *
 * Tudo aqui é síncrono e estático de propósito: o painel já consome os tipos
 * finais, então trocar por API/banco depois é substituir o corpo das funções
 * `get*` sem tocar na interface.
 */

export type Seller = {
  name: string;
  role: string;
  team: string;
  quotaAttainment: number; // 0–100
};

export type TrendPoint = {
  /** Rótulo curto do período (ex.: "S-11"). */
  label: string;
  value: number;
};

export type Kpi = {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent";
  /** Variação percentual contra o período nomeado em `deltaPeriod`. */
  delta: number;
  deltaPeriod: string;
  /** Se subir é bom. Define a direção da leitura, não a cor sozinha. */
  higherIsBetter: boolean;
  trend: TrendPoint[];
  unitSuffix?: string;
};

export type MeetingStage =
  | "Descoberta"
  | "Diagnóstico"
  | "Proposta"
  | "Negociação"
  | "Fechamento";

export type PrepStatus = "pronto" | "parcial" | "pendente";

export type Meeting = {
  id: string;
  time: string;
  day: "hoje" | "amanhã";
  durationMin: number;
  contact: string;
  contactRole: string;
  company: string;
  stage: MeetingStage;
  dealValue: number;
  prep: PrepStatus;
  /** Sinal mais relevante que a preparação já levantou. */
  signal?: string;
};

export type FunnelStage = {
  label: string;
  deals: number;
  value: number;
};

export type CallReview = {
  id: string;
  company: string;
  contact: string;
  when: string;
  score: number; // 0–100
  headline: string;
  /** Ponto de atenção principal, sempre em texto — cor nunca carrega sozinha. */
  risk?: string;
};

export type Drill = {
  id: string;
  label: string;
  /** Objeção mais recorrente ligada ao drill. */
  objection: string;
  sessions: number;
  mastery: number; // 0–100
};

export type ActivityItem = {
  id: string;
  kind: "preparacao" | "analise" | "treino";
  title: string;
  detail: string;
  when: string;
};

const seller: Seller = {
  name: "Lucas Peixoto",
  role: "Account Executive",
  team: "Enterprise · Sudeste",
  quotaAttainment: 78,
};

const kpis: Kpi[] = [
  {
    id: "reunioes",
    label: "Reuniões na semana",
    value: 14,
    format: "number",
    delta: 16.7,
    deltaPeriod: "vs. semana anterior",
    higherIsBetter: true,
    trend: [
      { label: "S-11", value: 8 },
      { label: "S-10", value: 9 },
      { label: "S-9", value: 7 },
      { label: "S-8", value: 11 },
      { label: "S-7", value: 10 },
      { label: "S-6", value: 12 },
      { label: "S-5", value: 9 },
      { label: "S-4", value: 13 },
      { label: "S-3", value: 11 },
      { label: "S-2", value: 12 },
      { label: "S-1", value: 12 },
      { label: "Atual", value: 14 },
    ],
  },
  {
    id: "conversao",
    label: "Taxa de conversão",
    value: 32,
    format: "percent",
    delta: 4.2,
    deltaPeriod: "vs. trimestre anterior",
    higherIsBetter: true,
    trend: [
      { label: "S-11", value: 24 },
      { label: "S-10", value: 26 },
      { label: "S-9", value: 25 },
      { label: "S-8", value: 27 },
      { label: "S-7", value: 26 },
      { label: "S-6", value: 29 },
      { label: "S-5", value: 28 },
      { label: "S-4", value: 30 },
      { label: "S-3", value: 29 },
      { label: "S-2", value: 31 },
      { label: "S-1", value: 30 },
      { label: "Atual", value: 32 },
    ],
  },
  {
    id: "ticket",
    label: "Ticket médio",
    value: 48200,
    format: "currency",
    delta: -3.1,
    deltaPeriod: "vs. trimestre anterior",
    higherIsBetter: true,
    trend: [
      { label: "S-11", value: 51000 },
      { label: "S-10", value: 50200 },
      { label: "S-9", value: 52400 },
      { label: "S-8", value: 49800 },
      { label: "S-7", value: 50100 },
      { label: "S-6", value: 48900 },
      { label: "S-5", value: 49600 },
      { label: "S-4", value: 47800 },
      { label: "S-3", value: 49100 },
      { label: "S-2", value: 48400 },
      { label: "S-1", value: 49700 },
      { label: "Atual", value: 48200 },
    ],
  },
  {
    id: "ciclo",
    label: "Ciclo de venda",
    value: 38,
    format: "number",
    unitSuffix: "dias",
    delta: -9.5,
    deltaPeriod: "vs. trimestre anterior",
    higherIsBetter: false,
    trend: [
      { label: "S-11", value: 47 },
      { label: "S-10", value: 46 },
      { label: "S-9", value: 48 },
      { label: "S-8", value: 45 },
      { label: "S-7", value: 44 },
      { label: "S-6", value: 45 },
      { label: "S-5", value: 43 },
      { label: "S-4", value: 41 },
      { label: "S-3", value: 42 },
      { label: "S-2", value: 40 },
      { label: "S-1", value: 39 },
      { label: "Atual", value: 38 },
    ],
  },
];

const meetings: Meeting[] = [
  {
    id: "m1",
    time: "09:30",
    day: "hoje",
    durationMin: 45,
    contact: "Marina Duarte",
    contactRole: "Diretora de Operações",
    company: "Vetorial Log",
    stage: "Diagnóstico",
    dealValue: 62000,
    prep: "pronto",
    signal: "Trocou de ERP há 2 meses — dor de integração está fresca.",
  },
  {
    id: "m2",
    time: "11:00",
    day: "hoje",
    durationMin: 30,
    contact: "Rafael Nogueira",
    contactRole: "Head Comercial",
    company: "Grupo Tarrafa",
    stage: "Proposta",
    dealValue: 94500,
    prep: "parcial",
    signal:
      "Comparando com concorrente direto; sensível a prazo de implantação.",
  },
  {
    id: "m3",
    time: "15:00",
    day: "hoje",
    durationMin: 60,
    contact: "Camila Rezende",
    contactRole: "CFO",
    company: "Núcleo Saúde",
    stage: "Negociação",
    dealValue: 148000,
    prep: "pendente",
    signal: "Aprovação de budget passa pelo conselho na próxima terça.",
  },
  {
    id: "m4",
    time: "10:15",
    day: "amanhã",
    durationMin: 45,
    contact: "Eduardo Lins",
    contactRole: "Gerente de TI",
    company: "Praia Azul Hotéis",
    stage: "Descoberta",
    dealValue: 38000,
    prep: "pendente",
  },
];

const funnel: FunnelStage[] = [
  { label: "Descoberta", deals: 26, value: 890000 },
  { label: "Diagnóstico", deals: 17, value: 640000 },
  { label: "Proposta", deals: 9, value: 412000 },
  { label: "Negociação", deals: 5, value: 268000 },
];

const reviews: CallReview[] = [
  {
    id: "r1",
    company: "Vetorial Log",
    contact: "Marina Duarte",
    when: "ontem",
    score: 82,
    headline: "Boa descoberta de dor; fechamento sem próximo passo claro.",
    risk: "Nenhuma data combinada ao fim da chamada.",
  },
  {
    id: "r2",
    company: "Orbital Tech",
    contact: "Sérgio Paiva",
    when: "há 2 dias",
    score: 64,
    headline: "Objeção de preço apareceu cedo e não foi reenquadrada.",
    risk: "Desconto oferecido antes de reforçar valor.",
  },
  {
    id: "r3",
    company: "Casa Bonita",
    contact: "Juliana Alves",
    when: "há 3 dias",
    score: 91,
    headline:
      "Excelente condução: dor, impacto e critério de decisão mapeados.",
  },
];

const drills: Drill[] = [
  {
    id: "d1",
    label: "Objeção de preço",
    objection: "“Está acima do que planejamos investir.”",
    sessions: 12,
    mastery: 74,
  },
  {
    id: "d2",
    label: "Concorrente incumbente",
    objection: "“Já usamos outra ferramenta e funciona.”",
    sessions: 8,
    mastery: 58,
  },
  {
    id: "d3",
    label: "Sem urgência",
    objection: "“Vamos retomar no próximo trimestre.”",
    sessions: 5,
    mastery: 41,
  },
];

const activity: ActivityItem[] = [
  {
    id: "a1",
    kind: "preparacao",
    title: "Preparação concluída · Vetorial Log",
    detail: "8 pontos de pesquisa e 3 perguntas de diagnóstico sugeridas.",
    when: "há 20 min",
  },
  {
    id: "a2",
    kind: "analise",
    title: "Análise de chamada · Orbital Tech",
    detail: "Score 64 — objeção de preço tratada com desconto imediato.",
    when: "há 2 dias",
  },
  {
    id: "a3",
    kind: "treino",
    title: "Treino · Concorrente incumbente",
    detail: "6 rodadas de simulação, domínio subiu de 49% para 58%.",
    when: "há 3 dias",
  },
  {
    id: "a4",
    kind: "preparacao",
    title: "Preparação concluída · Casa Bonita",
    detail: "Mapa de decisores atualizado com 2 novos contatos.",
    when: "há 4 dias",
  },
];

export function getSeller() {
  return seller;
}
export function getKpis() {
  return kpis;
}
export function getMeetings() {
  return meetings;
}
export function getFunnel() {
  return funnel;
}
export function getReviews() {
  return reviews;
}
export function getDrills() {
  return drills;
}
export function getActivity() {
  return activity;
}
