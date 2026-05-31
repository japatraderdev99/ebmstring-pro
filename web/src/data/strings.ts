/**
 * EBM String Pro — Catálogo de Performance
 *
 * Cada corda é avaliada em 6 eixos (0–100) que alimentam o radar hexagonal
 * e o motor de recomendação do String Finder:
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

export type PlayStyle = "controle" | "agressivo" | "all-court" | "potencia";
export type Level = "iniciante" | "intermediario" | "avancado" | "competitivo";
export type StringType = "poliester" | "multifilamento" | "hibrido" | "natural";

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
    colors: ["Verde", "Cinza"],
    attrs: { power: 74, spin: 76, control: 80, durability: 72, comfort: 66, tension: 82 },
    bestFor: ["all-court", "controle"],
    levels: ["intermediario", "avancado"],
    blurb:
      "Um clássico europeu que combina toque macio, boa manutenção de tensão e versatilidade. Agrada do intermediário ao avançado.",
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
];

export const ATTRS: Attr[] = ["power", "spin", "control", "durability", "comfort", "tension"];

export function getString(id: string): StringModel | undefined {
  return STRINGS.find((s) => s.id === id);
}

/**
 * Cordas com foto macro real disponível em /public/strings/<id>.jpg.
 * (Wilson Poly Pro ainda sem foto correspondente — exibe só o radar.)
 */
const STRINGS_WITH_PHOTOS = new Set<string>([
  "sigma-poly-black",
  "sigma-poly-spin",
  "gamma-poly-z",
  "head-sonic-pro",
  "head-lynx-tour",
  "signum-pro-poly-plasma",
  "yonex-polytour-spin",
  "yonex-polytour-air",
  "solinco-hyper-g",
]);

export function stringImage(id: string): string | null {
  return STRINGS_WITH_PHOTOS.has(id) ? `/strings/${id}.jpg` : null;
}
