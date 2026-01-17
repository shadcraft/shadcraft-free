# asChild Pattern

The asChild prop pattern for seamless component composition and prop merging.

## DO

- Follow the asChild guide: `asChild` replaces default markup with your **immediate child element** while merging props/behaviors/event handlers onto that child. ([components.build/as-child](https://www.components.build/as-child))
- Use `asChild` (and Radix `Slot`) to avoid nested wrapper DOM ("wrapper hell") while keeping the primitive behavior. ([components.build/as-child](https://www.components.build/as-child))
- Use `asChild` for the key benefits listed in the guide: ([components.build/as-child](https://www.components.build/as-child))
  - **Semantic HTML** (use the most appropriate element)
  - **Clean DOM structure** (no unnecessary wrappers)
  - **Design system integration** (compose Radix behaviors onto your shadcn components)
  - **Component composition** (compose multiple behaviors onto one element)
- Implement `asChild` with Radix `Slot` (shadcn/ui's standard approach for prop merging):
  - Render `Slot` when `asChild` is true, otherwise render the default element.
  - Ensure `className` is merged with `cn(...)` (user overrides last).
- Document the requirements and pitfalls from the guide:
  - `asChild` expects a **single** valid React element child (no fragments, no arrays).
  - The child must **spread props** so it can receive the merged behavior. ([components.build/as-child](https://www.components.build/as-child), [components.build/types](https://www.components.build/types))
- When using `asChild` to swap element types, preserve accessibility (the guide explicitly flags this). ([components.build/as-child](https://www.components.build/as-child), [components.build/accessibility](https://www.components.build/accessibility))

## DON'T

- Don't create nested interactive elements by forgetting `asChild` (the guide shows `<Trigger><button/></Trigger>` producing nested buttons). ([components.build/as-child](https://www.components.build/as-child))
- Don't pass multiple children or fragments to an `asChild` component; the guide calls these out as common pitfalls. ([components.build/as-child](https://www.components.build/as-child))
- Don't use `asChild` with child components that don't forward/spread props; they won't receive the trigger behavior. ([components.build/as-child](https://www.components.build/as-child))
- Don't use non-semantic interactive elements (ex: `div role="button"`) unless you also implement full keyboard + ARIA behavior (accessibility guide). ([components.build/accessibility](https://www.components.build/accessibility))
