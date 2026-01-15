export const REGISTRY_CONFIG = {
  homepage: process.env.NEXT_PUBLIC_APP_BASE_URL || "https://free.shadcraft.com",
  /**
   * The namespace prefix used when installing components via the shadcn CLI.
   * @example `npx shadcn add @shadcraft/[registry-item]`
   * @see https://ui.shadcn.com/docs/registry/namespace
   */
  namespace: process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@shadcraft",
  /**
   * The URL pattern that the shadcn CLI uses to fetch registry items.
   * The `{name}` placeholder is replaced with the component name at resolution time.
   *
   * This points to a **private registry** that requires authentication.
   * Users must configure their `components.json` with the appropriate auth headers.
   *
   * @example
   * ```json
   * // components.json
   * {
   *    "registries": {
   *      "@shadcraft": "https://free.shadcraft.com/r/{name}.json",
   *    }
   * }
   * ```
   *
   * @see https://ui.shadcn.com/docs/registry/namespace#url-pattern-system
   */
  namespaceUrl:
    process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE_URL || "https://free.shadcraft.com/r/{name}.json",
};
