import { useEffect, useRef, useState } from "react";

type Brand =
  | { name: string; logo: string; h?: string } // logo file (alpha PNG) → masked silhouette
  | { name: string; wordmark: true }; // styled wordmark

const BRANDS: Brand[] = [
  { name: "Wilson", logo: "/brands/wilson.png" },
  { name: "Head", logo: "/brands/head.png" },
  { name: "Yonex", logo: "/brands/yonex.png" },
  // Solinco tem marca mais "quadrada" → altura maior p/ peso visual equivalente.
  { name: "Solinco", logo: "/brands/solinco.png?v=2", h: "h-14" },
  { name: "Gamma", wordmark: true },
  { name: "Signum Pro", wordmark: true },
  { name: "Sigma", wordmark: true },
];

function BrandMark({ brand }: { brand: Brand }) {
  return (
    <div className="group flex h-20 w-44 shrink-0 items-center justify-center px-6 sm:w-52">
      {"logo" in brand ? (
        <div
          className={`brand-mask ${brand.h ?? "h-9"} w-full opacity-55 transition-all duration-500 group-hover:opacity-100 group-hover:[background-color:var(--color-lima)]`}
          style={{
            WebkitMaskImage: `url(${brand.logo})`,
            maskImage: `url(${brand.logo})`,
          }}
          aria-label={brand.name}
          role="img"
        />
      ) : (
        <span
          className="font-display text-2xl font-extrabold uppercase italic tracking-tight text-papel/55 transition-colors duration-500 group-hover:text-lima"
          style={{ fontStretch: "condensed" }}
        >
          {brand.name}
        </span>
      )}
    </div>
  );
}

export default function BrandSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const half = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      half.current = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    const AUTO = 0.5; // px/frame
    const tick = () => {
      if (!dragging.current) {
        offset.current -= paused ? 0 : AUTO;
        // momentum after drag
        if (Math.abs(velocity.current) > 0.1) {
          offset.current += velocity.current;
          velocity.current *= 0.94;
        }
      }
      if (half.current > 0) {
        if (offset.current <= -half.current) offset.current += half.current;
        if (offset.current > 0) offset.current -= half.current;
      }
      track.style.transform = `translate3d(${offset.current}px,0,0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
    };
  }, [paused]);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    velocity.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    offset.current += dx;
    velocity.current = dx;
  };
  const onUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className="relative w-full select-none overflow-hidden py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-tinta to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-tinta to-transparent sm:w-40" />

      <div
        ref={trackRef}
        className="flex w-max cursor-grab items-center active:cursor-grabbing"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {[...BRANDS, ...BRANDS].map((b, i) => (
          <BrandMark key={`${b.name}-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );
}
