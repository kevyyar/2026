# Portfolio Copy — local-business positioning

## Objective
Replace the Spanish (`es`) copy of iamkev.xyz with the new local-business copy supplied by the user. Copy only: no layout, section, component, style, or motion changes.

## Scope
- In: `es` strings in `src/i18n/ui.ts` and `src/data/*.ts`; tests that assert the old Spanish copy.
- Out: English (`en`) copy (unchanged), design, components, case-study page body copy (not in the brief).

## Decisions
- Project `tags` and experience `technologies` were locale-shared; they become localized (`es` = new copy, `en` = current values) so the brief can land without changing English. Data shape only, no rendering change.
- Hero title line breaks: `Pongo tu negocio|en el celular|*de tus clientes.*` (3 lines, like `en`).
- Hero kicker/origin: `Páginas web y apps para negocios locales` / `México`.
- `cta.start` → `Platiquemos` applies everywhere the key is used (nav, hero, process, footer, case page CTA).
- `nav.work` → `Caso real` applies to the menu and the footer (same key).

## Tasks
- [ ] C1 UI dictionary copy — `src/i18n/ui.ts` (`es` only).
- [ ] C2 Data copy — `src/data/{profile,services,process,principles,experience,projects}.ts`, localized tags/technologies, tests updated.
- [ ] C3 Verify and run — vitest, astro check, astro build; dev server in a new tab.

## Evidence
