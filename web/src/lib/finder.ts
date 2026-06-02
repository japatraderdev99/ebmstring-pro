/**
 * EBM String Finder — motor de recomendação.
 *
 * A partir das respostas do jogador montamos um "perfil ideal" ponderado
 * sobre os 6 eixos e medimos a aderência de cada corda a esse perfil,
 * aplicando modificadores (nível, estilo, braço, orçamento).
 */
import {
  STRINGS,
  ATTRS,
  type Attr,
  type Level,
  type PlayStyle,
  type StringModel,
} from "@/data/strings";

export type Priority = "controle" | "spin" | "potencia" | "conforto" | "durabilidade";

export interface FinderAnswers {
  level: Level;
  style: PlayStyle;
  priority: Priority;
  armSensitive: boolean; // histórico de dor / cotovelo de tenista
  budget: "economico" | "intermediario" | "premium" | "sem-limite";
}

export interface MatchResult {
  string: StringModel;
  score: number; // 0–100 — % de aderência
  reasons: string[];
}

/** Pesos-base por prioridade declarada. */
const PRIORITY_WEIGHTS: Record<Priority, Partial<Record<Attr, number>>> = {
  controle: { control: 1, tension: 0.6, spin: 0.5, power: 0.2, durability: 0.4, comfort: 0.3 },
  spin: { spin: 1, control: 0.6, power: 0.5, tension: 0.4, durability: 0.4, comfort: 0.2 },
  potencia: { power: 1, comfort: 0.7, spin: 0.4, control: 0.4, tension: 0.4, durability: 0.2 },
  conforto: { comfort: 1, power: 0.6, tension: 0.6, control: 0.4, spin: 0.3, durability: 0.3 },
  durabilidade: { durability: 1, control: 0.6, tension: 0.6, spin: 0.4, power: 0.3, comfort: 0.3 },
};

/** Ajuste fino por estilo de jogo. */
const STYLE_WEIGHTS: Record<PlayStyle, Partial<Record<Attr, number>>> = {
  controle: { control: 0.5, tension: 0.3 },
  agressivo: { spin: 0.5, control: 0.3 },
  "all-court": { control: 0.2, spin: 0.2, comfort: 0.2, power: 0.2 },
  potencia: { power: 0.5, comfort: 0.3 },
};

const BUDGET_CAP: Record<FinderAnswers["budget"], number> = {
  economico: 70,
  intermediario: 110,
  premium: 160,
  "sem-limite": Infinity,
};

function buildIdealWeights(a: FinderAnswers): Record<Attr, number> {
  const w: Record<Attr, number> = {
    power: 0.15,
    spin: 0.15,
    control: 0.15,
    durability: 0.15,
    comfort: 0.15,
    tension: 0.15,
  };
  for (const [attr, val] of Object.entries(PRIORITY_WEIGHTS[a.priority])) {
    w[attr as Attr] += val as number;
  }
  for (const [attr, val] of Object.entries(STYLE_WEIGHTS[a.style])) {
    w[attr as Attr] += val as number;
  }
  if (a.armSensitive) {
    w.comfort += 1.1;
    w.tension += 0.3;
  }
  return w;
}

export function scoreStrings(a: FinderAnswers): MatchResult[] {
  const weights = buildIdealWeights(a);
  const totalW = ATTRS.reduce((sum, k) => sum + weights[k], 0);
  const cap = BUDGET_CAP[a.budget];

  const results = STRINGS.filter((s) => s.available !== false).map((s) => {
    // Aderência ponderada do perfil da corda ao perfil ideal (0–100).
    let base = ATTRS.reduce((sum, k) => sum + weights[k] * s.attrs[k], 0) / totalW;
    const reasons: string[] = [];

    // — Estilo de jogo —
    if (s.bestFor.includes(a.style)) {
      base += 6;
      reasons.push(`Feita para jogo ${styleLabel(a.style)}`);
    }

    // — Nível —
    if (s.levels.includes(a.level)) {
      base += 5;
    } else {
      base -= 8;
    }

    // — Sensibilidade no braço —
    if (a.armSensitive) {
      if (s.armFriendly) {
        base += 8;
        reasons.push("Amiga do braço");
      } else if (s.type === "poliester") {
        base -= 14;
      }
    }

    // — Prioridade declarada bate com o ponto forte da corda —
    const priorityAttr = priorityToAttr(a.priority);
    if (s.attrs[priorityAttr] >= 82) {
      reasons.push(`${priorityLabel(a.priority)} de elite`);
    }

    // — Orçamento —
    if (s.priceBRL > cap) {
      const over = s.priceBRL - cap;
      base -= Math.min(20, over * 0.4);
    } else if (cap !== Infinity && s.priceBRL <= cap * 0.7) {
      base += 3;
      reasons.push("Ótimo custo-benefício");
    }

    return {
      string: s,
      score: Math.max(0, Math.min(100, Math.round(base))),
      reasons: reasons.slice(0, 3),
    };
  });

  return results.sort((x, y) => y.score - x.score);
}

/** Perfil ideal normalizado (0–100 por eixo) para sobrepor no radar. */
export function idealProfile(a: FinderAnswers): Record<Attr, number> {
  const w = buildIdealWeights(a);
  const max = Math.max(...ATTRS.map((k) => w[k]));
  const out = {} as Record<Attr, number>;
  for (const k of ATTRS) out[k] = Math.round((w[k] / max) * 100);
  return out;
}

function priorityToAttr(p: Priority): Attr {
  return (
    { controle: "control", spin: "spin", potencia: "power", conforto: "comfort", durabilidade: "durability" } as const
  )[p];
}
function priorityLabel(p: Priority): string {
  return { controle: "Controle", spin: "Spin", potencia: "Potência", conforto: "Conforto", durabilidade: "Durabilidade" }[p];
}
function styleLabel(s: PlayStyle): string {
  return { controle: "de controle", agressivo: "agressivo", "all-court": "all-court", potencia: "de potência" }[s];
}
