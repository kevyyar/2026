import { describe, expect, it } from "vitest";
import { ui, useTranslations } from "./ui";
import { accentHtml } from "./markup";
import { locales } from "./config";

describe("UI dictionaries", () => {
  it("have identical key sets in every locale", () => {
    const [first, ...rest] = locales;
    const reference = Object.keys(ui[first]).sort();
    for (const locale of rest) expect(Object.keys(ui[locale]).sort()).toEqual(reference);
  });

  it.each(locales)("have no empty strings in %s", (locale) => {
    const empty = Object.entries(ui[locale]).filter(([, value]) => value.trim() === "");
    expect(empty).toEqual([]);
  });

  it("keep the same {placeholders} in every locale", () => {
    const placeholders = (value: string) => (value.match(/\{\w+\}/g) ?? []).sort();
    for (const key of Object.keys(ui.es) as (keyof typeof ui.es)[]) {
      expect(placeholders(ui.en[key]), key).toEqual(placeholders(ui.es[key]));
    }
  });
});

describe("useTranslations", () => {
  it("returns the string for the locale", () => {
    expect(useTranslations("es")("nav.menu")).toBe("Menú");
    expect(useTranslations("en")("nav.menu")).toBe("Menu");
  });

  it("interpolates {placeholders}", () => {
    expect(useTranslations("es")("process.step", { n: 2, total: 4 })).toBe("Paso 2 de 4");
    expect(useTranslations("en")("process.step", { n: 2, total: 4 })).toBe("Step 2 of 4");
  });
});

describe("accentHtml", () => {
  it("wraps *accent* words in the accent element", () => {
    expect(accentHtml("What *I do*")).toBe('What <em class="accent">I do</em>');
  });

  it("escapes HTML before adding markup", () => {
    expect(accentHtml("<b>Tú</b> & *yo*")).toBe('&lt;b&gt;Tú&lt;/b&gt; &amp; <em class="accent">yo</em>');
  });

  it("leaves text without markers untouched", () => {
    expect(accentHtml("¿Tienes un proyecto?")).toBe("¿Tienes un proyecto?");
  });
});
