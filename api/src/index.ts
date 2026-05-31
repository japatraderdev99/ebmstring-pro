/**
 * EBM String Pro — API (Cloudflare Workers · Hono)
 *
 * Stub inicial. Endpoints prontos para receber a API real:
 *   GET  /              → metadados do serviço
 *   GET  /health        → healthcheck
 *   GET  /v1/strings    → catálogo de cordas
 *   POST /v1/bookings   → (placeholder) agendamento de encordoamento
 */
import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = Record<string, never>;

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: ["https://ebmstring.pro", "https://www.ebmstring.pro", "http://localhost:4321"],
    allowMethods: ["GET", "POST", "OPTIONS"],
  }),
);

app.get("/", (c) =>
  c.json({
    service: "ebmstring-api",
    version: "0.1.0",
    docs: "https://ebmstring.pro",
    endpoints: ["/health", "/v1/strings", "/v1/bookings"],
  }),
);

app.get("/health", (c) => c.json({ ok: true, ts: Date.now() }));

app.get("/v1/strings", (c) =>
  c.json({
    source: "stub",
    note: "Catálogo provisório — substituir pela API oficial da EBM.",
    data: STRINGS,
  }),
);

app.post("/v1/bookings", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: "JSON inválido" }, 400);
  // TODO: integrar com a API/CRM real de agendamento.
  return c.json(
    { ok: true, received: body, note: "Agendamento ainda não persistido (stub)." },
    202,
  );
});

app.notFound((c) => c.json({ error: "not_found" }, 404));

// Subconjunto enxuto só para o stub responder algo útil.
const STRINGS = [
  { id: "luxilon-alu-power", brand: "Luxilon", name: "ALU Power", type: "poliester", priceBRL: 142.7 },
  { id: "babolat-rpm-blast", brand: "Babolat", name: "RPM Blast", type: "poliester", priceBRL: 120.7 },
  { id: "yonex-poly-tour-pro", brand: "Yonex", name: "Poly Tour Pro", type: "poliester", priceBRL: 96.25 },
  { id: "solinco-hyper-g", brand: "Solinco", name: "Hyper-G", type: "poliester", priceBRL: 120.0 },
  { id: "head-lynx-tour", brand: "Head", name: "Lynx Tour", type: "poliester", priceBRL: 90.0 },
  { id: "wilson-nxt-comfort", brand: "Wilson", name: "NXT Comfort", type: "multifilamento", priceBRL: 132.0 },
];

export default app;
