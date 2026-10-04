# Portfolio — add PídeloConmigo project

## Objective
Add PídeloConmigo (the owner's own product, source in `~/code/menu-qr`, live at https://pideloconmigo.com) as a second project, and show every project on the home page.

## Scope
- In: `src/assets/work/pideloconmigo.png`, `src/data/projects.ts`, `src/components/sections/Work.astro`, single-case wording in `src/i18n/ui.ts`, related tests.
- Out: case-page template, ECS copy, design system, deploy.

## Decisions
- ECS stays first (home OG image and pinned tests use `projects[0]`); PídeloConmigo is second.
- The GitHub repo is private: no repo link. `websiteUrl` = `https://pideloconmigo.com`.
- No invented metrics. Results are product facts proven in menu-qr code: 0% commission per order, 0 apps to install, 4 design themes, 7-day free trial.
- `es` copy targets local businesses (plain, first person); `en` tags use stack names.
- Screenshot: 16:9 desktop capture of the live landing hero.

## Tasks
- [ ] P1 Screenshot — capture `src/assets/work/pideloconmigo.png` from the live landing.
- [ ] P2 Project data — new `projects.ts` entry (es/en), tests updated.
- [ ] P3 Home lists all projects — `Work.astro` maps projects; reword single-case strings (es/en); tests.
- [ ] P4 Verify — vitest, astro check, astro build.

## Evidence
