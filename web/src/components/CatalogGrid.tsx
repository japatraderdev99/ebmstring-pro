import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RadarChart from "./RadarChart";
import { STRINGS, stringImage, brandLogo, type Attr, type StringModel } from "@/data/strings";
import { WHATSAPP_LINK } from "@/lib/site";

/** Marca de forma discreta: logo monocromático (se houver) ou wordmark. */
function BrandTag({ brand, tone = "muted" }: { brand: string; tone?: "light" | "muted" }) {
  const logo = brandLogo(brand);
  const color = tone === "light" ? "var(--color-papel)" : "var(--color-faint)";
  if (logo) {
    return (
      <span
        role="img"
        aria-label={brand}
        className="block h-4 opacity-90"
        style={{
          width: "82px",
          backgroundColor: color,
          WebkitMaskImage: `url(${logo})`,
          maskImage: `url(${logo})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "left center",
          maskPosition: "left center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    );
  }
  return (
    <span className={`tech-label ${tone === "light" ? "text-papel/80" : "text-faint"}`}>
      {brand}
    </span>
  );
}

type Filter = "todos" | "poliester" | "macias" | "conforto" | "spin" | "controle";
type Sort = "destaque" | "preco-asc" | "preco-desc";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "poliester", label: "Poliéster" },
  { value: "macias", label: "Nylon / macias" },
  { value: "spin", label: "Mais spin" },
  { value: "controle", label: "Mais controle" },
  { value: "conforto", label: "Amigas do braço" },
];

function matches(s: StringModel, f: Filter): boolean {
  switch (f) {
    case "todos":
      return true;
    case "poliester":
      return s.type === "poliester";
    case "macias":
      return s.type === "nylon" || s.type === "multifilamento" || s.type === "natural";
    case "conforto":
      return s.armFriendly;
    case "spin":
      return s.attrs.spin >= 85;
    case "controle":
      return s.attrs.control >= 84;
  }
}

function Card({ s, index }: { s: StringModel; index: number }) {
  const [hi, setHi] = useState<Attr | null>(null);
  const img = stringImage(s.id);
  const unavailable = s.available === false;
  const specs: [string, string][] = [
    ["Gauge", s.gauges[0]],
    ["Material", s.material],
    ["Tensão", `${s.tensionRec[0]}–${s.tensionRec[1]} lbs`],
  ];
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col border border-line bg-surface-1 p-5 transition-colors duration-300 ${
        unavailable ? "opacity-65" : "hover:border-lima"
      }`}
    >
      {unavailable && (
        <span className="absolute left-3 top-3 z-20 tech-label border border-papel/40 bg-tinta/85 px-2 py-1 text-[10px] text-papel backdrop-blur-sm">
          Indisponível
        </span>
      )}
      {img ? (
        <>
          <div className="relative -mx-5 -mt-5 mb-3 overflow-hidden">
            <img
              src={img}
              alt={`${s.brand} ${s.name} — corda de tênis`}
              width={760}
              height={475}
              loading="lazy"
              decoding="async"
              className={`aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out ${
                unavailable ? "grayscale" : "group-hover:scale-[1.06]"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/30 to-transparent" />
            <span className="absolute right-3 top-3 tech-label border border-lima/30 bg-tinta/70 px-2 py-1 text-[10px] text-lima backdrop-blur-sm">
              {s.shape}
            </span>
            <div className="absolute bottom-0 left-0 p-4">
              <BrandTag brand={s.brand} tone="light" />
              <h3 className="mt-1.5 font-display text-2xl leading-none text-papel drop-shadow-md">
                {s.name}
              </h3>
            </div>
          </div>
          <p className="tech-label mb-3 text-lima">{s.tagline}</p>
        </>
      ) : (
        <div className="mb-4">
          <BrandTag brand={s.brand} />
          <h3 className="mt-1.5 font-display text-2xl leading-tight text-papel">{s.name}</h3>
          <p className="tech-label mt-1 text-lima">{s.tagline}</p>
        </div>
      )}

      <div className="flex justify-center py-2">
        <RadarChart data={s.attrs} size={210} highlight={hi} />
      </div>

      <div className="mt-4 border-t border-line pt-4">
        <ul className="flex flex-col gap-2 font-mono text-[13px] text-muted">
          {specs.map(([k, v]) => (
            <li
              key={k}
              className="flex justify-between border-b border-line/30 pb-1.5"
              onMouseEnter={() =>
                setHi(k === "Tensão" ? "tension" : null)
              }
              onMouseLeave={() => setHi(null)}
            >
              <span className="text-faint">{k}</span>
              <span className="text-papel">{v}</span>
            </li>
          ))}
          <li className="mt-1 flex items-center justify-between">
            <span className="text-faint">Preço</span>
            <span className="font-display text-xl text-lima">
              R$ {s.priceBRL.toFixed(2).replace(".", ",")}
            </span>
          </li>
        </ul>
      </div>

      {unavailable ? (
        <div className="mt-4 flex cursor-not-allowed items-center justify-center border border-line py-3 tech-label text-faint">
          Indisponível no momento
        </div>
      ) : (
        <a
          href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
            `Olá! Quero encordoar com a ${s.brand} ${s.name}.`,
          )}`}
          target="_blank"
          rel="noopener"
          className="mt-4 flex items-center justify-center border border-line py-3 tech-label text-papel transition-colors hover:border-lima hover:bg-lima hover:text-tinta"
        >
          Encordoar com esta
        </a>
      )}
    </motion.article>
  );
}

export default function CatalogGrid() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [sort, setSort] = useState<Sort>("destaque");

  const list = useMemo(() => {
    const arr = STRINGS.filter((s) => matches(s, filter));
    if (sort === "preco-asc") arr.sort((a, b) => a.priceBRL - b.priceBRL);
    if (sort === "preco-desc") arr.sort((a, b) => b.priceBRL - a.priceBRL);
    // Indisponíveis sempre ao final.
    arr.sort((a, b) => Number(a.available === false) - Number(b.available === false));
    return arr;
  }, [filter, sort]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`tech-label border px-4 py-2 transition-all duration-300 ${
                filter === f.value
                  ? "border-lima bg-lima text-tinta"
                  : "border-line text-faint hover:border-papel hover:text-papel"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="tech-label text-faint">Ordenar</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-line bg-tinta px-3 py-2 font-mono text-sm text-papel outline-none focus:border-lima"
          >
            <option value="destaque">Destaque</option>
            <option value="preco-asc">Menor preço</option>
            <option value="preco-desc">Maior preço</option>
          </select>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((s, i) => (
            <Card key={s.id} s={s} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
