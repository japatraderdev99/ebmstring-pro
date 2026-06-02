import { ATTRS, ATTR_LABELS, type Attr } from "@/data/strings";

interface Props {
  data: Record<Attr, number>;
  overlay?: Record<Attr, number> | null;
  size?: number;
  showLabels?: boolean;
  className?: string;
  /** índice do eixo em destaque (hover de spec) */
  highlight?: Attr | null;
}

const RINGS = [0.25, 0.5, 0.75, 1];

function point(cx: number, cy: number, r: number, i: number, value = 1) {
  const angle = (-90 + i * 60) * (Math.PI / 180);
  const radius = r * value;
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)] as const;
}

function polygon(cx: number, cy: number, r: number, values: number[]) {
  return values.map((v, i) => point(cx, cy, r, i, v / 100).join(",")).join(" ");
}

export default function RadarChart({
  data,
  overlay = null,
  size = 200,
  showLabels = true,
  className = "",
  highlight = null,
}: Props) {
  // Tudo proporcional ao tamanho — legível tanto em cards (210) quanto em arte IG (760).
  const labelFont = Math.round(size * 0.04);
  const pad = showLabels ? Math.round(size * 0.115) : Math.round(size * 0.04);
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - pad;
  const dotR = Math.max(2, size * 0.011);
  const lineW = Math.max(1.6, size * 0.0042);

  const values = ATTRS.map((a) => data[a]);
  const overlayValues = overlay ? ATTRS.map((a) => overlay[a]) : null;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Gráfico de atributos da corda"
    >
      {/* hex rings */}
      {RINGS.map((ring) => (
        <polygon
          key={ring}
          points={ATTRS.map((_, i) => point(cx, cy, r, i, ring).join(",")).join(" ")}
          fill="none"
          stroke="var(--color-surface-4)"
          strokeWidth={ring === 1 ? 1 : 0.6}
          opacity={ring === 1 ? 1 : 0.55}
        />
      ))}

      {/* axes */}
      {ATTRS.map((a, i) => {
        const [x, y] = point(cx, cy, r, i, 1);
        return (
          <line
            key={a}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="var(--color-surface-4)"
            strokeWidth={0.6}
            opacity={0.5}
          />
        );
      })}

      {/* overlay (perfil ideal) */}
      {overlayValues && (
        <polygon
          points={polygon(cx, cy, r, overlayValues)}
          fill="rgba(230, 226, 214, 0.06)"
          stroke="var(--color-papel)"
          strokeWidth={1}
          strokeDasharray="3 3"
          opacity={0.7}
        />
      )}

      {/* data */}
      <polygon
        points={polygon(cx, cy, r, values)}
        fill="rgba(156, 214, 83, 0.22)"
        stroke="var(--color-lima)"
        strokeWidth={lineW}
        style={{ filter: "drop-shadow(0 0 5px rgba(156,214,83,0.4))" }}
      />

      {/* vertices */}
      {values.map((v, i) => {
        const [x, y] = point(cx, cy, r, i, v / 100);
        const isHi = highlight === ATTRS[i];
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={isHi ? dotR * 1.7 : dotR}
            fill={isHi ? "var(--color-lima-bright)" : "var(--color-lima)"}
          />
        );
      })}

      {/* labels */}
      {showLabels &&
        ATTRS.map((a, i) => {
          const [x, y] = point(cx, cy, r + labelFont * 0.85, i, 1);
          const isHi = highlight === a;
          return (
            <text
              key={a}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isHi ? "var(--color-lima)" : "var(--color-faint)"}
              fontSize={labelFont}
              fontWeight={700}
              fontFamily="var(--font-body)"
              letterSpacing="0.05em"
            >
              {ATTR_LABELS[a].short}
            </text>
          );
        })}
    </svg>
  );
}
