/**
 * EBM String Pro — Catálogo de Performance
 *
 * Cada corda é avaliada em 6 eixos (0–100) que alimentam as barras de
 * performance (5 blocos de 20 pts) e o motor de recomendação do String Finder:
 *   power      — potência / devolução de energia
 *   spin       — capacidade de gerar giro (snap-back, perfil)
 *   control    — controle / previsibilidade
 *   durability — resistência ao desgaste e quebra
 *   comfort    — conforto / suavidade no braço
 *   tension    — manutenção de tensão ao longo do tempo
 */

export type Attr = "power" | "spin" | "control" | "durability" | "comfort" | "tension";

export const ATTR_LABELS: Record<Attr, { short: string; label: string }> = {
  power: { short: "POT", label: "Potência" },
  spin: { short: "SPN", label: "Spin" },
  control: { short: "CTL", label: "Controle" },
  durability: { short: "DUR", label: "Durabilidade" },
  comfort: { short: "CFT", label: "Conforto" },
  tension: { short: "TEN", label: "Tensão" },
};

/** Explicação didática de cada eixo (guia de leitura do catálogo e das artes). */
export const ATTR_HELP: Record<Attr, string> = {
  power: "Quanta energia a corda devolve à bola. Mais barras = bola sai mais rápida e profunda com menos esforço.",
  spin: "Facilidade de gerar giro. Mais barras = mais topspin e slice, bola cai mais rápido na quadra.",
  control: "Previsibilidade e precisão da direção e profundidade. Mais barras = mais bolas dentro, mesmo batendo forte.",
  durability: "Resistência ao desgaste e à quebra. Mais barras = a corda aguenta mais jogos antes de trocar.",
  comfort: "Suavidade no braço e na raquete. Mais barras = menos vibração e impacto no cotovelo e no ombro.",
  tension: "Quanto a corda segura a tensão ao longo do tempo. Mais barras = o jogo fica constante por mais semanas.",
};

export type PlayStyle = "controle" | "agressivo" | "all-court" | "potencia";
export type Level = "iniciante" | "intermediario" | "avancado" | "competitivo";
export type StringType = "poliester" | "multifilamento" | "nylon" | "hibrido" | "natural";

export interface StringModel {
  id: string;
  brand: string;
  name: string;
  tagline: string;
  type: StringType;
  material: string;
  shape: string;
  gauges: string[];
  tensionRec: [number, number]; // lbs
  priceBRL: number;
  armFriendly: boolean;
  colors: string[];
  attrs: Record<Attr, number>;
  bestFor: PlayStyle[];
  levels: Level[];
  blurb: string;
  /** false = fora de estoque (não recomendada no Finder, não vai pro PDF). */
  available?: boolean;
}

