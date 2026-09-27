import type { UiKey } from "../i18n/ui";

export type NavLink = { label: UiKey; href: string };

/** Locale-agnostic targets; localize with `localizePath` / `href()` when rendering. */
export const navLinks: NavLink[] = [
  { label: "nav.work", href: "/#work" },
  { label: "nav.services", href: "/#services" },
  { label: "nav.process", href: "/#process" },
  { label: "nav.about", href: "/#about" },
  { label: "nav.contact", href: "/#contact" },
];
