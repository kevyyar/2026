import { defaultLocale, locales, type Locale } from "./config";

/** Splits "/a/b?x=1#c" into the pathname and the "?query#hash" suffix. */
function split(path: string): { pathname: string; suffix: string } {
  const index = path.search(/[?#]/);
  return index === -1 ? { pathname: path, suffix: "" } : { pathname: path.slice(0, index), suffix: path.slice(index) };
}

/** Locale prefixes that appear in URLs (every locale except the unprefixed default). */
const prefixed = locales.filter((locale) => locale !== defaultLocale);

function prefixOf(pathname: string): Locale | null {
  for (const locale of prefixed) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return null;
}

export function getLocaleFromPath(path: string): Locale {
  return prefixOf(split(path).pathname) ?? defaultLocale;
}

/** Removes the locale prefix: "/en/work/x#a" → "/work/x#a", "/en" → "/". */
export function stripLocale(path: string): string {
  const { pathname, suffix } = split(path);
  const locale = prefixOf(pathname);
  if (!locale) return path;
  const rest = pathname.slice(locale.length + 1);
  return `${rest.startsWith("/") ? rest : `/${rest}`}${suffix}`;
}

/** Returns `path` (localized or not) as seen in `locale`: "/work/x" → "/en/work/x" for English. */
export function localizePath(path: string, locale: Locale): string {
  const { pathname, suffix } = split(stripLocale(path));
  if (locale === defaultLocale) return `${pathname}${suffix}`;
  return `/${locale}${pathname === "/" ? "/" : pathname}${suffix}`;
}

/** The equivalent of `currentPath` in `targetLocale` (same page, same hash). */
export function getAlternatePath(currentPath: string, targetLocale: Locale): string {
  return localizePath(currentPath, targetLocale);
}
