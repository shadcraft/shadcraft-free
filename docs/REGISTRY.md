# Registry

The registry is the source of truth for all components, blocks, hooks, UI components, and styles in the Shadcraft project. It follows a bundle-based architecture where items are organized into bundles (e.g., `pro-marketing`) for better organization and separation of concerns.

## Architecture

The registry is organized into bundles, and each bundle follows the same architecture:

```
src/registry/
├── [bundle]/
│   ├── ui/                    # UI components (registry:ui)
│   ├── components/            # Components (registry:component)
│   ├── blocks/                # Blocks (registry:block)
│   ├── examples/              # Examples (registry:example)
│   ├── hooks/                 # Hooks (registry:hook)
│   ├── styles/                # Styles (registry:style)
│   └── registry.ts            # Bundle entrypoint
└── index.ts                   # Main registry (combines all bundles)
```

Each bundle exports a unified TypeScript object containing all registry items, which is then combined in `src/registry/index.ts` to form the complete registry.

## Registry Item Types

### Hooks (`registry:hook`)

Reusable abstracted logic that multiple components or blocks can benefit from. Create a hook when you have logic that should be shared across multiple registry items.

**When to create:** When multiple components/blocks need the same reusable logic. Hooks are rarely needed.

**File structure:**
```
src/registry/[bundle]/hooks/[use-name].ts
```

**Example:** `use-file-upload.ts` - Used by multiple avatar upload components.

### UI Components (`registry:ui`)

Building blocks that follow the shadcn way of building components. They are:
- Composable
- Extensible
- Customizable
- Allow for overriding

These are the foundational pieces that other components and blocks build upon.

**When to create:** When you need a reusable, composable building block that follows shadcn patterns.

**File structure:**
```
src/registry/[bundle]/ui/[name].tsx
```

**Example:** `section-heading.tsx`, `mobile-navigation-menu.tsx`, `announcement.tsx`, `inline-hint.tsx`, `rich-separator.tsx`

### Components (`registry:component`)

Opinionated, self-contained pieces of UI. These components:
- Match Figma designs 1:1
- Are more opinionated than UI components
- May accept props, but some are bound to look a specific way
- Cover specific use cases
- Usually created when multiple blocks will use them (to avoid maintenance burden and keep consistency) or to match 1:1 with a Figma design

**When to create:** When multiple blocks will use the same component, or when you need a self-contained piece that matches a specific design.

**Note:** For very bespoke components that will only be used once in a single block, consider keeping the code within the block itself rather than creating a separate component.

**File structure:**
```
src/registry/[bundle]/components/[category]/[name-1].tsx
src/registry/[bundle]/components/[category]/[name-2].tsx
```

**Example:** `team-card-1.tsx`, `team-card-2.tsx`, `balance-1.tsx`, `balance-2.tsx`, `transactions-1.tsx`

### Blocks (`registry:block`)

Opinionated pieces of UI that can be:
- Complete page sections
- Specific implementations of components
- Usage of multiple components together that build a common pattern

Blocks offer a good-looking starting point. You can modify the code to your needs.

**When to create:** When you need a complete, opinionated UI pattern or page section.

**File structure:**
```
src/registry/[bundle]/blocks/[category]/[block-name]/index.tsx
```

Blocks can have multiple files when needed:
- `index.tsx` - Entry point
- `components/` - Block-specific components
- `lib/` - Block-specific utilities
- `hooks/` - Block-specific hooks

```
src/registry/[bundle]/blocks/[category]/[block-name]/index.tsx
src/registry/[bundle]/blocks/[category]/[block-name]/components/[component-name].tsx
```

**Example:** `header-1/index.tsx`, `modal-1/index.tsx`, `activity-feed-1/index.tsx`

### Examples (`registry:example`)

Usage examples for UI components and components. These showcase how components are actually used and are useful for displaying previews in the UI.

**Note:** Blocks don't need examples because they are already self-contained and can use their own code for previews.

**File structure:**
For UI components:
```
src/registry/[bundle]/examples/[name]-demo.tsx
```

Or for components under a category:
```
src/registry/[bundle]/examples/[category]/[name]-demo.tsx
```

**Example:** `announcement-demo.tsx`, `balance-1-demo.tsx`

### Styles (`registry:style`)

CSS variables and semantic tokens. Used for theme configuration and design tokens.

**File structure:**
```
src/registry/[bundle]/styles/_registry.ts
```

**Example:** `pro-application-semantic-tokens` - Semantic tokens for info, success, warning colors.

## Adding a New Registry Item

Follow these steps to add a new registry item:

### Step 1: Determine the Type and Location

1. Identify what type of registry item you're adding (hook, ui, component, block, example, or style)
2. Determine which bundle it belongs to (`pro-marketing`)
3. Locate the correct folder based on the file structure above

### Step 2: Create the Source File(s)

Create your file(s) following the naming conventions:

- **UI:** `src/registry/[bundle]/ui/[name].tsx`
- **Components:** `src/registry/[bundle]/components/[category]/[name-1].tsx`
- **Blocks:** `src/registry/[bundle]/blocks/[category]/[block-name]/index.tsx`
- **Examples:** `src/registry/[bundle]/examples/[category]/[name]-demo.tsx`
- **Hooks:** `src/registry/[bundle]/hooks/[use-name].ts`

For blocks, if you need additional files, organize them in subdirectories:
- `components/` - Block-specific components
- `lib/` - Block-specific utilities
- `hooks/` - Block-specific hooks

### Step 3: Create Example Files (for UI and Components)

For UI components and components, create a demo file that demonstrates usage:

