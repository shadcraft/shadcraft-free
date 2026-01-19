# Accessibility

Accessibility requirements for building inclusive, usable components.

## DO

- Default to **shadcn/ui + Radix primitives** for interactive UI. They come with accessibility behaviors (roles, keyboard interaction, focus management) baked in; don't re-implement them in registry blocks.
- When you must build something not covered by primitives, follow the **core principles** from the Accessibility guide. ([components.build/accessibility](https://www.components.build/accessibility))
  - **Semantic HTML first**: start with the most appropriate element (ex: use `<button>` for actions, not `<div onClick>`).
  - **Keyboard navigation**: every interactive element must be usable by keyboard.
  - **Screen reader support**: ensure interactive elements have accessible names; add ARIA only when needed.
  - **Visual accessibility**: provide visible focus indicators (use `focus-visible:` patterns).
- Treat ARIA as an enhancement, not a replacement for semantic HTML. The guide's rules of thumb: ([components.build/accessibility](https://www.components.build/accessibility))
  - Don't use ARIA if semantic HTML solves it.
  - Don't change native semantics unless necessary.
  - All interactive elements must be keyboard accessible and have accessible names.
- When "disabled" needs an explanation, prefer an **accessible disabled pattern**:
  - Use `aria-disabled` plus helper text (via `aria-describedby`) so the user understands *why* it's disabled. ([components.build/accessibility](https://www.components.build/accessibility))
- When using `asChild` to change the rendered element, double-check semantics are preserved (ex: keep a real `<button type="button">` when it's a button). ([components.build/as-child](https://www.components.build/as-child))

## DON'T

- Don't "reinvent the wheel" by replacing semantic elements with generic elements + click handlers (the guide explicitly calls this out). ([components.build/accessibility](https://www.components.build/accessibility))
- Don't add redundant `role`/`aria-*` to shadcn/Radix primitives (or override their semantics) unless you are intentionally changing behavior beyond what the primitive supports.
- Don't use ARIA to "fake" a button/link when a real `<button>`/`<a>` is possible.
- Don't create interactive elements without accessible names (icon-only controls need `aria-label` / `aria-labelledby`). ([components.build/accessibility](https://www.components.build/accessibility))
- Don't use placeholder text as the only label for form fields (common pitfall). ([components.build/accessibility](https://www.components.build/accessibility))
