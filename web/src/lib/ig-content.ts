/** Conteúdo dos stories de destaque do Instagram (usado pelo gerador /ig). */

export type Story =
  | { kind: "intro"; kicker: string; big: string; note?: string }
  | { kind: "list"; kicker: string; title: string; items: string[] }
  | { kind: "steps"; kicker: string; title: string; steps: { n: string; t: string; d: string }[] }
  | { kind: "cta"; big: string; note: string };

export interface Highlight {
  icon: string;
  label: string;
  sub: string;
  stories: Story[];
}

export const HIGHLIGHTS: Record<string, Highlight> = {
  catalogo: {
    icon: "▦",
    label: "Catálogo",
    sub: "Cordas premium",
    stories: [
      { kind: "intro", kicker: "Catálogo EBM", big: "11 cordas premium, dissecadas em 6 eixos técnicos.", note: "Análise científica pra você escolher certo." },
      { kind: "list", kicker: "Pra controle", title: "Bola sempre dentro", items: ["Head Lynx Tour", "Wilson Poly Pro", "Sigma Poly Black"] },
      { kind: "list", kicker: "Pra spin", title: "Giro de elite", items: ["Solinco Hyper-G", "Yonex PolyTour Spin", "Sigma Poly Spin"] },
      { kind: "list", kicker: "Pra conforto", title: "Amigas do braço", items: ["Babolat Syn Gut", "Yonex PolyTour Air"] },
      { kind: "cta", big: "Veja o catálogo completo", note: "ebmstring.pro" },
    ],
  },
  finder: {
    icon: "✦",
    label: "Finder",
    sub: "Sua corda ideal",
    stories: [
      { kind: "intro", kicker: "EBM String Finder", big: "Não sabe qual corda usar? A gente resolve em 1 minuto.", note: "Grátis, no site." },
      { kind: "steps", kicker: "Como funciona", title: "5 perguntas", steps: [
        { n: "01", t: "Seu nível", d: "Do iniciante ao competitivo" },
        { n: "02", t: "Seu estilo", d: "Controle, spin, all-court ou potência" },
        { n: "03", t: "Sua prioridade", d: "O que mais importa pra você" },
      ] },
      { kind: "intro", kicker: "O resultado", big: "Top 3 de cordas com % de match e radar de aderência.", note: "Match científico com o seu jogo." },
      { kind: "cta", big: "Descubra sua corda agora", note: "ebmstring.pro" },
    ],
  },
  entrega: {
    icon: "⇄",
    label: "Busca & Entrega",
    sub: "Em Floripa",
    stories: [
      { kind: "intro", kicker: "O diferencial EBM", big: "Você não precisa sair de casa.", note: "Buscamos e entregamos a sua raquete." },
      { kind: "steps", kicker: "Como funciona", title: "Simples assim", steps: [
        { n: "01", t: "Agende", d: "Pelo WhatsApp, no horário que der" },
        { n: "02", t: "A gente busca", d: "Retiramos a sua raquete" },
        { n: "03", t: "Encordoamos", d: "Tensão calibrada + registro técnico" },
        { n: "04", t: "Entregamos", d: "Pronta pra jogar" },
      ] },
      { kind: "list", kicker: "Onde atendemos", title: "Floripa e região", items: ["Florianópolis", "São José", "Palhoça", "Biguaçu"] },
      { kind: "cta", big: "Agende sua coleta", note: "WhatsApp · +55 48 99203-4224" },
    ],
  },
  processo: {
    icon: "⊹",
    label: "Processo",
    sub: "Tensão calibrada",
    stories: [
      { kind: "intro", kicker: "O diferencial EBM", big: "Tensão é uma ciência.", note: "Constância que você sente na quadra." },
      { kind: "steps", kicker: "Nosso processo", title: "4 etapas", steps: [
        { n: "01", t: "Diagnóstico", d: "Seu jogo, raquete e histórico" },
        { n: "02", t: "Tensão calibrada", d: "Máquina eletrônica, cada libra controlada" },
        { n: "03", t: "Montagem padrão", d: "Nós e cruzamentos do fabricante" },
        { n: "04", t: "Registro técnico", d: "Corda, tensão, gauge e data" },
      ] },
      { kind: "cta", big: "Agende seu encordoamento", note: "WhatsApp · +55 48 99203-4224" },
    ],
  },
  dicas: {
    icon: "✲",
    label: "Dicas",
    sub: "Saiba mais",
    stories: [
      { kind: "intro", kicker: "Dica EBM #1", big: "De quanto em quanto tempo trocar a corda?", note: "Troque por ano o nº de vezes que joga por semana. Joga 3x? ~3 trocas/ano." },
      { kind: "intro", kicker: "Dica EBM #2", big: "Tensão alta x tensão baixa", note: "Mais alta = controle. Mais baixa = potência e conforto. O ideal depende do seu jogo." },
      { kind: "intro", kicker: "Dica EBM #3", big: "Poliéster x Nylon", note: "Poliéster: controle e durabilidade. Nylon: conforto e potência. Sentiu dor no braço? Vá de nylon." },
      { kind: "cta", big: "Ficou na dúvida?", note: "Chama no WhatsApp" },
    ],
  },
};
