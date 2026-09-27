import type { Service } from "./types";
import type { Locale, Localized } from "../i18n/config";

const source: Localized<Service>[] = [
  {
    es: {
      title: "Ingeniería full-stack",
      description:
        "Arquitectura de aplicaciones escalables y de alto rendimiento con frameworks modernos. Construyo infraestructura digital sólida, pensada para crecer.",
      features: [
        "Ecosistemas Next.js y React",
        "Arquitectura cloud escalable",
        "Diseño e integración de APIs",
        "Manejo de estado complejo",
      ],
    },
    en: {
      title: "Full-Stack Engineering",
      description:
        "Architecting scalable, high-performance applications using cutting-edge frameworks. I build robust digital infrastructure designed for growth.",
      features: [
        "Next.js & React Ecosystems",
        "Scalable Cloud Architecture",
        "API Design & Integration",
        "Complex State Management",
      ],
    },
  },
  {
    es: {
      title: "Diseño UI/UX premium",
      description:
        "Interfaces intuitivas y cuidadas que atrapan a tus usuarios. Combino psicología del comportamiento y diseño visual para generar interacción.",
      features: [
        "Prototipos de alta fidelidad",
        "Design systems y tokens",
        "Microinteracciones y motion",
        "Accesibilidad (WCAG) primero",
      ],
    },
    en: {
      title: "Premium UI/UX Design",
      description:
        "Crafting intuitive, aesthetic interfaces that captivate users. I merge behavioral psychology with visual design to drive engagement.",
      features: [
        "High-Fidelity Prototyping",
        "Design Systems & Tokens",
        "Micro-Interactions & Motion",
        "Accessibility (WCAG) First",
      ],
    },
  },
  {
    es: {
      title: "Lanzamiento de productos digitales",
      description:
        "Convierto ideas en productos listos para el mercado. Del MVP al despliegue completo, aseguro una trayectoria sin tropiezos para tus activos digitales.",
      features: [
        "Desarrollo estratégico de MVP",
        "Landing pages listas para marketing",
        "Soluciones de e-commerce",
        "Compatibilidad multiplataforma",
      ],
    },
    en: {
      title: "Digital Product Launch",
      description:
        "Turning concepts into market-ready products. From MVP to full-scale deployment, I ensure a smooth trajectory for your digital assets.",
      features: [
        "Strategic MVP Development",
        "Marketing-Ready Landing Pages",
        "E-commerce Solutions",
        "Cross-Platform Compatibility",
      ],
    },
  },
  {
    es: {
      title: "Ingeniería de rendimiento",
      description:
        "Optimización obsesiva para tiempos de carga mínimos. La velocidad es una funcionalidad, y me aseguro de que tu aplicación responda al instante.",
      features: [
        "Dominio de Core Web Vitals",
        "Estrategias avanzadas de caché",
        "Optimización del bundle",
        "Renderizado del lado del servidor (SSR)",
      ],
    },
    en: {
      title: "Performance Engineering",
      description:
        "Obsessive optimization for lightning-fast load times. Speed is a feature, and I ensure your application delivers instantaneous responses.",
      features: [
        "Core Web Vitals Mastery",
        "Advanced Caching Strategies",
        "Bundle Size Optimization",
        "Server-Side Rendering (SSR)",
      ],
    },
  },
  {
    es: {
      title: "Seguridad y mantenimiento",
      description:
        "Blindo tu presencia digital. El monitoreo proactivo y las actualizaciones constantes mantienen tu negocio seguro y funcionando sin interrupciones.",
      features: [
        "Pipelines de pruebas automatizadas",
        "Auditorías y hardening de seguridad",
        "Monitoreo de errores en tiempo real",
        "Integración continua (CI/CD)",
      ],
    },
    en: {
      title: "Security & Maintenance",
      description:
        "Fortifying your digital presence. Proactive monitoring and updates keep your business secure and running without interruption.",
      features: [
        "Automated Testing Pipelines",
        "Security Audits & Hardening",
        "Real-time Error Monitoring",
        "Continuous Integration (CI/CD)",
      ],
    },
  },
  {
    es: {
      title: "Automatización basada en datos",
      description:
        "Uso tus datos para agilizar la operación. Construyo herramientas a la medida que automatizan flujos de trabajo y te dan información accionable.",
      features: [
        "Dashboards y paneles de administración",
        "Automatización de flujos de trabajo",
        "Visualización de datos",
        "Integración con APIs de terceros",
      ],
    },
    en: {
      title: "Data-Driven Automation",
      description:
        "Leveraging data to streamline operations. I build custom tools that automate workflows and provide actionable business intelligence.",
      features: [
        "Custom Dashboards & Admin Panels",
        "Workflow Automation",
        "Data Visualization",
        "Third-Party API Integration",
      ],
    },
  },
];

export function getServices(locale: Locale): Service[] {
  return source.map((service) => service[locale]);
}
