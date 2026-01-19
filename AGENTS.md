- Use pnpm as the package manager

# Shadcraft Registry

shadcn/ui-compatible registry of components, blocks, hooks, styles + preview UI.

## Commands

- `pnpm dev` — Dev server
- `pnpm build` — Full prod build (includes registry:build)
- `pnpm registry:build` — Regen registry JSON + __index__.tsx

## Key Concepts

- Registry items live in `src/registry/`
- Generated files (`public/r/`, `registry.json`) — DO NOT EDIT

## See Also

- [docs/REGISTRY.md](docs/REGISTRY.md) — Full registry documentation
- [src/registry/AGENTS.md](src/registry/AGENTS.md) — Registry-specific guidance
