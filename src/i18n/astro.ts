import { resolveLocale, type Locale } from "./config";
import { localizePath } from "./paths";
import { useTranslations, type Translate } from "./ui";

export type PageI18n = {
  locale: Locale;
  t: Translate;
  /** Localizes an internal path ("/#contact" → "/en/#contact" in English). */
  href: (path: string) => string;
};

/** Locale helpers for an Astro component, from `Astro.currentLocale`. */
export function getI18n(astro: { currentLocale?: string | undefined }): PageI18n {
  const locale = resolveLocale(astro.currentLocale);
  return { locale, t: useTranslations(locale), href: (path) => localizePath(path, locale) };
}