export const STRINGS: StringModel[] = [
  {
    id: "sigma-poly-black",
    brand: "Sigma",
    name: "Poly Black",
    tagline: "Controle elegante · custo-benefício",
    type: "poliester",
    material: "Co-poliéster",
    shape: "Redonda",
    gauges: ["1.25mm / 16L", "1.30mm / 16"],
    tensionRec: [46, 56],
    priceBRL: 50.0,
    armFriendly: false,
    colors: ["Preto"],
    attrs: { power: 66, spin: 72, control: 82, durability: 70, comfort: 56, tension: 68 },
    bestFor: ["controle", "all-court"],
    levels: ["iniciante", "intermediario", "avancado"],
    blurb:
      "Entra forte no custo-benefício: controle de poli premium por uma fração do preço. Porta de entrada ideal para o mundo do poliéster.",
    available: false,
  },
  {
    id: "sigma-poly-spin",
    brand: "Sigma",
    name: "Poly Spin",
    tagline: "Mordida agressiva · giro de sobra",
    type: "poliester",
    material: "Co-poliéster perfilado",
    shape: "Perfilada",
    gauges: ["1.25mm / 16L"],
    tensionRec: [45, 55],
    priceBRL: 50.0,
    armFriendly: false,
    colors: ["Lima", "Preto"],
    attrs: { power: 70, spin: 90, control: 78, durability: 66, comfort: 50, tension: 64 },
    bestFor: ["agressivo"],
    levels: ["intermediario", "avancado"],
    blurb:
      "Perfil agressivo focado em giro. Para o jogador de fundo que vive de topspin e quer spin de elite gastando pouco.",
    available: false,
  },
  {
    id: "gamma-poly-z",
    brand: "Gamma",
    name: "Poly Z",
    tagline: "Resposta durável · controle firme",
    type: "poliester",
    material: "Co-poliéster",
    shape: "Redonda",
    gauges: ["1.25mm / 16L", "1.30mm / 16"],
    tensionRec: [48, 58],
    priceBRL: 55.0,
    armFriendly: false,
    colors: ["Azul", "Prata"],
    attrs: { power: 68, spin: 70, control: 84, durability: 80, comfort: 54, tension: 72 },
    bestFor: ["controle", "all-court"],
    levels: ["intermediario", "avancado"],
    blurb:
      "Durabilidade acima da média com controle firme. Para quem arrebenta corda rápido e não quer reencordoar toda semana.",
  },
  {
    id: "babolat-syn-gut",
    brand: "Babolat",
    name: "Syn Gut",
    tagline: "Conforto e potência · porta de entrada",
    type: "nylon",
    material: "Nylon (synthetic gut)",
    shape: "Redonda",
    gauges: ["1.25mm / 17", "1.30mm / 16"],
    tensionRec: [50, 60],
    priceBRL: 75.0,
    armFriendly: true,
    colors: ["Natural", "Preto", "Azul"],
    attrs: { power: 80, spin: 52, control: 60, durability: 56, comfort: 84, tension: 60 },
    bestFor: ["potencia", "all-court"],
    levels: ["iniciante", "intermediario"],
    blurb:
      "Nylon macio e equilibrado: conforto, potência e toque agradável. A escolha certa para iniciantes, retorno ao tênis ou braços sensíveis a cordas rígidas.",
  },
  {
    id: "wilson-poly-pro",
    brand: "Wilson",
    name: "Poly Pro",
    tagline: "Controle confiável · durabilidade",
    type: "poliester",
    material: "Co-poliéster",
    shape: "Redonda",
    gauges: ["1.25mm / 16L", "1.30mm / 16"],
    tensionRec: [48, 58],
    priceBRL: 80.0,
    armFriendly: false,
    colors: ["Preto", "Prata"],
    attrs: { power: 66, spin: 70, control: 82, durability: 80, comfort: 52, tension: 70 },
    bestFor: ["controle", "all-court"],
    levels: ["intermediario", "avancado"],
    blurb:
      "O poliéster de controle da Wilson: resposta firme, previsível e durável. Cavalo de batalha confiável para o jogo do dia a dia.",
  },
  {
    id: "head-sonic-pro",
    brand: "Head",
    name: "Sonic Pro",
    tagline: "Durabilidade · controle de fundo",
    type: "poliester",
    material: "Co-poliéster",
    shape: "Redonda",
    gauges: ["1.25mm / 16L", "1.30mm / 16"],
    tensionRec: [50, 60],
    priceBRL: 90.0,
    armFriendly: false,
    colors: ["Preto", "Branco"],
    attrs: { power: 66, spin: 68, control: 82, durability: 86, comfort: 52, tension: 70 },
    bestFor: ["controle", "all-court"],
    levels: ["intermediario", "avancado"],
    blurb:
      "Um dos polis mais duráveis da categoria. Resposta firme e controlada para quem joga muito e quer constância sem trocar corda toda hora.",
  },
  {
    id: "head-lynx-tour",
    brand: "Head",
    name: "Lynx Tour",
    tagline: "Precisão + durabilidade",
    type: "poliester",
    material: "Co-poliéster heptagonal",
    shape: "Heptagonal",
    gauges: ["1.25mm / 16L", "1.30mm / 16"],
    tensionRec: [44, 54],
    priceBRL: 90.0,
    armFriendly: false,
    colors: ["Champanhe", "Cinza"],
    attrs: { power: 64, spin: 80, control: 88, durability: 82, comfort: 54, tension: 76 },
    bestFor: ["controle", "all-court"],
    levels: ["intermediario", "avancado", "competitivo"],
    blurb:
      "Heptagonal de baixa potência para quem busca controle cirúrgico e durabilidade. Resposta seca e precisa do começo ao fim.",
  },
  {
    id: "yonex-polytour-pro",
    brand: "Yonex",
    name: "PolyTour Pro",
    tagline: "Poli macio all-around · manutenção de tensão",
    type: "poliester",
    material: "Co-poliéster (SIF)",
    shape: "Redonda",
    gauges: ["1.25mm / 16L", "1.30mm / 16"],
    tensionRec: [45, 55],
    priceBRL: 100.0,
    armFriendly: false,
    colors: ["Amarelo", "Azul", "Preto"],
    attrs: { power: 72, spin: 74, control: 84, durability: 78, comfort: 70, tension: 88 },
    bestFor: ["all-court", "controle"],
    levels: ["intermediario", "avancado", "competitivo"],
    blurb:
      "O poli all-around da Yonex: toque macio, ótima manutenção de tensão (tech SIF) e controle consistente do fundo de quadra. Versátil e durável para quem joga muito.",
  },
  {
    id: "signum-pro-poly-plasma",
    brand: "Signum Pro",
    name: "Poly Plasma",
    tagline: "Ícone europeu · manutenção de tensão",
    type: "poliester",
    material: "Co-poliéster",
    shape: "Redonda",
    gauges: ["1.23mm / 17", "1.28mm / 16L"],
    tensionRec: [46, 56],
    priceBRL: 100.0,
    armFriendly: true,
    available: false,
    colors: ["Verde", "Cinza"],
    attrs: { power: 74, spin: 76, control: 80, durability: 72, comfort: 66, tension: 82 },
    bestFor: ["all-court", "controle"],
    levels: ["intermediario", "avancado"],
    blurb:
      "Um clássico europeu que combina toque macio, boa manutenção de tensão e versatilidade. Agrada do intermediário ao avançado.",
  },
  {
    id: "signum-pro-tornado",
    brand: "Signum Pro",
    name: "Tornado",
    tagline: "Spin em espiral · tensão que dura",
    type: "poliester",
    material: "Co-poliéster torcido",
    shape: "Heptagonal torcida",
    gauges: ["1.30mm / 16"],
    tensionRec: [42, 52],
    priceBRL: 110.0,
    armFriendly: false,
    colors: ["Preto"],
    attrs: { power: 74, spin: 92, control: 82, durability: 78, comfort: 62, tension: 84 },
    bestFor: ["agressivo", "all-court"],
    levels: ["avancado", "competitivo"],
    blurb:
      "Perfil heptagonal torcido em espiral que agarra a bola e dispara o giro, com potência controlada e ótima manutenção de tensão. Pede ~10% menos libras que um poli comum.",
  },
  {
    id: "yonex-polytour-spin",
    brand: "Yonex",
    name: "PolyTour Spin",
    tagline: "Spin agressivo · perfil hexagonal",
    type: "poliester",
    material: "Co-poliéster hexagonal",
    shape: "Hexagonal",
    gauges: ["1.20mm / 18", "1.25mm / 16L"],
    tensionRec: [45, 55],
    priceBRL: 120.0,
    armFriendly: false,
    colors: ["Cobalto", "Amarelo"],
    attrs: { power: 70, spin: 88, control: 82, durability: 76, comfort: 58, tension: 80 },
    bestFor: ["agressivo", "all-court"],
    levels: ["avancado", "competitivo"],
    blurb:
      "O perfil hexagonal da Yonex morde a bola e dispara o giro, sem abrir mão do controle e com excelente manutenção de tensão.",
  },
  {
    id: "yonex-polytour-air",
    brand: "Yonex",
    name: "PolyTour Air",
    tagline: "Leve e macia · spin com conforto",
    type: "poliester",
    material: "Co-poliéster macio (Air)",
    shape: "Redonda",
    gauges: ["1.20mm / 18", "1.25mm / 16L"],
    tensionRec: [42, 52],
    priceBRL: 120.0,
    armFriendly: true,
    colors: ["Sky Blue"],
    attrs: { power: 78, spin: 80, control: 76, durability: 60, comfort: 80, tension: 74 },
    bestFor: ["all-court", "potencia"],
    levels: ["intermediario", "avancado"],
    blurb:
      "O poli mais leve e macio da Yonex. Combina giro fácil, potência e conforto — ótima escolha de poliéster para braços sensíveis.",
  },
  {
    id: "solinco-hyper-g",
    brand: "Solinco",
    name: "Hyper-G",
    tagline: "Mordida + potência controlada",
    type: "poliester",
    material: "Co-poliéster quadrado",
    shape: "Quadrada",
    gauges: ["1.20mm / 18", "1.25mm / 16L", "1.30mm / 16"],
    tensionRec: [45, 55],
    priceBRL: 120.0,
    armFriendly: false,
    colors: ["Verde"],
    attrs: { power: 75, spin: 88, control: 84, durability: 74, comfort: 52, tension: 70 },
    bestFor: ["agressivo", "all-court"],
    levels: ["intermediario", "avancado", "competitivo"],
    blurb:
      "Cult favorite. O perfil quadrado entrega spin e controle numa corda que ainda dá um plus de potência. Equilíbrio raro.",
  },
  {
    id: "head-rip-control",
    brand: "Head",
    name: "RIP Control",
    tagline: "Multifilamento de controle · toque macio",
    type: "multifilamento",
    material: "Multifilamento (nylon + poliolefina)",
    shape: "Trançada",
    gauges: ["1.25mm / 17"],
    tensionRec: [50, 58],
    priceBRL: 120.0,
    armFriendly: true,
    colors: ["Natural", "Preto", "Branco"],
    attrs: { power: 70, spin: 66, control: 80, durability: 52, comfort: 82, tension: 62 },
    bestFor: ["controle", "all-court"],
    levels: ["intermediario", "avancado"],
    blurb:
      "Um multifilamento fora do comum: toque amortecido, muito conforto e controle acima da média da categoria. Para quem quer sentir a bola sem castigar o braço.",
  },
  {
    id: "yonex-polytour-strike",
    brand: "Yonex",
    name: "PolyTour Strike",
    tagline: "Poli firme e durável · controle com giro",
    type: "poliester",
    material: "Co-poliéster",
    shape: "Redonda",
    gauges: ["1.25mm / 16L"],
    tensionRec: [45, 55],
    priceBRL: 130.0,
    armFriendly: false,
    colors: ["Azul", "Cinza", "Preto"],
    attrs: { power: 72, spin: 78, control: 84, durability: 82, comfort: 64, tension: 80 },
    bestFor: ["controle", "all-court"],
    levels: ["intermediario", "avancado", "competitivo"],
    blurb:
      "Poliéster firme, de controle consistente e muita durabilidade. Ótima para quem arrebenta corda e quer previsibilidade.",
  },
  {
    id: "solinco-confidential-soft",
    brand: "Solinco",
    name: "Confidential Soft",
    tagline: "Mordida do quadrado · versão macia",
    type: "poliester",
    material: "Co-poliéster com agentes amaciantes",
    shape: "Quadrada",
    gauges: ["1.25mm / 16L"],
    tensionRec: [44, 54],
    priceBRL: 150.0,
    armFriendly: true,
    colors: ["Rosa elétrico"],
    attrs: { power: 78, spin: 86, control: 80, durability: 72, comfort: 70, tension: 68 },
    bestFor: ["agressivo", "all-court"],
    levels: ["intermediario", "avancado", "competitivo"],
    blurb:
      "A versão mais macia e viva da Confidential: mantém a mordida do perfil quadrado, com mais conforto e pop. Spin generoso sem a secura do poli tradicional.",
  },
  {
    id: "yonex-polytour-force",
    brand: "Yonex",
    name: "PolyTour Force",
    tagline: "Potência em poli · edição João Fonseca",
    type: "poliester",
    material: "Co-poliéster",
    shape: "Redonda",
    gauges: ["1.25mm / 16L"],
    tensionRec: [44, 54],
    priceBRL: 160.0,
    armFriendly: false,
    colors: ["Vermelho rubi", "Preto"],
    attrs: { power: 86, spin: 78, control: 74, durability: 70, comfort: 72, tension: 78 },
    bestFor: ["potencia", "agressivo", "all-court"],
    levels: ["avancado", "competitivo"],
    blurb:
      "O poli mais explosivo da Yonex: bola que sai rápido e profunda, com tensão estável e toque mais perdoador. Para swings médios a rápidos que querem potência sem perder o controle.",
  },
];

