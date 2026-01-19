# Styling Patterns

Advanced styling patterns with Tailwind CSS and class management.

## DO

- Follow the Styling guide's pattern: Tailwind + **intelligent class merging** to balance "sensible defaults" with "complete customization". ([components.build/styling](https://www.components.build/styling))
- Use the `cn(...)` utility (popularized by shadcn/ui) to combine conditional class logic with Tailwind-aware merging. ([components.build/styling](https://www.components.build/styling))
  - `cn` combines `clsx` + `tailwind-merge` (the guide shows the exact `cn` implementation).
- Rely on Tailwind conflict resolution via `tailwind-merge`: when two utilities target the same CSS property, the last one wins. ([components.build/styling](https://www.components.build/styling))
- Keep class ordering predictable (explicit "Order matters" best practice): ([components.build/styling](https://www.components.build/styling))
  - Base styles
  - Variant styles (based on props)
  - Conditional styles (based on state)
  - User overrides (`className` prop) last
- For components with many variants, use **CVA** (Class Variance Authority) as recommended in the guide. ([components.build/styling](https://www.components.build/styling))
  - Define CVA variants outside the component (performance guidance).
- For "stateful styling", prefer data-attribute selectors (ties into the Data Attributes guide) over "state-specific className props". ([components.build/data-attributes](https://www.components.build/data-attributes))
- Prefer CSS variables for truly dynamic values rather than generating Tailwind classes dynamically (the guide explicitly recommends this). ([components.build/styling](https://www.components.build/styling))

## DON'T

- Don't rely on "traditional styling" pitfalls from the guide: specificity wars, unpredictable overrides, and unclear class precedence. ([components.build/styling](https://www.components.build/styling))
- Don't concatenate classes manually; use `cn` so conflicts resolve predictably.
- Don't introduce state-specific styling props like `openClassName` / `closedClassName`; expose state via `data-*` and let consumers style via selectors. ([components.build/data-attributes](https://www.components.build/data-attributes))
- Don't generate Tailwind class strings from runtime values; use CSS variables when values are truly dynamic. ([components.build/styling](https://www.components.build/styling))
- Don't bypass the project's token rules (no hardcoded colors; prefer token-based utilities).
