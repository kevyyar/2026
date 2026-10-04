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
  { value: "2019", label: { es: "Haciendo páginas y apps desde", en: "Writing production code since" } },
  { value: "1:1", label: { es: "Trato directo, siempre conmigo", en: "One point of contact, start to finish" } },
  { value: "100%", label: { es: "Pensado para verse bien en celular", en: "Built to work great on mobile" } },
  { value: "< 24h", label: { es: "Lo que tardo en contestarte", en: "Reply time on new inquiries" } },
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
