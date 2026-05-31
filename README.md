# EBM String Pro

Site de **encordoamento profissional de raquetes de tênis** — performance, precisão técnica de tensão e uma ferramenta interativa que recomenda a corda ideal para o jogo de cada cliente.

🌐 **Produção:** [ebmstring.pro](https://ebmstring.pro) · [ebmstring-pro.pages.dev](https://ebmstring-pro.pages.dev)
⚙️ **API:** [ebmstring-api.guiydantas.workers.dev](https://ebmstring-api.guiydantas.workers.dev/health)

---

## Stack

Monorepo **pnpm workspace**:

| Pacote | Stack | Deploy |
|--------|-------|--------|
| `web/` | Astro 5 · React 19 (islands) · Tailwind v4 · Motion | Cloudflare **Pages** (estático) |
| `api/` | Hono · TypeScript | Cloudflare **Workers** |

Arquitetura *islands*: o site é estático (HTML/CSS, ~0 JS) e só hidrata as ilhas
interativas (String Finder, catálogo filtrável, comparador, slider de marcas).

## Destaques

- **EBM String Finder** — quiz de 5 passos que cruza o perfil do jogador com 6 eixos
  técnicos (potência, spin, controle, durabilidade, conforto, tensão) e retorna o
  Top 3 de cordas com % de match e radar de aderência. Motor em `web/src/lib/finder.ts`.
- **Catálogo de Performance** — cards com foto macro, radar hexagonal e specs; filtros
  por tipo/característica e ordenação. Dados em `web/src/data/strings.ts`.
- **Comparador técnico** — até 3 cordas lado a lado, vencedor por atributo em destaque.
- **Slider de marcas** — marquee infinito arrastável com tratamento monocromático.

## Design System — "Pro Tension System"

Atlético · técnico · premium. Dark, cantos retos (0px), hierarquia tonal.

| Token | Cor |
|-------|-----|
| Tinta (canvas) | `#0a0a0a` |
| Bola Lima (accent) | `#9cd653` |
| Quadra (verde editorial) | `#143a24` |
| Papel (neutro/texto) | `#e6e2d6` |

Tipografia: **Saira Condensed** (display) · **Archivo** (UI) · **EB Garamond** (editorial).
Tokens em `web/src/styles/global.css`.

## Desenvolvimento

```bash
pnpm install
pnpm dev          # site em http://localhost:4321
pnpm dev:api      # worker local (wrangler dev)
pnpm build        # build estático em web/dist
```

## Deploy

```bash
# Variáveis (NÃO versionar) — ver .env.example
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...

pnpm build && pnpm deploy:web   # Cloudflare Pages
pnpm deploy:api                 # Cloudflare Workers
```

> A API (`api/`) é um **stub** com endpoints prontos (`/health`, `/v1/strings`,
> `/v1/bookings`) para receber a integração real.

## Estrutura

```
ebmstring-pro/
├─ web/                 # Astro app (Pages)
│  ├─ src/components/    # ilhas React + partials Astro
│  ├─ src/data/          # catálogo de cordas
│  ├─ src/lib/           # finder, config do site
│  └─ public/            # logos, fotos das cordas, favicon
├─ api/                 # Worker Hono (Workers)
├─ idv/ · logos marchas/ · refs/   # identidade visual e referências
└─ pnpm-workspace.yaml
```
