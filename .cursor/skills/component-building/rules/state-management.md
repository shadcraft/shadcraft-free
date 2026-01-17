# State Management

State management patterns for controlled and uncontrolled components.

## DO

- Prefer shadcn/Radix primitives for stateful UI (Dialog, DropdownMenu, Tabs, Accordion, etc.). They already implement state + accessibility correctly; registry blocks should usually **compose** them, not re-implement state machines.
- When you *do* implement stateful components, follow the "State" guide patterns: support **uncontrolled**, **controlled**, and (ideally) a merged approach. ([components.build/state](https://www.components.build/state))
  - **Uncontrolled state**: component manages its own state internally (default usage pattern).
  - **Controlled state**: parent manages state; the component receives state and setter via props.
  - **Merging states**: "the best components support both controlled and uncontrolled state". ([components.build/state](https://www.components.build/state))
- Use the naming and prop conventions shown in the guide:
  - controlled: `value` (or `open`) + `onValueChange` (or `onOpenChange`)
  - uncontrolled: `defaultValue` (or `defaultOpen`)
- When merging controlled/uncontrolled, prefer Radix's pattern:
  - Use `useControllableState` from `@radix-ui/react-use-controllable-state` (the guide points to Radix's internal utility). ([components.build/state](https://www.components.build/state))
  - Its config uses `prop`, `defaultProp`, and `onChange` to unify both modes.
- Document which props are controlled vs uncontrolled and how they interact.

## DON'T

- Don't force registry components to be controlled-only unless there's a clear reason; the guide explicitly frames controlled+uncontrolled support as a hallmark of professional components. ([components.build/state](https://www.components.build/state))
- Don't mix controlled and uncontrolled without a single source of truth (ex: accepting `value` and also maintaining internal state for it).
- Don't change from uncontrolled to controlled (or vice versa) during a component's lifetime.
- Don't invent nonstandard prop names when established patterns exist (`value/defaultValue/onValueChange`, `open/defaultOpen/onOpenChange`). ([components.build/state](https://www.components.build/state))
