# Pre-commit Hook Setup

This repository now has pre-commit hooks configured with Husky, Eslint, Prettier, and lint-staged.

## Setup Required

Due to permission issues, you need to run the following command to install the dependencies:

```bash
pnpm install
```

This will:

1. Install `prettier`, `husky`, and `lint-staged`
2. Run the `prepare` script which initializes Husky
3. Set up the pre-commit hook

## What the Pre-commit Hook Does

When you commit code, the pre-commit hook will automatically:

1. **Run ESLint** with auto-fix on staged JS/TS files
2. **Format staged files** with Prettier
3. **Run TypeScript type checking** on the entire project

This provides immediate feedback if:

- Linting rules are violated
- Code formatting is incorrect
- TypeScript types don't check

## Manual Commands

You can also run these commands manually:

- `pnpm lint` - Run ESLint on the codebase
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check formatting (useful for CI)
- `pnpm typecheck` - Run TypeScript type checker

## First Time Setup

After running `pnpm install`, you should format the entire codebase once:

```bash
pnpm format
```

Then commit the formatting changes:

```bash
git add -A
git commit -m "Apply prettier formatting to entire codebase"
```

## Notes

- The `.prettierrc` configuration uses standard settings (tab width of 2 spaces, semicolons, etc.)
- The `.prettierignore` file excludes build outputs, node_modules, and generated files
- The `.lintstagedrc.js` runs ESLint + Prettier on staged JS/TS/MDX files
- If you need to bypass the pre-commit hook (not recommended), use `git commit --no-verify`