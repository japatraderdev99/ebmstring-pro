import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RadarChart from "./RadarChart";
import {
  scoreStrings,
  idealProfile,
  type FinderAnswers,
  type Priority,
} from "@/lib/finder";
import type { Level, PlayStyle } from "@/data/strings";
import { WHATSAPP_LINK } from "@/lib/site";

type StepKey = "level" | "style" | "priority" | "arm" | "budget";

interface Option<T> {
  value: T;
  title: string;
  desc: string;
}

const STEPS: {
  key: StepKey;
  kicker: string;
  question: string;
  options: Option<string>[];
}[] = [
  {
    key: "level",
    kicker: "01 — Perfil",
    question: "Qual o seu nível de jogo?",
    options: [
      { value: "iniciante", title: "Iniciante", desc: "Comecei a jogar há pouco" },
      { value: "intermediario", title: "Intermediário", desc: "Jogo com regularidade" },
      { value: "avancado", title: "Avançado", desc: "Competitivo amador" },
      { value: "competitivo", title: "Competitivo", desc: "Treino / competição séria" },
    ],
  },
  {
    key: "style",
    kicker: "02 — Estilo",
    question: "Como você joga?",
    options: [
      { value: "controle", title: "Controle", desc: "Precisão e colocação" },
      { value: "agressivo", title: "Agressivo · Topspin", desc: "Bato pesado, muito giro" },
      { value: "all-court", title: "All-court", desc: "Jogo completo e versátil" },
      { value: "potencia", title: "Potência", desc: "Profundidade e força" },
    ],
  },
  {
    key: "priority",
    kicker: "03 — Prioridade",
    question: "O que mais importa pra você?",
    options: [
      { value: "controle", title: "Controle", desc: "Bola sempre dentro" },
      { value: "spin", title: "Spin", desc: "Giro e efeito" },
      { value: "potencia", title: "Potência", desc: "Energia na batida" },
      { value: "conforto", title: "Conforto", desc: "Suavidade no braço" },
      { value: "durabilidade", title: "Durabilidade", desc: "Corda que dura" },
    ],
  },
  {
    key: "arm",
    kicker: "04 — Saúde",
    question: "Tem histórico de dor no braço ou cotovelo?",
    options: [
      { value: "sim", title: "Sim", desc: "Sensível / já tive lesão" },
      { value: "nao", title: "Não", desc: "Braço tranquilo" },
    ],
  },
  {
    key: "budget",
    kicker: "05 — Orçamento",
    question: "Qual faixa de investimento?",
    options: [
      { value: "economico", title: "Econômico", desc: "Até R$ 70" },
      { value: "intermediario", title: "Intermediário", desc: "R$ 70 – 110" },
      { value: "premium", title: "Premium", desc: "R$ 110 – 160" },
      { value: "sem-limite", title: "Sem limite", desc: "Quero o melhor" },
    ],
  },
];