export const ATTRS: Attr[] = ["power", "spin", "control", "durability", "comfort", "tension"];

export function getString(id: string): StringModel | undefined {
  return STRINGS.find((s) => s.id === id);
}

/**
 * Cordas com foto macro disponível em /public/strings/<id>.jpg.
 * (Todas as cordas do catálogo possuem foto.)
 */
const STRINGS_WITH_PHOTOS = new Set<string>([
  "sigma-poly-black",
  "sigma-poly-spin",
  "gamma-poly-z",
  "babolat-syn-gut",
  "wilson-poly-pro",
  "head-sonic-pro",
  "head-lynx-tour",
  "yonex-polytour-pro",
  "signum-pro-poly-plasma",
  "yonex-polytour-spin",
  "yonex-polytour-air",
  "solinco-hyper-g",
  "signum-pro-tornado",
  "head-rip-control",
  "yonex-polytour-strike",
  "solinco-confidential-soft",
  "yonex-polytour-force",
]);

export function stringImage(id: string): string | null {
  return STRINGS_WITH_PHOTOS.has(id) ? `/strings/${id}.jpg` : null;
}

/** Logos de marca (PNG com alpha) para tratamento monocromático nos cards. */
const BRAND_LOGOS: Record<string, string> = {
  Wilson: "/brands/wilson.png",
  Head: "/brands/head.png",
  Yonex: "/brands/yonex.png",
  Solinco: "/brands/solinco.png",
  Babolat: "/brands/babolat.png",
};

export function brandLogo(brand: string): string | null {
  return BRAND_LOGOS[brand] ?? null;
}
