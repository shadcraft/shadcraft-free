---
name: component-building
description: Component building guidelines for creating high-quality, accessible, and composable registry components. Triggers on tasks involving building a component, adding or building a block, new block, registry component. Use when working in src/registry/.
license: MIT
metadata:
  author: shadcraft
  version: "1.0.0"
---

# Component Building Guidelines

Comprehensive component authoring guide for building registry components that follow shadcn/ui patterns, emphasizing composition, accessibility, type safety, and maintainability.

## When to Apply

Reference these guidelines when:
- Creating new components in `src/registry/`
- Building blocks that compose shadcn/ui primitives
- Reviewing component code for patterns and best practices
- Refactoring existing registry components

## Rule Categories

| Category | Description | File |
|----------|-------------|------|
| Composition | Component composition patterns | `composition.md` |
| Accessibility | Inclusive, usable components | `accessibility.md` |
| State Management | Controlled/uncontrolled patterns | `state-management.md` |
| Design Tokens | Semantic theming architecture | `design-tokens.md` |
| Styling Patterns | Tailwind CSS and class management | `styling-patterns.md` |
| TypeScript Patterns | Type-safe, flexible components | `typescript-patterns.md` |
| Polymorphism | The `as` prop pattern | `polymorphism.md` |
| asChild Pattern | Radix Slot composition | `as-child-pattern.md` |
| Data Attributes | State and structure via `data-*` | `data-attributes.md` |
| Documentation | Component docs standards | `component-documentation.md` |

## Quick Reference

### Core Principles

1. **Default to shadcn/ui + Radix primitives** - Don't rebuild what exists
2. **Composition over configuration** - Split into focused parts (Root, Trigger, Content)
3. **Semantic HTML first** - Use appropriate elements, add ARIA only when needed
4. **Single element wrapping** - Each component wraps one element for composability
5. **Extend native attributes** - Use `React.ComponentProps<'element'>` patterns
6. **Data attributes for state** - Use `data-state`, `data-slot` instead of prop explosion
7. **Semantic tokens** - Never hardcode colors; use design tokens

### Naming Conventions

Follow established patterns from shadcn/ui and Radix UI:
- **Root**, **Trigger**, **Content** - For interactive compositions
- **Header**, **Body**, **Footer** - For structural layouts
- **Title**, **Description** - For text content areas

### Key Patterns

- **Controlled + Uncontrolled**: Support both via `useControllableState`
- **asChild + Slot**: Merge props onto child elements without wrapper DOM
- **CVA**: Use Class Variance Authority for variant-heavy components
- **cn()**: Merge classes with Tailwind conflict resolution

## How to Use

Read individual rule files for detailed explanations and examples:

```
rules/composition.md
rules/accessibility.md
rules/typescript-patterns.md
```

Each rule file contains:
- DO patterns with references to components.build guides
- DON'T anti-patterns to avoid
- Links to source documentation

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
