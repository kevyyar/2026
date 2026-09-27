import type { Experience } from "./types";
import type { Locale, Localized } from "../i18n/config";

type Source = Pick<Experience, "company" | "technologies"> & {
  start: string;
  end?: string;
  role: Localized;
  location: Localized;
  description: Localized;
};

const present: Localized = { es: "Actual", en: "Present" };

const source: Source[] = [
  {
    company: "Softtek",
    start: "2022",
    role: { es: "Desarrollador de software", en: "Software Developer" },
    location: { es: "México", en: "Mexico" },
    description: {
      es: "Desarrollador con enfoque en frontend que construye experiencias de producto pulidas y accesibles con React, Next.js y Vue. Colaboro de cerca con diseño y producto para convertir requerimientos en interfaces rápidas y fáciles de mantener, y uso IA a diario para acelerar la entrega y seguir aprendiendo. En el backend trabajo con Firebase y algo de Node.js para APIs ligeras. Me muevo con soltura en ecosistemas CMS como Drupal y entrego con criterio: componentes reutilizables, SSR/SEO, presupuestos de rendimiento y pruebas pragmáticas que mantienen el ritmo sin sacrificar calidad.",
      en: "Frontend-focused developer building polished, accessible product experiences with React, Next.js, and Vue. I partner closely with design and product to turn requirements into fast, maintainable UI, and I use AI daily to accelerate delivery and deepen learning. On the backend I work with Firebase and some Node.js for lightweight APIs. Comfortable in CMS ecosystems like Drupal, I ship thoughtfully: reusable components, SSR/SEO, performance budgets, and pragmatic testing that keeps features moving while preserving quality.",
    },
    technologies: ["TypeScript", "React", "Next.js", "Vue", "Node.js", "Firebase", "Drupal"],
  },
  {
    company: "Self-Employed",
    start: "2019",
    end: "2022",
    role: { es: "Desarrollador web freelance", en: "Freelance Web Developer" },
    location: { es: "México", en: "Mexico" },
    description: {
      es: "Construí y lancé sitios web para negocios locales que necesitaban una presencia digital sólida. Llevé cada proyecto de punta a punta —del descubrimiento y el alcance a la implementación de la interfaz y la entrega— mientras fortalecía la comunicación con clientes, el levantamiento de requerimientos y la planeación. Me enfoqué en frontends limpios, responsivos y usables, lo que aceleró mi aprendizaje y consolidó mis fundamentos web.",
      en: "Built and launched websites for local businesses needing a strong digital presence. Led end-to-end delivery—from discovery and scoping to UI implementation and handoff—while improving client communication, requirement gathering, and project planning. Focused on clean, responsive frontends and usability, which accelerated my learning and solidified core web fundamentals.",
    },
    technologies: ["JavaScript", "HTML5", "CSS3"],
  },
];

const companyName: Record<string, Localized> = {
  "Self-Employed": { es: "Independiente", en: "Self-Employed" },
};

export function getExperience(locale: Locale): Experience[] {
  return source.map((entry) => ({
    role: entry.role[locale],
    company: companyName[entry.company]?.[locale] ?? entry.company,
    location: entry.location[locale],
    period: `${entry.start} — ${entry.end ?? present[locale]}`,
    description: entry.description[locale],
    technologies: entry.technologies,
  }));
}
