import { ATTRS, ATTR_LABELS, type Attr } from "@/data/strings";

interface Props {
  data: Record<Attr, number>;
  /** perfil ideal (String Finder): marca um traço sobre cada barra */
  overlay?: Record<Attr, number> | null;
  /** eixo em destaque */
  highlight?: Attr | null;
  /** mostra o número (0–100) ao lado da barra */
  showValue?: boolean;
  /** quais eixos e em que ordem (padrão: todos) */
  attrs?: Attr[];
  className?: string;
}

const BLOCKS = 5;

/**
 * Barras segmentadas (5 blocos) — a mesma linguagem visual dos carrosséis da EBM.
 * Todo o dimensionamento é em `em`: defina o `font-size` do container pai
 * (px no site, mm no PDF, px grandes nas artes do Instagram) e tudo escala junto.
 * Cada bloco vale 20 pontos e o último pode ficar parcialmente preenchido.
 */
export default function AttrBars({
  data,
  overlay = null,
  highlight = null,
  showValue = true,
  attrs = ATTRS,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col ${className}`}
      style={{ gap: "0.55em" }}
      role="img"
      aria-label={attrs.map((a) => `${ATTR_LABELS[a].label} ${data[a]} de 100`).join(", ")}
    >
      {attrs.map((a) => {
        const v = data[a];
        const hi = highlight === a;
        return (
          <div
            key={a}
            className="grid items-center"
            style={{ gridTemplateColumns: `6.2em 1fr ${showValue ? "2.1em" : "0"}`, columnGap: "0.7em" }}
          >
            <span
              className={`font-display font-bold uppercase leading-none ${hi ? "text-lima" : "text-papel"}`}
              style={{ fontSize: "1em", letterSpacing: "0.01em" }}
            >
              {ATTR_LABELS[a].label}
            </span>

            <span className="relative flex" style={{ gap: "0.22em", height: "0.62em" }}>
              {Array.from({ length: BLOCKS }, (_, i) => {
                const fill = Math.max(0, Math.min(1, v / (100 / BLOCKS) - i));
                return (
                  <i
                    key={i}
                    className="relative block flex-1 overflow-hidden"
                    style={{
                      boxShadow: `inset 0 0 0 max(1px, 0.07em) ${hi ? "var(--color-lima)" : "var(--color-surface-4)"}`,
                    }}
                  >
                    <b
                      className="absolute inset-y-0 left-0 block bg-lima"
                      style={{ width: `${fill * 100}%` }}
                    />
                  </i>
                );
              })}
              {overlay && (
                <span
                  className="absolute bg-papel"
                  style={{
                    left: `${overlay[a]}%`,
                    top: "-0.18em",
                    bottom: "-0.18em",
                    width: "max(1.5px, 0.09em)",
                    transform: "translateX(-50%)",
                  }}
                />
              )}
            </span>

            {showValue && (
              <span
                className={`text-right font-mono leading-none ${hi ? "text-lima-bright" : "text-lima"}`}
                style={{ fontSize: "0.9em" }}
              >
                {v}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
