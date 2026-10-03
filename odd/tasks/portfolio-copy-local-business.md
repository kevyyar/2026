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
- [x] C1 UI dictionary copy — `src/i18n/ui.ts` (`es` only).
- [x] C2 Data copy — `src/data/{profile,services,process,principles,experience,projects}.ts`, localized tags/technologies, tests updated.
- [x] C3 Verify and run — vitest, astro check, astro build; dev server in a new tab.

## Evidence
- C1: commit 00c0f51; vitest src/i18n 47/47 passed.
- C2: commit 51a03d4; vitest 100/100 passed, astro check 0 errors (worker).
- C3: vitest 100/100, astro build OK (only Node 24→22 Vercel runtime notice); new es strings found in build output; /en unchanged. Dev server running in Herdr tab "portfolio dev" (wT:t2) at http://localhost:4321/.
