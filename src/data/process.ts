import type { ProcessStep } from "./types";
import type { Locale, Localized } from "../i18n/config";

const source: Localized<ProcessStep>[] = [
  {
    es: {
      title: "Platicamos",
      description:
        "Me cuentas de tu negocio y qué te gustaría resolver. No necesitas saber nada de tecnología. Yo reviso qué hace tu competencia y te propongo un plan con fechas.",
      deliverables: ["Qué vamos a hacer, por escrito", "Qué hace tu competencia", "Cómo va a funcionar", "Fechas y pasos"],
    },
    en: {
      title: "Strategic Discovery",
      description:
        "We begin by deconstructing your business goals. I conduct deep-dive research to uncover market opportunities and define the technical constraints, ensuring our roadmap aligns perfectly with your vision.",
      deliverables: ["Technical Specification", "Competitor Analysis", "Architecture Blueprint", "Project Roadmap"],
    },
  },
  {
    es: {
      title: "Te enseño cómo quedaría",
      description:
        "Antes de construir nada, ves el diseño, lo pruebas y me dices qué le cambiarías. Es mucho más fácil corregir aquí que cuando ya está hecho.",
      deliverables: [
        "Un diseño que puedes probar",
        "Los colores y el estilo de tu marca",
        "El recorrido de tu cliente",
        "Fácil de usar para todos",
      ],
    },
    en: {
      title: "UX/UI Architecture",
      description:
        "Merging form and function. I create interactive high-fidelity prototypes that establish the visual language and user journey, allowing us to validate concepts before a single line of code is written.",
      deliverables: ["Interactive Prototypes", "Design System", "User Flow Maps", "Accessibility Audit"],
    },
  },
  {
    es: {
      title: "Lo construyo",
      description:
        "Aquí se arma todo. Cada semana te muestro avances para que no haya sorpresas al final, y pruebo cada parte antes de pasar a la siguiente.",
      deliverables: ["Tu página o app funcionando", "Todo documentado", "Probado antes de salir", "Reporte de velocidad"],
    },
    en: {
      title: "Full-Stack Engineering",
      description:
        "The build phase. I develop your solution using scalable, modern frameworks. Every component is crafted for performance, security, and maintainability, with rigorous testing at every step.",
      deliverables: ["Production-Ready Code", "API Documentation", "Unit & Integration Tests", "Performance Report"],
    },
  },
  {
    es: {
      title: "Lo lanzamos",
      description:
        "Sale al público y te sigo apoyando con lo que vaya haciendo falta. La dejo lista para que aguante cuando te lleguen más clientes.",
      deliverables: [
        "Cambios sin complicaciones",
        "Panel con tus visitas",
        "Lista para aparecer en Google",
        "Plan para seguir creciendo",
      ],
    },
    en: {
      title: "Deployment & Scale",
      description:
        "Launch is just the beginning. I handle the DevOps pipeline for a seamless release and set up monitoring tools to ensure your application scales effortlessly as your user base grows.",
      deliverables: ["CI/CD Pipeline", "Analytics Dashboard", "SEO Optimization", "Growth Strategy"],
    },
  },
];

export function getProcessSteps(locale: Locale): ProcessStep[] {
  return source.map((step) => step[locale]);
}
