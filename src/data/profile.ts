import type { Profile } from "./types";
import { defaultLocale, type Locale, type Localized } from "../i18n/config";

/** Values that never change with the locale. */
const invariant = {
  name: "Kevin Barreto",
  shortName: "KB",
  timeZone: "America/Mexico_City",
  email: "kevyyar@icloud.com",
  linkedin: "https://www.linkedin.com/in/kevyyar/",
  github: "https://github.com/kevyyar",
  githubHandle: "kevyyar",
};

const localized: Localized<Pick<Profile, "role" | "positioning" | "location" | "availability">> = {
  es: {
    role: "Desarrollador de software independiente y consultor",
    positioning: "Un estudio de software en singular.",
    location: "México",
    availability: "Disponible para nuevos proyectos",
  },
  en: {
    role: "Independent Software Developer & Consultant",
    positioning: "A software studio of one.",
    location: "México",
    availability: "Available for new projects",
  },
};

/** Fact tiles: values are shared (and may count up); labels are translated. */
const facts: { value: string; label: Localized }[] = [
  { value: "2019", label: { es: "Escribiendo código en producción desde", en: "Writing production code since" } },
  { value: "1:1", label: { es: "Un solo punto de contacto, de principio a fin", en: "One point of contact, start to finish" } },
  { value: "EN / ES", label: { es: "Entrega bilingüe, español e inglés", en: "Bilingual delivery, English & Spanish" } },
  { value: "< 24h", label: { es: "Tiempo de respuesta a nuevas consultas", en: "Reply time on new inquiries" } },
];

export function getProfile(locale: Locale): Profile {
  return {
    ...invariant,
    ...localized[locale],
    facts: facts.map((fact) => ({ value: fact.value, label: fact.label[locale] })),
  };
}

/** Locale-independent fields (name, email, links) for places that need no translation. */
export const profile = getProfile(defaultLocale);
