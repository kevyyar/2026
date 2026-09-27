import type { ProcessStep } from "./types";
import type { Locale, Localized } from "../i18n/config";

const source: Localized<ProcessStep>[] = [
  {
    es: {
      title: "Descubrimiento estratégico",
      description:
        "Empezamos por desmenuzar tus objetivos de negocio. Investigo a fondo para detectar oportunidades de mercado y definir las restricciones técnicas, de modo que la hoja de ruta esté alineada con tu visión.",
      deliverables: ["Especificación técnica", "Análisis de la competencia", "Plano de arquitectura", "Hoja de ruta del proyecto"],
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
      title: "Arquitectura UX/UI",
      description:
        "Forma y función, juntas. Creo prototipos interactivos de alta fidelidad que definen el lenguaje visual y el recorrido del usuario, para validar las ideas antes de escribir una sola línea de código.",
      deliverables: ["Prototipos interactivos", "Design system", "Mapas de flujo de usuario", "Auditoría de accesibilidad"],
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
      title: "Ingeniería full-stack",
      description:
        "La etapa de construcción. Desarrollo tu solución con frameworks modernos y escalables. Cada componente está pensado para el rendimiento, la seguridad y la mantenibilidad, con pruebas rigurosas en cada paso.",
      deliverables: ["Código listo para producción", "Documentación de API", "Pruebas unitarias y de integración", "Reporte de rendimiento"],
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
      title: "Lanzamiento y escala",
      description:
        "El lanzamiento es solo el principio. Me encargo del pipeline de DevOps para una salida a producción impecable y configuro herramientas de monitoreo para que tu aplicación escale sin esfuerzo a medida que crecen tus usuarios.",
      deliverables: ["Pipeline de CI/CD", "Dashboard de analítica", "Optimización SEO", "Estrategia de crecimiento"],
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
