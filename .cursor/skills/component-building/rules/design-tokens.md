# Design Tokens

Design token architecture and semantic naming for scalable theming.

## DO

- Follow the Design Tokens guide: use **semantic naming conventions** and avoid hardcoding colors by separating concerns of **theme**, **context**, and **usage**. ([components.build/design-tokens](https://www.components.build/design-tokens))
- Prefer the existing shadcn token utilities and CSS variables:
  - `bg-background`, `text-foreground`
  - `bg-primary`, `text-primary-foreground`
  - `bg-secondary`, `text-secondary-foreground`
  - `bg-muted`, `text-muted-foreground`
  - `bg-accent`, `text-accent-foreground`
  - `bg-destructive`, `text-destructive-foreground`
  - `border-border`, `ring-ring`
- When you need new semantic tokens, follow the variable architecture shown in the guide: ([components.build/design-tokens](https://www.components.build/design-tokens))
  - Define semantic "base" tokens like `--background`, `--foreground`, `--primary`, `--primary-foreground`.
  - Remap those tokens per theme (ex: in `.dark`) instead of changing component code.
  - Map base tokens into Tailwind-facing tokens (the guide shows `--color-background: var(--background)`, `--color-primary: var(--primary)`, etc.).
- Keep token names semantic (describe purpose), not literal (describe the color).
- Always keep foreground pairs for readable contrast (`--primary` ↔ `--primary-foreground`, etc.).

## DON'T

- Don't hardcode colors in registry components (the guide explicitly calls out "rather than hardcoding colors"). ([components.build/design-tokens](https://www.components.build/design-tokens))
- Don't create brittle, "usage-coupled" variables that bake visual values into names (ex: `--blue-500-*` naming).
- Don't bypass the existing shadcn token system with arbitrary values/classes when a semantic token exists.
- Don't add new tokens without also defining their dark-mode remapping at the theme layer.
