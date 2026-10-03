import type { Project } from "./types";
import type { Locale, Localized } from "../i18n/config";
import ecsImage from "../assets/work/element-cleaning-systems.png";

type TranslatableFields = "industry" | "title" | "imageAlt" | "challenge" | "solution" | "fullDescription";

type ProjectSource = Pick<Project, "slug" | "client" | "image" | "websiteUrl"> & {
  text: Localized<Pick<Project, TranslatableFields>>;
  tags: Localized<string[]>;
  /** Metric values are reported figures and never translated; labels are. */
  results: { value: string; label: Localized }[];
};

const source: ProjectSource[] = [
  {
    slug: "element-cleaning-systems",
    client: "Element Cleaning Systems",
    image: ecsImage,
    tags: {
      es: ["En español e inglés", "Fácil de encontrar", "Cotización en línea", "Avisos por correo"],
      en: ["Next.js", "Tailwind", "Strapi", "Resend"],
    },
    websiteUrl: "https://elementjanitorial.com",
    results: [
      { value: "+340%", label: { es: "Solicitudes de cotización", en: "Quote Requests" } },
      { value: "+45%", label: { es: "Tamaño de los contratos", en: "Contract Size" } },
      { value: "#1", label: { es: "Lugar en las búsquedas", en: "SEO Rank" } },
      { value: "+28%", label: { es: "Licitaciones ganadas", en: "RFP Wins" } },
    ],
    text: {
      es: {
        industry: "Limpieza comercial",
        title: "Vivían de las recomendaciones. Ahora los encuentran solos.",
        imageAlt: "Sitio web de Element Cleaning Systems",
        challenge:
          "Todo su trabajo llegaba de boca en boca. Si nadie los recomendaba ese mes, no había clientes nuevos. Necesitaban que las empresas los encontraran por su cuenta.",
        solution:
          "Desarrollé una plataforma bilingüe de alto rendimiento que posiciona a ECS como líder del mercado, con cotizaciones automatizadas y mapas de cobertura por región.",
        fullDescription:
          "Diseñé y desarrollé un sitio web completamente responsivo. Implementé un sistema de contenido bilingüe en inglés y español en todo el sitio y creé páginas de servicio dinámicas que presentan sus programas de limpieza especializados.",
      },
      en: {
        industry: "Industrial Services",
        title: "Digital Transformation for Janitorial Leader",
        imageAlt: "Element Cleaning Systems Website",
        challenge:
          "A premier janitorial company lacked the digital footprint to compete for enterprise contracts, relying solely on word-of-mouth.",
        solution:
          "I engineered a high-performance, bilingual platform that positions ECS as a market leader, featuring automated quoting and regional mapping.",
        fullDescription:
          "I designed and developed a fully responsive website. I implemented a bilingual content system supporting English and Spanish throughout the entire site, created dynamic service pages showcasing specialized cleaning programs.",
      },
    },
  },
];

export function getProjects(locale: Locale): Project[] {
  return source.map(({ text, results, tags, ...shared }) => ({
    ...shared,
    ...text[locale],
    tags: tags[locale],
    results: results.map((result) => ({ label: result.label[locale], value: result.value })),
  }));
}

export function getProject(slug: string, locale: Locale): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

/** Slugs for static paths (locale-independent). */
export const projectSlugs = source.map((project) => project.slug);
