export const BUNDLES = ["pro-marketing"] as const;

export type RegistryBundle = (typeof BUNDLES)[number];
