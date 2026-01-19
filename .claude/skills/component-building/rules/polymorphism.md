# Polymorphism

Polymorphic component patterns using the 'as' prop for flexible element rendering.

## DO

- Use the `as` prop for polymorphism when you need to change the rendered element **while preserving component styling and behavior** (this is the core definition in the Polymorphism guide). ([components.build/polymorphism](https://www.components.build/polymorphism))
- Keep polymorphism semantic:
  - Use `as="a"` for navigation links, `as="button"` for actions, `as="nav"` for navigation containers, etc.
- Implement polymorphism using one of the guide's "Implementation Methods": ([components.build/polymorphism](https://www.components.build/polymorphism))
  - **Manual `as` implementation** (dynamic element rendering), with TypeScript generics for type safety.
  - **Radix UI `Slot`** for more powerful composition (it merges props with the child, not just swaps the tag).
- If you're already in shadcn/Radix land, prefer `asChild` + `Slot` when you need to compose behavior onto an existing child element (ties directly to the guide's "Using Radix UI Slot" section). ([components.build/polymorphism](https://www.components.build/polymorphism), [components.build/as-child](https://www.components.build/as-child))
- Document polymorphic behavior in the component's API docs (what elements are appropriate and what props are expected).

## DON'T

- Don't add polymorphism "just because" when a component should always be one element.
- Don't lose type safety for `as` (no `any`; use the generic patterns shown in the guide). ([components.build/polymorphism](https://www.components.build/polymorphism))
- Don't forget element-specific attributes when swapping tags (ex: anchors need `href`; buttons need `type`). ([components.build/polymorphism](https://www.components.build/polymorphism))
- Don't render non-semantic interactive elements (ex: `div` pretending to be a button) unless you also provide the keyboard and ARIA behavior — the Accessibility guide warns against replacing semantic HTML. ([components.build/accessibility](https://www.components.build/accessibility))
