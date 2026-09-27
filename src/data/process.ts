import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    title: "Strategic Discovery",
    description:
      "We begin by deconstructing your business goals. I conduct deep-dive research to uncover market opportunities and define the technical constraints, ensuring our roadmap aligns perfectly with your vision.",
    deliverables: [
      "Technical Specification",
      "Competitor Analysis",
      "Architecture Blueprint",
      "Project Roadmap",
    ],
  },
  {
    title: "UX/UI Architecture",
    description:
      "Merging form and function. I create interactive high-fidelity prototypes that establish the visual language and user journey, allowing us to validate concepts before a single line of code is written.",
    deliverables: [
      "Interactive Prototypes",
      "Design System",
      "User Flow Maps",
      "Accessibility Audit",
    ],
  },
  {
    title: "Full-Stack Engineering",
    description:
      "The build phase. I develop your solution using scalable, modern frameworks. Every component is crafted for performance, security, and maintainability, with rigorous testing at every step.",
    deliverables: [
      "Production-Ready Code",
      "API Documentation",
      "Unit & Integration Tests",
      "Performance Report",
    ],
  },
  {
    title: "Deployment & Scale",
    description:
      "Launch is just the beginning. I handle the DevOps pipeline for a seamless release and set up monitoring tools to ensure your application scales effortlessly as your user base grows.",
    deliverables: [
      "CI/CD Pipeline",
      "Analytics Dashboard",
      "SEO Optimization",
      "Growth Strategy",
    ],
  },
];
