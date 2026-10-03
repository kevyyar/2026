import type { Principle } from "./types";
import type { Locale, Localized } from "../i18n/config";

const source: Localized<Principle>[] = [
  {
    es: {
      title: "Primero tu negocio",
      description:
        "Todo lo que hago tiene que servirte para algo: traerte clientes, ahorrarte tiempo o evitarte errores. Si no sirve para eso, no lo hago.",
    },
    en: {
      title: "Strategic Precision",
      description:
        "Every technical decision has to earn its place against a business goal. If it doesn't move the needle, it doesn't ship.",
    },
  },
  {
    es: {
      title: "Cuentas claras",
      description:
        "Siempre sabes qué está listo, qué sigue y si algo se atrasó. Avances cada semana y cero sorpresas.",
    },
    en: {
      title: "Radical Transparency",
      description:
        "You always know what is done, what is next and what is at risk. Weekly updates, shared boards, no surprises.",
    },
  },
  {
    es: {
      title: "Bien hecho",
      description:
        "Rápido, probado y ordenado. Lo que te entrego sigue funcionando con el tiempo, y cualquiera puede retomarlo después.",
    },
    en: {
      title: "Engineering Excellence",
      description:
        "Typed, tested, documented and fast. The code you inherit is code your next developer will thank you for.",
    },
  },
  {
    es: {
      title: "Fácil de usar",
      description:
        "Tu página la va a usar gente real, con prisa y desde el celular. Si es clara y agradable, las visitas se vuelven clientes.",
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
