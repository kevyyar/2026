/** Supported locales. Spanish is the default and lives at the root (no prefix). */
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** A value provided once per locale. */
export type Localized<T = string> = Record<Locale, T>;

export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string; short: string }> = {
  es: { htmlLang: "es", ogLocale: "es_MX", label: "Español", short: "ES" },
  en: { htmlLang: "en", ogLocale: "en_US", label: "English", short: "EN" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Resolves Astro.currentLocale (or any string) to a supported locale, falling back to the default. */
export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}
