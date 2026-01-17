# Composition

Component composition patterns for building flexible, reusable components.

## DO

- Default to **shadcn/ui + Radix primitives** for UI building blocks; compose them into registry blocks instead of rebuilding primitives.
- Use composition to avoid "one component with dozens of props". Composition distributes responsibility across cooperating components instead of cramming functionality into a single component. ([components.build/composition](https://www.components.build/composition))
- When a component needs to be composable, split it into focused parts (typical pattern from the guide):
  - **Root**: container that holds everything and owns shared state (often via React context)
  - **Item**: wrapper for a single item
  - **Trigger**: interactive element that toggles state (button by default; may support `asChild`)
  - **Content**: element that shows/hides content based on state
- Follow the naming conventions called out in the guide (used by shadcn/ui and Radix UI): ([components.build/composition](https://www.components.build/composition))
  - **Root**, **Trigger**, **Content**
  - **Header**, **Body**, **Footer**
  - **Title**, **Description**
- When creating your own composable "mini-library" inside a registry block:
  - Use context to share state (ex: `open` + `setOpen`) from Root to children.
  - Extend native element props using `React.ComponentProps<'div'>`, `React.ComponentProps<'button'>`, etc. so consumers can customize the underlying elements.
  - Keep each exported component close to "one component = one element" (ties into the Types guidance). ([components.build/types](https://www.components.build/types))

## DON'T

- Don't ship monolithic "data-driven" components that accept `data` and own all rendering/state/styling; the composition guide explicitly calls out that this couples responsibilities and makes customization difficult. ([components.build/composition](https://www.components.build/composition))
- Don't invent a new naming scheme for subcomponents when established patterns exist (Root/Trigger/Content, etc.).
- Don't rebuild shadcn primitives (Button, Dialog, DropdownMenu, Tabs, etc.) just to re-learn accessibility/state — compose the primitives and only add custom composition when primitives don't cover the use case.
