import { describe, expect, it } from "vitest";
import { getAlternatePath, getLocaleFromPath, localizePath, stripLocale } from "./paths";

describe("getLocaleFromPath", () => {
  it.each([
    ["/", "es"],
    ["/work/element-cleaning-systems", "es"],
    ["/en", "en"],
    ["/en/", "en"],
    ["/en/work/x", "en"],
    ["/en#work", "en"],
    ["/english", "es"],
    ["/enx/", "es"],
  ])("%s → %s", (path, locale) => {
    expect(getLocaleFromPath(path)).toBe(locale);
  });
});

describe("stripLocale", () => {
  it.each([
    ["/", "/"],
    ["/en", "/"],
    ["/en/", "/"],
    ["/en/#work", "/#work"],
    ["/en/work/x", "/work/x"],
    ["/en/work/x/#results", "/work/x/#results"],
    ["/english/", "/english/"],
    ["/work/x?ref=a#b", "/work/x?ref=a#b"],
  ])("%s → %s", (path, expected) => {
    expect(stripLocale(path)).toBe(expected);
  });
});

describe("localizePath", () => {
  it.each([
    ["/", "es", "/"],
    ["/", "en", "/en/"],
    ["/#work", "es", "/#work"],
    ["/#work", "en", "/en/#work"],
    ["/work/x", "en", "/en/work/x"],
    ["/work/x/", "en", "/en/work/x/"],
    ["/en/work/x", "en", "/en/work/x"],
    ["/en/work/x#results", "es", "/work/x#results"],
    ["/en", "es", "/"],
    ["/en/", "en", "/en/"],
  ] as const)("%s in %s → %s", (path, locale, expected) => {
    expect(localizePath(path, locale)).toBe(expected);
  });

  it.each(["/", "/#work", "/work/x", "/work/x/", "/work/x#results"])("round-trips %s through English", (path) => {
    expect(localizePath(localizePath(path, "en"), "es")).toBe(path);
  });
});

describe("getAlternatePath", () => {
  it.each([
    ["/", "en", "/en/"],
    ["/en/", "es", "/"],
    ["/work/x", "en", "/en/work/x"],
    ["/en/work/x", "es", "/work/x"],
    ["/en/#contact", "es", "/#contact"],
    ["/#contact", "en", "/en/#contact"],
    ["/work/x", "es", "/work/x"],
  ] as const)("%s → %s: %s", (path, locale, expected) => {
    expect(getAlternatePath(path, locale)).toBe(expected);
  });
});
