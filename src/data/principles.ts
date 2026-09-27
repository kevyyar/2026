import type { Principle } from "./types";
import type { Locale, Localized } from "../i18n/config";

const source: Localized<Principle>[] = [
  {
    es: {
      title: "Precisión estratégica",
      description:
        "Cada decisión técnica tiene que ganarse su lugar frente a un objetivo de negocio. Si no mueve la aguja, no se lanza.",
    },
    en: {
      title: "Strategic Precision",
      description:
        "Every technical decision has to earn its place against a business goal. If it doesn't move the needle, it doesn't ship.",
    },
  },
  {
    es: {
      title: "Transparencia total",
      description:
        "Siempre sabes qué está listo, qué sigue y qué está en riesgo. Avances semanales, tableros compartidos, cero sorpresas.",
    },
    en: {
      title: "Radical Transparency",
      description:
        "You always know what is done, what is next and what is at risk. Weekly updates, shared boards, no surprises.",
    },
  },
  {
    es: {
      title: "Excelencia técnica",
      description:
        "Tipado, probado, documentado y rápido. El código que heredas es código que tu próximo desarrollador va a agradecer.",
    },
    en: {
      title: "Engineering Excellence",
      description:
        "Typed, tested, documented and fast. The code you inherit is code your next developer will thank you for.",
    },
  },
  {
    es: {
      title: "Diseño centrado en las personas",
      description:
        "El software es para personas. Interfaces claras, accesibles y agradables convierten visitas en clientes.",
    },
    en: {
      title: "Human-Centric Design",
      description:
        "Software is for people. Interfaces that are clear, accessible and pleasant turn visitors into customers.",
    },
  },
];

export function getPrinciples(locale: Locale): Principle[] {
  return source.map((principle) => principle[locale]);
}
