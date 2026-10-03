import type { Service } from "./types";
import type { Locale, Localized } from "../i18n/config";

const source: Localized<Service>[] = [
  {
    es: {
      title: "Página web para tu negocio",
      description:
        "Para que te encuentren, te conozcan y te escriban. Una página clara con lo que tus clientes siempre preguntan: qué vendes, cuánto cuesta, dónde estás y cómo contactarte.",
      features: ["Menú o catálogo", "Mapa y horarios", "Botón de WhatsApp", "Se ve bien en celular"],
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
      title: "Tienda en línea",
      description:
        "Vende y cobra aunque el local ya haya cerrado. Tus productos con fotos y precios, un carrito sencillo y pago en línea o al recoger.",
      features: ["Catálogo con fotos", "Pagos en línea", "Pedidos ordenados", "Envío o recolección"],
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
      title: "App a tu medida",
      description:
        "Para cuando una página ya no alcanza. Una herramienta hecha a la forma en que tú trabajas, que te quita de encima lo que hoy haces a mano.",
      features: ["Pedidos", "Citas", "Inventario", "Reporte de ventas"],
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
      title: "Que aparezcas en Google",
      description:
        "Para que te vea la gente que ya anda buscando lo que vendes. Una página rápida y bien acomodada sale antes que una lenta y confusa.",
      features: ["Búsquedas de tu zona", "Página rápida", "Textos claros", "Lista para celular"],
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
      title: "Arreglo y cuido lo que ya tienes",
      description:
        "Si tu página está lenta, vieja o descuidada, la dejo al tiro y la mantengo funcionando. Sin que tengas que volver a empezar de cero.",
      features: ["Revisión completa", "Página segura", "Aviso si algo falla", "Actualizaciones al día"],
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
      title: "Lo repetitivo, en automático",
      description:
        "Recordatorios, cotizaciones y reportes que salen solos. Tú dejas de copiar y pegar, y le dedicas ese tiempo a tus clientes.",
      features: [
        "Panel para ver tu negocio",
        "Recordatorios y cotizaciones",
        "Reportes claros",
        "Tus herramientas conectadas",
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
