# Component Documentation

Documentation standards for registry components and blocks.

## DO

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

## DON'T

- Don't skip core sections (overview/demo/install/examples/API); the guide frames them as essential for first-time adoption. ([components.build/docs](https://www.components.build/docs))
- Don't let docs drift: outdated examples and mismatched APIs erode trust (the guide explicitly calls out "keep documentation up-to-date" and "make examples runnable and tested"). ([components.build/docs](https://www.components.build/docs))
- Don't hide important requirements (peer deps, accessibility constraints, supported composition patterns like `asChild`, exposed `data-*` attributes) — document them explicitly.
