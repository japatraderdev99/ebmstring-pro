import { useState } from "react";
import { motion } from "motion/react";
import { STRINGS, ATTRS, ATTR_LABELS, type StringModel } from "@/data/strings";

const MAX = 3;

export default function Comparator() {
  const [selected, setSelected] = useState<string[]>([
    "solinco-hyper-g",
    "head-lynx-tour",
    "yonex-polytour-air",
  ]);

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX) return [...prev.slice(1), id];
      return [...prev, id];
    });
  }

  const cols: StringModel[] = selected
    .map((id) => STRINGS.find((s) => s.id === id))
    .filter((s): s is StringModel => Boolean(s));

  const bestPerAttr = ATTRS.reduce<Record<string, number>>((acc, attr) => {
    acc[attr] = Math.max(...cols.map((c) => c.attrs[attr]), 0);
    return acc;
  }, {});

  return (
    <div>
      {/* selector */}
      <div className="mb-8 flex flex-wrap gap-2">
        {STRINGS.filter((s) => s.available !== false).map((s) => {
          const on = selected.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`tech-label border px-3 py-2 transition-all duration-300 ${
                on
                  ? "border-lima bg-lima text-tinta"
                  : "border-line text-faint hover:border-papel hover:text-papel"
              }`}
            >
              {s.brand} {s.name}
            </button>
          );
        })}
      </div>
      <p className="mb-8 font-mono text-xs text-faint">
        Selecione até {MAX} cordas · {selected.length}/{MAX}
      </p>

      <div className="grid grid-cols-1 gap-6">
        {/* cartões das cordas (as barras ficam na tabela) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cols.map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center border border-line bg-surface-1 p-4"
            >
              <span className="tech-label text-faint">{c.brand}</span>
              <span className="mb-1 text-center font-display text-lg leading-tight text-papel">
                {c.name}
              </span>
              
              <span className="mt-2 font-display text-lg text-lima">
                R$ {c.priceBRL.toFixed(2).replace(".", ",")}
              </span>
            </motion.div>
          ))}
        </div>

        {/* table */}
        <div className="overflow-hidden border border-line">
          <table className="w-full border-collapse font-mono text-sm">
            <thead>
              <tr className="border-b-2 border-line bg-surface-2">
                <th className="px-4 py-3 text-left tech-label text-faint">Atributo</th>
                {cols.map((c) => (
                  <th
                    key={c.id}
                    className="px-3 py-3 text-center font-display text-base uppercase text-papel"
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ATTRS.map((attr) => (
                <tr key={attr} className="border-b border-line/40">
                  <td className="px-4 py-3 text-faint">{ATTR_LABELS[attr].label}</td>
                  {cols.map((c) => {
                    const v = c.attrs[attr];
                    const best = v === bestPerAttr[attr] && v > 0;
                    return (
                      <td key={c.id} className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="hidden gap-[3px] sm:flex" aria-hidden>
                            {[0, 1, 2, 3, 4].map((i) => {
                              const fill = Math.max(0, Math.min(1, v / 20 - i));
                              return (
                                <i
                                  key={i}
                                  className="relative block h-2.5 w-6 overflow-hidden shadow-[inset_0_0_0_1px_var(--color-surface-4)]"
                                >
                                  <b
                                    className={`absolute inset-y-0 left-0 block ${best ? "bg-lima" : "bg-faint"}`}
                                    style={{ width: `${fill * 100}%` }}
                                  />
                                </i>
                              );
                            })}
                          </span>
                          <span className={`w-7 text-right ${best ? "font-bold text-lima" : "text-papel"}`}>
                            {v}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-surface-2">
                <td className="px-4 py-3 tech-label text-faint">Tensão rec.</td>
                {cols.map((c) => (
                  <td key={c.id} className="px-3 py-3 text-center text-papel">
                    {c.tensionRec[0]}–{c.tensionRec[1]}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 tech-label text-faint">Braço</td>
                {cols.map((c) => (
                  <td key={c.id} className="px-3 py-3 text-center">
                    <span className={c.armFriendly ? "text-lima" : "text-faint"}>
                      {c.armFriendly ? "Amiga ✓" : "Firme"}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
