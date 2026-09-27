import type { ImageMetadata } from "astro";

export type Metric = {
  label: string;
  /** Display value exactly as reported, e.g. "+340%". Parsed for count-ups by `parseMetric`. */
  value: string;
};

export type Project = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  image: ImageMetadata;
  imageAlt: string;
  challenge: string;
  solution: string;
  results: Metric[];
  tags: string[];
  websiteUrl: string;
  fullDescription: string;
};

export type Service = {
  title: string;
  description: string;
  features: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
  deliverables: string[];
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
};

export type Principle = {
  title: string;
  description: string;
};

export type Fact = {
  value: string;
  label: string;
};

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  positioning: string;
  location: string;
  timeZone: string;
  github: string;
  githubHandle: string;
  availability: string;
  facts: Fact[];
};
