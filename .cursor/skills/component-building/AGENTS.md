# Component Building Guidelines

**Version 1.0.0**  
Shadcraft  
January 2026

> **Note:**  
> This document is mainly for agents and LLMs to follow when building,  
> generating, or refactoring registry components. Humans may also find it  
> useful, but guidance here is optimized for automation and consistency by  
> AI-assisted workflows.

---

## Abstract

Comprehensive component authoring guide for building registry components that follow shadcn/ui patterns. Contains 10 rules covering composition, accessibility, state management, design tokens, styling, TypeScript patterns, polymorphism, asChild, data attributes, and documentation. Each rule includes DO/DON'T patterns with references to components.build guides.

---

## Table of Contents

1. [Composition](#1-composition)
2. [Accessibility](#2-accessibility)
3. [State Management](#3-state-management)
4. [Design Tokens](#4-design-tokens)
5. [Styling Patterns](#5-styling-patterns)
6. [TypeScript Patterns](#6-typescript-patterns)
7. [Polymorphism](#7-polymorphism)
8. [asChild Pattern](#8-aschild-pattern)
9. [Data Attributes](#9-data-attributes)
10. [Component Documentation](#10-component-documentation)

---

## 1. Composition

Component composition patterns for building flexible, reusable components.

### DO

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

### DON'T

- Don't ship monolithic "data-driven" components that accept `data` and own all rendering/state/styling; the composition guide explicitly calls out that this couples responsibilities and makes customization difficult. ([components.build/composition](https://www.components.build/composition))
- Don't invent a new naming scheme for subcomponents when established patterns exist (Root/Trigger/Content, etc.).
- Don't rebuild shadcn primitives (Button, Dialog, DropdownMenu, Tabs, etc.) just to re-learn accessibility/state — compose the primitives and only add custom composition when primitives don't cover the use case.

---

## 2. Accessibility

Accessibility requirements for building inclusive, usable components.

### DO

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

### DON'T

- Don't "reinvent the wheel" by replacing semantic elements with generic elements + click handlers (the guide explicitly calls this out). ([components.build/accessibility](https://www.components.build/accessibility))
- Don't add redundant `role`/`aria-*` to shadcn/Radix primitives (or override their semantics) unless you are intentionally changing behavior beyond what the primitive supports.
- Don't use ARIA to "fake" a button/link when a real `<button>`/`<a>` is possible.
- Don't create interactive elements without accessible names (icon-only controls need `aria-label` / `aria-labelledby`). ([components.build/accessibility](https://www.components.build/accessibility))
- Don't use placeholder text as the only label for form fields (common pitfall). ([components.build/accessibility](https://www.components.build/accessibility))

---

## 3. State Management

State management patterns for controlled and uncontrolled components.

### DO

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

### DON'T

- Don't force registry components to be controlled-only unless there's a clear reason; the guide explicitly frames controlled+uncontrolled support as a hallmark of professional components. ([components.build/state](https://www.components.build/state))
- Don't mix controlled and uncontrolled without a single source of truth (ex: accepting `value` and also maintaining internal state for it).
- Don't change from uncontrolled to controlled (or vice versa) during a component's lifetime.
- Don't invent nonstandard prop names when established patterns exist (`value/defaultValue/onValueChange`, `open/defaultOpen/onOpenChange`). ([components.build/state](https://www.components.build/state))

---

## 4. Design Tokens

Design token architecture and semantic naming for scalable theming.

### DO

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

### DON'T

- Don't hardcode colors in registry components (the guide explicitly calls out "rather than hardcoding colors"). ([components.build/design-tokens](https://www.components.build/design-tokens))
- Don't create brittle, "usage-coupled" variables that bake visual values into names (ex: `--blue-500-*` naming).
- Don't bypass the existing shadcn token system with arbitrary values/classes when a semantic token exists.
- Don't add new tokens without also defining their dark-mode remapping at the theme layer.

---

## 5. Styling Patterns

Advanced styling patterns with Tailwind CSS and class management.

### DO

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

### DON'T

- Don't rely on "traditional styling" pitfalls from the guide: specificity wars, unpredictable overrides, and unclear class precedence. ([components.build/styling](https://www.components.build/styling))
- Don't concatenate classes manually; use `cn` so conflicts resolve predictably.
- Don't introduce state-specific styling props like `openClassName` / `closedClassName`; expose state via `data-*` and let consumers style via selectors. ([components.build/data-attributes](https://www.components.build/data-attributes))
- Don't generate Tailwind class strings from runtime values; use CSS variables when values are truly dynamic. ([components.build/styling](https://www.components.build/styling))
- Don't bypass the project's token rules (no hardcoded colors; prefer token-based utilities).

---

## 6. TypeScript Patterns

TypeScript patterns for flexible, type-safe, and customizable components.

### DO

- Follow the "Types" guide patterns: proper typing comes from **single element wrapping** + **extending native HTML attributes** + **exporting types**. ([components.build/types](https://www.components.build/types))
- **Single element wrapping**: each exported component should ideally wrap a single HTML/JSX element to keep APIs composable and customizable. ([components.build/types](https://www.components.build/types))
- Extend native attributes of the element you wrap using `React.ComponentProps<'...'>` so consumers have full control over the underlying element. ([components.build/types](https://www.components.build/types))
  - Examples from the guide: `React.ComponentProps<'div'>`, `React.ComponentProps<'button'>`, `React.ComponentProps<'input'>`, `React.ComponentProps<'a'>`.
- Handle "different element types" using one of the approaches shown in the guide: ([components.build/types](https://www.components.build/types))
  - Discriminated unions (commonly for `asChild`)
  - Polymorphic generics (`as?: T` with `React.ComponentPropsWithoutRef<T>`)
- Always export prop types, and follow the naming convention `<ComponentName>Props`. ([components.build/types](https://www.components.build/types))
- Always spread props in a way that allows consumers to override defaults (the guide calls out "Always Spread Props Last"). ([components.build/types](https://www.components.build/types))
- Avoid prop name conflicts with native HTML attributes (the guide calls out `title` as a common conflict). ([components.build/types](https://www.components.build/types))
- Document custom props with JSDoc for clarity and editor tooltips. ([components.build/types](https://www.components.build/types))

### DON'T

- Don't build "multi-layer" components that wrap multiple elements and then require prop drilling or complex APIs to customize (the guide shows this as an anti-pattern). ([components.build/types](https://www.components.build/types))
- Don't skip extending HTML attributes; it prevents consumers from customizing the underlying element. ([components.build/types](https://www.components.build/types))
- Don't forget to export prop types; consumers use them to extend and wrap components safely. ([components.build/types](https://www.components.build/types))
- Don't define custom props that collide with native attributes unless you intentionally want to override HTML behavior. ([components.build/types](https://www.components.build/types))
- Don't use `any` to silence type errors.

---

## 7. Polymorphism

Polymorphic component patterns using the 'as' prop for flexible element rendering.

### DO

- Use the `as` prop for polymorphism when you need to change the rendered element **while preserving component styling and behavior** (this is the core definition in the Polymorphism guide). ([components.build/polymorphism](https://www.components.build/polymorphism))
- Keep polymorphism semantic:
  - Use `as="a"` for navigation links, `as="button"` for actions, `as="nav"` for navigation containers, etc.
- Implement polymorphism using one of the guide's "Implementation Methods": ([components.build/polymorphism](https://www.components.build/polymorphism))
  - **Manual `as` implementation** (dynamic element rendering), with TypeScript generics for type safety.
  - **Radix UI `Slot`** for more powerful composition (it merges props with the child, not just swaps the tag).
- If you're already in shadcn/Radix land, prefer `asChild` + `Slot` when you need to compose behavior onto an existing child element (ties directly to the guide's "Using Radix UI Slot" section). ([components.build/polymorphism](https://www.components.build/polymorphism), [components.build/as-child](https://www.components.build/as-child))
- Document polymorphic behavior in the component's API docs (what elements are appropriate and what props are expected).

### DON'T

- Don't add polymorphism "just because" when a component should always be one element.
- Don't lose type safety for `as` (no `any`; use the generic patterns shown in the guide). ([components.build/polymorphism](https://www.components.build/polymorphism))
- Don't forget element-specific attributes when swapping tags (ex: anchors need `href`; buttons need `type`). ([components.build/polymorphism](https://www.components.build/polymorphism))
- Don't render non-semantic interactive elements (ex: `div` pretending to be a button) unless you also provide the keyboard and ARIA behavior — the Accessibility guide warns against replacing semantic HTML. ([components.build/accessibility](https://www.components.build/accessibility))

---

## 8. asChild Pattern

The asChild prop pattern for seamless component composition and prop merging.

### DO

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

### DON'T

- Don't create nested interactive elements by forgetting `asChild` (the guide shows `<Trigger><button/></Trigger>` producing nested buttons). ([components.build/as-child](https://www.components.build/as-child))
- Don't pass multiple children or fragments to an `asChild` component; the guide calls these out as common pitfalls. ([components.build/as-child](https://www.components.build/as-child))
- Don't use `asChild` with child components that don't forward/spread props; they won't receive the trigger behavior. ([components.build/as-child](https://www.components.build/as-child))
- Don't use non-semantic interactive elements (ex: `div role="button"`) unless you also implement full keyboard + ARIA behavior (accessibility guide). ([components.build/accessibility](https://www.components.build/accessibility))

---

## 9. Data Attributes

Data attribute patterns for component state representation and flexible styling.

### DO

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

### DON'T

- Don't expose `openClassName` / `closedClassName` / `classes={{...}}` style props for states; the guide calls this out as an anti-pattern that couples internal state to styling and explodes props. ([components.build/data-attributes](https://www.components.build/data-attributes))
- Don't use `data-*` as a dumping ground; keep them to state/structure that consumers actually need.
- Don't invent random attribute names when established Radix/shadcn patterns exist.
- Don't treat data attributes as an accessibility substitute; use semantic HTML + ARIA when needed. ([components.build/accessibility](https://www.components.build/accessibility))

---

## 10. Component Documentation

Documentation standards for registry components and blocks.

### DO

- Follow the Docs guide: documentation should make components easy to adopt, customize, and maintain. ([components.build/docs](https://www.components.build/docs))
- Include the "Essential Documentation Sections" from the guide on every registry component page: ([components.build/docs](https://www.components.build/docs))
  - **Overview**: what it is + when to use it.
  - **Demo, Source Code, and Preview**: show the component in action + the code used to build the demo; for registries, include a source preview of the component implementation when possible.
  - **Installation**: a clear, copy/paste command (the guide recommends a single command; optionally provide tabbed options).
  - **Features**: short list of what makes it valuable (the guide gives examples like customizable, composable, type-safe, theming support).
  - **Examples**: variants, states, advanced usage, composition, responsive behavior — each example should include output and code.
  - **Props and API Reference**: document every prop with **Name / Type / Default / Required / Description**.
  - **Accessibility**: document keyboard patterns, ARIA/roles, screen reader support, focus management, contrast considerations.
  - **Changelog and Versioning** (when applicable): semantic versioning, breaking changes, migration guide.
- Keep docs maintainable by following the guide's best practices: keep up-to-date, use real-world examples, include pitfalls/troubleshooting, link to related patterns/components, make examples runnable/tested. ([components.build/docs](https://www.components.build/docs))

### DON'T

- Don't skip core sections (overview/demo/install/examples/API); the guide frames them as essential for first-time adoption. ([components.build/docs](https://www.components.build/docs))
- Don't let docs drift: outdated examples and mismatched APIs erode trust (the guide explicitly calls out "keep documentation up-to-date" and "make examples runnable and tested"). ([components.build/docs](https://www.components.build/docs))
- Don't hide important requirements (peer deps, accessibility constraints, supported composition patterns like `asChild`, exposed `data-*` attributes) — document them explicitly.

---

## References

1. [https://www.components.build/composition](https://www.components.build/composition)
2. [https://www.components.build/accessibility](https://www.components.build/accessibility)
3. [https://www.components.build/state](https://www.components.build/state)
4. [https://www.components.build/design-tokens](https://www.components.build/design-tokens)
5. [https://www.components.build/styling](https://www.components.build/styling)
6. [https://www.components.build/types](https://www.components.build/types)
7. [https://www.components.build/polymorphism](https://www.components.build/polymorphism)
8. [https://www.components.build/as-child](https://www.components.build/as-child)
9. [https://www.components.build/data-attributes](https://www.components.build/data-attributes)
10. [https://www.components.build/docs](https://www.components.build/docs)
