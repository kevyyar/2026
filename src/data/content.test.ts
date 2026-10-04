import { describe, expect, it } from "vitest";
import { locales, type Locale } from "../i18n/config";
import { getProfile } from "./profile";
import { getProjects } from "./projects";
import { getServices } from "./services";
import { getProcessSteps } from "./process";
import { getExperience } from "./experience";
import { getPrinciples } from "./principles";

const content = (locale: Locale) => ({
  profile: getProfile(locale),
  projects: getProjects(locale).map(({ image: _image, ...rest }) => rest),
  services: getServices(locale),
  processSteps: getProcessSteps(locale),
  experience: getExperience(locale),
  principles: getPrinciples(locale),
});

/** Collects every "path: problem" where the two trees differ in shape or hold empty strings. */
function compareShape(a: unknown, b: unknown, path = "$"): string[] {
  if (typeof a === "string" || typeof b === "string") {
    const problems: string[] = [];
    if (typeof a !== "string" || typeof b !== "string") return [`${path}: type mismatch`];
    if (a.trim() === "") problems.push(`${path}: empty (es)`);
    if (b.trim() === "") problems.push(`${path}: empty (en)`);
    return problems;
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return [`${path}: length mismatch`];
    return a.flatMap((item, index) => compareShape(item, b[index], `${path}[${index}]`));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();
    if (keysA.join() !== keysB.join()) return [`${path}: key mismatch`];
    return keysA.flatMap((key) =>
      compareShape((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key], `${path}.${key}`),
    );
  }
  return a === b ? [] : [`${path}: value mismatch`];
}

describe("localized content", () => {
  it("has the same structure and no empty strings in every locale", () => {
    const [first, ...rest] = locales;
    for (const locale of rest) expect(compareShape(content(first), content(locale))).toEqual([]);
  });

  it.each(locales)("has the expected counts in %s", (locale) => {
    const c = content(locale);
    expect(c.projects).toHaveLength(1);
    expect(c.services).toHaveLength(6);
    expect(c.processSteps).toHaveLength(4);
    expect(c.experience).toHaveLength(2);
    expect(c.principles).toHaveLength(4);
    expect(c.profile.facts).toHaveLength(4);
  });

  it("shares non-translatable values across locales", () => {
    const pick = (locale: Locale) =>
      getProjects(locale).map((p) => ({
        slug: p.slug,
        client: p.client,
        websiteUrl: p.websiteUrl,
        values: p.results.map((r) => r.value),
        image: p.image,
      }));
    expect(pick("es")).toEqual(pick("en"));
    expect(getProfile("es").facts.map((f) => f.value)).toEqual(getProfile("en").facts.map((f) => f.value));
    expect(getProfile("es").email).toBe("kevyyar@icloud.com");
    expect(getProfile("es").linkedin).toBe("https://www.linkedin.com/in/kevyyar/");
  });

  it("is actually translated (Spanish differs from English)", () => {
    expect(getServices("es")[0].description).not.toBe(getServices("en")[0].description);
    expect(getProjects("es")[0].challenge).not.toBe(getProjects("en")[0].challenge);
    expect(getProjects("es")[0].tags).not.toEqual(getProjects("en")[0].tags);
    expect(getExperience("es")[0].technologies).not.toEqual(getExperience("en")[0].technologies);
  });
});
