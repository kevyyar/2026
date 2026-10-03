import type { Experience } from "./types";
import type { Locale, Localized } from "../i18n/config";

type Source = Pick<Experience, "company"> & {
  start: string;
  end?: string;
  role: Localized;
  location: Localized;
  description: Localized;
  technologies: Localized<string[]>;
};

const present: Localized = { es: "Actual", en: "Present" };

const source: Source[] = [
  {
    company: "Softtek",
    start: "2022",
    role: { es: "Desarrollador de software", en: "Software Developer" },
    location: { es: "México", en: "Mexico" },
    description: {
      es: "Construyo páginas y aplicaciones para empresas dentro de un equipo grande. Trabajo de cerca con diseñadores y con quienes deciden qué se hace, para que lo que se pide termine siendo algo rápido, claro y fácil de usar. Ahí aprendí a trabajar con orden: probar todo antes de entregarlo, cuidar que cargue rápido y dejarlo listo para que siga funcionando con el tiempo.",
      en: "Frontend-focused developer building polished, accessible product experiences with React, Next.js, and Vue. I partner closely with design and product to turn requirements into fast, maintainable UI, and I use AI daily to accelerate delivery and deepen learning. On the backend I work with Firebase and some Node.js for lightweight APIs. Comfortable in CMS ecosystems like Drupal, I ship thoughtfully: reusable components, SSR/SEO, performance budgets, and pragmatic testing that keeps features moving while preserving quality.",
    },
    technologies: {
      es: [
        "Páginas rápidas",
        "Fáciles de usar",
        "Listas para celular",
        "Aparecen en buscadores",
        "Bien probadas",
        "Fáciles de mantener",
        "Trabajo en equipo",
      ],
      en: ["TypeScript", "React", "Next.js", "Vue", "Node.js", "Firebase", "Drupal"],
    },
  },
  {
    company: "Self-Employed",
    start: "2019",
    end: "2022",
    role: { es: "Desarrollador web freelance", en: "Freelance Web Developer" },
    location: { es: "México", en: "Mexico" },
    description: {
      es: "Hice y lancé páginas para negocios locales que necesitaban estar en internet. Llevaba cada proyecto completo: platicar con el dueño, entender qué necesitaba, diseñar, construir y entregar. Ahí aprendí a escuchar primero y a explicar las cosas sin palabras raras.",
      en: "Built and launched websites for local businesses needing a strong digital presence. Led end-to-end delivery—from discovery and scoping to UI implementation and handoff—while improving client communication, requirement gathering, and project planning. Focused on clean, responsive frontends and usability, which accelerated my learning and solidified core web fundamentals.",
    },
    technologies: {
      es: ["Negocios locales", "Proyectos completos", "Trato directo"],
      en: ["JavaScript", "HTML5", "CSS3"],
    },
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
    technologies: entry.technologies[locale],
  }));
}
