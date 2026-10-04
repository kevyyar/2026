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
- [x] P1 Screenshot — capture `src/assets/work/pideloconmigo.png` from the live landing.
- [x] P2 Project data — new `projects.ts` entry (es/en), tests updated.
- [x] P3 Home lists all projects — `Work.astro` maps projects; reword single-case strings (es/en); tests.
- [x] P4 Verify — vitest, astro check, astro build.

## Evidence
- P1: commit 43f1854; Playwright capture of https://pideloconmigo.com, viewport 1600×900 @2x → 3200×1800 PNG.
- P2: commit 9d91173; vitest 101/101; zero metrics ("0%", "0") parse and render statically, no flicker.
- P3: commit 45030ae; Work.astro maps all projects, badge only on first card; es/en work strings reworded; astro check 0 errors.
- P4: vitest 101/101, astro check 0/0/0, astro build OK (Node 24→22 notice only). dist has both case pages with the live URL; home #work renders ECS then PidéloConmigo (es/en/mobile screenshots, no overflow). Known pre-existing issue on main: ECS es headline overlaps its image by ~15px at 1280–1440px.
