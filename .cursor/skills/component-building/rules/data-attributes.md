# Data Attributes

Data attribute patterns for component state representation and flexible styling.

## DO

- Follow the Data Attributes guide: expose component state and structure declaratively so consumers can style without "prop explosion". ([components.build/data-attributes](https://www.components.build/data-attributes))
- Use the two primary patterns called out in the guide: ([components.build/data-attributes](https://www.components.build/data-attributes))
  - **`data-state`** for visual states
  - **`data-slot`** for component identification within a composition
- Prefer a **single `className` prop** + `data-*` selectors over multiple state-specific className props (the guide explicitly labels state-specific className APIs as an anti-pattern). ([components.build/data-attributes](https://www.components.build/data-attributes))
- Style via selectors (Tailwind arbitrary variants are explicitly called out as "elegant"):
  - `data-[state=open]:...`
  - `data-[state=closed]:...`
  - Combine attributes for complex states (example pattern in guide uses `[data-state=open][data-side=top]...`). ([components.build/data-attributes](https://www.components.build/data-attributes))
- Use common Radix-style attributes where relevant (the guide lists these as provided by Radix): ([components.build/data-attributes](https://www.components.build/data-attributes))
  - `data-state` (open/closed, active/inactive, on/off)
  - `data-side` (top/right/bottom/left)
  - `data-align` (start/center/end)
  - `data-orientation` (horizontal/vertical)
  - `data-disabled`
  - `data-placeholder`
- In shadcn/Radix primitives, many of these attributes are already applied automatically; prefer styling those attributes rather than adding new props or manual state classes. ([components.build/data-attributes](https://www.components.build/data-attributes))
- Use `data-slot` to make parent/child targeting stable without fragile class names or element selectors (this is called out as a pattern popularized by shadcn/ui). ([components.build/data-attributes](https://www.components.build/data-attributes))

## DON'T

- Don't expose `openClassName` / `closedClassName` / `classes={{...}}` style props for states; the guide calls this out as an anti-pattern that couples internal state to styling and explodes props. ([components.build/data-attributes](https://www.components.build/data-attributes))
- Don't use `data-*` as a dumping ground; keep them to state/structure that consumers actually need.
- Don't invent random attribute names when established Radix/shadcn patterns exist.
- Don't treat data attributes as an accessibility substitute; use semantic HTML + ARIA when needed. ([components.build/accessibility](https://www.components.build/accessibility))