- **UI demos:** `src/registry/[bundle]/examples/[name]-demo.tsx`
- **Component demos:** `src/registry/[bundle]/examples/[category]/[name]-demo.tsx`

Blocks don't need separate examples since they are self-contained. The preview will be generated from the block's own code.

### Step 4: Add Entry to `_registry.ts`

Add your new item to the corresponding `_registry.ts` file:

- UI → `src/registry/[bundle]/ui/_registry.ts`
- Components → `src/registry/[bundle]/components/_registry.ts`
- Blocks → `src/registry/[bundle]/blocks/_registry.ts`
- Examples → `src/registry/[bundle]/examples/_registry.ts`
- Hooks → `src/registry/[bundle]/hooks/_registry.ts`
- Styles → `src/registry/[bundle]/styles/_registry.ts`

**Important:**
- Add entries in **alphabetical order** to make them easier to find
- Include all necessary dependencies:
  - `dependencies` - npm packages (e.g., `"recharts"`, `"react-icons"`)
  - `registryDependencies` - Other registry items
  - For internal registry dependencies, use `getNamespacedRegistryDependency("registry-item-name")` or `getNamespacedRegistryDependencies("registry-item-name-1", "registry-item-name-2")` helpers.

**Note:** We use namespaced keys (`@shadcraft/*`) for internal registry dependencies so the shadcn CLI can resolve them through the registry.

### Step 5: Build the Registry

Run the build command to generate registry JSON files and update the preview index:

```bash
pnpm registry:build
```

This command:
- Generates `public/r/*.json` — static registry item JSON files
- Generates `registry.json` — root registry manifest
- Updates `src/registry/__index__.tsx` — auto-generated index for UI previews

## Registry Entry Structure

### UI Component Entry

```typescript
{
  name: "announcement",
  title: "Announcement",
  type: "registry:ui",
  description: "TBD",
  registryDependencies: ["badge"],
  dependencies: ["@radix-ui/react-slot"],
  files: [
    {
      path: "ui/announcement.tsx",
      type: "registry:ui",
    },
  ],
}
```

### Component Entry

```typescript
{
  name: "balance-1",
  title: "Balance 1",
  type: "registry:component",
  description: "TBD",
  dependencies: ["recharts"],
  registryDependencies: [
    "badge",
    "card",
    "chart",
    getNamespacedRegistryDependency("pro-application-semantic-tokens"),
  ],
  files: [
    {
      path: "components/balance/balance-1.tsx",
      type: "registry:component",
    },
  ],
  categories: ["balance"],
}
```

### Block Entry

```typescript
{
  name: "team-5",
  title: "Team 5",
  type: "registry:block",
  registryDependencies: [
    "button",
    ...getNamespacedRegistryDependencies("section-heading", "team-card-1"),
  ],
  files: [
    {
      path: "blocks/team/team-5/index.tsx",
      type: "registry:component",
    },
  ],
  categories: ["team"],
},
```

### Example Entry

```typescript
{
  name: "announcement-demo",
  title: "Announcement Demo",
  type: "registry:example",
  registryDependencies: [getNamespacedRegistryDependency("announcement")],
  files: [
    {
      path: "examples/announcement-demo.tsx",
      type: "registry:example",
    },
  ],
}
```

### Hook Entry

```typescript
{
  name: "use-file-upload",
  type: "registry:hook",
  description: "TBD",
  files: [
    {
      path: "hooks/use-file-upload.ts",
      type: "registry:hook",
    },
  ],
}
```

## Utility Functions

When referencing internal registry dependencies (items from the same registry), use these utility functions from `src/utils/registry/index.ts`:

### `getNamespacedRegistryDependency(name: string): string`

Generates a namespaced key for internal registry items.

**Example:**
```typescript
registryDependencies: [
  "button",  // Default shadcn registry component
  getNamespacedRegistryDependency("announcement"),  // Internal registry item
]

// Generated:
registryDependencies: [
  "button",
  "@shadcraft/announcement",
]
```

### `getNamespacedRegistryDependencies(...names: string[]): string[]`

Generates multiple namespaced keys at once.

**Example:**
```typescript
registryDependencies: [
  "button",  // Default shadcn registry component
  ...getNamespacedRegistryDependencies("announcement", "inline-hint"),
]

// Generated:
registryDependencies: [
  "button",
  "@shadcraft/announcement",
  "@shadcraft/inline-hint",
]
```

## File Paths Reference

This is the file target path for the registry item when installed via the shadcn CLI.

| Type | Source Path | Target Path (when installed) |
|------|-------------|------------------------------|
| UI | `src/registry/[bundle]/ui/[name].tsx` | `components/shadcraft/[bundle]/[name].tsx` |
| Component | `src/registry/[bundle]/components/[category]/[name].tsx` | `components/shadcraft/[bundle]/[name].tsx` |
| Block | `src/registry/[bundle]/blocks/[category]/[name]/index.tsx` | `components/shadcraft/[bundle]/[category]/[name]/index.tsx` |
| Hook | `src/registry/[bundle]/hooks/[use-name].ts` | DEFAULT PATH: `@/hooks/[use-name].ts` |
| Example | `src/registry/[bundle]/examples/[name]-demo.tsx` | (preview only) |

Target paths are automatically generated by the registry build process using the `withCustomTargetPaths` transformer.

## See Also

- [DEVELOPMENT.md](../DEVELOPMENT.md) - General development setup and scripts
- `src/registry/index.ts` - Main registry entrypoint
- `src/scripts/build-registry.mts` - Registry build script