export default function StringFinder() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Record<StepKey, string>>({
    level: "",
    style: "",
    priority: "",
    arm: "",
    budget: "",
  });

  const current = STEPS[step];
  const progress = done ? 100 : (step / STEPS.length) * 100;

  function choose(value: string) {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setAnswers({ level: "", style: "", priority: "", arm: "", budget: "" });
    setStep(0);
    setDone(false);
  }

  const finderAnswers: FinderAnswers | null = useMemo(() => {
    if (!done) return null;
    return {
      level: answers.level as Level,
      style: answers.style as PlayStyle,
      priority: answers.priority as Priority,
      armSensitive: answers.arm === "sim",
      budget: answers.budget as FinderAnswers["budget"],
    };
  }, [done, answers]);

  const results = useMemo(
    () => (finderAnswers ? scoreStrings(finderAnswers).slice(0, 3) : []),
    [finderAnswers],
  );
  const ideal = useMemo(
    () => (finderAnswers ? idealProfile(finderAnswers) : null),
    [finderAnswers],
  );

  return (
    <div className="grain relative border border-line bg-surface-1/70 backdrop-blur-sm">
      {/* progress rail */}
      <div className="h-1 w-full bg-surface-3">
        <motion.div
          className="h-full bg-lima"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
          style={{ boxShadow: "0 0 12px rgba(156,214,83,0.6)" }}
        />
      </div>

      <div className="p-6 sm:p-10 md:p-14">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={current.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="tech-label text-lima">{current.kicker}</span>
                <span className="font-mono text-xs text-faint">
                  {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mb-8 font-display text-3xl leading-none text-papel sm:text-4xl md:text-5xl">
                {current.question}
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {current.options.map((opt, i) => (
                  <motion.button
                    key={opt.value}
                    onClick={() => choose(opt.value)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    className="group relative flex items-center justify-between border border-line bg-tinta/40 px-5 py-4 text-left transition-all duration-300 hover:border-lima hover:bg-quadra/20"
                  >
                    <span>
                      <span className="block font-display text-xl uppercase text-papel transition-colors group-hover:text-lima">
                        {opt.title}
                      </span>
                      <span className="font-body text-sm text-faint">{opt.desc}</span>
                    </span>
                    <span className="font-mono text-lima opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </motion.button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-8 tech-label text-faint transition-colors hover:text-papel"
                >
                  ← Voltar
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="tech-label text-lima">Resultado · Match científico</span>
                  <h3 className="mt-2 font-display text-3xl leading-none text-papel sm:text-4xl md:text-5xl">
                    Suas cordas ideais
                  </h3>
                </div>
                <button
                  onClick={restart}
                  className="tech-label border border-line px-4 py-2 text-faint transition-colors hover:border-lima hover:text-lima"
                >
                  ↺ Refazer
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {results.map((r, i) => (
                  <motion.div
                    key={r.string.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 * i, duration: 0.5 }}
                    className={`relative flex flex-col border p-5 ${
                      i === 0
                        ? "border-lima bg-quadra/20 glow-lima"
                        : "border-line bg-tinta/40"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`tech-label ${i === 0 ? "text-lima" : "text-faint"}`}
                      >
                        {i === 0 ? "★ Melhor match" : `Opção ${i + 1}`}
                      </span>
                      <span className="font-mono text-2xl font-bold text-lima">
                        {r.score}
                        <span className="text-sm text-faint">%</span>
                      </span>
                    </div>

                    <span className="tech-label text-faint">{r.string.brand}</span>
                    <h4 className="font-display text-2xl leading-tight text-papel">
                      {r.string.name}
                    </h4>

                    <div className="my-3 flex justify-center">
                      <RadarChart
                        data={r.string.attrs}
                        overlay={i === 0 ? ideal : null}
                        size={190}
                      />
                    </div>

                    {r.reasons.length > 0 && (
                      <ul className="mb-3 flex flex-wrap gap-1.5">
                        {r.reasons.map((reason) => (
                          <li
                            key={reason}
                            className="tech-label border border-lima/40 bg-quadra/30 px-2 py-1 text-[10px] text-lima"
                          >
                            {reason}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto flex items-end justify-between border-t border-line pt-3">
                      <span className="font-mono text-xs text-faint">
                        {r.string.tensionRec[0]}–{r.string.tensionRec[1]} lbs
                      </span>
                      <span className="font-display text-xl text-lima">
                        R$ {r.string.priceBRL.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {results[0] && (
                <motion.a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                    `Olá EBM String Pro! O String Finder recomendou a ${results[0].string.brand} ${results[0].string.name} pra mim. Quero agendar um encordoamento.`,
                  )}`}
                  target="_blank"
                  rel="noopener"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex w-full items-center justify-center gap-3 bg-lima px-8 py-4 tech-label text-tinta transition-colors hover:bg-lima-bright"
                >
                  Agendar encordoamento com a {results[0].string.name}
                  <span aria-hidden>→</span>
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
