import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import { services } from "./services";
import { processSteps } from "./process";
import { experience } from "./experience";
import { principles } from "./principles";

describe("projects", () => {
  it("contains exactly the four selected case studies, in order", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "element-cleaning-systems",
      "aesthete",
      "voces-podcast",
      "amor-digital",
    ]);
  });

  it("has unique slugs", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it("keeps the live website URLs", () => {
    expect(projects.map((p) => p.websiteUrl)).toEqual([
      "https://elementjanitorial.com",
      "https://aesthete-nine.vercel.app",
      "https://podcast-fer-2026.vercel.app",
      "https://digital-invitations-mu.vercel.app",
    ]);
  });

  it("preserves every result verbatim", () => {
    expect(Object.fromEntries(projects.map((p) => [p.slug, p.results]))).toEqual({
      "element-cleaning-systems": [
        { label: "Quote Requests", value: "+340%" },
        { label: "Contract Size", value: "+45%" },
        { label: "SEO Rank", value: "#1" },
        { label: "RFP Wins", value: "+28%" },
      ],
      aesthete: [
        { label: "Avg Session", value: "+87%" },
        { label: "Conversion", value: "+64%" },
        { label: "Brand Recall", value: "92%" },
        { label: "Return Rate", value: "+156%" },
      ],
      "voces-podcast": [
        { label: "Listeners", value: "+230%" },
        { label: "Avg Listen", value: "92%" },
        { label: "Subscribers", value: "+180%" },
        { label: "Engagement", value: "4.8x" },
      ],
      "amor-digital": [
        { label: "Couples", value: "1,000+" },
        { label: "Setup Time", value: "2 min" },
        { label: "Satisfaction", value: "98%" },
        { label: "RSVP Rate", value: "94%" },
      ],
    });
  });

  it("gives every project a client, an image with alt text and full copy", () => {
    for (const project of projects) {
      expect(project.client.length).toBeGreaterThan(0);
      expect(project.image).toBeTruthy();
      expect(project.imageAlt.trim().length).toBeGreaterThan(0);
      expect(project.challenge.length).toBeGreaterThan(0);
      expect(project.solution.length).toBeGreaterThan(0);
      expect(project.fullDescription.length).toBeGreaterThan(0);
      expect(project.tags.length).toBe(4);
    }
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
