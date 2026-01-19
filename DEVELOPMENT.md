# Development

Getting started guide for contributors.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) (recommended)

## Setup

### 1. Clone and install

```bash
git clone https://github.com/shadcraft/shadcraft-free.git
cd shadcraft-free
pnpm i
```

### 2. Environment variables

Create a `.env` file in the project root (copy from `.env.example`):

| Variable | Example | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_BASE_URL` | `http://localhost:3000` | Base URL for the app |
| `NEXT_PUBLIC_REGISTRY_NAMESPACE` | `@shadcraft` | Registry namespace |
| `NEXT_PUBLIC_REGISTRY_NAMESPACE_URL` | `https://free.shadcraft.com/r/{name}.json` | Namespace URL pattern |

### 3. Run the dev server

```bash
pnpm dev
```

App: [http://localhost:3000](http://localhost:3000)

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build (runs `registry:build` automatically) |
| `pnpm registry:build` | Generate registry JSON files and the preview index |

## Registry

The registry is the source of truth for all components, blocks, hooks, and styles.

| Type | Path | Example |
|------|------|---------|
| UI | `src/registry/[bundle]/ui/` | `section-heading.tsx` |
| Components | `src/registry/[bundle]/components/[category]/` | `team-card-1.tsx` |
| Blocks | `src/registry/[bundle]/blocks/[category]/` | `team-5/index.tsx` |
| Hooks | `src/registry/[bundle]/hooks/` | `use-carousel.ts` |

For detailed documentation on adding new registry items, see **[docs/REGISTRY.md](docs/REGISTRY.md)**.

## Registry build

The `registry:build` script reads `src/registry/index.ts` (the source of truth) and produces:

1. **`public/r/*.json`** — Static registry item JSON files
2. **`registry.json`** — Root registry manifest
3. **`src/registry/__index__.tsx`** — Auto-generated index for UI previews

Run it manually when you add or modify registry items:

```bash
pnpm registry:build
```
