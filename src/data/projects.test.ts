import { describe, expect, it } from "vitest";
import { getProject, getProjects } from "./projects";
import { getServices } from "./services";
import { getProcessSteps } from "./process";
import { getExperience } from "./experience";
import { getPrinciples } from "./principles";

// English content is the original, verbatim source; Spanish parity is covered in content.test.ts.
const projects = getProjects("en");
const services = getServices("en");
const processSteps = getProcessSteps("en");
const experience = getExperience("en");
const principles = getPrinciples("en");

describe("projects", () => {
  it("contains only the Element Cleaning Systems case study", () => {
    expect(projects.map((p) => p.slug)).toEqual(["element-cleaning-systems"]);
  });

  it("preserves the Element Cleaning Systems data verbatim", () => {
    const [ecs] = projects;
    expect({
      client: ecs.client,
      industry: ecs.industry,
      title: ecs.title,
      imageAlt: ecs.imageAlt,
      challenge: ecs.challenge,
      solution: ecs.solution,
      results: ecs.results,
      tags: ecs.tags,
      websiteUrl: ecs.websiteUrl,
      fullDescription: ecs.fullDescription,
    }).toEqual({
      client: "Element Cleaning Systems",
      industry: "Industrial Services",
      title: "Digital Transformation for Janitorial Leader",
      imageAlt: "Element Cleaning Systems Website",
      challenge:
        "A premier janitorial company lacked the digital footprint to compete for enterprise contracts, relying solely on word-of-mouth.",
      solution:
        "I engineered a high-performance, bilingual platform that positions ECS as a market leader, featuring automated quoting and regional mapping.",
      results: [
        { label: "Quote Requests", value: "+340%" },
        { label: "Contract Size", value: "+45%" },
        { label: "Online Quotes", value: "24/7" },
        { label: "RFP Wins", value: "+28%" },
      ],
      tags: ["Next.js", "Tailwind", "Strapi", "Resend"],
      websiteUrl: "https://elementjanitorial.com",
      fullDescription:
        "I designed and developed a fully responsive website. I implemented a bilingual content system supporting English and Spanish throughout the entire site, created dynamic service pages showcasing specialized cleaning programs.",
    });
  });

  it("has an optimized image", () => {
    expect(projects[0].image).toBeTruthy();
  });

  it("looks projects up by slug", () => {
    expect(getProject("element-cleaning-systems", "en")?.client).toBe("Element Cleaning Systems");
    expect(getProject("element-cleaning-systems", "es")?.industry).toBe("Limpieza comercial");
    expect(getProject("aesthete", "en")).toBeUndefined();
  });
});

describe("supporting content", () => {
  it("has six services with four bullets each", () => {
    expect(services).toHaveLength(6);
    for (const service of services) expect(service.features).toHaveLength(4);
  });

  it("has four process steps with four deliverables each", () => {
    expect(processSteps.map((s) => s.title)).toEqual([
      "Strategic Discovery",
      "UX/UI Architecture",
      "Full-Stack Engineering",
      "Deployment & Scale",
    ]);
    for (const step of processSteps) expect(step.deliverables).toHaveLength(4);
  });

  it("has both work-experience entries, newest first", () => {
    expect(experience.map((e) => [e.company, e.period])).toEqual([
      ["Softtek", "2022 — Present"],
      ["Self-Employed", "2019 — 2022"],
    ]);
  });

  it("has four principles", () => {
    expect(principles).toHaveLength(4);
  });
});
