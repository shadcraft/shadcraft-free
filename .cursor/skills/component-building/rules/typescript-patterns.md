# TypeScript Patterns

TypeScript patterns for flexible, type-safe, and customizable components.

## DO

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

## DON'T

- Don't build "multi-layer" components that wrap multiple elements and then require prop drilling or complex APIs to customize (the guide shows this as an anti-pattern). ([components.build/types](https://www.components.build/types))
- Don't skip extending HTML attributes; it prevents consumers from customizing the underlying element. ([components.build/types](https://www.components.build/types))
- Don't forget to export prop types; consumers use them to extend and wrap components safely. ([components.build/types](https://www.components.build/types))
- Don't define custom props that collide with native attributes unless you intentionally want to override HTML behavior. ([components.build/types](https://www.components.build/types))
- Don't use `any` to silence type errors.
